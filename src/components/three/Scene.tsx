"use client";

import { Canvas } from "@react-three/fiber";
import Model from "./models/Model";
import Lights from "./models/Lights";
import Floor from "./models/Floor";
import Background from "./models/Background";
import Logo from "./models/Logo";
import Nav from "../ui/Nav";
import SceneStateHelper from "./helpers/SceneStateHelper";
import Game from "./models/gameParts/Game";
import { OrbitControls } from "@react-three/drei";
import Aftergame from "../ui/AfterGame";

export default function Scene() {
  return (
    <div className="fixed inset-0 w-screen h-dvh overflow-hidden touch-none select-none overscroll-none ">
      <Canvas camera={{ position: [0, 1.1, 3.5], fov: 45 }}>
        <color attach={"background"} args={["white"]} />
        {/* <OrbitControls /> */}
        <Model />
        <Lights />
        <Floor />
        <Background />
        <Logo />
        <SceneStateHelper />
        <Game />
      </Canvas>
      <Nav />
      <Aftergame />
    </div>
  );
}
