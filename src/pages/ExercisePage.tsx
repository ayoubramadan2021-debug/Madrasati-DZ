import { useEffect, useState } from "react";
import { getExercises, submitExercise } from "../services/exerciseService";
import { supabase } from "../lib/supabaseClient";
import ResultMessage from "../shared/components/ResultMessage";

export default function ExercisePage({ lessonId }: any) {
  const [exercises, setExercises] = useState<any[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!lessonId) return;
    getExercises(lessonId).then(setExercises);
  }, [lessonId]);

  async function handleSubmit(ex: any) {
    const { data } = await supabase.auth.getSession();
    const user = data.session?.user;

    if (!user) return;

    const res = await submitExercise(
      user.id,
      lessonId,
      ex.id,
      answers[ex.id] || "",
      ex.answer
    );

    setResult((prev) => ({
      ...prev,
      [ex.id]: res.correct,
    }));
  }

  return (
    <div>
      <h2>Exercises</h2>

      {exercises.map((ex) => (
        <div key={ex.id}>
          <p>{ex.question}</p>

          <input
            onChange={(e) =>
              setAnswers({
                ...answers,
                [ex.id]: e.target.value,
              })
            }
          />

          <button onClick={() => handleSubmit(ex)}>
            Submit
          </button>

          {result[ex.id] !== undefined && (
            <ResultMessage correct={result[ex.id]} />
          )}
        </div>
      ))}
    </div>
  );
}
