"use client";

import React, { createContext, useContext } from "react";
import {
  MigrationPreferences,
  DefaultMigrationPreferences,
  LLM,
  DefaultLLM,
  RdbAccess,
  DefaultRdbAccess,
  MongoCredentials,
  DefaultMongoCredentials,
} from "@/services/MfApiObjects";
import {
  DefaultGeneratedJavaCode,
  DefaultMetadataInfo,
  DefaultModelDto,
  GeneratedJavaCode,
  MetadataInfo,
  ModelDto,
} from "@/services/MfApiResponses";
import { pre } from "framer-motion/client";
import { report } from "process";
import dynamic from "next/dynamic";

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

  modelDto: ModelDto;
  setModelDto: Setter<ModelDto>;

  javaCode: GeneratedJavaCode;
  setJavaCode: Setter<GeneratedJavaCode>;

  mongoCred: MongoCredentials;
  setMongoCred: Setter<MongoCredentials>;

  report: string;
  setReport: Setter<string>;
};

const GlobalStateContext = createContext<GlobalStateContextType | undefined>(
  undefined
);

function GlobalStateProviderBase({ children }: { children: React.ReactNode }) {
  // Função para carregar o estado inicial do localStorage
  const loadStateFromLocalStorage = () => {
    if (typeof window !== "undefined") {
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
        modelDto: DefaultModelDto,
        javaCode: DefaultGeneratedJavaCode,
        mongoCred: DefaultMongoCredentials,
        report: "",
      };
    }
  };

  // Estado inicial carregado do localStorage
  const initialState = loadStateFromLocalStorage();

  // Função para salvar o estado no localStorage
  const saveStateToLocalStorage = (key: string, value: any) => {
    if (typeof window !== "undefined") {
      const globalState = loadStateFromLocalStorage();
      globalState[key] = value;
      localStorage.setItem("globalState", JSON.stringify(globalState));
    }
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

  const setModelDto = (modelDto: ModelDto) =>
    saveStateToLocalStorage("modelDto", modelDto);

  const setJavaCode = (javaCode: GeneratedJavaCode) =>
    saveStateToLocalStorage("javaCode", javaCode);

  const setMongoCred = (mongoCred: MongoCredentials) =>
    saveStateToLocalStorage("mongoCred", mongoCred);

  const setReport = (report: string) =>
    saveStateToLocalStorage("report", report);

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
        modelDto: initialState.modelDto,
        setModelDto,
        javaCode: initialState.javaCode,
        setJavaCode,
        mongoCred: initialState.mongoCred,
        setMongoCred,
        report: initialState.report,
        setReport,
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

export const GlobalStateProvider = dynamic(
  () => Promise.resolve(GlobalStateProviderBase),
  { ssr: false }
);

