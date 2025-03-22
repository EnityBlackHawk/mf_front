"use client";

import RelationshipItem from "@/components/RelationshipItem";
import RelationshipItemSkeleton from "@/components/RelationshipItem/Skeleton";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/Button";
import Link from "next/link";

export default function Relationships() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
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

        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <RelationshipItem
              table_a={"Oderlines"}
              table_b={"Orders"}
              avg={3}
              min={1}
              max={5}
              relationship="Many-to-One"
            />
          </motion.div>
        )}
      </div>
      {!isLoading && (
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
    </div>
  );
}
