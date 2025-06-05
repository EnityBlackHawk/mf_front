export type Relation = {
  source: string;
  target: string;
  min: number;
  max: number;
  avg: number;
};

export type Response<T> = {
  status: number;
  message?: string;
  data?: T;
};
