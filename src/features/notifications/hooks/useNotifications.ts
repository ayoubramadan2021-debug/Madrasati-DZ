import { useQuery } from "@tanstack/react-query";

import { getNotifications } from "../../../services/notificationService";
import { queryKeys } from "../../../api/queryKeys";

export function useNotifications(userId?: string) {
  return useQuery({
    queryKey: queryKeys.notifications(userId || ""),
    queryFn: () => getNotifications(userId || ""),
    enabled: !!userId,
  });
}
