import { useState, useRef } from "react";
import { useLang } from "../../../i18n/LanguageContext";
import { pickLang } from "../../../lib/pickLang";

type Slot = { id: string; label: string; accepts: string };
type Token = { id: string; emoji: string; group: string };

export interface DragDropExerciseProps {
  title: any;
  instruction: any;
  slots: Slot[];
  tokens: Token[];
  onComplete?: (score: number, total: number) => void;
}

const NAVY = "#1B3A6B";
const GOLD = "#E8A020";

export default function DragDropExercise({
  title,
  instruction,
  slots,
  tokens,
  onComplete,
}: DragDropExerciseProps) {
  const { t, lang } = useLang();
  // placement: tokenId -> slotId (or null = bank)
  const [placement, setPlacement] = useState<Record<string, string | null>>(
    () => Object.fromEntries(tokens.map((tk) => [tk.id, null]))
  );
  const [checked, setChecked] = useState(false);
  const [status, setStatus] = useState<Record<string, boolean>>({});
  const dragId = useRef<string | null>(null);

  const place = (tokenId: string, slotId: string | null) => {
    if (checked) return;
    setPlacement((p) => ({ ...p, [tokenId]: slotId }));
  };

  // HTML5 drag (desktop)
  const onDragStart = (id: string) => (dragId.current = id);
  const onDrop = (slotId: string | null) => () => {
    if (dragId.current) place(dragId.current, slotId);
    dragId.current = null;
  };

  // tap fallback (mobile): tap token -> tap slot
  const [picked, setPicked] = useState<string | null>(null);
  const tapToken = (id: string) => {
    if (checked) return;
    setPicked((cur) => (cur === id ? null : id));
  };
  const tapSlot = (slotId: string | null) => {
    if (checked || !picked) return;
    place(picked, slotId);
    setPicked(null);
  };

  const check = () => {
    const next: Record<string, boolean> = {};
    tokens.forEach((tk) => {
      const slotId = placement[tk.id];
      const slot = slots.find((s) => s.id === slotId);
      next[tk.id] = !!slot && slot.accepts === tk.group;
    });
    setStatus(next);
    setChecked(true);
    const score = Object.values(next).filter(Boolean).length;
    onComplete?.(score, tokens.length);
  };

  const reset = () => {
    setPlacement(Object.fromEntries(tokens.map((tk) => [tk.id, null])));
    setStatus({});
    setChecked(false);
    setPicked(null);
  };

  const score = Object.values(status).filter(Boolean).length;
  const allPlaced = tokens.every((tk) => placement[tk.id] !== null);
  const bankTokens = tokens.filter((tk) => placement[tk.id] === null);

  const tokenBox = (tk: Token) => {
    const st = checked ? status[tk.id] : null;
    const isPicked = picked === tk.id;
    return (
      <span
        key={tk.id}
        draggable={!checked}
        onDragStart={() => onDragStart(tk.id)}
        onClick={() => tapToken(tk.id)}
        style={{
          fontSize: 34,
          lineHeight: 1,
          padding: "8px 10px",
          borderRadius: 14,
          cursor: checked ? "default" : "grab",
          userSelect: "none",
          background:
            st === true ? "#EAF7F0" : st === false ? "#FDECEC" : "#FFFBF2",
          border:
            "2px " +
            (isPicked ? "solid " + NAVY : "dashed " + (st === true ? "#1FA463" : st === false ? "#E0413E" : GOLD)),
          transform: isPicked ? "scale(1.08)" : "none",
          transition: "transform .12s",
        }}
      >
        {tk.emoji}
      </span>
    );
  };

  return (
    <div
      dir={lang === "ar" ? "rtl" : "ltr"}
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

      {/* slots */}
      <div style={{ display: "grid", gap: 14 }}>
        {slots.map((slot) => {
          const inside = tokens.filter((tk) => placement[tk.id] === slot.id);
          return (
            <div
              key={slot.id}
              onDragOver={(e) => e.preventDefault()}
              onDrop={onDrop(slot.id)}
              onClick={() => tapSlot(slot.id)}
              style={{
                background: "#fff",
                border: "2px solid #D9DEE8",
                borderRadius: 16,
                padding: 14,
                minHeight: 84,
                boxShadow: "0 2px 6px rgba(27,58,107,0.06)",
              }}
            >
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>
                {pickLang(slot.label, lang)}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, minHeight: 44 }}>
                {inside.map(tokenBox)}
              </div>
            </div>
          );
        })}
      </div>

      {/* bank */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop(null)}
        onClick={() => tapSlot(null)}
        style={{
          marginTop: 16,
          background: "#F4F6FA",
          border: "2px dashed #C9CFDB",
          borderRadius: 16,
          padding: 14,
          minHeight: 70,
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {bankTokens.length ? bankTokens.map(tokenBox) : (
          <span style={{ fontSize: 14, opacity: 0.5 }}>—</span>
        )}
      </div>

      {checked && (
        <div
          style={{
            marginTop: 18,
            textAlign: "center",
            fontSize: 18,
            fontWeight: 800,
            color: score === tokens.length ? "#1FA463" : NAVY,
          }}
        >
          {score === tokens.length
            ? t("result_perfect")
            : t("result_partial_a") + " " + score + " " + t("result_partial_b") + " " + tokens.length + " " + t("result_partial_c")}
        </div>
      )}

      <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
        {!checked || score < tokens.length ? (
          <button
            onClick={check}
            disabled={!allPlaced}
            style={{
              flex: 1,
              height: 54,
              fontSize: 18,
              fontWeight: 800,
              color: "#fff",
              background: allPlaced ? GOLD : "#C9CBD1",
              border: "none",
              borderRadius: 14,
              cursor: allPlaced ? "pointer" : "not-allowed",
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
