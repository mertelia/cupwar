import { useCupStore } from "@/store/store";
import { AnimatePresence, motion } from "motion/react";
export default function Aftergame() {
  const sceneState = useCupStore((s) => s.sceneState);
  return (
    <AnimatePresence>
      {sceneState === "afterGame" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed w-screen h-screen bg-white inset-0 z-50"
        >
          asdasdasdd
        </motion.div>
      )}
    </AnimatePresence>
  );
}
