import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import AppCard from "../shared/components/AppCard";

export default function ProgressPage() {
  const [profile, setProfile] = useState<any>(null);
  const [progress, setProgress] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.auth.getSession();
      const user = data.session?.user;

      if (!user) return;

      const { data: prof } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      setProfile(prof);

      const { data: prog } = await supabase
        .from("progress")
        .select("*")
        .eq("profile_id", user.id);

      setProgress(prog || []);
    }

    load();
  }, []);

  return (
    <div>
      <h2>Progress</h2>

      <AppCard>
        <p>Name: {profile?.name}</p>
        <p>Points: {profile?.points}</p>
      </AppCard>

      {progress.map((p) => (
        <AppCard key={p.id}>
          <p>Lesson: {p.lesson_id}</p>
          <p>Points: {p.points}</p>
          <p>Status: {p.completed ? "Done" : "Pending"}</p>
        </AppCard>
      ))}
    </div>
  );
}
