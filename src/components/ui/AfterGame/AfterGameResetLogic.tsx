import { useEffect, useRef } from "react";
import { useCupStore } from "@/store/store";

export default function AfterGameResetLogic() {
  const sceneState = useCupStore((s) => s.sceneState);
  const setSceneState = useCupStore((s) => s.setSceneState);

  const triggerResetBalls = useCupStore((s) => s.triggerResetBalls);

  const canReset = useRef(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (sceneState === "afterGame") {
      canReset.current = false;
      timeout = setTimeout(() => {
        canReset.current = true;
      }, 1500);
    }
    return () => clearTimeout(timeout);
  }, [sceneState]);

  useEffect(() => {
    const handleReset = () => {
      if (sceneState !== "afterGame" || !canReset.current) return;

      triggerResetBalls();
      setSceneState("idle");
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        handleReset();
      }
    };

    window.addEventListener("click", handleReset);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("click", handleReset);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [sceneState, triggerResetBalls, setSceneState]);

  return null;
}
