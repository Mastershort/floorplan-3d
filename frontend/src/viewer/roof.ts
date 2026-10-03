// The roof: either one roof over the top floor (flat or gable, over the bounding box of its rooms plus
// the outer walls and the overhang), or roof sections (wings of an L- or T-shaped house, a barn with a
// catslide, a lean-to …) at their own heights. Drawn in the house view only; the viewer lifts and fades
// it out when the camera zooms in.

import { Color } from "three";
import type { Building, Floor, RoofSection, SolarField } from "../model.ts";
import { dormerHole, hostTop, ROOF_THICK, sectionFrame, sectionOverhang, sectionProfile, sectionUV, type SectionOverhang } from "../roof-sections.ts";
import { DEG, GeoBuffer, LineBuffer, pushPrism, shade, triangulate } from "./geo.ts";
import { fieldModules, roofFaces, windowCorners, type RoofFace } from "../solar.ts";

const ROOF = 0x1a2338;
const ROOF_TOP = 0x222d48;
const GABLE = 0x141d31;
const RIDGE = shade(0x37e0ff, 0.9);
const EAVE = shade(0x5b7cff, 0.45);
const THICK = ROOF_THICK;
/** Canopy: see-through panels and a light frame of posts and beams. */
const GLASS = 0x8fd8ff;
const FRAME = 0xc9d3e6;
const FRAME_TOP = 0xe3e9f5;
/** Solar modules: full black (glass, frame, barely visible cells) or the classic blue look. */
const PANEL_LOOKS = {
  black: { glass: new Color(0x05070b), edge: shade(0x8a96b0, 0.32), cells: shade(0x2a3550, 0.22) },
  blue: { glass: new Color(0x15295a), edge: shade(0x9fb8ff, 0.55), cells: shade(0x3d6cff, 0.35) },
};
const PANEL_POST = shade(0xc9d3e6, 0.5);
/** Roof windows: a light frame, glass, the blind. */
const WINDOW_FRAME = shade(0xc9d3e6, 0.85);
const WINDOW_GLASS = new Color(0x2b6b8f);
const WINDOW_BLIND = new Color(0x3a4258);
/** An open roof window: the warm colour of open windows in walls. */
const WINDOW_OPEN = shade(0xffb547, 0.9);
const WINDOW_GLASS_OPEN = new Color(0xffb547).multiplyScalar(0.55);

/** Live state of a roof window: how far its sash is open (1 = open, tilt counts less) and how far its blind is down. */
export interface RoofWindowState {
  open: number;
  tilt: number;
  cover: number;
}

/** Roof geometry that sits on a floor: y = 0 is `base` above the floor's own level. */
export interface RoofGeometry {
  floor: Floor;
  base: number;
  solid: GeoBuffer;
  lines: LineBuffer;
  /** See-through roof panels of canopies (drawn with their own, fainter material). */
  glass: GeoBuffer;
  /** Roof sections in this part (sections roof only). */
  sections?: string[];
  /** Its roof windows, drawn apart from the roof on the floor under each (heights above that floor): they stay when the roof is hidden. */
  windows?: Map<string, { solid: GeoBuffer; lines: LineBuffer }>;
}

/** The floor the roof sits on: the highest one with rooms. */
export function roofFloor(b: Building): Floor | null {
  const withRooms = b.floors.filter((f) => f.rooms.some((r) => r.points.length >= 3));
  return withRooms.sort((p, q) => q.elevation - p.elevation)[0] ?? null;
}

/** The roof, in parts per floor (each part moves with its floor when the floors are pulled apart). */
export function buildRoof(b: Building, windows: ReadonlyMap<string, RoofWindowState> = new Map()): RoofGeometry[] {
  const roof = b.settings.roof;
  const one = roof?.type === "custom" ? null : buildSingleRoof(b);
  const parts = roof?.type === "custom" ? buildSections(b, roof.sections ?? [], roof.overhang) : one ? [one] : [];
  pushSolar(b, parts);
  pushRoofWindows(b, parts, windows);
  return parts;
}

/** Roof windows: frame and glass in the slope; the sash swings out at the top when open, the blind comes down. */
function pushRoofWindows(b: Building, parts: RoofGeometry[], states: ReadonlyMap<string, RoofWindowState>): void {
  const windows = b.settings.roof?.windows ?? [];
  if (!windows.length || !parts.length) return;
  const faces = new Map(roofFaces(b).map((f) => [f.key, f]));
  for (const w of windows) {
    const face = faces.get(w.face);
    const corners = face ? windowCorners(face, w) : null;
    if (!face || !corners) continue;
    const part = face.section ? parts.find((p) => p.sections?.includes(face.section!)) : parts[0];
    if (!part) continue;
    // it belongs to the floor under it: the highest one below its middle
    const mid = corners.reduce((t, p) => t + p[1], 0) / 4;
    const below = b.floors.filter((f) => f.rooms.length && f.elevation < mid).sort((p, q) => q.elevation - p.elevation)[0] ?? part.floor;
    const L = (p: number[]): number[] => [p[0], p[1] - below.elevation, p[2]];
    const [a, c, d, e] = corners.map(L);
    const st = states.get(w.id) ?? { open: 0, tilt: 0, cover: 0 };
    part.windows ??= new Map();
    let win = part.windows.get(below.id);
    if (!win) part.windows.set(below.id, (win = { solid: new GeoBuffer(), lines: new LineBuffer() }));
    // open or tilted it glows warm, like a window in a wall
    const open = st.open > 0.02 || st.tilt > 0.5;
    const frameC = open ? WINDOW_OPEN : WINDOW_FRAME;
    const up = (p: number[], k: number) => [p[0] + face.n[0] * k, p[1] + face.n[1] * k, p[2] + face.n[2] * k];
    const mix = (p: number[], q: number[], t: number) => [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t, p[2] + (q[2] - p[2]) * t];
    // the fixed frame in the roof
    const ring = [a, c, d, e].map((p) => up(p, 0.06));
    for (let i = 0; i < 4; i++) win.lines.seg(ring[i], ring[(i + 1) % 4], frameC);
    // the sash, hinged at the top: its lower edge swings out along the normal (open 30°, tilted 12°)
    // a sash motor opens it step by step (its position), a contact all the way
    const angle = Math.max(30 * Math.min(1, st.open), st.tilt > 0.5 ? 12 : 0) * DEG;
    const h = Math.hypot(d[0] - c[0], d[1] - c[1], d[2] - c[2]);
    const swing = (top: number[]) => {
      const es = face.es;
      return [top[0] - es[0] * h * Math.cos(angle) + face.n[0] * h * Math.sin(angle), top[1] - es[1] * h * Math.cos(angle) + face.n[1] * h * Math.sin(angle), top[2] - es[2] * h * Math.cos(angle) + face.n[2] * h * Math.sin(angle)];
    };
    const top0 = up(e, 0.065);
    const top1 = up(d, 0.065);
    const bot0 = swing(top0);
    const bot1 = swing(top1);
    const glass = open ? WINDOW_GLASS_OPEN : WINDOW_GLASS;
    win.solid.tri(bot0, bot1, top1, glass);
    win.solid.tri(bot0, top1, top0, glass);
    for (const [p, q] of [[bot0, bot1], [bot1, top1], [top1, top0], [top0, bot0]]) win.lines.seg(p, q, frameC);
    // the blind comes down from the top over the sash
    if (st.cover > 0.02) {
      const k = Math.min(1, st.cover);
      const b0 = up(mix(top0, bot0, k), 0.01);
      const b1 = up(mix(top1, bot1, k), 0.01);
      const t0 = up(top0, 0.01);
      const t1 = up(top1, 0.01);
      win.solid.tri(b0, b1, t1, WINDOW_BLIND);
      win.solid.tri(b0, t1, t0, WINDOW_BLIND);
    }
  }
}

/** Solar fields on the roof: every module on its face, in the coordinates of the roof part the face belongs to. */
function pushSolar(b: Building, parts: RoofGeometry[]): void {
  const fields = b.settings.roof?.solar ?? [];
  if (!fields.length || !parts.length) return;
  const faces = new Map(roofFaces(b).map((f) => [f.key, f]));
  for (const field of fields) {
    const face = faces.get(field.face);
    if (!face) continue;
    const part = face.section ? parts.find((p) => p.sections?.includes(face.section!)) : parts[0];
    // faces have heights above the ground; parts count from their floor's level plus their base
    if (part) pushModules(part.solid, part.lines, face, field, part.floor.elevation + part.base);
  }
}

/** The modules of a field (glass, frame, cell grid, frames on flat ground), lowered by `dy` into local coordinates. */
export function pushModules(solid: GeoBuffer, lines: LineBuffer, face: RoofFace, field: SolarField, dy: number): void {
  const L = (p: number[]): number[] => [p[0], p[1] - dy, p[2]];
  const look = PANEL_LOOKS[field.look === "blue" ? "blue" : "black"];
  const cu = field.portrait === false ? 10 : 6;
  const cv = field.portrait === false ? 6 : 10;
  for (const m of fieldModules(face, field)) {
    const [a, c, d, e] = m.corners.map(L);
    // both sides: on a floor (garden, walls) only front faces are drawn, and a module leans either way
    solid.tri(a, c, d, look.glass);
    solid.tri(a, d, e, look.glass);
    solid.tri(a, d, c, look.glass);
    solid.tri(a, e, d, look.glass);
    // the frame a hair above the glass, and the cell grid
    const up = (p: number[], k = 0.004) => [p[0] + face.n[0] * k, p[1] + face.n[1] * k, p[2] + face.n[2] * k];
    const mix = (p: number[], q: number[], t: number) => [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t, p[2] + (q[2] - p[2]) * t];
    const ring = [a, c, d, e].map((p) => up(p));
    for (let i = 0; i < 4; i++) lines.seg(ring[i], ring[(i + 1) % 4], look.edge);
    for (let i = 1; i < cu; i++) lines.seg(up(mix(a, c, i / cu)), up(mix(e, d, i / cu)), look.cells);
    for (let j = 1; j < cv; j++) lines.seg(up(mix(a, e, j / cv)), up(mix(c, d, j / cv)), look.cells);
    for (const [p, q] of m.posts) lines.seg(L(p), L(q), PANEL_POST);
  }
}

/** One roof over the top floor, in floor coordinates with y = 0 at the top of the floor's walls. */
function buildSingleRoof(b: Building): RoofGeometry | null {
  const roof = b.settings.roof;
  const floor = roofFloor(b);
  if (!floor || !roof || roof.type === "none" || roof.type === "custom") return null;
  const xs = floor.rooms.flatMap((r) => r.points.map((p) => p[0]));
  const zs = floor.rooms.flatMap((r) => r.points.map((p) => p[1]));
  const m = b.settings.wall_exterior + roof.overhang;
  const x0 = Math.min(...xs) - m;
  const x1 = Math.max(...xs) + m;
  const z0 = Math.min(...zs) - m;
  const z1 = Math.max(...zs) + m;
  const solid = new GeoBuffer();
  const lines = new LineBuffer();
  if (roof.type === "flat") {
    pushPrism(solid, [[x0, z0], [x1, z0], [x1, z1], [x0, z1]], 0, 0.25, ROOF, ROOF_TOP, { bottom: true });
    const e = 0.252;
    for (const [a, c] of [
      [[x0, z0], [x1, z0]],
      [[x1, z0], [x1, z1]],
      [[x1, z1], [x0, z1]],
      [[x0, z1], [x0, z0]],
    ]) {
      lines.seg([a[0], e, a[1]], [c[0], e, c[1]], RIDGE);
      lines.seg([a[0], 0, a[1]], [c[0], 0, c[1]], EAVE);
    }
    return { floor, base: floor.height, solid, lines, glass: new GeoBuffer() };
  }
  // gable: the ridge runs along the longer side, or along the shorter one (terraced houses)
  const longX = x1 - x0 >= z1 - z0;
  const alongX = roof.ridge === "short" ? !longX : longX;
  const half = (alongX ? z1 - z0 : x1 - x0) / 2;
  const rise = half * Math.tan(roof.pitch * DEG);
  // coordinates: u along the ridge, v across (from -half to +half)
  const P = (u: number, v: number, y: number): number[] => (alongX ? [u, y, (z0 + z1) / 2 + v] : [(x0 + x1) / 2 + v, y, u]);
  const [u0, u1] = alongX ? [x0, x1] : [z0, z1];
  const top = new Color(ROOF_TOP);
  const under = new Color(ROOF);
  const quad = (a: number[], b2: number[], c: number[], d: number[], col: Color) => {
    solid.tri(a, b2, c, col);
    solid.tri(a, c, d, col);
  };
  for (const side of [-1, 1]) {
    // upper and lower face of the slope, and the eave and rake faces of its thickness
    quad(P(u0, side * half, 0), P(u1, side * half, 0), P(u1, 0, rise), P(u0, 0, rise), top);
    quad(P(u0, side * half, -THICK), P(u0, 0, rise - THICK), P(u1, 0, rise - THICK), P(u1, side * half, -THICK), under);
    quad(P(u0, side * half, -THICK), P(u1, side * half, -THICK), P(u1, side * half, 0), P(u0, side * half, 0), under);
    for (const u of [u0, u1]) quad(P(u, side * half, -THICK), P(u, side * half, 0), P(u, 0, rise), P(u, 0, rise - THICK), under);
    lines.seg(P(u0, side * half, 0), P(u1, side * half, 0), EAVE);
    for (const u of [u0, u1]) lines.seg(P(u, side * half, 0), P(u, 0, rise), EAVE);
  }
  // gable walls above the outer walls (set back by the overhang)
  const inset = roof.overhang;
  const g = new Color(GABLE);
  const hw = half - inset;
  const rw = hw * Math.tan(roof.pitch * DEG);
  for (const u of [u0 + inset, u1 - inset]) {
    solid.tri(P(u, -hw, -THICK), P(u, hw, -THICK), P(u, 0, rw - THICK), g);
    solid.tri(P(u, hw, -THICK), P(u, -hw, -THICK), P(u, 0, rw - THICK), g);
  }
  lines.seg(P(u0, 0, rise + 0.004), P(u1, 0, rise + 0.004), RIDGE);
  return { floor, base: floor.height, solid, lines, glass: new GeoBuffer() };
}

/** Roof sections, grouped by the floor whose wall tops are nearest below each section's base. */
function buildSections(b: Building, sections: readonly RoofSection[], overhang: number): RoofGeometry[] {
  const floors = b.floors.filter((f) => f.rooms.length > 0).sort((p, q) => p.elevation - q.elevation);
  if (!floors.length) return [];
  const parts = new Map<string, RoofGeometry>();
  const faces = new Map(roofFaces(b).map((f) => [f.key, f]));
  for (const sec of sections) {
    if (Math.abs(sec.x1 - sec.x0) < 0.1 || Math.abs(sec.z1 - sec.z0) < 0.1) continue;
    // the floor the section sits on: the highest one that starts below its walls' top; a dormer
    // moves with the section it sits on (when the floors are pulled apart)
    const within = (h: RoofSection, d: RoofSection) => {
      const fr = sectionFrame(h);
      const [u, v] = sectionUV(h, [(d.x0 + d.x1) / 2, (d.z0 + d.z1) / 2]);
      return u >= fr.u0 && u <= fr.u1 && v >= 0 && v <= fr.w;
    };
    const owner = sec.dormer ? (sections.find((h) => !h.dormer && !h.open && within(h, sec)) ?? sec) : sec;
    const floor = [...floors].reverse().find((f) => f.elevation < owner.base - 0.05) ?? floors[0];
    let part = parts.get(floor.id);
    if (!part) parts.set(floor.id, (part = { floor, base: 0, solid: new GeoBuffer(), lines: new LineBuffer(), glass: new GeoBuffer(), sections: [] }));
    part.sections!.push(sec.id);
    // its roof windows cut a hole into their slope: from the attic one looks out through them
    const holes = (b.settings.roof?.windows ?? []).flatMap((w) => {
      const face = faces.get(w.face);
      if (!face || face.section !== sec.id || (face.side !== "a" && face.side !== "b")) return [];
      const c = windowCorners(face, w);
      return c ? [{ side: face.side, uv: c.map((p) => sectionUV(sec, [p[0], p[2]])) }] : [];
    });
    // the slope opens where a dormer stands above it, and the dormer's cheeks reach down to it
    if (!sec.dormer && !sec.open) {
      const vr = sectionProfile(sec).vr;
      for (const d of sections) {
        if (!d.dormer || d.open || !within(sec, d)) continue;
        const ring = dormerHole(sec, d);
        if (!ring || ring.length < 3) continue;
        const uv = ring.map((p) => sectionUV(sec, p));
        holes.push({ side: uv.reduce((t, q) => t + q[1], 0) / uv.length <= vr ? "a" : "b", uv });
      }
    }
    const host = sec.dormer ? (p: [number, number]) => hostTop(sections, p, sec) : undefined;
    pushSection(part.solid, part.lines, sec, sectionOverhang(b, sec, sec.overhang ?? overhang), floor.elevation, part.glass, holes, host);
  }
  return [...parts.values()];
}

/**
 * One section: its slopes with their thickness and rim, the ridge (and hips), and the walls from the
 * section's base up under the roof (gable ends and knee walls). `yOff` is the level of its floor.
 */
export function pushSection(
  solid: GeoBuffer,
  lines: LineBuffer,
  s: RoofSection,
  overhang: SectionOverhang | number,
  yOff: number,
  glass: GeoBuffer = solid,
  /** Openings in its slopes (roof windows, dormers), in its frame (u along the ridge, v across). */
  openings: { side: "a" | "b"; uv: [number, number][] }[] = [],
  /** A dormer: the height of the slope it sits on (its cheeks reach down to it). */
  host?: (p: [number, number]) => number | null,
): void {
  const fr = sectionFrame(s);
  const pr = sectionProfile(s);
  const ov = typeof overhang === "number" ? { u0: overhang, u1: overhang, a: overhang, b: overhang } : overhang;
  const w = fr.w;
  // a slope that reaches the ground (an A-frame) ends there: its overhang does not run into the earth
  const toGround = (eave: number, pitch: number) => (s.shape === "flat" || pitch <= 0 ? Infinity : Math.max(0, eave) / Math.tan(Math.min(80, pitch) * DEG));
  const oa = Math.min(Math.max(0, ov.a), toGround(pr.y(0), s.pitch_a));
  const ob = Math.min(Math.max(0, ov.b), s.shape === "pent" ? Infinity : toGround(pr.y(w), s.pitch_b));
  const U0 = fr.u0 - Math.max(0, ov.u0);
  const U1 = fr.u1 + Math.max(0, ov.u1);
  const P = (u: number, v: number, y: number): number[] => {
    const [x, z] = fr.at(u, v);
    return [x, y - yOff, z];
  };
  const top = new Color(ROOF_TOP);
  const under = new Color(ROOF);
  const g = new Color(GABLE);
  const fan = (pts: number[][], col: Color) => {
    for (let i = 1; i + 1 < pts.length; i++) solid.tri(pts[0], pts[i], pts[i + 1], col);
  };
  // the roof planes: corners as (u, v) with the height from the profile, the ridge points at its height
  type Q = [number, number, number];
  const at = (u: number, v: number): Q => [u, v, pr.y(v)];
  let faces: Q[][];
  let rim: Q[];
  const ridges: [Q, Q][] = [];
  if (s.shape === "flat") {
    const y = s.eave_a;
    const poly = [fr.at(U0, -oa), fr.at(U1, -oa), fr.at(U1, w + ob), fr.at(U0, w + ob)];
    pushPrism(solid, poly, y - yOff, y - yOff + 0.25, ROOF, ROOF_TOP, { bottom: true });
    for (let i = 0; i < 4; i++) {
      const a = poly[i];
      const c = poly[(i + 1) % 4];
      lines.seg([a[0], y - yOff + 0.252, a[1]], [c[0], y - yOff + 0.252, c[1]], RIDGE);
      lines.seg([a[0], y - yOff, a[1]], [c[0], y - yOff, c[1]], EAVE);
    }
    faces = [];
    rim = [];
  } else if (s.shape === "pent") {
    const c = [at(U0, -oa), at(U1, -oa), at(U1, w + ob), at(U0, w + ob)];
    faces = [c];
    rim = c;
    ridges.push([c[2], c[3]]);
  } else if (s.shape === "hip") {
    // hips rise from the corners: the ridge is shorter by the run of the slopes at both ends
    const d = Math.min((fr.u1 - fr.u0) / 2, Math.min(pr.vr, w - pr.vr) || w / 2);
    const rs: Q = [fr.u0 + d, pr.vr, pr.rh];
    const re: Q = [fr.u1 - d, pr.vr, pr.rh];
    const a0 = at(U0, -oa);
    const a1 = at(U1, -oa);
    const b1 = at(U1, w + ob);
    const b0 = at(U0, w + ob);
    faces = [
      [a0, a1, re, rs],
      [rs, re, b1, b0],
      [b0, a0, rs],
      [a1, b1, re],
    ];
    rim = [a0, a1, b1, b0];
    ridges.push([rs, re], [a0, rs], [b0, rs], [a1, re], [b1, re]);
  } else {
    const r0: Q = [U0, pr.vr, pr.rh];
    const r1: Q = [U1, pr.vr, pr.rh];
    const a0 = at(U0, -oa);
    const a1 = at(U1, -oa);
    const b1 = at(U1, w + ob);
    const b0 = at(U0, w + ob);
    faces = [
      [a0, a1, r1, r0],
      [r0, r1, b1, b0],
    ];
    rim = [a0, a1, r1, b1, b0, r0];
    ridges.push([r0, r1]);
  }
  // a canopy has thin see-through panels; a closed roof its tiles with their thickness below
  const open = !!s.open;
  const pane = new Color(GLASS);
  faces.forEach((f, i) => {
    if (open) {
      for (let k = 1; k + 1 < f.length; k++) glass.tri(P(f[0][0], f[0][1], f[0][2]), P(f[k][0], f[k][1], f[k][2]), P(f[k + 1][0], f[k + 1][1], f[k + 1][2]), pane);
      return;
    }
    // openings cut into this slope (face 0 is side a, face 1 side b; not the hip ends), kept a hair inside it
    const rings = i > 1 ? [] : openings.filter((o) => s.shape === "pent" || o.side === (i === 0 ? "a" : "b")).map((o) => clipRing(o.uv, f));
    if (!rings.length) {
      fan(f.map(([u, v, y]) => P(u, v, y)), top);
      fan(f.map(([u, v, y]) => P(u, v, y - THICK)), under);
      return;
    }
    const poly = f.map(([u, v]) => [u, v] as [number, number]);
    const all = [...poly, ...rings.flat()];
    const area = (a: number[], b: number[], c: number[]) => (b[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (b[1] - a[1]);
    const turn = Math.sign(area(poly[0], poly[1], poly[2]) || 1);
    for (const tri of triangulate(poly, rings)) {
      // keep the winding of the face (the fan above)
      const [a, b, c] = Math.sign(area(all[tri[0]], all[tri[1]], all[tri[2]])) === turn ? tri : [tri[0], tri[2], tri[1]];
      const pts = [all[a], all[b], all[c]];
      solid.tri(...(pts.map(([u, v]) => P(u, v, pr.y(v))) as [number[], number[], number[]]), top);
      solid.tri(...(pts.map(([u, v]) => P(u, v, pr.y(v) - THICK)) as [number[], number[], number[]]), under);
    }
    // the reveal of each opening through the roof's thickness
    for (const ring of rings) {
      for (let k = 0; k < ring.length; k++) {
        const [ua, va] = ring[k];
        const [ub, vb] = ring[(k + 1) % ring.length];
        fan([P(ua, va, pr.y(va)), P(ub, vb, pr.y(vb)), P(ub, vb, pr.y(vb) - THICK), P(ua, va, pr.y(va) - THICK)], under);
      }
    }
  });
  // the rim: eaves and rakes with the roof's thickness
  for (let i = 0; i < rim.length; i++) {
    const [ua, va, ya] = rim[i];
    const [ub, vb, yb] = rim[(i + 1) % rim.length];
    if (!open) fan([P(ua, va, ya), P(ub, vb, yb), P(ub, vb, yb - THICK), P(ua, va, ya - THICK)], under);
    lines.seg(P(ua, va, ya), P(ub, vb, yb), open ? RIDGE : EAVE);
  }
  if (open) {
    pushCanopyFrame(solid, lines, fr, pr, ov, P, yOff);
    return;
  }
  for (const [[ua, va, ya], [ub, vb, yb]] of ridges) lines.seg(P(ua, va, ya + 0.004), P(ub, vb, yb + 0.004), RIDGE);
  // walls up under the roof, from the section's base: the gable ends (not under a hip) …
  const base = s.base;
  if (s.shape === "gable" || s.shape === "pent") {
    const profile: [number, number][] = s.shape === "pent" ? [[0, pr.y(0)], [w, pr.y(w)]] : [[0, pr.y(0)], [pr.vr, pr.rh], [w, pr.y(w)]];
    const poly = above(profile, base - THICK);
    if (poly.length >= 3) for (const u of [fr.u0, fr.u1]) fan(poly.map(([v, y]) => P(u, v, y)), g);
  }
  // a dormer: its cheeks under both eaves, from the eave down to the slope below (where that is lower)
  if (host && s.shape !== "flat") {
    for (const v of s.shape === "pent" ? [0] : [0, w]) {
      const y = pr.y(v) - THICK;
      const h0 = host(fr.at(fr.u0, v)) ?? y;
      const h1 = host(fr.at(fr.u1, v)) ?? y;
      if (h0 >= y && h1 >= y) continue;
      const cut = (y - h0) / (h1 - h0 || 1e-9);
      const pts =
        h0 < y && h1 < y
          ? [P(fr.u0, v, h0), P(fr.u0, v, y), P(fr.u1, v, y), P(fr.u1, v, h1)]
          : h0 < y
            ? [P(fr.u0, v, h0), P(fr.u0, v, y), P(fr.u0 + (fr.u1 - fr.u0) * cut, v, y)]
            : [P(fr.u0 + (fr.u1 - fr.u0) * cut, v, y), P(fr.u1, v, y), P(fr.u1, v, h1)];
      fan(pts, g);
      lines.seg(pts[0], pts[pts.length - 1], EAVE);
    }
  }
  // … and the knee walls along the eaves where the roof starts above the walls (a high back wall of a pent roof)
  if (s.shape !== "flat") {
    for (const v of [0, w]) {
      const y = pr.y(v) - THICK;
      if (y > base + 0.02) fan([P(fr.u0, v, base), P(fr.u1, v, base), P(fr.u1, v, y), P(fr.u0, v, y)], g);
    }
  } else if (s.eave_a > base + 0.02) {
    for (const [ua, va, ub, vb] of [[fr.u0, 0, fr.u1, 0], [fr.u1, 0, fr.u1, w], [fr.u1, w, fr.u0, w], [fr.u0, w, fr.u0, 0]])
      fan([P(ua, va, base), P(ub, vb, base), P(ub, vb, s.eave_a), P(ua, va, s.eave_a)], g);
  }
}

/**
 * Posts and beams of a canopy: a beam under each free edge of the roof, posts at its corners and at
 * most 3.5 m apart along the free sides; an edge against the house (no overhang) rests on the wall.
 */
function pushCanopyFrame(
  solid: GeoBuffer,
  lines: LineBuffer,
  fr: ReturnType<typeof sectionFrame>,
  pr: ReturnType<typeof sectionProfile>,
  ov: { u0: number; u1: number; a: number; b: number },
  P: (u: number, v: number, y: number) => number[],
  yOff: number,
): void {
  const w = fr.w;
  const POST = 0.12;
  const BEAM = 0.16;
  const freeA = ov.a > 0;
  const freeB = ov.b > 0;
  const freeU0 = ov.u0 > 0;
  const freeU1 = ov.u1 > 0;
  const box = (u0: number, u1: number, v0: number, v1: number, y0: number, y1: number) => {
    const poly = [fr.at(u0, v0), fr.at(u1, v0), fr.at(u1, v1), fr.at(u0, v1)];
    // the frame may be flipped: keep the outline counter-clockwise
    const area = (poly[1][0] - poly[0][0]) * (poly[2][1] - poly[0][1]) - (poly[2][0] - poly[0][0]) * (poly[1][1] - poly[0][1]);
    pushPrism(solid, area < 0 ? [...poly].reverse() : poly, y0 - yOff, y1 - yOff, FRAME, FRAME_TOP, { bottom: true });
  };
  const ground = yOff;
  // beams along the free long sides (a, b), under the roof at their height
  for (const [v, free] of [[0, freeA], [w, freeB]] as const) {
    if (!free) continue;
    const y = pr.y(v) - 0.03;
    const vv = v === 0 ? 0 : w - POST;
    box(fr.u0, fr.u1, vv, vv + POST, y - BEAM, y);
    lines.seg(P(fr.u0, v, y - BEAM), P(fr.u1, v, y - BEAM), EAVE);
  }
  // beams along the free ends (u0, u1), following the slope
  for (const [u, free] of [[fr.u0, freeU0], [fr.u1 - POST, freeU1]] as const) {
    if (!free) continue;
    for (let i = 0; i < 6; i++) {
      const v0 = (w * i) / 6;
      const v1 = (w * (i + 1)) / 6;
      const y = Math.min(pr.y(v0), pr.y(v1)) - 0.03;
      box(u, u + POST, v0, v1, y - BEAM, y);
    }
  }
  // posts: corners where both edges are free (a corner at the house wall rests on the wall), and
  // along a free long side at most 3.5 m apart
  const posts: [number, number][] = [];
  for (const [v, free] of [[0, freeA], [w - POST, freeB]] as const) {
    if (!free) continue;
    const span = fr.u1 - fr.u0 - POST;
    const n = Math.max(1, Math.ceil(span / 3.5));
    for (let i = 0; i <= n; i++) {
      const u = fr.u0 + (span * i) / n;
      if ((i === 0 && !freeU0) || (i === n && !freeU1)) continue;
      posts.push([u, v]);
    }
  }
  // a pent roof against the house with only its ends free still needs posts at its outer corners
  if (!freeA && !freeB) for (const u of [fr.u0, fr.u1 - POST]) if ((u === fr.u0 && freeU0) || (u !== fr.u0 && freeU1)) posts.push([u, w / 2 - POST / 2]);
  for (const [u, v] of posts) {
    const top = pr.y(v + POST / 2) - 0.03 - BEAM;
    box(u, u + POST, v, v + POST, ground, top);
  }
}

/** The part of a roof profile (points across, with heights) above a level, as a closed polygon. */
function above(profile: [number, number][], level: number): [number, number][] {
  const out: [number, number][] = [];
  for (let i = 0; i < profile.length; i++) {
    const [v, y] = profile[i];
    if (y >= level) out.push([v, y]);
    const next = profile[i + 1];
    if (next && (y - level) * (next[1] - level) < 0) {
      const t = (level - y) / (next[1] - y);
      out.push([v + (next[0] - v) * t, level]);
    }
  }
  if (out.length < 2) return [];
  // close along the level
  const first = out[0];
  const last = out[out.length - 1];
  if (last[1] > level) out.push([last[0], level]);
  if (first[1] > level) out.unshift([first[0], level]);
  return out;
}

/** An opening's ring kept a centimetre inside a slope's outline (u, v), so the cut never touches its rim. */
function clipRing(ring: readonly [number, number][], face: readonly (readonly number[])[]): [number, number][] {
  const us = face.map((q) => q[0]);
  const vs = face.map((q) => q[1]);
  const [u0, u1, v0, v1] = [Math.min(...us) + 0.01, Math.max(...us) - 0.01, Math.min(...vs) + 0.01, Math.max(...vs) - 0.01];
  return ring.map(([u, v]) => [Math.min(u1, Math.max(u0, u)), Math.min(v1, Math.max(v0, v))]);
}
