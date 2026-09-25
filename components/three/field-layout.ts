/**
 * Geometry of the conceptual field: a cut-away block with surface at y = 0,
 * an anticline reservoir below, 30 producer locations and one processing hub.
 * Illustrative only — not a map of the real field.
 */
import * as THREE from "three";

export const BLOCK = { width: 16, depth: 9, depth3d: 6.2 } as const; // x, z extent; subsurface thickness
export const LAYERS = {
  overburdenBottom: -2.1,
  reservoirBase: -3.5,
  floor: -BLOCK.depth3d,
};

/** Top of the reservoir: a gentle dome (anticline) centred on the block. */
export function reservoirTop(x: number, z: number): number {
  return -2.4 + 0.75 * Math.exp(-(x * x) / 34 - (z * z) / 12);
}

/** Deterministic pseudo-random, so the field looks the same on every load. */
function rand(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/**
 * 30 producer locations. The first 15 are Scenario A's wells (the 3 base-case
 * wells + 12 new); indices 15–29 are the additional Scenario B wells, placed
 * further out on the flanks.
 */
export const WELLS: THREE.Vector3[] = (() => {
  const r = rand(20240131);
  const pts: THREE.Vector3[] = [];
  // inner ring for A, outer ring for B
  const rings = [
    { count: 15, rx: 3.6, rz: 2.2 },
    { count: 15, rx: 6.3, rz: 3.5 },
  ];
  rings.forEach(({ count, rx, rz }, ringIndex) => {
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2 + ringIndex * 0.21 + (r() - 0.5) * 0.18;
      const k = ringIndex === 0 && i % 3 === 0 ? 0.45 : 1; // a few wells nearer the crest
      pts.push(new THREE.Vector3(Math.cos(a) * rx * k + (r() - 0.5) * 0.4, 0, Math.sin(a) * rz * k + (r() - 0.5) * 0.3));
    }
  });
  return pts;
})();

export const HUB = new THREE.Vector3(-6.6, 0, -2.9); // processing facility
export const EXPORT_END = new THREE.Vector3(-8.2, 0, 3.6); // sales / export point at the block edge

/** Gathering manifold each well connects to: nearest of three trunk nodes. */
export const MANIFOLDS = [new THREE.Vector3(-2.6, 0, -1.4), new THREE.Vector3(2.4, 0, -1.2), new THREE.Vector3(0.2, 0, 2.1)];
export const manifoldFor = (p: THREE.Vector3) =>
  MANIFOLDS.reduce((best, m) => (m.distanceToSquared(p) < best.distanceToSquared(p) ? m : best), MANIFOLDS[0]);

/** Full path of oil from the reservoir to sales for well i. */
export function flowPath(i: number): THREE.Vector3[] {
  const w = WELLS[i];
  const m = manifoldFor(w);
  const lift = 0.04;
  return [
    new THREE.Vector3(w.x, reservoirTop(w.x, w.z) - 0.25, w.z),
    new THREE.Vector3(w.x, lift, w.z),
    new THREE.Vector3(m.x, lift, m.z),
    new THREE.Vector3(HUB.x + 0.6, lift, HUB.z + 0.4),
    new THREE.Vector3(EXPORT_END.x, lift, EXPORT_END.z),
  ];
}

/** Index of the path segment where oil reaches the processing hub (value begins after it). */
export const HUB_SEGMENT = 3;
