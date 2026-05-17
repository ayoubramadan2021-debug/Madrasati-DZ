import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function AdminPage() {
  const [title, setTitle] = useState("");
  const [subjectId, setSubjectId] = useState("");

  async function addLesson() {
    const { error } = await supabase.from("lessons").insert([
      {
        title,
        subject_id: subjectId,
        content: "",
      },
    ]);

    if (error) {
      console.error(error);
    } else {
      alert("Lesson added");
    }
  }

  return (
    <div>
      <h2>Admin Panel</h2>

      <input
        placeholder="Subject ID"
        onChange={(e) => setSubjectId(e.target.value)}
      />

      <input
        placeholder="Lesson Title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <button onClick={addLesson}>
        Add Lesson
      </button>
    </div>
  );
}
