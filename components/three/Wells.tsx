"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { WELLS, reservoirTop } from "./field-layout";
import { bezier } from "@/lib/motion";

const COLOR_NEUTRAL = new THREE.Color("#c9d3df");
const COLOR_A = new THREE.Color("#7f98cf");
const COLOR_B = new THREE.Color("#5ec4da");

interface WellsProps {
  /** "hero": all 30 wells neutral. "decision": A wells blue, B wells cyan and drilled in sequence. */
  mode: "hero" | "decision";
  reducedMotion: boolean;
  /** Seconds since the decision scene became visible (drives the B-well sequence). */
  startedAt?: React.MutableRefObject<number | null>;
}

/** Instanced wellheads + wellbores: two draw calls for all 30 producers. */
export function Wells({ mode, reducedMotion, startedAt }: WellsProps) {
  const heads = useRef<THREE.InstancedMesh>(null);
  const bores = useRef<THREE.InstancedMesh>(null);
  const tmp = useMemo(() => new THREE.Object3D(), []);
  const count = WELLS.length;

  const place = (i: number, grow: number) => {
    const w = WELLS[i];
    const depth = -reservoirTop(w.x, w.z) + 0.25;
    // wellbore: drawn from the surface down into the reservoir
    tmp.position.set(w.x, -(depth * grow) / 2, w.z);
    tmp.scale.set(1, Math.max(depth * grow, 0.0001), 1);
    tmp.updateMatrix();
    bores.current!.setMatrixAt(i, tmp.matrix);
    // wellhead ("christmas tree") sitting on the surface
    const s = Math.max(grow, 0.0001);
    tmp.position.set(w.x, 0.2 * s, w.z);
    tmp.scale.set(s, s, s);
    tmp.updateMatrix();
    heads.current!.setMatrixAt(i, tmp.matrix);
  };

  useLayoutEffect(() => {
    for (let i = 0; i < count; i++) {
      const isB = i >= 15;
      const c = mode === "hero" ? COLOR_NEUTRAL : isB ? COLOR_B : COLOR_A;
      heads.current!.setColorAt(i, c);
      bores.current!.setColorAt(i, c);
      place(i, mode === "decision" && isB && !reducedMotion ? 0 : 1);
    }
    heads.current!.instanceMatrix.needsUpdate = true;
    bores.current!.instanceMatrix.needsUpdate = true;
    heads.current!.instanceColor!.needsUpdate = true;
    bores.current!.instanceColor!.needsUpdate = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, reducedMotion]);

  useFrame(({ clock }) => {
    if (mode !== "decision" || reducedMotion || startedAt?.current == null) return;
    const t = clock.elapsedTime - startedAt.current!;
    let changed = false;
    for (let i = 15; i < count; i++) {
      const local = (t - 0.4 - (i - 15) * 0.11) / 0.7;
      if (local < 0 || local > 1.2) continue;
      place(i, bezier(Math.min(local, 1)));
      changed = true;
    }
    if (changed) {
      heads.current!.instanceMatrix.needsUpdate = true;
      bores.current!.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group>
      <instancedMesh ref={bores} args={[undefined, undefined, count]} frustumCulled={false}>
        <cylinderGeometry args={[0.035, 0.035, 1, 6]} />
        <meshStandardMaterial roughness={0.5} metalness={0.4} />
      </instancedMesh>
      <instancedMesh ref={heads} args={[undefined, undefined, count]} frustumCulled={false}>
        <cylinderGeometry args={[0.09, 0.15, 0.4, 8]} />
        <meshStandardMaterial roughness={0.45} metalness={0.5} />
      </instancedMesh>
    </group>
  );
}
