import { useState } from "react";
import { useLang } from "../../../i18n/LanguageContext";
import { pickLang } from "../../../lib/pickLang";

type ColorChoice = { name: string; color: string };
type ColorItem = { emoji: string; target: string };

export interface ColorExerciseProps {
  title: any;
  instruction: any;
  palette: ColorChoice[];
  items: ColorItem[];
  onComplete?: (score: number, total: number) => void;
}

const NAVY = "#1B3A6B";
const GOLD = "#E8A020";

export default function ColorExercise({
  title,
  instruction,
  palette,
  items,
  onComplete,
}: ColorExerciseProps) {
  const { t, lang } = useLang();
  const [active, setActive] = useState<string>(palette[0]?.color || GOLD);
  const [fills, setFills] = useState<(string | null)[]>(() => items.map(() => null));
  const [status, setStatus] = useState<(boolean | null)[]>(() => items.map(() => null));
  const [checked, setChecked] = useState(false);

  const paint = (i: number) => {
    if (checked && status[i] === true) return;
    setFills((prev) => prev.map((x, idx) => (idx === i ? active : x)));
  };

  const check = () => {
    const next = items.map((it, i) => fills[i] === it.target);
    setStatus(next);
    setChecked(true);
    onComplete?.(next.filter(Boolean).length, items.length);
  };

  const reset = () => {
    setFills(items.map(() => null));
    setStatus(items.map(() => null));
    setChecked(false);
  };

  const score = status.filter((s) => s === true).length;
  const allFilled = fills.every((f) => f !== null);

  return (
    <div
      dir="rtl"
      style={{
        fontFamily: "Tajawal,Cairo,system-ui,sans-serif",
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

      {/* لوحة الألوان */}
      <div style={{ display: "flex", justifyContent: "center", gap: 14, marginBottom: 22 }}>
        {palette.map((p) => (
          <button
            key={p.color}
            onClick={() => setActive(p.color)}
            title={p.name}
            style={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              background: p.color,
              border: active === p.color ? "4px solid " + NAVY : "4px solid #fff",
              boxShadow: "0 2px 8px rgba(27,58,107,0.25)",
              cursor: "pointer",
              transition: "transform .15s",
              transform: active === p.color ? "scale(1.12)" : "scale(1)",
            }}
          />
        ))}
      </div>

      {/* العناصر */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(90px,1fr))",
          gap: 12,
        }}
      >
        {items.map((it, i) => {
          const st = status[i];
          const borderColor =
            st === true ? "#1FA463" : st === false ? "#E0413E" : "#D9DEE8";
          return (
            <button
              key={i}
              onClick={() => paint(i)}
              style={{
                position: "relative",
                aspectRatio: "1",
                background: fills[i] || "#fff",
                border: "3px solid " + borderColor,
                borderRadius: 16,
                fontSize: 40,
                display: "grid",
                placeItems: "center",
                cursor: "pointer",
                transition: "background .2s,border-color .2s",
                fontFamily: "inherit",
              }}
            >
              <span style={{ filter: fills[i] ? "grayscale(0.15)" : "none" }}>{it.emoji}</span>
              {st === true && (
                <span style={{ position: "absolute", top: 4, left: 4, fontSize: 18 }}>✅</span>
              )}
              {st === false && (
                <span style={{ position: "absolute", top: 4, left: 4, fontSize: 18 }}>🔄</span>
              )}
            </button>
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
            disabled={!allFilled}
            style={{
              flex: 1,
              height: 54,
              fontSize: 18,
              fontWeight: 800,
              color: "#fff",
              background: allFilled ? GOLD : "#C9CBD1",
              border: "none",
              borderRadius: 14,
              cursor: allFilled ? "pointer" : "not-allowed",
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
