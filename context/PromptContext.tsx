"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { CustomCloudinaryUploadWidgetInfo } from "@/types";

interface PromptContextProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  uploadedImages: CustomCloudinaryUploadWidgetInfo[];
  setUploadedImages: (images: CustomCloudinaryUploadWidgetInfo[] | ((prevImages: CustomCloudinaryUploadWidgetInfo[]) => CustomCloudinaryUploadWidgetInfo[])) => void;
}

const PromptContext = createContext<PromptContextProps | undefined>(undefined);

export const PromptProvider = ({ children }: { children: ReactNode }) => {
  const [prompt, setPrompt] = useState("");
  const [uploadedImages, setUploadedImages] = useState<CustomCloudinaryUploadWidgetInfo[]>([]);

  return (
    <PromptContext.Provider
      value={{ prompt, setPrompt, uploadedImages, setUploadedImages }}
    >
      {children}
    </PromptContext.Provider>
  );
};

export const usePromptContext = () => {
  const context = useContext(PromptContext);
  if (!context) {
    throw new Error("usePromptContext must be used within a PromptProvider");
  }
  return context;
};
