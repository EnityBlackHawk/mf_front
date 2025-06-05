"use client";

import { useGlobalState } from "@/components/GlobalState";
import Submit from "@/components/Submit";
import { LLM } from "@/services/MfApiObjects";
import { useTransitionRouter } from "next-view-transitions";
import { useActionState } from "react";
import { sendSetup } from "../relationships/service";
import pageAnimation from "@/services/NavAnimationDef";

export default function ModelCustomization() {
  const { llmConfig, setLlmConfig } = useGlobalState();

  const navAfterSend = async (prevState: null, formData: FormData) => {
    const llm: LLM = {
      provider: formData.get("provider") as string,
      model: formData.get("model") as string,
      apiKey: formData.get("apiKey") as string,
    };
    setLlmConfig(llm);

    router.push("/relationships", { onTransitionReady: pageAnimation });

    return null;
  };

  const router = useTransitionRouter();

  const [state, formAction] = useActionState(navAfterSend, null);

  return (
    <form
      action={formAction}
      className="flex flex-col col-1 container gap-7 w-full h-full py-10"
    >
      <h1 className="font-bold text-4xl">Quais suas configurações de LLM ?</h1>

      <div className="flex flex-col gap-2 max-w-1/2">
        <h2>Qual LLM você utiliza ?</h2>
        <select name="provider" defaultValue={llmConfig.provider}>
          <option>GPT</option>
        </select>
      </div>

      <div className="flex flex-col gap-2 max-w-1/2">
        <h2>Selecione o modelo:</h2>
        <select name="model" defaultValue={llmConfig.model}>
          <option>gpt-4o</option>
        </select>
      </div>

      <div className="flex flex-col gap-2 max-w-1/2">
        <h2>Qual a key da LLM ?</h2>
        <input name="apiKey" type="password" defaultValue={llmConfig.apiKey} />
      </div>
      <div className="grow"></div>
      <Submit className="w-fit" />
    </form>
  );
}
