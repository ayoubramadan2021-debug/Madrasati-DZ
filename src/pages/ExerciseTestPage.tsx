import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { saveProgress } from "@/services/progressService";
import ArithmeticExercise from "@/features/exercises/templates/ArithmeticExercise";
import CountExercise from "@/features/exercises/templates/CountExercise";
import OrderExercise from "@/features/exercises/templates/OrderExercise";
import McqExercise from "@/features/exercises/templates/McqExercise";

function withTimeout(p, ms = 12000) {
  return Promise.race([
    Promise.resolve(p),
    new Promise((_, rej) =>
      setTimeout(() => rej(new Error("انتهت المهلة")), ms)
    ),
  ]);
}

const TEST_TYPE = "mcq";
const TEST_LESSON = 3;

export default function ExerciseTestPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [data, setData] = useState<any>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: row, error } = await withTimeout(
        supabase
          .from("exercises")
          .select("type, title, data")
          .eq("type", TEST_TYPE)
          .eq("lesson_number", TEST_LESSON)
          .single()
      );
      if (error) throw error;
      setType(row.type);
      setTitle(row.title);
      setData(row.data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "حدث خطأ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loading)
    return (
      <p dir="rtl" style={{ textAlign: "center", padding: 40 }}>
        جارٍ التحميل…
      </p>
    );

  if (error)
    return (
      <div dir="rtl" style={{ textAlign: "center", padding: 40 }}>
        <p>تعذّر تحميل التمرين: {error}</p>
        <button onClick={load} style={{ marginTop: 12, padding: "10px 20px" }}>
          إعادة المحاولة
        </button>
      </div>
    );

  if (!data) return null;

  const onComplete = async (s: number, t: number) => {
    try {
      const { data: auth } = await supabase.auth.getUser();
      if (!auth.user) return;
      await saveProgress(auth.user.id, String(TEST_LESSON), s, s === t);
    } catch (e) {
      console.log("تعذّر حفظ النقاط", e);
    }
  };

  switch (type) {
    case "arithmetic":
      return (
        <ArithmeticExercise
          title={title}
          instruction={data.instruction}
          items={data.items}
          onComplete={onComplete}
        />
      );
    case "count":
      return (
        <CountExercise
          title={title}
          instruction={data.instruction}
          items={data.items}
          onComplete={onComplete}
        />
      );
    case "order":
      return (
        <OrderExercise
          title={title}
          instruction={data.instruction}
          items={data.items}
          onComplete={onComplete}
        />
      );
    case "mcq":
      return (
        <McqExercise
          title={title}
          instruction={data.instruction}
          items={data.items}
          onComplete={onComplete}
        />
      );
    default:
      return (
        <p dir="rtl" style={{ textAlign: "center", padding: 40 }}>
          نوع تمرين غير معروف: {type}
        </p>
      );
  }
}
