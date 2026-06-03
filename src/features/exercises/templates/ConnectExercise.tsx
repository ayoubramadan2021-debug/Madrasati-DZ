import { useState } from "react";
import { useLang } from "../../../i18n/LanguageContext";
import { pickLang } from "../../../lib/pickLang";

type Node = { id: string; label: string };
type Pair = { left: string; right: string };

export interface ConnectExerciseProps {
  title: any;
  instruction: any;
  left: Node[];
  right: Node[];
  pairs: Pair[];
  onComplete?: (score: number, total: number) => void;
}

const NAVY = "#1B3A6B";
const GOLD = "#E8A020";
const GREEN = "#1FA463";
const RED = "#E0413E";

export default function ConnectExercise({
  title,
  instruction,
  left,
  right,
  pairs,
  onComplete,
}: ConnectExerciseProps) {
  const { t, lang } = useLang();
  const [solved, setSolved] = useState<Set<string>>(new Set()); // pair keys done (leftId)
  const [activeLeft, setActiveLeft] = useState<string | null>(null);
  const [activeRight, setActiveRight] = useState<string | null>(null);
  const [wrong, setWrong] = useState<{ left: string; right: string } | null>(null);
  const [done, setDone] = useState(false);

  const isPaired = (l: string, r: string) =>
    pairs.some((p) => p.left === l && p.right === r);

  const isGone = (side: "l" | "r", id: string) => {
    if (side === "l") return solved.has(id);
    return [...solved].some((lid) => pairs.find((p) => p.left === lid)?.right === id);
  };

  const evaluate = (l: string, r: string) => {
    if (isPaired(l, r)) {
      const next = new Set(solved);
      next.add(l);
      setSolved(next);
      setActiveLeft(null);
      setActiveRight(null);
      setWrong(null);
      if (next.size >= pairs.length) {
        setDone(true);
        onComplete?.(pairs.length, pairs.length);
      }
    } else {
      // flash red, keep both selectable
      setWrong({ left: l, right: r });
      setActiveLeft(null);
      setActiveRight(null);
      setTimeout(() => setWrong(null), 600);
    }
  };

  const tapLeft = (id: string) => {
    if (done || isGone("l", id)) return;
    if (activeRight) evaluate(id, activeRight);
    else setActiveLeft((c) => (c === id ? null : id));
  };
  const tapRight = (id: string) => {
    if (done || isGone("r", id)) return;
    if (activeLeft) evaluate(activeLeft, id);
    else setActiveRight((c) => (c === id ? null : id));
  };

  const reset = () => {
    setSolved(new Set());
    setActiveLeft(null);
    setActiveRight(null);
    setWrong(null);
    setDone(false);
  };

  const stateOf = (side: "l" | "r", id: string): "none" | "active" | "wrong" => {
    if (wrong && ((side === "l" && wrong.left === id) || (side === "r" && wrong.right === id)))
      return "wrong";
    if ((side === "l" && activeLeft === id) || (side === "r" && activeRight === id))
      return "active";
    return "none";
  };

  const nodeStyle = (st: "none" | "active" | "wrong"): any => ({
    background: st === "wrong" ? "#FDECEC" : "#fff",
    border:
      "2px solid " +
      (st === "wrong" ? RED : st === "active" ? NAVY : "#D9DEE8"),
    borderRadius: 14,
    padding: "16px 10px",
    fontSize: 20,
    fontWeight: 800,
    textAlign: "center",
    color: st === "wrong" ? RED : NAVY,
    boxShadow: st === "active" ? "0 0 0 3px rgba(27,58,107,.15)" : "0 2px 6px rgba(27,58,107,0.06)",
    cursor: "pointer",
    userSelect: "none",
    transition: "border-color .15s, background .15s, box-shadow .15s, opacity .25s",
  });

  return (
    <div
      dir={lang === "ar" ? "rtl" : "ltr"}
      style={{
        fontFamily: "'Tajawal','Cairo',system-ui,sans-serif",
        maxWidth: 480, margin: "0 auto", padding: "20px 16px 120px", color: NAVY,
      }}
    >
      <h2 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 4px" }}>{pickLang(title, lang)}</h2>
      <p style={{ fontSize: 15, opacity: 0.8, margin: "0 0 20px" }}>{pickLang(instruction, lang)}</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ display: "grid", gap: 14 }}>
          {left.map((n) =>
            isGone("l", n.id) ? (
              <div key={n.id} style={{ opacity: 0, pointerEvents: "none", padding: "16px 10px", fontSize: 20 }} aria-hidden>·</div>
            ) : (
              <div key={n.id} onClick={() => tapLeft(n.id)} style={nodeStyle(stateOf("l", n.id))}>
                {n.label}
              </div>
            )
          )}
        </div>
        <div style={{ display: "grid", gap: 14 }}>
          {right.map((n) =>
            isGone("r", n.id) ? (
              <div key={n.id} style={{ opacity: 0, pointerEvents: "none", padding: "16px 10px", fontSize: 20 }} aria-hidden>·</div>
            ) : (
              <div key={n.id} onClick={() => tapRight(n.id)} style={nodeStyle(stateOf("r", n.id))}>
                {n.label}
              </div>
            )
          )}
        </div>
      </div>

      {done ? (
        <div style={{ marginTop: 22, textAlign: "center", fontSize: 18, fontWeight: 800, color: GREEN }}>
          {t("result_perfect")} ⭐
          <div style={{ marginTop: 16 }}>
            <button onClick={reset} style={{ height: 54, padding: "0 36px", fontSize: 18, fontWeight: 800, color: NAVY, background: "#fff", border: "2px solid " + NAVY, borderRadius: 14, cursor: "pointer", fontFamily: "inherit" }}>{t("btn_retry")}</button>
          </div>
        </div>
      ) : (
        <p style={{ marginTop: 18, textAlign: "center", fontSize: 14, opacity: 0.7, fontWeight: 700 }} dir="ltr">
          {solved.size} / {pairs.length}
        </p>
      )}
    </div>
  );
}
