import * as THREE from "three";
import { Html, useGLTF } from "@react-three/drei";
import "../../shaders/CupMaterial";
import { useCupStore } from "@/store/store";
import {
  RigidBody,
  RapierRigidBody,
  CylinderCollider,
} from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import TextBubbleSvg from "@/components/ui/svg/TextBubbleSvg";
import { AnimatePresence } from "motion/react";

export default function Cups() {
  const { nodes } = useGLTF("/three/models/stand.glb");
  const mesh = nodes.Cup4 as THREE.Mesh;
  const original = mesh.material as THREE.MeshStandardMaterial;

  const sceneState = useCupStore((s) => s.sceneState);
  const setSceneState = useCupStore((s) => s.setSceneState);
  const resetPoints = useCupStore((s) => s.resetPoints);

  const cupPositions: [number, number, number][] = [
    [0, 0.96, -0.08],
    [-0.12, 0.96, -0.08],
    [0.12, 0.96, -0.08],
    [0.06, 1.115, -0.08],
    [-0.06, 1.115, -0.08],
    [0, 1.27, -0.08],
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
  const [hovered, setHovered] = useState(false);
  const onClickHandler = () => {
    setSceneState("game");
    resetPoints();
  };

  return (
    <>
      {sceneState === "idle" && (
        <mesh
          position={[0, 1.17, 0]}
          scale={[0.4, 0.45, 0.2]}
          onClick={onClickHandler}
          onPointerEnter={() => {
            ((document.body.style.cursor = "pointer"), setHovered(true));
          }}
          onPointerLeave={() => {
            ((document.body.style.cursor = "auto"), setHovered(false));
          }}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color={"red"} wireframe visible={false} />

          <Html position={[0.1, 0.85, 0]}>
            <AnimatePresence>
              {hovered && (
                <TextBubbleSvg text="Start" bubbleClassName="-rotate-3" />
              )}
            </AnimatePresence>
          </Html>
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
          mass={0.001}
          linearDamping={0.03}
          angularDamping={0.02}
          restitution={0.1}
          friction={0.1}
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
