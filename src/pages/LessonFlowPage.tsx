import { useEffect, useState } from "react";
import { getExercises } from "../services/exerciseService";
import { getQuizzes } from "../services/quizService";
import ProgressBar from "../shared/components/ProgressBar";
import ResultMessage from "../shared/components/ResultMessage";
import QuizResult from "../shared/components/QuizResult";

export default function LessonFlowPage({ lessonId }: any) {
  const [step, setStep] = useState(0);
  const [exercises, setExercises] = useState<any[]>([]);
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [answers, setAnswers] = useState<any>({});
  const [result, setResult] = useState<any>({});

  useEffect(() => {
    if (!lessonId) return;

    getExercises(lessonId).then(setExercises);
    getQuizzes(lessonId).then(setQuizzes);
  }, [lessonId]);

  const totalSteps = 3;
  const progress = ((step + 1) / totalSteps) * 100;

  return (
    <div>
      <h2>Lesson Flow</h2>

      <ProgressBar value={progress} />

      {step === 0 &&
        exercises.map((ex) => (
          <div key={ex.id}>
            <p>{ex.question}</p>

            <input
              onChange={(e) =>
                setAnswers({ ...answers, [ex.id]: e.target.value })
              }
            />

            <button
              onClick={() => {
                const correct = answers[ex.id] === ex.answer;
                setResult({ ...result, [ex.id]: correct });
              }}
            >
              Check
            </button>

            {result[ex.id] !== undefined && (
              <ResultMessage correct={result[ex.id]} />
            )}
          </div>
        ))}

      {step === 0 && (
        <button onClick={() => setStep(1)}>Next</button>
      )}

      {step === 1 &&
        quizzes.map((q) => (
          <div key={q.id}>
            <p>{q.question}</p>

            {q.options.map((opt: string) => (
              <div key={opt}>
                <label>
                  <input
                    type="radio"
                    name={q.id}
                    onChange={() =>
                      setAnswers({ ...answers, [q.id]: opt })
                    }
                  />
                  {opt}
                </label>
              </div>
            ))}

            <button
              onClick={() => {
                const correct = answers[q.id] === q.correct_answer;
                setResult({ ...result, [q.id]: correct });
              }}
            >
              Submit
            </button>

            {result[q.id] !== undefined && (
              <QuizResult correct={result[q.id]} />
            )}
          </div>
        ))}

      {step === 1 && (
        <button onClick={() => setStep(2)}>Finish</button>
      )}

      {step === 2 && (
        <div>
          <h3>Lesson Completed</h3>
          <p>Great work</p>
        </div>
      )}
    </div>
  );
}
