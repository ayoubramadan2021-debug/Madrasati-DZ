import { useState } from "react";
import { useLang } from "../../../i18n/LanguageContext";

type CountItem = { emoji: string; count: number; answer: number };

export interface CountExerciseProps {
  title: string;
  instruction: string;
  items: CountItem[];
  onComplete?: (score: number, total: number) => void;
}

const NAVY = "#1B3A6B";
const GOLD = "#E8A020";

export default function CountExercise({
  title,
  instruction,
  items,
  onComplete,
}: CountExerciseProps) {
  const { t } = useLang();
  const [values, setValues] = useState<string[]>(() => items.map(() => ""));
  const [status, setStatus] = useState<(boolean | null)[]>(() =>
    items.map(() => null)
  );
  const [checked, setChecked] = useState(false);

  const setValue = (i: number, v: string) => {
    const clean = v.replace(/[^0-9]/g, "").slice(0, 2);
    setValues((prev) => prev.map((x, idx) => (idx === i ? clean : x)));
  };

  const check = () => {
    const next = items.map((it, i) => Number(values[i]) === it.answer);
    setStatus(next);
    setChecked(true);
    const score = next.filter(Boolean).length;
    onComplete?.(score, items.length);
  };

  const reset = () => {
    setValues(items.map(() => ""));
    setStatus(items.map(() => null));
    setChecked(false);
  };

  const score = status.filter((s) => s === true).length;
  const allAnswered = values.every((v) => v !== "");

  return (
    <div
      dir="rtl"
      style={{
        fontFamily: "'Tajawal','Cairo',system-ui,sans-serif",
        maxWidth: 480,
        margin: "0 auto",
        padding: "20px 16px 120px",
        color: NAVY,
      }}
    >
      <h2 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 4px" }}>
        {title}
      </h2>
      <p style={{ fontSize: 15, opacity: 0.8, margin: "0 0 20px" }}>
        {instruction}
      </p>

      <div style={{ display: "grid", gap: 12 }}>
        {items.map((it, i) => {
          const st = status[i];
          const borderColor =
            st === true ? "#1FA463" : st === false ? "#E0413E" : "#D9DEE8";
          return (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
                background: "#fff",
                border: "2px solid " + borderColor,
                borderRadius: 16,
                padding: "16px",
                boxShadow: "0 2px 6px rgba(27,58,107,0.06)",
                transition: "border-color .2s",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: 8,
                  fontSize: 34,
                  lineHeight: 1.2,
                }}
              >
                {Array.from({ length: it.count }).map((_, k) => (
                  <span key={k}>{it.emoji}</span>
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 20, fontWeight: 700 }}>{t("count_question")}</span>
                <input
                  inputMode="numeric"
                  value={values[i]}
                  onChange={(e) => setValue(i, e.target.value)}
                  disabled={checked && st === true}
                  style={{
                    width: 64,
                    height: 52,
                    textAlign: "center",
                    fontSize: 26,
                    fontWeight: 800,
                    color: NAVY,
                    border: "2px dashed " + (st === true ? "#1FA463" : GOLD),
                    borderRadius: 12,
                    outline: "none",
                    background: st === true ? "#EAF7F0" : "#FFFBF2",
                  }}
                />
                {st === true && <span style={{ fontSize: 22 }}>✅</span>}
                {st === false && <span style={{ fontSize: 22 }}>🔄</span>}
              </div>
            </div>
          );
        })}
      </div>

      {checked && (
        <div
          style={{
            marginTop: 18,
            textAlign: "center",
            fontSize: 18,
            fontWeight: 800,
            color: score === items.length ? "#1FA463" : NAVY,
          }}
        >
          {score === items.length
            ? t("result_perfect")
            : t("result_partial_a") + " " + score + " " + t("result_partial_b") + " " + items.length + " " + t("result_partial_c")}
        </div>
      )}

      <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
        {!checked || score < items.length ? (
          <button
            onClick={check}
            disabled={!allAnswered}
            style={{
              flex: 1,
              height: 54,
              fontSize: 18,
              fontWeight: 800,
              color: "#fff",
              background: allAnswered ? GOLD : "#C9CBD1",
              border: "none",
              borderRadius: 14,
              cursor: allAnswered ? "pointer" : "not-allowed",
              fontFamily: "inherit",
            }}
          >
            {t("btn_check")}
          </button>
        ) : null}

        {checked && (
          <button
            onClick={reset}
            style={{
              flex: 1,
              height: 54,
              fontSize: 18,
              fontWeight: 800,
              color: NAVY,
              background: "#fff",
              border: "2px solid " + NAVY,
              borderRadius: 14,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            {t("btn_retry")}
          </button>
        )}
      </div>
    </div>
  );
}
