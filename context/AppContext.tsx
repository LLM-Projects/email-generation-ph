"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface AppContextType {
  openAIApiKey: string;
  setOpenAIApiKey: (key: string) => void;
  isKeyValid: boolean;
  setIsKeyValid: (valid: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [openAIApiKey, setOpenAIApiKey] = useState("");
  const [isKeyValid, setIsKeyValid] = useState(false);

  return (
    <AppContext.Provider
      value={{
        openAIApiKey,
        setOpenAIApiKey,
        isKeyValid,
        setIsKeyValid,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
