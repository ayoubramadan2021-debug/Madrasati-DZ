import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  createExercise,
  deleteExercise,
} from "../services/exercisesService";

import { queryKeys } from "../../../api/queryKeys";

export function useCreateExercise() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createExercise,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.exercises,
      });
    },
  });
}

export function useDeleteExercise() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteExercise,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.exercises,
      });
    },
  });
}
