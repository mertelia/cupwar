import LogoSvg from "@/components/ui/svg/LogoSvg";
import { Html } from "@react-three/drei";

export default function Logo() {
  return (
    <Html position={[0, 1.98, 0]} distanceFactor={3.5}>
      <div className=" translate-x-[-50%] rotate-8">
        <LogoSvg className="w-30 h-22" />
      </div>
    </Html>
  );
}
