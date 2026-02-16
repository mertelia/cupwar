import {
  AnimatePresence,
  motion,
  useTransform,
  useMotionValue,
  Variants,
} from "motion/react";
import CupSvg from "../stats/CupSvg";
import { useCupStore } from "@/store/store";

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.01,
    },
  },
  exit: { transition: { duration: 0.2 } },
};

const child: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 13,
      mass: 1,
    },
  },
  exit: { opacity: 0, transition: { duration: 0.1 } },
};
export default function AfterUI({
  highScore,
}: {
  highScore: { nick: string; score: number };
}) {
  const points = useCupStore((s) => s.points);
  return (
    <motion.div
      key="noHighScore"
      variants={container}
      initial="hidden"
      animate="show"
      exit="exit"
      className="flex flex-col justify-center items-center text-main font-diatype gap-3 tracking-tight px-4"
    >
      <motion.div
        variants={child}
        className="text-lg md:text-2xl text-main font-diatype font-bold text-center tracking-tight leading-tight"
      >
        {points >= highScore.score - 5 ? (
          <span>{"You’re almost there :)"}</span>
        ) : points === 0 ? (
          <span>I think this game isn't for you.</span>
        ) : (
          <>
            Really bro? Only
            <CupSvg className="inline-block align-middle w-8 h-8 md:w-12 md:h-12 -ml-1 -mr-2" />
            <span className="text-dark">{points}</span> cups?
          </>
        )}
        <br />
        <span className="block">
          The World Record stands at{" "}
          <span className="text-dark">
            {highScore.score} <span className="text-main">from</span>{" "}
            {highScore.nick}
          </span>{" "}
          — try again?
        </span>
      </motion.div>

      <motion.div
        variants={child}
        className="flex gap-1 justify-center items-center"
      >
        <motion.div
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{
            ease: "linear",
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 0.2,
            duration: 1.5,
          }}
          className="text-main/60 text-sm md:text-[18px] font-bold font-diatype"
        >
          Click anywhere to try again
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
