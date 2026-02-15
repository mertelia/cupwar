import { useCupStore } from "@/store/store";
import { DragControls, useGLTF } from "@react-three/drei";
import { RigidBody, RapierRigidBody } from "@react-three/rapier";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { animate } from "framer-motion";

export default function Balls() {
  const { nodes } = useGLTF("/three/models/stand.glb");

  // States
  const sceneState = useCupStore((s) => s.sceneState);
  const [currentBall, setCurrentBall] = useState(0);
  const [dragEnabled, setDragEnabled] = useState(false);

  const [ballNodes, setBallNodes] = useState([
    nodes.Ball1,
    nodes.Ball2,
    nodes.Ball3,
  ]);

  const rigidRefs = useRef<(RapierRigidBody | null)[]>([]);
  const isAnimating = useRef(false);
  const resetMounted = useRef(false);

  const meshVisual = useMemo(() => {
    return ballNodes.map((_, index) => {
      if (index === currentBall) return { opacity: 1.0, scale: 1 };
      if (index === (currentBall - 2) % ballNodes.length)
        return { opacity: 1.0, scale: 1 };
      if (index === (currentBall - 1) % ballNodes.length)
        return { opacity: 1.0, scale: 1 };
      if (index === (currentBall + 1) % ballNodes.length)
        return { opacity: 0.4, scale: 0.8 };
      if (index === (currentBall + 2) % ballNodes.length)
        return { opacity: 0.0, scale: 0.8 };
      if (index === (currentBall + 3) % ballNodes.length)
        return { opacity: 0.0, scale: 0.8 };
      return { opacity: 0.0, scale: 0.8 };
    });
  }, [currentBall, ballNodes.length]);

  // Matrix for DragControls interaction
  const matrix = useRef(new THREE.Matrix4().makeTranslation(0, 0.93, 2.9));
  const startPosition = new THREE.Vector3(0, 0.93, 2.9);
  const ballStartPosition = new THREE.Vector3(0.4, 0.93, 2.9);

  // Keep an array of simple position objects for animation
  const ballPositions = useRef<{ x: number; y: number; z: number }[]>(
    ballNodes.map((mesh) => ({
      x: (mesh as THREE.Mesh).position.x,
      y: (mesh as THREE.Mesh).position.y,
      z: (mesh as THREE.Mesh).position.z,
    })),
  );

  const targets = [
    { x: 0, y: 0.93, z: 2.9 },
    { x: 0.1, y: 0.93, z: 2.9 },
    { x: 0.2, y: 0.93, z: 2.9 },
    { x: 0.3, y: 0.93, z: 2.9 },
  ];

  // Ensure ballPositions stays in sync with ballNodes
  useEffect(() => {
    const newPositions = ballNodes.map((mesh, i) => {
      const existing = ballPositions.current[i];
      if (existing) return existing;
      const pos = (mesh as THREE.Mesh).position;
      return {
        x: pos.x ?? ballStartPosition.x,
        y: pos.y ?? ballStartPosition.y,
        z: pos.z ?? ballStartPosition.z,
      };
    });
    ballPositions.current = newPositions;
  }, [ballNodes]);

  // Scene change - initial appearance
  useEffect(() => {
    if (sceneState !== "game") return;

    setCurrentBall(0);
    isAnimating.current = true;
    const duration = 0.7; // Seconds

    ballPositions.current.forEach((pos, i) => {
      animate(pos, targets[i], { duration, type: "spring" });
    });

    setTimeout(() => {
      isAnimating.current = false;
      setDragEnabled(true);
    }, duration * 1000);
  }, [sceneState]);

  // Reset Function
  const resetBalls = useCupStore((s) => s.resetBalls);
  useEffect(() => {
    if (!resetMounted.current) {
      resetMounted.current = true;
      return;
    }
    // perform full reset of component-local state and refs
    setCurrentBall(0);
    setDragEnabled(false);
    isAnimating.current = false;

    // reset matrix to initial start
    matrix.current.makeTranslation(
      startPosition.x,
      startPosition.y,
      startPosition.z,
    );

    // restore initial ball nodes and positions
    const initialNodes = [nodes.Ball1, nodes.Ball2, nodes.Ball3, nodes.Ball4];
    setBallNodes(initialNodes as any);

    ballPositions.current = initialNodes.map((mesh) => ({
      x: (mesh as THREE.Mesh).position.x ?? ballStartPosition.x,
      y: (mesh as THREE.Mesh).position.y ?? ballStartPosition.y,
      z: (mesh as THREE.Mesh).position.z ?? ballStartPosition.z,
    }));

    // reset rigid body refs if possible (set kinematic translation to start positions)
    rigidRefs.current.forEach((body, i) => {
      const p = ballPositions.current[i];
      if (!body || !p) return;
      body.setNextKinematicTranslation({ x: p.x, y: p.y, z: p.z });
      body.wakeUp();
    });
  }, [resetBalls]);

  // Drag End Handler
  const dragEndHandler = () => {
    if (!dragEnabled) return;
    setDragEnabled(false);
    const body = rigidRefs.current[currentBall];
    if (!body) return;
    body.setBodyType(0, true);
    body.wakeUp();

    requestAnimationFrame(() => {
      const translation = body.translation();

      const randomX = (Math.random() - 0.5) * 0.3;
      const randomY = Math.random() * 0.3;
      const randomZ = (Math.random() - 0.5) * 0.3;

      const baseZ = -13;
      const baseY = 2;

      const impulse = {
        x: randomX,
        y: baseY + randomY,
        z: baseZ + randomZ,
      };

      body.applyImpulse(impulse, true);
      body.setLinvel(impulse, true);
    });

    // mark that sliding/position animations are running so useFrame updates kinematics
    isAnimating.current = true;

    // compute indices for the next sliding animations
    const idx1 = currentBall + 1;
    const idx2 = currentBall + 2;
    const idx3 = currentBall + 3;
    const idx4 = currentBall + 4;

    // increment current ball (now the next ball will be controlled)
    setCurrentBall((prev) => prev + 1);

    // create a new ball mesh (same geometry/material as first ball)
    const mesh = ballNodes[0] as THREE.Mesh;
    const newBall = new THREE.Mesh(
      mesh.geometry.clone(),
      (mesh.material as THREE.Material).clone(),
    );

    // add placeholder position for the new ball at startPosition
    ballPositions.current.push({
      x: ballStartPosition.x,
      y: ballStartPosition.y,
      z: ballStartPosition.z,
    });
    setBallNodes((prev) => [...prev, newBall]);

    // Animate positions of the upcoming balls to slide into targets
    if (ballPositions.current[idx1])
      animate(ballPositions.current[idx1], targets[0], {
        duration: 0.7,
        type: "spring",
      });
    if (ballPositions.current[idx2])
      animate(ballPositions.current[idx2], targets[1], {
        duration: 0.7,
        type: "spring",
      });
    if (ballPositions.current[idx3])
      animate(ballPositions.current[idx3], targets[2], {
        duration: 0.7,
        type: "spring",
      });
    if (ballPositions.current[idx4])
      animate(ballPositions.current[idx4], targets[3], {
        duration: 0.7,
        type: "spring",
      });

    // re-enable dragging after a short delay
    setTimeout(() => {
      // stop animation flag and re-enable dragging
      isAnimating.current = false;
      setDragEnabled(true);
      // reset matrix to start
      matrix.current.makeTranslation(
        startPosition.x,
        startPosition.y,
        startPosition.z,
      );
    }, 700);
  };

  // Apply animated positions to kinematic rigid bodies each frame
  useFrame(() => {
    if (!dragEnabled && !isAnimating.current) return;

    rigidRefs.current.forEach((body, i) => {
      if (!body) return;
      if (i < currentBall) return; // already thrown / dynamic
      const p = ballPositions.current[i];
      if (!p) return;
      body.setNextKinematicTranslation({ x: p.x, y: p.y, z: p.z });
    });

    // Keep the actively dragged ball following the DragControls matrix
    if (dragEnabled) {
      const pos = new THREE.Vector3().setFromMatrixPosition(matrix.current);
      const activeBody = rigidRefs.current[currentBall];
      if (activeBody)
        activeBody.setNextKinematicTranslation({
          x: pos.x,
          y: pos.y,
          z: pos.z,
        });
    }
  });

  return (
    <>
      {sceneState === "game" && dragEnabled && (
        <DragControls
          matrix={matrix.current}
          dragLimits={[
            [-0.4, 0.4],
            [-1.8, 1.8],
            [2.9, 2.9],
          ]}
          onDrag={(local) => {
            dragEnabled && matrix.current.copy(local);
          }}
          onDragEnd={dragEndHandler}
        >
          <mesh scale={0.5}>
            <sphereGeometry args={[0.1, 4, 4]} />
            <meshBasicMaterial color="blue" wireframe />
          </mesh>
        </DragControls>
      )}
      {ballNodes.map((node, i) => {
        const mesh = node as THREE.Mesh;
        const meshdata = meshVisual[i];
        console.log(meshdata);

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
            <mesh
              geometry={mesh.geometry}
              scale={sceneState === "game" ? meshdata.scale : 1}
            >
              <meshBasicMaterial
                color={"white"}
                transparent
                opacity={sceneState === "game" ? meshdata.opacity : 1}
              />
            </mesh>
          </RigidBody>
        );
      })}
    </>
  );
}
