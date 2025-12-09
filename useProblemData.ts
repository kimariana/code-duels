import { useProblemContext } from "@/context/room/problemContext";
import { useRoomContext } from "@/context/room/roomContext";
import { useSolutionContext } from "@/context/room/solutionContext";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

export function useProblemData() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { roomCode, currentProblem } = useRoomContext();
  const { problemInfo, hint, setHint, setProblemId, setProblemInfo } =
    useProblemContext();
  const { setCodeSolution, setTestCases } = useSolutionContext();

  useEffect(() => {
    const fetchProblemInfo = async () => {
      if (!currentProblem) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError(null);

        const supabase = createClient();

        const { data, error } = await supabase
          .from("problems")
          .select("json_data, boilerplate, test_cases, hint")
          .eq("id", currentProblem)
          .single();

        if (error || !data) {
          setError("Problem not found");
          setProblemInfo(null);
          setLoading(false);
          return;
        }

        if (!data) {
          setError("Problem not found");
          setProblemInfo(null);
          setLoading(false);
          return;
        }

        const problemData = {
          ...data,
          testCases: data.test_cases as Array<Record<string, string>>,
        };
        setProblemInfo(data.json_data);
        setHint(data.hint);
        setTestCases(problemData.testCases);
        const savedCodeSolution = localStorage.getItem(
          `${roomCode}:codeSolution`,
        );
        if (savedCodeSolution) {
          setCodeSolution(savedCodeSolution);
        } else {
          const formattedBoilerplate = data.boilerplate
            .replace(/\\n/g, "\n")
            .replace(/\\t/g, "\t");
          setCodeSolution(formattedBoilerplate);
        }
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setLoading(false);
      }
    };
    fetchProblemInfo();
  }, [
    currentProblem,
    roomCode,
    setCodeSolution,
    setProblemInfo,
    setProblemId,
    setTestCases,
    setHint,
  ]);

  return { problemInfo, hint, loading, error };
}
