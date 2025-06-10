"use client";

import { useGlobalState } from "@/components/GlobalState";
import Loading from "@/components/Loading";
import { useEffect, useState } from "react";
import { sendMigration } from "./service";
import { UpdateType } from "@/services/MfApiObjects";
import Step from "@/components/Step";
import { useTransitionRouter } from "next-view-transitions";
import { motion } from "framer-motion";

export default function Migration() {
  const { mongoCred, javaCode } = useGlobalState();
  const [compilation, setCompilation] = useState(false);
  const [steps, setSteps] = useState<string[]>([]);
  const [completed, setCompleted] = useState(false);
  const router = useTransitionRouter();

  const update = (update: UpdateType) => {
    if (update.id === "compile") {
      setCompilation(true);
      return;
    }

    if (update.id == "conversion") {
      setSteps((prevSteps) => [...prevSteps, update.message]);
      return;
    }

    if (update.id == "concluded") {
      setCompleted(true);
      return;
    }

    if (update.id == "report") {
      //router.replace("https://google.com");
    }
  };

  useEffect(() => {
    sendMigration(mongoCred, javaCode, update);
  }, []);

  return (
    <div className="flex flex-col col-1 container gap-7 h-full py-10">
      <h1 className="font-bold text-4xl">Estamos migrando seus dados:</h1>

      <Step
        text="Compilando Classes"
        state={compilation ? "completed" : "running"}
      />

      {steps.map((x, i) => {
        return (
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Step key={i} text={x} state="completed" />
          </motion.div>
        );
      })}

      <Step
        text="Convertendo entidades"
        state={compilation ? (completed ? "completed" : "running") : "waiting"}
      />
    </div>
  );
}
