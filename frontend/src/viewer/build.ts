// Builds merged, vertex-coloured geometry for one floor: room floors with material patterns, walls
// with door and window openings, edge lines and baked wall shadows.
//
// Walls are grouped into buckets by the direction they face. Every vertex carries a "fold" value and a
// shader patch (see fold.ts) decides per bucket: in the cut view the upper parts disappear; in the tall
// view the walls turned towards the camera are drawn as tinted glass instead.
//   fold = -1        always visible, never glass (furniture, lines of the lower part)
//   fold = b         upper wall part: visible while bucket b stands
//   fold = 16 + b    cut edge: visible while bucket b is cut
//   fold = 32 + b    lower wall part: always visible, glass when the bucket is
//   fold = 48 + b    top face of the lower part at the cut height: visible while bucket b is cut

import { Color, type BufferGeometry } from "three";
import type { Floor, Opening, Room, SolarField, Vec2 } from "../model.ts";
import { furnitureFootprint, isLamp, pointInPolygon } from "../model.ts";
import { generateWalls, locateOpening, openingHost, type Wall } from "../geometry/walls.ts";
import { holeInRoom, insetHole, mergeHoles } from "../geometry/holes.ts";
import { pushFurniture } from "./furniture.ts";
import { mountBase, packItem } from "../packs.ts";
import { pushOutdoor } from "./outdoor.ts";
import { ALWAYS, CAP_OFFSET, CUT_OFFSET, EDGE_BASE, EDGE_CUT, EDGE_SOFT, EDGE_TOP, GeoBuffer, LineBuffer, LOWER_OFFSET, pushPrism, pushSlopedPrism, triangulate } from "./geo.ts";
import type { RoofCeiling } from "../roof-sections.ts";
import { pushModules } from "./roof.ts";
import type { RoofFace } from "../solar.ts";

export { ALWAYS, CUT_OFFSET, GeoBuffer, LineBuffer, pushPrism, shade } from "./geo.ts";

export const NEON = {
  floor: 0x0e1629,
  slab: 0x0a1120,
  wall: 0x131d31,
  wallTop: 0x14303f,
  edge: 0x37e0ff,
  edgeSoft: 0x5b7cff,
};

/** Floor tint and pattern tile (column, row in the pattern atlas) per floor material. */
export const FLOOR_LOOK: Record<string, { color: number; tile: [number, number] }> = {
  wood: { color: 0x111a2e, tile: [0, 0] },
  oak: { color: 0x131b2d, tile: [1, 0] },
  tiles: { color: 0x0e182f, tile: [2, 0] },
  carpet: { color: 0x10152b, tile: [0, 1] },
  stone: { color: 0x0f172b, tile: [1, 1] },
  concrete: { color: 0x111827, tile: [2, 1] },
};

/** Opening resolved onto its wall, as needed for frames, sashes and blinds. */
export interface OpeningInfo {
  opening: Opening;
  /** Fold bucket of the wall it sits in. */
  bucket: number;
  /** Start of the opening on the wall axis and the axis direction (x, z). */
  start: Vec2;
  axis: Vec2;
  width: number;
  /** Unit normal pointing into the opening's room. */
  toRoom: Vec2;
  /** Distance from the wall axis to the room-side face and to the other face. */
  faceRoom: number;
  faceOut: number;
  sill: number;
  top: number;
  /** True when the sash hinge is at the start of the opening (as seen along the axis). */
  hingeAtStart: boolean;
  exterior: boolean;
}

export interface FloorGeometry {
  floor: BufferGeometry;
  /** Triangle ranges of room tops (for picking and highlighting) with their base colour. */
  roomTris: { roomId: string; start: number; end: number; color: number }[];
  /** Openings cut into the floor (stairwells, galleries): the light surface leaves them out. */
  holes: Vec2[][];
  /** Walls (with folding upper parts) and furniture. */
  walls: BufferGeometry;
  lines: BufferGeometry;
  /** Multiply layer darkening the floor along walls and under furniture (baked occlusion). */
  shadow: BufferGeometry;
  /** Outward direction (x, z) of each fold bucket; null for interior walls. Index = bucket id. */
  buckets: (Vec2 | null)[];
  openings: OpeningInfo[];
  walls2d: Wall[];
  /** Fold bucket of each wall in walls2d. */
  wallBuckets: number[];
  /** Triangle ranges of furniture in `walls`, for tapping furniture in 3D. */
  furnitureTris: { id: string; start: number; end: number }[];
  /** Roof underside above a plan point in floor coordinates (Infinity where no sloped roof is). */
  roofTop(p: Vec2): number;
}

export const SLAB = 0.2;
const BUCKETS = 8;
const SHADOW_WIDTH = 0.42;
const SHADOW_DARK = 0.42;

/** Openings placed on a wall, as spans along its axis (metres from wall.a). */
interface Span {
  s0: number;
  s1: number;
  sill: number;
  top: number;
  info: OpeningInfo;
}

export function buildFloorGeometry(
  floor: Floor,
  wallExterior: number,
  wallInterior: number,
  holes: Vec2[][] = [],
  /** Solar fields standing in this floor's garden, with their ground. */
  solar: { face: RoofFace; field: SolarField }[] = [],
  /** The roof section above (attic floors): walls end at its underside. */
  ceiling: RoofCeiling | null = null,
): FloorGeometry {
  const { walls } = generateWalls(floor.rooms, { exterior: wallExterior, interior: wallInterior }, floor.walls ?? []);
  const cut = Math.min(floor.cut_height, floor.height);
  const slope = slopeOf(floor, ceiling, cut);

  // ---------------------------------------------------------------- floors (with stair holes)
  const floorBuf = new GeoBuffer(true, true);
  const roomTris: FloorGeometry["roomTris"] = [];
  const holeLines = new LineBuffer();
  const cutHoles: Vec2[][] = [];
  for (const room of floor.rooms) {
    if (room.points.length < 3) continue;
    const poly = ccw(room.points);
    const look = FLOOR_LOOK[room.floor_material] ?? FLOOR_LOOK.wood;
    const top = new Color(look.color);
    // an opening snapped to the room's edge is still cut, a few millimetres in from it
    const inside = holes.filter((h) => holeInRoom(h, poly)).map((h) => insetHole(h, 0.003));
    cutHoles.push(...inside);
    const all = [...poly, ...inside.flat()];
    const start = floorBuf.count;
    for (const [i, j, l] of triangulate(poly, inside)) {
      const a = all[i];
      const b = all[j];
      const c = all[l];
      floorBuf.tri([a[0], 0, a[1]], [c[0], 0, c[1]], [b[0], 0, b[1]], top, top, top, [a[0], a[1], c[0], c[1], b[0], b[1]], ALWAYS, look.tile);
    }
    roomTris.push({ roomId: room.id, start, end: floorBuf.count, color: look.color });
    const slab = new Color(NEON.slab);
    const sides = (ring: Vec2[]) => {
      for (let i = 0; i < ring.length; i++) {
        const a = ring[i];
        const b = ring[(i + 1) % ring.length];
        floorBuf.tri([a[0], -SLAB, a[1]], [a[0], 0, a[1]], [b[0], 0, b[1]], slab);
        floorBuf.tri([a[0], -SLAB, a[1]], [b[0], 0, b[1]], [b[0], -SLAB, b[1]], slab);
      }
    };
    sides(poly);
    for (const h of inside) {
      // the hole's inner faces look into the hole
      sides([...ccw(h)].reverse());
      for (let i = 0; i < h.length; i++) {
        const a = h[i];
        const b = h[(i + 1) % h.length];
        // a bright rim like the walls' tops, so the opening reads from above
        holeLines.seg([a[0], 0.006, a[1]], [b[0], 0.006, b[1]], EDGE_TOP);
        holeLines.seg([a[0], -SLAB, a[1]], [b[0], -SLAB, b[1]], EDGE_SOFT);
      }
    }
  }

  // ---------------------------------------------------------------- buckets and openings
  const bucketIndex = new Map<string, number>();
  const buckets: (Vec2 | null)[] = [];
  const wallBucket = new Map<Wall, number>();
  for (const wall of walls) {
    let key = "interior";
    let normal: Vec2 | null = null;
    if (wall.exterior) {
      const dx = wall.b[0] - wall.a[0];
      const dz = wall.b[1] - wall.a[1];
      const l = Math.hypot(dx, dz) || 1;
      const out: Vec2 = [dz / l, -dx / l]; // right normal: away from the room
      const sector = ((Math.round((Math.atan2(out[1], out[0]) / (2 * Math.PI)) * BUCKETS) % BUCKETS) + BUCKETS) % BUCKETS;
      key = `s${sector}`;
      const ang = (sector / BUCKETS) * 2 * Math.PI;
      normal = [Math.cos(ang), Math.sin(ang)];
    }
    let b = bucketIndex.get(key);
    if (b === undefined) {
      b = buckets.length;
      bucketIndex.set(key, b);
      buckets.push(normal);
    }
    wallBucket.set(wall, b);
  }

  const spans = new Map<Wall, Span[]>();
  const openings: OpeningInfo[] = [];
  for (const o of floor.openings) {
    const host = openingHost(o, floor.rooms, floor.walls ?? []);
    if (!host) continue;
    const hit = locateOpening(walls, o, host);
    if (!hit) continue;
    const { wall, s } = hit;
    const ax: Vec2 = unit([wall.b[0] - wall.a[0], wall.b[1] - wall.a[1]]);
    const len = Math.hypot(wall.b[0] - wall.a[0], wall.b[1] - wall.a[1]);
    const width = Math.min(o.width, len);
    const s0 = Math.max(0, Math.min(len - width, s - width / 2));
    // in a free wall the "room" side is the left of the wall as drawn
    const hp = host.room.points;
    const roomLeft = wall.free ? ax[0] * (hp[1][0] - hp[0][0]) + ax[1] * (hp[1][1] - hp[0][1]) > 0 : wall.roomLeft === o.room_id;
    const nLeft: Vec2 = [-ax[1], ax[0]];
    const toRoom: Vec2 = roomLeft ? nLeft : [-nLeft[0], -nLeft[1]];
    // an opening under a sloped roof ends below it
    const top = Math.min(wallHeight(wall, floor.height) - 0.02, o.sill + o.height, slope.lowest(wall, s0, s0 + width) - 0.02);
    const sill = Math.max(0, Math.min(o.sill, top - 0.1));
    // looking at the wall from the room, "right" is (toRoom.z, -toRoom.x)
    const right: Vec2 = [toRoom[1], -toRoom[0]];
    const startIsLeft = ax[0] * right[0] + ax[1] * right[1] > 0;
    const info: OpeningInfo = {
      opening: o,
      bucket: wallBucket.get(wall)!,
      start: [wall.a[0] + ax[0] * s0, wall.a[1] + ax[1] * s0],
      axis: ax,
      width,
      toRoom,
      faceRoom: roomLeft ? wall.left : wall.right,
      faceOut: roomLeft ? wall.right : wall.left,
      sill,
      top,
      hingeAtStart: (o.hinge === "left") === startIsLeft,
      exterior: wall.exterior,
    };
    openings.push(info);
    let list = spans.get(wall);
    if (!list) spans.set(wall, (list = []));
    list.push({ s0, s1: s0 + width, sill, top, info });
  }

  // ---------------------------------------------------------------- wall solids
  const wallBuf = new GeoBuffer();
  for (const wall of walls) {
    const b = wallBucket.get(wall)!;
    const ax = unit([wall.b[0] - wall.a[0], wall.b[1] - wall.a[1]]);
    const list = (spans.get(wall) ?? []).sort((p, q) => p.s0 - q.s0);
    const H = wallHeight(wall, floor.height);
    // pieces along the axis: solid between openings, sill and lintel inside them
    const pieces: { t0: number; t1: number; ranges: [number, number][] }[] = [];
    let t = -Infinity;
    for (const sp of list) {
      if (sp.s0 > t) pieces.push({ t0: t, t1: sp.s0, ranges: [[-SLAB, H]] });
      pieces.push({ t0: Math.max(t, sp.s0), t1: sp.s1, ranges: [[-SLAB, sp.sill], [sp.top, H]] });
      t = Math.max(t, sp.s1);
    }
    pieces.push({ t0: t, t1: Infinity, ranges: [[-SLAB, H]] });
    // under a sloped roof: slices along the wall where the roof is linear, each with its own top
    const bends = slope.bends(wall, H);
    for (const piece of bends ? pieces.flatMap((pc) => sliceAt(pc, bends)) : pieces) {
      const poly = clipAlong(wall.footprint, wall.a, ax, piece.t0, piece.t1);
      if (poly.length < 3) continue;
      if (bends) {
        const tops = slope.tops(poly, wall.a, ax, piece.t0, piece.t1, H);
        for (const [y0, y1] of piece.ranges) pushSlopedRange(wallBuf, poly, y0, tops.map((t) => Math.min(y1, t)), y0 > 0.01, cut, b);
        continue;
      }
      for (const [y0, y1] of piece.ranges) {
        if (y1 - y0 < 1e-4) continue;
        const lintel = y0 > 0.01;
        if (y0 < cut - 1e-6) {
          // the top face at the cut height is only seen while the wall is cut
          const topFold = y1 > cut + 1e-6 ? CAP_OFFSET + b : LOWER_OFFSET + b;
          pushPrism(wallBuf, poly, y0, Math.min(y1, cut), NEON.wall, NEON.wallTop, { aoFrom: 0, bottom: lintel, fold: LOWER_OFFSET + b, topFold });
        }
        if (y1 > cut + 1e-6) pushPrism(wallBuf, poly, Math.max(y0, cut), y1, NEON.wall, NEON.wallTop, { aoFrom: 0, fold: b, bottom: lintel && y0 >= cut });
      }
    }
  }

  // ---------------------------------------------------------------- edges
  const points = walls.flatMap((w) => w.footprint);
  const outline = outlineOf(walls, points);
  const lines = new LineBuffer();
  lines.p.push(...holeLines.p);
  lines.c.push(...holeLines.c);
  lines.f.push(...holeLines.f);
  const spansOf = (w: Wall, keep: (sp: Span) => boolean) => (spans.get(w) ?? []).filter(keep);
  for (const e of outline.edges) {
    const b = wallBucket.get(e.wall)!;
    // base line along the floor: not across doorways
    for (const [p, q] of subtractSpans(e, spansOf(e.wall, (sp) => sp.sill <= 0.005))) lines.seg([p[0], 0.004, p[1]], [q[0], 0.004, q[1]], EDGE_BASE);
    const H = wallHeight(e.wall, floor.height);
    // pieces of the edge with the wall's top at both ends (sloped under a roof)
    const topped = (parts: [Vec2, Vec2][]) => parts.flatMap(([p, q]) => slope.along(e.wall, p, q, H));
    // cut line: not where an opening crosses the cut height, nor where a sloped roof comes down below it
    for (const [p, q, yp, yq] of topped(subtractSpans(e, spansOf(e.wall, (sp) => sp.sill < cut && sp.top > cut)))) {
      if (Math.min(yp, yq) > cut + 1e-6) lines.seg([p[0], cut, p[1]], [q[0], cut, q[1]], EDGE_CUT, CUT_OFFSET + b);
    }
    // top line: not where an opening reaches the top; a wall below the cut height keeps its top line
    for (const [p, q, yp, yq] of topped(subtractSpans(e, spansOf(e.wall, (sp) => sp.top >= H - 0.021)))) {
      lines.seg([p[0], yp, p[1]], [q[0], yq, q[1]], EDGE_TOP, Math.max(yp, yq) <= cut + 1e-6 ? LOWER_OFFSET + b : b);
    }
  }
  for (const c of outline.corners) {
    const H = Math.min(wallHeight(c.wall, floor.height), slope.topAt(c.p));
    if (H < 0.01) continue;
    lines.segSplit([c.p[0], 0.004, c.p[1]], [c.p[0], H, c.p[1]], EDGE_SOFT, Math.min(cut, H), wallBucket.get(c.wall)!);
  }
  for (const list of spans.values()) for (const sp of list) pushOpeningLines(lines, sp, cut);
  // the sloped ceiling over the rooms, drawn by its rafters and purlins (folded away in the cut view)
  if (ceiling) {
    let interior = bucketIndex.get("interior");
    if (interior === undefined) {
      interior = buckets.length;
      bucketIndex.set("interior", interior);
      buckets.push(null);
    }
    pushCeilingLines(lines, floor, ceiling, interior);
  }

  // ---------------------------------------------------------------- furniture and shadows
  const shadow = buildShadow(outline.edges, floor.rooms, spans);
  pushOutdoor(wallBuf, lines, floor);
  for (const s of solar) pushModules(wallBuf, lines, s.face, s.field, floor.elevation);

  // lamps are drawn live by the viewer (they glow with their light)
  const furnitureTris: FloorGeometry["furnitureTris"] = [];
  for (const f of floor.furniture) {
    if (isLamp(f.type)) continue;
    const start = wallBuf.count;
    pushFurniture(wallBuf, lines, shadow, f, mountBase(floor, f));
    furnitureTris.push({ id: f.id, start, end: wallBuf.count });
  }

  return {
    floor: floorBuf.geometry(),
    roomTris,
    holes: cutHoles,
    walls: wallBuf.geometry(),
    lines: lines.geometry(),
    shadow: shadow.geometry(),
    buckets,
    openings,
    walls2d: walls,
    wallBuckets: walls.map((w) => wallBucket.get(w)!),
    furnitureTris,
    roofTop: slope.topAt,
  };
}

/**
 * The roof's underside where it is a sloped ceiling of this floor: its rafters and purlins, cut to the
 * rooms and to the floor's height (above the floor, below where the floor's walls would end).
 */
function pushCeilingLines(lines: LineBuffer, floor: Floor, ceiling: RoofCeiling, bucket: number): void {
  const rooms = floor.rooms.filter((r) => r.points.length >= 3);
  if (!rooms.length) return;
  const H = floor.height;
  const local = (p: Vec2) => {
    const c = ceiling.at(p[0], p[1]);
    return c == null ? Infinity : c - floor.elevation;
  };
  const inRoom = (p: Vec2) => rooms.some((r) => pointInPolygon(p, r.points));
  for (const [a, b] of ceiling.grid()) {
    const lerp = (t: number): Vec2 => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
    const ts = [0, 1, ...ceiling.breaks(a, b)];
    for (const r of rooms) {
      for (let i = 0; i < r.points.length; i++) {
        const p = r.points[i];
        const q = r.points[(i + 1) % r.points.length];
        const dx = b[0] - a[0];
        const dz = b[1] - a[1];
        const ex = q[0] - p[0];
        const ez = q[1] - p[1];
        const den = dx * ez - dz * ex;
        if (Math.abs(den) < 1e-9) continue;
        const t = ((p[0] - a[0]) * ez - (p[1] - a[1]) * ex) / den;
        const k = ((p[0] - a[0]) * dz - (p[1] - a[1]) * dx) / den;
        if (k >= 0 && k <= 1) ts.push(t);
      }
    }
    const cuts = [...new Set(ts.filter((t) => t >= 0 && t <= 1).map((t) => Math.round(t * 1e6) / 1e6))].sort((p, q) => p - q);
    // within each piece the height is linear: also cut where it passes the floor or the wall tops
    const pieces: [number, number][] = [];
    for (let i = 0; i + 1 < cuts.length; i++) {
      const t0 = cuts[i];
      const t1 = cuts[i + 1];
      if (t1 - t0 < 1e-6) continue;
      const e = (t1 - t0) * 1e-3;
      const y0 = local(lerp(t0 + e));
      const y1 = local(lerp(t1 - e));
      const ts2 = [t0];
      if (Number.isFinite(y0) && Number.isFinite(y1)) for (const level of [0.02, H - 0.02]) if ((y0 - level) * (y1 - level) < 0) ts2.push(t0 + ((level - y0) / (y1 - y0)) * (t1 - t0));
      ts2.push(t1);
      ts2.sort((p, q) => p - q);
      for (let j = 0; j + 1 < ts2.length; j++) pieces.push([ts2[j], ts2[j + 1]]);
    }
    for (const [t0, t1] of pieces) {
      const mid = lerp((t0 + t1) / 2);
      const ym = local(mid);
      if (!(ym > 0.02 && ym < H - 0.02) || !inRoom(mid)) continue;
      const e = (t1 - t0) * 1e-3;
      const pa = lerp(t0);
      const pb = lerp(t1);
      lines.seg([pa[0], local(lerp(t0 + e)), pa[1]], [pb[0], local(lerp(t1 - e)), pb[1]], EDGE_SOFT, bucket);
    }
  }
}

/** Wall pieces between openings: from t0 to t1 along the axis, with the height ranges they fill. */
interface Piece {
  t0: number;
  t1: number;
  ranges: [number, number][];
}

/** A piece cut at the given positions along the axis. */
function sliceAt(piece: Piece, at: number[]): Piece[] {
  const inner = at.filter((s) => s > piece.t0 + 1e-6 && s < piece.t1 - 1e-6);
  const ends = [piece.t0, ...inner, piece.t1];
  return ends.slice(1).map((t1, i) => ({ t0: ends[i], t1, ranges: piece.ranges }));
}

/**
 * A wall slice under a sloped roof: the height range from y0 up to its top at each corner. The slice
 * lies either above or below the cut height (bends include the cut), so it folds like a straight wall.
 */
function pushSlopedRange(buf: GeoBuffer, poly: Vec2[], y0: number, tops: number[], lintel: boolean, cut: number, b: number): void {
  const t = tops.map((y) => Math.max(y0, y));
  if (Math.max(...t) - y0 < 1e-4) return;
  const low = Math.min(...t);
  if (y0 < cut - 1e-6) {
    if (low >= cut - 1e-6) {
      pushPrism(buf, poly, y0, cut, NEON.wall, NEON.wallTop, { aoFrom: 0, bottom: lintel, fold: LOWER_OFFSET + b, topFold: CAP_OFFSET + b });
      if (Math.max(...t) > cut + 1e-6) pushSlopedPrism(buf, poly, cut, t, NEON.wall, NEON.wallTop, { aoFrom: 0, fold: b });
    } else pushSlopedPrism(buf, poly, y0, t, NEON.wall, NEON.wallTop, { aoFrom: 0, bottom: lintel, fold: LOWER_OFFSET + b, topFold: LOWER_OFFSET + b });
  } else pushSlopedPrism(buf, poly, y0, t, NEON.wall, NEON.wallTop, { aoFrom: 0, fold: b, bottom: lintel });
}

/** How a floor's walls end under a sloped roof (everything at full height when there is none). */
interface Slope {
  /** Roof underside above a plan point, in floor coordinates (Infinity where there is no roof). */
  topAt(p: Vec2): number;
  /** Positions along a wall (from wall.a) where its top bends, or null when the roof stays above it. */
  bends(wall: Wall, H: number): number[] | null;
  /** Top at each corner of a slice between t0 and t1 along the axis, at most H. */
  tops(poly: Vec2[], origin: Vec2, ax: Vec2, t0: number, t1: number, H: number): number[];
  /** Lowest roof underside over a stretch of a wall (Infinity without a roof). */
  lowest(wall: Wall, s0: number, s1: number): number;
  /** An edge along a wall cut where the top bends, with the top at both ends of each piece. */
  along(wall: Wall, p: Vec2, q: Vec2, H: number): [Vec2, Vec2, number, number][];
}

function slopeOf(floor: Floor, ceiling: RoofCeiling | null, cut: number): Slope {
  const topAt = (p: Vec2) => {
    const c = ceiling?.at(p[0], p[1]);
    return c == null ? Infinity : c - floor.elevation;
  };
  const axisOf = (wall: Wall) => unit([wall.b[0] - wall.a[0], wall.b[1] - wall.a[1]]);
  const point = (wall: Wall, s: number): Vec2 => {
    const ax = axisOf(wall);
    return [wall.a[0] + ax[0] * s, wall.a[1] + ax[1] * s];
  };
  /** Where the roof bends along a wall's axis, as distances from wall.a over the footprint's length. */
  const raw = (wall: Wall, from?: number, to?: number): number[] => {
    if (!ceiling) return [];
    const ax = axisOf(wall);
    const len = Math.hypot(wall.b[0] - wall.a[0], wall.b[1] - wall.a[1]) || 1;
    const along = wall.footprint.map((p) => (p[0] - wall.a[0]) * ax[0] + (p[1] - wall.a[1]) * ax[1]);
    const lo = from ?? Math.min(...along);
    const hi = to ?? Math.max(...along);
    const inner = ceiling.breaks(wall.a, wall.b).map((t) => t * len).filter((s) => s > lo + 1e-6 && s < hi - 1e-6);
    return [lo, ...inner, hi];
  };
  /** The roof inside an interval: its height just inside both ends (it is linear in between). */
  const ends = (wall: Wall, s0: number, s1: number): [number, number] => {
    const e = Math.min(1e-4, (s1 - s0) / 4);
    return [topAt(point(wall, s0 + e)), topAt(point(wall, s1 - e))];
  };
  return {
    topAt,
    bends(wall, H) {
      if (!ceiling) return null;
      const ss = raw(wall);
      const out = [...ss];
      let touched = false;
      for (let i = 0; i + 1 < ss.length; i++) {
        const [g0, g1] = ends(wall, ss[i], ss[i + 1]);
        if (Math.min(g0, g1) < H - 1e-6) touched = true;
        if (!Number.isFinite(g0) || !Number.isFinite(g1)) continue;
        // where the roof passes the wall's height or the cut height, the slice changes its kind
        for (const level of [H, cut]) {
          if ((g0 - level) * (g1 - level) < 0) out.push(ss[i] + ((level - g0) / (g1 - g0)) * (ss[i + 1] - ss[i]));
        }
      }
      return touched ? out.sort((p, q) => p - q) : null;
    },
    tops(poly, origin, ax, t0, t1, H) {
      // evaluated a hair inside the slice, so a corner on a section's edge takes the slice's side
      const mid = (Math.max(t0, -1e9) + Math.min(t1, 1e9)) / 2;
      return poly.map((p) => {
        const t = (p[0] - origin[0]) * ax[0] + (p[1] - origin[1]) * ax[1];
        const k = t < mid ? 1e-4 : -1e-4;
        return Math.max(0, Math.min(H, topAt([p[0] + ax[0] * k, p[1] + ax[1] * k])));
      });
    },
    lowest(wall, s0, s1) {
      if (!ceiling) return Infinity;
      const ss = raw(wall, s0, s1);
      let low = Infinity;
      for (let i = 0; i + 1 < ss.length; i++) low = Math.min(low, ...ends(wall, ss[i], ss[i + 1]));
      return low;
    },
    along(wall, p, q, H) {
      const top = (y: number) => Math.max(0, Math.min(H, y));
      if (!ceiling) return [[p, q, H, H]];
      const ax = axisOf(wall);
      const sp = (p[0] - wall.a[0]) * ax[0] + (p[1] - wall.a[1]) * ax[1];
      const sq = (q[0] - wall.a[0]) * ax[0] + (q[1] - wall.a[1]) * ax[1];
      const lo = Math.min(sp, sq);
      const hi = Math.max(sp, sq);
      // an edge across the wall (its end) keeps one height: the roof at its middle
      if (hi - lo < 1e-4) {
        const y = top(topAt([(p[0] + q[0]) / 2, (p[1] + q[1]) / 2]));
        return [[p, q, y, y]];
      }
      const cuts = this.bends(wall, H) ?? [];
      const ss = [lo, ...cuts.filter((s) => s > lo + 1e-6 && s < hi - 1e-6), hi];
      const at = (s: number): Vec2 => {
        const k = (s - sp) / (sq - sp);
        return [p[0] + (q[0] - p[0]) * k, p[1] + (q[1] - p[1]) * k];
      };
      const out: [Vec2, Vec2, number, number][] = [];
      for (let i = 0; i + 1 < ss.length; i++) {
        const a = at(ss[i]);
        const c = at(ss[i + 1]);
        const e = Math.min(1e-4, (ss[i + 1] - ss[i]) / 4);
        const ya = top(topAt(at(ss[i] + e)));
        const yc = top(topAt(at(ss[i + 1] - e)));
        // keep the edge's direction
        out.push(sp <= sq ? [a, c, ya, yc] : [c, a, yc, ya]);
      }
      return sp <= sq ? out : out.reverse();
    },
  };
}

/** Jambs, sill and lintel edges of an opening on both wall faces, split at the cut height. */
function pushOpeningLines(lines: LineBuffer, sp: Span, cut: number): void {
  const { info } = sp;
  const b = info.bucket;
  const at = (s: number, n: number, y: number) => [
    info.start[0] + info.axis[0] * (s - sp.s0) + info.toRoom[0] * n,
    y,
    info.start[1] + info.axis[1] * (s - sp.s0) + info.toRoom[1] * n,
  ];
  const foldAt = (y: number) => (y > cut + 1e-6 ? b : ALWAYS);
  const bottom = Math.max(sp.sill, 0.004);
  for (const n of [info.faceRoom, -info.faceOut]) {
    for (const s of [sp.s0, sp.s1]) lines.segSplit(at(s, n, bottom), at(s, n, sp.top), EDGE_SOFT, cut, b);
    lines.seg(at(sp.s0, n, sp.top), at(sp.s1, n, sp.top), EDGE_SOFT, foldAt(sp.top));
    if (sp.sill > 0.01) lines.seg(at(sp.s0, n, sp.sill), at(sp.s1, n, sp.sill), EDGE_SOFT, foldAt(sp.sill));
  }
  // edges across the wall thickness (reveals), and the cut section of the jambs
  for (const s of [sp.s0, sp.s1]) {
    lines.seg(at(s, info.faceRoom, sp.top), at(s, -info.faceOut, sp.top), EDGE_SOFT, foldAt(sp.top));
    if (sp.sill > 0.01) lines.seg(at(s, info.faceRoom, sp.sill), at(s, -info.faceOut, sp.sill), EDGE_SOFT, foldAt(sp.sill));
    if (sp.sill < cut && sp.top > cut) lines.seg(at(s, info.faceRoom, cut), at(s, -info.faceOut, cut), EDGE_CUT, CUT_OFFSET + b);
  }
}

/** Part of a polygon between two lines perpendicular to `axis` (t measured from `origin`). */
export function clipAlong(poly: Vec2[], origin: Vec2, axis: Vec2, t0: number, t1: number): Vec2[] {
  const t = (p: Vec2) => (p[0] - origin[0]) * axis[0] + (p[1] - origin[1]) * axis[1];
  let out = poly;
  if (Number.isFinite(t0)) out = clipHalf(out, (p) => t(p) - t0);
  if (Number.isFinite(t1)) out = clipHalf(out, (p) => t1 - t(p));
  return out;
}

/** Sutherland–Hodgman against one half-plane (keeps d(p) >= 0). */
function clipHalf(poly: Vec2[], d: (p: Vec2) => number): Vec2[] {
  const out: Vec2[] = [];
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i];
    const b = poly[(i + 1) % poly.length];
    const da = d(a);
    const db = d(b);
    if (da >= 0) out.push(a);
    if (da >= 0 !== db >= 0) {
      const k = da / (da - db);
      out.push([a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k]);
    }
  }
  return out;
}

interface OutlineEdge {
  a: Vec2;
  b: Vec2;
  wall: Wall;
}

interface Outline {
  /** Edges of the merged wall footprints (joints between walls left out), counter-clockwise per wall. */
  edges: OutlineEdge[];
  /** Vertices where the outline turns a corner, with a wall they belong to. */
  corners: { p: Vec2; wall: Wall }[];
}

const r3 = (v: number) => Math.round(v * 1000);
const vkey = (p: Vec2) => `${r3(p[0])},${r3(p[1])}`;
const ekey = (a: Vec2, b: Vec2) => {
  const s = vkey(a);
  const t = vkey(b);
  return s < t ? `${s}|${t}` : `${t}|${s}`;
};

/** Edges of a polygon, split wherever one of `points` lies on them (so T-joints line up). */
function splitEdges(poly: Vec2[], points: Vec2[]): [Vec2, Vec2][] {
  const out: [Vec2, Vec2][] = [];
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i];
    const b = poly[(i + 1) % poly.length];
    const dx = b[0] - a[0];
    const dz = b[1] - a[1];
    const l2 = dx * dx + dz * dz;
    if (l2 < 1e-8) continue;
    const cuts: number[] = [];
    for (const p of points) {
      const t = ((p[0] - a[0]) * dx + (p[1] - a[1]) * dz) / l2;
      if (t <= 1e-6 || t >= 1 - 1e-6) continue;
      const off = Math.abs((p[0] - a[0]) * dz - (p[1] - a[1]) * dx) / Math.sqrt(l2);
      if (off < 1e-4) cuts.push(t);
    }
    cuts.sort((p, q) => p - q);
    let prev = a;
    for (const t of cuts) {
      const q: Vec2 = [a[0] + dx * t, a[1] + dz * t];
      if (vkey(q) !== vkey(prev)) out.push([prev, q]);
      prev = q;
    }
    out.push([prev, b]);
  }
  return out;
}

/**
 * Outline of the walls' footprints: edges no other footprint shares, and the vertices where those
 * edges change direction. Edges are split at `points` first, so an edge partly covered by another
 * wall (T-joint) keeps only its free part.
 */
export function outlineOf(walls: Wall[], points: Vec2[]): Outline {
  const pieces = walls.map((w) => ({ wall: w, edges: splitEdges(w.footprint, points) }));
  const count = new Map<string, number>();
  for (const { edges } of pieces) {
    for (const [a, b] of edges) {
      const k = ekey(a, b);
      count.set(k, (count.get(k) ?? 0) + 1);
    }
  }
  const edges: OutlineEdge[] = [];
  const dirs = new Map<string, { p: Vec2; wall: Wall; d: Vec2[] }>();
  const addDir = (p: Vec2, wall: Wall, d: Vec2) => {
    const k = vkey(p);
    let e = dirs.get(k);
    if (!e) dirs.set(k, (e = { p, wall, d: [] }));
    e.d.push(d);
  };
  for (const { wall, edges: list } of pieces) {
    for (const [a, b] of list) {
      if (count.get(ekey(a, b)) !== 1) continue;
      const l = Math.hypot(b[0] - a[0], b[1] - a[1]);
      if (l < 1e-4) continue;
      edges.push({ a, b, wall });
      const d: Vec2 = [(b[0] - a[0]) / l, (b[1] - a[1]) / l];
      addDir(a, wall, d);
      addDir(b, wall, d);
    }
  }
  const corners: Outline["corners"] = [];
  for (const { p, wall, d } of dirs.values()) {
    // a vertex where the outline just continues straight (e.g. a T-joint seen from outside) is no corner
    if (d.some((u) => d.some((v) => Math.abs(u[0] * v[1] - u[1] * v[0]) > 0.05))) corners.push({ p, wall });
  }
  return { edges, corners };
}

/** Parts of an outline edge outside the given opening spans (only for edges along the wall axis). */
function subtractSpans(e: OutlineEdge, list: Span[]): [Vec2, Vec2][] {
  if (!list.length) return [[e.a, e.b]];
  const ax = unit([e.wall.b[0] - e.wall.a[0], e.wall.b[1] - e.wall.a[1]]);
  const ex = unit([e.b[0] - e.a[0], e.b[1] - e.a[1]]);
  if (Math.abs(ax[0] * ex[0] + ax[1] * ex[1]) < 0.99) return [[e.a, e.b]];
  const t = (p: Vec2) => (p[0] - e.wall.a[0]) * ax[0] + (p[1] - e.wall.a[1]) * ax[1];
  const ta = t(e.a);
  const tb = t(e.b);
  const lo = Math.min(ta, tb);
  const hi = Math.max(ta, tb);
  let parts: [number, number][] = [[lo, hi]];
  for (const sp of list) {
    parts = parts.flatMap(([p, q]): [number, number][] => {
      if (sp.s1 <= p || sp.s0 >= q) return [[p, q]];
      const out: [number, number][] = [];
      if (sp.s0 > p) out.push([p, sp.s0]);
      if (sp.s1 < q) out.push([sp.s1, q]);
      return out;
    });
  }
  const at = (tt: number): Vec2 => {
    const k = (tt - ta) / (tb - ta || 1);
    return [e.a[0] + (e.b[0] - e.a[0]) * k, e.a[1] + (e.b[1] - e.a[1]) * k];
  };
  // keep the edge's direction: its normal tells which side the room is on
  return parts.filter(([p, q]) => q - p > 1e-4).map(([p, q]) => (ta <= tb ? [at(p), at(q)] : [at(q), at(p)]));
}

/** Strips on the floor along every wall face that borders a room (not across doorways). */
function buildShadow(edges: OutlineEdge[], rooms: readonly Room[], spans: Map<Wall, Span[]>): GeoBuffer {
  const buf = new GeoBuffer();
  const dark = new Color(SHADOW_DARK, SHADOW_DARK, SHADOW_DARK);
  const clear = new Color(1, 1, 1);
  const y = 0.002;
  for (const e of edges) {
    for (const [a, b] of subtractSpans(e, (spans.get(e.wall) ?? []).filter((sp) => sp.sill <= 0.005))) {
      const dx = b[0] - a[0];
      const dz = b[1] - a[1];
      const l = Math.hypot(dx, dz);
      if (l < 0.05) continue;
      // footprints are counter-clockwise, so the right normal points away from the wall
      const n: Vec2 = [dz / l, -dx / l];
      const probe: Vec2 = [(a[0] + b[0]) / 2 + n[0] * 0.05, (a[1] + b[1]) / 2 + n[1] * 0.05];
      if (!rooms.some((r) => r.points.length >= 3 && pointInPolygon(probe, r.points))) continue;
      const a2: Vec2 = [a[0] + n[0] * SHADOW_WIDTH, a[1] + n[1] * SHADOW_WIDTH];
      const b2: Vec2 = [b[0] + n[0] * SHADOW_WIDTH, b[1] + n[1] * SHADOW_WIDTH];
      // the layer is drawn double-sided, so the winding does not matter
      buf.tri([a[0], y, a[1]], [a2[0], y, a2[1]], [b2[0], y, b2[1]], dark, clear, clear);
      buf.tri([a[0], y, a[1]], [b2[0], y, b2[1]], [b[0], y, b[1]], dark, clear, dark);
    }
  }
  return buf;
}

/** Ceiling openings of a floor: stairs on the floor directly below that reach up to it. */
export function stairHoles(floors: readonly Floor[], floor: Floor): Vec2[][] {
  // a stairwell opening placed on this floor cuts its floor; stairs below that reach up here do too
  const own = floor.furniture.filter((f) => f.type === "stairwell").map(furnitureFootprint);
  const below = floors.filter((f) => f.elevation < floor.elevation).sort((p, q) => q.elevation - p.elevation)[0];
  if (!below) return mergeHoles(own);
  const stairs = below.furniture
    .filter((f) => (f.type === "stairs" || packItem(f.type)?.hole) && below.elevation + f.h >= floor.elevation - 0.3)
    .map(furnitureFootprint);
  // overlapping openings become one outline (an L-shaped stairwell made of two)
  return mergeHoles([...own, ...stairs]);
}

/** How tall a wall stands: its own height (a low wall, a counter), never above the floor height. */
export function wallHeight(wall: Wall, floorHeight: number): number {
  return Math.min(floorHeight, wall.height ?? floorHeight);
}

function unit(v: Vec2): Vec2 {
  const l = Math.hypot(v[0], v[1]) || 1;
  return [v[0] / l, v[1] / l];
}

function ccw(points: Vec2[]): Vec2[] {
  let a = 0;
  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    const q = points[(i + 1) % points.length];
    a += p[0] * q[1] - q[0] * p[1];
  }
  return a >= 0 ? points : [...points].reverse();
}
