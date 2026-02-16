"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import TextBubbleSvg from "./svg/TextBubbleSvg";

type UnderlineLinkProps = {
  text: string;
  className?: string;
  href?: string;
} & (
  | { isBubbleText: true; bubbleText: string }
  | { isBubbleText?: false; bubbleText?: never }
);

export default function UnderlineLink({
  text,
  className = "",
  href = "#",
  bubbleText,
  isBubbleText = false,
}: UnderlineLinkProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span className="relative inline">
      <AnimatePresence>
        {isBubbleText && isHovered && (
          <div className="absolute left-1/4 -top-14 z-9999 pointer-events-none -rotate-3">
            <TextBubbleSvg text={bubbleText as string} />
          </div>
        )}
      </AnimatePresence>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`transition-colors duration-150 underline decoration-main/30 decoration-wavy underline-offset-4 ${className}`}
      >
        {text}
      </a>
    </span>
  );
}
