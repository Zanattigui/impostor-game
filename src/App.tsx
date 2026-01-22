import { useState } from "react";
import Home from "./pages/Home";
import Game from "./pages/Game";
import type { Player, Question } from "./types/game";
import questionsData from "./data/questions.json";

function getRandomQuestion(usedIndexes: number[]): {
  question: Question;
  index: number;
} {
  let randomIndex = Math.floor(Math.random() * questionsData.length);

  while (usedIndexes.includes(randomIndex)) {
    randomIndex = Math.floor(Math.random() * questionsData.length);
  }

  return {
    question: questionsData[randomIndex],
    index: randomIndex,
  };
}

function shuffleImpostor(players: Player[]): Player[] {
  const impostorIndex = Math.floor(Math.random() * players.length);

  return players.map((player, index) => ({
    ...player,
    isImpostor: index === impostorIndex,
  }));
}

export default function App() {
  const [players, setPlayers] = useState<Player[] | null>(null);
  const [question, setQuestion] = useState<Question | null>(null);
  const [round, setRound] = useState(0);
  const [usedQuestions, setUsedQuestions] = useState<number[]>([]);

  function handleStart(usersList: string[]) {
    const filteredUsers = usersList.filter((name) => name.trim() !== "");

    const basePlayers: Player[] = filteredUsers.map((name, index) => ({
      id: index,
      name,
      isImpostor: false,
    }));

    const { question, index } = getRandomQuestion([]);

    setPlayers(shuffleImpostor(basePlayers));
    setQuestion(question);
    setUsedQuestions([index]);
  }

  function handleRestart() {
    if (!players) return;

    const { question, index } = getRandomQuestion(usedQuestions);

    setPlayers(shuffleImpostor(players));
    setQuestion(question);
    setUsedQuestions((prev) => [...prev, index]);
    setRound((prev) => prev + 1);
  }

  if (!players || !question) {
    return <Home onStart={handleStart} />;
  }

  return (
    <Game
      key={round}
      players={players}
      question={question}
      onRestart={handleRestart}
    />
  );
}
