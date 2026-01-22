import { useEffect, useState } from "react";
import type { Player, Question } from "../types/game";

type GameProps = {
  players: Player[];
  question: Question;
  onRestart: () => void;
};

type GamePhase = "QUESTIONS" | "REVEAL";

export default function Game({ players, question, onRestart }: GameProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  const [hasSeenQuestion, setHasSeenQuestion] = useState(false);
  const [timeLeft, setTimeLeft] = useState(4);
  const [phase, setPhase] = useState<GamePhase>("QUESTIONS");

  const currentPlayer = players[currentIndex];

  useEffect(() => {
    if (!showQuestion) return;

    if (timeLeft === 0) {
      setShowQuestion(false);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [showQuestion, timeLeft]);

  const handleShowQuestion = () => {
    if (hasSeenQuestion) return;

    setHasSeenQuestion(true);
    setShowQuestion(true);
    setTimeLeft(4);
  };

  const handleNextPlayer = () => {
    setShowQuestion(false);
    setHasSeenQuestion(false);
    setTimeLeft(4);

    if (currentIndex + 1 >= players.length) {
      setPhase("REVEAL");
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  if (phase === "REVEAL") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-black flex items-center justify-center p-4 text-zinc-100">
        <div className="bg-zinc-800 p-8 rounded-2xl w-full max-w-sm shadow-xl text-center space-y-6">
          <h2 className="text-2xl font-bold">🧠 Hora da discussão</h2>

          <div className="bg-zinc-900 p-4 rounded-xl">
            <p className="text-sm text-zinc-400 mb-1">
              A pergunta verdadeira era:
            </p>
            <p className="text-lg font-semibold">{question.inocente}</p>
          </div>

          <button
            onClick={onRestart}
            className="
        w-full bg-indigo-600 hover:bg-indigo-500
        active:scale-95
        transition
        py-3 rounded-xl font-semibold
      "
          >
            🔄 Nova rodada
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-black flex items-center justify-center p-4 text-zinc-100">
      <div className="bg-zinc-800 p-8 rounded-2xl w-full max-w-sm shadow-xl text-center space-y-4">
        <h2 className="text-xl font-bold">👤 {currentPlayer.name}</h2>

        {!showQuestion ? (
          <>
            <p className="text-zinc-400">Clique para ver sua pergunta</p>

            <button
              onClick={handleShowQuestion}
              disabled={hasSeenQuestion}
              className={`
            w-full py-3 rounded-xl font-semibold
            transition-all
            ${
              hasSeenQuestion
                ? "bg-zinc-600 cursor-not-allowed opacity-60"
                : "bg-indigo-600 hover:bg-indigo-500 active:scale-95"
            }
          `}
            >
              {hasSeenQuestion ? "Pergunta já vista" : "Ver pergunta"}
            </button>
          </>
        ) : (
          <>
            <div className="bg-zinc-900 p-4 rounded-xl text-lg font-medium animate-fade-in">
              {currentPlayer.isImpostor ? question.impostor : question.inocente}
            </div>

            <p className="text-sm text-zinc-400">⏳ {timeLeft}s</p>
          </>
        )}

        {!showQuestion && (
          <button
            onClick={handleNextPlayer}
            className="
          w-full mt-2 border border-zinc-600 rounded-xl py-2
          hover:bg-zinc-700 active:scale-95
          transition
        "
          >
            Próximo jogador →
          </button>
        )}
      </div>
    </div>
  );
}
