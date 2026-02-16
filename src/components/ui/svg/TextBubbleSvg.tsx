"use client";
import { motion } from "framer-motion";

export default function TextBubbleSvg({
  text,
  className,
  bubbleClassName,
}: {
  text: string;
  className?: string;
  bubbleClassName?: string;
}) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0, y: 10 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0, opacity: 0, y: 10 }}
      transition={{ type: "spring", duration: 0.4, bounce: 0.4 }}
      className={`relative flex items-center justify-center w-21.25 h-12.5 ${bubbleClassName} select-none`}
    >
      <svg
        width="85"
        height="50"
        viewBox="0 0 85 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0"
      >
        <path
          d="M19.9512 42.0371C8.93324 42.0371 0.0012219 33.1058 0.000976562 22.0879V19.9502C0.000976562 8.93211 8.93309 0 19.9512 0V42.0371Z"
          fill="#278EFF"
        />

        <rect
          width="40"
          height="42.0371"
          transform="translate(18 0)"
          fill="#278EFF"
        />

        <path
          d="M55.9492 42.0371C66.9672 42.0371 75.8992 33.1058 75.8994 22.0879L75.8994 19.9502C75.8994 8.93211 66.9673 0 55.9492 0V42.0371Z"
          fill="#278EFF"
        />

        <path
          d="M7.88243 49.3313C8.80342 50.8757 19.1685 42.7187 20.126 41.6438C17.4425 41.7938 12.3746 40.1438 9.37457 39.0188C12.8967 44.4563 6.87611 47.6438 7.88243 49.3313Z"
          fill="#278EFF"
        />
      </svg>

      <span
        className={`relative z-10 text-white font-bold  leading-none   whitespace-nowrap select-none pb-1.5 pr-2.5 font-diatype  tracking-tight text-sm
           ${className} `}
      >
        {text}
      </span>
    </motion.div>
  );
}
