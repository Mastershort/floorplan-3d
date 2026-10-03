// Energy flow: power values from Home Assistant, the consumers placed in the plan, and the cable
// routes from the meter along the wall bases to every consumer. Pure functions, no three.js.
//
// Routing: every room gets a "cable ring" just inside its walls; rings of neighbouring rooms are
// linked through the middle of their shared walls. The meter, the consumers and the risers to other
// floors are attached to the nearest ring. Dijkstra from the meter gives a tree; the power of all
// consumers behind a cable is added up, so trunk lines carry more than branches.

import { generateWalls } from "./geometry/walls.ts";
import type { Building, EnergySettings, Floor, Furniture, Room, SolarField, Vec2 } from "./model.ts";
import { fieldFace, fieldSize, roofFaces, wallFaces } from "./solar.ts";
import { powerSensorsOf } from "./devices.ts";
import { pointInPolygon, signedArea } from "./model.ts";
import type { HassEntity, HomeAssistant } from "./types.ts";

export type FlowKind = "consumer" | "grid" | "export" | "solar" | "battery" | "inverter" | "wallbox";

/** One straight piece of glowing cable (floor-local coordinates, y up from the floor). */
export interface FlowSegment {
  floorId: string;
  a: [number, number, number];
  b: [number, number, number];
  /** Cable length from the source to `a`, so the stripes run on continuously. */
  dist: number;
  /** Power carried (W, >= 0); the flow runs from a to b. */
  power: number;
  kind: FlowKind;
}

export interface EnergySummary {
  /** Grid power (W): positive = import, negative = export. */
  grid: number | null;
  solar: number | null;
  /** Battery power (W): positive = discharging, negative = charging. */
  battery: number | null;
  soc: number | null;
  tariff: { value: number; unit: string } | null;
  /** House consumption (W) from the balance, or the sum of the consumers. */
  consumption: number | null;
}

export interface Consumer {
  /** Placed entity (device) id. */
  id: string;
  powerEntity: string;
  floorId: string;
  x: number;
  z: number;
  power: number;
  /** A wallbox: its cable is drawn in its own colour. */
  wallbox?: boolean;
}

const CABLE_Y = 0.03;
type V3 = [number, number, number];

/** Power sensors the placed energy devices bring along (meter = grid, inverters = solar, battery). */
export interface DeviceSensors {
  grid: string | null;
  solar: string[];
  battery: string | null;
  soc: string | null;
}

const ref = (v: string | null | undefined) => (v && v !== "none" ? v : null);

/**
 * The sensors of the energy devices in the plan: `power` tells the power sensor of an item (its own field, or
 * the one found on its device). Several inverters add up.
 */
export function deviceSensors(building: Building, power: (f: Furniture) => string | null = (f) => ref(f.power)): DeviceSensors {
  const out: DeviceSensors = { grid: null, solar: [], battery: null, soc: null };
  for (const floor of building.floors) {
    for (const f of floor.furniture) {
      const p = power(f);
      if (f.type === "meter") out.grid ??= p;
      else if (f.type === "inverter" && p && !out.solar.includes(p)) out.solar.push(p);
      else if (f.type === "home_battery") {
        out.battery ??= p;
        out.soc ??= ref(f.soc);
      }
    }
  }
  return out;
}

/** Where the cables meet: the meter cabinet in the plan, else the meter spot set in older plans. */
export function meterPosition(building: Building): { floor_id: string; x: number; z: number } | null {
  for (const floor of building.floors) {
    const m = floor.furniture.find((f) => f.type === "meter");
    if (m) return { floor_id: floor.id, x: m.x, z: m.z };
  }
  return building.energy.meter;
}

/** Home Assistant's energy dashboard settings (`energy/get_prefs`), as far as the proposals need them. */
export interface EnergyPrefs {
  energy_sources?: {
    type: string;
    stat_energy_from?: string;
    stat_energy_to?: string;
    flow_from?: { stat_energy_from: string }[];
    flow_to?: { stat_energy_to: string }[];
  }[];
}

/** The power sensor (W) that belongs to an energy statistic: one of the same device, named like it if there are several. */
function powerOfDevice(hass: HomeAssistant, statId: string | undefined, deviceClass = "power"): string | null {
  if (!statId) return null;
  const device = hass.entities?.[statId]?.device_id;
  if (!device) return null;
  const candidates = Object.keys(hass.states).filter((id) => id.startsWith("sensor.") && hass.entities?.[id]?.device_id === device && hass.states[id]?.attributes.device_class === deviceClass);
  if (candidates.length <= 1) return candidates[0] ?? null;
  // a total over several phases rather than a single phase or a daily value
  const total = candidates.filter((id) => !/(phase|_l[123]\b|_[abc]$|today|daily|heute)/.test(id));
  const stem = statId.replace(/^sensor\./, "").replace(/_?(energy|energie|total|today|daily|kwh|import|export|consumption|production)/g, "");
  return total.find((id) => stem && id.includes(stem)) ?? total[0] ?? candidates[0];
}

/** Sensors for the energy balance proposed from the energy dashboard: grid, solar, battery and its charge. */
export function proposeEnergySensors(hass: HomeAssistant, prefs: EnergyPrefs): Partial<EnergySettings> {
  const out: Partial<EnergySettings> = {};
  for (const src of prefs.energy_sources ?? []) {
    if (src.type === "grid") {
      const stat = src.flow_from?.[0]?.stat_energy_from ?? src.flow_to?.[0]?.stat_energy_to;
      const p = powerOfDevice(hass, stat);
      if (p && !out.grid) out.grid = p;
    } else if (src.type === "solar") {
      const p = powerOfDevice(hass, src.stat_energy_from);
      if (p && !out.solar) out.solar = p;
    } else if (src.type === "battery") {
      const p = powerOfDevice(hass, src.stat_energy_from ?? src.stat_energy_to);
      if (p && !out.battery) out.battery = p;
      const soc = powerOfDevice(hass, src.stat_energy_from ?? src.stat_energy_to, "battery");
      if (soc && !out.battery_soc) out.battery_soc = soc;
    }
  }
  return out;
}
/** Distance of the cable ring from the wall face. */
const RING_GAP = 0.07;

// ------------------------------------------------------------------ values

/** Power in watts (kW and MW converted); null when unknown. */
export function readPower(st: HassEntity | undefined, invert = false): number | null {
  if (!st) return null;
  const v = Number(st.state);
  if (!Number.isFinite(v)) return null;
  const unit = String(st.attributes.unit_of_measurement ?? "W");
  const w = unit === "kW" ? v * 1000 : unit === "MW" ? v * 1e6 : v;
  return invert ? -w : w;
}

function isPowerSensor(hass: HomeAssistant, id: string): boolean {
  return id.startsWith("sensor.") && hass.states[id]?.attributes.device_class === "power";
}

/** Power sensor of a placed entity: the entity itself, or a power sensor of the same device. */
export function powerSensorFor(hass: HomeAssistant, entityId: string): string | null {
  if (isPowerSensor(hass, entityId)) return entityId;
  const device = hass.entities?.[entityId]?.device_id;
  if (!device) return null;
  return powerSensorsOf(hass, device).find((e) => e !== entityId) ?? null;
}

/** Placed entities that report power, with their position and current power. */
export function findConsumers(hass: HomeAssistant, building: Building): Consumer[] {
  const e = building.energy;
  const sources = new Set([e.grid, e.solar, e.battery].filter(Boolean));
  const out: Consumer[] = [];
  const seen = new Set<string>();
  for (const floor of building.floors) {
    for (const pl of floor.placements) {
      const sensor = powerSensorFor(hass, pl.entity_id);
      if (!sensor || sources.has(sensor) || seen.has(sensor)) continue;
      seen.add(sensor);
      out.push({ id: pl.entity_id, powerEntity: sensor, floorId: floor.id, x: pl.x, z: pl.z, power: Math.max(0, readPower(hass.states[sensor]) ?? 0) });
    }
  }
  return out;
}

export function energySummary(hass: HomeAssistant, building: Building, consumers: Consumer[], devices: DeviceSensors = deviceSensors(building)): EnergySummary {
  const e = building.energy;
  // the balance sensors win; without them the placed devices bring theirs (the meter, the inverters, the battery)
  const gridId = e.grid ?? devices.grid;
  const grid = gridId ? readPower(hass.states[gridId], e.grid_invert) : null;
  let solar: number | null = e.solar ? readPower(hass.states[e.solar]) : null;
  if (!e.solar && devices.solar.length) {
    const values = devices.solar.map((id) => readPower(hass.states[id])).filter((v): v is number => v !== null);
    solar = values.length ? values.reduce((a, b) => a + b, 0) : null;
  }
  const batteryId = e.battery ?? devices.battery;
  const battery = batteryId ? readPower(hass.states[batteryId], e.battery_invert) : null;
  const socId = e.battery_soc ?? devices.soc;
  const socState = socId ? Number(hass.states[socId]?.state) : NaN;
  const tariffState = e.tariff ? hass.states[e.tariff] : undefined;
  const tariffValue = Number(tariffState?.state);
  let consumption: number | null = e.consumption ? readPower(hass.states[e.consumption]) : null;
  if (consumption !== null) consumption = Math.max(0, consumption);
  else if (grid !== null || solar !== null || battery !== null) consumption = Math.max(0, (grid ?? 0) + Math.max(0, solar ?? 0) + (battery ?? 0));
  else if (consumers.length) consumption = consumers.reduce((s, c) => s + c.power, 0);
  return {
    grid,
    solar: solar === null ? null : Math.max(0, solar),
    battery,
    soc: Number.isFinite(socState) ? socState : null,
    tariff: tariffState && Number.isFinite(tariffValue) ? { value: tariffValue, unit: String(tariffState.attributes.unit_of_measurement ?? "") } : null,
    consumption,
  };
}

// ------------------------------------------------------------------ routing graph

interface Graph {
  pos: Vec2[];
  adj: { to: number; w: number }[][];
  /** Ring segments per room: [node a, node b]. */
  rings: Map<string, [number, number][]>;
}

function addNode(g: Graph, p: Vec2): number {
  g.pos.push(p);
  g.adj.push([]);
  return g.pos.length - 1;
}

function link(g: Graph, a: number, b: number): void {
  const w = Math.hypot(g.pos[a][0] - g.pos[b][0], g.pos[a][1] - g.pos[b][1]);
  g.adj[a].push({ to: b, w });
  g.adj[b].push({ to: a, w });
}

/** Polygon moved inwards by a distance per edge (counter-clockwise input). */
function insetPolygon(poly: Vec2[], dist: number[]): Vec2[] {
  const n = poly.length;
  const lines = poly.map((a, i) => {
    const b = poly[(i + 1) % n];
    const dx = b[0] - a[0];
    const dz = b[1] - a[1];
    const l = Math.hypot(dx, dz) || 1;
    const nx = -dz / l;
    const nz = dx / l; // left normal = inside for a counter-clockwise polygon
    return { p: [a[0] + nx * dist[i], a[1] + nz * dist[i]] as Vec2, d: [dx / l, dz / l] as Vec2, n: [nx, nz] as Vec2 };
  });
  return poly.map((v, i) => {
    const l1 = lines[(i - 1 + n) % n];
    const l2 = lines[i];
    const den = l1.d[0] * l2.d[1] - l1.d[1] * l2.d[0];
    if (Math.abs(den) < 1e-6) return [v[0] + l2.n[0] * dist[i], v[1] + l2.n[1] * dist[i]];
    const t = ((l2.p[0] - l1.p[0]) * l2.d[1] - (l2.p[1] - l1.p[1]) * l2.d[0]) / den;
    return [l1.p[0] + l1.d[0] * t, l1.p[1] + l1.d[1] * t];
  });
}

function ccwRoom(room: Room): { pts: Vec2[]; flipped: boolean } {
  return signedArea(room.points) >= 0 ? { pts: room.points, flipped: false } : { pts: [...room.points].reverse(), flipped: true };
}

function buildGraph(floor: Floor, exterior: number, interior: number): Graph {
  const g: Graph = { pos: [], adj: [], rings: new Map() };
  const { walls } = generateWalls(floor.rooms, { exterior, interior }, floor.walls ?? []);
  for (const room of floor.rooms) {
    if (room.points.length < 3) continue;
    const { pts, flipped } = ccwRoom(room);
    const n = pts.length;
    // interior walls sit on the room edge, so the ring keeps half their thickness away
    const dist = pts.map((_, i) => {
      const stored = flipped ? (n - 2 - i + n) % n : i;
      const shared = walls.some((w) => !w.exterior && w.sources.some((s) => s.room_id === room.id && s.edge === stored));
      return RING_GAP + (shared ? interior / 2 : 0);
    });
    const ring = insetPolygon(pts, dist).map((p) => addNode(g, p));
    const segs: [number, number][] = ring.map((a, i) => [a, ring[(i + 1) % n]]);
    for (const [a, b] of segs) link(g, a, b);
    g.rings.set(room.id, segs);
  }
  // doorless links through the middle of every interior wall
  for (const w of walls) {
    if (w.exterior || !w.roomLeft || !w.roomRight) continue;
    const m: Vec2 = [(w.a[0] + w.b[0]) / 2, (w.a[1] + w.b[1]) / 2];
    const a = attach(g, w.roomLeft, m);
    const b = attach(g, w.roomRight, m);
    if (a !== null && b !== null) link(g, a, b);
  }
  return g;
}

/** New node at the point of a room's ring closest to p, linked to that segment's ends. */
function attach(g: Graph, roomId: string, p: Vec2): number | null {
  const segs = g.rings.get(roomId);
  if (!segs) return null;
  let best: { seg: [number, number]; q: Vec2; d: number } | null = null;
  for (const seg of segs) {
    const a = g.pos[seg[0]];
    const b = g.pos[seg[1]];
    const dx = b[0] - a[0];
    const dz = b[1] - a[1];
    const l2 = dx * dx + dz * dz || 1;
    const t = Math.min(1, Math.max(0, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dz) / l2));
    const q: Vec2 = [a[0] + dx * t, a[1] + dz * t];
    const d = Math.hypot(p[0] - q[0], p[1] - q[1]);
    if (!best || d < best.d) best = { seg, q, d };
  }
  if (!best) return null;
  const node = addNode(g, best.q);
  link(g, node, best.seg[0]);
  link(g, node, best.seg[1]);
  return node;
}

/** Room containing p, or the one whose outline is nearest. */
function roomAt(floor: Floor, p: Vec2): Room | null {
  const rooms = floor.rooms.filter((r) => r.points.length >= 3);
  const inside = rooms.find((r) => pointInPolygon(p, r.points));
  if (inside) return inside;
  let best: { room: Room; d: number } | null = null;
  for (const r of rooms) {
    for (const q of r.points) {
      const d = Math.hypot(p[0] - q[0], p[1] - q[1]);
      if (!best || d < best.d) best = { room: r, d };
    }
  }
  return best?.room ?? null;
}

function dijkstra(g: Graph, source: number): { dist: number[]; prev: number[] } {
  const dist = g.pos.map(() => Infinity);
  const prev = g.pos.map(() => -1);
  const done = g.pos.map(() => false);
  dist[source] = 0;
  // graphs are small (a few hundred nodes): a linear scan is fast enough
  for (;;) {
    let u = -1;
    for (let i = 0; i < dist.length; i++) if (!done[i] && dist[i] < Infinity && (u < 0 || dist[i] < dist[u])) u = i;
    if (u < 0) break;
    done[u] = true;
    for (const { to, w } of g.adj[u]) {
      if (dist[u] + w < dist[to] - 1e-9) {
        dist[to] = dist[u] + w;
        prev[to] = u;
      }
    }
  }
  return { dist, prev };
}

// ------------------------------------------------------------------ flows

export interface FlowInput {
  building: Building;
  consumers: Consumer[];
  summary: EnergySummary;
  /** Position of a placed battery (for the battery cable), if any. */
  battery?: { floorId: string; x: number; z: number } | null;
  /** Pro: power of every solar field (W) for the cables from the roof to the inverter (none: no roof cables). */
  fieldPower?: Map<string, number> | null;
}

/** Cable route independent of the current power: which targets each piece feeds. */
interface PlannedSegment {
  floorId: string;
  a: [number, number, number];
  b: [number, number, number];
  dist: number;
  /** Indices of the targets (consumers, then the battery) fed through this piece. */
  members: number[];
  kind: FlowKind;
}

interface Target {
  floorId: string;
  x: number;
  z: number;
  kind: FlowKind;
}

/** The kind of a shared cable: all battery = battery, all wallbox = wallbox, else a consumer cable. */
function sharedKind(members: number[], targets: Target[]): FlowKind {
  if (members.every((m) => targets[m].kind === "battery")) return "battery";
  if (members.every((m) => targets[m].kind === "wallbox")) return "wallbox";
  return "consumer";
}

/** Routes per building object and target layout; power changes only re-weigh the planned pieces. */
const planCache = new WeakMap<Building, Map<string, PlannedSegment[]>>();

function planRoutes(building: Building, targets: Target[]): PlannedSegment[] {
  const meter = meterPosition(building)!;
  const meterFloor = building.floors.find((f) => f.id === meter.floor_id)!;
  const out: PlannedSegment[] = [];
  const { wall_exterior: ext, wall_interior: int } = building.settings;
  const riserDist = new Map<string, number>();
  const byFloor = new Map<string, number[]>();
  targets.forEach((t, i) => byFloor.set(t.floorId, [...(byFloor.get(t.floorId) ?? []), i]));
  const floorsWithLoad = building.floors.filter((f) => byFloor.has(f.id));

  // vertical risers at the meter position: power for every other floor goes through them
  for (const f of floorsWithLoad) {
    if (f.id === meterFloor.id) continue;
    const up = f.elevation > meterFloor.elevation;
    const members = byFloor.get(f.id)!;
    const kind = sharedKind(members, targets);
    // on the meter floor: straight up to the ceiling (or down into the slab)
    out.push({ floorId: meterFloor.id, a: [meter.x, CABLE_Y, meter.z], b: [meter.x, up ? meterFloor.height : -0.2, meter.z], dist: 0, members, kind });
    // on the other floor: up out of the slab (or down from the ceiling) to the floor
    const h = Math.abs(f.elevation - meterFloor.elevation);
    out.push({ floorId: f.id, a: [meter.x, up ? -0.2 : f.height, meter.z], b: [meter.x, CABLE_Y, meter.z], dist: h, members, kind });
    riserDist.set(f.id, h + 0.25);
  }

  for (const f of floorsWithLoad) {
    const g = buildGraph(f, ext, int);
    const rootRoom = roomAt(f, [meter.x, meter.z]);
    if (!rootRoom) continue;
    const root = addNode(g, [meter.x, meter.z]);
    const rootAttach = attach(g, rootRoom.id, [meter.x, meter.z]);
    if (rootAttach === null) continue;
    link(g, root, rootAttach);
    const ends: { node: number; member: number }[] = [];
    for (const i of byFloor.get(f.id)!) {
      const t = targets[i];
      const room = roomAt(f, [t.x, t.z]);
      if (!room) continue;
      const node = addNode(g, [t.x, t.z]);
      const at = attach(g, room.id, [t.x, t.z]);
      if (at === null) continue;
      link(g, node, at);
      ends.push({ node, member: i });
    }
    const { dist, prev } = dijkstra(g, root);
    // collect the targets behind every edge of the tree
    const edges = new Map<string, { a: number; b: number; members: number[] }>();
    for (const e of ends) {
      if (!Number.isFinite(dist[e.node])) continue;
      for (let v = e.node; prev[v] >= 0; v = prev[v]) {
        const u = prev[v];
        const key = `${u}>${v}`;
        const cur = edges.get(key) ?? { a: u, b: v, members: [] };
        cur.members.push(e.member);
        edges.set(key, cur);
      }
    }
    const base = riserDist.get(f.id) ?? 0;
    for (const { a, b, members } of edges.values()) {
      const pa = g.pos[a];
      const pb = g.pos[b];
      // a cable shared by the battery and consumers is drawn as consumer cable
      const kind = sharedKind(members, targets);
      out.push({ floorId: f.id, a: [pa[0], CABLE_Y, pa[1]], b: [pb[0], CABLE_Y, pb[1]], dist: base + dist[a], members, kind });
    }
  }
  return out;
}

/** All cable segments: consumers (tree from the meter), grid feed, solar riser and battery cable. */
export function flowSegments({ building, consumers, summary, battery, fieldPower }: FlowInput): FlowSegment[] {
  const meter = meterPosition(building);
  if (!meter) return [];
  const meterFloor = building.floors.find((f) => f.id === meter.floor_id);
  if (!meterFloor) return [];
  const { wall_exterior: ext, wall_interior: int } = building.settings;

  const targets: (Target & { power: number })[] = consumers.map((c) => ({ floorId: c.floorId, x: c.x, z: c.z, kind: (c.wallbox ? "wallbox" : "consumer") as FlowKind, power: c.power }));
  // the battery hangs on the inverter when both stand on one floor (a hybrid inverter), else on the meter
  const inverter = devicePosition(building, "inverter");
  const batteryOnInverter = !!battery && !!inverter && battery.floorId === inverter.floorId;
  if (battery && summary.battery !== null && !batteryOnInverter) targets.push({ ...battery, kind: "battery", power: Math.abs(summary.battery) });
  const key = `${meter.floor_id}:${meter.x},${meter.z}|${targets.map((t) => `${t.floorId}:${t.x},${t.z}:${t.kind}`).join(";")}`;
  let perBuilding = planCache.get(building);
  if (!perBuilding) planCache.set(building, (perBuilding = new Map()));
  let plan = perBuilding.get(key);
  if (!plan) {
    plan = planRoutes(building, targets);
    // one layout per building is enough (a new building object comes with every edit)
    perBuilding.clear();
    perBuilding.set(key, plan);
  }
  const out: FlowSegment[] = plan.map((s) => ({
    floorId: s.floorId,
    a: s.a,
    b: s.b,
    dist: s.dist,
    power: s.members.reduce((sum, m) => sum + targets[m].power, 0),
    kind: s.kind,
  }));

  // grid feed: from outside through the nearest exterior wall to the meter
  if (summary.grid !== null) {
    const { walls } = generateWalls(meterFloor.rooms, { exterior: ext, interior: int }, meterFloor.walls ?? []);
    let best: { q: Vec2; out: Vec2; d: number } | null = null;
    for (const w of walls) {
      if (!w.exterior) continue;
      const dx = w.b[0] - w.a[0];
      const dz = w.b[1] - w.a[1];
      const l2 = dx * dx + dz * dz || 1;
      const t = Math.min(1, Math.max(0, ((meter.x - w.a[0]) * dx + (meter.z - w.a[1]) * dz) / l2));
      const q: Vec2 = [w.a[0] + dx * t, w.a[1] + dz * t];
      const d = Math.hypot(meter.x - q[0], meter.z - q[1]);
      const l = Math.sqrt(l2);
      if (!best || d < best.d) best = { q, out: [dz / l, -dx / l], d };
    }
    if (best) {
      const far: [number, number, number] = [best.q[0] + best.out[0] * (ext + 1.4), CABLE_Y, best.q[1] + best.out[1] * (ext + 1.4)];
      const at: [number, number, number] = [meter.x, CABLE_Y, meter.z];
      const importing = summary.grid >= 0;
      out.push({ floorId: meterFloor.id, a: importing ? far : at, b: importing ? at : far, dist: 0, power: Math.abs(summary.grid), kind: importing ? "grid" : "export" });
    }
  }
  // the battery cable flows towards the meter when discharging
  if (summary.battery !== null && summary.battery > 0) {
    for (const s of out) if (s.kind === "battery") [s.a, s.b] = [s.b, s.a];
  }
  const fields = building.settings.roof.solar ?? [];
  const roofCables = !!fieldPower && fields.length > 0;
  if (inverter) {
    // the inverter feeds the meter with the sun and the battery's discharge, and charges the battery
    const feed = Math.max(0, (summary.solar ?? 0) + (batteryOnInverter ? Math.max(0, summary.battery ?? 0) : 0) - (batteryOnInverter ? Math.max(0, -(summary.battery ?? 0)) : 0));
    const invTop = deviceTop(building, "inverter");
    if (summary.solar !== null || summary.battery !== null) {
      for (const s of deviceRoute(building, inverter, invTop, { ...meter, floorId: meter.floor_id }, 1.5, feed, "inverter", 0)) out.push(s);
    }
    if (batteryOnInverter && summary.battery !== null) {
      const charging = summary.battery < 0;
      const route = deviceRoute(building, inverter, invTop - 0.1, battery!, 0.9, Math.abs(summary.battery), "battery", 0);
      out.push(...(charging ? route : route.map((s) => ({ ...s, a: s.b, b: s.a })).reverse()));
    }
  }
  if (roofCables) {
    // every field's cable: down the roof, the facade and along the outer walls to the inverter (or the meter)
    const target = inverter ?? { floorId: meter.floor_id, x: meter.x, z: meter.z };
    const top = inverter ? deviceTop(building, "inverter") : 1.5;
    for (const f of fields) out.push(...solarRoute(building, f, fieldPower.get(f.id) ?? 0, target, top));
  } else if (summary.solar !== null && !inverter) {
    // older plans without fields or an inverter: the sun comes down from above the ceiling to the meter
    out.push({ floorId: meterFloor.id, a: [meter.x + 0.08, meterFloor.height + 0.6, meter.z + 0.08], b: [meter.x + 0.08, CABLE_Y, meter.z + 0.08], dist: 0, power: summary.solar, kind: "solar" });
  }
  return out;
}

// ------------------------------------------------------------------ Pro: the roof and the devices

interface DevicePos {
  floorId: string;
  x: number;
  z: number;
}

/** The first energy device of a type in the plan (where its cables start or end). */
export function devicePosition(building: Building, type: Furniture["type"]): DevicePos | null {
  for (const floor of building.floors) {
    const m = floor.furniture.find((f) => f.type === type);
    if (m) return { floorId: floor.id, x: m.x, z: m.z };
  }
  return null;
}

/** Height (above its floor) where a wall device's cables leave it: its top edge. */
function deviceTop(building: Building, type: Furniture["type"]): number {
  for (const floor of building.floors) {
    const m = floor.furniture.find((f) => f.type === type);
    if (m) return (type === "inverter" ? 1.1 : type === "meter" ? 0.4 : 0) + m.h;
  }
  return 1.5;
}

/** Cables between two devices on one floor along the walls of the rooms (like the meter's tree), at floor level. */
const routeCache = new WeakMap<Building, Map<string, Vec2[]>>();

function roomPath(building: Building, floor: Floor, from: Vec2, to: Vec2): Vec2[] {
  const key = `${floor.id}:${from.join(",")}>${to.join(",")}`;
  let per = routeCache.get(building);
  if (!per) routeCache.set(building, (per = new Map()));
  const cached = per.get(key);
  if (cached) return cached;
  const { wall_exterior: ext, wall_interior: int } = building.settings;
  const g = buildGraph(floor, ext, int);
  const path: Vec2[] = [from, to];
  const a = roomAt(floor, from);
  const b = roomAt(floor, to);
  if (a && b) {
    const na = addNode(g, from);
    const aa = attach(g, a.id, from);
    const nb = addNode(g, to);
    const ab = attach(g, b.id, to);
    if (aa !== null && ab !== null) {
      link(g, na, aa);
      link(g, nb, ab);
      const { dist, prev } = dijkstra(g, na);
      if (Number.isFinite(dist[nb])) {
        path.length = 0;
        for (let v = nb; v >= 0; v = prev[v]) path.unshift(g.pos[v]);
      }
    }
  }
  per.set(key, path);
  return path;
}

/** A cable from a device down its wall, along the rooms' walls and up to the other device. */
function deviceRoute(building: Building, from: DevicePos, fromY: number, to: DevicePos, toY: number, power: number, kind: FlowKind, dist: number): FlowSegment[] {
  const floor = building.floors.find((f) => f.id === from.floorId);
  if (!floor || from.floorId !== to.floorId) return [];
  const path = roomPath(building, floor, [from.x, from.z], [to.x, to.z]);
  const pts: V3[] = [[from.x, fromY, from.z], ...path.map((p): V3 => [p[0], CABLE_Y, p[1]]), [to.x, toY, to.z]];
  return polyline(floor.id, pts, power, kind, dist);
}

/** Consecutive pieces of one cable (floor-local), the distance running on from piece to piece. */
function polyline(floorId: string, pts: V3[], power: number, kind: FlowKind, dist: number): FlowSegment[] {
  const out: FlowSegment[] = [];
  for (let i = 0; i + 1 < pts.length; i++) {
    const a = pts[i];
    const b = pts[i + 1];
    const len = Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
    if (len < 1e-4) continue;
    out.push({ floorId, a, b, dist, power, kind });
    dist += len;
  }
  return out;
}

/** The outer outline of a floor's exterior walls as a graph (nodes just outside the wall faces). */
function outlineGraph(building: Building, floor: Floor): Graph {
  const g: Graph = { pos: [], adj: [], rings: new Map() };
  const { walls } = generateWalls(floor.rooms, { exterior: building.settings.wall_exterior, interior: building.settings.wall_interior }, floor.walls ?? []);
  const segs: [number, number][] = [];
  for (const w of walls) {
    if (!w.exterior || w.free) continue;
    const dx = w.b[0] - w.a[0];
    const dz = w.b[1] - w.a[1];
    const l = Math.hypot(dx, dz) || 1;
    // the room lies on the left, so the outside is on the right
    const off = w.right + 0.05;
    const nx = (dz / l) * off;
    const nz = (-dx / l) * off;
    const a = addNode(g, [w.a[0] + nx, w.a[1] + nz]);
    const b = addNode(g, [w.b[0] + nx, w.b[1] + nz]);
    link(g, a, b);
    segs.push([a, b]);
  }
  // the walls meet at the corners: ends that lie close together are joined
  for (let i = 0; i < g.pos.length; i++) {
    for (let j = i + 1; j < g.pos.length; j++) {
      const d = Math.hypot(g.pos[i][0] - g.pos[j][0], g.pos[i][1] - g.pos[j][1]);
      if (d < 0.6 && !g.adj[i].some((e) => e.to === j)) link(g, i, j);
    }
  }
  g.rings.set("outline", segs);
  return g;
}

/** The way along the outside of the house from one plan point to another (both are joined to the outline). */
function outlinePath(building: Building, floor: Floor, from: Vec2, to: Vec2): Vec2[] {
  const key = `outline:${floor.id}:${from.join(",")}>${to.join(",")}`;
  let per = routeCache.get(building);
  if (!per) routeCache.set(building, (per = new Map()));
  const cached = per.get(key);
  if (cached) return cached;
  const g = outlineGraph(building, floor);
  let path: Vec2[] = [from, to];
  const na = attach(g, "outline", from);
  const nb = attach(g, "outline", to);
  if (na !== null && nb !== null) {
    const { dist, prev } = dijkstra(g, na);
    if (Number.isFinite(dist[nb])) {
      path = [];
      for (let v = nb; v >= 0; v = prev[v]) path.unshift(g.pos[v]);
    }
  }
  per.set(key, path);
  return path;
}

/** Pieces of a cable in building coordinates, handed to the floors they run through (vertical runs are split). */
function absolutePolyline(building: Building, pts: V3[], power: number, kind: FlowKind, homeFloor: Floor): FlowSegment[] {
  const floors = [...building.floors].sort((a, b) => a.elevation - b.elevation);
  const floorAt = (y: number): Floor => {
    let best = homeFloor;
    for (const f of floors) if (y >= f.elevation - 0.01) best = f;
    // above the top floor the roof's cables belong to the top floor; below the lowest floor to that floor
    return best;
  };
  const out: FlowSegment[] = [];
  let dist = 0;
  for (let i = 0; i + 1 < pts.length; i++) {
    let a = pts[i];
    const b = pts[i + 1];
    const len = Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
    if (len < 1e-4) continue;
    // a vertical run through several floors: one piece per floor
    const cuts: number[] = [];
    if (Math.abs(b[1] - a[1]) > 0.01) {
      const lo = Math.min(a[1], b[1]);
      const hi = Math.max(a[1], b[1]);
      for (const f of floors) if (f.elevation > lo + 0.01 && f.elevation < hi - 0.01) cuts.push(f.elevation);
      if (b[1] < a[1]) cuts.reverse();
    }
    for (const y of [...cuts, b[1]]) {
      const t = (y - a[1]) / (b[1] - a[1] || 1);
      const q: V3 = Math.abs(b[1] - a[1]) > 0.01 ? [a[0] + (b[0] - a[0]) * t, y, a[2] + (b[2] - a[2]) * t] : b;
      const f = floorAt((a[1] + q[1]) / 2);
      const l = Math.hypot(q[0] - a[0], q[1] - a[1], q[2] - a[2]);
      if (l > 1e-4) out.push({ floorId: f.id, a: [a[0], a[1] - f.elevation, a[2]], b: [q[0], q[1] - f.elevation, q[2]], dist, power, kind });
      dist += l;
      a = q;
    }
  }
  return out;
}

/**
 * The cable of a solar field: down the slope to the eave, down the facade, along the outer walls and in to the
 * inverter (building coordinates; a garden field runs along the ground, a wall field straight down its wall).
 */
function solarRoute(building: Building, f: SolarField, power: number, target: DevicePos, targetY: number): FlowSegment[] {
  const faces = [...roofFaces(building), ...wallFaces(building)];
  const face = fieldFace(building, f, faces);
  const floor = building.floors.find((x) => x.id === target.floorId);
  if (!face || !floor) return [];
  const [w] = fieldSize(face, f);
  const at = (u: number, s: number): V3 => [face.o[0] + face.eu[0] * u + face.es[0] * s, face.o[1] + face.eu[1] * u + face.es[1] * s, face.o[2] + face.eu[2] * u + face.es[2] * s];
  const u = f.u + w / 2;
  const pts: V3[] = [];
  let exit: V3;
  // the height of the run along the outer walls: on the ground for garden and wall fields, just above the
  // inverter for roof fields (the cable comes down the facade to it)
  let y = floor.elevation + CABLE_Y;
  if (face.unbounded) {
    // a garden field: its cable starts under the middle of the field, on the ground
    const [, d] = fieldSize(face, f);
    const c = at(u, f.v + d / 2);
    exit = [c[0], y, c[2]];
    pts.push(exit);
  } else if (face.wall) {
    // a wall field: straight down the wall from the field's lower edge
    const bottom = at(u, f.v);
    exit = [bottom[0], y, bottom[2]];
    pts.push(bottom, exit);
  } else {
    // a roof field: from its lower edge down the slope to the eave
    exit = at(u, 0);
    pts.push(at(u, f.v), exit);
    y = floor.elevation + targetY + 0.25;
  }
  // in to the facade under the eave, down it, along the outside of the house to the point nearest the device
  const path = outlinePath(building, floor, [exit[0], exit[2]], [target.x, target.z]);
  const first = path[0];
  if (first && !face.unbounded && !face.wall) pts.push([first[0], exit[1], first[1]]);
  for (const p of path) pts.push([p[0], y, p[1]]);
  // then in through the wall to the device
  const last = path[path.length - 1];
  const end: V3 = [target.x, floor.elevation + targetY, target.z];
  if (last && Math.abs(y - end[1]) > 0.05) pts.push([last[0], end[1], last[1]]);
  pts.push(end);
  return absolutePolyline(building, pts, power, "solar", floor);
}

/** Power (W) of every solar field: its own sensor, else its string's sensor shared by modules, else the plant's. */
export function fieldPowers(hass: HomeAssistant, building: Building, solar: number | null): Map<string, number> {
  const out = new Map<string, number>();
  const fields = building.settings.roof.solar ?? [];
  const strings = building.settings.roof.strings ?? [];
  const modules = (f: SolarField) => Math.max(1, f.rows * f.cols - (f.skip?.length ?? 0));
  const rest: SolarField[] = [];
  let known = 0;
  const byString = new Map<string, SolarField[]>();
  for (const f of fields) {
    const own = f.entity && f.entity !== "none" ? readPower(hass.states[f.entity]) : null;
    if (own !== null) {
      out.set(f.id, Math.max(0, own));
      known += Math.max(0, own);
      continue;
    }
    const s = f.string ? strings.find((x) => x.id === f.string) : undefined;
    const sp = s?.entity && s.entity !== "none" ? readPower(hass.states[s.entity]) : null;
    if (s && sp !== null) {
      byString.set(s.id, [...(byString.get(s.id) ?? []), f]);
      continue;
    }
    rest.push(f);
  }
  for (const [id, group] of byString) {
    const s = strings.find((x) => x.id === id)!;
    const p = Math.max(0, readPower(hass.states[s.entity!]) ?? 0);
    const total = group.reduce((n, f) => n + modules(f), 0);
    for (const f of group) out.set(f.id, (p * modules(f)) / total);
    known += p;
  }
  // the rest shares what the plant makes beyond the fields already known
  const left = Math.max(0, (solar ?? 0) - known);
  const total = rest.reduce((n, f) => n + modules(f), 0);
  for (const f of rest) out.set(f.id, total ? (left * modules(f)) / total : 0);
  return out;
}

/**
 * Cable colours: the sun yellow, the battery green, the wallbox blue, export cyan, import red-violet; the house
 * cables take the colour of what feeds the house right now.
 */
export const FLOW_COLORS = {
  solar: [1, 0.78, 0.2] as [number, number, number],
  battery: [0.25, 1, 0.6] as [number, number, number],
  wallbox: [0.3, 0.75, 1] as [number, number, number],
  house: [0.6, 0.72, 1] as [number, number, number],
  export: [0.2, 0.95, 1] as [number, number, number],
  import: [1, 0.3, 0.65] as [number, number, number],
};

export function flowColor(kind: FlowKind, summary: EnergySummary): [number, number, number] {
  if (kind === "grid") return FLOW_COLORS.import;
  if (kind === "export") return FLOW_COLORS.export;
  if (kind === "solar") return FLOW_COLORS.solar;
  if (kind === "battery") return FLOW_COLORS.battery;
  if (kind === "wallbox") return FLOW_COLORS.wallbox;
  // the inverter's feed: the sun, or the battery's discharge at night
  if (kind === "inverter") return (summary.solar ?? 0) > 5 ? FLOW_COLORS.solar : FLOW_COLORS.battery;
  // what feeds the house: grid import, the part of the sun not exported, battery discharge
  const shares: [number, [number, number, number]][] = [
    [Math.max(0, summary.grid ?? 0), FLOW_COLORS.house],
    [Math.max(0, (summary.solar ?? 0) - Math.max(0, -(summary.grid ?? 0)) - Math.max(0, -(summary.battery ?? 0))), FLOW_COLORS.solar],
    [Math.max(0, summary.battery ?? 0), FLOW_COLORS.battery],
  ];
  // mixed colours wash out to white on the dark floor, so the largest source wins
  const [best] = shares.reduce((a, b) => (b[0] > a[0] ? b : a));
  return best > 0 ? shares.find((s) => s[0] === best)![1] : FLOW_COLORS.house;
}
