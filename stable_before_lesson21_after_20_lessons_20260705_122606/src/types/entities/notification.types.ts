export type Notification = {
  id: string;
  user_id: string;
  title: string;
  body: string;
  is_read?: boolean | null;
  created_at?: string | null;
};

export type CreateNotificationInput = {
  userId: string;
  title: string;
  body: string;
};
