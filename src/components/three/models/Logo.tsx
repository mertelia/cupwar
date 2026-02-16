import LogoSvg from "@/components/ui/svg/LogoSvg";
import { Html } from "@react-three/drei";

export default function Logo() {
  return (
    <Html position={[0, 1.81, 0]} distanceFactor={1.8} transform>
      <div
        className="rotate-8"
        style={{
          transformStyle: "preserve-3d",
          WebkitTransformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      >
        <LogoSvg className="w-30 h-22" />
      </div>
    </Html>
  );
}
