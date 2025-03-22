"use client";

import Button from "@/components/Button";
import Loading from "@/components/Loading";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ModelGenerated() {
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);

  return (
    <>
      {isLoading && (
        <div className="flex flex-col items-center content-center gap-5 ">
          <Loading text="Gerando o modelo..." />
        </div>
      )}

      {!isLoading && (
        <div className="flex flex-col col-1 container gap-7 h-full py-10">
          <h1 className="font-bold text-4xl">Modelo gerado:</h1>

          <textarea className="main-input grow" />

          <div className="flex flex-row gap-5">
            <Link href={"/llm-config"} className="btn-primary w-1/12">
              Continuar
            </Link>

            <Button text="Gerar novamente" className="btn-secondary" />
          </div>
        </div>
      )}
    </>
  );
}
