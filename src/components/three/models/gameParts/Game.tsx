import { Physics } from "@react-three/rapier";
import Cups from "./Cups";
import PhysicsBorder from "./PhysicsBorders";
import Balls from "./Balls";

export default function Game() {
  return (
    <>
      <Physics debug>
        <Cups />
        <PhysicsBorder />
        <Balls />
      </Physics>
    </>
  );
}
