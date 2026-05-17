import { useEffect, useState } from "react";
import { getQuizzes, submitQuiz } from "../services/quizService";
import { supabase } from "../lib/supabaseClient";
import QuizResult from "../shared/components/QuizResult";

export default function QuizPage({ lessonId }: any) {
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [result, setResult] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!lessonId) return;
    getQuizzes(lessonId).then(setQuizzes);
  }, [lessonId]);

  async function handleSubmit(q: any) {
    const { data } = await supabase.auth.getSession();
    const user = data.session?.user;
    if (!user) return;

    const res = await submitQuiz(
      user.id,
      lessonId,
      q.id,
      selected[q.id],
      q.correct_answer
    );

    setResult((prev) => ({
      ...prev,
      [q.id]: res.correct,
    }));
  }

  return (
    <div>
      <h2>Quizzes</h2>

      {quizzes.map((q) => (
        <div key={q.id}>
          <p>{q.question}</p>

          {q.options.map((opt: string) => (
            <div key={opt}>
              <label>
                <input
                  type="radio"
                  name={q.id}
                  onChange={() =>
                    setSelected({
                      ...selected,
                      [q.id]: opt,
                    })
                  }
                />
                {opt}
              </label>
            </div>
          ))}

          <button onClick={() => handleSubmit(q)}>
            Submit
          </button>

          {result[q.id] !== undefined && (
            <QuizResult correct={result[q.id]} />
          )}
        </div>
      ))}
    </div>
  );
}
