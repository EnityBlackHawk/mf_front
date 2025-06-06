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
import CustomEdge from "@/components/Edges/CustomEdge";
import { mapModelDtoToNodes, sendGenerateModel } from "./service";
import { useGlobalState } from "@/components/GlobalState";

const nodeTypes = {
  documentType: DocumentNode,
};

const edgeTypes = {
  customEdge: CustomEdge,
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
          isRelationship: true,
          type: "Array<Aircraft>",
        },
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
  {
    id: "e1-2",
    source: "1",
    sourceHandle: "0",
    type: "customEdge",
    target: "2",
    animated: false,
    style: { stroke: "#FF0000" },
  },
];

export default function ModelGenerated() {
  const [isLoading, setLoading] = useState<boolean>(true);
  const { metadataInfo } = useGlobalState();

  const makeGenerateModel = () => {
    sendGenerateModel(metadataInfo).then((resp) => {
      if (resp.status !== 200) {
        alert("ERRO");
        return;
      }

      const { nodes: inputNodes, edges: inputEdges } = mapModelDtoToNodes(
        resp.data!!
      );
      setNodes(inputNodes);
      console.log("inputEdges:", inputEdges);
      setEdges(inputEdges);
      setLoading(false);
    });
  };

  useEffect(() => {
    makeGenerateModel();
  }, []);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) => {
        params.type = "customEdge";
        return addEdge(params, eds);
      }),
    [setEdges]
  );

  return (
    <>
      {isLoading && (
        <div className="flex flex-col items-center content-center gap-5">
          <h1 className="text-ascent animate-pulse">Gerando modelo</h1>
          <Loading className="w-36 h-36" />
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
            edgeTypes={edgeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
          >
            <Background bgColor="#001011" variant="dots" gap={12} size={1} />
          </ReactFlow>

          <div className="flex flex-row gap-5">
            <Link href={"/code-generated"} className="btn-primary w-1/12">
              Continuar
            </Link>

            <Button
              text="Gerar novamente"
              className="btn-secondary"
              onClick={() => {
                console.log(edges);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
