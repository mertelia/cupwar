import { useCupStore } from "@/store/store";
import { useEffect } from "react";

export default function SceneStateHelper() {
  const sceneState = useCupStore((s) => s.sceneState);
  const setSceneState = useCupStore((s) => s.setSceneState);
  useEffect(() => {
    const handleStart = (e: KeyboardEvent | MouseEvent) => {
      if (
        (e instanceof KeyboardEvent && e.key === "Enter") ||
        (e instanceof MouseEvent && e.button === 0)
      ) {
        setSceneState("idle");
      }
    };

    if (sceneState === "intro") {
      window.addEventListener("keydown", handleStart);
      window.addEventListener("mousedown", handleStart);
    }

    return () => {
      window.removeEventListener("keydown", handleStart);
      window.removeEventListener("mousedown", handleStart);
    };
  }, [sceneState]);
  return null;
}
