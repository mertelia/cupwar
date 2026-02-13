"use client";

import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import "../shaders/StandMaterial";

export default function Model() {
  const { nodes } = useGLTF("/three/models/stand.glb");

  useFrame((state) => {
    state.camera.lookAt(0, 1.1, -3.5);
  });

  return (
    <>
      <mesh
        geometry={(nodes.Cube002 as THREE.Mesh).geometry}
        position={(nodes.Cube002 as THREE.Mesh).position}
        rotation={(nodes.Cube002 as THREE.Mesh).rotation}
        scale={(nodes.Cube002 as THREE.Mesh).scale}
      >
        {/* @ts-ignore */}
        <standMaterial />
      </mesh>

      <mesh
        geometry={(nodes.Cube001 as THREE.Mesh).geometry}
        position={(nodes.Cube001 as THREE.Mesh).position}
        rotation={(nodes.Cube001 as THREE.Mesh).rotation}
        scale={(nodes.Cube001 as THREE.Mesh).scale}
      >
        {/* @ts-ignore */}
        <standMaterial />
      </mesh>

      <mesh
        geometry={(nodes.Cube003 as THREE.Mesh).geometry}
        position={(nodes.Cube003 as THREE.Mesh).position}
        rotation={(nodes.Cube003 as THREE.Mesh).rotation}
        scale={(nodes.Cube003 as THREE.Mesh).scale}
      >
        {/* @ts-ignore */}
        <standMaterial />
      </mesh>

      <mesh
        geometry={(nodes.Plane001 as THREE.Mesh).geometry}
        position={(nodes.Plane001 as THREE.Mesh).position}
        rotation={(nodes.Plane001 as THREE.Mesh).rotation}
        scale={(nodes.Plane001 as THREE.Mesh).scale}
      >
        {/* @ts-ignore */}
        <standMaterial />
      </mesh>
    </>
  );
}
