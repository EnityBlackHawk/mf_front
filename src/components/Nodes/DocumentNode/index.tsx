import { useRef, useEffect, useState } from "react";
import { Handle, Position } from "@xyflow/react";
import { DocType } from "./DocumentType";
import { motion } from "framer-motion";

export default function DocumentNode({ data }: { data: DocType }) {
  const [labelPositions, setLabelPositions] = useState<number[]>([]);

  useEffect(() => {
    // Measure the Y positions of all labels
    const positions = Array.from(document.querySelectorAll(".label")).map(
      (label) =>
        (label as HTMLElement).offsetTop +
        (label as HTMLElement).offsetHeight / 2
    );
    setLabelPositions(positions);
  }, [data.props]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: data.id * 0.15 }}
    >
      <div
        id={`node-${data.name}`}
        className="min-w-45 bg-background border-2 border-onBackground rounded flex flex-col px-4 py-4"
      >
        <h2 className="mb-2">{data.name}</h2>

        {data.props.map((x, index) => {
          return (
            <div key={index} className="relative py-1 px-2">
              <label className="label font-bold text-[1.2rem]">
                {x.name} : <span className="font-serif">{x.type}</span>
              </label>
              {x.isRelationship && labelPositions[index] !== undefined && (
                <Handle
                  type="source"
                  position={Position.Right}
                  style={{ top: labelPositions[index] }}
                  id={index.toString()}
                  isConnectable={true}
                />
              )}
            </div>
          );
        })}
      </div>

      <Handle
        type="target"
        position={Position.Left}
        style={{ top: 0 }}
        id="b"
        isConnectable={true}
      />
    </motion.div>
  );
}
