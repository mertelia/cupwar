import { Physics } from "@react-three/rapier";
import Cups from "./Cups";
import PhysicsBorder from "./PhysicsBorders";
import Balls from "./Balls";
import { useCupStore } from "@/store/store";

export default function Game() {
  const sceneState = useCupStore((s) => s.sceneState);
  return (
    <>
      <Physics>
        {sceneState !== "afterGame" && <Cups />}
        {sceneState !== "afterGame" && <Balls />}
        <PhysicsBorder />
      </Physics>
    </>
  );
}
