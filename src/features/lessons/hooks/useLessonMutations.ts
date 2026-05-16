import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../api/queryKeys";

import {
  createLesson,
  updateLesson,
  deleteLesson,
} from "../services/lessonsService";

export function useCreateLesson() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createLesson,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.lessons });
    },
  });
}

export function useUpdateLesson() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, lesson }) => updateLesson(id, lesson),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.lessons });
    },
  });
}

export function useDeleteLesson() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLesson,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.lessons });
    },
  });
}
