// Roof sections: the plain geometry of a section (frame and profile across its ridge) and the
// proposal of sections from the rooms. No three.js here: the editor uses it as well.

import type { Building, Room, RoofSection, Vec2 } from "./model.ts";
import { pointInPolygon } from "./model.ts";

const DEG = Math.PI / 180;

/**
 * Local frame of a section: u runs along the ridge (u0 … u1 at the wall faces), v across it from
 * side a (v = 0) to side b (v = w).
 */
export interface SectionFrame {
  u0: number;
  u1: number;
  w: number;
  /** Plan point of a local (u, v). */
  at(u: number, v: number): Vec2;
}

export function sectionFrame(s: Pick<RoofSection, "x0" | "z0" | "x1" | "z1" | "axis" | "flip">): SectionFrame {
  const x0 = Math.min(s.x0, s.x1);
  const x1 = Math.max(s.x0, s.x1);
  const z0 = Math.min(s.z0, s.z1);
  const z1 = Math.max(s.z0, s.z1);
  // flipped: v runs from the high coordinate, so side a is the bottom (or right) side
  return s.axis === "x"
    ? { u0: x0, u1: x1, w: z1 - z0, at: (u, v) => [u, s.flip ? z1 - v : z0 + v] }
    : { u0: z0, u1: z1, w: x1 - x0, at: (u, v) => [s.flip ? x1 - v : x0 + v, u] };
}

/** A plan point in a section's frame: u along its ridge, v across from side a (the inverse of `at`). */
export function sectionUV(s: RoofSection, p: Vec2): [number, number] {
  const fr = sectionFrame(s);
  const o = fr.at(0, 0);
  const e = fr.at(0, 1);
  return s.axis === "x" ? [p[0], (p[1] - o[1]) * (e[1] - o[1])] : [p[1], (p[0] - o[0]) * (e[0] - o[0])];
}

/** Height profile across a section: the ridge position and height, and the roof height at any v. */
export interface SectionProfile {
  /** Ridge across (0 … w); a pent roof has its high edge at w. */
  vr: number;
  /** Height of the ridge (or the high edge) above the ground. */
  rh: number;
  /** Roof height above the ground at v (also beyond the walls, on the overhang). */
  y(v: number): number;
}

export function sectionProfile(s: Pick<RoofSection, "x0" | "z0" | "x1" | "z1" | "axis" | "flip" | "shape" | "eave_a" | "eave_b" | "pitch_a" | "pitch_b">): SectionProfile {
  const w = sectionFrame(s).w;
  const ea = s.eave_a;
  const eb = s.eave_b;
  const ta = Math.tan(Math.min(80, Math.max(0, s.pitch_a)) * DEG);
  const tb = Math.tan(Math.min(80, Math.max(0, s.pitch_b)) * DEG);
  if (s.shape === "flat") return { vr: w / 2, rh: ea, y: () => ea };
  if (s.shape === "pent") return { vr: w, rh: ea + w * ta, y: (v) => ea + v * ta };
  // the slopes meet where they are equally high: a lower eave or a flatter slope moves the ridge
  const vr = ta + tb > 1e-6 ? Math.min(w, Math.max(0, (eb - ea + w * tb) / (ta + tb))) : w / 2;
  const rh = ea + vr * ta;
  return { vr, rh, y: (v) => (v <= vr ? ea + v * ta : eb + (w - v) * tb) };
}

/** Overhang per edge of a section: along the ridge at both ends (u0, u1) and across at both sides (a, b). */
export interface SectionOverhang {
  u0: number;
  u1: number;
  a: number;
  b: number;
}

/**
 * Overhang per edge: none where the section meets a taller part of the house (a room right outside
 * that edge whose walls rise above the section's wall tops), so a lean-to roof ends at the wall
 * instead of running into the house.
 */
export function sectionOverhang(b: Building, s: RoofSection, overhang: number): SectionOverhang {
  const fr = sectionFrame(s);
  const taller = b.floors.flatMap((f) => f.rooms.filter((r) => r.points.length >= 3 && f.elevation + f.height > s.base + 0.05));
  const blocked = (pts: Vec2[]) => pts.some((p) => taller.some((r) => pointInPolygon(p, r.points)));
  const d = 0.35;
  const along = [0.15, 0.5, 0.85].map((t) => fr.u0 + (fr.u1 - fr.u0) * t);
  const across = [0.15, 0.5, 0.85].map((t) => fr.w * t);
  return {
    a: blocked(along.map((u) => fr.at(u, -d))) ? 0 : overhang,
    b: blocked(along.map((u) => fr.at(u, fr.w + d))) ? 0 : overhang,
    u0: blocked(across.map((v) => fr.at(fr.u0 - d, v))) ? 0 : overhang,
    u1: blocked(across.map((v) => fr.at(fr.u1 + d, v))) ? 0 : overhang,
  };
}

/** Wall tops below a rectangle: the highest floor with a room under its middle (null = none). */
export function wallTopUnder(b: Building, x0: number, z0: number, x1: number, z1: number): number | null {
  const c: Vec2 = [(x0 + x1) / 2, (z0 + z1) / 2];
  const tops = b.floors.filter((f) => f.rooms.some((r) => r.points.length >= 3 && pointInPolygon(c, r.points))).map((f) => f.elevation + f.height);
  return tops.length ? Math.max(...tops) : null;
}

/** Height of the ridge (or of the high edge of a pent roof) above the ground. */
export function ridgeHeight(s: RoofSection): number {
  return sectionProfile(s).rh;
}

/**
 * Sections proposed from the rooms: per floor (highest first), the area of its rooms that no higher
 * floor covers, cut into as few rectangles as possible; each gets a gable roof on its walls, with the
 * ridge along its longer side. A house with an upper floor over part of it gets a roof up there and one
 * over the single-storey rest.
 */
export function roofSectionsFromRooms(b: Building, makeId: (i: number) => string = (i) => `roof_${i + 1}`): RoofSection[] {
  const pitch = b.settings.roof?.pitch ?? 35;
  const ext = b.settings.wall_exterior;
  const floors = b.floors.filter((f) => f.rooms.some((r) => r.points.length >= 3)).sort((p, q) => q.elevation - p.elevation);
  const out: RoofSection[] = [];
  const above: Room[] = [];
  const round = (v: number) => Math.round(v * 1000) / 1000;
  for (const floor of floors) {
    const rooms = floor.rooms.filter((r) => r.points.length >= 3);
    const xs = [...new Set(rooms.flatMap((r) => r.points.map((p) => round(p[0]))))].sort((p, q) => p - q);
    const zs = [...new Set(rooms.flatMap((r) => r.points.map((p) => round(p[1]))))].sort((p, q) => p - q);
    const nx = xs.length - 1;
    const nz = zs.length - 1;
    const inside = (rs: Room[], p: Vec2) => rs.some((r) => pointInPolygon(p, r.points));
    const covered: boolean[][] = [];
    for (let j = 0; j < nz; j++) {
      covered.push([]);
      for (let i = 0; i < nx; i++) {
        const c: Vec2 = [(xs[i] + xs[i + 1]) / 2, (zs[j] + zs[j + 1]) / 2];
        covered[j].push(inside(rooms, c) && !inside(above, c));
      }
    }
    // greedy rectangles: as wide as possible, then as deep as the whole row allows
    const used = covered.map((row) => row.map(() => false));
    const free = (i: number, j: number) => covered[j][i] && !used[j][i];
    const top = floor.elevation + floor.height;
    for (let j = 0; j < nz; j++) {
      for (let i = 0; i < nx; i++) {
        if (!free(i, j)) continue;
        let i2 = i;
        while (i2 + 1 < nx && free(i2 + 1, j)) i2++;
        let j2 = j;
        while (j2 + 1 < nz && Array.from({ length: i2 - i + 1 }, (_, k) => free(i + k, j2 + 1)).every(Boolean)) j2++;
        for (let jj = j; jj <= j2; jj++) for (let ii = i; ii <= i2; ii++) used[jj][ii] = true;
        const x0 = xs[i] - ext;
        const x1 = xs[i2 + 1] + ext;
        const z0 = zs[j] - ext;
        const z1 = zs[j2 + 1] + ext;
        if (Math.min(x1 - x0, z1 - z0) < 0.8) continue;
        out.push({
          id: makeId(out.length),
          x0: round(x0),
          z0: round(z0),
          x1: round(x1),
          z1: round(z1),
          shape: "gable",
          axis: x1 - x0 >= z1 - z0 ? "x" : "z",
          eave_a: round(top),
          eave_b: round(top),
          pitch_a: pitch,
          pitch_b: pitch,
          base: round(top),
          overhang: null,
        });
      }
    }
    above.push(...rooms);
  }
  return out;
}

/** Height above the floor marked in the plan under a sloped roof (beyond it there is less headroom). */
export const HEADROOM = 1.5;

/** Thickness of a closed roof: its underside is this far below the profile. */
export const ROOF_THICK = 0.14;

/**
 * Underside of the roof sections over the plan: the sloped ceiling of an attic, down to the ground for
 * an A-frame. Walls under it end at it. Canopies (open sections) leave the house alone.
 */
export interface RoofCeiling {
  /** Height of the underside above the ground at a plan point; null where no section covers it. */
  at(x: number, z: number): number | null;
  /**
   * Where the ceiling may bend along the line through `a` and `b`: parameters t (a + (b - a) t) where
   * the line crosses a section's edge, its ridge or a hip. Between two of them the ceiling is linear.
   */
  breaks(a: Vec2, b: Vec2): number[];
  /** Lines over the underside to draw it by (rafters down the slopes, purlins along them), as plan segments. */
  grid(): [Vec2, Vec2][];
  /** Where the underside is `level` high (above the ground), as plan segments. */
  contour(level: number): [Vec2, Vec2][];
}

interface CeilingSection {
  x0: number;
  z0: number;
  x1: number;
  z1: number;
  /** Underside height at a point inside the rectangle. */
  y(x: number, z: number): number;
  /** Lines (as point pairs) along which the underside bends. */
  lines: [Vec2, Vec2][];
  /** Rafters and purlins in the plan. */
  grid: [Vec2, Vec2][];
  /** Where the underside is at a height, as plan segments. */
  contour(level: number): [Vec2, Vec2][];
}

/** Parameter t on the line a→b where it crosses the infinite line p→q (null when parallel). */
function crossing(a: Vec2, b: Vec2, p: Vec2, q: Vec2): number | null {
  const dx = b[0] - a[0];
  const dz = b[1] - a[1];
  const ex = q[0] - p[0];
  const ez = q[1] - p[1];
  const den = dx * ez - dz * ex;
  if (Math.abs(den) < 1e-9) return null;
  return ((p[0] - a[0]) * ez - (p[1] - a[1]) * ex) / den;
}

function ceilingSection(s: RoofSection): CeilingSection {
  const fr = sectionFrame(s);
  const pr = sectionProfile(s);
  // plan point -> (u, v) of the section
  const uv = (x: number, z: number): [number, number] => {
    const o = fr.at(0, 0);
    const e = fr.at(0, 1);
    const across = s.axis === "x" ? (z - o[1]) * (e[1] - o[1]) : (x - o[0]) * (e[0] - o[0]);
    return [s.axis === "x" ? x : z, across];
  };
  const lines: [Vec2, Vec2][] = [];
  const u0 = fr.u0;
  const u1 = fr.u1;
  const w = fr.w;
  if (s.shape !== "flat" && s.shape !== "pent") lines.push([fr.at(u0, pr.vr), fr.at(u1, pr.vr)]);
  // a hip roof also slopes down towards both ends: up from the eave over the run d to the ridge
  const d = s.shape === "hip" ? Math.min((u1 - u0) / 2, Math.min(pr.vr, w - pr.vr) || w / 2) : 0;
  if (d > 0) {
    lines.push([fr.at(u0 + d, 0), fr.at(u0 + d, w)], [fr.at(u1 - d, 0), fr.at(u1 - d, w)]);
    lines.push([fr.at(u0, 0), fr.at(u0 + d, pr.vr)], [fr.at(u0, w), fr.at(u0 + d, pr.vr)], [fr.at(u1, 0), fr.at(u1 - d, pr.vr)], [fr.at(u1, w), fr.at(u1 - d, pr.vr)]);
  }
  const eave = Math.min(pr.y(0), pr.y(w));
  // rafters about every 1.2 m down the slopes (bent at the ridge), purlins about every 0.8 m along them
  const grid: [Vec2, Vec2][] = [];
  if (s.shape !== "flat") {
    const nu = Math.max(1, Math.round((u1 - u0) / 1.2));
    for (let i = 1; i < nu; i++) {
      const u = u0 + ((u1 - u0) * i) / nu;
      if (s.shape === "pent") grid.push([fr.at(u, 0), fr.at(u, w)]);
      else grid.push([fr.at(u, 0), fr.at(u, pr.vr)], [fr.at(u, pr.vr), fr.at(u, w)]);
    }
    const nv = Math.max(1, Math.round(w / 0.8));
    for (let i = 1; i < nv; i++) grid.push([fr.at(u0, (w * i) / nv), fr.at(u1, (w * i) / nv)]);
    if (s.shape !== "pent") grid.push([fr.at(u0, pr.vr), fr.at(u1, pr.vr)]);
  }
  const ta = Math.tan(Math.min(80, Math.max(0, s.pitch_a)) * DEG);
  const tb = Math.tan(Math.min(80, Math.max(0, s.pitch_b)) * DEG);
  const contour = (level: number): [Vec2, Vec2][] => {
    if (s.shape === "flat") return [];
    const y = level + ROOF_THICK;
    const vs: number[] = [];
    if (ta > 1e-6) {
      const v = (y - s.eave_a) / ta;
      if (v > 0 && v < (s.shape === "pent" ? w : pr.vr)) vs.push(v);
    }
    if (s.shape !== "pent" && tb > 1e-6) {
      const v = w - (y - s.eave_b) / tb;
      if (v > pr.vr && v < w) vs.push(v);
    }
    // on a hip roof the line also turns round both ends
    const du = d > 0 && pr.rh > eave ? Math.max(0, Math.min(d, ((y - eave) * d) / (pr.rh - eave))) : 0;
    const out: [Vec2, Vec2][] = vs.map((v) => [fr.at(u0 + du, v), fr.at(u1 - du, v)]);
    if (du > 0 && vs.length === 2) out.push([fr.at(u0 + du, vs[0]), fr.at(u0 + du, vs[1])], [fr.at(u1 - du, vs[0]), fr.at(u1 - du, vs[1])]);
    return out;
  };
  return {
    contour,
    grid,
    x0: Math.min(s.x0, s.x1),
    z0: Math.min(s.z0, s.z1),
    x1: Math.max(s.x0, s.x1),
    z1: Math.max(s.z0, s.z1),
    y: (x, z) => {
      const [u, v] = uv(x, z);
      let y = pr.y(v);
      if (d > 0) y = Math.min(y, eave + ((pr.rh - eave) * Math.min(u - u0, u1 - u)) / d);
      return y - ROOF_THICK;
    },
    lines,
  };
}

/** The ceiling of a building's roof sections (none for a single roof: it sits on the top floor's walls). */
export function roofCeiling(b: Building): RoofCeiling | null {
  const roof = b.settings.roof;
  if (roof?.type !== "custom") return null;
  const secs = (roof.sections ?? []).filter((s) => !s.open && Math.abs(s.x1 - s.x0) >= 0.1 && Math.abs(s.z1 - s.z0) >= 0.1).map(ceilingSection);
  if (!secs.length) return null;
  const E = 1e-6;
  return {
    at(x, z) {
      // where sections overlap, the lower roof runs under the higher one: the higher one is the ceiling
      let best: number | null = null;
      for (const s of secs) {
        if (x < s.x0 - E || x > s.x1 + E || z < s.z0 - E || z > s.z1 + E) continue;
        const y = s.y(x, z);
        if (best === null || y > best) best = y;
      }
      return best;
    },
    breaks(a, bb) {
      const out: number[] = [];
      for (const s of secs) {
        const edges: [Vec2, Vec2][] = [
          [[s.x0, s.z0], [s.x1, s.z0]],
          [[s.x0, s.z1], [s.x1, s.z1]],
          [[s.x0, s.z0], [s.x0, s.z1]],
          [[s.x1, s.z0], [s.x1, s.z1]],
        ];
        for (const [p, q] of [...edges, ...s.lines]) {
          const t = crossing(a, bb, p, q);
          if (t !== null) out.push(t);
        }
      }
      return out.sort((p, q) => p - q);
    },
    grid: () => secs.flatMap((s) => s.grid),
    contour: (level) => secs.flatMap((s) => s.contour(level)),
  };
}

/** Parts of the segment a→b that lie inside any of the rooms. */
export function insideRooms(a: Vec2, b: Vec2, rooms: readonly Room[]): [Vec2, Vec2][] {
  const ts = [0, 1];
  for (const r of rooms) {
    for (let i = 0; i < r.points.length; i++) {
      const t = crossing(a, b, r.points[i], r.points[(i + 1) % r.points.length]);
      const k = t === null ? null : crossing(r.points[i], r.points[(i + 1) % r.points.length], a, b);
      if (t !== null && k !== null && k >= 0 && k <= 1 && t > 0 && t < 1) ts.push(t);
    }
  }
  ts.sort((p, q) => p - q);
  const at = (t: number): Vec2 => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  const out: [Vec2, Vec2][] = [];
  for (let i = 0; i + 1 < ts.length; i++) {
    if (ts[i + 1] - ts[i] < 1e-6) continue;
    const mid = at((ts[i] + ts[i + 1]) / 2);
    if (rooms.some((r) => r.points.length >= 3 && pointInPolygon(mid, r.points))) out.push([at(ts[i]), at(ts[i + 1])]);
  }
  return out;
}

/** Height of the top of the closed, non-dormer sections at a plan point (the slope a dormer sits on); null where none is. */
export function hostTop(sections: readonly RoofSection[], p: Vec2, except?: RoofSection): number | null {
  let best: number | null = null;
  for (const s of sections) {
    if (s === except || s.dormer || s.open || s.shape === "flat") continue;
    const fr = sectionFrame(s);
    const [u, v] = sectionUV(s, p);
    if (u < fr.u0 - 1e-6 || u > fr.u1 + 1e-6 || v < -1e-6 || v > fr.w + 1e-6) continue;
    const y = sectionProfile(s).y(v);
    if (best === null || y > best) best = y;
  }
  return best;
}

/**
 * A dormer for a tap on a section's slope: 2 m wide, its front flush with that slope's eave (the
 * facade), a gable roof of 30° whose eaves stand 1.5 m above the slope's eave, as deep as its ridge
 * needs to run into the slope. Null off the slopes.
 */
export function dormerFor(host: RoofSection, p: Vec2, id: string): RoofSection | null {
  if (host.shape === "flat") return null;
  const fr = sectionFrame(host);
  const pr = sectionProfile(host);
  const [pu, pv] = sectionUV(host, p);
  if (pu < fr.u0 || pu > fr.u1 || pv < 0 || pv > fr.w) return null;
  const a = host.shape === "pent" || pv <= pr.vr;
  const eave = a ? host.eave_a : host.eave_b;
  const tanH = Math.tan(Math.min(80, Math.max(5, a ? host.pitch_a : host.pitch_b)) * DEG);
  const W = Math.min(2, fr.u1 - fr.u0);
  const de = Math.min(1.5, (pr.rh - eave) * 0.6);
  const rh = eave + de + (W / 2) * Math.tan(30 * DEG);
  // deep enough for its ridge to meet the slope, at most to the host's ridge
  const D = Math.min((rh - eave) / tanH + 0.1, a ? pr.vr : fr.w - pr.vr);
  const u0 = Math.max(fr.u0, Math.min(fr.u1 - W, pu - W / 2));
  const [v0, v1] = a ? [0, D] : [fr.w - D, fr.w];
  const c = [fr.at(u0, v0), fr.at(u0 + W, v1)];
  const r = (x: number) => Math.round(x * 100) / 100;
  const y = r(eave + de);
  return {
    id,
    x0: r(Math.min(c[0][0], c[1][0])),
    z0: r(Math.min(c[0][1], c[1][1])),
    x1: r(Math.max(c[0][0], c[1][0])),
    z1: r(Math.max(c[0][1], c[1][1])),
    shape: "gable",
    axis: host.axis === "x" ? "z" : "x",
    eave_a: y,
    eave_b: y,
    pitch_a: 30,
    pitch_b: 30,
    base: y,
    overhang: 0.15,
    dormer: true,
  };
}

/**
 * Where a dormer's roof stands above the slope it sits on (the opening it needs in that slope), as a
 * plan polygon: its front edge, then back along the lines where its slopes run into the host's.
 */
export function dormerHole(host: RoofSection, d: RoofSection): Vec2[] | null {
  if (d.shape === "flat" || host.shape === "flat") return null;
  const fr = sectionFrame(d);
  const pr = sectionProfile(d);
  const hp = sectionProfile(host);
  const hostY = (u: number, v: number) => hp.y(sectionUV(host, fr.at(u, v))[1]);
  // the front is the end where the host slope is lower
  const front = hostY(fr.u0, fr.w / 2) <= hostY(fr.u1, fr.w / 2) ? fr.u0 : fr.u1;
  const back = front === fr.u0 ? fr.u1 : fr.u0;
  const vs = d.shape === "pent" ? [0, fr.w] : [0, pr.vr, fr.w];
  const meet = (v: number) => {
    // the host's height runs linearly from front to back: where it reaches the dormer's
    const y = pr.y(v);
    const yf = hostY(front, v);
    const yb = hostY(back, v);
    if (yf >= y) return front;
    if (yb <= y) return back;
    return front + ((y - yf) / (yb - yf)) * (back - front);
  };
  return [fr.at(front, 0), ...vs.map((v) => fr.at(meet(v), v)), fr.at(front, fr.w)];
}
