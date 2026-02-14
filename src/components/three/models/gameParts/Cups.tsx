import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import "../../shaders/CupMaterial";
import { useCupStore } from "@/store/store";
import { RigidBody } from "@react-three/rapier";

export default function Cups() {
  const { nodes } = useGLTF("/three/models/stand.glb");

  const mesh = nodes.Cup4 as THREE.Mesh;
  const original = mesh.material as THREE.MeshStandardMaterial;

  // States
  const sceneState = useCupStore((s) => s.sceneState);
  const setSceneState = useCupStore((s) => s.setSceneState);

  const cupPositions: [number, number, number][] = [
    [0, 0.96, 0],
    [-0.12, 0.96, 0],
    [0.12, 0.96, 0],
    [0.06, 1.115, 0],
    [-0.06, 1.115, 0],
    [0, 1.27, 0],
  ];
  return (
    <>
      {sceneState === "idle" && (
        <mesh
          position={[0, 1.17, 0]}
          scale={[0.4, 0.45, 0.2]}
          onClick={() => setSceneState("game")}
          onPointerEnter={() => {
            document.body.style.cursor = "pointer";
          }}
          onPointerLeave={() => {
            document.body.style.cursor = "auto";
          }}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color={"red"} wireframe />
        </mesh>
      )}
      {cupPositions.map((pos, i) => (
        <RigidBody key={i} colliders="cuboid">
          <mesh
            geometry={mesh.geometry}
            castShadow
            receiveShadow
            scale={1.2}
            position={pos}
          >
            {/* @ts-ignore */}
            <cupMaterial args={[original.map || null]} />
          </mesh>
        </RigidBody>
      ))}
    </>
  );
}
