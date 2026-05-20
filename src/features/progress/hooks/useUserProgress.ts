import { useQuery } from "@tanstack/react-query";
import { getUserProgress } from "../../../services/progressService";

export function useUserProgress(userId?: string) {
  return useQuery({
    queryKey: ["progress", userId],
    queryFn: () => getUserProgress(userId as string),
    enabled: !!userId
  });
}
