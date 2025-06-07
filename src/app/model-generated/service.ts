import { MetadataInfo, ModelDto } from "@/services/MfApiResponses";
import { GenerateModel } from "@/services/MfApiServices";

export type Prop = {
  name: string;
  isReference: boolean;
  isRelationship: boolean;
  type: string;
  referenceTo?: string;
  parent: string;
  inParentIndex: number;
};

export type Node = {
  id: string;
  type: "documentType";
  position: { x: number; y: number };
  data: {
    id: number;
    name: string;
    props: Prop[];
  };
};

export type Edge = {
  id: string;
  source: string;
  sourceHandle: string;
  type?: "customEdge";
  target: string;
  animated: boolean;
  style: { stroke: string };
};

export async function sendGenerateModel(metadataInfo: MetadataInfo) {
  const rest = await GenerateModel(metadataInfo);

  console.log(rest);

  return rest;
}

export function mapModelDtoToNodes(model: ModelDto): {
  nodes: Node[];
  edges: Edge[];
} {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  let refProps: Prop[] = [];

  for (let i = 0; i < model.models.length; i++) {
    const collection = model.models[i];
    const props: Prop[] = [];
    let propCount = 0;
    for (const propName in collection.properties) {
      const spec = collection.properties[propName];
      let prop: Prop = {
        name: propName,
        isReference: spec.reference,
        isRelationship: spec.relationshipType !== "none",
        type: spec.type ?? "unknown",
        referenceTo: spec.referenceTo?.targetTable,
        parent: collection.title!!.toLowerCase(),
        inParentIndex: propCount,
      };
      propCount++;
      props.push(prop);
    }

    const fil = props.filter((x) => {
      return x.isRelationship;
    });
    refProps = refProps.concat(fil);

    const spreadFactor = 250; // Adjust this value to control the spacing between nodes
    let node: Node = {
      id: collection.title!!.toLowerCase(),
      position: { x: i * spreadFactor, y: 0 },
      type: "documentType",
      data: {
        id: i,
        name: collection.title!!,
        props: props,
      },
    };

    nodes.push(node);
  }

  for (let i = 0; i < refProps.length; i++) {
    const prop = refProps[i];
    const edge: Edge = {
      id: i.toString(),
      animated: prop.isReference,
      source: prop.parent,
      sourceHandle: prop.inParentIndex.toString(),
      style: { stroke: "#2b4f40" },
      target: prop.referenceTo!!,
      //type: "customEdge",
    };

    edges.push(edge);
  }

  return { nodes, edges };
}
