import LogoSvg from "@/components/ui/svg/LogoSvg";
import { Html } from "@react-three/drei";

export default function Logo() {
  return (
    <Html
      position={[0, 1.81, 0]}
      distanceFactor={1.8}
      zIndexRange={[0, 0]}
      transform
    >
      <div className=" rotate-8 z-0">
        <LogoSvg className="w-30 h-22" />
      </div>
    </Html>
  );
}
