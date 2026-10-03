import assert from "node:assert/strict";
import { test } from "node:test";
import { emptyBuilding, newFloor, type Room, type RoofSection } from "./model.ts";
import { insideRooms, ridgeHeight, ROOF_THICK, roofCeiling, dormerFor, dormerHole, hostTop, roofSectionsFromRooms, sectionFrame, sectionOverhang, sectionProfile, wallTopUnder } from "./roof-sections.ts";
import { buildRoof } from "./viewer/roof.ts";

const near = (a: number, b: number, eps = 1e-6) => assert.ok(Math.abs(a - b) < eps, `${a} != ${b}`);
const rect = (id: string, x0: number, z0: number, x1: number, z1: number): Room => ({ id, name: id, area_id: null, points: [[x0, z0], [x1, z0], [x1, z1], [x0, z1]], floor_material: "wood" });
const section = (patch: Partial<RoofSection> = {}): RoofSection => ({
  id: "s",
  x0: 0,
  z0: 0,
  x1: 12,
  z1: 8,
  shape: "gable",
  axis: "x",
  eave_a: 3,
  eave_b: 3,
  pitch_a: 45,
  pitch_b: 45,
  base: 3,
  ...patch,
});

test("a symmetric gable has its ridge in the middle, half the width up", () => {
  const p = sectionProfile(section());
  near(p.vr, 4);
  near(p.rh, 7);
  near(p.y(0), 3);
  near(p.y(8), 3);
  // beyond the wall (the overhang) the slope goes on down
  near(p.y(-0.5), 2.5);
});

test("a lower eave on one side (a catslide) moves the ridge and keeps both slopes", () => {
  // side b reaches 2 m lower at the same pitch: the ridge moves 1 m towards side a
  const p = sectionProfile(section({ eave_b: 1 }));
  near(p.vr, 3);
  near(p.rh, 6);
  near(p.y(8), 1);
  near(ridgeHeight(section({ eave_b: 1 })), 6);
});

test("a pent roof rises from side a to its high edge at side b, a flat roof stays at its eave", () => {
  const pent = sectionProfile(section({ shape: "pent", pitch_a: 20 }));
  near(pent.vr, 8);
  near(pent.rh, 3 + 8 * Math.tan((20 * Math.PI) / 180));
  near(sectionProfile(section({ shape: "flat" })).rh, 3);
});

test("the frame runs u along the ridge and v across from side a", () => {
  const fx = sectionFrame(section());
  assert.deepEqual([fx.u0, fx.u1, fx.w], [0, 12, 8]);
  assert.deepEqual(fx.at(2, 1), [2, 1]);
  const fz = sectionFrame(section({ axis: "z" }));
  assert.deepEqual([fz.u0, fz.u1, fz.w], [0, 8, 12]);
  assert.deepEqual(fz.at(2, 1), [1, 2]);
});

test("sections proposed from an L-shaped house and a single-storey part", () => {
  const b = emptyBuilding();
  b.settings.wall_exterior = 0.25;
  // ground floor: an L (barn 16 × 10, living wing 8 × 10 at a right angle); upper floor over the wing only
  b.floors = [
    { ...newFloor("eg", "EG", 0), rooms: [rect("barn", 0, 0, 16, 10), rect("wing", 0, 10, 8, 20)] },
    { ...newFloor("og", "OG", 2.75), rooms: [rect("up", 0, 10, 8, 20)] },
  ];
  const s = roofSectionsFromRooms(b);
  assert.equal(s.length, 2);
  // the upper floor first: the wing, ridge along its long side (z), eaves on its walls
  assert.deepEqual([s[0].x0, s[0].z0, s[0].x1, s[0].z1, s[0].axis], [-0.25, 9.75, 8.25, 20.25, "z"]);
  near(s[0].eave_a, 2.75 + 2.5);
  // the ground floor: only the barn is left uncovered
  assert.deepEqual([s[1].x0, s[1].z0, s[1].x1, s[1].z1, s[1].axis], [-0.25, -0.25, 16.25, 10.25, "x"]);
  near(s[1].base, 2.5);
  // a custom roof is drawn in parts per floor
  b.settings.roof = { type: "custom", pitch: 40, overhang: 0.4, sections: s };
  const parts = buildRoof(b);
  assert.deepEqual(parts.map((p) => p.floor.id).sort(), ["eg", "og"]);
  assert.ok(parts.every((p) => p.solid.count > 0));
});

test("every shape builds geometry", () => {
  const b = emptyBuilding();
  b.floors = [{ ...newFloor("eg", "EG", 0), rooms: [rect("a", 0, 0, 12, 8)] }];
  for (const shape of ["gable", "hip", "pent", "flat"] as const) {
    b.settings.roof = { type: "custom", pitch: 40, overhang: 0.4, sections: [section({ shape, base: 2.5, eave_a: 2.5, eave_b: 2.5 })] };
    const [part] = buildRoof(b);
    assert.ok(part.solid.count > 0, shape);
    // nothing reaches higher than the ridge, or the high edge of a pent roof over its overhang (plus a flat roof's thickness)
    const sec = section({ shape, eave_a: 2.5, eave_b: 2.5 });
    const top = Math.max(ridgeHeight(sec), sectionProfile(sec).y(8 + 0.4));
    const ys = part.solid.p.filter((_, i) => i % 3 === 1);
    assert.ok(Math.max(...ys) <= top + 0.26, shape);
  }
});

test("a lean-to has no overhang where it meets the taller house, and sits on the walls below", () => {
  const b = emptyBuilding();
  // a two-storey house (0..10) and a single-storey garage beside it (10..14)
  b.floors = [
    { ...newFloor("eg", "EG", 0), rooms: [rect("house", 0, 0, 10, 8), rect("garage", 10, 0, 14, 6)] },
    { ...newFloor("og", "OG", 2.75), rooms: [rect("up", 0, 0, 10, 8)] },
  ];
  near(wallTopUnder(b, 10, 0, 14, 6)!, 2.5);
  near(wallTopUnder(b, 0, 0, 10, 8)!, 2.75 + 2.5);
  // pent roof on the garage, ridge along z, side a at x = 10 (the house)
  const lean = section({ x0: 10, z0: 0, x1: 14, z1: 6, shape: "pent", axis: "z", flip: true, eave_a: 2.5, eave_b: 2.5, base: 2.5 });
  const o = sectionOverhang(b, lean, 0.4);
  // flipped: side a is at x = 14 (open), side b at x = 10 against the house
  assert.deepEqual([o.a, o.b, o.u0, o.u1], [0.4, 0, 0.4, 0.4]);
});

test("a canopy over a terrace draws see-through panels and posts instead of walls", () => {
  const b = emptyBuilding();
  b.floors = [{ ...newFloor("eg", "EG", 0), rooms: [rect("house", 0, 0, 10, 8)] }];
  // a terrace roof in front of the house, rising to the house wall (side b at z = 8 … flipped: a = z 11)
  const canopy = section({ x0: 2, z0: 8, x1: 8, z1: 11, shape: "pent", axis: "x", flip: true, eave_a: 2.4, eave_b: 2.4, pitch_a: 6, pitch_b: 6, base: 2.4, open: true });
  b.settings.roof = { type: "custom", pitch: 35, overhang: 0.4, sections: [canopy] };
  const [part] = buildRoof(b);
  assert.ok(part.glass.count > 0, "see-through panels");
  // the posts reach down to the ground
  const ys = part.solid.p.filter((_, i) => i % 3 === 1);
  near(Math.min(...ys), 0);
  // the side at the house wall has no overhang
  assert.equal(sectionOverhang(b, canopy, 0.15).b, 0);
});

const withSections = (sections: RoofSection[]) => {
  const b = emptyBuilding();
  b.settings = { ...b.settings, roof: { type: "custom", pitch: 45, overhang: 0.4, sections } };
  return b;
};

test("the roof's underside over the plan: the profile less the roof's thickness, nothing outside", () => {
  const c = roofCeiling(withSections([section()]))!;
  // 45°: one metre in from the eave the underside is one metre higher
  near(c.at(6, 1)!, 4 - ROOF_THICK);
  near(c.at(6, 7)!, 4 - ROOF_THICK);
  near(c.at(6, 4)!, 7 - ROOF_THICK);
  assert.equal(c.at(-1, 4), null);
  // a single roof sits on the walls and cuts nothing
  const single = emptyBuilding();
  single.settings = { ...single.settings, roof: { type: "gable", pitch: 35, overhang: 0.4 } };
  assert.equal(roofCeiling(single), null);
  // canopies do not count
  assert.equal(roofCeiling(withSections([section({ open: true })])), null);
});

test("the ceiling bends at the ridge and the section's edges, and the higher of two sections wins", () => {
  const c = roofCeiling(withSections([section(), section({ id: "low", x0: 10, x1: 16, eave_a: 1, eave_b: 1, pitch_a: 20, pitch_b: 20 })]))!;
  // a line across the ridge (along z at x = 6) bends at z = 0, 4 and 8
  assert.deepEqual([...new Set(c.breaks([6, -1], [6, 9]).map((t) => Math.round(t * 1000) / 1000))].filter((t) => t > 0 && t < 1), [0.1, 0.5, 0.9]);
  // where the low lean-to runs under the main roof, the main roof is the ceiling
  near(c.at(11, 1)!, 4 - ROOF_THICK);
  // beyond the main roof the lean-to is
  near(c.at(14, 0)!, 1 - ROOF_THICK);
});

test("a hip roof slopes down towards its ends, and the 1.5 m line turns round them", () => {
  const c = roofCeiling(withSections([section({ shape: "hip" })]))!;
  // the run of the hips is half the width (4 m): 1 m in from the end the underside is 1 m above the eave
  near(c.at(1, 4)!, 4 - ROOF_THICK);
  near(c.at(6, 4)!, 7 - ROOF_THICK);
  const lines = c.contour(4 - ROOF_THICK);
  assert.equal(lines.length, 4);
});

test("an A-frame: the underside comes down to the ground at the eaves", () => {
  const c = roofCeiling(withSections([section({ eave_a: 0, eave_b: 0, pitch_a: 60, pitch_b: 60, base: 0 })]))!;
  near(c.at(6, 0)!, -ROOF_THICK);
  near(c.at(6, 1)!, Math.tan((60 * Math.PI) / 180) - ROOF_THICK);
  // the line at 1.5 m runs along both slopes, as far in as the slope needs to rise to it
  const [a] = c.contour(1.5);
  near(a[0][1], (1.5 + ROOF_THICK) / Math.tan((60 * Math.PI) / 180));
});

test("a line cut to the rooms", () => {
  const parts = insideRooms([-1, 1], [9, 1], [rect("a", 0, 0, 3, 3), rect("b", 5, 0, 8, 3)]);
  assert.deepEqual(parts.map(([p, q]) => [p[0], q[0]]), [[0, 3], [5, 8]]);
});

test("a dormer sits on the slope tapped: front at the eave, across the ridge, its ridge running into the slope", () => {
  const host = section();
  const d = dormerFor(host, [6, 1.5], "d")!;
  assert.equal(d.dormer, true);
  assert.equal(d.axis, "z");
  near(d.x1 - d.x0, 2);
  near((d.x0 + d.x1) / 2, 6);
  // front flush with side a's eave (z = 0), as deep as its ridge needs to meet the slope
  near(d.z0, 0);
  const ridge = ridgeHeight(d);
  assert.ok(Math.abs(hostTop([host], [6, d.z1]) ?? 0) >= ridge - 0.2 && ridge > d.eave_a);
  // its eaves stand above the host's eave, below its ridge
  assert.ok(d.eave_a > host.eave_a && ridge < ridgeHeight(host));
  // on side b the front is at the other eave; off the slopes there is none
  near(dormerFor(host, [6, 6.5], "d2")!.z1, 8);
  assert.equal(dormerFor(host, [-1, 2], "x"), null);
  // under the dormer the ceiling is the dormer's, higher than the slope
  const c = roofCeiling(withSections([host, d]))!;
  assert.ok(c.at(6, 0.5)! > roofCeiling(withSections([host]))!.at(6, 0.5)! + 1);
});

test("a dormer gets cheeks down to the slope it sits on, and the slope opens under it", () => {
  const host = section();
  const d = dormerFor(host, [6, 1.5], "d")!;
  const tris = (secs: RoofSection[]) => {
    const b = withSections(secs);
    b.floors = [{ ...newFloor("eg", "EG", 0), rooms: [rect("r", 0, 0, 12, 8)] }];
    return buildRoof(b)[0].solid.count;
  };
  assert.ok(tris([host, d]) > tris([host, { ...d, dormer: false }]), "the cheeks and the opening add triangles");
  const ring = dormerHole(host, d)!;
  // front edge at the eave, the point under its ridge further back than the eave lines' ends
  assert.equal(ring.length, 5);
  near(ring[0][1], 0);
  near(ring[4][1], 0);
  assert.ok(ring[2][1] > ring[1][1] && ring[2][1] > ring[3][1], "the ridge runs in furthest");
  near(ring[2][0], 6);
});
