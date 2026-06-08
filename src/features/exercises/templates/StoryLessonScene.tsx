import { useState, useEffect, useRef, useCallback } from "react";
import { useLang } from "../../../i18n/LanguageContext";
import { pickLang } from "../../../lib/pickLang";

// ═══════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════
type Bilingual = { ar: string; fr?: string };

type WordTiming = {
  text: string;
  offset: number;
  duration: number;
};

type IntroData = {
  badge?: Bilingual;
  title: Bilingual;
  subtitle?: Bilingual;
  character: "khalil" | "taline";
  background_image?: string;
  audio_key: string;
  cta?: Bilingual;
};

type StoryStep = {
  display_number?: string;
  display_label?: Bilingual;
  visuals?: { kind: "apples" | "stars" | "items"; count: number };
  characters: ("khalil" | "taline")[];
  audio_key: string;
};

type DiscoverData = {
  steps: StoryStep[];
};

type RecapData = {
  character: "khalil" | "taline";
  title?: Bilingual;
  summary?: Bilingual;
  audio_key: string;
  xp_reward?: number;
  stars?: number;
};

export interface StoryLessonSceneProps {
  audio_base: string;
  intro: IntroData;
  discover: DiscoverData;
  recap: RecapData;
  onDone?: () => void;
}

type SceneId = "intro" | "discover" | "recap";

// ═══════════════════════════════════════════════
// Karaoke Engine Hook
// ═══════════════════════════════════════════════
function useKaraoke(audioBase: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timersRef = useRef<number[]>([]);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [currentWordIdx, setCurrentWordIdx] = useState<number>(-1);
  const [shownIdxs, setShownIdxs] = useState<Set<number>>(new Set());

  const stop = useCallback(() => {
    if (audioRef.current) {
      try {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      } catch {}
      audioRef.current = null;
    }
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];
    setActiveKey(null);
    setCurrentWordIdx(-1);
  }, []);

  const play = useCallback(
    async (audioKey: string, words: WordTiming[]) => {
      stop();
      setShownIdxs(new Set());
      setActiveKey(audioKey);

      const audio = new Audio(`${audioBase}/${audioKey}.mp3`);
      audioRef.current = audio;

      audio.addEventListener("ended", () => {
        setCurrentWordIdx(-1);
      });

      try {
        await audio.play();
      } catch (e) {
        // Autoplay blocked — show all words immediately
        const all = new Set<number>();
        words.forEach((_, i) => all.add(i));
        setShownIdxs(all);
        return;
      }

      words.forEach((w, i) => {
        const showT = window.setTimeout(() => {
          setShownIdxs((prev) => {
            const next = new Set(prev);
            next.add(i);
            return next;
          });
          setCurrentWordIdx(i);
        }, w.offset);

        const clearT = window.setTimeout(() => {
          setCurrentWordIdx((cur) => (cur === i ? -1 : cur));
        }, w.offset + w.duration);

        timersRef.current.push(showT, clearT);
      });
    },
    [audioBase, stop]
  );

  useEffect(() => {
    return () => stop();
  }, [stop]);

  return { play, stop, activeKey, currentWordIdx, shownIdxs };
}

// Helper: load JSON timings
async function loadTimings(audioBase: string, audioKey: string): Promise<WordTiming[] | null> {
  try {
    const res = await fetch(`${audioBase}/${audioKey}.json`);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}


// ═══════════════════════════════════════════════
// Brand Colors
// ═══════════════════════════════════════════════
const C = {
  navy:      "#1B3A6B",
  navyDeep:  "#0F2447",
  gold:      "#E8A020",
  goldSoft:  "#F5C257",
  goldGlow:  "#FFD982",
  cream:     "#FFF8EC",
  creamDeep: "#FCEFD0",
  green:     "#1FA463",
  surface:   "#FFFFFF",
  text:      "#2A1B0A",
  textSoft:  "#6B5840",
  border:    "#E0CFA8",
};

// ═══════════════════════════════════════════════
// KaraokeText — renders synced words
// ═══════════════════════════════════════════════
function KaraokeText({
  words,
  currentIdx,
  shownIdxs,
  isActive,
}: {
  words: WordTiming[] | null;
  currentIdx: number;
  shownIdxs: Set<number>;
  isActive: boolean;
}) {
  if (!words || words.length === 0) {
    return <span style={{ opacity: 0.6 }}>...</span>;
  }

  return (
    <>
      {words.map((w, i) => {
        const shown = !isActive || shownIdxs.has(i);
        const current = isActive && currentIdx === i;
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity: shown ? 1 : 0,
              transform: current
                ? "translateY(-3px) scale(1.1)"
                : shown
                ? "translateY(0)"
                : "translateY(8px)",
              color: current ? C.gold : C.navyDeep,
              fontWeight: current ? 900 : 600,
              transition: "opacity .25s ease, transform .25s ease, color .15s ease",
              margin: "0 2px",
            }}
          >
            {w.text}
            {" "}
          </span>
        );
      })}
    </>
  );
}

// ═══════════════════════════════════════════════
// CharacterImage
// ═══════════════════════════════════════════════
function CharacterImage({
  who,
  size = "large",
}: {
  who: "khalil" | "taline";
  size?: "large" | "medium" | "small";
}) {
  const dims = {
    large:  { h: 200, w: "auto" as const },
    medium: { h: 140, w: "auto" as const },
    small:  { h: 130, w: "auto" as const },
  }[size];

  return (
    <img
      src={`/characters/${who}_full.webp`}
      alt={who === "khalil" ? "خليل" : "تالين"}
      style={{
        height: dims.h,
        width: dims.w,
        objectFit: "contain",
        filter: "drop-shadow(0 8px 16px rgba(0,0,0,.15))",
        animation: size === "large" ? "story-bob 3s ease-in-out infinite" : "none",
      }}
    />
  );
}

// ═══════════════════════════════════════════════
// CSS-in-JS animations (injected once)
// ═══════════════════════════════════════════════
function ensureStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById("story-lesson-styles")) return;
  const s = document.createElement("style");
  s.id = "story-lesson-styles";
  s.textContent = `
    @keyframes story-bob {
      0%, 100% { transform: translateY(0); }
      50%      { transform: translateY(-8px); }
    }
    @keyframes story-pulse-gold {
      0%, 100% { box-shadow: 0 0 0 4px rgba(232,160,32,.2), 0 8px 24px rgba(232,160,32,.4); }
      50%      { box-shadow: 0 0 0 12px rgba(232,160,32,.05), 0 8px 32px rgba(232,160,32,.6); }
    }
    @keyframes story-pop-in {
      from { transform: scale(0) rotate(-180deg); opacity: 0; }
      to   { transform: scale(1) rotate(0); opacity: 1; }
    }
    @keyframes story-zoom-in {
      from { transform: scale(0); opacity: 0; }
      to   { transform: scale(1); opacity: 1; }
    }
    @keyframes story-star-pop {
      0%   { transform: scale(0) rotate(-30deg); opacity: 0; }
      60%  { transform: scale(1.3) rotate(10deg); opacity: 1; }
      100% { transform: scale(1) rotate(0); opacity: 1; }
    }
    @keyframes story-xp-bounce {
      0%   { transform: scale(0); opacity: 0; }
      60%  { transform: scale(1.2); opacity: 1; }
      100% { transform: scale(1); opacity: 1; }
    }
  `;
  document.head.appendChild(s);
}


// ═══════════════════════════════════════════════
// Main Component
// ═══════════════════════════════════════════════
export default function StoryLessonScene({
  audio_base,
  intro,
  discover,
  recap,
  onDone,
}: StoryLessonSceneProps) {
  const { lang } = useLang();
  const [scene, setScene] = useState<SceneId>("intro");
  const [stepIdx, setStepIdx] = useState(0);
  const [timings, setTimings] = useState<Record<string, WordTiming[]>>({});

  const karaoke = useKaraoke(audio_base);

  useEffect(() => {
    ensureStyles();
  }, []);

  // Preload timings for all audio keys
  useEffect(() => {
    const keys = new Set<string>();
    keys.add(intro.audio_key);
    discover.steps.forEach((s) => keys.add(s.audio_key));
    keys.add(recap.audio_key);

    keys.forEach(async (k) => {
      if (!timings[k]) {
        const t = await loadTimings(audio_base, k);
        if (t) setTimings((prev) => ({ ...prev, [k]: t }));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audio_base, intro.audio_key, recap.audio_key]);

  // Play intro audio on mount (best-effort, may be blocked)
  useEffect(() => {
    if (scene !== "intro") return;
    const t = timings[intro.audio_key];
    if (!t) return;
    const timer = setTimeout(() => karaoke.play(intro.audio_key, t), 600);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene, intro.audio_key, timings[intro.audio_key]]);

  // Play step audio when step changes
  useEffect(() => {
    if (scene !== "discover") return;
    const s = discover.steps[stepIdx];
    if (!s) return;
    const t = timings[s.audio_key];
    if (!t) return;
    const timer = setTimeout(() => karaoke.play(s.audio_key, t), 600);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene, stepIdx]);

  // Play recap audio on enter
  useEffect(() => {
    if (scene !== "recap") return;
    const t = timings[recap.audio_key];
    if (!t) return;
    const timer = setTimeout(() => karaoke.play(recap.audio_key, t), 1400);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene, recap.audio_key, timings[recap.audio_key]]);

  const goToScene = (s: SceneId) => {
    karaoke.stop();
    setScene(s);
    if (s === "discover") setStepIdx(0);
  };

  const nextStep = () => {
    karaoke.stop();
    if (stepIdx < discover.steps.length - 1) {
      setStepIdx(stepIdx + 1);
    } else {
      goToScene("recap");
    }
  };

  const prevStep = () => {
    karaoke.stop();
    if (stepIdx > 0) setStepIdx(stepIdx - 1);
  };

  const replayCurrent = () => {
    if (scene === "intro") {
      const t = timings[intro.audio_key];
      if (t) karaoke.play(intro.audio_key, t);
    } else if (scene === "discover") {
      const s = discover.steps[stepIdx];
      const t = timings[s.audio_key];
      if (t) karaoke.play(s.audio_key, t);
    } else if (scene === "recap") {
      const t = timings[recap.audio_key];
      if (t) karaoke.play(recap.audio_key, t);
    }
  };

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // SCENE: INTRO
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  if (scene === "intro") {
    const words = timings[intro.audio_key] || null;
    const isActive = karaoke.activeKey === intro.audio_key;

    return (
      <div
        style={{
          minHeight: "100dvh",
          background:
            "linear-gradient(180deg, rgba(247,235,208,0.4) 0%, rgba(247,235,208,0.85) 70%, rgba(232,200,138,0.95) 100%), url('/scenes/lesson_1_classroom_bg.webp') center/cover no-repeat",
          fontFamily: "Tajawal, sans-serif",
          direction: "rtl",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "32px 24px 100px",
          gap: 16,
        }}
      >
        <div style={{ textAlign: "center" }}>
          {intro.badge && (
            <div
              style={{
                display: "inline-block",
                background: C.navy,
                color: C.cream,
                fontSize: 13,
                fontWeight: 700,
                padding: "6px 14px",
                borderRadius: 999,
                marginBottom: 12,
              }}
            >
              {pickLang(intro.badge, lang)}
            </div>
          )}
          <h1
            style={{
              fontSize: 28,
              fontWeight: 900,
              color: C.navyDeep,
              lineHeight: 1.2,
              margin: "0 0 8px",
            }}
          >
            {pickLang(intro.title, lang)}
          </h1>
          {intro.subtitle && (
            <p style={{ fontSize: 15, color: C.navyDeep, fontWeight: 600, margin: 0, textShadow: "0 1px 2px rgba(255,255,255,0.6)" }}>
              {pickLang(intro.subtitle, lang)}
            </p>
          )}
        </div>

        <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <CharacterImage who={intro.character} size="large" />
          <div style={{
            width: 140, height: 18, marginTop: -8,
            background: "radial-gradient(ellipse at center, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 50%, transparent 80%)",
            borderRadius: "50%",
            filter: "blur(2px)",
          }} />
        </div>

        <div
          style={{
            background: C.surface,
            border: `2px solid ${C.gold}`,
            borderRadius: 20,
            padding: "12px 18px",
            maxWidth: 320,
            minHeight: 70,
            fontSize: 16,
            lineHeight: 1.65,
            textAlign: "center",
            boxShadow: "0 6px 20px rgba(232, 160, 32, .2)",
          }}
          onClick={replayCurrent}
        >
          <KaraokeText
            words={words}
            currentIdx={karaoke.currentWordIdx}
            shownIdxs={karaoke.shownIdxs}
            isActive={isActive}
          />
        </div>

        <button
          onClick={() => goToScene("discover")}
          style={{
            background: `linear-gradient(135deg, ${C.gold} 0%, ${C.goldSoft} 100%)`,
            color: C.navyDeep,
            border: "none",
            padding: "16px 40px",
            borderRadius: 999,
            fontFamily: "Tajawal, sans-serif",
            fontSize: 18,
            fontWeight: 900,
            cursor: "pointer",
            animation: "story-pulse-gold 2s ease-in-out infinite",
          }}
        >
          {pickLang(intro.cta || { ar: "هَيَّا نَبْدَأ ✨", fr: "Commençons ✨" }, lang)}
        </button>
      </div>
    );
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // SCENE: DISCOVER
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  if (scene === "discover") {
    const step = discover.steps[stepIdx];
    const words = timings[step.audio_key] || null;
    const isActive = karaoke.activeKey === step.audio_key;
    const isLast = stepIdx === discover.steps.length - 1;

    return (
      <div
        style={{
          minHeight: "100dvh",
          background: "linear-gradient(180deg, #FFF8EC 0%, #FFEED0 50%, #F7DBA0 100%)",
          fontFamily: "Tajawal, sans-serif",
          direction: "rtl",
          display: "flex",
          flexDirection: "column",
          padding: "16px 16px 100px",
          gap: 12,
        }}
      >
        {/* Story card */}
        <div
          style={{
            flex: 1,
            background: C.surface,
            borderRadius: 28,
            border: `3px solid ${C.gold}`,
            boxShadow: "0 8px 24px rgba(27, 58, 107, .12)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <button
            onClick={replayCurrent}
            style={{
              position: "absolute",
              top: 16,
              left: 16,
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: C.gold,
              color: "white",
              border: `3px solid ${C.cream}`,
              fontSize: 20,
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(232, 160, 32, .4)",
              zIndex: 5,
            }}
          >
            🔊
          </button>

          <div
            style={{
              background: `linear-gradient(135deg, ${C.navy} 0%, ${C.navyDeep} 100%)`,
              color: C.cream,
              padding: "20px 24px",
              textAlign: "center",
            }}
          >
            <div
              key={`num-${stepIdx}`}
              style={{
                fontSize: 96,
                fontWeight: 900,
                lineHeight: 1,
                color: C.gold,
                textShadow: "0 4px 12px rgba(232, 160, 32, .5)",
                animation: "story-zoom-in .6s cubic-bezier(.34,1.56,.64,1)",
              }}
            >
              {step.display_number || stepIdx + 1}
            </div>
            {step.display_label && (
              <div style={{ fontSize: 18, color: C.creamDeep, fontWeight: 500, marginTop: 4 }}>
                {pickLang(step.display_label, lang)}
              </div>
            )}
          </div>

          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: 20,
              gap: 16,
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-end", gap: 12, height: 130 }}>
              {step.characters.map((c, i) => (
                <CharacterImage key={`${c}-${i}`} who={c} size="small" />
              ))}
            </div>

            {step.visuals && (
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  flexWrap: "wrap",
                  justifyContent: "center",
                  maxWidth: 280,
                }}
              >
                {Array.from({ length: step.visuals.count }).map((_, i) => (
                  <span
                    key={`v-${stepIdx}-${i}`}
                    style={{
                      fontSize: 42,
                      animation: `story-pop-in .4s cubic-bezier(.34,1.56,.64,1) ${i * 0.15}s backwards`,
                      filter: "drop-shadow(0 4px 8px rgba(200, 60, 30, .3))",
                    }}
                  >
                    {step.visuals.kind === "stars" ? "⭐" : "🍎"}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div
            style={{
              background: C.cream,
              border: `2px dashed ${C.gold}`,
              borderRadius: 16,
              padding: "14px 18px",
              margin: "0 16px 16px",
              textAlign: "center",
              fontSize: 17,
              lineHeight: 1.7,
              minHeight: 56,
            }}
          >
            <KaraokeText
              words={words}
              currentIdx={karaoke.currentWordIdx}
              shownIdxs={karaoke.shownIdxs}
              isActive={isActive}
            />
          </div>
        </div>

        {/* Navigation */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 8px" }}>
          <button
            onClick={prevStep}
            disabled={stepIdx === 0}
            style={{
              background: C.surface,
              border: `2px solid ${C.gold}`,
              width: 56,
              height: 56,
              borderRadius: "50%",
              fontSize: 24,
              color: C.navy,
              cursor: stepIdx === 0 ? "not-allowed" : "pointer",
              opacity: stepIdx === 0 ? 0.35 : 1,
              boxShadow: "0 4px 12px rgba(232, 160, 32, .25)",
            }}
          >
            ‹
          </button>
          <div
            style={{
              fontSize: 14,
              color: C.textSoft,
              fontWeight: 700,
              background: "rgba(255,255,255,.8)",
              padding: "6px 14px",
              borderRadius: 999,
              border: `1px solid ${C.border}`,
            }}
          >
            {stepIdx + 1} / {discover.steps.length}
          </div>
          <button
            onClick={nextStep}
            style={{
              background: `linear-gradient(135deg, ${C.gold} 0%, ${C.goldSoft} 100%)`,
              color: C.navyDeep,
              border: `2px solid ${C.gold}`,
              width: 56,
              height: 56,
              borderRadius: "50%",
              fontSize: 24,
              fontWeight: 900,
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(232, 160, 32, .25)",
            }}
          >
            {isLast ? "✓" : "›"}
          </button>
        </div>
      </div>
    );
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // SCENE: RECAP
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const recapWords = timings[recap.audio_key] || null;
  const isRecapActive = karaoke.activeKey === recap.audio_key;
  const stars = recap.stars ?? 3;
  const xp = recap.xp_reward ?? 50;

  return (
    <div
      style={{
        minHeight: "100dvh",
        background: "radial-gradient(ellipse at center, #FFE5A8 0%, #F4B968 60%, #D89A40 100%)",
        fontFamily: "Tajawal, sans-serif",
        direction: "rtl",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "24px 24px 100px",
        gap: 16,
      }}
    >
      <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
        {Array.from({ length: stars }).map((_, i) => (
          <span
            key={i}
            style={{
              fontSize: 56,
              filter: "drop-shadow(0 6px 12px rgba(232, 160, 32, .6))",
              animation: `story-star-pop .5s cubic-bezier(.34,1.56,.64,1) ${0.3 + i * 0.3}s backwards`,
            }}
          >
            ⭐
          </span>
        ))}
      </div>

      <h2 style={{ fontSize: 32, fontWeight: 900, color: C.navyDeep, margin: 0 }}>
        {pickLang(recap.title || { ar: "أَحْسَنْت!", fr: "Bravo !" }, lang)}
      </h2>

      <CharacterImage who={recap.character} size="medium" />

      <div
        style={{
          background: "rgba(255, 255, 255, .85)",
          backdropFilter: "blur(8px)",
          border: `2px solid ${C.gold}`,
          borderRadius: 20,
          padding: "18px 24px",
          textAlign: "center",
          fontSize: 16,
          lineHeight: 1.7,
          maxWidth: 360,
          minHeight: 80,
          boxShadow: "0 8px 24px rgba(0,0,0,.1)",
        }}
        onClick={replayCurrent}
      >
        <KaraokeText
          words={recapWords}
          currentIdx={karaoke.currentWordIdx}
          shownIdxs={karaoke.shownIdxs}
          isActive={isRecapActive}
        />
      </div>

      <div
        style={{
          background: C.navyDeep,
          color: C.goldGlow,
          padding: "12px 28px",
          borderRadius: 999,
          fontSize: 20,
          fontWeight: 900,
          boxShadow: "0 6px 16px rgba(15, 36, 71, .4)",
          animation: "story-xp-bounce 1s cubic-bezier(.34,1.56,.64,1) 1.3s backwards",
        }}
      >
        +{xp} XP 💎
      </div>

      <button
        onClick={() => onDone?.()}
        style={{
          background: `linear-gradient(135deg, ${C.gold} 0%, ${C.goldSoft} 100%)`,
          color: C.navyDeep,
          border: "none",
          padding: "16px 40px",
          borderRadius: 999,
          fontFamily: "Tajawal, sans-serif",
          fontSize: 18,
          fontWeight: 900,
          cursor: "pointer",
          animation: "story-pulse-gold 2s ease-in-out infinite",
        }}
      >
        {lang === "fr" ? "Leçon suivante ←" : "الدَّرْسُ التَّالِي ←"}
      </button>
    </div>
  );
}
