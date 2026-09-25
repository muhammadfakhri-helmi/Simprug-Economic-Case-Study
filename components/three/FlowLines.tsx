"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { EXPORT_END, HUB, HUB_SEGMENT, MANIFOLDS, WELLS, flowPath, manifoldFor } from "./field-layout";

const OIL = new THREE.Color("#e0ae62");
const VALUE = new THREE.Color("#5ec4da");

interface Path {
  pts: THREE.Vector3[];
  cum: number[]; // cumulative length at each point
  total: number;
  hubAt: number; // distance at which oil reaches the hub
}

function buildPath(i: number): Path {
  const pts = flowPath(i);
  const cum = [0];
  for (let k = 1; k < pts.length; k++) cum.push(cum[k - 1] + pts[k].distanceTo(pts[k - 1]));
  return { pts, cum, total: cum[cum.length - 1], hubAt: cum[HUB_SEGMENT] };
}

interface FlowLinesProps {
  particles: number;
  reducedMotion: boolean;
  /** Number of wells currently producing (their paths carry particles). */
  activeWells: React.MutableRefObject<number>;
}

/**
 * Pipes (one LineSegments draw call) and the flow of oil as points:
 * gold from reservoir to the processing hub, cyan (value) from the hub to sales.
 */
export function FlowLines({ particles, reducedMotion, activeWells }: FlowLinesProps) {
  const paths = useMemo(() => WELLS.map((_, i) => buildPath(i)), []);

  const pipeGeo = useMemo(() => {
    const v: number[] = [];
    const push = (a: THREE.Vector3, b: THREE.Vector3) => v.push(a.x, 0.03, a.z, b.x, 0.03, b.z);
    WELLS.forEach((w) => push(w, manifoldFor(w)));
    MANIFOLDS.forEach((m) => push(m, new THREE.Vector3(HUB.x + 0.6, 0, HUB.z + 0.4)));
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(v, 3));
    return g;
  }, []);

  const exportGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute([HUB.x + 0.6, 0.03, HUB.z + 0.4, EXPORT_END.x, 0.03, EXPORT_END.z], 3));
    return g;
  }, []);

  // particle state
  const seeds = useMemo(() => Float32Array.from({ length: particles }, (_, k) => (k * 0.6180339) % 1), [particles]);
  const positions = useMemo(() => new Float32Array(particles * 3), [particles]);
  const colors = useMemo(() => new Float32Array(particles * 3), [particles]);
  const pointsGeo = useRef<THREE.BufferGeometry>(null);
  const tmp = useMemo(() => new THREE.Vector3(), []);

  const layout = (time: number) => {
    const n = Math.max(1, activeWells.current);
    for (let k = 0; k < particles; k++) {
      const p = paths[k % n];
      const d = (((seeds[k] + time * 0.05) % 1) + 1) % 1 * p.total;
      let s = 1;
      while (s < p.cum.length - 1 && p.cum[s] < d) s++;
      const t = (d - p.cum[s - 1]) / (p.cum[s] - p.cum[s - 1] || 1);
      tmp.lerpVectors(p.pts[s - 1], p.pts[s], t);
      positions.set([tmp.x, tmp.y + 0.03, tmp.z], k * 3);
      const c = d >= p.hubAt ? VALUE : OIL;
      colors.set([c.r, c.g, c.b], k * 3);
    }
    const g = pointsGeo.current;
    if (g) {
      (g.attributes.position as THREE.BufferAttribute).needsUpdate = true;
      (g.attributes.color as THREE.BufferAttribute).needsUpdate = true;
    }
  };

  // static layout for first paint / reduced motion
  useLayoutEffect(() => layout(0.35), [particles]); // eslint-disable-line react-hooks/exhaustive-deps

  useFrame(({ clock }) => {
    if (!reducedMotion) layout(clock.elapsedTime);
  });

  return (
    <group>
      <lineSegments geometry={pipeGeo}>
        <lineBasicMaterial color="#5a6d8c" transparent opacity={0.55} />
      </lineSegments>
      <lineSegments geometry={exportGeo}>
        <lineBasicMaterial color="#5ec4da" transparent opacity={0.8} />
      </lineSegments>
      <points frustumCulled={false}>
        <bufferGeometry ref={pointsGeo}>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.09} vertexColors sizeAttenuation transparent opacity={0.95} depthWrite={false} />
      </points>
    </group>
  );
}
