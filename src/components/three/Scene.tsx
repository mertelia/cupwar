"use client";

import { Canvas } from "@react-three/fiber";
import Model from "./models/Model";
import Lights from "./models/Lights";
import Floor from "./models/Floor";
import Background from "./models/Background";
import Cups from "./models/Cups";
import Logo from "./models/Logo";
import Nav from "../ui/Nav";
import SceneStateHelper from "./helpers/SceneStateHelper";

export default function Scene() {
  return (
    <div className="fixed inset-0 w-screen h-dvh overflow-hidden touch-none select-none overscroll-none ">
      <Canvas camera={{ position: [0, 1.1, 3.5], fov: 45 }}>
        <color attach={"background"} args={["white"]} />
        <Model />
        <Lights />
        <Floor />
        <Background />
        <Cups />
        <Logo />
        <SceneStateHelper />
      </Canvas>
      <Nav />
    </div>
  );
}
