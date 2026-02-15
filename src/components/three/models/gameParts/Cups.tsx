import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import "../../shaders/CupMaterial";
import { useCupStore } from "@/store/store";
import {
  RigidBody,
  RapierRigidBody,
  CylinderCollider,
} from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";

export default function Cups() {
  const { nodes } = useGLTF("/three/models/stand.glb");
  const mesh = nodes.Cup4 as THREE.Mesh;
  const original = mesh.material as THREE.MeshStandardMaterial;

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

  const rigidRefs = useRef<(RapierRigidBody | null)[]>([]);
  const scored = useRef<boolean[]>(new Array(cupPositions.length).fill(false));

  useFrame(() => {
    if (sceneState !== "game") return;

    rigidRefs.current.forEach((body, i) => {
      if (!body) return;

      const currentPos = body.translation();
      const startY = cupPositions[i][1];

      if (!scored.current[i] && currentPos.y < startY - 0.05) {
        scored.current[i] = true;
        useCupStore.getState().addPoint();
      }
    });

    const allScored = scored.current.every((val) => val === true);

    if (allScored) {
      rigidRefs.current.forEach((body, i) => {
        if (!body) return;
        body.setTranslation(
          {
            x: cupPositions[i][0],
            y: cupPositions[i][1],
            z: cupPositions[i][2],
          },
          true,
        );
        body.setLinvel({ x: 0, y: 0, z: 0 }, true);
        body.setAngvel({ x: 0, y: 0, z: 0 }, true);
        body.setRotation({ w: 1, x: 0, y: 0, z: 0 }, true);

        scored.current[i] = false;
      });
    }
  });

  return (
    <>
      {sceneState === "idle" && (
        <mesh
          position={[0, 1.17, 0]}
          scale={[0.4, 0.45, 0.2]}
          onClick={() => setSceneState("game")}
          onPointerEnter={() => (document.body.style.cursor = "pointer")}
          onPointerLeave={() => (document.body.style.cursor = "auto")}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color={"red"} wireframe />
        </mesh>
      )}

      {cupPositions.map((pos, i) => (
        <RigidBody
          key={i}
          position={pos}
          colliders={false}
          ref={(el) => {
            rigidRefs.current[i] = el;
          }}
          mass={0.05}
          linearDamping={0.15}
          angularDamping={0.05}
          restitution={0.3}
          friction={0.2}
        >
          <mesh geometry={mesh.geometry} castShadow receiveShadow scale={1.2}>
            {/* @ts-ignore */}
            <cupMaterial args={[original.map || null]} />
          </mesh>
          <CylinderCollider args={[0.078, 0.052]} position={[0, 0.055, 0]} />
        </RigidBody>
      ))}
    </>
  );
}
