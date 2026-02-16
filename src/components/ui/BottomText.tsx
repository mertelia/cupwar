import { useCupStore } from "@/store/store";
import { AnimatePresence, motion, Variants } from "motion/react";
import UnderlineLink from "./UnderlineLink";
import { transition } from "three/examples/jsm/tsl/display/TransitionNode.js";

const child: Variants = {
  initial: { y: 50, opacity: 0, filter: "blur(2px)" },
  animate: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      y: { delay: 1, duration: 0.5 },
      filter: { delay: 1, duration: 0.5 },
      opacity: {
        delay: 1.5,
        duration: 1,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "linear",
      },
    },
  },
  exit: {
    y: 20,
    opacity: 0,
    filter: "blur(2px)",
    transition: { duration: 0.3 },
  },
};
export default function BottomText() {
  const sceneState = useCupStore((s) => s.sceneState);

  return (
    <div className="fixed bottom-7 left-1/2 -translate-x-1/2 w-full max-w-[90vw] text-center text-sm md:text-lg text-main font-diatype z-999 select-none">
      <AnimatePresence mode="wait">
        {sceneState === "intro" && (
          <motion.div
            key="intro"
            variants={child}
            initial="initial"
            animate="animate"
            exit="exit"
          ></motion.div>
        )}

        {sceneState === "idle" && (
          <motion.div
            key="idle"
            variants={child}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-col items-center justify-center"
          >
            <span>You can click the cups to start the game</span>
          </motion.div>
        )}

        {sceneState === "game" && (
          <motion.div
            key="game"
            variants={child}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <span className="text-red-500"></span>
          </motion.div>
        )}

        {sceneState === "afterGame" && (
          <motion.div
            key="afterGame"
            variants={child}
            initial="initial"
            animate="animate"
            exit="exit"
          ></motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
