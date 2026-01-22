import { useState } from "react";

type HomeProps = {
  onStart: (usersList: string[]) => void;
};

export default function Home({ onStart }: HomeProps) {
  const [usersList, setUsersList] = useState<string[]>([""]);

  const handleAddUser = () => {
    setUsersList((prev) => [...prev, ""]);
  };

  const handleChangeUser = (index: number, value: string) => {
    setUsersList((prev) => prev.map((user, i) => (i === index ? value : user)));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-black flex items-center justify-center p-4 text-zinc-100">
      <div className="bg-zinc-800 p-8 rounded-2xl w-full max-w-sm shadow-xl space-y-6">
        <h1 className="text-3xl font-bold text-center">🎭 Jogo do Impostor</h1>

        <div className="flex flex-col gap-3">
          {usersList.map((user, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Jogador ${index + 1}`}
              value={user}
              onChange={(e) => handleChangeUser(index, e.target.value)}
              className="
            w-full p-3 rounded-xl
            bg-zinc-700 text-zinc-100
            outline-none
            focus:ring-2 focus:ring-indigo-500
            transition
          "
            />
          ))}
        </div>

        <button
          onClick={handleAddUser}
          className="
        w-full border border-zinc-600 rounded-xl py-2
        hover:bg-zinc-700 active:scale-95
        transition
      "
        >
          + Adicionar jogador
        </button>

        <button
          onClick={() => onStart(usersList)}
          className="
        w-full bg-indigo-600 hover:bg-indigo-500
        active:scale-95
        transition
        py-3 rounded-xl font-semibold
      "
        >
          Iniciar jogo
        </button>
      </div>
    </div>
  );
}
