"use client";

import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

function makeWindowTexture(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = 128;
  c.height = 256;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#333b52";
  ctx.fillRect(0, 0, 128, 256);
  let seed = 11;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
  for (let y = 10; y < 246; y += 22) {
    for (let x = 10; x < 118; x += 22) {
      const lit = rand() > 0.55;
      ctx.fillStyle = lit ? "#ffd98a" : "#1c2334";
      ctx.fillRect(x, y, 13, 15);
    }
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

const BUILDING_COUNT = 42;

/** Saigon: instanced towers with lit windows, iconic Bitexco, street lamps. */
export function Saigon({ z = -90 }: { z?: number }) {
  const buildingsRef = useRef<THREE.InstancedMesh>(null);
  const lampGlow = useRef<THREE.Group>(null);

  const texture = useMemo(() => makeWindowTexture(), []);

  const buildings = useMemo(() => {
    let seed = 21;
    const rand = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };
    const list: { x: number; z: number; w: number; d: number; h: number; rot: number }[] = [];
    for (let i = 0; i < BUILDING_COUNT; i++) {
      const side = i % 2 === 0 ? -1 : 1;
      const x = side * (16 + rand() * 44);
      const zz = -38 + rand() * 68;
      // keep the central avenue clear
      if (Math.abs(x) < 14) continue;
      list.push({
        x,
        z: zz,
        w: 5 + rand() * 7,
        d: 5 + rand() * 7,
        h: 9 + rand() * 26,
        rot: (rand() - 0.5) * 0.3,
      });
    }
    return list;
  }, []);

  const lamps = useMemo(() => [-24, -8, 8, 24], []);

  useFrame((state, delta) => {
    if (buildingsRef.current) {
      const m = new THREE.Matrix4();
      const q = new THREE.Quaternion();
      const e = new THREE.Euler();
      buildings.forEach((b, i) => {
        e.set(0, b.rot, 0);
        q.setFromEuler(e);
        m.compose(
          new THREE.Vector3(b.x, b.h / 2, b.z),
          q,
          new THREE.Vector3(b.w, b.h, b.d)
        );
        buildingsRef.current!.setMatrixAt(i, m);
      });
      buildingsRef.current.instanceMatrix.needsUpdate = true;
    }
    // subtle lamp flicker
    if (lampGlow.current) {
      const t = state.clock.elapsedTime;
      lampGlow.current.children.forEach((g, i) => {
        const s = 1 + Math.sin(t * 7 + i * 2.1) * 0.06;
        g.scale.setScalar(s);
      });
    }
  });

  return (
    <group position={[0, 0, z]}>
      {/* Ground: asphalt */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[75, 40]} />
        <meshStandardMaterial color="#2b3040" roughness={0.95} />
      </mesh>

      {/* Central avenue */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
        <planeGeometry args={[16, 130]} />
        <meshStandardMaterial color="#3a4152" roughness={0.9} />
      </mesh>
      {/* Lane dashes */}
      {Array.from({ length: 12 }).map((_, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.08, -58 + i * 10]}>
          <planeGeometry args={[0.5, 4]} />
          <meshStandardMaterial color="#ffd98a" emissive="#ffbe5a" emissiveIntensity={0.5} />
        </mesh>
      ))}

      {/* Buildings */}
      <instancedMesh ref={buildingsRef} args={[undefined, undefined, buildings.length]} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial map={texture} roughness={0.85} />
      </instancedMesh>

      {/* Bitexco Tower — tapered shaft + helipad */}
      <group position={[0, 0, -30]}>
        <mesh position={[0, 22, 0]} castShadow>
          <cylinderGeometry args={[5.5, 8.5, 44, 8]} />
          <meshStandardMaterial color="#46506b" roughness={0.7} flatShading map={texture} />
        </mesh>
        {/* helipad arm */}
        <mesh position={[9, 42, 0]} rotation={[0, 0, 0.08]}>
          <boxGeometry args={[16, 1.2, 7]} />
          <meshStandardMaterial color="#525d7d" roughness={0.7} flatShading />
        </mesh>
        <mesh position={[15.5, 42.8, 0]}>
          <cylinderGeometry args={[3.4, 3.4, 0.5, 16]} />
          <meshStandardMaterial color="#5d688a" roughness={0.6} />
        </mesh>
        {/* beacon */}
        <mesh position={[0, 45.5, 0]}>
          <sphereGeometry args={[0.9, 10, 10]} />
          <meshStandardMaterial color="#ff5c5c" emissive="#ff2a2a" emissiveIntensity={2.2} />
        </mesh>
      </group>

      {/* Street lamps */}
      <group ref={lampGlow}>
        {lamps.map((lx) =>
          [-1, 1].map((s) => (
            <group key={`${lx}-${s}`} position={[s * 9.5, 0, lx]}>
              <mesh position={[0, 4, 0]}>
                <cylinderGeometry args={[0.12, 0.16, 8, 6]} />
                <meshStandardMaterial color="#1e2330" roughness={0.8} />
              </mesh>
              <mesh position={[0, 8.2, 0]}>
                <sphereGeometry args={[0.55, 10, 10]} />
                <meshStandardMaterial color="#ffe2a8" emissive="#ffbe5a" emissiveIntensity={2.5} />
              </mesh>
              <pointLight position={[0, 8, 0]} color="#ffcf7a" intensity={6} distance={18} decay={2} />
            </group>
          ))
        )}
      </group>
    </group>
  );
}
