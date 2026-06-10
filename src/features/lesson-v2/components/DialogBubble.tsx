import { useEffect, useRef, useState } from "react";

export type WordTiming = {
  word: string;
  start: number;
  end: number;
};

interface DialogBubbleProps {
  words: string[];
  audioSrc?: string;
  timingsSrc?: string;
  autoplay?: boolean;
  onFinish?: () => void;
  variant?: "default" | "khalil" | "taline";
}

export default function DialogBubble({
  words,
  audioSrc,
  timingsSrc,
  autoplay = false,
  onFinish,
  variant = "default",
}: DialogBubbleProps) {
  const [currentWordIdx, setCurrentWordIdx] = useState(-1);
  const [spokenIdxs, setSpokenIdxs] = useState<Set<number>>(new Set());
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timingsRef = useRef<WordTiming[] | null>(null);
  const rafRef = useRef<number | null>(null);

  const variantStyles = {
    default: { bg: "rgba(255,255,255,0.95)", border: "#E8A020" },
    khalil: { bg: "rgba(232,243,252,0.97)", border: "#5BA3D9" },
    taline: { bg: "rgba(252,232,243,0.97)", border: "#C792A8" },
  }[variant];

  useEffect(() => {
    if (!timingsSrc) return;
    fetch(timingsSrc)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (Array.isArray(data)) {
          timingsRef.current = data;
        }
      })
      .catch(() => {});
  }, [timingsSrc]);

  const tick = () => {
    const audio = audioRef.current;
    const timings = timingsRef.current;
    if (!audio || !timings) return;

    const nowMs = audio.currentTime * 1000;
    let activeIdx = -1;
    const newSpoken = new Set<number>();

    timings.forEach((t, i) => {
      if (nowMs >= t.start && nowMs <= t.end) {
        activeIdx = i;
      }
      if (nowMs > t.end) {
        newSpoken.add(i);
      }
    });

    setCurrentWordIdx(activeIdx);
    setSpokenIdxs(newSpoken);

    if (!audio.paused && !audio.ended) {
      rafRef.current = requestAnimationFrame(tick);
    }
  };

  const play = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    audio.play().catch(() => {});
    setIsPlaying(true);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(tick);
  };

  const stop = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setIsPlaying(false);
    setCurrentWordIdx(-1);
    setSpokenIdxs(new Set());
  };

  useEffect(() => {
    if (autoplay && audioSrc) {
      const timer = setTimeout(() => play(), 400);
      return () => clearTimeout(timer);
    }
    return () => {
      stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioSrc]);

  const handleAudioEnd = () => {
    setIsPlaying(false);
    setCurrentWordIdx(-1);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    onFinish?.();
  };

  return (
    <div
      style={{
        position: "relative",
        background: variantStyles.bg,
        border: `2px solid ${variantStyles.border}`,
        borderRadius: 20,
        padding: "16px 20px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        minHeight: 72,
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}
    >
      {audioSrc && (
        <button
          onClick={() => (isPlaying ? stop() : play())}
          aria-label={isPlaying ? "إيقاف" : "استمع"}
          style={{
            flexShrink: 0,
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #E8A020, #FFB84D)",
            border: "none",
            color: "#FFF",
            fontSize: 18,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 12px rgba(232,160,32,0.4)",
            animation: isPlaying ? "speakerPulse 1.2s infinite" : "none",
          }}
        >
          {isPlaying ? "⏸" : "🔊"}
        </button>
      )}

      <div
        style={{
          flex: 1,
          fontSize: 19,
          fontWeight: 700,
          color: "#1B3A6B",
          lineHeight: 1.7,
          textAlign: "center",
          direction: "rtl",
        }}
      >
        {words.map((w, i) => {
          const isActive = i === currentWordIdx;
          const isSpoken = spokenIdxs.has(i);
          return (
            <span
              key={i}
              style={{
                display: "inline-block",
                padding: "0 4px",
                color: isActive ? "#E8A020" : isSpoken ? "#1B3A6B" : "#5A6577",
                transform: isActive ? "scale(1.18)" : "scale(1)",
                transition: "all 0.2s",
                textShadow: isActive ? "0 2px 8px rgba(232,160,32,0.4)" : "none",
                fontWeight: isActive ? 900 : 700,
              }}
            >
              {w}
            </span>
          );
        })}
      </div>

      {audioSrc && (
        <audio
          ref={audioRef}
          src={audioSrc}
          onEnded={handleAudioEnd}
          preload="auto"
        />
      )}

      <style>{`
        @keyframes speakerPulse {
          0%, 100% { box-shadow: 0 4px 12px rgba(232,160,32,0.4), 0 0 0 0 rgba(232,160,32,0.5); }
          50% { box-shadow: 0 4px 12px rgba(232,160,32,0.4), 0 0 0 8px rgba(232,160,32,0); }
        }
      `}</style>
    </div>
  );
}
