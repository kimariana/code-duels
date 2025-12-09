import { ProblemInfo } from "@/utils/types";
import { createContext, Dispatch, useContext, useState } from "react";

type ProblemContextType = {
  problemId: number;
  problemInfo: ProblemInfo | null;
  hint: string | null;
  setProblemId: Dispatch<React.SetStateAction<number>>;
  setProblemInfo: Dispatch<React.SetStateAction<ProblemInfo | null>>;
  setHint: Dispatch<React.SetStateAction<string | null>>;
};

const ProblemContext = createContext<ProblemContextType | undefined>(undefined);

type ProblemProviderProps = {
  children: React.ReactNode;
};

export const ProblemProvider = ({ children }: ProblemProviderProps) => {
  const [problemId, setProblemId] = useState<number>(0);
  const [hint, setHint] = useState<string | null>(null);
  const [problemInfo, setProblemInfo] = useState<ProblemInfo | null>(null);

  return (
    <ProblemContext.Provider
      value={{
        problemId,
        problemInfo,
        hint,
        setProblemId,
        setProblemInfo,
        setHint,
      }}
    >
      {children}
    </ProblemContext.Provider>
  );
};

export const useProblemContext = () => {
  const context = useContext(ProblemContext);
  if (context === undefined) {
    throw new Error("useProblemContext must be used within a ProblemProvider");
  }
  return context;
};
