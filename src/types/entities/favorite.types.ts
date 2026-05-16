export type Favorite = {
  id: string;
  user_id: string;
  item_id: string;
  item_type: "lesson" | "exercise";
  title: string;
  subject?: string | null;
  grade?: number | null;
  created_at?: string | null;
};

export type AddFavoriteInput = {
  userId: string;
  itemId: string;
  itemType: "lesson" | "exercise";
  title: string;
  subject?: string;
  grade?: number;
};
