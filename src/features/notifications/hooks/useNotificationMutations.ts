import { useMutation, useQueryClient } from "@tanstack/react-query";

import { markNotificationAsRead } from "../../../services/notificationService";
import { queryKeys } from "../../../api/queryKeys";

export function useMarkNotificationAsRead(userId?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId: string) =>
      markNotificationAsRead(notificationId),
    onSuccess: () => {
      if (userId) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.notifications(userId),
        });
      }
    },
  });
}
