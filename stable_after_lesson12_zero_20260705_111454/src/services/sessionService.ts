import { supabase } from "../lib/supabaseClient";

export async function getCurrentSession() {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    console.log("SESSION ERROR:", error);
    return null;
  }

  return session;
}

export async function getCurrentUser() {
  const session = await getCurrentSession();

  if (!session) {
    return null;
  }

  return session.user;
}

export function listenToAuthChanges(callback) {
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange(
    (_event, session) => {
      callback(session?.user || null);
    }
  );

  return subscription;
}
