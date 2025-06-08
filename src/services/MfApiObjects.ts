export type RdbAccess = {
  /* JDBC host */
  host: string;
  user: string;
  password: string;
  sgbd: string;
};

export const DefaultRdbAccess = {
  host: "",
  user: "",
  password: "",
  sgbd: "Postgres",
};

export type MigrationPreferences = {
  allowRef: boolean;
  preferPerformance: boolean;
  framework: string;
  customPrompt: string;
};
export const DefaultMigrationPreferences = {
  allowRef: true,
  preferPerformance: true,
  framework: "spring data mongodb",
  customPrompt: "",
};

export type LLM = {
  provider: string;
  model: string;
  apiKey: string;
};
export const DefaultLLM = {
  provider: "GPT",
  model: "gtp-4o",
  apiKey: "",
};

export type Workload = {
  regularity: Number;
  query: String;
};

export type Setup = {
  projectName: String;
  llm: LLM;
  preferences: MigrationPreferences;
  rdbAccess: RdbAccess;
  workloads: Array<Workload>;
};

export type MongoCredentials = {
  host: string;
  port: number;
  database: string;
  username?: string;
  password?: string;
};


