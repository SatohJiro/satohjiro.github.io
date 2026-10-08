"use client";

import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

const STAR_COUNT = 600;

/** The World: rotating low-poly globe, orbit ring, floating landmark rocks, stars. */
export function World({ z = -180 }: { z?: number }) {
  const globe = useRef<THREE.Mesh>(null);
  const wire = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);
  const stars = useRef<THREE.Points>(null);

  const starPositions = useMemo(() => {
    let seed = 33;
    const rand = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };
    const arr = new Float32Array(STAR_COUNT * 3);
    for (let i = 0; i < STAR_COUNT; i++) {
      const r = 60 + rand() * 80;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = Math.abs(r * Math.cos(phi)) * 0.6 - 5;
      arr[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (globe.current) globe.current.rotation.y += delta * 0.12;
    if (wire.current) wire.current.rotation.y += delta * 0.12;
    if (ring.current) ring.current.rotation.z += delta * 0.08;
    if (stars.current) stars.current.rotation.y = t * 0.008;
  });

  return (
    <group position={[0, 0, z]}>
      {/* Globe */}
      <mesh ref={globe} position={[0, 10, 0]}>
        <icosahedronGeometry args={[20, 3]} />
        <meshStandardMaterial color="#2b5fa8" roughness={0.75} flatShading />
      </mesh>
      {/* Wireframe lat/long shell */}
      <mesh ref={wire} position={[0, 10, 0]} scale={1.015}>
        <icosahedronGeometry args={[20, 2]} />
        <meshBasicMaterial color="#7fb2f0" wireframe transparent opacity={0.28} />
      </mesh>
      {/* Orbit ring */}
      <mesh ref={ring} position={[0, 10, 0]} rotation={[Math.PI / 2.4, 0, 0.3]}>
        <torusGeometry args={[30, 0.5, 8, 80]} />
        <meshStandardMaterial color="#ffd98a" emissive="#ffbe5a" emissiveIntensity={0.9} roughness={0.4} />
      </mesh>
      {/* Satellite */}
      <group position={[0, 10, 0]}>
        <group position={[30, 6, 0]}>
          <mesh>
            <boxGeometry args={[2.4, 1.2, 1.2]} />
            <meshStandardMaterial color="#c8cede" roughness={0.4} metalness={0.7} />
          </mesh>
          <mesh position={[0, 0, 2.2]}>
            <boxGeometry args={[4.5, 0.15, 2]} />
            <meshStandardMaterial color="#2b4fc4" emissive="#2b4fc4" emissiveIntensity={0.5} />
          </mesh>
          <mesh position={[0, 0, -2.2]}>
            <boxGeometry args={[4.5, 0.15, 2]} />
            <meshStandardMaterial color="#2b4fc4" emissive="#2b4fc4" emissiveIntensity={0.5} />
          </mesh>
        </group>
      </group>

      {/* Floating landmark rocks */}
      {[
        { p: [-34, 16, -14], s: 1.1, kind: "eiffel" },
        { p: [32, 20, -18], s: 1.0, kind: "pagoda" },
        { p: [6, 26, 16], s: 0.8, kind: "torii" },
      ].map((r, i) => (
        <group key={i} position={r.p as [number, number, number]} scale={r.s}>
          <mesh>
            <dodecahedronGeometry args={[4, 0]} />
            <meshStandardMaterial color="#4a4f63" roughness={1} flatShading />
          </mesh>
          <mesh position={[0, 3.4, 0]}>
            <cylinderGeometry args={[2.6, 2.6, 1, 10]} />
            <meshStandardMaterial color="#5d8f4c" roughness={1} flatShading />
          </mesh>
          {r.kind === "eiffel" && (
            <mesh position={[0, 8.4, 0]}>
              <coneGeometry args={[2, 8, 4]} />
              <meshStandardMaterial color="#8a6f4d" roughness={0.8} flatShading />
            </mesh>
          )}
          {r.kind === "pagoda" && (
            <group position={[0, 6.4, 0]}>
              {[0, 1, 2].map((l) => (
                <group key={l} position={[0, l * 2.4, 0]}>
                  <mesh>
                    <boxGeometry args={[4.4 - l * 1.1, 1.6, 4.4 - l * 1.1]} />
                    <meshStandardMaterial color="#a33f3f" roughness={0.85} flatShading />
                  </mesh>
                  <mesh position={[0, 1.3, 0]}>
                    <coneGeometry args={[3.4 - l * 0.8, 1.4, 4]} />
                    <meshStandardMaterial color="#5a3d24" roughness={1} flatShading />
                  </mesh>
                </group>
              ))}
            </group>
          )}
          {r.kind === "torii" && (
            <group position={[0, 6.8, 0]}>
              <mesh position={[0, 2.4, 0]}>
                <boxGeometry args={[6.4, 0.9, 0.9]} />
                <meshStandardMaterial color="#c0392b" roughness={0.8} />
              </mesh>
              {[[-2.4], [2.4]].map(([x], j) => (
                <mesh key={j} position={[x, 0.6, 0]}>
                  <boxGeometry args={[0.9, 3.6, 0.9]} />
                  <meshStandardMaterial color="#c0392b" roughness={0.8} />
                </mesh>
              ))}
            </group>
          )}
        </group>
      ))}

      {/* Stars fading in */}
      <points ref={stars}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[starPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.9} color="#cfe0ff" transparent opacity={0.85} sizeAttenuation />
      </points>
    </group>
  );
}
