import { useQuery } from "@tanstack/react-query";

import {
  getExercises,
  getExercisesByGradeAndSubject,
  getExerciseById,
} from "../services/exercisesService";

import { queryKeys } from "../../../api/queryKeys";

export function useExercises() {
  return useQuery({
    queryKey: queryKeys.exercises,
    queryFn: getExercises,
  });
}

export function useExercisesByGradeAndSubject(
  grade?: number | string,
  subject?: string
) {
  return useQuery({
    queryKey: queryKeys.exercisesByGradeAndSubject(
      String(grade || ""),
      String(subject || "")
    ),
    queryFn: () =>
      getExercisesByGradeAndSubject(
        Number(grade || 1),
        String(subject || "")
      ),
    enabled: !!grade && !!subject,
  });
}

export function useExercise(exerciseId?: string) {
  return useQuery({
    queryKey: queryKeys.exercise(exerciseId || ""),
    queryFn: () => getExerciseById(exerciseId || ""),
    enabled: !!exerciseId,
  });
}
