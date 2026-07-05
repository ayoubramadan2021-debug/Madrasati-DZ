import { useState, useRef, useEffect, useCallback } from "react";
import { useLang } from "../../../i18n/LanguageContext";
import { pickLang } from "../../../lib/pickLang";

type Glyph = { label: string; path: string };

export interface TraceExerciseProps {
  title: any;
  instruction: any;
  glyphs: Glyph[];
  threshold?: number; // 0..1 coverage to pass (default 0.8)
  onComplete?: (score: number, total: number) => void;
}

const NAVY = "#1B3A6B";
const GOLD = "#E8A020";
const VB = 100; // viewBox size (paths drawn in 0..100 space)
const SAMPLES = 100; // points sampled along path
const HIT = 11; // hit radius in viewBox units

export default function TraceExercise({
  title,
  instruction,
  glyphs,
  threshold = 0.8,
  onComplete,
}: TraceExerciseProps) {
  const { t, lang } = useLang();
  const [idx, setIdx] = useState(0);
  const [covered, setCovered] = useState<boolean[]>([]);
  const [passedCount, setPassedCount] = useState(0);
  const [done, setDone] = useState(false);

  const svgRef = useRef<SVGSVGElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const samplesRef = useRef<{ x: number; y: number }[]>([]);
  const coveredRef = useRef<boolean[]>([]);
  const drawing = useRef(false);
  const scoreRef = useRef(0);

  const glyph = glyphs[idx];
  const total = glyphs.length;

  // sample points along current path
  useEffect(() => {
    const p = pathRef.current;
    if (!p) return;
    const len = p.getTotalLength();
    const pts: { x: number; y: number }[] = [];
    for (let i = 0; i < SAMPLES; i++) {
      const pt = p.getPointAtLength((len * i) / (SAMPLES - 1));
      pts.push({ x: pt.x, y: pt.y });
    }
    samplesRef.current = pts;
    const fresh = new Array(SAMPLES).fill(false);
    coveredRef.current = fresh;
    setCovered(fresh);
  }, [idx, glyph]);

  const toVB = (clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return null;
    const r = svg.getBoundingClientRect();
    return {
      x: ((clientX - r.left) / r.width) * VB,
      y: ((clientY - r.top) / r.height) * VB,
    };
  };

  const paint = (clientX: number, clientY: number) => {
    const p = toVB(clientX, clientY);
    if (!p) return;
    const pts = samplesRef.current;
    let changed = false;
    for (let i = 0; i < pts.length; i++) {
      if (coveredRef.current[i]) continue;
      const dx = pts[i].x - p.x;
      const dy = pts[i].y - p.y;
      if (dx * dx + dy * dy <= HIT * HIT) {
        coveredRef.current[i] = true;
        changed = true;
      }
    }
    if (changed) setCovered([...coveredRef.current]);
  };

  const ratio = covered.filter(Boolean).length / SAMPLES;

  const advance = useCallback(() => {
    scoreRef.current += 1;
    setPassedCount(scoreRef.current);
    if (idx + 1 >= total) {
      setDone(true);
      onComplete?.(scoreRef.current, total);
    } else {
      setIdx((i) => i + 1);
    }
  }, [idx, total, onComplete]);

  // auto-advance when threshold met
  useEffect(() => {
    if (!done && ratio >= threshold && samplesRef.current.length) {
      const id = setTimeout(advance, 450);
      return () => clearTimeout(id);
    }
  }, [ratio, threshold, advance, done]);

  const start = (x: number, y: number) => {
    drawing.current = true;
    paint(x, y);
  };
  const move = (x: number, y: number) => {
    if (drawing.current) paint(x, y);
  };
  const end = () => {
    drawing.current = false;
  };

  const reset = () => {
    scoreRef.current = 0;
    setPassedCount(0);
    setDone(false);
    setIdx(0);
    coveredRef.current = new Array(SAMPLES).fill(false);
    setCovered(coveredRef.current);
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
      <div
        style={{
          textAlign: "center",
          fontSize: 20,
          fontWeight: 800,
          color: passedCount >= total ? "#1FA463" : NAVY,
          padding: "30px 0",
        }}
      >
        {passedCount >= total
          ? t("result_perfect")
          : passedCount + " / " + total} ⭐
        <div style={{ marginTop: 18 }}>
          <button
            onClick={reset}
            style={{
              height: 54,
              padding: "0 36px",
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
        </div>
      </div>
    );
  }

  const pct = Math.round(ratio * 100);

  return wrap(
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 17,
          fontWeight: 800,
          marginBottom: 10,
        }}
      >
        <span>{idx + 1} / {total}</span>
        <span style={{ color: ratio >= threshold ? "#1FA463" : GOLD }}>
          {pct}%
        </span>
      </div>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${VB} ${VB}`}
        onMouseDown={(e) => start(e.clientX, e.clientY)}
        onMouseMove={(e) => move(e.clientX, e.clientY)}
        onMouseUp={end}
        onMouseLeave={end}
        onTouchStart={(e) =>
          e.touches[0] && start(e.touches[0].clientX, e.touches[0].clientY)
        }
        onTouchMove={(e) =>
          e.touches[0] && move(e.touches[0].clientX, e.touches[0].clientY)
        }
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
      >
        {/* guide path (dotted) */}
        <path
          ref={pathRef}
          d={glyph?.path}
          fill="none"
          stroke="#C9CFDB"
          strokeWidth={9}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="1 12"
        />
        {/* covered dots */}
        {samplesRef.current.map((pt, i) =>
          covered[i] ? (
            <circle key={i} cx={pt.x} cy={pt.y} r={5} fill={GOLD} />
          ) : null
        )}
      </svg>
      <p style={{ textAlign: "center", fontSize: 13, opacity: 0.6, marginTop: 10 }}>
        {lang === "ar"
          ? "مرّر إصبعك على النقاط حتى يكتمل الشكل"
          : "Trace les pointillés avec ton doigt"}
      </p>
    </>
  );
}
