"use client";

import RelationshipItem from "@/components/RelationshipItem";
import RelationshipItemSkeleton from "@/components/RelationshipItem/Skeleton";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/Button";
import Link from "next/link";
import { useGlobalState } from "@/components/GlobalState";
import { sendSetup } from "./service";
import ErrorCard from "@/components/ErrorCard";
import { Relation } from "@/services/MfApiResponses";

export default function Relationships() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { llmConfig, queries, preferences, rdb } = useGlobalState();
  const [relations, setRelations] = useState<Relation[]>([]);

  const makeSetup = () => {
    sendSetup({
      llm: llmConfig,
      workloads: queries.map((q) => {
        return { query: q.query, regularity: q.regularity };
      }),
      preferences: preferences,
      projectName: "ProjectFront",
      rdbAccess: rdb,
    }).then((resp) => {
      if (resp.status != 200) {
        setError(resp.message!!);
      } else {
        setRelations(resp.data!!);
      }

      setIsLoading(false);
    });
  };

  useEffect(() => {
    makeSetup();
  }, []);

  return (
    <div className="flex flex-col col-1 container gap-7 h-full py-10">
      <h1 className="font-bold text-4xl">
        Identificamos os seguintes relacionamentos em seu banco de dados:
      </h1>
      <div className="flex flex-col col-1 gap-5 grow">
        {isLoading &&
          Array.from({ length: 5 }).map((_, i) => (
            <RelationshipItemSkeleton key={i} />
          ))}

        {!isLoading &&
          relations.map((r, i) => {
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <RelationshipItem
                  table_a={r.source}
                  table_b={r.target}
                  avg={r.avg}
                  min={r.min}
                  max={r.max}
                  relationship="Many-to-One"
                />
              </motion.div>
            );
          })}
      </div>
      {!isLoading && !error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Link className="btn-primary" href={"/model-generated"}>
            Continuar
          </Link>
        </motion.div>
      )}

      {!isLoading && error && <ErrorCard message={error} />}
    </div>
  );
}
