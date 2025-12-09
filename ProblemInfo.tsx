import { useProblemData } from "@/hooks/room/useProblemData";
import { LoaderCircle } from "lucide-react";
import { TipDialog } from "./TipDialog";
import { usePowerUpContext } from "@/context/room/powerUpContext";

const ProblemInfo = () => {
  const { problemInfo, hint, loading, error } = useProblemData();
  const { tipProblemId } = usePowerUpContext();

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <LoaderCircle className="animate-spin text-gray-500" size={48} />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-lg text-red-500">{error}</div>;
  }

  if (!problemInfo) {
    return (
      <div className="text-center text-lg text-red-500">
        No problem data available.
      </div>
    );
  }

  const { questionId, title, content } = problemInfo;

  if (!content || content.trim() === "") {
    return (
      <div className="text-center">
        No content for problem data is available.
      </div>
    );
  }

  return (
    <div className="problem-info mx-auto flex max-w-full flex-col space-y-4 overflow-x-auto p-6">
      {/* Problem Header */}
      <div className="flex items-center justify-between">
        <h1 className="mb-2 text-2xl font-semibold">{title}</h1>
      </div>

      {tipProblemId == questionId && <TipDialog tipText={hint || ""} />}

      {/* Problem ID */}
      <p className="text-sm">Problem ID: {questionId}</p>

      {/* Problem Description */}
      <div
        className="problem-content mt-4 max-h-[70vh] w-full overflow-x-hidden overflow-y-auto pr-2 font-mono break-words"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default ProblemInfo;
