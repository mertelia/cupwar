import { useEffect, useState } from "react";
import CupSvg from "./CupSvg";
import Timer from "./Timer";
import { AnimatePresence, motion } from "motion/react";
import { useCupStore } from "@/store/store";

export default function Stats() {
  const points = useCupStore((s) => s.points);
  return (
    <div className=" w-32 h-12 bg-white rounded-full flex items-center  shadow-[inset_0_-2px_4px_0_#278fff68] overflow-hidden">
      <div className="flex justify-center items-center -translate-x-1.5">
        <Timer />
      </div>

      <div className="h-4 w-0.75 rounded-full bg-[#f4f4f4] shrink-0 -translate-x-2" />

      <div className="flex justify-center items-center gap-0.5">
        <div className="flex scale-150 ">
          <CupSvg />
        </div>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            className="font-diatype text-lg font-bold text-dark leading-none"
            key={points}
            initial={{ y: -15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 15, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.65, 0, 0.35, 1] }}
          >
            {points}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
