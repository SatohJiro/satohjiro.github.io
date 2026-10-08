"use client";

import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

const STAR_COUNT = 2200;
const ASTEROID_COUNT = 46;

/** Deep space: starfield, Earth with atmosphere, Saturn, drifting asteroids. */
export function Space({ z = -270 }: { z?: number }) {
  const stars = useRef<THREE.Points>(null);
  const earth = useRef<THREE.Mesh>(null);
  const saturn = useRef<THREE.Group>(null);
  const asteroids = useRef<THREE.InstancedMesh>(null);
  const rocket = useRef<THREE.Group>(null);

  const starData = useMemo(() => {
    let seed = 99;
    const rand = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };
    const pos = new Float32Array(STAR_COUNT * 3);
    const col = new Float32Array(STAR_COUNT * 3);
    const palette: [number, number, number][] = [
      [1, 1, 1], [0.8, 0.88, 1], [1, 0.92, 0.78], [0.72, 0.8, 1],
    ];
    for (let i = 0; i < STAR_COUNT; i++) {
      const r = 70 + rand() * 160;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.cos(phi) * 0.75;
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
      const c = palette[Math.floor(rand() * palette.length)];
      const b = 0.55 + rand() * 0.45;
      col[i * 3] = c[0] * b;
      col[i * 3 + 1] = c[1] * b;
      col[i * 3 + 2] = c[2] * b;
    }
    return { pos, col };
  }, []);

  const asteroidData = useMemo(() => {
    let seed = 55;
    const rand = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };
    return Array.from({ length: ASTEROID_COUNT }, () => ({
      x: (rand() - 0.5) * 110,
      y: (rand() - 0.5) * 60 + 8,
      z: (rand() - 0.5) * 90,
      s: 0.5 + rand() * 2.2,
      rx: rand() * Math.PI,
      ry: rand() * Math.PI,
      spin: 0.1 + rand() * 0.5,
    }));
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (stars.current) stars.current.rotation.y = t * 0.006;
    if (earth.current) earth.current.rotation.y += delta * 0.05;
    if (saturn.current) saturn.current.rotation.y += delta * 0.04;
    if (asteroids.current) {
      const m = new THREE.Matrix4();
      const q = new THREE.Quaternion();
      const e = new THREE.Euler();
      asteroidData.forEach((a, i) => {
        e.set(a.rx + t * a.spin * 0.4, a.ry + t * a.spin, 0);
        q.setFromEuler(e);
        m.compose(
          new THREE.Vector3(a.x, a.y + Math.sin(t * 0.5 + i) * 1.2, a.z),
          q,
          new THREE.Vector3(a.s, a.s, a.s)
        );
        asteroids.current!.setMatrixAt(i, m);
      });
      asteroids.current.instanceMatrix.needsUpdate = true;
    }
    // rocket gently bobs as it ascends
    if (rocket.current) {
      rocket.current.position.y = 26 + Math.sin(t * 1.2) * 1.5;
      rocket.current.rotation.z = 0.32 + Math.sin(t * 0.7) * 0.04;
    }
  });

  return (
    <group position={[0, 0, z]}>
      {/* Starfield */}
      <points ref={stars}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[starData.pos, 3]} />
          <bufferAttribute attach="attributes-color" args={[starData.col, 3]} />
        </bufferGeometry>
        <pointsMaterial size={1.1} vertexColors transparent opacity={0.95} sizeAttenuation />
      </points>

      {/* Earth */}
      <group position={[-30, 6, -18]}>
        <mesh ref={earth}>
          <sphereGeometry args={[13, 40, 40]} />
          <meshStandardMaterial color="#2b6cb8" roughness={0.65} />
        </mesh>
        {/* continents hint */}
        <mesh>
          <sphereGeometry args={[13.15, 24, 24]} />
          <meshStandardMaterial color="#3e9a5e" roughness={0.8} transparent opacity={0.85} />
        </mesh>
        {/* atmosphere */}
        <mesh scale={1.14}>
          <sphereGeometry args={[13, 40, 40]} />
          <meshBasicMaterial color="#5aa8ff" transparent opacity={0.16} side={THREE.BackSide} />
        </mesh>
      </group>

      {/* Saturn */}
      <group ref={saturn} position={[34, 18, -34]}>
        <mesh>
          <sphereGeometry args={[7.5, 32, 32]} />
          <meshStandardMaterial color="#d8b878" roughness={0.7} />
        </mesh>
        <mesh rotation={[Math.PI / 2.35, 0, 0]}>
          <torusGeometry args={[12.5, 1.6, 10, 64]} />
          <meshStandardMaterial color="#c8a86b" roughness={0.6} transparent opacity={0.9} />
        </mesh>
        <mesh rotation={[Math.PI / 2.35, 0, 0]}>
          <torusGeometry args={[15.5, 0.8, 8, 64]} />
          <meshStandardMaterial color="#a8884f" roughness={0.7} transparent opacity={0.55} />
        </mesh>
      </group>

      {/* Asteroids */}
      <instancedMesh ref={asteroids} args={[undefined, undefined, ASTEROID_COUNT]}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#5a5f70" roughness={1} flatShading />
      </instancedMesh>

      {/* Ascending rocket */}
      <group ref={rocket} position={[6, 26, 6]}>
        <mesh>
          <cylinderGeometry args={[1.6, 1.6, 7, 12]} />
          <meshStandardMaterial color="#eef0f8" roughness={0.35} metalness={0.25} />
        </mesh>
        <mesh position={[0, 4.6, 0]}>
          <coneGeometry args={[1.6, 2.6, 12]} />
          <meshStandardMaterial color="#ff5ca8" roughness={0.5} flatShading />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.85, 12, 12]} />
          <meshStandardMaterial color="#4d7cfe" emissive="#4d7cfe" emissiveIntensity={1.4} roughness={0.2} />
        </mesh>
        {[0, 1, 2].map((i) => (
          <mesh key={i} position={[Math.cos((i * Math.PI * 2) / 3) * 1.9, -3, Math.sin((i * Math.PI * 2) / 3) * 1.9]} rotation={[0, -(i * Math.PI * 2) / 3, 0]}>
            <boxGeometry args={[0.3, 2.6, 1.4]} />
            <meshStandardMaterial color="#ff5ca8" roughness={0.5} />
          </mesh>
        ))}
        {/* flame */}
        <mesh position={[0, -5.4, 0]}>
          <coneGeometry args={[1.1, 3.4, 10]} />
          <meshBasicMaterial color="#ffb627" transparent opacity={0.92} />
        </mesh>
        <pointLight position={[0, -4, 0]} color="#ff9a3c" intensity={24} distance={30} decay={2} />
      </group>
    </group>
  );
}
