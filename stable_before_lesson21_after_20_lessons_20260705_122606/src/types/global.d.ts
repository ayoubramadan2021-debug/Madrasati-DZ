export type User = {
  id: string;
  email?: string;
};

export type ProgressItem = {
  id: string;
  user_id: string;
  points?: number;
  completed?: boolean;
};
