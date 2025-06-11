"use client";

import { useGlobalState } from "@/components/GlobalState";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { AnimatePresence, motion } from "framer-motion";

export default function Completed() {
  const { report } = useGlobalState();
  const [message, setMessage] = useState(true);

  useEffect(() => {
    setTimeout(() => setMessage(false), 1000);
  }, []);

  return (
    <div className="flex flex-col col-1 container gap-7 h-full py-10">
      <AnimatePresence>
        {message && (
          <motion.div
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5, ease: "backIn" }}
            className="fixed w-screen bg-background"
          >
            <h1 className="text-ascent self-center">
               &nbsp;&nbsp;Migração concluida
            </h1>
          </motion.div>
        )}
      </AnimatePresence>

      <Markdown remarkPlugins={[remarkGfm]}>{report}</Markdown>
    </div>
  );
}
