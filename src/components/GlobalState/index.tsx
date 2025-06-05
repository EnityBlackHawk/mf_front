"use client";

import React, { createContext, useContext, useState } from "react";
import {
  MigrationPreferences,
  DefaultMigrationPreferences,
  LLM,
  DefaultLLM,
  RdbAccess,
  DefaultRdbAccess,
} from "@/services/MfApiObjects";

type Query = {
  id: number;
  query: string;
  regularity: number;
};

type GlobalStateContextType = {
  queries: Array<Query>;
  preferences: MigrationPreferences;
  setPreferences: React.Dispatch<React.SetStateAction<MigrationPreferences>>;
  llmConfig: LLM;
  setLlmConfig: React.Dispatch<React.SetStateAction<LLM>>;
  rdb: RdbAccess;
  setRdb: React.Dispatch<React.SetStateAction<RdbAccess>>;
};

const GlobalStateContext = createContext<GlobalStateContextType>({
  queries: [],
  preferences: DefaultMigrationPreferences,
  setPreferences: () => {},
  llmConfig: DefaultLLM,
  setLlmConfig: () => {},
  rdb: DefaultRdbAccess,
  setRdb: () => {},
});

export function GlobalStateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [preferences, setPreferences] = useState<MigrationPreferences>(
    DefaultMigrationPreferences
  );

  const [llmConfig, setLlmConfig] = useState<LLM>(DefaultLLM);
  const [rdb, setRdb] = useState<RdbAccess>(DefaultRdbAccess);

  return (
    <GlobalStateContext.Provider
      value={{
        queries: [],
        preferences,
        setPreferences,
        llmConfig,
        setLlmConfig,
        rdb,
        setRdb,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
}

export function useGlobalState() {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
}
