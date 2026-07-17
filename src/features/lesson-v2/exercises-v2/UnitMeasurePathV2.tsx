import {
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
} from "react";

import {
  loadTimings,
  useKaraoke,
  type WordTiming,
} from "../useKaraoke";
import { isKeyword } from "../keywords";

export type MeasureMode =
  | "count"
  | "compare"
  | "placement"
  | "map"
  | "maze";

export type ParkPlaceKind =
  | "mouse"
  | "turtle"
  | "cheese"
  | "leaf";

export type MeasurePlace = {
  label: string;
  kind: ParkPlaceKind;
  color?: string;
};

export type MeasureRoute = {
  id: string;
  label?: string;
  color: string;
  units: number;
  start: MeasurePlace;
  end: MeasurePlace;
  layout?: "correct" | "gap" | "overlap";
};

export type UnitMeasurePathItem = {
  mode: MeasureMode;
  title: string;
  question: string;
  question_audio_key: string;
  background_image: string;
  routes: MeasureRoute[];
  options: string[];
  correct: string;
  explanation: string;
  option_layout?: "single" | "grid";
};

interface UnitMeasurePathV2Props {
  items: UnitMeasurePathItem[];
  audio_base: string;
  onComplete?: (
    score: number,
    total: number,
  ) => void;
}

const C = {
  navy: "#173B63",
  navyDeep: "#102945",
  gold: "#E4A31A",
  green: "#21A667",
  greenSoft: "#DDF7E9",
  red: "#DF5B52",
  redSoft: "#FDE8E6",
};

const FEEDBACK_CORRECT =
  "/audio/v2_feedback/correct.mp3";
const FEEDBACK_RETRY =
  "/audio/v2_feedback/retry.mp3";

function ParkPlaceIcon({
  kind,
  color = C.gold,
}: {
  kind: ParkPlaceKind;
  color?: string;
}) {
  const common = {
    stroke: C.navy,
    strokeWidth: 3,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg
      viewBox="0 0 72 72"
      width="52"
      height="52"
      aria-hidden="true"
    >
      <circle
        cx="36"
        cy="36"
        r="31"
        fill={`${color}28`}
      />

      {kind === "mouse" && (
        <>
          <circle cx="27" cy="24" r="8" fill="#B7BFCB" {...common} />
          <circle cx="45" cy="24" r="8" fill="#B7BFCB" {...common} />
          <ellipse cx="36" cy="40" rx="18" ry="14" fill="#D7DDE5" {...common} />
          <circle cx="30" cy="39" r="2.3" fill={C.navy} />
          <circle cx="42" cy="39" r="2.3" fill={C.navy} />
          <circle cx="36" cy="44" r="2.8" fill="#F38CA8" />
          <path d="M36 46v5M33 49h6" fill="none" {...common} />
          <path d="M53 45c6 0 8 6 5 9" fill="none" {...common} />
        </>
      )}

      {kind === "turtle" && (
        <>
          <ellipse cx="36" cy="38" rx="18" ry="14" fill="#75BF72" {...common} />
          <path d="M24 38c4-7 20-7 24 0-4 7-20 7-24 0Z" fill="#95D68B" {...common} />
          <circle cx="54" cy="38" r="6" fill="#95D68B" {...common} />
          <circle cx="56" cy="36" r="1.8" fill={C.navy} />
          <path d="M24 30 18 25M48 30 54 25M24 46 18 51M48 46 54 51" fill="none" {...common} />
        </>
      )}

      {kind === "cheese" && (
        <>
          <path d="M16 49 56 49 46 23 16 49Z" fill="#FFD54A" {...common} />
          <circle cx="34" cy="40" r="3" fill="#F5B700" />
          <circle cx="28" cy="46" r="2.5" fill="#F5B700" />
          <circle cx="42" cy="46" r="2.5" fill="#F5B700" />
        </>
      )}

      {kind === "leaf" && (
        <>
          <path d="M17 45c22-28 39-18 38 0-16 9-31 5-38 0Z" fill="#5DBB63" {...common} />
          <path d="M21 44c11-6 20-13 27-21M29 41l5-7M38 39l5-7" fill="none" {...common} />
        </>
      )}
    </svg>
  );
}

function buildMazePolyline(units: number) {
  if (units <= 1) return "10,50 90,50";
  const points: string[] = [];
  for (let i = 0; i < units; i += 1) {
    const x = 10 + (80 * i) / (units - 1);
    const y = i % 2 === 0 ? 28 : 72;
    points.push(`${x},${y}`);
  }
  return points.join(" ");
}

function RouteRow({
  route,
}: {
  route: MeasureRoute;
}) {
  const issueIndex = Math.max(
    1,
    Math.min(
      route.units - 1,
      Math.floor(route.units / 2),
    ),
  );

  return (
    <article style={styles.routeCard}>
      {route.label && (
        <div style={styles.routeName}>
          {route.label}
        </div>
      )}

      <div style={styles.routeRow}>
        <div style={styles.place}>
          <span style={styles.pointBadge}>ب</span>
          <ParkPlaceIcon kind={route.end.kind} color={route.end.color} />
          <small>{route.end.label}</small>
        </div>

        <div
          style={{
            ...styles.tiles,
            gridTemplateColumns: `repeat(${route.units}, minmax(0,1fr))`,
            borderColor: `${route.color}90`,
            background: `${route.color}16`,
          }}
        >
          {Array.from({ length: route.units }).map((_, index) => {
            const issue = index === issueIndex;
            const gap = route.layout === "gap" && issue;
            const overlap = route.layout === "overlap" && issue;

            return (
              <span
                key={index}
                style={{
                  ...styles.tile,
                  borderColor: route.color,
                  background: "linear-gradient(180deg,#fff7d9,#ffe89d)",
                  marginInlineStart: gap ? 12 : overlap ? -8 : 0,
                  zIndex: overlap ? 2 : 1,
                }}
              />
            );
          })}
        </div>

        <div style={styles.place}>
          <span style={styles.pointBadge}>أ</span>
          <ParkPlaceIcon kind={route.start.kind} color={route.start.color} />
          <small>{route.start.label}</small>
        </div>
      </div>
    </article>
  );
}

function MazeLane({
  route,
  celebrate = false,
}: {
  route: MeasureRoute;
  celebrate?: boolean;
}) {
  const polyline = useMemo(
    () => buildMazePolyline(route.units),
    [route.units],
  );

  return (
    <div
      style={{
        ...styles.mazeLane,
        borderColor: `${route.color}66`,
        background: `${route.color}10`,
      }}
    >
      <div style={styles.mazeHead}>
        <strong
          style={{
            ...styles.mazeLabel,
            color: route.color,
          }}
        >
          {route.label}
        </strong>
      </div>

      <div style={styles.mazeTrackRow}>
        <div
          style={{
            ...styles.mazePoint,
            animation: celebrate ? "goalPulse .9s ease-in-out 2" : "none",
          }}
        >
          <span style={styles.pointBadge}>ب</span>
          <ParkPlaceIcon kind={route.end.kind} color={route.end.color} />
          <small>{route.end.label}</small>
        </div>

        <div
          style={{
            ...styles.mazeTrack,
            borderColor: route.color,
          }}
        >
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={styles.mazeSvg}
            aria-hidden="true"
          >
            <polyline
              points={polyline}
              fill="none"
              stroke={`${route.color}66`}
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <polyline
              points={polyline}
              fill="none"
              stroke={route.color}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="7 5"
            />
          </svg>

          <div
            style={{
              ...styles.mazeUnits,
              gridTemplateColumns: `repeat(${route.units}, minmax(0,1fr))`,
            }}
          >
            {Array.from({ length: route.units }).map((_, index) => (
              <span
                key={index}
                style={{
                  ...styles.mazeTile,
                  borderColor: route.color,
                  background: "linear-gradient(180deg,#fff7d9,#ffe89d)",
                  transform: index % 2 === 0 ? "translateY(-8px)" : "translateY(8px)",
                }}
              />
            ))}
          </div>
        </div>

        <div
          style={{
            ...styles.mazePoint,
            animation: celebrate ? "runnerMove .95s ease-in-out 2" : "none",
          }}
        >
          <span style={styles.pointBadge}>أ</span>
          <ParkPlaceIcon kind={route.start.kind} color={route.start.color} />
          <small>{route.start.label}</small>
        </div>
      </div>
    </div>
  );
}

function MazeBoard({
  routes,
  celebrate = false,
}: {
  routes: MeasureRoute[];
  celebrate?: boolean;
}) {
  return (
    <section style={styles.mazeWrap}>
      <div style={styles.mazeHint}>
        عُدَّ الوَحَدَاتِ فِي كُلِّ مَسَارٍ
      </div>

      <div style={styles.mazeCard}>
        {routes.map((route) => (
          <MazeLane
            key={route.id}
            route={route}
            celebrate={celebrate}
          />
        ))}
      </div>
    </section>
  );
}

export default function UnitMeasurePathV2({
  items,
  audio_base,
  onComplete,
}: UnitMeasurePathV2Props) {
  const [itemIdx, setItemIdx] = useState(0);
  const [timings, setTimings] = useState<Record<string, WordTiming[]>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedbackState, setFeedbackState] = useState<"idle" | "correct" | "wrong">("idle");
  const [attempts, setAttempts] = useState(0);
  const [locked, setLocked] = useState(false);

  const karaoke = useKaraoke(audio_base);
  const item = items[itemIdx];

  useEffect(() => {
    setItemIdx(0);
    setSelectedOption(null);
    setFeedbackState("idle");
    setAttempts(0);
    setLocked(false);
  }, [items, audio_base]);

  useEffect(() => {
    let cancelled = false;
    setTimings({});

    items.forEach(async (entry) => {
      const result = await loadTimings(audio_base, entry.question_audio_key);
      if (!cancelled && result) {
        setTimings((previous) => ({
          ...previous,
          [entry.question_audio_key]: result,
        }));
      }
    });

    return () => {
      cancelled = true;
    };
  }, [audio_base, items]);

  useEffect(() => {
    karaoke.stop();
    setSelectedOption(null);
    setFeedbackState("idle");
    setAttempts(0);
    setLocked(false);

    if (!item) return;
    const words = timings[item.question_audio_key];
    if (!words) return;

    const timer = window.setTimeout(() => {
      karaoke.play(item.question_audio_key, words);
    }, 500);

    return () => window.clearTimeout(timer);
  }, [itemIdx, timings]);

  if (!item) return null;

  const playFeedback = (correct: boolean) => {
    const audio = new Audio(
      correct ? FEEDBACK_CORRECT : FEEDBACK_RETRY,
    );
    audio.play().catch(() => {});
  };

  const goNext = () => {
    if (itemIdx < items.length - 1) {
      setItemIdx((current) => current + 1);
    } else {
      onComplete?.(items.length, items.length);
    }
  };

  const handleSelect = (option: string) => {
    if (locked || feedbackState === "correct") return;

    karaoke.stop();
    setSelectedOption(option);

    const correct = option === item.correct;
    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);

    if (correct) {
      setFeedbackState("correct");
      setLocked(true);
      playFeedback(true);
      window.setTimeout(goNext, 1800);
      return;
    }

    setFeedbackState("wrong");
    playFeedback(false);

    if (nextAttempts >= 3) {
      setLocked(true);
      window.setTimeout(goNext, 2100);
      return;
    }

    window.setTimeout(() => {
      setFeedbackState("idle");
      setSelectedOption(null);
    }, 1250);
  };

  const replayQuestion = () => {
    const words = timings[item.question_audio_key];
    if (words) {
      karaoke.play(item.question_audio_key, words);
    }
  };

  const words = timings[item.question_audio_key];
  const active =
    karaoke.activeKey === item.question_audio_key;

  return (
    <main dir="rtl" style={styles.page}>
      <div
        style={{
          ...styles.background,
          backgroundImage: `url("${item.background_image}")`,
        }}
      />
      <div style={styles.overlay} />

      <section style={styles.content}>
        <header style={styles.header}>
          <button
            type="button"
            style={styles.soundButton}
            onClick={replayQuestion}
            aria-label="إعادة الصوت"
          >
            🔊
          </button>

          <div style={styles.progress}>
            {items.map((_, index) => (
              <span
                key={index}
                style={{
                  ...styles.progressDot,
                  background:
                    index < itemIdx
                      ? C.green
                      : index === itemIdx
                      ? C.gold
                      : "#FFFFFF",
                  opacity:
                    index <= itemIdx ? 1 : 0.45,
                }}
              />
            ))}
          </div>

          <div style={styles.counter}>
            <span dir="ltr">
              {itemIdx + 1} / {items.length}
            </span>
          </div>
        </header>

        <div style={styles.title}>
          {item.title}
        </div>

        <div style={styles.unitSample}>
          <span style={styles.sampleTile} />
          <strong>وحدة واحدة</strong>
        </div>

        {item.mode === "maze" ? (
          <MazeBoard
            routes={item.routes}
            celebrate={feedbackState === "correct"}
          />
        ) : (
          <section style={styles.routes}>
            {item.routes.map((route) => (
              <RouteRow key={route.id} route={route} />
            ))}
          </section>
        )}

        <section
          style={styles.question}
          onClick={replayQuestion}
        >
          {words
            ? words.map((word, index) => {
                const shown = karaoke.activeKey
                  ? karaoke.shown.has(index)
                  : true;
                const current =
                  active &&
                  karaoke.currentIdx === index;

                return (
                  <span
                    key={`${word.text}-${index}`}
                    style={{
                      ...styles.word,
                      opacity: shown ? 1 : 0,
                      color: current
                        ? C.gold
                        : isKeyword(word.text)
                        ? C.green
                        : C.navyDeep,
                      transform: current
                        ? "translateY(-2px) scale(1.07)"
                        : "none",
                    }}
                  >
                    {word.text}{" "}
                  </span>
                );
              })
            : item.question}
        </section>

        <section
          style={{
            ...styles.options,
            gridTemplateColumns:
              item.option_layout === "single" ||
              item.options.some(
                (option) => option.length > 16,
              )
                ? "1fr"
                : "repeat(2,minmax(0,1fr))",
          }}
        >
          {item.options.map((option, index) => {
            const selected = selectedOption === option;
            const correct =
              selected &&
              feedbackState === "correct";
            const wrong =
              selected &&
              feedbackState === "wrong";
            const reveal =
              locked &&
              feedbackState !== "correct" &&
              option === item.correct;

            return (
              <button
                type="button"
                key={option}
                disabled={locked}
                onClick={() => handleSelect(option)}
                style={{
                  ...styles.option,
                  background:
                    correct || reveal
                      ? C.greenSoft
                      : wrong
                      ? C.redSoft
                      : "#FFFFFF",
                  borderColor:
                    correct || reveal
                      ? C.green
                      : wrong
                      ? C.red
                      : C.gold,
                  animationDelay: `${index * 70}ms`,
                }}
              >
                {option}
              </button>
            );
          })}
        </section>
      </section>

      {feedbackState !== "idle" && (
        <>
          <div
            style={{
              ...styles.feedback,
              background:
                feedbackState === "correct"
                  ? C.green
                  : C.red,
            }}
          >
            {feedbackState === "correct"
              ? "🌟 أَحْسَنْتَ!"
              : "حَاوِلْ مَرَّةً أُخْرَى ✨"}
          </div>

          <div style={styles.explanation}>
            {feedbackState === "correct"
              ? item.explanation
              : "أعد النظر ثم حاول من جديد."}
          </div>
        </>
      )}

      <style>{`
        @keyframes optionIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes feedbackIn {
          from { opacity: 0; transform: translate(-50%,-50%) scale(.72); }
          to { opacity: 1; transform: translate(-50%,-50%) scale(1); }
        }
        @keyframes runnerMove {
          0% { transform: translateX(0) scale(1); }
          25% { transform: translateX(-7px) translateY(-2px) scale(1.03); }
          50% { transform: translateX(-14px) translateY(0) scale(1.06); }
          75% { transform: translateX(-7px) translateY(-1px) scale(1.03); }
          100% { transform: translateX(0) scale(1); }
        }
        @keyframes goalPulse {
          0% { transform: scale(1); filter: drop-shadow(0 0 0 rgba(228,163,26,0)); }
          50% { transform: scale(1.08); filter: drop-shadow(0 0 10px rgba(228,163,26,.55)); }
          100% { transform: scale(1); filter: drop-shadow(0 0 0 rgba(228,163,26,0)); }
        }
      `}</style>
    </main>
  );
}

const styles: Record<string, CSSProperties> = {
  page: {
    position: "relative",
    width: "100%",
    minHeight: "100dvh",
    overflowX: "hidden",
    background: "#FFF8E9",
    fontFamily: "Tajawal,system-ui,sans-serif",
  },
  background: {
    position: "fixed",
    inset: 0,
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "blur(5px) brightness(.82)",
    transform: "scale(1.04)",
  },
  overlay: {
    position: "fixed",
    inset: 0,
    background:
      "linear-gradient(180deg,rgba(232,249,255,.92),rgba(255,246,217,.97))",
  },
  content: {
    position: "relative",
    zIndex: 2,
    width: "min(820px,100%)",
    margin: "0 auto",
    padding: "12px 12px 125px",
  },
  header: {
    display: "grid",
    gridTemplateColumns: "56px 1fr 86px",
    alignItems: "center",
    gap: 9,
  },
  soundButton: {
    width: 52,
    height: 52,
    border: "4px solid rgba(255,255,255,.96)",
    borderRadius: "50%",
    background: C.gold,
    color: "#FFFFFF",
    fontSize: 20,
    boxShadow: "0 7px 16px rgba(120,76,0,.2)",
  },
  progress: {
    display: "flex",
    justifyContent: "center",
    gap: 9,
  },
  progressDot: {
    width: 16,
    height: 16,
    border: "3px solid rgba(255,255,255,.95)",
    borderRadius: "50%",
    boxShadow: "0 4px 9px rgba(23,59,99,.14)",
  },
  counter: {
    minWidth: 78,
    padding: "9px 12px",
    borderRadius: 999,
    background: C.navy,
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: 900,
    textAlign: "center",
  },
  title: {
    width: "fit-content",
    margin: "12px auto 9px",
    padding: "8px 18px",
    border: `3px solid ${C.gold}`,
    borderRadius: 999,
    background: "rgba(255,255,255,.96)",
    color: C.navy,
    fontSize: "clamp(18px,4.6vw,25px)",
    fontWeight: 950,
    textAlign: "center",
  },
  unitSample: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    width: "fit-content",
    margin: "0 auto 10px",
    padding: "7px 13px",
    borderRadius: 16,
    background: "rgba(255,255,255,.9)",
    color: C.navy,
    fontSize: 15,
    boxShadow: "0 5px 13px rgba(23,59,99,.1)",
  },
  sampleTile: {
    width: 38,
    height: 25,
    border: `3px solid ${C.gold}`,
    borderRadius: 8,
    background: "linear-gradient(180deg,#FFF8C5,#F7C84A)",
  },
  routes: {
    display: "grid",
    gap: 10,
  },
  routeCard: {
    padding: "9px",
    border: "3px solid rgba(255,255,255,.96)",
    borderRadius: 23,
    background: "rgba(255,255,255,.94)",
    boxShadow: "0 10px 22px rgba(23,59,99,.13)",
  },
  routeName: {
    textAlign: "center",
    marginBottom: 6,
    color: C.navy,
    fontSize: 16,
    fontWeight: 950,
  },
  routeRow: {
    display: "grid",
    gridTemplateColumns: "72px minmax(0,1fr) 72px",
    alignItems: "center",
    gap: 6,
  },
  place: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: C.navy,
    fontSize: 12,
    fontWeight: 850,
    textAlign: "center",
  },
  pointBadge: {
    position: "absolute",
    top: -3,
    right: -1,
    display: "grid",
    placeItems: "center",
    width: 24,
    height: 24,
    borderRadius: "50%",
    background: C.navy,
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: 950,
  },
  tiles: {
    display: "grid",
    alignItems: "center",
    minHeight: 58,
    padding: "8px",
    overflow: "hidden",
    border: "3px solid",
    borderRadius: 18,
  },
  tile: {
    position: "relative",
    minWidth: 0,
    height: 39,
    border: "3px solid",
    borderRadius: 9,
    boxShadow: "inset 0 2px 0 rgba(255,255,255,.8)",
  },
  mazeWrap: {
    display: "grid",
    gap: 10,
  },
  mazeHint: {
    width: "fit-content",
    margin: "0 auto",
    padding: "7px 14px",
    borderRadius: 999,
    border: `2px dashed ${C.gold}`,
    background: "rgba(255,255,255,.93)",
    color: C.navy,
    fontSize: 14,
    fontWeight: 900,
  },
  mazeCard: {
    display: "grid",
    gap: 10,
    padding: "12px",
    border: "3px solid rgba(255,255,255,.96)",
    borderRadius: 26,
    background: "rgba(255,255,255,.95)",
    boxShadow: "0 12px 26px rgba(23,59,99,.12)",
  },
  mazeLane: {
    border: "3px solid",
    borderRadius: 22,
    padding: "10px",
  },
  mazeHead: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 8,
  },
  mazeLabel: {
    padding: "5px 12px",
    borderRadius: 999,
    background: "rgba(255,255,255,.88)",
    fontSize: 15,
    fontWeight: 950,
  },
  mazeTrackRow: {
    display: "grid",
    gridTemplateColumns: "72px minmax(0,1fr) 72px",
    alignItems: "center",
    gap: 6,
  },
  mazePoint: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: C.navy,
    fontSize: 12,
    fontWeight: 850,
    textAlign: "center",
  },
  mazeTrack: {
    position: "relative",
    minHeight: 92,
    border: "3px solid",
    borderRadius: 24,
    padding: "12px 10px",
    overflow: "hidden",
    background: "linear-gradient(180deg,#ffffff,#fff7e1)",
  },
  mazeSvg: {
    position: "absolute",
    inset: 6,
    width: "calc(100% - 12px)",
    height: "calc(100% - 12px)",
  },
  mazeUnits: {
    position: "relative",
    zIndex: 2,
    display: "grid",
    gap: 4,
    alignItems: "center",
    height: "100%",
  },
  mazeTile: {
    height: 40,
    border: "3px solid",
    borderRadius: 11,
    boxShadow: "inset 0 2px 0 rgba(255,255,255,.82)",
  },
  question: {
    marginTop: 11,
    padding: "12px 13px",
    border: `3px solid ${C.gold}`,
    borderRadius: 21,
    background: "rgba(255,255,255,.97)",
    color: C.navyDeep,
    fontSize: "clamp(20px,5vw,28px)",
    fontWeight: 950,
    lineHeight: 1.55,
    textAlign: "center",
    boxShadow: "0 8px 18px rgba(23,59,99,.1)",
  },
  word: {
    display: "inline-block",
    margin: "0 2px",
    transition: "all .2s ease",
  },
  options: {
    display: "grid",
    gap: 9,
    marginTop: 10,
  },
  option: {
    minHeight: 62,
    padding: "10px",
    border: "4px solid",
    borderRadius: 20,
    color: C.navyDeep,
    fontFamily: "Tajawal,system-ui,sans-serif",
    fontSize: "clamp(17px,4.3vw,23px)",
    fontWeight: 950,
    boxShadow: "0 8px 16px rgba(23,59,99,.11)",
    opacity: 0,
    animation: "optionIn .34s ease forwards",
  },
  feedback: {
    position: "fixed",
    zIndex: 1000,
    top: "47%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    minWidth: 245,
    padding: "16px 24px",
    border: "6px solid rgba(255,255,255,.94)",
    borderRadius: 999,
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: 1000,
    textAlign: "center",
    boxShadow: "0 17px 38px rgba(0,0,0,.25)",
    animation: "feedbackIn .32s ease",
  },
  explanation: {
    position: "fixed",
    zIndex: 999,
    left: 15,
    right: 15,
    bottom: 86,
    padding: "11px 14px",
    border: `3px solid ${C.gold}`,
    borderRadius: 19,
    background: "rgba(255,255,255,.98)",
    color: C.navy,
    fontSize: 17,
    fontWeight: 900,
    textAlign: "center",
    boxShadow: "0 10px 24px rgba(0,0,0,.15)",
  },
};
