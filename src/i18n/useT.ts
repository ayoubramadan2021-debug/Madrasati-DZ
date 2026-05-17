import { useLang } from "../store/langStore";
import { lang } from "./lang";

export function useT() {
  const { lang: current } = useLang();

  return (key: string) => {
    return (lang as any)[current][key] || key;
  };
}
