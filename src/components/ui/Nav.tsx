import { useCupStore } from "@/store/store";
import Stats from "./stats/Stats";
import LogoSvg from "./svg/LogoSvg";
import { AnimatePresence, motion } from "motion/react";

export default function Nav() {
  const sceneState = useCupStore((s) => s.sceneState);
  const showStats = sceneState === "game" || sceneState === "afterGame";
  return (
    <div className="fixed top-8 w-[95%] left-1/2 -translate-x-1/2 flex items-center z-999">
      <div className="w-30 h-22 z-50">
        {/* <LogoSvg className="w-30 h-22 " /> */}
      </div>
      <AnimatePresence>
        {showStats && (
          <motion.div
            initial={{ y: -10, filter: "blur(3px)", opacity: 0 }}
            animate={{ y: 0, filter: "blur(0px)", opacity: 1 }}
            exit={{
              y: -10,
              filter: "blur(3px)",
              opacity: 0,
            }}
            transition={{ duration: 0.5, type: "spring" }}
            className="absolute left-1/2 -translate-x-1/2"
          >
            <Stats />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
