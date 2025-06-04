"use client";
import { useGlobalState } from "@/components/GlobalState";
import Link from "next/link";
import { useEffect } from "react";

export default function ModelCustomization() {
  return (
    <div className="flex flex-col col-1 container gap-7 h-full py-10">
      <h1 className="font-bold text-4xl">Vamos customizar o seu modelo:</h1>

      <div className="flex gap-3">
        <input type="checkbox" />
        <p>
          Permitir que os documentos possuam referências a outros documentos
        </p>
      </div>

      <div className="flex gap-3">
        <input type="checkbox" />
        <p>Priorizar desempenho ao invés da consistência</p>
      </div>

      <div className="flex flex-col gap-2">
        <h2>Qual framework você utiliza ?</h2>
        <select defaultValue={"Spring Data MongoDB"}>
          <option>Spring Data MongoDB</option>
        </select>
      </div>

      <div className="flex flex-col gap-2 grow">
        <h2>Gostaria de adicionar alguma observação ?</h2>
        <textarea className="main-input grow" />
      </div>

      <Link href={"/llm-config"} className="btn-primary w-1/12">
        Continuar
      </Link>
    </div>
  );
}
