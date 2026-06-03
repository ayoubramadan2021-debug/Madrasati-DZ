import { useState, useEffect, useRef, useCallback } from "react";
import { useLang } from "../../../i18n/LanguageContext";
import { pickLang } from "../../../lib/pickLang";

type Scene = {
  kind?: "show" | "count"; // count = sequential number narration
  say?: any;
  apples: number;
  group?: "first" | "second" | "both"; // layout: first 2, second 3, or both with +
  ms?: number;
  equation?: string;
};

export interface LessonSceneProps {
  title: any;
  instruction: any;
  scenes: Scene[];
  onComplete?: (score: number, total: number) => void;
}

const NAVY = "#1B3A6B";
const GOLD = "#E8A020";
const GREEN = "#1FA463";

const AR_NUM = ["", "واحد", "اثنان", "ثلاثة", "أربعة", "خمسة", "ستة", "سبعة", "ثمانية", "تسعة", "عشرة"];
const FR_NUM = ["", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", "dix"];

export default function LessonScene({
  title,
  instruction,
  scenes,
  onComplete,
}: LessonSceneProps) {
  const { t, lang } = useLang();
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [done, setDone] = useState(false);
  const [countLit, setCountLit] = useState(0); // how many apples lit during count
  const timerRef = useRef<number | null>(null);
  const speak = useCallback((text: string, onEnd?: () => void) => {
    try {
      window.speechSynthesis?.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = lang === "ar" ? "ar-SA" : "fr-FR";
      u.rate = 0.9;
      if (onEnd) u.onend = onEnd;
      window.speechSynthesis?.speak(u);
    } catch { onEnd?.(); }
  }, [lang]);

  const scene = scenes[idx];

  // sequential counting: light one apple + speak its number, then next
  const runCount = useCallback((s: Scene, after: () => void) => {
    setCountLit(0);
    let n = 0;
    const step = () => {
      n += 1;
      setCountLit(n);
      const word = (lang === "ar" ? AR_NUM : FR_NUM)[n] || String(n);
      speak(word, () => {
        if (n >= s.apples) {
          timerRef.current = window.setTimeout(after, 600);
        } else {
          timerRef.current = window.setTimeout(step, 250);
        }
      });
    };
    step();
  }, [lang, speak]);

  const goScene = useCallback((i: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    window.speechSynthesis?.cancel();
    if (i >= scenes.length) {
      setPlaying(false);
      setDone(true);
      onComplete?.(1, 1);
      return;
    }
    setIdx(i);
    setCountLit(0);
    const s = scenes[i];
    if (s.kind === "count") {
      runCount(s, () => goScene(i + 1));
    } else {
      speak(pickLang(s.say, lang), () => {
        timerRef.current = window.setTimeout(() => goScene(i + 1), s.ms || 1400);
      });
    }
  }, [scenes, speak, lang, onComplete, runCount]);

  const play = () => { setDone(false); setPlaying(true); goScene(0); };
  const stop = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    window.speechSynthesis?.cancel();
    setPlaying(false);
  }, []);
  useEffect(() => () => stop(), [stop]);

  const wrap = (children: any) => (
    <div dir={lang === "ar" ? "rtl" : "ltr"} style={{ fontFamily: "'Tajawal','Cairo',system-ui,sans-serif", maxWidth: 480, margin: "0 auto", padding: "20px 16px 120px", color: NAVY }}>
      <h2 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 4px" }}>{pickLang(title, lang)}</h2>
      <p style={{ fontSize: 15, opacity: 0.8, margin: "0 0 16px" }}>{pickLang(instruction, lang)}</p>
      {children}
    </div>
  );

  const Apple = ({ lit, delay }: { lit: boolean; delay: number }) => (
    <span style={{
      fontSize: 46,
      filter: lit ? `drop-shadow(0 0 10px ${GOLD})` : "none",
      transform: lit ? "scale(1.15)" : "scale(1)",
      transition: "transform .2s, filter .2s",
      animation: `lesson-pop .4s ease ${delay}s both`,
    }}>🍎</span>
  );

  const renderStage = () => {
    if (!scene) return null;
    if (scene.group === "both") {
      // 2 + 3 layout; in count mode reveal progressively (apple i shown when countLit > i)
      const counting = scene.kind === "count";
      const visible = (globalIdx: number) => (counting ? globalIdx < countLit : true);
      const lit = (globalIdx: number) => (counting ? globalIdx === countLit - 1 : true);
      return (
        <div dir="ltr" style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
          <div style={{ display: "flex", gap: 6 }}>
            {Array.from({ length: 2 }).map((_, i) => (
              <span key={"a" + i} style={{ visibility: visible(i) ? "visible" : "hidden" }}>
                <Apple lit={lit(i)} delay={0} />
              </span>
            ))}
          </div>
          <span style={{ fontSize: 40, fontWeight: 900, color: GOLD }}>+</span>
          <div style={{ display: "flex", gap: 6 }}>
            {Array.from({ length: 3 }).map((_, i) => (
              <span key={"b" + i} style={{ visibility: visible(2 + i) ? "visible" : "hidden" }}>
                <Apple lit={lit(2 + i)} delay={0} />
              </span>
            ))}
          </div>
        </div>
      );
    }
    return (
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", maxWidth: 320 }}>
        {Array.from({ length: scene.apples }).map((_, i) => (
          <Apple key={i} lit delay={i * 0.12} />
        ))}
      </div>
    );
  };

  if (done) {
    return wrap(
      <div style={{ textAlign: "center", fontSize: 20, fontWeight: 800, color: GREEN, padding: "20px 0" }}>
        {lang === "ar" ? "أحسنت! انتهى الدرس 🎬" : "Bravo ! Leçon terminée 🎬"}
        <div style={{ marginTop: 18 }}>
          <button onClick={play} style={{ height: 50, padding: "0 28px", fontSize: 16, fontWeight: 800, color: "#fff", background: GOLD, border: "none", borderRadius: 14, cursor: "pointer", fontFamily: "inherit" }}>{lang === "ar" ? "إعادة" : "Revoir"}</button>
        </div>
      </div>
    );
  }

  return wrap(
    <>
      <style>{`@keyframes lesson-pop{0%{transform:scale(0) translateY(10px);opacity:0}100%{transform:scale(1) translateY(0);opacity:1}}`}</style>
      <div style={{ background: "linear-gradient(180deg,#EAF1FB,#F7FAFF)", border: "2px solid #D9DEE8", borderRadius: 18, minHeight: 300, padding: 20, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18, boxShadow: "0 2px 6px rgba(27,58,107,0.06)" }}>
        {playing || done ? (
          <>
            {renderStage()}
            {scene?.equation && <div dir="ltr" style={{ fontSize: 40, fontWeight: 900, color: NAVY }}>{scene.equation}</div>}
            {scene?.say && scene.kind !== "count" && (
              <div style={{ fontSize: 17, fontWeight: 700, textAlign: "center", color: NAVY, opacity: 0.85, minHeight: 48 }}>{pickLang(scene.say, lang)}</div>
            )}
            {scene?.kind === "count" && (
              <div dir="ltr" style={{ fontSize: 34, fontWeight: 900, color: GOLD, minHeight: 48 }}>{countLit > 0 ? countLit : ""}</div>
            )}
          </>
        ) : (
          <>
            <div dir="ltr" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 32, fontWeight: 900, color: NAVY }}>2 + 3</span>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 42 }}>🍎🍎</span>
                <span style={{ fontSize: 34, fontWeight: 900, color: GOLD }}>+</span>
                <span style={{ fontSize: 42 }}>🍎🍎🍎</span>
              </div>
            </div>
            <button onClick={play} style={{ height: 56, padding: "0 44px", fontSize: 18, fontWeight: 800, color: "#fff", background: GOLD, border: "none", borderRadius: 16, cursor: "pointer", fontFamily: "inherit" }}>
              ▶ {lang === "ar" ? "شغّل الدرس" : "Lire la leçon"}
            </button>
          </>
        )}
      </div>

      {playing && (
        <div style={{ display: "flex", gap: 8, marginTop: 14, justifyContent: "center" }}>
          {scenes.map((_, i) => <span key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: i === idx ? GOLD : "#D9DEE8", transition: "background .2s" }} />)}
        </div>
      )}
      {playing && (
        <button onClick={stop} style={{ width: "100%", height: 48, marginTop: 14, fontSize: 15, fontWeight: 800, color: NAVY, background: "#fff", border: "2px solid " + NAVY, borderRadius: 14, cursor: "pointer", fontFamily: "inherit" }}>
          ⏸ {lang === "ar" ? "إيقاف" : "Pause"}
        </button>
      )}
    </>
  );
}
