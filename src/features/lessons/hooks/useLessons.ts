import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../api/queryKeys";
import { getLessons, getLessonById } from "../services/lessonsService";
import type { Lesson } from "../../../types/entities";

export function useLessons() {
  return useQuery<Lesson[]>({
    queryKey: queryKeys.lessons,
    queryFn: getLessons,
  });
}

export function useLessonById(id?: string) {
  return useQuery<Lesson>({
    queryKey: [...queryKeys.lessons, id],
    queryFn: () => getLessonById(id as string),
    enabled: Boolean(id),
  });
}
