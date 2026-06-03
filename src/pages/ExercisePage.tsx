import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useLang } from "../i18n/LanguageContext";
import { saveProgress } from "../services/progressService";
import ArithmeticExercise from "../features/exercises/templates/ArithmeticExercise";
import CountExercise from "../features/exercises/templates/CountExercise";
import OrderExercise from "../features/exercises/templates/OrderExercise";
import McqExercise from "../features/exercises/templates/McqExercise";
import ColorExercise from "../features/exercises/templates/ColorExercise";
import DragDropExercise from "../features/exercises/templates/DragDropExercise";
import CatchExercise from "../features/exercises/templates/CatchExercise";
import TraceExercise from "../features/exercises/templates/TraceExercise";
import PaintExercise from "../features/exercises/templates/PaintExercise";
import BalloonExercise from "../features/exercises/templates/BalloonExercise";
import ConnectExercise from "../features/exercises/templates/ConnectExercise";
import GenerateExercise from "../features/exercises/templates/GenerateExercise";
import LessonScene from "../features/exercises/templates/LessonScene";
import dziadHappy from "../assets/dziad-happy.webp";

function withTimeout(p: any, ms = 12000) {
  return Promise.race([
    Promise.resolve(p),
    new Promise((_, rej) =>
      setTimeout(() => rej(new Error("انتهت المهلة")), ms)
    ),
  ]);
}

export default function ExercisePage() {
  const { t } = useLang();
  const { exerciseId, lessonId } = useParams();
  const id = exerciseId || lessonId;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [type, setType] = useState("");
  const [title, setTitle] = useState<any>("");
  const [lessonNumber, setLessonNumber] = useState<number | null>(null);
  const [data, setData] = useState<any>(null);
  const [cheer, setCheer] = useState<{ score: number; total: number } | null>(null);

  const load = async () => {
    if (!id) {
      setError("لا يوجد معرّف للتمرين");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { data: row, error } = await withTimeout(
        supabase
          .from("exercises")
          .select("type, title, lesson_number, data")
          .eq("id", id)
          .maybeSingle()
      );
      if (error) throw error;
      if (!row) throw new Error("التمرين غير موجود (تحقق من المعرّف في الرابط)");
      setType(row.type);
      try { setTitle(typeof row.title === "string" && row.title.trim().startsWith("{") ? JSON.parse(row.title) : row.title); } catch { setTitle(row.title); }
      setLessonNumber(row.lesson_number);
      setData(row.data);
    } catch (e: any) {
      const full = e?.message || e?.error_description || e?.details || JSON.stringify(e);
      setError("خطأ: " + full);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [id]);

  const onComplete = async (s: number, t: number) => {
    setCheer({ score: s, total: t });
    try {
      const { data: auth } = await supabase.auth.getUser();
      if (!auth.user) return;
      const key = lessonNumber != null ? String(lessonNumber) : String(id);
      await saveProgress(auth.user.id, key, s, s === t);
    } catch (e) {
      console.log("تعذّر حفظ النقاط", e);
    }
  };

  if (loading)
    return (
      <p dir="rtl" style={{ textAlign: "center", padding: 40 }}>
        {t("loading")}
      </p>
    );

  if (error)
    return (
      <div dir="rtl" style={{ textAlign: "center", padding: 40 }}>
        <p style={{whiteSpace:"pre-wrap",fontSize:13,direction:"ltr",padding:"0 16px"}}>{error}</p>
        <button
          onClick={() => navigate(-1)}
          style={{ marginTop: 12, padding: "10px 20px", marginLeft: 8 }}
        >
          ← {t("btn_back")}
        </button>
        <button onClick={load} style={{ marginTop: 12, padding: "10px 20px" }}>
          {t("btn_retry")}
        </button>
      </div>
    );

  if (!data) return null;

  let body;
  switch (type) {
    case "arithmetic":
      body = <ArithmeticExercise title={title} instruction={data.instruction} items={data.items} onComplete={onComplete} />;
      break;
    case "count":
      body = <CountExercise title={title} instruction={data.instruction} items={data.items} onComplete={onComplete} />;
      break;
    case "order":
      body = <OrderExercise title={title} instruction={data.instruction} items={data.items} onComplete={onComplete} />;
      break;
    case "mcq":
      body = <McqExercise title={title} instruction={data.instruction} items={data.items} onComplete={onComplete} />;
      break;
    case "color":
      body = <ColorExercise title={title} instruction={data.instruction} palette={data.palette} items={data.items} onComplete={onComplete} />;
      break;
    case "dragdrop":
      body = <DragDropExercise title={title} instruction={data.instruction} slots={data.slots} tokens={data.tokens} onComplete={onComplete} />;
      break;
    case "catch":
      body = <CatchExercise title={title} instruction={data.instruction} rule={data.rule} items={data.items} target={data.target} duration={data.duration} spawnEvery={data.spawnEvery} onComplete={onComplete} />;
      break;
    case "trace":
      body = <TraceExercise title={title} instruction={data.instruction} glyphs={data.glyphs} threshold={data.threshold} onComplete={onComplete} />;
      break;
    case "paint":
      body = <PaintExercise title={title} instruction={data.instruction} colors={data.colors} onComplete={onComplete} />;
      break;
    case "balloon":
      body = <BalloonExercise title={title} instruction={data.instruction} rule={data.rule} items={data.items} target={data.target} duration={data.duration} spawnEvery={data.spawnEvery} onComplete={onComplete} />;
      break;
    case "connect":
      body = <ConnectExercise title={title} instruction={data.instruction} left={data.left} right={data.right} pairs={data.pairs} onComplete={onComplete} />;
      break;
    case "generate":
      body = <GenerateExercise title={title} instruction={data.instruction} mode={data.mode} max={data.max} rounds={data.rounds} onComplete={onComplete} />;
      break;
    case "lesson":
      body = <LessonScene title={title} instruction={data.instruction} scenes={data.scenes} />;
      break;
    default:
      body = <p dir="rtl" style={{ textAlign: "center", padding: 40 }}>{type}</p>;
  }

  return (
    <>
      {body}
      {cheer && (
        <>
          <style>{`@keyframes cheer-pop{0%{transform:scale(.5);opacity:0}60%{transform:scale(1.1)}100%{transform:scale(1);opacity:1}}@keyframes cheer-jump{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}`}</style>
          <div onClick={() => setCheer(null)} style={{ position: "fixed", inset: 0, background: "rgba(7,16,31,.82)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: 24 }}>
            <div dir="rtl" onClick={(e) => e.stopPropagation()} style={{ background: "var(--surface-2)", border: "1px solid var(--gold-border)", borderRadius: 28, padding: "32px 28px", textAlign: "center", maxWidth: 340, width: "100%", boxShadow: "var(--shadow-hero)", animation: "cheer-pop .5s cubic-bezier(.34,1.56,.64,1)" }}>
              <img src={dziadHappy} alt="ديزاد" style={{ width: 150, height: 150, objectFit: "contain", filter: "drop-shadow(0 8px 20px rgba(232,160,32,.4))", animation: "cheer-jump 1.2s ease-in-out infinite" }} />
              <div style={{ fontSize: 22, fontWeight: 900, color: "var(--text)", margin: "12px 0 6px" }}>{cheer.score === cheer.total ? t("cheer_perfect") : t("cheer_good")}</div>
              <div style={{ fontSize: 28, fontWeight: 900, color: "var(--gold)", marginBottom: 20 }}>{cheer.score}/{cheer.total} ⭐</div>
              <button onClick={() => navigate(-1)} style={{ padding: "13px 32px", border: "none", borderRadius: 999, background: "linear-gradient(135deg,var(--gold),var(--gold-deep))", color: "#000", fontFamily: "'Tajawal',sans-serif", fontSize: 15, fontWeight: 800, cursor: "pointer", boxShadow: "0 4px 16px rgba(232,160,32,.35)" }}>{t("cheer_continue")}</button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
