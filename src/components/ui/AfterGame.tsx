"use client";
import { useCupStore } from "@/store/store";
import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";
import GameEnd from "./AfterGame/GameEnd";
export default function Aftergame() {
  const sceneState = useCupStore((s) => s.sceneState);

  return (
    <>
      <AnimatePresence mode="wait">
        {sceneState === "afterGame" && (
          <motion.div
            key="after-ui-container"
            initial={{
              backdropFilter: "blur(0px)",
              opacity: 0,
              pointerEvents: "none",
            }}
            animate={{
              opacity: 1,
              backdropFilter: "blur(40px)",
              transition: { duration: 1 },
              pointerEvents: "auto",
            }}
            exit={{
              opacity: 0,
              backdropFilter: "blur(0px)",
              transition: { duration: 1 },
              pointerEvents: "none",
            }}
            className="fixed inset-0 flex justify-center items-center pointer-events-auto select-none"
          >
            <GameEnd />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
