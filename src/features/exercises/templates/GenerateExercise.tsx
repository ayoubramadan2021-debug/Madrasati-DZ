import { useState, useCallback, useEffect } from "react";
import { useLang } from "../../../i18n/LanguageContext";
import { pickLang } from "../../../lib/pickLang";

export interface GenerateExerciseProps {
  title: any;
  instruction: any;
  mode?: "add" | "sub";
  max?: number;
  rounds?: number; // 0 = endless until user ends
  onComplete?: (score: number, total: number) => void;
}

const NAVY = "#1B3A6B";
const GOLD = "#E8A020";
const GREEN = "#1FA463";
const RED = "#E0413E";

type Q = { a: number; b: number; op: "+" | "-"; answer: number; choices: number[] };

const rint = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

function makeQuestion(mode: "add" | "sub", max: number): Q {
  let a: number, b: number, answer: number, op: "+" | "-";
  if (mode === "sub") {
    a = rint(1, max);
    b = rint(0, a);
    answer = a - b;
    op = "-";
  } else {
    answer = rint(0, max);
    a = rint(0, answer);
    b = answer - a;
    op = "+";
  }
  // build 3 distinct wrong choices near the answer
  const set = new Set<number>([answer]);
  while (set.size < 4) {
    const delta = rint(-3, 3);
    const cand = answer + delta;
    if (cand >= 0 && cand <= max + 2) set.add(cand);
  }
  const choices = [...set].sort(() => Math.random() - 0.5);
  return { a, b, op, answer, choices };
}

export default function GenerateExercise({
  title,
  instruction,
  mode = "add",
  max = 10,
  rounds = 10,
  onComplete,
}: GenerateExerciseProps) {
  const { t, lang } = useLang();
  const [q, setQ] = useState<Q>(() => makeQuestion(mode, max));
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  const next = useCallback(() => {
    if (rounds > 0 && round >= rounds) {
      setDone(true);
      return;
    }
    setQ(makeQuestion(mode, max));
    setRound((r) => r + 1);
    setPicked(null);
  }, [mode, max, rounds, round]);

  useEffect(() => {
    if (done) onComplete?.(score, rounds > 0 ? rounds : round);
  }, [done]); // eslint-disable-line

  const choose = (val: number) => {
    if (picked != null) return;
    setPicked(val);
    if (val === q.answer) setScore((s) => s + 1);
    setTimeout(next, 750);
  };

  const endNow = () => setDone(true);

  const restart = () => {
    setQ(makeQuestion(mode, max));
    setRound(1);
    setScore(0);
    setPicked(null);
    setDone(false);
  };

  const wrap = (children: any) => (
    <div
      dir={lang === "ar" ? "rtl" : "ltr"}
      style={{
        fontFamily: "'Tajawal','Cairo',system-ui,sans-serif",
        maxWidth: 480, margin: "0 auto", padding: "20px 16px 120px", color: NAVY,
      }}
    >
      <h2 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 4px" }}>{pickLang(title, lang)}</h2>
      <p style={{ fontSize: 15, opacity: 0.8, margin: "0 0 16px" }}>{pickLang(instruction, lang)}</p>
      {children}
    </div>
  );

  if (done) {
    const total = rounds > 0 ? rounds : round;
    return wrap(
      <div style={{ textAlign: "center", fontSize: 20, fontWeight: 800, color: score >= total ? GREEN : NAVY, padding: "30px 0" }}>
        {score >= total ? t("result_perfect") : score + " / " + total} ⭐
        <div style={{ marginTop: 18 }}>
          <button onClick={restart} style={{ height: 54, padding: "0 36px", fontSize: 18, fontWeight: 800, color: NAVY, background: "#fff", border: "2px solid " + NAVY, borderRadius: 14, cursor: "pointer", fontFamily: "inherit" }}>{t("btn_retry")}</button>
        </div>
      </div>
    );
  }

  return wrap(
    <>
      <style>{`@keyframes wrong-flash{0%,100%{background:#FDECEC}50%{background:#F8B4B4}}`}</style>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 16, fontWeight: 800, marginBottom: 16 }}>
        <span dir="ltr">{rounds > 0 ? round + " / " + rounds : "∞"}</span>
        <span style={{ color: GOLD }}>⭐ {score}</span>
      </div>

      <div style={{
        background: "#fff", border: "2px solid #D9DEE8", borderRadius: 18,
        padding: "32px 20px", textAlign: "center", boxShadow: "0 2px 6px rgba(27,58,107,0.06)",
        marginBottom: 20,
      }}>
        <div dir="ltr" style={{ fontSize: 44, fontWeight: 900, color: NAVY, letterSpacing: 2 }}>
          {q.a} {q.op} {q.b} ={" "}
          {picked != null ? (
            <span style={{ color: GREEN }}>{q.answer}</span>
          ) : (
            <span>?</span>
          )}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {q.choices.map((c) => {
          const isPicked = picked === c;
          const isAnswer = c === q.answer;
          let bg = "#fff", border = "#D9DEE8", color = NAVY;
          if (picked != null) {
            if (isAnswer) { bg = "#EAF7F0"; border = GREEN; color = GREEN; }
            else if (isPicked) { bg = "#FDECEC"; border = RED; color = RED; }
          }
          const wrongPick = picked != null && isPicked && !isAnswer;
          return (
            <button
              key={c}
              onClick={() => choose(c)}
              disabled={picked != null}
              style={{
                height: 72, fontSize: 30, fontWeight: 900, color,
                background: bg, border: "2px solid " + border, borderRadius: 16,
                cursor: picked == null ? "pointer" : "default", fontFamily: "inherit",
                transition: "background .15s, border-color .15s, color .15s",
                animation: wrongPick ? "wrong-flash .3s ease-in-out 2" : "none",
              }}
            >
              {c}
            </button>
          );
        })}
      </div>

      {rounds === 0 && (
        <button onClick={endNow} style={{ width: "100%", height: 50, marginTop: 18, fontSize: 16, fontWeight: 800, color: NAVY, background: "#fff", border: "2px solid " + NAVY, borderRadius: 14, cursor: "pointer", fontFamily: "inherit" }}>
          {t("btn_done") || "إنهاء"}
        </button>
      )}
    </>
  );
}
