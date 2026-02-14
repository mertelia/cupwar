import { RigidBody, CuboidCollider } from "@react-three/rapier";

export default function PhysicsBorder() {
  const centerY = 1;
  const size = 1;
  const height = 1;

  return (
    <>
      <RigidBody type="fixed">
        <CuboidCollider args={[0.58, 0.04, 0.2]} position={[0, 0.9, 0.1]} />
      </RigidBody>

      <RigidBody type="fixed">
        <CuboidCollider
          args={[0.05, height, size]}
          position={[-size, centerY, 0]}
        />
      </RigidBody>

      <RigidBody type="fixed">
        <CuboidCollider
          args={[0.05, height, size]}
          position={[size, centerY, 0]}
        />
      </RigidBody>

      <RigidBody type="fixed">
        <CuboidCollider
          args={[size, height, 0.05]}
          position={[0, centerY, -size]}
        />
      </RigidBody>

      {/* <RigidBody type="fixed">
        <CuboidCollider
          args={[size, height, 0.05]}
          position={[0, centerY, size]}
        />
      </RigidBody> */}
    </>
  );
}
