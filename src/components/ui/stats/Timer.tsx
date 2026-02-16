"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useCupStore } from "@/store/store";

export default function Timer() {
  const initialTime = 10;
  const [timeLeft, setTimeLeft] = useState(initialTime);

  const radius = 9;
  const strokeWidth = 2.5;
  const circumference = 2 * Math.PI * radius;

  const setSceneState = useCupStore((s) => s.setSceneState);
  const triggerResetBalls = useCupStore((s) => s.triggerResetBalls);

  useEffect(() => {
    if (timeLeft <= 0) {
      triggerResetBalls();
      setSceneState("afterGame");
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, triggerResetBalls, setSceneState]);

  const timerColorClass =
    timeLeft <= 0
      ? "text-[#CECECE]"
      : timeLeft <= 5
        ? "text-[#FFBB27]"
        : "text-dark";

  return (
    <div className="relative w-16 h-16 flex items-center justify-center">
      <span
        className={`absolute font-diatype font-extrabold text-sm pt-0.5 transition-colors duration-300 ${timerColorClass}`}
      >
        {timeLeft}
      </span>

      <svg className="w-full h-full -rotate-90" viewBox="0 0 40 40">
        <circle
          cx="20"
          cy="20"
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className={`${timerColorClass} opacity-30 transition-colors duration-300`}
        />

        <motion.circle
          cx="20"
          cy="20"
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
          className={`${timerColorClass} transition-colors duration-300`}
          initial={{ strokeDasharray: circumference, strokeDashoffset: 0 }}
          animate={{
            strokeDashoffset: -(
              circumference -
              (timeLeft / initialTime) * circumference
            ),
          }}
          transition={{
            duration: 1,
            ease: "linear",
          }}
        />
      </svg>
    </div>
  );
}
