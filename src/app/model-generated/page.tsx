"use client";

import Button from "@/components/Button";
import Loading from "@/components/Loading";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import React from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import DocumentNode from "@/components/Nodes/DocumentNode";

const nodeTypes = {
  documentType: DocumentNode,
};

const initialNodes = [
  {
    id: "1",
    type: "documentType",
    position: { x: 0, y: 0 },
    data: {
      name: "Airline",
      props: [
        {
          name: "id",
          isReference: false,
          isRelationship: false,
          type: "string",
        },
        {
          name: "name",
          isReference: false,
          isRelationship: false,
          type: "string",
        },
        {
          name: "aircrafts",
          isReference: false,
          isRelationship : true,
          type: "Array<Aircraft>"
        }
      ],
    },
  },
  {
    id: "2",
    type: "documentType",
    position: { x: 10, y: 300 },
    data: { name: "Aircraft", props: [{ name: "id", type: "string" }] },
  },
];
const initialEdges = [
  { id: "e1-2", source: "1", sourceHandle: "0", target: "2" },
];

export default function ModelGenerated() {
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

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

          <ReactFlow
            nodeTypes={nodeTypes}
            colorMode="dark"
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
          >
            <Background bgColor="#001011" variant="dots" gap={12} size={1} />
          </ReactFlow>

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
