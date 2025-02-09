// store/gameStore.ts
import { create } from 'zustand'
import { combine } from 'zustand/middleware'

export interface GameState {
  history: (string | null)[][];
  currentMove: number;
  setHistory: (
    nextHistory:
      | (string | null)[][] 
      | ((prev: (string | null)[][]) => (string | null)[][])
  ) => void;
  setCurrentMove: (
    nextCurrentMove: number | ((prev: number) => number)
  ) => void;
}

const useGameStore = create<GameState>(
  combine(
    {
      history: [Array(9).fill(null)],
      currentMove: 0,
    },
    (set) => ({
      setHistory: (nextHistory) =>
        set((state) => ({
          history:
            typeof nextHistory === 'function'
              ? nextHistory(state.history)
              : nextHistory,
        })),
      setCurrentMove: (nextCurrentMove) =>
        set((state) => ({
          currentMove:
            typeof nextCurrentMove === 'function'
              ? nextCurrentMove(state.currentMove)
              : nextCurrentMove,
        })),
    })
  )
);

export default useGameStore;
