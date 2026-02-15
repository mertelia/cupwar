import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

type sceneStateTypes = "intro" | "idle" | "game" | "afterGame";

type State = {
  sceneState: sceneStateTypes;
  resetBalls: number;
  points: number;
};

type Actions = {
  setSceneState: (value: sceneStateTypes) => void;
  triggerResetBalls: () => void;
  addPoint: () => void;
  resetPoints: () => void;
};

export const useCupStore = create<State & Actions>()(
  subscribeWithSelector((set) => ({
    sceneState: "intro",
    setSceneState: (value) => set({ sceneState: value }),
    resetBalls: 0,
    triggerResetBalls: () => {
      set((state) => ({
        resetBalls: state.resetBalls + 1,
      }));
    },
    points: 0,
    addPoint: () => {
      set((state) => ({
        points: state.points + 1,
      }));
    },
    resetPoints: () => {
      set({
        points: 0,
      });
    },
  })),
);
