"use client";
import { useGlobalState } from "@/components/GlobalState";
import Loading from "@/components/Loading";
import { MigrationPreferences } from "@/services/MfApiObjects";
import { useTransitionRouter } from "next-view-transitions";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn-primary flex" disabled={pending}>
      {pending ? <Loading className="w-6 h-6" /> : "Continuar"}
    </button>
  );
}

export default function ModelCustomization() {
  const navAfterSend = async (prevState: null, formData: FormData) => {
    const pref: MigrationPreferences = {
      allowRef: formData.get("allowRef") === "on",
      preferPerformance: formData.get("preferPerformance") === "on",
      framework: (formData.get("framework") as String) || "Spring Data MongoDB",
      customPrompt: (formData.get("customPrompt") as String) || "",
    };
    setPreferences(pref);

    router.push("/llm-config");

    return null;
  };

  const { preferences, setPreferences } = useGlobalState();
  const router = useTransitionRouter();

  const [state, formAction] = useActionState(navAfterSend, null);

  return (
    <form
      action={formAction}
      className="flex flex-col col-1 container gap-7 h-full py-10"
    >
      <h1 className="font-bold text-4xl">Vamos customizar o seu modelo:</h1>

      <div className="flex gap-3">
        <input
          name="allowRef"
          type="checkbox"
          defaultChecked={preferences.allowRef}
        />
        <p>
          Permitir que os documentos possuam referências a outros documentos
        </p>
      </div>

      <div className="flex gap-3">
        <input
          name="preferPerformance"
          type="checkbox"
          defaultChecked={preferences.preferPerformance}
        />
        <p>Priorizar desempenho ao invés da consistência</p>
      </div>

      <div className="flex flex-col gap-2">
        <h2>Qual framework você utiliza ?</h2>
        <select
          name="framework"
          defaultValue={preferences.framework ?? "Spring Data MongoDB"}
        >
          <option>Spring Data MongoDB</option>
        </select>
      </div>

      <div className="flex flex-col gap-2 grow">
        <h2>Gostaria de adicionar alguma observação ?</h2>
        <textarea
          name="customPrompt"
          className="main-input grow"
          defaultValue={preferences.customPrompt}
        />
      </div>

      <Submit />
    </form>
  );
}
