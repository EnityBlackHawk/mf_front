"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function Loading({
  className,
  waiting = false,
}: {
  className?: string;
  waiting?: boolean;
}) {
  return (
    <AnimatePresence>
      <motion.div
        className={`flex flex-col items-center content-center gap-5 ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div
          className={`w-full h-full border-2 ${
            waiting
              ? "border-warning drop-shadow-warning-glow"
              : "border-ascent animate-[spin_2s_linear_infinite] drop-shadow-glow"
          } rounded-full`}
        >
          {!waiting && (
            <div className="w-1/4 h-1/4  bg-ascent rounded-full"></div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
