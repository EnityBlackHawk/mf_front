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

export type Response<T> = {
  status: number;
  message?: string;
  data?: T;
};
