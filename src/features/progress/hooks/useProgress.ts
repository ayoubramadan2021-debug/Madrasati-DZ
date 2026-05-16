import { useQuery } from "@tanstack/react-query";

import { getUserProgress } from "../../../services/progressService";
import { queryKeys } from "../../../api/queryKeys";

export function useProgress(userId?: string) {
  return useQuery({
    queryKey: queryKeys.progress(userId || ""),
    queryFn: () => getUserProgress(userId || ""),
    enabled: !!userId,
  });
}
