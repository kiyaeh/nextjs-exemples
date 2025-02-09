'use client';
import React from 'react';
import Board from './Board';
import useGameStore from '../store/gameStore';

const Game: React.FC = () => {
  const history = useGameStore((state) => state.history);
  const setHistory = useGameStore((state) => state.setHistory);
  const currentMove = useGameStore((state) => state.currentMove);
  const setCurrentMove = useGameStore((state) => state.setCurrentMove);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares: (string | null)[]) {
    const nextHistory = history.slice(0, currentMove + 1).concat([nextSquares]);
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(move: number) {
    setCurrentMove(move);
  }

  return (
    <div className="flex flex-col md:flex-row font-mono">
      <div>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="mt-4 md:mt-0 md:ml-4">
        <ol>
          {history.map((_, move) => {
            const description = move > 0 ? `Go to move #${move}` : 'Go to game start';
            return (
              <li key={move}>
                <button
                  onClick={() => jumpTo(move)}
                  className="mb-1 px-2 py-1 border rounded hover:bg-gray-200 focus:outline-none"
                >
                  {description}
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default Game;
