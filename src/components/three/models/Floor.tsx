"use client";
import "../shaders/FloorMaterial";
export default function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} scale={[14, 8.5, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      {/* @ts-ignore */}
      <floorMaterial />
    </mesh>
  );
}
