import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

type sceneStateTypes = "intro" | "idle" | "game";

type State = {
  sceneState: sceneStateTypes;
};

type Actions = {
  setSceneState: (value: sceneStateTypes) => void;
};

export const useCupStore = create<State & Actions>()(
  subscribeWithSelector((set) => ({
    sceneState: "game",
    setSceneState: (value) => set({ sceneState: value }),
  })),
);
