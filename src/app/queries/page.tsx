"use client";
import Button from "@/components/Button";
import QueryItem from "@/components/QueryItem";
import { useState } from "react";

type Query = {
  id: number;
  query: string;
  regularity: number;
};

export default function Queries() {
  const [idCount, setIdCount] = useState<number>(0);
  const [queries, setQueries] = useState<Array<Query>>([]);
  const [query, setQuery] = useState<string>("");
  const [regularity, setRegularity] = useState<number>(0);

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
    <div className="grid grid-rows-[auto_auto_auto_1fr] col-1 container gap-5 h-full py-10">
      <h1 className="font-bold text-4xl">
        Quais as consultas são as mais utilizadas ?
      </h1>

      <div className="flex items-end gap-4">
        <div className="grid grow">
          <label>Consulta (SQL):</label>
          <input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
            }}
          />
        </div>
        <div className="grid">
          <label>Regularidade (%):</label>
          <input
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
                console.log(x.id);
                console.log(queries);
                setQueries(queries.filter((y) => y.id != x.id));
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
