"use client";

import React, { createContext, useContext, useState } from "react";

type Query = {
  id: number;
  query: string;
  regularity: number;
};

type GlobalStateContextType = {
  queries: Array<Query>;
};

const GlobalStateContext = createContext<GlobalStateContextType>({
  queries: [],
});

export function GlobalStateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GlobalStateContext.Provider value={{ queries: [] }}>
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
