"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { BLOCK, LAYERS, reservoirTop } from "./field-layout";

/** Cut-away subsurface block: overburden, domed reservoir, basement. */
export function Reservoir({ detail = "high" }: { detail?: "high" | "low" }) {
  const seg = detail === "high" ? 48 : 24;

  const reservoirGeo = useMemo(() => {
    const h = LAYERS.reservoirBase;
    const g = new THREE.BoxGeometry(BLOCK.width, 1, BLOCK.depth, seg, 1, Math.round(seg / 2));
    const pos = g.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      // top vertices follow the dome, bottom vertices sit on the reservoir base
      pos.setY(i, pos.getY(i) > 0 ? reservoirTop(x, z) : h);
    }
    g.computeVertexNormals();
    return g;
  }, [seg]);

  const overburdenH = -LAYERS.overburdenBottom;
  const baseH = LAYERS.reservoirBase - LAYERS.floor;

  return (
    <group>
      {/* overburden: translucent so the wellbores read through it */}
      <mesh position={[0, -overburdenH / 2, 0]}>
        <boxGeometry args={[BLOCK.width, overburdenH, BLOCK.depth]} />
        <meshStandardMaterial color="#1b2638" roughness={0.95} transparent opacity={0.5} depthWrite={false} />
      </mesh>
      <lineSegments position={[0, -overburdenH / 2, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(BLOCK.width, overburdenH, BLOCK.depth)]} />
        <lineBasicMaterial color="#3a4a63" transparent opacity={0.6} />
      </lineSegments>

      {/* reservoir: the economic starting point */}
      <mesh geometry={reservoirGeo}>
        <meshStandardMaterial color="#b7925e" roughness={0.7} metalness={0.05} emissive="#3d2a12" emissiveIntensity={0.35} />
      </mesh>

      {/* basement */}
      <mesh position={[0, LAYERS.reservoirBase - baseH / 2, 0]}>
        <boxGeometry args={[BLOCK.width, baseH, BLOCK.depth]} />
        <meshStandardMaterial color="#121b29" roughness={1} />
      </mesh>
      <lineSegments position={[0, LAYERS.reservoirBase - baseH / 2, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(BLOCK.width, baseH, BLOCK.depth)]} />
        <lineBasicMaterial color="#2b3a52" transparent opacity={0.7} />
      </lineSegments>
    </group>
  );
}
