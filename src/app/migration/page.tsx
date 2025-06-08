"use client";

import { useGlobalState } from "@/components/GlobalState";
import Loading from "@/components/Loading";
import { useEffect, useState } from "react";
import { sendMigration } from "./service";
import { UpdateType } from "@/services/MfApiObjects";
import Step from "@/components/Step";

export default function Migration() {
  const { mongoCred, javaCode } = useGlobalState();
  const [compilation, setCompilation] = useState(false);
  const [steps, setSteps] = useState<string[]>([]);

  const update = (update: UpdateType) => {
    if (update.id === "compile") {
      setCompilation(true);
      return;
    }

    if (update.id == "conversion") {
      setSteps([...steps, update.message]);
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

      {steps.map((x) => {
        return <Step text={x} state="completed" />;
      })}

      <Step
        text="Convertendo entidades"
        state={compilation ? "running" : "waiting"}
      />
    </div>
  );
}
