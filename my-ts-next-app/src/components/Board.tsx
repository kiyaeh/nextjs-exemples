'use client';
import React from 'react';
import Square from './Square';

interface BoardProps {
  xIsNext: boolean;
  squares: (string | null)[];
  onPlay: (nextSquares: (string | null)[]) => void;
}

function calculateWinner(squares: (string | null)[]): string | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function calculateTurns(squares: (string | null)[]): number {
  return squares.filter((square) => !square).length;
}

function calculateStatus(winner: string | null, turns: number, player: string): string {
  if (!winner && turns === 0) return 'Draw';
  if (winner) return `Winner: ${winner}`;
  return `Next player: ${player}`;
}

const Board: React.FC<BoardProps> = ({ xIsNext, squares, onPlay }) => {
  const winner = calculateWinner(squares);
  const turns = calculateTurns(squares);
  const player = xIsNext ? 'X' : 'O';
  const status = calculateStatus(winner, turns, player);

  function handleClick(i: number) {
    if (squares[i] || winner) return;
    const nextSquares = squares.slice();
    nextSquares[i] = player;
    onPlay(nextSquares);
  }

  return (
    <div>
      <div className="mb-2">{status}</div>
      <div className="grid grid-cols-3 grid-rows-3 gap-0 border border-gray-400 w-28 h-28">
        {squares.map((square, index) => (
          <Square
            key={index}
            value={square}
            onSquareClick={() => handleClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;
