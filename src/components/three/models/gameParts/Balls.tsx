import { useCupStore } from "@/store/store";
import { DragControls, useGLTF } from "@react-three/drei";
import { RigidBody, RapierRigidBody } from "@react-three/rapier";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { animate } from "framer-motion";

export default function Balls() {
  const { nodes } = useGLTF("/three/models/stand.glb");

  //  States
  const sceneState = useCupStore((s) => s.sceneState);
  const [currentBall, setCurrentBall] = useState(0);
  const [dragEnabled, setDragEnabled] = useState(false);

  const ballNodes = useMemo(
    () => [nodes.Ball1, nodes.Ball2, nodes.Ball3],
    [nodes],
  );

  const rigidRefs = useRef<(RapierRigidBody | null)[]>([]);
  const isAnimating = useRef(false);

  // Matrix for DragControls interaction
  const matrix = useRef(new THREE.Matrix4().makeTranslation(0, 1, 2.5));
  const startPosition = new THREE.Vector3(0, 1, 2.5);

  const ballPositions = useRef(
    ballNodes.map((mesh) => ({
      x: mesh.position.x,
      y: mesh.position.y,
      z: mesh.position.z,
    })),
  );

  // Scene change
  useEffect(() => {
    if (sceneState !== "game") return;

    // First Appearence
    setCurrentBall(0);
    isAnimating.current = true;
    const duration = 0.7; // Seconds

    const targets = [
      { x: 0, y: 1, z: 2.5 },
      { x: 0.3, y: 1, z: 2.5 },
      { x: 0.5, y: 1, z: 2.5 },
    ];

    rigidRefs.current.forEach((body, i) => {
      if (!body) return;

      animate(ballPositions.current[i], targets[i], {
        duration: duration,
        type: "spring",
        onUpdate: () => {
          body.setNextKinematicTranslation(ballPositions.current[i]);
        },
      });
    });
    setTimeout(() => {
      isAnimating.current = false;
      setDragEnabled(true);
    }, duration * 1000);
  }, [sceneState]);

  // Drag End Handler
  const dragEndHandler = () => {
    if (!dragEnabled) return;
    setDragEnabled(false);
    const body = rigidRefs.current[currentBall];
    if (!body) return;

    // set kinematic to dynamic
    body.setBodyType(0, true);
    body.wakeUp();
    // impulse on ball
    requestAnimationFrame(() => {
      const impulseZ = -10;
      const impulseY = 0.5;

      body.applyImpulse({ x: 0, y: impulseY, z: impulseZ }, true);
      body.setLinvel({ x: 0, y: impulseY, z: impulseZ }, true);
    });

    setTimeout(() => {
      setCurrentBall((prev) => prev + 1);
      setDragEnabled(true);
      matrix.current.makeTranslation(
        startPosition.x,
        startPosition.y,
        startPosition.z,
      );
    }, 2000);
  };

  useFrame(() => {
    if (!dragEnabled && isAnimating) return;

    const body = rigidRefs.current[currentBall];
    if (!body) return;
    const pos = new THREE.Vector3().setFromMatrixPosition(matrix.current);
    body.setNextKinematicTranslation({
      x: pos.x,
      y: pos.y,
      z: pos.z,
    });
  });

  return (
    <>
      {sceneState === "game" && dragEnabled && (
        <DragControls
          matrix={matrix.current}
          dragLimits={[
            [-0.4, 0.4],
            [-1.8, 1.8],
            [2.5, 2.5],
          ]}
          onDrag={(local) => {
            dragEnabled && matrix.current.copy(local);
          }}
          onDragEnd={dragEndHandler}
        >
          <mesh>
            <sphereGeometry args={[0.2, 8, 8]} />
            <meshBasicMaterial
              color="blue"
              wireframe
              transparent
              opacity={0.3}
            />
          </mesh>
        </DragControls>
      )}
      {ballNodes.map((node, i) => {
        const mesh = node as THREE.Mesh;

        return (
          <RigidBody
            ccd
            key={i}
            type="kinematicPosition"
            colliders="ball"
            ref={(el) => {
              rigidRefs.current[i] = el;
            }}
            position={[mesh.position.x, mesh.position.y, mesh.position.z]}
          >
            <mesh geometry={mesh.geometry} material={mesh.material} />
          </RigidBody>
        );
      })}
    </>
  );
}
