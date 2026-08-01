import { create } from "zustand";

type AppState = {
  session: any;
  profile: any;
  progress: any[];
  setSession: (s: any) => void;
  setProfile: (p: any) => void;
  setProgress: (p: any[]) => void;
};

export const useAppState = create<AppState>((set) => ({
  session: null,
  profile: null,
  progress: [],
  setSession: (s) => set({ session: s }),
  setProfile: (p) => set({ profile: p }),
  setProgress: (p) => set({ progress: p }),
}));
