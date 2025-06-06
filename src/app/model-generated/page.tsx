"use client";

import Button from "@/components/Button";
import Loading from "@/components/Loading";
import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import React from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import DocumentNode from "@/components/Nodes/DocumentNode";
import CustomEdge from "@/components/Edges/CustomEdge";
import { mapModelDtoToNodes, sendGenerateModel } from "./service";
import { useGlobalState } from "@/components/GlobalState";
import Dagre from "@dagrejs/dagre";

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

const getLayoutedElements = (nodes, edges, options) => {
  const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: options.direction });

  edges.forEach((edge) => g.setEdge(edge.source, edge.target));
  nodes.forEach((node) =>
    g.setNode(node.id, {
      ...node,
      width: node.measured?.width ?? 150,
      height: node.measured?.height ?? 100,
    })
  );

  Dagre.layout(g);

  return {
    nodes: nodes.map((node) => {
      const position = g.node(node.id);
      // We are shifting the dagre node position (anchor=center center) to the top left
      // so it matches the React Flow node anchor point (top left).
      const x = position.x - (node.measured?.width ?? 0) / 2;
      const y = position.y - (node.measured?.height ?? 0) / 2;

      return { ...node, position: { x, y } };
    }),
    edges,
  };
};

const measureNodes = (nodes) => {
  const measuredNodes = nodes.map((node) => {
    const element = document.querySelector(`[data-id="${node}"]`);
    if (element) {
      const rect = element.getBoundingClientRect();
      return {
        ...node,
        width: rect.width,
        height: rect.height,
      };
    }
    return node;
  });
  return measuredNodes;
};

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
      setEdges(inputEdges);
      setLoading(false);
    });
  };

  useEffect(() => {
    makeGenerateModel();
  }, []);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const layout = useCallback(() => {
    const layouted = getLayoutedElements(nodes, edges, {
      direction: "LR",
    });
    setNodes([...layouted.nodes]);
  }, [nodes, edges]);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) => {
        params.type = "customEdge";
        return addEdge(params, eds);
      }),
    [setEdges]
  );

  useEffect(() => {
    layout();
  }, [isLoading]);

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
          ></ReactFlow>

          <div className="flex flex-row gap-5">
            <Link href={"/code-generated"} className="btn-primary w-1/12">
              Continuar
            </Link>

            <Button
              text="Gerar novamente"
              className="btn-secondary"
              onClick={layout}
            />
          </div>
        </div>
      )}
    </>
  );
}
