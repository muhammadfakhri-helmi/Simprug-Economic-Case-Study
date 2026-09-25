"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { AdaptiveDpr, PerformanceMonitor } from "@react-three/drei";
import * as THREE from "three";
import { Reservoir } from "./Reservoir";
import { Wells } from "./Wells";
import { SurfaceFacilities } from "./SurfaceFacilities";
import { FlowLines } from "./FlowLines";

export interface FieldSceneProps {
  mode: "hero" | "decision";
  active: boolean; // on screen → render loop runs
  reducedMotion: boolean;
  mobile: boolean;
}

function Rig({ mode, reducedMotion, mobile, particles }: Omit<FieldSceneProps, "active"> & { particles: number }) {
  const group = useRef<THREE.Group>(null);
  const startedAt = useRef<number | null>(null);
  const activeWells = useRef(mode === "decision" && !reducedMotion ? 15 : 30);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    // the B-well sequence starts on the first rendered frame of the decision scene
    if (mode === "decision" && startedAt.current === null) startedAt.current = t;
    if (group.current && !reducedMotion) {
      // slow sway, not a spin: the viewer keeps orientation
      group.current.rotation.y = -0.35 + Math.sin(t * 0.12) * 0.12;
    }
    if (mode === "decision" && !reducedMotion && startedAt.current !== null) {
      const since = t - startedAt.current;
      activeWells.current = 15 + Math.max(0, Math.min(15, Math.floor((since - 1.1) / 0.11)));
    }
  });

  return (
    <group ref={group} rotation-y={-0.35}>
      <Reservoir detail={mobile ? "low" : "high"} />
      <SurfaceFacilities />
      <Wells mode={mode} reducedMotion={reducedMotion} startedAt={startedAt} />
      <FlowLines particles={particles} reducedMotion={reducedMotion} activeWells={activeWells} />
    </group>
  );
}

/** Conceptual field: reservoir → wells → surface network → processing → sales. */
export default function FieldScene({ mode, active, reducedMotion, mobile }: FieldSceneProps) {
  // Fewer particles on phones, and fewer again if the GPU struggles.
  const [particles, setParticles] = useState(mobile ? 90 : 260);
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, mobile ? 1.25 : 1.5]}
      camera={{
        position: mode === "decision" ? (mobile ? [19, 9, 22] : [15, 7.5, 17]) : mobile ? [22, 10, 26] : [21, 8.5, 24],
        fov: 30,
        near: 0.1,
        far: 150,
      }}
      gl={{ antialias: !mobile, powerPreference: "high-performance", alpha: true }}
      onCreated={({ camera }) => camera.lookAt(0, -2.2, 0)}
      aria-hidden
    >
      <hemisphereLight args={["#c8d6e8", "#0a1018", 0.9]} />
      <directionalLight position={[8, 14, 10]} intensity={1.6} color="#fff3e0" />
      <directionalLight position={[-10, 5, -6]} intensity={0.5} color="#5aa8ff" />
      <PerformanceMonitor onDecline={() => setParticles((n) => Math.max(60, Math.round(n * 0.6)))} />
      <AdaptiveDpr />
      <Rig mode={mode} reducedMotion={reducedMotion} mobile={mobile} particles={particles} />
    </Canvas>
  );
}
