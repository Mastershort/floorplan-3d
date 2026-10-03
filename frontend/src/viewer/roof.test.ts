import assert from "node:assert/strict";
import { test } from "node:test";
import { emptyBuilding, newFloor, type Room } from "../model.ts";
import { buildRoof, roofFloor } from "./roof.ts";

const rect = (id: string, x1: number, z1: number): Room => ({ id, name: id, area_id: null, points: [[0, 0], [x1, 0], [x1, z1], [0, z1]], floor_material: "wood" });

function house(type: "none" | "flat" | "gable") {
  const b = emptyBuilding();
  b.floors = [
    { ...newFloor("eg", "EG", 0), rooms: [rect("a", 10, 8)] },
    { ...newFloor("og", "OG", 2.75), rooms: [rect("b", 10, 8)] },
    { ...newFloor("dg", "Dachboden", 5.5) },
  ];
  b.settings.roof = { type, pitch: 45, overhang: 0.5 };
  return b;
}

test("the roof sits on the highest floor with rooms", () => {
  assert.equal(roofFloor(house("gable"))?.id, "og");
  assert.equal(buildRoof(house("none")).length, 0);
});

test("a gable roof rises to half the house depth times the slope", () => {
  const roof = buildRoof(house("gable"))[0];
  const p = roof.solid.p;
  let top = -Infinity;
  for (let i = 1; i < p.length; i += 3) top = Math.max(top, p[i]);
  // 8 m deep + 2 × (0.24 wall + 0.5 overhang) = 9.48 m; half of it at 45° rises as much
  assert.ok(Math.abs(top - 9.48 / 2) < 1e-6, `ridge at ${top}`);
  assert.ok(buildRoof(house("flat"))[0].solid.count > 0);
});

test("a gable ridge can run along the short side", () => {
  // highest points of the roof: they lie on the ridge, so their spread shows its direction
  const ridge = (dir?: "long" | "short") => {
    const b = house("gable");
    b.settings.roof.ridge = dir;
    const p = buildRoof(b)[0].solid.p;
    let top = -Infinity;
    for (let i = 1; i < p.length; i += 3) top = Math.max(top, p[i]);
    let x = [Infinity, -Infinity];
    let z = [Infinity, -Infinity];
    for (let i = 0; i < p.length; i += 3) {
      if (Math.abs(p[i + 1] - top) > 1e-6) continue;
      x = [Math.min(x[0], p[i]), Math.max(x[1], p[i])];
      z = [Math.min(z[0], p[i + 2]), Math.max(z[1], p[i + 2])];
    }
    return { top, dx: x[1] - x[0], dz: z[1] - z[0] };
  };
  // the house is 10 m along x and 8 m along z
  const long = ridge();
  assert.ok(long.dx > 10 && long.dz < 1e-6, JSON.stringify(long));
  const short = ridge("short");
  assert.ok(short.dz > 8 && short.dx < 1e-6, JSON.stringify(short));
  // across the 10 m side: 10 + 2 × (0.24 + 0.5) = 11.48 m, half of it rises at 45°
  assert.ok(Math.abs(short.top - 11.48 / 2) < 1e-6, `ridge at ${short.top}`);
});

test("a roof window cuts a hole into its section's slope", () => {
  const b = house("gable");
  const sec = { id: "s", x0: 0, z0: 0, x1: 10, z1: 8, shape: "gable" as const, axis: "x" as const, eave_a: 5.5, eave_b: 5.5, pitch_a: 45, pitch_b: 45, base: 5.5 };
  b.settings.roof = { type: "custom", pitch: 45, overhang: 0.5, sections: [sec] };
  const area = (g: { p: number[] }) => {
    let a = 0;
    for (let i = 0; i < g.p.length; i += 9) {
      const [ax, ay, az, bx, by, bz, cx, cy, cz] = g.p.slice(i, i + 9);
      const u = [bx - ax, by - ay, bz - az];
      const v = [cx - ax, cy - ay, cz - az];
      a += Math.hypot(u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]) / 2;
    }
    return a;
  };
  const plain = area(buildRoof(b)[0].solid);
  b.settings.roof.windows = [{ id: "w", face: "s:a", u: 3, v: 2, w: 1, h: 1.2 }];
  const holed = area(buildRoof(b)[0].solid);
  // the hole takes 1 × 1.2 m out of the tiles and their underside (the reveal adds a little back)
  assert.ok(holed < plain - 1.5, `${plain} → ${holed}`);
  // the window itself is drawn apart from the roof (it stays when the roof is hidden), warm while open
  const win = (open: number) => [...buildRoof(b, new Map([["w", { open, tilt: 0, cover: 0 }]]))[0].windows!.values()][0];
  assert.ok(win(0).solid.count > 0 && win(0).lines.p.length > 0);
  const red = (g: { c: number[] }) => g.c[0];
  assert.ok(red(win(1).solid) > red(win(0).solid) * 1.5, "an open window glows warm");
  // a window on the plain gable roof (no section) leaves the roof as it is
  const g = house("gable");
  const before = area(buildRoof(g)[0].solid);
  g.settings.roof.windows = [{ id: "w", face: "main:a", u: 3, v: 2 }];
  const withWin = buildRoof(g)[0];
  assert.ok(Math.abs(area(withWin.solid) - before) < 1e-6 && [...withWin.windows!.values()][0].solid.count > 0);
  // it belongs to the floor under it (here the attic on the top floor with rooms)
  assert.deepEqual([...withWin.windows!.keys()], ["og"]);
});
