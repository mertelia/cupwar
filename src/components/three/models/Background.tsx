import "../shaders/BackgroundMaterial";

export default function Background() {
  return (
    <mesh scale={[50, 5, 1]} position={[0, 2, -4]}>
      <planeGeometry args={[1, 1]} />
      {/* @ts-ignore */}
      <backgroundMaterial />
    </mesh>
  );
}
