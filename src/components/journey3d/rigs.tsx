"use client";

import React, { useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useJourneyProgress } from "../journey/useJourney";

/** Scroll-driven camera flying through the four worlds. */
export function CameraRig() {
  const progress = useJourneyProgress();
  const { camera, scene } = useThree();
  const lookTarget = useRef(new THREE.Vector3());
  const reduced = useRef(false);

  React.useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const p = reduced.current ? 0 : progress;

    const camZ = 42 - p * 270;
    const camY = 10 + p * 4 + Math.sin(t * 0.5) * 0.35;
    const camX = Math.sin(t * 0.22) * 2.2;

    camera.position.set(camX, camY, camZ);
    lookTarget.current.set(camX * 0.4, 5 + p * 4, camZ - 65);
    camera.lookAt(lookTarget.current);

    // Keep shadow-casting light aimed at what the camera sees
    const sun = scene.getObjectByProperty("type", "DirectionalLight") as THREE.DirectionalLight | undefined;
    if (sun) {
      sun.target.position.copy(lookTarget.current);
      sun.target.updateMatrixWorld();
    }
  });

  return null;
}

type LightPhase = {
  p: number;
  sun: string;
  sunI: number;
  sunPos: [number, number, number];
  sky: string;
  amb: number;
  fogNear: number;
  fogFar: number;
};

const PHASES: LightPhase[] = [
  { p: 0.0, sun: "#ffd9a0", sunI: 2.4, sunPos: [45, 38, 10], sky: "#ffdfb4", amb: 0.55, fogNear: 70, fogFar: 260 },
  { p: 0.3, sun: "#fff3de", sunI: 2.8, sunPos: [30, 55, -40], sky: "#b7ddf0", amb: 0.7, fogNear: 70, fogFar: 260 },
  { p: 0.55, sun: "#ff9a5c", sunI: 2.1, sunPos: [-35, 20, -90], sky: "#dd8a63", amb: 0.42, fogNear: 55, fogFar: 220 },
  { p: 0.75, sun: "#7a8ac8", sunI: 0.9, sunPos: [10, 50, -160], sky: "#141c38", amb: 0.3, fogNear: 45, fogFar: 200 },
  { p: 1.0, sun: "#93a3d8", sunI: 0.55, sunPos: [0, 60, -240], sky: "#040409", amb: 0.16, fogNear: 90, fogFar: 500 },
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

const _c1 = new THREE.Color();
const _c2 = new THREE.Color();

/** Interpolates sun/sky/ambient/fog across the journey. */
export function LightingRig() {
  const progress = useJourneyProgress();
  const { scene } = useThree();
  const sun = useRef<THREE.DirectionalLight>(null);
  const amb = useRef<THREE.AmbientLight>(null);
  const hemi = useRef<THREE.HemisphereLight>(null);

  useFrame(() => {
    const p = progress;
    let i = 0;
    while (i < PHASES.length - 2 && p > PHASES[i + 1].p) i++;
    const a = PHASES[i];
    const b = PHASES[i + 1];
    const t = Math.min(1, Math.max(0, (p - a.p) / (b.p - a.p)));

    _c1.set(a.sky);
    _c2.set(b.sky);
    _c1.lerp(_c2, t);
    (scene.background as THREE.Color).copy(_c1);
    if (scene.fog instanceof THREE.Fog) {
      scene.fog.color.copy(_c1);
      scene.fog.near = lerp(a.fogNear, b.fogNear, t);
      scene.fog.far = lerp(a.fogFar, b.fogFar, t);
    }

    if (sun.current) {
      _c1.set(a.sun);
      _c2.set(b.sun);
      sun.current.color.copy(_c1.lerp(_c2, t));
      sun.current.intensity = lerp(a.sunI, b.sunI, t);
      sun.current.position.set(
        lerp(a.sunPos[0], b.sunPos[0], t),
        lerp(a.sunPos[1], b.sunPos[1], t),
        lerp(a.sunPos[2], b.sunPos[2], t)
      );
    }
    if (amb.current) amb.current.intensity = lerp(a.amb, b.amb, t);
    if (hemi.current) {
      hemi.current.intensity = lerp(a.amb, b.amb, t) * 0.7;
      _c1.set(a.sky);
      _c2.set(b.sky);
      hemi.current.color.copy(_c1.lerp(_c2, t));
    }
  });

  return (
    <>
      <directionalLight
        ref={sun}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-60}
        shadow-camera-right={60}
        shadow-camera-top={60}
        shadow-camera-bottom={-60}
      />
      <ambientLight ref={amb} intensity={0.55} />
      <hemisphereLight ref={hemi} args={["#ffdfb4", "#3a4a35", 0.4]} />
    </>
  );
}
