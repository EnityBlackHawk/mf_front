"use client";
import Button from "@/components/Button";
import { useGlobalState } from "@/components/GlobalState";
import Loading from "@/components/Loading";
import QueryItem from "@/components/QueryItem";
import pageAnimation from "@/services/NavAnimationDef";
import { useTransitionRouter } from "next-view-transitions";
import Link from "next/link";
import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";

type Query = {
  id: number;
  query: string;
  regularity: number;
};

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn-primary flex" disabled={pending}>
      {pending ? <Loading className="w-6 h-6" /> : "Conectar"}
    </button>
  );
}

export default function Queries() {
  const navAfterSend = async (prevState: null, formData: FormData) => {
    globalQueries.push(...queries);
    router.push("/model-custom");

    return null;
  };

  const { queries: globalQueries } = useGlobalState();
  const [idCount, setIdCount] = useState<number>(0);
  const [queries, setQueries] = useState<Array<Query>>([]);
  const [query, setQuery] = useState<string>("");
  const [regularity, setRegularity] = useState<number>(0);

  const router = useTransitionRouter();

  const [state, formAction] = useActionState(navAfterSend, null);

  function addQuery() {
    if (!query || !regularity) {
      return;
    }
    queries.push({ id: idCount, query: query, regularity: regularity });
    setIdCount(idCount + 1);
    setQuery("");
    setRegularity(0);
  }

  return (
    <form
      className="grid grid-rows-[auto_auto_auto_1fr_auto] col-1 container gap-5 h-full py-10"
      action={formAction}
    >
      <h1 className="font-bold text-4xl">
        Quais as consultas são as mais utilizadas ?
      </h1>

      <div className="flex items-end gap-4">
        <div className="grid grow">
          <label htmlFor="query">Consulta (SQL):</label>
          <input
            id="query"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
            }}
          />
        </div>
        <div className="grid">
          <label htmlFor="regularity">Regularidade (%):</label>
          <input
            id="regularity"
            value={regularity}
            type="number"
            onChange={(event) => setRegularity(Number(event.target.value))}
          />
        </div>
        <Button className="h-11" text="Adicionar" onClick={addQuery} />
      </div>
      <label>Consultas já adicionadas:</label>
      <div className="flex flex-col gap-2">
        {queries.map((x, i) => {
          return (
            <QueryItem
              key={i}
              query={x.query}
              regularity={x.regularity}
              onDelete={() => {
                setQueries(queries.filter((y) => y.id != x.id));
              }}
            />
          );
        })}
      </div>
      <Submit />
    </form>
  );
}
