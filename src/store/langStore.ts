import { create } from "zustand";

type Lang = "en" | "ar";

export const useLang = create<any>((set) => ({
  lang: "ar",
  setLang: (l: Lang) => set({ lang: l }),
}));
