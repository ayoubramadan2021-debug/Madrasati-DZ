import { useQuery } from "@tanstack/react-query";

import { getFavorites } from "../../../services/favoriteService";
import { queryKeys } from "../../../api/queryKeys";

export function useFavorites(userId?: string) {
  return useQuery({
    queryKey: queryKeys.favorites(userId || ""),
    queryFn: () => getFavorites(userId || ""),
    enabled: !!userId,
  });
}
