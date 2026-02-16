"use client";
import Scene from "@/components/three/Scene";
import Aftergame from "@/components/ui/AfterGame";
import BottomText from "@/components/ui/BottomText";
import Intro from "@/components/ui/Intro";
import Nav from "@/components/ui/Nav";

export default function Home() {
  return (
    <div>
      <Scene />
      <Intro />
      <BottomText />
      <Nav />
      <Aftergame />
    </div>
  );
}
