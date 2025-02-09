
'use client';
import React from 'react';

interface SquareProps {
  value: string | null;
  onSquareClick: () => void;
}

const Square: React.FC<SquareProps> = ({ value, onSquareClick }) => {
  return (
    <button
      onClick={onSquareClick}
      className="flex items-center justify-center border border-gray-400 bg-white text-xl font-bold h-10 w-10 focus:outline-none"
    >
      {value}
    </button>
  );
};

export default Square;
