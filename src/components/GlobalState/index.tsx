"use client";

import React, { createContext, useContext, useState } from "react";
import {
  MigrationPreferences,
  DefaultMigrationPreferences,
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
};

const GlobalStateContext = createContext<GlobalStateContextType>({
  queries: [],
  preferences: DefaultMigrationPreferences,
  setPreferences: () => {},
});

export function GlobalStateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [preferences, setPreferences] = useState<MigrationPreferences>(
    DefaultMigrationPreferences
  );

  return (
    <GlobalStateContext.Provider
      value={{ queries: [], preferences, setPreferences }}
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
