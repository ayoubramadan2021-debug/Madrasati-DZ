import { useState, useRef, useEffect } from "react";
import { useLang } from "../../../i18n/LanguageContext";
import { pickLang } from "../../../lib/pickLang";

export interface PaintExerciseProps {
  title: any;
  instruction: any;
  colors?: string[];
  onComplete?: (score: number, total: number) => void;
}

const NAVY = "#1B3A6B";
const GOLD = "#E8A020";
const DEFAULT_COLORS = [
  "#E0413E", "#E8A020", "#F4D03F", "#1FA463",
  "#2D9CDB", "#1B3A6B", "#9B51E0", "#6B4226",
  "#FF8FA3", "#000000",
];

export default function PaintExercise({
  title,
  instruction,
  colors = DEFAULT_COLORS,
  onComplete,
}: PaintExerciseProps) {
  const { t, lang } = useLang();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);

  const [color, setColor] = useState(colors[0]);
  const [size, setSize] = useState(14);
  const [erasing, setErasing] = useState(false);
  const [done, setDone] = useState(false);

  const colorRef = useRef(color);
  const sizeRef = useRef(size);
  const eraseRef = useRef(erasing);
  useEffect(() => { colorRef.current = color; }, [color]);
  useEffect(() => { sizeRef.current = size; }, [size]);
  useEffect(() => { eraseRef.current = erasing; }, [erasing]);

  // setup canvas (handle DPR for crisp lines)
  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = cv.getBoundingClientRect();
    cv.width = rect.width * dpr;
    cv.height = rect.height * dpr;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, rect.width, rect.height);
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctxRef.current = ctx;
  }, []);

  const pos = (clientX: number, clientY: number) => {
    const cv = canvasRef.current;
    if (!cv) return { x: 0, y: 0 };
    const r = cv.getBoundingClientRect();
    return { x: clientX - r.left, y: clientY - r.top };
  };

  const stroke = (x: number, y: number) => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    ctx.strokeStyle = eraseRef.current ? "#ffffff" : colorRef.current;
    ctx.lineWidth = eraseRef.current ? sizeRef.current * 2.4 : sizeRef.current;
    ctx.beginPath();
    const p = last.current || { x, y };
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(x, y);
    ctx.stroke();
    last.current = { x, y };
  };

  const start = (cx: number, cy: number) => {
    drawing.current = true;
    const p = pos(cx, cy);
    last.current = p;
    stroke(p.x, p.y); // dot on tap
  };
  const move = (cx: number, cy: number) => {
    if (!drawing.current) return;
    const p = pos(cx, cy);
    stroke(p.x, p.y);
  };
  const end = () => {
    drawing.current = false;
    last.current = null;
  };

  const clear = () => {
    const cv = canvasRef.current;
    const ctx = ctxRef.current;
    if (!cv || !ctx) return;
    const r = cv.getBoundingClientRect();
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, r.width, r.height);
  };

  const finish = () => {
    setDone(true);
    onComplete?.(1, 1);
  };

  const wrap = (children: any) => (
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
      <p style={{ fontSize: 15, opacity: 0.8, margin: "0 0 16px" }}>
        {pickLang(instruction, lang)}
      </p>
      {children}
    </div>
  );

  if (done) {
    return wrap(
      <div style={{ textAlign: "center", fontSize: 20, fontWeight: 800, color: "#1FA463", padding: "30px 0" }}>
        {t("result_perfect")} 🎨
        <div style={{ marginTop: 18 }}>
          <button
            onClick={() => setDone(false)}
            style={{
              height: 54, padding: "0 36px", fontSize: 18, fontWeight: 800,
              color: NAVY, background: "#fff", border: "2px solid " + NAVY,
              borderRadius: 14, cursor: "pointer", fontFamily: "inherit",
            }}
          >
            {t("btn_retry")}
          </button>
        </div>
      </div>
    );
  }

  return wrap(
    <>
      <canvas
        ref={canvasRef}
        onMouseDown={(e) => start(e.clientX, e.clientY)}
        onMouseMove={(e) => move(e.clientX, e.clientY)}
        onMouseUp={end}
        onMouseLeave={end}
        onTouchStart={(e) => e.touches[0] && start(e.touches[0].clientX, e.touches[0].clientY)}
        onTouchMove={(e) => e.touches[0] && move(e.touches[0].clientX, e.touches[0].clientY)}
        onTouchEnd={end}
        style={{
          width: "100%",
          aspectRatio: "1 / 1",
          background: "#fff",
          border: "2px solid #D9DEE8",
          borderRadius: 18,
          touchAction: "none",
          boxShadow: "0 2px 6px rgba(27,58,107,0.06)",
          display: "block",
        }}
      />

      {/* colors */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 14, justifyContent: "center" }}>
        {colors.map((c) => (
          <button
            key={c}
            onClick={() => { setColor(c); setErasing(false); }}
            style={{
              width: 38, height: 38, borderRadius: "50%", background: c,
              border: color === c && !erasing ? "3px solid " + NAVY : "3px solid #fff",
              boxShadow: "0 1px 4px rgba(0,0,0,.2)", cursor: "pointer",
            }}
          />
        ))}
      </div>

      {/* tools */}
      <div style={{ display: "flex", gap: 10, marginTop: 14, alignItems: "center", justifyContent: "center" }}>
        <button
          onClick={() => setErasing((e) => !e)}
          style={{
            height: 44, padding: "0 16px", fontSize: 15, fontWeight: 800,
            color: erasing ? "#fff" : NAVY, background: erasing ? NAVY : "#fff",
            border: "2px solid " + NAVY, borderRadius: 12, cursor: "pointer", fontFamily: "inherit",
          }}
        >
          🧽 {lang === "ar" ? "ممحاة" : "Gomme"}
        </button>
        {[8, 14, 22].map((s) => (
          <button
            key={s}
            onClick={() => setSize(s)}
            style={{
              width: 44, height: 44, borderRadius: 12, background: size === s ? GOLD : "#fff",
              border: "2px solid " + (size === s ? GOLD : "#D9DEE8"), cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <span style={{ width: s, height: s, borderRadius: "50%", background: NAVY, display: "block" }} />
          </button>
        ))}
        <button
          onClick={clear}
          style={{
            height: 44, padding: "0 16px", fontSize: 15, fontWeight: 800,
            color: "#E0413E", background: "#fff", border: "2px solid #E0413E",
            borderRadius: 12, cursor: "pointer", fontFamily: "inherit",
          }}
        >
          {lang === "ar" ? "مسح الكل" : "Effacer"}
        </button>
      </div>

      <button
        onClick={finish}
        style={{
          width: "100%", height: 54, marginTop: 16, fontSize: 18, fontWeight: 800,
          color: "#fff", background: GOLD, border: "none", borderRadius: 14,
          cursor: "pointer", fontFamily: "inherit",
        }}
      >
        {t("btn_done") || "تمّ"}
      </button>
    </>
  );
}
