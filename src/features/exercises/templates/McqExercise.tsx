import { useState } from "react";
import { useLang } from "../../../i18n/LanguageContext";
import { pickLang } from "../../../lib/pickLang";

type McqItem = { question: any; options: any[]; answer: number };

export interface McqExerciseProps {
  title: any;
  instruction: any;
  items: McqItem[];
  onComplete?: (score: number, total: number) => void;
}

const NAVY = "#1B3A6B";
const GOLD = "#E8A020";

export default function McqExercise({
  title,
  instruction,
  items,
  onComplete,
}: McqExerciseProps) {
  const { t, lang } = useLang();
  const [choices, setChoices] = useState<(number | null)[]>(() =>
    items.map(() => null)
  );
  const [checked, setChecked] = useState(false);

  const choose = (qi: number, oi: number) => {
    if (checked) return;
    setChoices((prev) => prev.map((c, i) => (i === qi ? oi : c)));
  };

  const check = () => {
    setChecked(true);
    const score = items.filter((it, i) => choices[i] === it.answer).length;
    onComplete?.(score, items.length);
  };

  const reset = () => {
    setChoices(items.map(() => null));
    setChecked(false);
  };

  const allAnswered = choices.every((c) => c !== null);
  const score = items.filter((it, i) => choices[i] === it.answer).length;

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
          const chosen = choices[qi];
          return (
            <div
              key={qi}
              style={{
                background: "#fff",
                border: "2px solid #D9DEE8",
                borderRadius: 16,
                padding: "16px",
                boxShadow: "0 2px 6px rgba(27,58,107,0.06)",
              }}
            >
              <p
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  margin: "0 0 14px",
                  textAlign: "center",
                }}
              >
                {pickLang(it.question, lang)}
              </p>

              <div style={{ display: "grid", gap: 10 }}>
                {it.options.map((opt, oi) => {
                  const isChosen = chosen === oi;
                  const isCorrect = oi === it.answer;
                  let bg = "#FFFBF2";
                  let border = GOLD;
                  let color = NAVY;
                  if (checked) {
                    if (isCorrect) {
                      bg = "#EAF7F0";
                      border = "#1FA463";
                      color = "#1FA463";
                    } else if (isChosen) {
                      bg = "#FDE7E7";
                      border = "#E0413E";
                      color = "#E0413E";
                    } else {
                      bg = "#F5F6F8";
                      border = "#E5E7EB";
                      color = "#9AA0AA";
                    }
                  } else if (isChosen) {
                    bg = "#FFF3D6";
                    border = GOLD;
                  }
                  return (
                    <button
                      key={oi}
                      onClick={() => choose(qi, oi)}
                      disabled={checked}
                      style={{
                        width: "100%",
                        minHeight: 50,
                        fontSize: 17,
                        fontWeight: 700,
                        color,
                        background: bg,
                        border: "2px solid " + border,
                        borderRadius: 12,
                        cursor: checked ? "default" : "pointer",
                        fontFamily: "inherit",
                        textAlign: "right",
                        padding: "10px 16px",
                        transition: "all .15s",
                      }}
                    >
                      {pickLang(opt, lang)}
                      {checked && isCorrect && " ✅"}
                      {checked && isChosen && !isCorrect && " ❌"}
                    </button>
                  );
                })}
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
