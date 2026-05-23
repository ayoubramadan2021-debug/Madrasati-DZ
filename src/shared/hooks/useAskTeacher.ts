import { useMutation } from "@tanstack/react-query";
import { askTeacher, type AskParams } from "../services/ai";

export function useAskTeacher() {
  return useMutation({
    mutationFn: (params: AskParams) => askTeacher(params),
  });
}
