import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  addFavorite,
  removeFavorite,
} from "../../../services/favoriteService";
import { queryKeys } from "../../../api/queryKeys";

type AddFavoritePayload = {
  userId: string;
  itemId: string;
  itemType: "lesson" | "exercise";
  title: string;
  subject?: string;
  grade?: number | string;
};

export function useAddFavorite(userId?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AddFavoritePayload) => addFavorite(payload),
    onSuccess: () => {
      if (userId) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.favorites(userId),
        });
      }
    },
  });
}

export function useRemoveFavorite(userId?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (favoriteId: string) => removeFavorite(favoriteId),
    onSuccess: () => {
      if (userId) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.favorites(userId),
        });
      }
    },
  });
}
