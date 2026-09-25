"use client";

import * as THREE from "three";
import { BLOCK, HUB, MANIFOLDS } from "./field-layout";

const steel = { color: "#8f9bab", roughness: 0.45, metalness: 0.55 } as const;
const dark = { color: "#2a3850", roughness: 0.7, metalness: 0.2 } as const;

/** Ground plate, gathering manifolds and the processing hub (separator, tanks). */
export function SurfaceFacilities() {
  return (
    <group>
      {/* surface plate + faint survey grid */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.001, 0]}>
        <planeGeometry args={[BLOCK.width, BLOCK.depth]} />
        <meshStandardMaterial color="#101a2b" roughness={1} />
      </mesh>
      <gridHelper
        args={[BLOCK.width, 16, "#243249", "#1a263a"]}
        position={[0, 0.004, 0]}
        scale={[1, 1, BLOCK.depth / BLOCK.width]}
      />

      {/* gathering manifolds */}
      {MANIFOLDS.map((m, i) => (
        <mesh key={i} position={[m.x, 0.08, m.z]}>
          <boxGeometry args={[0.36, 0.16, 0.24]} />
          <meshStandardMaterial {...dark} />
        </mesh>
      ))}

      {/* processing hub */}
      <group position={[HUB.x, 0, HUB.z]}>
        <mesh position={[0, 0.04, 0]}>
          <boxGeometry args={[2.3, 0.08, 1.7]} />
          <meshStandardMaterial {...dark} />
        </mesh>
        {/* separator (horizontal vessel) */}
        <mesh position={[0.2, 0.34, -0.35]} rotation-z={Math.PI / 2}>
          <capsuleGeometry args={[0.22, 0.9, 6, 16]} />
          <meshStandardMaterial {...steel} />
        </mesh>
        {/* storage tanks */}
        {[-0.65, -0.05, 0.55].map((x, i) => (
          <mesh key={i} position={[x, 0.3, 0.45]}>
            <cylinderGeometry args={[0.24, 0.24, 0.5, 20]} />
            <meshStandardMaterial {...steel} color="#a3aebc" />
          </mesh>
        ))}
        {/* treatment unit */}
        <mesh position={[-0.75, 0.28, -0.35]}>
          <boxGeometry args={[0.5, 0.45, 0.5]} />
          <meshStandardMaterial {...dark} color="#34445f" />
        </mesh>
      </group>
    </group>
  );
}

export const hubPosition = new THREE.Vector3(HUB.x, 0.8, HUB.z);
