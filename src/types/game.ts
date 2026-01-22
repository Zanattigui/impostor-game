export type Question = {
  inocente: string;
  impostor: string;
};

export type QuestionsMap = {
  [key: number]: Question;
};

export type Player = {
  id: number;
  name: string;
  isImpostor: boolean;
};

export type GamePhase = "QUESTIONS" | "REVEAL";
