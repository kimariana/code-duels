export type Profile = {
  id: string;
  username: string;
  display_name: string;
  avatar_url: string | null;
  wins: number;
  losses: number;
  elo: number;
};

export type ProblemInfo = {
  questionId: number;
  title: string;
  categoryTitle: string;
  difficulty: string;
  content: string;
  hints: string[];
  solution: { content: string };
  functionName: string;
  baseTestCases: { [key: string]: string }[];
};
