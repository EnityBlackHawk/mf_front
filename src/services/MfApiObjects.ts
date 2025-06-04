export type RdbAccess = {
  /* JDBC host */
  host: String;
  user: String;
  password: String;
  sgbd: String;
};

export type MigrationPreferences = {
  allowRef: Boolean;
  preferPerformance: Boolean;
  framework: String;
  customPrompt: String;
};
export const DefaultMigrationPreferences = {
  allowRef: true,
  preferPerformance: true,
  framework: "spring data mongodb",
  customPrompt: "",
};

export type LLM = {
  provider: String;
  model: String;
  apiKey: String;
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
