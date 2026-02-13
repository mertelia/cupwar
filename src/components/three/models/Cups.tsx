"use client";

import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import "../shaders/CupMaterial";

export default function Cups() {
  const { nodes } = useGLTF("/three/models/stand.glb");

  const mesh = nodes.Cup4 as THREE.Mesh;
  const original = mesh.material as THREE.MeshStandardMaterial;

  return (
    <>
      <mesh
        geometry={mesh.geometry}
        castShadow
        receiveShadow
        scale={1.2}
        position={[0, 0.96, 0]}
      >
        {/* @ts-ignore */}
        <cupMaterial args={[original.map || null]} />
      </mesh>
      <mesh
        geometry={mesh.geometry}
        castShadow
        receiveShadow
        scale={1.2}
        position={[-0.12, 0.96, 0]}
      >
        {/* @ts-ignore */}
        <cupMaterial args={[original.map || null]} />
      </mesh>
      <mesh
        geometry={mesh.geometry}
        castShadow
        receiveShadow
        scale={1.2}
        position={[0.12, 0.96, 0]}
      >
        {/* @ts-ignore */}
        <cupMaterial args={[original.map || null]} />
      </mesh>
      <mesh
        geometry={mesh.geometry}
        castShadow
        receiveShadow
        scale={1.2}
        position={[0.06, 1.115, 0]}
      >
        {/* @ts-ignore */}
        <cupMaterial args={[original.map || null]} />
      </mesh>
      <mesh
        geometry={mesh.geometry}
        castShadow
        receiveShadow
        scale={1.2}
        position={[-0.06, 1.115, 0]}
      >
        {/* @ts-ignore */}
        <cupMaterial args={[original.map || null]} />
      </mesh>
      <mesh
        geometry={mesh.geometry}
        castShadow
        receiveShadow
        scale={1.2}
        position={[0, 1.27, 0]}
      >
        {/* @ts-ignore */}
        <cupMaterial args={[original.map || null]} />
      </mesh>
    </>
  );
}
