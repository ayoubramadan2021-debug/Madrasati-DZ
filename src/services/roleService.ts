import { supabase } from "../lib/supabaseClient";

export type UserRole = "student" | "parent" | "teacher" | "admin";

export async function getUserRole(userId: string): Promise<UserRole | null> {
  if (!userId) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .single();

  if (error) {
    console.log("ROLE CHECK ERROR:", error);
    return null;
  }

  return (data?.role as UserRole) || null;
}

export async function hasRole(
  userId: string,
  allowedRoles: UserRole[]
): Promise<boolean> {
  const role = await getUserRole(userId);

  if (!role) return false;

  return allowedRoles.includes(role);
}
