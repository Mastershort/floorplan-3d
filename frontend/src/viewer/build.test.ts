import assert from "node:assert/strict";
import { test } from "node:test";
import type { BufferGeometry } from "three";
import type { Floor, Furniture, Opening, Room } from "../model.ts";
import { emptyBuilding, newFloor, type RoofSection } from "../model.ts";
import { roofCeiling } from "../roof-sections.ts";
import { buildFloorGeometry, clipAlong, stairHoles } from "./build.ts";

const EXT = 0.24;
const INT = 0.12;

function rect(id: string, x0: number, z0: number, x1: number, z1: number): Room {
  return { id, name: id, area_id: null, points: [[x0, z0], [x1, z0], [x1, z1], [x0, z1]], floor_material: "wood" };
}

function floorWith(rooms: Room[], openings: Opening[] = [], furniture: Furniture[] = []): Floor {
  return { ...newFloor("f", "Floor", 0), rooms, openings, furniture };
}

function opening(type: "door" | "window", room_id: string, edge: number, offset: number, width: number): Opening {
  return { id: `${type}${edge}`, room_id, edge, offset, width, type, sill: type === "door" ? 0 : 0.9, height: type === "door" ? 2.05 : 1.3, hinge: "left", leaves: 1, swing: "in", cover: null, contact: null, contact2: null, tilt: null };
}

const near = (a: number, b: number, eps = 1e-6) => assert.ok(Math.abs(a - b) < eps, `${a} != ${b}`);

/** Line segments as [x0, y0, z0, x1, y1, z1, fold]. */
function segments(g: BufferGeometry): number[][] {
  const p = g.getAttribute("position");
  const f = g.getAttribute("fold");
  const out: number[][] = [];
  for (let i = 0; i < p.count; i += 2) out.push([p.getX(i), p.getY(i), p.getZ(i), p.getX(i + 1), p.getY(i + 1), p.getZ(i + 1), f.getX(i)]);
  return out;
}

const vertical = (s: number[]) => Math.abs(s[0] - s[3]) < 1e-9 && Math.abs(s[2] - s[5]) < 1e-9;
const atY = (s: number[], y: number) => Math.abs(s[1] - y) < 1e-6 && Math.abs(s[4] - y) < 1e-6;
const length = (s: number[]) => Math.hypot(s[3] - s[0], s[4] - s[1], s[5] - s[2]);

/** Total area of a triangle soup in the x/z plane. */
function area(g: BufferGeometry): number {
  const p = g.getAttribute("position");
  let sum = 0;
  for (let i = 0; i < p.count; i += 3) {
    const ax = p.getX(i);
    const az = p.getZ(i);
    sum += Math.abs((p.getX(i + 1) - ax) * (p.getZ(i + 2) - az) - (p.getX(i + 2) - ax) * (p.getZ(i + 1) - az)) / 2;
  }
  return sum;
}

test("a single room has corner lines at its four inner and four outer corners", () => {
  const geo = buildFloorGeometry(floorWith([rect("a", 0, 0, 4, 3)]), EXT, INT);
  const segs = segments(geo.lines);
  // lower part of each corner line is always visible
  assert.equal(segs.filter((s) => vertical(s) && s[6] === -1).length, 8);
  // the base outline runs along both faces of the wall ring, without the mitre joints
  assert.equal(segs.filter((s) => atY(s, 0.004)).length, 8);
});

test("a straight outer face across a T-joint gets no corner line", () => {
  const geo = buildFloorGeometry(floorWith([rect("a", 0, 0, 4, 3), rect("b", 4, 0, 7, 3)]), EXT, INT);
  const corners = segments(geo.lines).filter((s) => vertical(s) && s[6] === -1);
  // 4 outer corners + 4 inner corners per room; the interior wall meets the outer walls in T-joints
  assert.equal(corners.length, 12);
  assert.ok(!corners.some((s) => Math.abs(s[0] - 4) < 1e-6 && (Math.abs(s[2] + EXT) < 1e-6 || Math.abs(s[2] - 3 - EXT) < 1e-6)));
});

test("baked wall shadows cover every wall face inside a room and nothing outside", () => {
  const geo = buildFloorGeometry(floorWith([rect("a", 0, 0, 4, 3), rect("b", 4, 0, 7, 3)]), EXT, INT);
  const half = INT / 2;
  const lengthA = 2 * (4 - half) + 3 + 3;
  const lengthB = 2 * (3 - half) + 3 + 3;
  near(area(geo.shadow), (lengthA + lengthB) * 0.42, 1e-4);
});

test("walls are grouped into fold buckets: one per exterior direction plus the interior walls", () => {
  const geo = buildFloorGeometry(floorWith([rect("a", 0, 0, 4, 3), rect("b", 4, 0, 7, 3)]), EXT, INT);
  assert.equal(geo.buckets.filter((b) => b).length, 4);
  assert.equal(geo.buckets.length, 5);
  const segs = segments(geo.lines);
  geo.buckets.forEach((_, b) => {
    // top edges stand with their bucket, cut edges show when it folds
    assert.ok(segs.some((s) => atY(s, 2.5) && s[6] === b));
    assert.ok(segs.some((s) => atY(s, 1.15) && s[6] === 16 + b));
  });
});

test("a door leaves the base line and the wall shadow out of the doorway", () => {
  const plain = buildFloorGeometry(floorWith([rect("a", 0, 0, 4, 3)]), EXT, INT);
  const geo = buildFloorGeometry(floorWith([rect("a", 0, 0, 4, 3)], [opening("door", "a", 0, 2, 0.9)]), EXT, INT);
  const base = (g: BufferGeometry) => segments(g).filter((s) => atY(s, 0.004)).reduce((sum, s) => sum + length(s), 0);
  near(base(plain.lines) - base(geo.lines), 2 * 0.9, 1e-6);
  near(area(plain.shadow) - area(geo.shadow), 0.9 * 0.42, 1e-6);
  const [info] = geo.openings;
  near(info.width, 0.9);
  near(info.start[0], 1.55);
  // the room lies at z > 0 of edge 0
  near(info.toRoom[1], 1);
  near(info.faceRoom, 0);
  near(info.faceOut, EXT);
});

test("a window above the cut height keeps the cut line; one across it interrupts it", () => {
  const cutLength = (g: BufferGeometry) => segments(g).filter((s) => atY(s, 1.15) && s[6] >= 16 && !vertical(s)).reduce((sum, s) => sum + length(s), 0);
  const plain = buildFloorGeometry(floorWith([rect("a", 0, 0, 4, 3)]), EXT, INT);
  const win = buildFloorGeometry(floorWith([rect("a", 0, 0, 4, 3)], [opening("window", "a", 0, 2, 1.2)]), EXT, INT);
  // the window (0.9–2.2 m) crosses the cut: both faces lose 1.2 m, the jambs add four short edges across the wall
  near(cutLength(plain.lines) - cutLength(win.lines), 2 * 1.2 - 2 * EXT, 1e-6);
});

test("stairs cut a hole into the floor above", () => {
  const stair: Furniture = { id: "s", type: "stairs", x: 2, z: 1.5, rotation: 0, w: 1, d: 2, h: 2.75, variant: null };
  const lower = floorWith([rect("a", 0, 0, 4, 3)], [], [stair]);
  const upper = { ...floorWith([rect("b", 0, 0, 4, 3)]), id: "u", elevation: 2.75 };
  const holes = stairHoles([lower, upper], upper);
  assert.equal(holes.length, 1);
  const geo = buildFloorGeometry(upper, EXT, INT, holes);
  // the opening is cut 3 mm in from its outline
  near(area(geo.floor), 12 - 0.994 * 1.994, 1e-6);
  assert.deepEqual(stairHoles([lower, upper], lower), []);
});

test("clipping a wall footprint along its axis", () => {
  const poly: [number, number][] = [
    [0, 0],
    [4, 0],
    [4, 0.2],
    [0, 0.2],
  ];
  const piece = clipAlong(poly, [0, 0], [1, 0], 1, 2.5);
  const xs = piece.map((p) => p[0]);
  near(Math.min(...xs), 1);
  near(Math.max(...xs), 2.5);
});

test("a stairwell opening cuts a hole into its own floor; stairs below reaching up do too", () => {
  const upper = floorWith([rect("a", 0, 0, 6, 4)]);
  upper.elevation = 3;
  upper.furniture.push({ id: "w", type: "stairwell", x: 3, z: 2, rotation: 0, w: 1, d: 2, h: 0.02, variant: null });
  const lower = floorWith([rect("b", 0, 0, 6, 4)]);
  lower.furniture.push({ id: "s", type: "stairs", x: 1, z: 2, rotation: 0, w: 1, d: 2.5, h: 3, variant: null });
  const holes = stairHoles([lower, upper], upper);
  assert.equal(holes.length, 2);
  // the floor loses the area of both holes
  const solid = area(buildFloorGeometry(upper, EXT, INT).floor);
  const cut = area(buildFloorGeometry(upper, EXT, INT, holes).floor);
  assert.ok(solid - cut > 4.4 && solid - cut < 4.6, `${solid - cut}`);
});

/** A gable roof section over the rectangle 0..6 x 0..4 at the outer wall faces, ridge along x. */
function ceilingOf(patch: Partial<RoofSection>) {
  const b = emptyBuilding();
  const sec: RoofSection = { id: "r", x0: -EXT, z0: -EXT, x1: 6 + EXT, z1: 4 + EXT, shape: "gable", axis: "x", eave_a: 1, eave_b: 1, pitch_a: 45, pitch_b: 45, base: 1, overhang: null, ...patch };
  b.settings = { ...b.settings, roof: { type: "custom", pitch: 45, overhang: 0.4, sections: [sec] } };
  return roofCeiling(b)!;
}

function heights(g: BufferGeometry): number[] {
  const p = g.getAttribute("position");
  return Array.from({ length: p.count }, (_, i) => p.getY(i));
}

test("walls under a sloped roof end at its underside: knee walls low, the gables up to the ridge", () => {
  const floor = { ...floorWith([rect("a", 0, 0, 6, 4)]), height: 2.5 };
  const ceiling = ceilingOf({});
  const flat = buildFloorGeometry(floor, EXT, INT);
  const sloped = buildFloorGeometry(floor, EXT, INT, [], [], ceiling);
  near(Math.max(...heights(flat.walls)), 2.5);
  // every wall vertex stays under the roof (a hair of tolerance at the slices' edges)
  const p = sloped.walls.getAttribute("position");
  for (let i = 0; i < p.count; i++) {
    const roof = ceiling.at(p.getX(i), p.getZ(i));
    if (roof !== null) assert.ok(p.getY(i) <= roof + 0.01, `vertex at ${p.getX(i)},${p.getY(i)},${p.getZ(i)} above the roof ${roof}`);
  }
  // the long walls are knee walls (about a metre), the gable walls still reach the floor's height
  const ys = heights(sloped.walls);
  near(Math.max(...ys), 2.5);
  // (the eave wall has no slices of its own: the roof is the same all along it)
  const knee = Array.from({ length: p.count }, (_, i) => i).filter((i) => Math.abs(p.getZ(i) + EXT / 2) < EXT / 2 + 1e-6);
  assert.ok(knee.length > 0 && Math.max(...knee.map((i) => p.getY(i))) < 1.2, "the eave wall is a knee wall");
  // the top edge follows the slope: lines rise above the knee walls and stay under the roof
  for (const s of segments(sloped.lines)) {
    for (const [x, y, z] of [[s[0], s[1], s[2]], [s[3], s[4], s[5]]]) {
      const roof = ceiling.at(x, z);
      if (roof !== null) assert.ok(y <= roof + 0.01, `line point ${x},${y},${z} above the roof`);
    }
  }
});

test("an opening under a sloped roof ends below it, and walls reach no higher where the roof comes down to the floor", () => {
  const room = rect("a", 0, 0, 6, 4);
  const win: Opening = { ...opening("window", "a", 1, 2, 1.2), sill: 0.3, height: 2.1 };
  const floor = { ...floorWith([room], [win]), height: 3 };
  const geo = buildFloorGeometry(floor, EXT, INT, [], [], ceilingOf({ eave_a: 0, eave_b: 0, pitch_a: 60, pitch_b: 60, base: 0 }));
  const info = geo.openings[0];
  // on the gable wall (x = 6) the window spans z 1.4 … 2.6: the roof is lowest at z = 1.4
  const roof = (1.4 + EXT) * Math.tan((60 * Math.PI) / 180) - 0.14;
  assert.ok(info.top <= roof - 0.02 + 1e-6 && info.top <= 2.4 + 1e-6);
  // at the eaves (z = 0 and z = 4) the walls are only as high as the roof there
  const p = geo.walls.getAttribute("position");
  for (let i = 0; i < p.count; i++) if (p.getZ(i) < -0.1 && p.getX(i) > 1 && p.getX(i) < 5) assert.ok(p.getY(i) < 0.3);
});
