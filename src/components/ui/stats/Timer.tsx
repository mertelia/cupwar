"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Timer() {
  const initialTime = 30;
  const [timeLeft, setTimeLeft] = useState(initialTime);

  const radius = 9;
  const strokeWidth = 2.5;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <div className="relative w-16 h-16 flex items-center justify-center">
      <span className="absolute text-dark/50  font-diatype font-extrabold text-sm pt-0.5">
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
          className="text-dark/30"
        />
        <motion.circle
          cx="20"
          cy="20"
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
          className="text-dark "
          initial={{ strokeDasharray: circumference, strokeDashoffset: 0 }}
          animate={{
            strokeDashoffset:
              -(circumference - (timeLeft / initialTime) * circumference) + 1,
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
