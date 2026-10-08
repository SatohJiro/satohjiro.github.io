"use client";

import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

const COUNT = 26;

/** Low-poly countryside: rolling hills, instanced trees, stilt house, rice paddies. */
export function Countryside({ z = 0 }: { z?: number }) {
  const treeRef = useRef<THREE.InstancedMesh>(null);
  const canopyRef = useRef<THREE.InstancedMesh>(null);
  const cloudGroup = useRef<THREE.Group>(null);

  const trees = useMemo(() => {
    let seed = 7;
    const rand = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };
    return Array.from({ length: COUNT }, () => {
      const angle = rand() * Math.PI * 2;
      const radius = 18 + rand() * 42;
      const x = Math.cos(angle) * radius;
      const zz = Math.sin(angle) * radius * 0.7;
      // keep clearing in the middle for the house/path
      const s = 0.7 + rand() * 0.9;
      return { x, z: zz, s, rot: rand() * Math.PI };
    }).filter((t) => Math.abs(t.x) > 10 || Math.abs(t.z) > 12);
  }, []);

  useFrame((state, delta) => {
    // trunks
    if (treeRef.current) {
      const m = new THREE.Matrix4();
      const q = new THREE.Quaternion();
      const e = new THREE.Euler();
      trees.forEach((t, i) => {
        e.set(0, t.rot, 0);
        q.setFromEuler(e);
        m.compose(new THREE.Vector3(t.x, 1.6 * t.s, t.z), q, new THREE.Vector3(t.s, t.s, t.s));
        treeRef.current!.setMatrixAt(i, m);
      });
      treeRef.current.instanceMatrix.needsUpdate = true;
    }
    // canopies
    if (canopyRef.current) {
      const m = new THREE.Matrix4();
      const q = new THREE.Quaternion();
      const e = new THREE.Euler();
      trees.forEach((t, i) => {
        e.set(0, t.rot, 0);
        q.setFromEuler(e);
        m.compose(
          new THREE.Vector3(t.x, (3.4 + 1.4) * t.s, t.z),
          q,
          new THREE.Vector3(t.s, t.s * 0.85, t.s)
        );
        canopyRef.current!.setMatrixAt(i, m);
      });
      canopyRef.current.instanceMatrix.needsUpdate = true;
    }
    // drifting clouds
    if (cloudGroup.current) {
      cloudGroup.current.children.forEach((cloud, i) => {
        cloud.position.x += delta * (0.4 + i * 0.15);
        if (cloud.position.x > 70) cloud.position.x = -70;
      });
    }
  });

  return (
    <group position={[0, 0, z]}>
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <circleGeometry args={[75, 48]} />
        <meshStandardMaterial color="#5d8f4c" roughness={1} />
      </mesh>

      {/* Rolling hills */}
      {[
        { p: [-38, -1.5, -28], s: [22, 7, 16], c: "#4e7d40" },
        { p: [34, -2, -34], s: [26, 8, 18], c: "#548540" },
        { p: [0, -2.5, -52], s: [34, 9, 20], c: "#487539" },
      ].map((h, i) => (
        <mesh key={i} position={h.p as [number, number, number]} scale={h.s as [number, number, number]}>
          <sphereGeometry args={[1, 16, 12]} />
          <meshStandardMaterial color={h.c} roughness={1} flatShading />
        </mesh>
      ))}

      {/* Rice paddy strips */}
      {Array.from({ length: 7 }).map((_, i) => (
        <mesh key={i} position={[-24 + i * 8, 0.06, 14]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[5.5, 26]} />
          <meshStandardMaterial color={i % 2 ? "#6fa055" : "#639751"} roughness={1} />
        </mesh>
      ))}
      {/* Paddy water glints */}
      {Array.from({ length: 7 }).map((_, i) => (
        <mesh key={`w${i}`} position={[-24 + i * 8, 0.09, 14]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.2, 26]} />
          <meshStandardMaterial color="#9fd4e8" roughness={0.2} metalness={0.4} transparent opacity={0.55} />
        </mesh>
      ))}

      {/* Trees: trunks + canopies (instanced) */}
      <instancedMesh ref={treeRef} args={[undefined, undefined, trees.length]} castShadow>
        <cylinderGeometry args={[0.28, 0.42, 3.4, 6]} />
        <meshStandardMaterial color="#6b4a2e" roughness={1} flatShading />
      </instancedMesh>
      <instancedMesh ref={canopyRef} args={[undefined, undefined, trees.length]} castShadow>
        <icosahedronGeometry args={[2.4, 1]} />
        <meshStandardMaterial color="#3f7a37" roughness={1} flatShading />
      </instancedMesh>

      {/* Stilt house */}
      <group position={[14, 0, -6]} rotation={[0, -0.4, 0]}>
        {/* stilts */}
        {[[-3, -2.2], [3, -2.2], [-3, 2.2], [3, 2.2]].map(([x, zz], i) => (
          <mesh key={i} position={[x, 1.4, zz]}>
            <cylinderGeometry args={[0.22, 0.22, 2.8, 6]} />
            <meshStandardMaterial color="#5a3d24" roughness={1} />
          </mesh>
        ))}
        {/* floor + walls */}
        <mesh position={[0, 3.1, 0]}>
          <boxGeometry args={[7.6, 0.4, 5.6]} />
          <meshStandardMaterial color="#8a6238" roughness={1} />
        </mesh>
        <mesh position={[0, 4.6, 0]}>
          <boxGeometry args={[7, 2.6, 5]} />
          <meshStandardMaterial color="#d9b382" roughness={1} />
        </mesh>
        {/* roof */}
        <mesh position={[0, 7.2, 0]} rotation={[0, Math.PI / 4, 0]}>
          <coneGeometry args={[5.6, 3.2, 4]} />
          <meshStandardMaterial color="#7a4a2a" roughness={1} flatShading />
        </mesh>
        {/* door/window glow */}
        <mesh position={[0, 4.4, 2.55]}>
          <planeGeometry args={[1.4, 1.8]} />
          <meshStandardMaterial color="#ffd98a" emissive="#ffb84d" emissiveIntensity={0.7} />
        </mesh>
      </group>

      {/* Clouds */}
      <group ref={cloudGroup}>
        {[
          { p: [-40, 26, -45], s: 1.4 },
          { p: [10, 30, -55], s: 1.9 },
          { p: [48, 24, -35], s: 1.2 },
        ].map((c, i) => (
          <group key={i} position={c.p as [number, number, number]} scale={c.s}>
            {[0, 1, 2].map((j) => (
              <mesh key={j} position={[(j - 1) * 3.2, j % 2, 0]}>
                <sphereGeometry args={[2.6 - j * 0.4, 12, 10]} />
                <meshStandardMaterial color="#ffffff" roughness={1} transparent opacity={0.92} flatShading />
              </mesh>
            ))}
          </group>
        ))}
      </group>
    </group>
  );
}
