"use client";
import { AnimatePresence, motion, Variants } from "framer-motion";
import LogoSvg from "./svg/LogoSvg";
import { useCupStore } from "@/store/store";
import UnderlineLink from "./UnderlineLink";

const container = {
  hidden: {},
  show: {
    opacity: 1,
    backgroundPosition: ["0 0", "-200px 200px"],
    transition: {
      staggerChildren: 0.05,
      duration: 10,
      repeat: Infinity,
      ease: "linear" as any,
    },
  },
  exit: { opacity: 0, transition: { duration: 0.5 } },
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
  exit: { opacity: 0, transition: { duration: 1 } },
};
export default function Intro() {
  const sceneState = useCupStore((s) => s.sceneState);

  return (
    <AnimatePresence>
      {sceneState === "intro" && (
        <>
          <motion.div
            className="fixed w-screen h-screen inset-0 bg-white z-0"
            exit={{ opacity: 0, transition: { delay: 1, duration: 1 } }}
          />
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            exit="exit"
            style={{
              background: `conic-gradient(
      #EAF4FF 90deg,
      #ffffff 90deg 180deg,
      #EAF4FF 180deg 270deg,
      #ffffff 270deg
    )`,
              backgroundRepeat: "repeat",
              backgroundSize: "var(--bg-size)",
              backgroundPosition: "top left",
            }}
            className="fixed inset-0 w-screen h-screen flex flex-col justify-center items-center z-10 select-none px-6 [--bg-size:150px_150px] md:[--bg-size:200px_200px]"
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(ellipse at center, transparent 0.5%, white 60%)",
                pointerEvents: "none",
              }}
            />
            <motion.div
              variants={child}
              className="z-10 shrink-0 m-0 relative flex items-center justify-center"
              style={{
                WebkitTransform: "translate3d(0,0,0)",
                transform: "translate3d(0,0,0)",
                width: "160px",
                height: "160px",
              }}
            >
              <LogoSvg className="w-full h-full object-contain" />
            </motion.div>

            <div className="flex flex-col justify-center items-center gap-3 z-10">
              <motion.div
                variants={child}
                className="text-main font-diatype font-bold text-2xl text-center tracking-tight leading-tight"
              >
                <div className="mb-1">
                  This mini-game was created using Spline and R3F
                  <span className="inline-block ml-1">
                    by{" "}
                    <UnderlineLink
                      isBubbleText
                      bubbleText="View"
                      text="Sed"
                      href="https://x.com/notdesigner"
                      className="hover:text-dark transition-colors duration-150"
                    />{" "}
                    and{" "}
                    <UnderlineLink
                      isBubbleText
                      bubbleText="View"
                      text="Mert"
                      href="https://x.com/notdesigner"
                      className="hover:text-dark transition-colors duration-150"
                    />
                  </span>
                </div>

                <div className="block">We created it to test our skills</div>
              </motion.div>

              <motion.div variants={child}>
                <motion.div
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{
                    ease: "linear",
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 2,
                  }}
                  className="text-main/60 text-[18px] font-bold font-diatype pb-16"
                >
                  Click anywhere to proceed.
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
