import { Environment, useHelper } from "@react-three/drei";
import { useRef } from "react";
import { HemisphereLightHelper } from "three";

export default function Lights() {
  const lightRef = useRef(null!);
  useHelper(lightRef, HemisphereLightHelper, 0.5);

  return (
    <>
      <ambientLight intensity={3} />
      {/* <rectAreaLight position={[0, 0, -2]} intensity={2} lookAt={[0, 2, 0]} /> */}
    </>
  );
}
