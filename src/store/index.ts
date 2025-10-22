import { create } from "zustand";

type Color = "#2e2c2e" | "#adb5bd"; //  "#2e2c3e"
type Scale = 0.06 | 0.08;

interface State {
  color: Color;
  setColor: (color: Color) => void;

  scale: Scale;
  setScale: (scale: Scale) => void;

  reset: () => void;
}

const useMacbookStore = create<State>()((set) => ({
  color: "#2e2c2e",
  setColor: (color) => set({ color }),

  scale: 0.08,
  setScale: (scale) => set({ scale }),

  reset: () => set({ color: "#2e2c2e", scale: 0.08 }),
}));

export default useMacbookStore;
