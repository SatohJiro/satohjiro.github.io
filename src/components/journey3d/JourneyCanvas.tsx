"use client";

import React, { Suspense } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { CameraRig, LightingRig } from "./rigs";
import { useJourneyProgress, phaseFromProgress } from "../journey/useJourney";
import { Countryside } from "./worlds/Countryside";
import { Saigon } from "./worlds/Saigon";
import { World } from "./worlds/World";
import { Space } from "./worlds/Space";

function SceneSetup() {
  return (
    <>
      <color attach="background" args={["#ffdfb4"]} />
      <fog attach="fog" args={["#ffdfb4", 70, 260]} />
      <CameraRig />
      <LightingRig />
      <Countryside z={0} />
      <Saigon z={-90} />
      <World z={-180} />
      <Space z={-270} />
    </>
  );
}

const PHASE_NAMES = ["countryside", "saigon", "world", "space"] as const;

/** Syncs body[data-journey-phase] for adaptive text theming. */
function JourneyPhaseSync() {
  const progress = useJourneyProgress();
  React.useEffect(() => {
    const phase = phaseFromProgress(progress);
    document.body.dataset.journeyPhase = String(phase);
    document.body.dataset.journeyName = PHASE_NAMES[phase];
  }, [progress]);
  return null;
}

/** Fixed full-viewport 3D journey: countryside -> Saigon -> world -> space. */
export function JourneyCanvas() {
  return (
    <>
    <JourneyPhaseSync />
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <Canvas
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        camera={{ fov: 55, near: 0.5, far: 900, position: [0, 10, 42] }}
        shadows
        onCreated={({ gl }) => {
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.05;
        }}
      >
        <Suspense fallback={null}>
          <SceneSetup />
        </Suspense>
      </Canvas>
    </div>
    </>
  );
}
