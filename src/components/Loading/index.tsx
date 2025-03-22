"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function Loading({ text }: { text?: string }) {
  return (
    <AnimatePresence>
      <motion.div
        className="flex flex-col items-center content-center gap-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-ascent animate-pulse">{text}</h1>
        <div className="w-30 h-30 border-2 border-ascent rounded-full animate-[spin_2s_linear_infinite] drop-shadow-glow">
          <div className="w-8 h-8  bg-ascent rounded-full"></div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
