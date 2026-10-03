import assert from "node:assert/strict";
import { test } from "node:test";
import { deviceSensors, energySummary, findConsumers, flowColor, flowSegments, meterPosition, powerSensorFor, proposeEnergySensors, readPower } from "./energy.ts";
import type { Building, Room } from "./model.ts";
import { emptyBuilding, newFloor } from "./model.ts";
import type { HassEntity, HomeAssistant } from "./types.ts";

const st = (entity_id: string, state: string, attributes: Record<string, unknown> = {}): HassEntity => ({ entity_id, state, attributes });
const power = (id: string, w: string, unit = "W") => st(id, w, { device_class: "power", unit_of_measurement: unit });

function rect(id: string, x0: number, z0: number, x1: number, z1: number): Room {
  return { id, name: id, area_id: null, points: [[x0, z0], [x1, z0], [x1, z1], [x0, z1]], floor_material: "wood" };
}

function hassWith(states: HassEntity[], entities: Record<string, { entity_id: string; device_id?: string }> = {}): HomeAssistant {
  return {
    language: "de",
    connection: {} as HomeAssistant["connection"],
    callWS: async () => undefined as never,
    callService: async () => undefined,
    entities,
    states: Object.fromEntries(states.map((s) => [s.entity_id, s])),
  };
}

function house(): Building {
  const b = emptyBuilding();
  const eg = { ...newFloor("eg", "EG", 0), rooms: [rect("a", 0, 0, 4, 3), rect("b", 4, 0, 8, 3)] };
  eg.placements = [
    { entity_id: "switch.tv", x: 7, z: 2, y: null },
    { entity_id: "sensor.fridge_power", x: 6, z: 0.5, y: null },
  ];
  const og = { ...newFloor("og", "OG", 2.75), rooms: [rect("c", 0, 0, 8, 3)] };
  og.placements = [{ entity_id: "sensor.pc_power", x: 1, z: 1, y: null }];
  b.floors = [eg, og];
  b.energy = { ...b.energy, meter: { floor_id: "eg", x: 0.5, z: 1.5 }, grid: "sensor.grid", solar: "sensor.solar" };
  return b;
}

function hassForHouse(): HomeAssistant {
  return hassWith(
    [st("switch.tv", "on"), power("sensor.tv_power", "95"), power("sensor.fridge_power", "0.085", "kW"), power("sensor.pc_power", "70"), power("sensor.grid", "-300"), power("sensor.solar", "1200")],
    { "switch.tv": { entity_id: "switch.tv", device_id: "d1" }, "sensor.tv_power": { entity_id: "sensor.tv_power", device_id: "d1" } },
  );
}

test("power values in W and kW, inverted on request", () => {
  assert.equal(readPower(power("sensor.x", "1.5", "kW")), 1500);
  assert.equal(readPower(power("sensor.x", "-20")), -20);
  assert.equal(readPower(power("sensor.x", "20"), true), -20);
  assert.equal(readPower(st("sensor.x", "unavailable")), null);
});

test("a placed device reports power through a sensor of the same device", () => {
  const hass = hassForHouse();
  assert.equal(powerSensorFor(hass, "switch.tv"), "sensor.tv_power");
  assert.equal(powerSensorFor(hass, "sensor.fridge_power"), "sensor.fridge_power");
  const consumers = findConsumers(hass, house());
  assert.deepEqual(
    consumers.map((c) => [c.id, c.power]),
    [
      ["switch.tv", 95],
      ["sensor.fridge_power", 85],
      ["sensor.pc_power", 70],
    ],
  );
});

test("summary: exporting 300 W while the sun gives 1200 W means 900 W consumption", () => {
  const hass = hassForHouse();
  const b = house();
  const s = energySummary(hass, b, findConsumers(hass, b));
  assert.equal(s.grid, -300);
  assert.equal(s.solar, 1200);
  assert.equal(s.consumption, 900);
  // all consumption comes from the sun
  assert.deepEqual(flowColor("consumer", s), flowColor("solar", s));
});

test("cables run from the meter through the shared wall and add up where they share a path", () => {
  const hass = hassForHouse();
  const b = house();
  const consumers = findConsumers(hass, b);
  const segs = flowSegments({ building: b, consumers, summary: energySummary(hass, b, consumers) });
  const eg = segs.filter((s) => s.floorId === "eg" && s.kind === "consumer");
  // a segment crosses the interior wall at x = 4
  assert.ok(eg.some((s) => (s.a[0] - 4) * (s.b[0] - 4) < 0 && s.a[1] === s.b[1]), "crosses the wall");
  // the crossing carries both consumers in room b
  const crossing = eg.find((s) => (s.a[0] - 4) * (s.b[0] - 4) < 0 && s.a[1] === s.b[1])!;
  assert.equal(crossing.power, 95 + 85);
  // the riser to the upper floor starts at the meter and carries the PC
  const up = eg.find((s) => s.a[0] === 0.5 && s.a[2] === 1.5 && s.b[1] > 2)!;
  assert.equal(up.power, 70);
  assert.ok(segs.some((s) => s.floorId === "og" && s.kind === "consumer"));
  // exporting: the grid cable flows from the meter to the outside
  const grid = segs.find((s) => s.kind === "export")!;
  assert.deepEqual([grid.a[0], grid.a[2]], [0.5, 1.5]);
  assert.ok(grid.b[0] < -0.24, "leaves through the west wall");
  assert.equal(grid.power, 300);
  // the cable distance grows along the path
  const far = eg.filter((s) => s.a[0] > 4).map((s) => s.dist);
  assert.ok(Math.min(...far) > 3);
});

test("without a meter there are no cables", () => {
  const hass = hassForHouse();
  const b = house();
  b.energy.meter = null;
  const consumers = findConsumers(hass, b);
  assert.deepEqual(flowSegments({ building: b, consumers, summary: energySummary(hass, b, consumers) }), []);
});

test("new power values re-weigh the cached cable routes", () => {
  const hass = hassForHouse();
  const b = house();
  const run = () => {
    const consumers = findConsumers(hass, b);
    return flowSegments({ building: b, consumers, summary: energySummary(hass, b, consumers) });
  };
  const crossing = (segs: ReturnType<typeof run>) => segs.find((s) => s.floorId === "eg" && s.kind === "consumer" && (s.a[0] - 4) * (s.b[0] - 4) < 0 && s.a[1] === s.b[1])!;
  const first = run();
  assert.equal(crossing(first).power, 95 + 85);
  hass.states["sensor.tv_power"] = power("sensor.tv_power", "300");
  const second = run();
  assert.equal(crossing(second).power, 300 + 85);
  // same routes: same pieces in the same order
  assert.deepEqual(
    second.map((s) => [s.a, s.b]),
    first.map((s) => [s.a, s.b]),
  );
});

test("the placed devices bring their sensors: meter = grid, inverters add up, battery with its charge", () => {
  const b = house();
  b.energy = { ...b.energy, meter: null, grid: null, solar: null };
  b.floors[0].furniture.push(
    { id: "m", type: "meter", x: 1, z: 0.2, rotation: 0, w: 0.55, d: 0.21, h: 1.1, variant: null, power: "sensor.grid" },
    { id: "i1", type: "inverter", x: 2, z: 0.2, rotation: 0, w: 0.5, d: 0.2, h: 0.65, variant: null, power: "sensor.pv1" },
    { id: "i2", type: "inverter", x: 3, z: 0.2, rotation: 0, w: 0.5, d: 0.2, h: 0.65, variant: null, power: "sensor.pv2" },
    { id: "bat", type: "home_battery", x: 3, z: 1, rotation: 0, w: 0.6, d: 0.25, h: 1.1, variant: null, power: "sensor.bat", soc: "sensor.soc" },
  );
  assert.deepEqual(deviceSensors(b), { grid: "sensor.grid", solar: ["sensor.pv1", "sensor.pv2"], battery: "sensor.bat", soc: "sensor.soc" });
  assert.deepEqual(meterPosition(b), { floor_id: "eg", x: 1, z: 0.2 });
  const hass = hassWith([power("sensor.grid", "-300"), power("sensor.pv1", "800"), power("sensor.pv2", "400"), power("sensor.bat", "-250"), st("sensor.soc", "64", { device_class: "battery" }), power("sensor.house", "1000")]);
  const s = energySummary(hass, b, []);
  assert.equal(s.grid, -300);
  assert.equal(s.solar, 1200);
  assert.equal(s.battery, -250);
  assert.equal(s.soc, 64);
  // the balance: 1200 from the sun, 300 exported, 250 into the battery
  assert.equal(s.consumption, 650);
  // a house sensor beats the balance; the balance sensors beat the devices
  b.energy.consumption = "sensor.house";
  b.energy.solar = "sensor.pv1";
  const s2 = energySummary(hass, b, []);
  assert.equal(s2.consumption, 1000);
  assert.equal(s2.solar, 800);
});

test("the energy dashboard leads to power sensors of the same devices", () => {
  const hass = hassWith(
    [
      st("sensor.grid_energy", "1234", { device_class: "energy" }),
      power("sensor.grid_power", "500"),
      power("sensor.grid_power_l1", "200"),
      st("sensor.pv_energy_today", "12", { device_class: "energy" }),
      power("sensor.pv_power", "3000"),
      st("sensor.bat_energy_in", "5", { device_class: "energy" }),
      power("sensor.bat_power", "-100"),
      st("sensor.bat_soc", "55", { device_class: "battery" }),
    ],
    Object.fromEntries(
      (
        [
          ["sensor.grid_energy", "grid"],
          ["sensor.grid_power", "grid"],
          ["sensor.grid_power_l1", "grid"],
          ["sensor.pv_energy_today", "pv"],
          ["sensor.pv_power", "pv"],
          ["sensor.bat_energy_in", "bat"],
          ["sensor.bat_power", "bat"],
          ["sensor.bat_soc", "bat"],
        ] as const
      ).map(([id, device_id]) => [id, { entity_id: id, device_id }]),
    ),
  );
  const prefs = {
    energy_sources: [
      { type: "grid", flow_from: [{ stat_energy_from: "sensor.grid_energy" }], flow_to: [] },
      { type: "solar", stat_energy_from: "sensor.pv_energy_today" },
      { type: "battery", stat_energy_from: "sensor.bat_energy_in", stat_energy_to: "sensor.bat_energy_in" },
    ],
  };
  assert.deepEqual(proposeEnergySensors(hass, prefs), { grid: "sensor.grid_power", solar: "sensor.pv_power", battery: "sensor.bat_power", battery_soc: "sensor.bat_soc" });
  // nothing set up: nothing proposed
  assert.deepEqual(proposeEnergySensors(hass, {}), {});
});
