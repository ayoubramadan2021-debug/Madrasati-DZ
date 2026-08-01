import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

import ExerciseFullscreenShellV2 from "../components/ExerciseFullscreenShellV2";
import UnifiedExerciseFeedbackV2 from "../components/UnifiedExerciseFeedbackV2";
import UnifiedExerciseHeaderV2 from "../components/UnifiedExerciseHeaderV2";
import UnifiedExerciseKaraokeV2 from "../components/UnifiedExerciseKaraokeV2";

export type PremiumFeedbackState =
  | "idle"
  | "correct"
  | "wrong";

export type PremiumKaraokeWord = {
  text: string;
  offset: number;
  duration: number;
};

export type PremiumChoice = {
  id: string;
  label: string;
  image?: string;
  emoji?: string;
  badge?: string;
  accent?: string;
  description?: string;
  hideVisual?: boolean;
};

export type PremiumQuestion = {
  key: string;
  prompt: string;
  helper?: string;

  choices: PremiumChoice[];
  correctChoiceId: string;

  successText?: string;
  retryText?: string;

  audioUrl?: string;
  karaokeUrl?: string;

  imageFit?: "cover" | "contain";
  columns?: 1 | 2 | 3;

  explanation?: string;
  visualEmoji?: string;
  visualCount?: number;
  requireVisualTap?: boolean;
};

export type PremiumMission = {
  id: string;
  title: string;
  subtitle?: string;
  icon?: string;
  questions: PremiumQuestion[];
};

export type PremiumExerciseConfig = {
  lessonId: number | string;
  title: string;
  badgeText?: string;

  missions: PremiumMission[];

  completionTitle?: string;
  completionText?: string;
  completionEmoji?: string;
  completionSummary?: ReactNode;

  correctSoundUrl?: string;
  retrySoundUrl?: string;

  autoAdvanceDelayMs?: number;
  retryResetDelayMs?: number;

  returnUrl?: string;
  minimalLayout?: boolean;
};

type Props = {
  config: PremiumExerciseConfig;
};

const COLORS = {
  white: "#ffffff",
  navy: "#17365f",
  navyDeep: "#0c294a",
  gold: "#edb21f",
  green: "#20a567",
  greenSoft: "#e7fff2",
  red: "#df4e5d",
  redSoft: "#fff0f2",
  muted: "#617993",
};

function cleanKaraokeWord(value: string) {
  return String(value || "")
    .replace(/[،,.!?؟؛:«»"()[\]{}]/g, "")
    .trim();
}

function normalizeTiming(value: unknown) {
  const numeric = Number(value || 0);

  if (!Number.isFinite(numeric)) {
    return 0;
  }

  return numeric > 100000
    ? Math.round(numeric / 10000)
    : Math.round(numeric);
}

function parseKaraokePayload(
  payload: unknown,
): PremiumKaraokeWord[] {
  const source =
    Array.isArray(payload)
      ? payload
      : payload &&
          typeof payload === "object" &&
          Array.isArray(
            (payload as { words?: unknown[] }).words,
          )
        ? (payload as { words: unknown[] }).words
        : [];

  return source
    .map((entry) => {
      if (!entry || typeof entry !== "object") {
        return null;
      }

      const row = entry as Record<string, unknown>;

      const text = cleanKaraokeWord(
        String(
          row.text ??
            row.word ??
            row.Text ??
            "",
        ),
      );

      const offset = normalizeTiming(
        row.offset ??
          row.start ??
          row.startMs ??
          row.Offset,
      );

      const duration = Math.max(
        150,
        normalizeTiming(
          row.duration ??
            row.durationMs ??
            row.Duration ??
            350,
        ),
      );

      if (!text) {
        return null;
      }

      return {
        text,
        offset,
        duration,
      };
    })
    .filter(
      (
        word,
      ): word is PremiumKaraokeWord =>
        word !== null,
    );
}

function playEffect(url: string) {
  const audio = new Audio(url);
  audio.play().catch(() => {});
}

export default function PremiumExerciseEngineV2({
  config,
}: Props) {
  const [missionIndex, setMissionIndex] =
    useState(0);

  const [questionIndex, setQuestionIndex] =
    useState(0);

  const [selectedChoiceId, setSelectedChoiceId] =
    useState<string | null>(null);
  const [tappedVisualItems, setTappedVisualItems] =
    useState<number[]>([]);


  const [feedback, setFeedback] =
    useState<PremiumFeedbackState>("idle");

  const [locked, setLocked] =
    useState(false);

  const [completed, setCompleted] =
    useState(false);

  const [karaokeWords, setKaraokeWords] =
    useState<PremiumKaraokeWord[]>([]);

  const [activeWordIndex, setActiveWordIndex] =
    useState(-1);

  const [isPlaying, setIsPlaying] =
    useState(false);

  const audioRef =
    useRef<HTMLAudioElement | null>(null);

  const advanceTimerRef =
    useRef<number | null>(null);

  const resetTimerRef =
    useRef<number | null>(null);

  const mission =
    config.missions[missionIndex];

  const question =
    mission?.questions[questionIndex];


  useEffect(() => {
    setTappedVisualItems([]);
  }, [missionIndex, questionIndex]);

  const totalQuestions =
    mission?.questions.length || 0;

  const audioUrl =
    question?.audioUrl || "";

  const karaokeUrl =
    question?.karaokeUrl ||
    (audioUrl
      ? audioUrl.replace(/\.mp3(?:\?.*)?$/i, ".json")
      : "");

  const visibleWords = useMemo(() => {
    if (karaokeWords.length > 0) {
      return karaokeWords.map(
        (word) => word.text,
      );
    }

    return String(question?.prompt || "")
      .split(/\s+/)
      .map(cleanKaraokeWord)
      .filter(Boolean);
  }, [karaokeWords, question?.prompt]);

  const clearTimers = useCallback(() => {
    if (advanceTimerRef.current !== null) {
      window.clearTimeout(
        advanceTimerRef.current,
      );
      advanceTimerRef.current = null;
    }

    if (resetTimerRef.current !== null) {
      window.clearTimeout(
        resetTimerRef.current,
      );
      resetTimerRef.current = null;
    }
  }, []);

  const stopAudio = useCallback(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.pause();
    audio.currentTime = 0;
    audioRef.current = null;

    setIsPlaying(false);
    setActiveWordIndex(-1);
  }, []);

  const loadKaraoke = useCallback(async () => {
    setKaraokeWords([]);
    setActiveWordIndex(-1);

    if (!karaokeUrl) {
      return;
    }

    try {
      const response = await fetch(
        `${karaokeUrl}${
          karaokeUrl.includes("?")
            ? "&"
            : "?"
        }v=premium-engine-v2`,
      );

      if (!response.ok) {
        return;
      }

      const payload = await response.json();
      setKaraokeWords(
        parseKaraokePayload(payload),
      );
    } catch {
      setKaraokeWords([]);
    }
  }, [karaokeUrl]);

  const updateActiveWord = useCallback(
    (currentMs: number) => {
      if (karaokeWords.length === 0) {
        return;
      }

      const index = karaokeWords.findIndex(
        (word) =>
          currentMs >= word.offset &&
          currentMs <
            word.offset + word.duration,
      );

      setActiveWordIndex(index);
    },
    [karaokeWords],
  );

  const replayQuestion = useCallback(() => {
    stopAudio();

    if (!audioUrl) {
      return;
    }

    const audio = new Audio(
      `${audioUrl}${
        audioUrl.includes("?")
          ? "&"
          : "?"
      }v=premium-engine-v2`,
    );

    audioRef.current = audio;

    audio.addEventListener("play", () => {
      setIsPlaying(true);
    });

    audio.addEventListener(
      "timeupdate",
      () => {
        updateActiveWord(
          audio.currentTime * 1000,
        );
      },
    );

    audio.addEventListener("ended", () => {
      setIsPlaying(false);
      setActiveWordIndex(-1);
    });

    audio.addEventListener("error", () => {
      setIsPlaying(false);
      setActiveWordIndex(-1);
    });

    audio.play().catch(() => {
      setIsPlaying(false);
    });
  }, [
    audioUrl,
    stopAudio,
    updateActiveWord,
  ]);

  const advance = useCallback(() => {
    if (!mission) {
      return;
    }

    if (
      questionIndex <
      mission.questions.length - 1
    ) {
      setQuestionIndex(
        (current) => current + 1,
      );
      return;
    }

    if (
      missionIndex <
      config.missions.length - 1
    ) {
      setMissionIndex(
        (current) => current + 1,
      );
      setQuestionIndex(0);
      return;
    }

    setCompleted(true);
  }, [
    config.missions.length,
    mission,
    missionIndex,
    questionIndex,
  ]);

  const answer = useCallback(
    (choiceId: string) => {
      if (
        !question ||
        locked ||
        feedback !== "idle"
      ) {
        return;
      }

      stopAudio();
      clearTimers();
      setSelectedChoiceId(choiceId);

      const correct =
        choiceId ===
        question.correctChoiceId;

      if (correct) {
        setFeedback("correct");
        setLocked(true);

        playEffect(
          config.correctSoundUrl ||
            "/audio/v2_feedback/correct.mp3",
        );


        return;
      }

      setFeedback("wrong");

      playEffect(
        config.retrySoundUrl ||
          "/audio/v2_feedback/retry.mp3",
      );

      window.setTimeout(() => {
        setFeedback("idle");
        setSelectedChoiceId(null);
      }, config.retryResetDelayMs ?? 900);
    },
    [
      advance,
      clearTimers,
      config.autoAdvanceDelayMs,
      config.correctSoundUrl,
      config.retryResetDelayMs,
      config.retrySoundUrl,
      feedback,
      locked,
      question,
      stopAudio,
    ],
  );

  useEffect(() => {
    if (feedback !== "correct") {
      return;
    }

    const timer = window.setTimeout(() => {
      setSelectedChoiceId(null);
      setFeedback("idle");
      setLocked(false);
      setTappedVisualItems([]);

      const currentMission =
        config.missions[missionIndex];

      if (
        questionIndex <
        currentMission.questions.length - 1
      ) {
        setQuestionIndex(
          (current) => current + 1,
        );
        return;
      }

      if (
        missionIndex <
        config.missions.length - 1
      ) {
        setMissionIndex(
          (current) => current + 1,
        );
        setQuestionIndex(0);
        return;
      }

      setCompleted(true);
    }, config.autoAdvanceDelayMs ?? 1100);

    return () => {
      window.clearTimeout(timer);
    };
  }, [
    feedback,
    questionIndex,
    missionIndex,
    config.autoAdvanceDelayMs,
    config.missions,
  ]);

  const restart = useCallback(() => {
    clearTimers();
    stopAudio();

    setMissionIndex(0);
    setQuestionIndex(0);
    setSelectedChoiceId(null);
    setFeedback("idle");
    setLocked(false);
    setCompleted(false);
  }, [clearTimers, stopAudio]);

  useEffect(() => {
    clearTimers();
    stopAudio();

    setSelectedChoiceId(null);
    setFeedback("idle");
    setLocked(false);

    void loadKaraoke();

    const timer = window.setTimeout(
      replayQuestion,
      420,
    );

    return () => {
      window.clearTimeout(timer);
      clearTimers();
      stopAudio();
    };
  }, [
    missionIndex,
    questionIndex,
    clearTimers,
    loadKaraoke,
    replayQuestion,
    stopAudio,
  ]);

  useEffect(() => {
    return () => {
      clearTimers();
      stopAudio();
    };
  }, [clearTimers, stopAudio]);

  if (
    !mission ||
    !question ||
    config.missions.length === 0
  ) {
    return (
      <ExerciseFullscreenShellV2>
        <main
          dir="rtl"
          style={styles.emptyPage}
        >
          <section style={styles.emptyCard}>
            لا توجد أسئلة متاحة في هذا النشاط.
          </section>
        </main>
      </ExerciseFullscreenShellV2>
    );
  }

  if (completed) {
    return (
      <ExerciseFullscreenShellV2>
        <main
          dir="rtl"
          style={styles.completePage}
        >
          <section style={styles.completeCard}>
            <div style={styles.completeEmoji}>
              {config.completionEmoji || "🏆"}
            </div>

            <div style={styles.premiumBadge}>
              {config.badgeText ||
                "النشاط التفاعلي Premium"}
            </div>

            <h1 style={styles.completeTitle}>
              {config.completionTitle ||
                "أَحْسَنْتَ يَا بَطَلُ!"}
            </h1>

            <p style={styles.completeText}>
              {config.completionText ||
                "أتممت جميع المهام بنجاح."}
            </p>

            {config.completionSummary && (
              <div style={styles.summary}>
                {config.completionSummary}
              </div>
            )}

            <button
              type="button"
              style={styles.primaryButton}
              onClick={restart}
            >
              إعادة النشاط
            </button>

            <button
              type="button"
              style={styles.secondaryButton}
              onClick={() => {
                window.location.href =
                  config.returnUrl ||
                  `/world2-lesson/${config.lessonId}`;
              }}
            >
              العودة إلى الدرس
            </button>
          </section>
        </main>
      </ExerciseFullscreenShellV2>
    );
  }

  return (
    <ExerciseFullscreenShellV2>
      <main
        dir="rtl"
        style={styles.page}
      >
        <div style={styles.background} />

        <section style={styles.content}>
          {config.minimalLayout ? (
            <section style={styles.minimalTopBar}>
              <div
                dir="ltr"
                style={styles.minimalProgress}
              >
                {config.missions.length}
                {" / "}
                {missionIndex + 1}
              </div>

              <button
                type="button"
                onClick={replayQuestion}
                style={styles.minimalSoundButton}
                aria-label="إعادة الصوت"
              >
                🔊
              </button>
            </section>
          ) : (
            <>
              <UnifiedExerciseHeaderV2
                index={questionIndex}
                total={totalQuestions}
                missionTitle={mission.title}
                missionIcon={mission.icon}
                onReplay={replayQuestion}
                isPlaying={isPlaying}
              />

              <div style={styles.premiumBadge}>
                {config.badgeText ||
                  "النشاط التفاعلي Premium"}
              </div>

              <div style={styles.missionNumber}>
                المهمة {missionIndex + 1}
                {" / "}
                {config.missions.length}
              </div>

              <h1 style={styles.title}>
                {config.title}
              </h1>

              {mission.subtitle && (
                <p style={styles.subtitle}>
                  {mission.subtitle}
                </p>
              )}
            </>
          )}

          <UnifiedExerciseKaraokeV2
            words={visibleWords}
            activeIndex={activeWordIndex}
            activeWord={
              activeWordIndex >= 0
                ? visibleWords[activeWordIndex]
                : undefined
            }
          />

          {question.visualEmoji && question.visualCount && (
            <section style={styles.quantityVisual}>
              {Array.from({ length: question.visualCount }).map((_, index) => (
                <button
                  type="button"
                  key={`${question.key}-${index}`}
                  disabled={tappedVisualItems.includes(index)}
                  onClick={() => {
                    if (!question.requireVisualTap) return;
                    setTappedVisualItems((current) =>
                      current.includes(index)
                        ? current
                        : [...current, index],
                    );
                  }}
                  style={{
                    ...styles.quantityItem,
                    opacity: 1,
                    transform:
                      tappedVisualItems.includes(index)
                        ? "scale(.96)"
                        : "scale(1)",
                    outline:
                      tappedVisualItems.includes(index)
                        ? `3px solid ${COLORS.green}`
                        : "none",
                  }}
                >
                  {question.visualEmoji}
                  {tappedVisualItems.includes(index) && (
                    <strong style={styles.tapNumber}>
                      {tappedVisualItems.indexOf(index) + 1}
                    </strong>
                  )}
                </button>
              ))}
            </section>
          )}

          {question.helper && (
            <div style={styles.helper}>
              💡 {question.helper}
            </div>
          )}

          <section
            style={{
              ...styles.options,
              gridTemplateColumns:
                question.columns === 1
                  ? "1fr"
                  : question.columns === 3
                    ? "repeat(3,minmax(0,1fr))"
                    : "repeat(2,minmax(0,1fr))",
            }}
          >
            {question.choices.map(
              (choice) => {
                const selected =
                  selectedChoiceId === choice.id;

                const isCorrect =
                  selected &&
                  feedback === "correct";

                const isWrong =
                  selected &&
                  feedback === "wrong";

                return (
                  <button
                    type="button"
                    key={choice.id}
                    disabled={
                      locked ||
                      Boolean(
                        question.requireVisualTap &&
                        tappedVisualItems.length <
                          Number(question.visualCount || 0),
                      )
                    }
                    onClick={() =>
                      answer(choice.id)
                    }
                    style={{
                      ...styles.optionCard,
                      borderColor: isCorrect
                        ? COLORS.green
                        : isWrong
                          ? COLORS.red
                          : choice.accent ||
                            COLORS.white,
                      background: isCorrect
                        ? COLORS.greenSoft
                        : isWrong
                          ? COLORS.redSoft
                          : COLORS.white,
                      transform: isCorrect
                        ? "scale(1.025)"
                        : isWrong
                          ? "translateX(-5px)"
                          : "none",
                    }}
                  >
                    {choice.badge && (
                      <span
                        style={{
                          ...styles.choiceBadge,
                          background:
                            choice.accent ||
                            COLORS.navy,
                        }}
                      >
                        {choice.badge}
                      </span>
                    )}

                    {!choice.hideVisual && (
                      choice.image ? (
                        <img
                          src={choice.image}
                          alt={choice.label}
                          style={{
                            ...styles.optionImage,
                            objectFit:
                              question.imageFit ||
                              "cover",
                          }}
                        />
                      ) : (
                        <div style={styles.emojiVisual}>
                          {choice.emoji || "⭐"}
                        </div>
                      )
                    )}

                    <strong style={styles.optionLabel}>
                      {choice.label}
                    </strong>

                    {choice.description && (
                      <span
                        style={styles.optionDescription}
                      >
                        {choice.description}
                      </span>
                    )}
                  </button>
                );
              },
            )}
          </section>

          {question.explanation && (
            <div style={styles.explanation}>
              {question.explanation}
            </div>
          )}
        </section>

        <UnifiedExerciseFeedbackV2
          feedback={feedback}
          successText={
            question.successText ||
            "أَحْسَنْتَ!"
          }
          retryText={
            question.retryText ||
            "حَاوِلْ مَرَّةً أُخْرَى ✨"
          }
        />
      </main>
    </ExerciseFullscreenShellV2>
  );
}

const styles: Record<
  string,
  CSSProperties
> = {
  page: {
    position: "relative",
    minHeight: "100dvh",
    overflowX: "hidden",
    background: "#fff7d8",
    fontFamily:
      '"Tajawal","Noto Kufi Arabic",Arial,sans-serif',
  },

  background: {
    position: "fixed",
    inset: 0,
    background:
      "radial-gradient(circle at 12% 8%,rgba(98,203,255,.30),transparent 27%),radial-gradient(circle at 90% 24%,rgba(255,212,73,.25),transparent 25%),linear-gradient(180deg,#eaf9ff 0%,#fff8df 56%,#fff0b8 100%)",
  },

  content: {
    position: "relative",
    zIndex: 2,
    width: "min(920px,100%)",
    minHeight: "100dvh",
    margin: "0 auto",
    padding: "12px 12px 132px",
  },

  minimalTopBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 10,
  },

  minimalProgress: {
    minWidth: 112,
    padding: "10px 20px",
    border: `4px solid ${COLORS.gold}`,
    borderRadius: 22,
    background: COLORS.white,
    color: COLORS.navyDeep,
    fontSize: "clamp(24px,6vw,34px)",
    fontWeight: 950,
    textAlign: "center",
    lineHeight: 1.1,
    boxShadow: "0 10px 22px rgba(18,58,102,.10)",
  },

  minimalSoundButton: {
    width: 72,
    height: 72,
    border: `6px solid ${COLORS.white}`,
    borderRadius: "50%",
    background: COLORS.gold,
    fontSize: 30,
    display: "grid",
    placeItems: "center",
    boxShadow: "0 10px 22px rgba(18,58,102,.12)",
    cursor: "pointer",
  },

  premiumBadge: {
    width: "fit-content",
    margin: "7px auto 4px",
    padding: "6px 15px",
    borderRadius: 999,
    background:
      "linear-gradient(135deg,#173f70,#245c93)",
    color: COLORS.white,
    fontSize: 14,
    fontWeight: 950,
    boxShadow:
      "0 8px 18px rgba(18,58,102,.20)",
  },

  missionNumber: {
    width: "fit-content",
    margin: "7px auto 0",
    padding: "5px 12px",
    border: `2px solid ${COLORS.gold}`,
    borderRadius: 999,
    background: COLORS.white,
    color: COLORS.navy,
    fontWeight: 950,
  },

  title: {
    margin: "8px 0 3px",
    color: COLORS.navyDeep,
    fontSize: "clamp(22px,5.6vw,34px)",
    lineHeight: 1.35,
    textAlign: "center",
  },

  subtitle: {
    maxWidth: 700,
    margin: "0 auto 7px",
    color: COLORS.muted,
    fontSize: "clamp(14px,3.5vw,18px)",
    fontWeight: 850,
    lineHeight: 1.55,
    textAlign: "center",
  },

  quantityVisual: {
    width: "min(620px,100%)",
    margin: "8px auto 10px",
    padding: 13,
    display: "grid",
    gridTemplateColumns: "repeat(5,minmax(42px,1fr))",
    gap: 8,
    border: `4px solid ${COLORS.gold}`,
    borderRadius: 25,
    background: "rgba(255,255,255,.96)",
    boxShadow: "0 12px 26px rgba(18,58,102,.13)",
  },

  quantityItem: {
    position: "relative",
    minHeight: 50,
    border: "0",
    display: "grid",
    placeItems: "center",
    borderRadius: 14,
    background: "linear-gradient(180deg,#effaff,#fff7da)",
    fontSize: "clamp(29px,8vw,43px)",
  },

  tapNumber: {
    position: "absolute",
    top: 3,
    right: 3,
    zIndex: 3,
    width: 27,
    height: 27,
    display: "grid",
    placeItems: "center",
    borderRadius: "50%",
    background: COLORS.navyDeep,
    color: "#fff",
    fontSize: 15,
    fontWeight: 950,
    boxShadow: "0 3px 7px rgba(0,0,0,.22)",
  },

  questionBox: {
    marginTop: 8,
    padding: "12px 14px",
    border: `4px solid ${COLORS.gold}`,
    borderRadius: 23,
    background: COLORS.white,
    color: COLORS.navyDeep,
    fontSize: "clamp(19px,4.8vw,27px)",
    fontWeight: 950,
    lineHeight: 1.55,
    textAlign: "center",
    boxShadow:
      "0 10px 22px rgba(18,58,102,.11)",
  },

  helper: {
    width: "fit-content",
    maxWidth: "100%",
    margin: "10px auto 12px",
    padding: "11px 18px",
    borderRadius: 999,
    background: "rgba(255,255,255,.98)",
    color: COLORS.navyDeep,
    fontSize: "clamp(16px,4.2vw,20px)",
    fontWeight: 950,
    lineHeight: 1.7,
    textAlign: "center",
    boxShadow: "0 8px 18px rgba(18,58,102,.10)",
  },

  options: {
    display: "grid",
    gap: 11,
    alignItems: "stretch",
  },

  optionCard: {
    position: "relative",
    minWidth: 0,
    overflow: "hidden",
    padding: 7,
    border: `4px solid ${COLORS.white}`,
    borderRadius: 25,
    color: COLORS.navyDeep,
    fontFamily:
      '"Tajawal","Noto Kufi Arabic",Arial,sans-serif',
    boxShadow:
      "0 12px 25px rgba(18,58,102,.14)",
    transition:
      "transform .22s ease,border-color .22s ease,background .22s ease",
    cursor: "pointer",
  },

  choiceBadge: {
    position: "absolute",
    top: 11,
    right: 11,
    zIndex: 2,
    width: 38,
    height: 38,
    display: "grid",
    placeItems: "center",
    borderRadius: "50%",
    color: COLORS.white,
    fontSize: 19,
    fontWeight: 950,
    boxShadow:
      "0 5px 12px rgba(0,0,0,.16)",
  },

  optionImage: {
    width: "100%",
    aspectRatio: "4 / 3",
    display: "block",
    borderRadius: 18,
  },

  emojiVisual: {
    minHeight: 140,
    display: "grid",
    placeItems: "center",
    borderRadius: 18,
    background:
      "linear-gradient(180deg,#effaff,#fff7da)",
    fontSize: "clamp(62px,15vw,110px)",
  },

  optionLabel: {
    display: "block",
    padding: "9px 7px 5px",
    fontSize: "clamp(15px,3.8vw,20px)",
    lineHeight: 1.45,
    textAlign: "center",
  },

  optionDescription: {
    display: "block",
    padding: "0 7px 8px",
    color: COLORS.muted,
    fontSize: 14,
    fontWeight: 800,
    lineHeight: 1.45,
    textAlign: "center",
  },

  explanation: {
    marginTop: 10,
    padding: "9px 13px",
    borderRadius: 18,
    background: "rgba(255,255,255,.92)",
    color: COLORS.navy,
    fontSize: "clamp(14px,3.7vw,18px)",
    fontWeight: 850,
    lineHeight: 1.6,
    textAlign: "center",
  },

  completePage: {
    minHeight: "100dvh",
    display: "grid",
    placeItems: "center",
    padding: 16,
    background:
      "linear-gradient(180deg,#eaf9ff,#fff0b8)",
    fontFamily:
      '"Tajawal","Noto Kufi Arabic",Arial,sans-serif',
  },

  completeCard: {
    width: "min(650px,100%)",
    padding: "26px 20px",
    border: `5px solid ${COLORS.white}`,
    borderRadius: 35,
    background: "rgba(255,255,255,.97)",
    textAlign: "center",
    boxShadow:
      "0 20px 48px rgba(18,58,102,.18)",
  },

  completeEmoji: {
    fontSize: 78,
  },

  completeTitle: {
    margin: "8px 0",
    color: COLORS.navyDeep,
    fontSize: "clamp(29px,8vw,44px)",
  },

  completeText: {
    color: COLORS.muted,
    fontSize: "clamp(17px,4.5vw,22px)",
    fontWeight: 850,
    lineHeight: 1.7,
  },

  summary: {
    margin: "16px 0",
    padding: 15,
    border: `3px solid ${COLORS.green}`,
    borderRadius: 22,
    background: "#f4fff8",
    color: COLORS.navyDeep,
    fontSize: "clamp(15px,4vw,19px)",
    fontWeight: 850,
    lineHeight: 1.7,
  },

  primaryButton: {
    width: "100%",
    minHeight: 61,
    marginTop: 10,
    border: 0,
    borderRadius: 20,
    background: COLORS.gold,
    color: COLORS.white,
    fontFamily: "inherit",
    fontSize: "clamp(18px,4.8vw,24px)",
    fontWeight: 950,
    cursor: "pointer",
  },

  secondaryButton: {
    width: "100%",
    minHeight: 61,
    marginTop: 10,
    border: 0,
    borderRadius: 20,
    background: COLORS.navy,
    color: COLORS.white,
    fontFamily: "inherit",
    fontSize: "clamp(18px,4.8vw,24px)",
    fontWeight: 950,
    cursor: "pointer",
  },

  emptyPage: {
    minHeight: "100dvh",
    display: "grid",
    placeItems: "center",
    padding: 20,
    background:
      "linear-gradient(180deg,#eaf9ff,#fff0b8)",
  },

  emptyCard: {
    padding: 24,
    borderRadius: 25,
    background: COLORS.white,
    color: COLORS.navy,
    fontSize: 20,
    fontWeight: 900,
    textAlign: "center",
  },
};
