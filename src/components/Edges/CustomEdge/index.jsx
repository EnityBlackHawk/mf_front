import { BaseEdge, getStraightPath } from "@xyflow/react";
import { useState } from "react";

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  ...props
}) {
  const [edgePath] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        selected={props.selected}
        style={{ stroke: props.selected ? "red" : "#2b4f40" }}
      />
    </>
  );
}
