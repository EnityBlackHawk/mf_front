"use client";

import { useGlobalState } from "@/components/GlobalState";
import Link from "next/link";
import { useEffect, useState } from "react";
import { parseResponse, sendGenerateJavaCode } from "./service";
import Loading from "@/components/Loading";

export default function CodeGenerated() {
  const { modelDto, setJavaCode } = useGlobalState();
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const makeGenerateModel = () => {
    sendGenerateJavaCode(modelDto).then((resp) => {
      if (resp.status !== 200) {
        alert("Error");
        return;
      }

      setJavaCode(resp.data!!);

      const parsedResponse = parseResponse(resp.data!!);
      console.log(parsedResponse);
      setCode(parsedResponse);

      setIsLoading(false);
    });
  };

  useEffect(() => {
    makeGenerateModel();
  }, []);

  return (
    <div className="flex flex-col col-1 container gap-7 h-full py-10">
      <h1 className="font-bold text-4xl">Código gerado:</h1>

      {isLoading && (
        <div className="flex flex-col items-center content-center gap-5">
          <h1 className="text-ascent animate-pulse">Gerando modelo</h1>
          <Loading className="w-36 h-36" />
        </div>
      )}
      {!isLoading && (
        <textarea
          defaultValue={code}
          className="main-input grow font-[roboto]"
          spellCheck={false}
        />
      )}

      <Link
        href={"/mongo-config"}
        className="btn-primary w-1/12 flex content-center justify-center"
      >
        <p>Migrar!</p>
      </Link>
    </div>
  );
}
