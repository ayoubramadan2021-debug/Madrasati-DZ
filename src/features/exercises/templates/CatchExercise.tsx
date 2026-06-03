import { useState, useRef, useEffect, useCallback } from "react";
import { useLang } from "../../../i18n/LanguageContext";
import { pickLang } from "../../../lib/pickLang";

type Item = { label: string; correct: boolean };

export interface CatchExerciseProps {
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
const STAGE_H = 440;
const BASKET_W = 84;
const APPLE = 54;
const FALL_MS = 3200;

type Drop = { uid: number; el: HTMLDivElement; correct: boolean; xFrac: number; bornAt: number };

export default function CatchExercise({
  title,
  instruction,
  rule,
  items,
  target = 5,
  duration = 40,
  spawnEvery = 1100,
  onComplete,
}: CatchExerciseProps) {
  const { t, lang } = useLang();
  const [phase, setPhase] = useState<"intro" | "play" | "done">("intro");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [flash, setFlash] = useState<"good" | "bad" | null>(null);

  const stageRef = useRef<HTMLDivElement | null>(null);
  const basketRef = useRef<HTMLDivElement | null>(null);
  const dropsRef = useRef<Drop[]>([]);
  const uidRef = useRef(0);
  const scoreRef = useRef(0);
  const basketFrac = useRef(0.5);
  const rafRef = useRef<number | null>(null);
  const endedRef = useRef(false);

  const finish = useCallback(() => {
    if (endedRef.current) return;
    endedRef.current = true;
    setPhase("done");
    onComplete?.(Math.min(scoreRef.current, target), target);
  }, [onComplete, target]);

  // move basket directly via ref (no re-render = zero lag)
  const moveBasket = (clientX: number) => {
    const stage = stageRef.current;
    const basket = basketRef.current;
    if (!stage || !basket) return;
    const r = stage.getBoundingClientRect();
    let frac = (clientX - r.left - BASKET_W / 2) / (r.width - BASKET_W);
    frac = Math.max(0, Math.min(1, frac));
    basketFrac.current = frac;
    basket.style.left = frac * (r.width - BASKET_W) + "px";
  };

  // spawn loop — create DOM nodes directly
  useEffect(() => {
    if (phase !== "play") return;
    const id = setInterval(() => {
      const stage = stageRef.current;
      if (!stage) return;
      const it = items[Math.floor(Math.random() * items.length)];
      uidRef.current += 1;
      const xFrac = 0.08 + Math.random() * 0.84;
      const el = document.createElement("div");
      el.textContent = it.label;
      el.style.cssText =
        "position:absolute;width:" + APPLE + "px;height:" + APPLE +
        "px;display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:900;color:#fff;background:" +
        (it.correct ? "#E0413E" : "#7A8AA6") +
        ";border-radius:50%;box-shadow:0 3px 8px rgba(0,0,0,.18);will-change:transform;";
      el.style.left = xFrac * (stage.clientWidth - APPLE) + "px";
      el.style.top = "0px";
      stage.appendChild(el);
      dropsRef.current.push({
        uid: uidRef.current,
        el,
        correct: it.correct,
        xFrac,
        bornAt: performance.now(),
      });
    }, spawnEvery);
    return () => clearInterval(id);
  }, [phase, items, spawnEvery]);

  // countdown
  useEffect(() => {
    if (phase !== "play") return;
    const id = setInterval(() => {
      setTimeLeft((s) => {
        if (s <= 1) {
          clearInterval(id);
          finish();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [phase, finish]);

  // animation + collision (all via refs, smooth)
  useEffect(() => {
    if (phase !== "play") return;
    const tick = () => {
      const stage = stageRef.current;
      if (!stage) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      const now = performance.now();
      const stageW = stage.clientWidth;
      const bx = basketFrac.current * (stageW - BASKET_W) + BASKET_W / 2;
      const keep: Drop[] = [];
      for (const d of dropsRef.current) {
        const prog = (now - d.bornAt) / FALL_MS;
        const y = prog * (STAGE_H - APPLE);
        d.el.style.transform = "translateY(" + y + "px)";
        const ax = d.xFrac * (stageW - APPLE) + APPLE / 2;
        if (y >= STAGE_H - APPLE - 64 && Math.abs(ax - bx) < (BASKET_W + APPLE) / 2) {
          if (d.correct) {
            scoreRef.current += 1;
            setScore(scoreRef.current);
            ping("good");
            if (scoreRef.current >= target) {
              d.el.remove();
              finish();
              return;
            }
          } else {
            ping("bad");
            if (navigator.vibrate) navigator.vibrate(120);
          }
          d.el.remove();
          continue;
        }
        if (prog >= 1) {
          d.el.remove();
          continue;
        }
        keep.push(d);
      }
      dropsRef.current = keep;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      dropsRef.current.forEach((d) => d.el.remove());
      dropsRef.current = [];
    };
  }, [phase, target, finish]);

  const ping = (k: "good" | "bad") => {
    setFlash(k);
    setTimeout(() => setFlash(null), 180);
  };

  const start = () => {
    scoreRef.current = 0;
    endedRef.current = false;
    basketFrac.current = 0.5;
    setScore(0);
    setTimeLeft(duration);
    setPhase("play");
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

  if (phase === "intro") {
    return wrap(
      <div
        style={{
          background: "#fff",
          border: "2px solid #D9DEE8",
          borderRadius: 18,
          padding: "28px 20px",
          textAlign: "center",
          boxShadow: "0 2px 6px rgba(27,58,107,0.06)",
        }}
      >
        <div style={{ fontSize: 56, marginBottom: 12 }}>🍎🧺</div>
        <div style={{ fontSize: 19, fontWeight: 800, marginBottom: 6 }}>
          {pickLang(rule, lang)}
        </div>
        <div style={{ fontSize: 14, opacity: 0.7, marginBottom: 20 }}>
          🎯 {target} · ⏱️ {duration}s
        </div>
        <button
          onClick={start}
          style={{
            height: 54,
            padding: "0 40px",
            fontSize: 18,
            fontWeight: 800,
            color: "#fff",
            background: GOLD,
            border: "none",
            borderRadius: 14,
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          {t("btn_start") || "ابدأ"}
        </button>
      </div>
    );
  }

  if (phase === "done") {
    const final = Math.min(score, target);
    return wrap(
      <div
        style={{
          textAlign: "center",
          fontSize: 20,
          fontWeight: 800,
          color: final >= target ? "#1FA463" : NAVY,
          padding: "30px 0",
        }}
      >
        {final >= target ? t("result_perfect") : final + " / " + target} ⭐
        <div style={{ marginTop: 18 }}>
          <button
            onClick={start}
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

  return wrap(
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 17,
          fontWeight: 800,
          marginBottom: 10,
        }}
      >
        <span>🎯 {score} / {target}</span>
        <span style={{ color: GOLD, fontSize: 15 }}>{pickLang(rule, lang)}</span>
        <span>⏱️ {timeLeft}</span>
      </div>
      <div
        ref={stageRef}
        onMouseMove={(e) => moveBasket(e.clientX)}
        onTouchStart={(e) => e.touches[0] && moveBasket(e.touches[0].clientX)}
        onTouchMove={(e) => e.touches[0] && moveBasket(e.touches[0].clientX)}
        style={{
          position: "relative",
          height: STAGE_H,
          background:
            flash === "good"
              ? "#EAF7F0"
              : flash === "bad"
              ? "#FDECEC"
              : "linear-gradient(180deg,#EAF1FB,#F7FAFF)",
          border: "2px solid #D9DEE8",
          borderRadius: 18,
          overflow: "hidden",
          touchAction: "none",
          transition: "background .15s",
          userSelect: "none",
        }}
      >
        <div
          ref={basketRef}
          style={{
            position: "absolute",
            bottom: 8,
            left: "50%",
            width: BASKET_W,
            height: 50,
            fontSize: 44,
            lineHeight: "50px",
            textAlign: "center",
            pointerEvents: "none",
          }}
        >
          🧺
        </div>
      </div>
      <p style={{ textAlign: "center", fontSize: 13, opacity: 0.6, marginTop: 10 }}>
        {lang === "ar" ? "حرّك السلة بإصبعك" : "Déplace le panier avec ton doigt"}
      </p>
    </>
  );
}
