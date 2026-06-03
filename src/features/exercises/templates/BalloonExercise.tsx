import { useState, useRef, useEffect, useCallback } from "react";
import { useLang } from "../../../i18n/LanguageContext";
import { pickLang } from "../../../lib/pickLang";

type Item = { label: string; correct: boolean };

export interface BalloonExerciseProps {
  title: any;
  instruction: any;
  rule: any;
  items: Item[];
  target?: number;
  duration?: number;
  spawnEvery?: number;
  onComplete?: (score: number, total: number) => void;
}

const NAVY = "#1B3A6B";
const GOLD = "#E8A020";
const STAGE_H = 460;
const BALLOON_W = 60;
const RISE_MS = 5200;
const COLORS = ["#E0413E", "#2D9CDB", "#1FA463", "#9B51E0", "#E8A020", "#FF8FA3"];

type Bub = { uid: number; el: HTMLDivElement; correct: boolean; bornAt: number };

export default function BalloonExercise({
  title,
  instruction,
  rule,
  items,
  target = 12,
  duration = 50,
  spawnEvery = 750,
  onComplete,
}: BalloonExerciseProps) {
  const { t, lang } = useLang();
  const [phase, setPhase] = useState<"intro" | "play" | "done">("intro");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [flash, setFlash] = useState<"good" | "bad" | null>(null);

  const stageRef = useRef<HTMLDivElement | null>(null);
  const bubsRef = useRef<Bub[]>([]);
  const uidRef = useRef(0);
  const scoreRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const endedRef = useRef(false);

  const finish = useCallback(() => {
    if (endedRef.current) return;
    endedRef.current = true;
    setPhase("done");
    onComplete?.(Math.min(scoreRef.current, target), target);
  }, [onComplete, target]);

  const pop = (b: Bub) => {
    if (b.correct) {
      scoreRef.current += 1;
      setScore(scoreRef.current);
      setFlash("good");
      if (scoreRef.current >= target) {
        b.el.remove();
        bubsRef.current = bubsRef.current.filter((x) => x.uid !== b.uid);
        finish();
        return;
      }
    } else {
      setFlash("bad");
      if (navigator.vibrate) navigator.vibrate(120);
    }
    setTimeout(() => setFlash(null), 160);
    b.el.style.transform += " scale(0)";
    b.el.style.opacity = "0";
    const uid = b.uid;
    setTimeout(() => {
      b.el.remove();
      bubsRef.current = bubsRef.current.filter((x) => x.uid !== uid);
    }, 120);
  };

  useEffect(() => {
    if (phase !== "play") return;
    const id = setInterval(() => {
      const stage = stageRef.current;
      if (!stage) return;
      const it = items[Math.floor(Math.random() * items.length)];
      uidRef.current += 1;
      const xFrac = 0.06 + Math.random() * 0.86;
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const el = document.createElement("div");
      el.textContent = it.label;
      el.style.cssText =
        "position:absolute;width:" + BALLOON_W + "px;height:" + (BALLOON_W * 1.25) +
        "px;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:900;color:#fff;background:" +
        color +
        ";border-radius:50% 50% 50% 50%/45% 45% 55% 55%;box-shadow:inset -6px -6px 0 rgba(0,0,0,.12),0 4px 10px rgba(0,0,0,.18);cursor:pointer;will-change:transform;transition:transform .12s,opacity .12s;touch-action:manipulation;";
      el.style.left = xFrac * (stage.clientWidth - BALLOON_W) + "px";
      el.style.bottom = "0px";
      const b: Bub = { uid: uidRef.current, el, correct: it.correct, bornAt: performance.now() };
      const handler = (ev: Event) => { ev.preventDefault(); pop(b); };
      el.addEventListener("click", handler);
      el.addEventListener("touchstart", handler, { passive: false });
      stage.appendChild(el);
      bubsRef.current.push(b);
    }, spawnEvery);
    return () => clearInterval(id);
  }, [phase, items, spawnEvery]);

  useEffect(() => {
    if (phase !== "play") return;
    const id = setInterval(() => {
      setTimeLeft((s) => {
        if (s <= 1) { clearInterval(id); finish(); return 0; }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [phase, finish]);

  useEffect(() => {
    if (phase !== "play") return;
    const tick = () => {
      const now = performance.now();
      const keep: Bub[] = [];
      for (const b of bubsRef.current) {
        const prog = (now - b.bornAt) / RISE_MS;
        if (prog >= 1) { b.el.remove(); continue; }
        const y = prog * (STAGE_H + BALLOON_W * 1.25);
        const sway = Math.sin(prog * Math.PI * 4) * 10;
        b.el.style.transform = "translate(" + sway + "px," + (-y) + "px)";
        keep.push(b);
      }
      bubsRef.current = keep;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      bubsRef.current.forEach((b) => b.el.remove());
      bubsRef.current = [];
    };
  }, [phase]);

  const start = () => {
    scoreRef.current = 0;
    endedRef.current = false;
    setScore(0);
    setTimeLeft(duration);
    setPhase("play");
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

  if (phase === "intro") {
    return wrap(
      <div style={{ background: "#fff", border: "2px solid #D9DEE8", borderRadius: 18, padding: "28px 20px", textAlign: "center", boxShadow: "0 2px 6px rgba(27,58,107,0.06)" }}>
        <div style={{ fontSize: 56, marginBottom: 12 }}>🎈</div>
        <div style={{ fontSize: 19, fontWeight: 800, marginBottom: 6 }}>{pickLang(rule, lang)}</div>
        <div style={{ fontSize: 14, opacity: 0.7, marginBottom: 20 }}>🎯 {target} · ⏱️ {duration}s</div>
        <button onClick={start} style={{ height: 54, padding: "0 40px", fontSize: 18, fontWeight: 800, color: "#fff", background: GOLD, border: "none", borderRadius: 14, cursor: "pointer", fontFamily: "inherit" }}>{t("btn_start") || "ابدأ"}</button>
      </div>
    );
  }

  if (phase === "done") {
    const final = Math.min(score, target);
    return wrap(
      <div style={{ textAlign: "center", fontSize: 20, fontWeight: 800, color: final >= target ? "#1FA463" : NAVY, padding: "30px 0" }}>
        {final >= target ? t("result_perfect") : final + " / " + target} ⭐
        <div style={{ marginTop: 18 }}>
          <button onClick={start} style={{ height: 54, padding: "0 36px", fontSize: 18, fontWeight: 800, color: NAVY, background: "#fff", border: "2px solid " + NAVY, borderRadius: 14, cursor: "pointer", fontFamily: "inherit" }}>{t("btn_retry")}</button>
        </div>
      </div>
    );
  }

  return wrap(
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 17, fontWeight: 800, marginBottom: 10 }}>
        <span>🎯 {score} / {target}</span>
        <span style={{ color: GOLD, fontSize: 15 }}>{pickLang(rule, lang)}</span>
        <span>⏱️ {timeLeft}</span>
      </div>
      <div
        ref={stageRef}
        style={{
          position: "relative", height: STAGE_H,
          background: flash === "good" ? "#EAF7F0" : flash === "bad" ? "#FDECEC" : "linear-gradient(180deg,#EAF1FB,#F7FAFF)",
          border: "2px solid #D9DEE8", borderRadius: 18, overflow: "hidden", transition: "background .15s", touchAction: "manipulation",
        }}
      />
      <p style={{ textAlign: "center", fontSize: 13, opacity: 0.6, marginTop: 10 }}>
        {lang === "ar" ? "انقر البالونات الصحيحة قبل أن تطير!" : "Touche les bons ballons avant qu'ils s'envolent !"}
      </p>
    </>
  );
}
