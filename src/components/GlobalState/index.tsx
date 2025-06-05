"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  MigrationPreferences,
  DefaultMigrationPreferences,
  LLM,
  DefaultLLM,
  RdbAccess,
  DefaultRdbAccess,
} from "@/services/MfApiObjects";
import { DefaultMetadataInfo, MetadataInfo } from "@/services/MfApiResponses";
import { pre } from "framer-motion/client";

type Query = {
  id: number;
  query: string;
  regularity: number;
};

type Setter<T> = (param: T) => void;

type GlobalStateContextType = {
  queries: Query[];
  setQueries: Setter<Query[]>;
  preferences: MigrationPreferences;
  setPreferences: Setter<MigrationPreferences>;
  llmConfig: LLM;
  setLlmConfig: Setter<LLM>;
  rdb: RdbAccess;
  setRdb: Setter<RdbAccess>;
  metadataInfo: MetadataInfo;
  setMetadataInfo: Setter<MetadataInfo>;
};

const GlobalStateContext = createContext<GlobalStateContextType | undefined>(
  undefined
);

export function GlobalStateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Função para carregar o estado inicial do localStorage
  const loadStateFromLocalStorage = () => {
    const savedState = localStorage.getItem("globalState");
    if (savedState) {
      return JSON.parse(savedState);
    }
    return {
      queries: [],
      preferences: DefaultMigrationPreferences,
      llmConfig: DefaultLLM,
      rdb: DefaultRdbAccess,
      metadataInfo: DefaultMetadataInfo,
    };
  };

  // Estado inicial carregado do localStorage
  const initialState = loadStateFromLocalStorage();

  // Função para salvar o estado no localStorage
  const saveStateToLocalStorage = (key: string, value: any) => {
    const globalState = loadStateFromLocalStorage();
    globalState[key] = value;
    localStorage.setItem("globalState", JSON.stringify(globalState));
  };

  // Setters que atualizam diretamente o localStorage
  const setQueries = (queries: Query[]) =>
    saveStateToLocalStorage("queries", queries);
  const setPreferences = (preferences: MigrationPreferences) =>
    saveStateToLocalStorage("preferences", preferences);
  const setLlmConfig = (llmConfig: LLM) =>
    saveStateToLocalStorage("llmConfig", llmConfig);
  const setRdb = (rdb: RdbAccess) => saveStateToLocalStorage("rdb", rdb);
  const setMetadataInfo = (metadataInfo: MetadataInfo) =>
    saveStateToLocalStorage("metadataInfo", metadataInfo);

  return (
    <GlobalStateContext.Provider
      value={{
        queries: initialState.queries,
        setQueries,
        preferences: initialState.preferences,
        setPreferences,
        llmConfig: initialState.llmConfig,
        setLlmConfig,
        rdb: initialState.rdb,
        setRdb,
        metadataInfo: initialState.metadataInfo,
        setMetadataInfo,
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
