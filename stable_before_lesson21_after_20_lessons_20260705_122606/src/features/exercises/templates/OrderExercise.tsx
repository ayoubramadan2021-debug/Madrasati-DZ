import { useState } from "react";
import { useLang } from "../../../i18n/LanguageContext";
import { pickLang } from "../../../lib/pickLang";

type OrderItem = { numbers: number[] };

export interface OrderExerciseProps {
  title: any;
  instruction: any;
  items: OrderItem[];
  onComplete?: (score: number, total: number) => void;
}

const NAVY = "#1B3A6B";
const GOLD = "#E8A020";

function sortedAsc(nums: number[]) {
  return [...nums].sort((a, b) => a - b);
}

export default function OrderExercise({
  title,
  instruction,
  items,
  onComplete,
}: OrderExerciseProps) {
  const { t, lang } = useLang();
  const [picked, setPicked] = useState<number[][]>(() => items.map(() => []));
  const [wrong, setWrong] = useState<(number | null)[]>(() =>
    items.map(() => null)
  );
  const [checked, setChecked] = useState(false);

  const pick = (qi: number, value: number, idx: number) => {
    if (checked) return;
    const target = sortedAsc(items[qi].numbers);
    const current = picked[qi];
    const nextPos = current.length;
    if (target[nextPos] === value && !current.includes(idx)) {
      setPicked((prev) =>
        prev.map((arr, i) => (i === qi ? [...arr, idx] : arr))
      );
      setWrong((prev) => prev.map((w, i) => (i === qi ? null : w)));
    } else {
      setWrong((prev) => prev.map((w, i) => (i === qi ? idx : w)));
      setTimeout(() => {
        setWrong((prev) => prev.map((w, i) => (i === qi ? null : w)));
      }, 500);
    }
  };

  const undo = (qi: number) => {
    if (checked) return;
    setPicked((prev) =>
      prev.map((arr, i) => (i === qi ? arr.slice(0, -1) : arr))
    );
  };

  const check = () => {
    const next = items.map((it, qi) => {
      const target = sortedAsc(it.numbers);
      const answer = picked[qi].map((idx) => it.numbers[idx]);
      return (
        answer.length === target.length &&
        answer.every((v, k) => v === target[k])
      );
    });
    setChecked(true);
    const score = next.filter(Boolean).length;
    onComplete?.(score, items.length);
  };

  const reset = () => {
    setPicked(items.map(() => []));
    setWrong(items.map(() => null));
    setChecked(false);
  };

  const allDone = picked.every((arr, i) => arr.length === items[i].numbers.length);
  const score = items.filter((it, qi) => {
    const target = sortedAsc(it.numbers);
    const answer = picked[qi].map((idx) => it.numbers[idx]);
    return (
      answer.length === target.length && answer.every((v, k) => v === target[k])
    );
  }).length;

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
        {pickLang(title, lang)}
      </h2>
      <p style={{ fontSize: 15, opacity: 0.8, margin: "0 0 20px" }}>
        {pickLang(instruction, lang)}
      </p>

      <div style={{ display: "grid", gap: 20 }}>
        {items.map((it, qi) => {
          const current = picked[qi];
          const done = current.length === it.numbers.length;
          return (
            <div
              key={qi}
              style={{
                background: "#fff",
                border: "2px solid " + (checked ? (done ? "#1FA463" : "#E0413E") : "#D9DEE8"),
                borderRadius: 16,
                padding: "16px",
                boxShadow: "0 2px 6px rgba(27,58,107,0.06)",
              }}
            >
              <div
                style={{
                  minHeight: 56,
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                  justifyContent: "center",
                  alignItems: "center",
                  background: "#EAF7F0",
                  borderRadius: 12,
                  padding: "8px",
                  marginBottom: 14,
                }}
              >
                {current.length === 0 ? (
                  <span style={{ opacity: 0.5, fontSize: 14 }}>
                    {t("order_hint")}
                  </span>
                ) : (
                  current.map((idx, k) => (
                    <span
                      key={k}
                      style={{
                        fontSize: 24,
                        fontWeight: 800,
                        color: "#1FA463",
                        minWidth: 40,
                        textAlign: "center",
                      }}
                    >
                      {it.numbers[idx]}
                    </span>
                  ))
                )}
              </div>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 10,
                  justifyContent: "center",
                }}
              >
                {it.numbers.map((n, idx) => {
                  const used = current.includes(idx);
                  const isWrong = wrong[qi] === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => pick(qi, n, idx)}
                      disabled={used || checked}
                      style={{
                        width: 56,
                        height: 56,
                        fontSize: 24,
                        fontWeight: 800,
                        color: used ? "#C9CBD1" : NAVY,
                        background: isWrong ? "#FDE7E7" : used ? "#F0F1F4" : "#FFFBF2",
                        border: "2px solid " + (isWrong ? "#E0413E" : used ? "#E5E7EB" : GOLD),
                        borderRadius: 12,
                        cursor: used || checked ? "default" : "pointer",
                        fontFamily: "inherit",
                        transition: "all .15s",
                      }}
                    >
                      {n}
                    </button>
                  );
                })}
              </div>

              {current.length > 0 && !checked && (
                <div style={{ textAlign: "center", marginTop: 12 }}>
                  <button
                    onClick={() => undo(qi)}
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: NAVY,
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "inherit",
                    }}
                  >
                    ↩ تراجع
                  </button>
                </div>
              )}
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
            disabled={!allDone}
            style={{
              flex: 1,
              height: 54,
              fontSize: 18,
              fontWeight: 800,
              color: "#fff",
              background: allDone ? GOLD : "#C9CBD1",
              border: "none",
              borderRadius: 14,
              cursor: allDone ? "pointer" : "not-allowed",
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
