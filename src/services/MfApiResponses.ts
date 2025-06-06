export type Relation = {
  source: string;
  target: string;
  min: number;
  max: number;
  avg: number;
};

export type MetadataInfo = {
  sql: string;
  relations: Relation[];
};

export const DefaultMetadataInfo: MetadataInfo = {
  sql: "",
  relations: [],
};

export type Reference = {
  targetTable: string;
  targetColumn: string;
};

export type JsonSchema = {
  type?: string;
  isId?: boolean;
  title?: string;
  description?: string;
  isAbstract?: boolean;
  format?: string;
  column?: string;
  table?: string;
  relationshipType?: "none" | "embedded" | "reference";
  docReferenceTo?: string;
  properties?: { [key: string]: JsonSchema };
  referenceTo?: Reference;
  referencedBy?: Reference;
  projection?: string;
  items?: JsonSchema;
  reference: boolean;
};

export type ModelDto = {
  explanation: string;
  tokens_used: number;
  models: JsonSchema[];
};

export type Response<T> = {
  status: number;
  message?: string;
  data?: T;
};

export type AsyncResponse<T> = Promise<Response<T>>;
