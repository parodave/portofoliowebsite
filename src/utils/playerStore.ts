import { create } from 'zustand';

interface PlayerState {
  position: [number, number, number];
  setPosition: (pos: [number, number, number]) => void;
}

export const usePlayerStore = create<PlayerState>(set => ({
  position: [0, 1, 0],
  setPosition: pos => set({ position: pos }),
}));
