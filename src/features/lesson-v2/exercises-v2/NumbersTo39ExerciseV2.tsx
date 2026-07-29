import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

import UnifiedExerciseAnswersV2
  from "../components/UnifiedExerciseAnswersV2";

import UnifiedExerciseScreenV2
  from "../components/UnifiedExerciseScreenV2";

import type {
  Lesson48Item,
  Lesson48Mode,
  Lesson48Option,
} from "../content/lesson48_types";

const CORRECT_SOUND =
  "/audio/v2_feedback/correct.mp3";

const RETRY_SOUND =
  "/audio/v2_feedback/retry.mp3";

const FEEDBACK_DELAY = 760;
const KARAOKE_LEAD_MS = 0;

const EMPTY_ITEMS:
  Lesson48Item[] = [];

const BACKGROUNDS:
  Record<Lesson48Mode, string> = {
    "tens-ones":
      "/lessons/v2/lesson48-numbers-to-39/s2.webp",

    "number-to-word":
      "/lessons/v2/lesson48-numbers-to-39/s3.webp",

    "complete-sequence":
      "/lessons/v2/lesson48-numbers-to-39/s5.webp",

    "number-decomposition":
      "/lessons/v2/lesson48-numbers-to-39/s4.webp",
  };

type FeedbackState =
  | "idle"
  | "correct"
  | "wrong";

type WordTiming = {
  text: string;
  offset: number;
  duration: number;
};

type NumbersTo39ExerciseV2Props = {
  items?: Lesson48Item[];
  questions?: Lesson48Item[];

  audio_base?: string;
  audioBase?: string;

  missionTitle?: string;
  mission_title?: string;

  onComplete?: () => void;
  onDone?: () => void;
};

function isWordTiming(
  value: unknown,
): value is WordTiming {
  if (
    typeof value !== "object" ||
    value === null
  ) {
    return false;
  }

  const word =
    value as Partial<WordTiming>;

  return (
    typeof word.text === "string" &&
    typeof word.offset === "number" &&
    typeof word.duration === "number"
  );
}

function playFeedback(
  source: string,
) {
  const audio =
    new Audio(source);

  audio.play().catch(
    () => undefined,
  );
}

function TensRod({
  index,
}: {
  index: number;
}) {
  return (
    <div
      aria-label={`العشرة ${index + 1}`}
      style={styles.tenRod}
    >
      {Array.from({
        length: 10,
      }).map((_, cell) => (
        <span
          key={cell}
          style={styles.tenCell}
        />
      ))}
    </div>
  );
}

function UnitToken({
  index,
}: {
  index: number;
}) {
  return (
    <span
      aria-label={`الوحدة ${index + 1}`}
      style={styles.unitToken}
    >
      {index + 1}
    </span>
  );
}

function PlaceValueActivity({
  item,
}: {
  item: Lesson48Item;
}) {
  const tens =
    item.tens ?? 0;

  const ones =
    item.ones ?? 0;

  return (
    <section
      aria-label="تمثيل العشرات والوحدات"
      style={styles.activityShell}
    >
      <div style={styles.activityBadge}>
        مَدِينَةُ الأَعْدَادِ
      </div>

      <div style={styles.placeValueGrid}>
        <article style={styles.placeColumn}>
          <header style={styles.placeHeader}>
            <span>العَشَرَاتُ</span>
            <strong>{tens}</strong>
          </header>

          <div style={styles.rodsArea}>
            {Array.from({
              length: tens,
            }).map((_, index) => (
              <TensRod
                key={index}
                index={index}
              />
            ))}
          </div>
        </article>

        <article style={styles.placeColumn}>
          <header style={styles.placeHeader}>
            <span>الوَحَدَاتُ</span>
            <strong>{ones}</strong>
          </header>

          <div style={styles.unitsArea}>
            {Array.from({
              length: ones,
            }).map((_, index) => (
              <UnitToken
                key={index}
                index={index}
              />
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}

function NumberTicketActivity({
  item,
}: {
  item: Lesson48Item;
}) {
  return (
    <section
      aria-label="بطاقة العدد"
      style={styles.activityShell}
    >
      <div style={styles.activityBadge}>
        بِطَاقَةُ العَدَدِ
      </div>

      <div style={styles.numberTicket}>
        <span style={styles.ticketStar}>
          ★
        </span>

        <strong style={styles.ticketNumber}>
          {item.number}
        </strong>

        <span style={styles.ticketCaption}>
          اِقْرَأْنِي
        </span>

        <span style={styles.ticketStar}>
          ★
        </span>
      </div>
    </section>
  );
}


function TrainCar({
  value,
  index,
  revealedValue,
}: {
  value: number | null;
  index: number;
  revealedValue?: number;
}) {
  const missing =
    value === null;

  const revealed =
    missing &&
    revealedValue !== undefined;

  const visibleValue =
    revealed
      ? revealedValue
      : value;

  return (
    <div style={styles.trainCarWrap}>
      <div
        aria-label={
          missing && !revealed
            ? "العربة الناقصة"
            : `العربة ${index + 1}: ${visibleValue}`
        }
        style={{
          ...styles.trainCar,

          ...(missing && !revealed
            ? styles.trainCarMissing
            : {}),

          ...(revealed
            ? {
                borderColor: "#159957",
                background:
                  "linear-gradient(145deg, #edfff5, #baf1d0)",
                color: "#107044",
                transform: "scale(1.04)",
              }
            : {}),
        }}
      >
        {missing && !revealed
          ? "؟"
          : visibleValue}
      </div>

      <div style={styles.wheels}>
        <span style={styles.wheel} />
        <span style={styles.wheel} />
      </div>
    </div>
  );
}



function SequenceActivity({
  item,
  revealCorrect,
}: {
  item: Lesson48Item;
  revealCorrect: boolean;
}) {
  const numericAnswer =
    Number(item.answer);

  const revealedValue =
    revealCorrect &&
    Number.isFinite(numericAnswer)
      ? numericAnswer
      : undefined;

  return (
    <section
      aria-label="القطار العددي"
      style={styles.activityShell}
    >
      <div style={styles.activityBadge}>
        القِطَارُ العَدَدِيُّ
      </div>

      <div style={styles.train}>
        <div
          aria-label="قاطرة القطار"
          style={styles.locomotive}
        >
          <span style={styles.chimney} />
        </div>

        {(item.sequence ?? []).map(
          (value, index) => (
            <TrainCar
              key={`${index}-${value ?? "missing"}`}
              value={value}
              index={index}
              revealedValue={
                value === null
                  ? revealedValue
                  : undefined
              }
            />
          ),
        )}
      </div>

      <div style={styles.trainTrack}>
        <span />
        <span />
      </div>
    </section>
  );
}



function DecompositionActivity({
  item,
  revealCorrect,
}: {
  item: Lesson48Item;
  revealCorrect: boolean;
}) {
  const number =
    item.number ?? 0;

  const tens =
    Math.floor(number / 10);

  const ones =
    number % 10;

  return (
    <section
      aria-label="آلة تفكيك العدد"
      style={styles.activityShell}
    >
      <div style={styles.activityBadge}>
        آلَةُ تَفْكِيكِ العَدَدِ
      </div>

      <div style={styles.numberMachine}>
        <div style={styles.machineScreen}>
          {number}
        </div>

        <div style={styles.machineArrow}>
          ↓
        </div>

        <div style={styles.machineSlots}>
          <div
            style={{
              ...styles.machineSlot,

              ...(revealCorrect
                ? {
                    borderColor: "#24ad68",
                    background: "#effff6",
                  }
                : {}),
            }}
          >
            <span>العَشَرَاتُ</span>

            <strong>
              {revealCorrect
                ? tens
                : "؟"}
            </strong>
          </div>

          <div
            style={{
              ...styles.machineSlot,

              ...(revealCorrect
                ? {
                    borderColor: "#24ad68",
                    background: "#effff6",
                  }
                : {}),
            }}
          >
            <span>الوَحَدَاتُ</span>

            <strong>
              {revealCorrect
                ? ones
                : "؟"}
            </strong>
          </div>
        </div>
      </div>
    </section>
  );
}



function PremiumActivity({
  item,
  revealCorrect,
}: {
  item: Lesson48Item;
  revealCorrect: boolean;
}): ReactNode {
  switch (item.mode) {
    case "tens-ones":
      return (
        <PlaceValueActivity
          item={item}
        />
      );

    case "number-to-word":
      return (
        <NumberTicketActivity
          item={item}
        />
      );

    case "complete-sequence":
      return (
        <SequenceActivity
          item={item}
          revealCorrect={revealCorrect}
        />
      );

    case "number-decomposition":
      return (
        <DecompositionActivity
          item={item}
          revealCorrect={revealCorrect}
        />
      );

    default:
      return null;
  }
}


function AnswerContent({
  item,
  option,
}: {
  item: Lesson48Item;
  option: Lesson48Option;
}) {
  if (
    item.mode ===
      "number-decomposition" &&
    option.tens !== undefined &&
    option.ones !== undefined
  ) {
    return (
      <div style={styles.decompositionOption}>
        <div style={styles.decompositionPart}>
          <strong>{option.tens}</strong>
          <span>عَشَرَاتٍ</span>
        </div>

        <div style={styles.plusSign}>
          +
        </div>

        <div style={styles.decompositionPart}>
          <strong>{option.ones}</strong>
          <span>وَحَدَاتٍ</span>
        </div>
      </div>
    );
  }

  if (
    item.mode ===
    "number-to-word"
  ) {
    return (
      <span style={styles.wordOption}>
        {option.label}
      </span>
    );
  }

  return (
    <span style={styles.numberOption}>
      {option.label}
    </span>
  );
}

export default function
NumbersTo39ExerciseV2({
  items,
  questions,
  audio_base,
  audioBase,
  missionTitle,
  mission_title,
  onComplete,
  onDone,
}: NumbersTo39ExerciseV2Props) {
  const exerciseItems =
    items ??
    questions ??
    EMPTY_ITEMS;

  const resolvedAudioBase =
    audio_base ??
    audioBase ??
    "";

  const resolvedMissionTitle =
    missionTitle ??
    mission_title ??
    "";

  const finishMission =
    onComplete ??
    onDone ??
    (() => undefined);

  const [
    index,
    setIndex,
  ] = useState(0);

  const [
    selectedId,
    setSelectedId,
  ] = useState<string | null>(
    null,
  );

  const [
    feedback,
    setFeedback,
  ] = useState<FeedbackState>(
    "idle",
  );

  const [
    words,
    setWords,
  ] = useState<WordTiming[]>(
    [],
  );

  const [
    activeWordIndex,
    setActiveWordIndex,
  ] = useState(-1);

  const [
    isPlaying,
    setIsPlaying,
  ] = useState(false);

  const audioRef =
    useRef<HTMLAudioElement | null>(
      null,
    );

  const boundariesRef =
    useRef<WordTiming[]>([]);

  const feedbackTimerRef =
    useRef<number | null>(
      null,
    );

  const item =
    exerciseItems[index];

  const clearFeedbackTimer =
    useCallback(() => {
      if (
        feedbackTimerRef.current !==
        null
      ) {
        window.clearTimeout(
          feedbackTimerRef.current,
        );

        feedbackTimerRef.current =
          null;
      }
    }, []);

  const stopQuestionAudio =
    useCallback(() => {
      const audio =
        audioRef.current;

      if (audio) {
        audio.pause();
      }

      setIsPlaying(false);
      setActiveWordIndex(-1);
    }, []);

  useEffect(() => {
    return () => {
      clearFeedbackTimer();
      stopQuestionAudio();
    };
  }, [
    clearFeedbackTimer,
    stopQuestionAudio,
  ]);

  useEffect(() => {
    if (
      !item ||
      !resolvedAudioBase
    ) {
      return;
    }

    clearFeedbackTimer();

    let cancelled = false;
    let karaokeFrame = 0;

    boundariesRef.current = [];

    setSelectedId(null);
    setFeedback("idle");
    setWords([]);
    setActiveWordIndex(-1);

    const cacheToken =
      encodeURIComponent(
        `${Date.now()}-${item.id}-${item.question_audio_key}`,
      );

    const audioSource =
      `${resolvedAudioBase}/` +
      `${item.question_audio_key}.mp3` +
      `?v=${cacheToken}`;

    const boundarySource =
      `${resolvedAudioBase}/` +
      `${item.question_audio_key}.json` +
      `?v=${cacheToken}`;

    fetch(
      boundarySource,
      {
        cache: "no-store",
      },
    )
      .then((response) => {
        if (!response.ok) {
          return [];
        }

        return response.json();
      })
      .then((data: unknown) => {
        if (cancelled) {
          return;
        }

        const validWords =
          Array.isArray(data)
            ? data
                .filter(isWordTiming)
                .map((word) => ({
                  text: word.text,
                  offset:
                    Number(word.offset) ||
                    0,
                  duration:
                    Number(word.duration) ||
                    1,
                }))
            : [];

        boundariesRef.current =
          validWords;

        setWords(validWords);
      })
      .catch(() => {
        if (!cancelled) {
          boundariesRef.current = [];
          setWords([]);
        }
      });

    const audio =
      new Audio(audioSource);

    audio.preload = "auto";
    audioRef.current = audio;

    const updateKaraoke = () => {
      if (cancelled) {
        return;
      }

      const currentMs =
        Math.max(
          0,
          audio.currentTime * 1000 +
            KARAOKE_LEAD_MS,
        );

      const boundaries =
        boundariesRef.current;

      let nextIndex = -1;

      for (
        let wordIndex = 0;
        wordIndex <
        boundaries.length;
        wordIndex += 1
      ) {
        const start =
          Number(
            boundaries[wordIndex]
              .offset,
          ) || 0;

        const nextStart =
          wordIndex <
          boundaries.length - 1
            ? Number(
                boundaries[
                  wordIndex + 1
                ].offset,
              )
            : Number.POSITIVE_INFINITY;

        const fallbackEnd =
          start +
          Math.max(
            Number(
              boundaries[wordIndex]
                .duration,
            ) || 0,
            650,
          );

        const end =
          wordIndex <
          boundaries.length - 1
            ? nextStart
            : Number.isFinite(
                  audio.duration,
                )
              ? audio.duration *
                  1000 +
                80
              : fallbackEnd;

        if (
          currentMs >= start &&
          currentMs < end
        ) {
          nextIndex = wordIndex;
          break;
        }
      }

      setActiveWordIndex(
        nextIndex,
      );

      if (
        !audio.paused &&
        !audio.ended
      ) {
        karaokeFrame =
          window.requestAnimationFrame(
            updateKaraoke,
          );
      }
    };

    const handlePlay = () => {
      if (cancelled) {
        return;
      }

      setIsPlaying(true);

      window.cancelAnimationFrame(
        karaokeFrame,
      );

      karaokeFrame =
        window.requestAnimationFrame(
          updateKaraoke,
        );
    };

    const handlePause = () => {
      window.cancelAnimationFrame(
        karaokeFrame,
      );

      if (!cancelled) {
        setIsPlaying(false);
      }
    };

    const handleEnded = () => {
      window.cancelAnimationFrame(
        karaokeFrame,
      );

      if (!cancelled) {
        setIsPlaying(false);
        setActiveWordIndex(-1);
      }
    };

    audio.addEventListener(
      "play",
      handlePlay,
    );

    audio.addEventListener(
      "pause",
      handlePause,
    );

    audio.addEventListener(
      "ended",
      handleEnded,
    );

    const autoPlayTimer =
      window.setTimeout(() => {
        audio.play().catch(
          () => undefined,
        );
      }, 320);

    return () => {
      cancelled = true;

      window.clearTimeout(
        autoPlayTimer,
      );

      window.cancelAnimationFrame(
        karaokeFrame,
      );

      audio.removeEventListener(
        "play",
        handlePlay,
      );

      audio.removeEventListener(
        "pause",
        handlePause,
      );

      audio.removeEventListener(
        "ended",
        handleEnded,
      );

      audio.pause();

      if (
        audioRef.current === audio
      ) {
        audioRef.current = null;
      }
    };
  }, [
    item?.id,
    item?.question_audio_key,
    resolvedAudioBase,
    clearFeedbackTimer,
  ]);

  if (!item) {
    return null;
  }

  const questionWords =
    words.length > 0
      ? words.map(
          (word) => word.text,
        )
      : item.question
          .trim()
          .split(/\s+/);

  const answerOptions =
    item.options.map(
      (option) => ({
        id: option.id,

        ariaLabel:
          option.label,

        content: (
          <AnswerContent
            item={item}
            option={option}
          />
        ),
      }),
    );

  const answerColumns =
    item.mode ===
      "number-to-word" ||
    item.mode ===
      "number-decomposition"
      ? 1
      : 3;

  const replayQuestion = () => {
    const audio =
      audioRef.current;

    if (!audio) {
      return;
    }

    audio.currentTime = 0;

    audio.play().catch(
      () => undefined,
    );
  };

  const chooseAnswer = (
    id: string,
  ) => {
    if (feedback !== "idle") {
      return;
    }

    stopQuestionAudio();
    clearFeedbackTimer();

    setSelectedId(id);

    if (id === item.answer) {
      setFeedback("correct");
      playFeedback(CORRECT_SOUND);

      feedbackTimerRef.current =
        window.setTimeout(() => {
          feedbackTimerRef.current =
            null;

          if (
            index + 1 <
            exerciseItems.length
          ) {
            setIndex(
              (current) =>
                current + 1,
            );
          } else {
            finishMission();
          }
        }, FEEDBACK_DELAY);

      return;
    }

    setFeedback("wrong");
    playFeedback(RETRY_SOUND);

    feedbackTimerRef.current =
      window.setTimeout(() => {
        feedbackTimerRef.current =
          null;

        setSelectedId(null);
        setFeedback("idle");
      }, FEEDBACK_DELAY);
  };

  return (
    <UnifiedExerciseScreenV2
      index={index}
      total={exerciseItems.length}
      missionTitle={
        resolvedMissionTitle
      }
      questionWords={
        questionWords
      }
      activeWordIndex={
        activeWordIndex
      }
      activeWord={
        activeWordIndex >= 0
          ? questionWords[
              activeWordIndex
            ] ?? ""
          : ""
      }
      onReplay={
        replayQuestion
      }
      isPlaying={
        isPlaying
      }
      backgroundImage={
        BACKGROUNDS[item.mode]
      }
      activity={
        <PremiumActivity
          item={item}
          revealCorrect={
            feedback === "correct" &&
            selectedId === item.answer
          }
        />
      }
      answers={
        <UnifiedExerciseAnswersV2
          options={
            answerOptions
          }
          selectedId={
            selectedId
          }
          feedback={
            feedback
          }
          correctId={
            item.answer
          }
          showCorrect={
            false
          }
          onSelect={
            chooseAnswer
          }
          variant="text"
          columns={
            answerColumns
          }
          disabled={
            feedback !== "idle"
          }
          direction="rtl"
        />
      }
      feedback={feedback}
      activityLabel={
        "نشاط الأعداد إلى 39"
      }
      answersLabel={
        "اختر الإجابة الصحيحة"
      }
    />
  );
}

const styles:
  Record<string, CSSProperties> = {
    activityShell: {
      width: "100%",
      maxWidth: 720,
      minHeight: 270,
      margin: "0 auto",
      padding: "18px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 16,
      boxSizing: "border-box",
      border:
        "4px solid rgba(232, 160, 32, 0.92)",
      borderRadius: 30,
      background:
        "linear-gradient(145deg, rgba(255,255,255,0.98), rgba(255,248,226,0.96))",
      boxShadow:
        "0 16px 38px rgba(15, 36, 71, 0.19), inset 0 1px 0 #ffffff",
      overflow: "hidden",
    },

    activityBadge: {
      alignSelf: "center",
      padding: "7px 20px",
      borderRadius: 999,
      background:
        "linear-gradient(135deg, #17365f, #275c9b)",
      boxShadow:
        "0 7px 16px rgba(23,54,95,0.22)",
      color: "#ffffff",
      fontSize:
        "clamp(15px, 3.6vw, 20px)",
      fontWeight: 900,
      letterSpacing: "0.02em",
    },

    placeValueGrid: {
      width: "100%",
      display: "grid",
      gridTemplateColumns:
        "repeat(2, minmax(0, 1fr))",
      gap: 14,
    },

    placeColumn: {
      minHeight: 190,
      padding: 12,
      display: "flex",
      flexDirection: "column",
      gap: 12,
      border:
        "3px solid rgba(23,54,95,0.82)",
      borderRadius: 22,
      background:
        "linear-gradient(180deg, #ffffff, #f4f9ff)",
      boxShadow:
        "0 8px 20px rgba(23,54,95,0.11)",
    },

    placeHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent:
        "space-between",
      gap: 8,
      color: "#17365f",
      fontSize:
        "clamp(17px, 4vw, 23px)",
      fontWeight: 900,
    },

    rodsArea: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: 8,
    },

    tenRod: {
      width: 42,
      padding: 5,
      display: "grid",
      gridTemplateColumns:
        "repeat(2, 1fr)",
      gap: 3,
      border:
        "3px solid #bb7511",
      borderRadius: 12,
      background:
        "linear-gradient(180deg, #ffd965, #f2a91d)",
      boxShadow:
        "0 6px 12px rgba(187,117,17,0.2)",
    },

    tenCell: {
      width: 12,
      height: 12,
      borderRadius: 4,
      border:
        "1px solid rgba(126,73,6,0.44)",
      background:
        "rgba(255,255,255,0.66)",
    },

    unitsArea: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      alignContent: "center",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: 7,
    },

    unitToken: {
      width: 34,
      height: 34,
      display: "grid",
      placeItems: "center",
      border:
        "3px solid #1d6a9e",
      borderRadius: "50%",
      background:
        "linear-gradient(145deg, #6ed6ff, #2aa7df)",
      boxShadow:
        "0 5px 10px rgba(29,106,158,0.21)",
      color: "#ffffff",
      fontSize: 15,
      fontWeight: 900,
    },

    numberTicket: {
      width: "min(430px, 92%)",
      minHeight: 180,
      padding: "20px 28px",
      display: "grid",
      gridTemplateColumns:
        "auto 1fr auto",
      gridTemplateRows:
        "1fr auto",
      alignItems: "center",
      justifyItems: "center",
      border:
        "5px solid #e8a020",
      borderRadius: 28,
      background:
        "radial-gradient(circle at top, #ffffff, #fff2c7)",
      boxShadow:
        "0 16px 32px rgba(125,79,10,0.2)",
    },

    ticketNumber: {
      color: "#17365f",
      fontSize:
        "clamp(84px, 23vw, 138px)",
      fontWeight: 1000,
      lineHeight: 0.95,
      fontVariantNumeric:
        "tabular-nums",
      textShadow:
        "0 5px 0 rgba(232,160,32,0.22)",
    },

    ticketStar: {
      color: "#e8a020",
      fontSize:
        "clamp(26px, 6vw, 42px)",
    },

    ticketCaption: {
      gridColumn: "1 / -1",
      padding: "6px 18px",
      borderRadius: 999,
      background: "#17365f",
      color: "#ffffff",
      fontSize: 17,
      fontWeight: 900,
    },

    train: {
      width: "100%",
      minHeight: 150,
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: 8,
      direction: "ltr",
    },

    locomotive: {
      width: 82,
      height: 88,
      position: "relative",
      display: "grid",
      placeItems: "center",
      border:
        "4px solid #16345d",
      borderRadius:
        "18px 30px 14px 14px",
      background:
        "linear-gradient(145deg, #25a66c, #13744a)",
      boxShadow:
        "0 9px 18px rgba(19,116,74,0.23)",
      color: "#ffffff",
      fontSize: 20,
    },

    chimney: {
      width: 18,
      height: 30,
      position: "absolute",
      top: -25,
      left: 15,
      border:
        "3px solid #16345d",
      borderRadius: "6px 6px 2px 2px",
      background: "#e8a020",
    },

    trainCarWrap: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },

    trainCar: {
      width: 64,
      height: 72,
      display: "grid",
      placeItems: "center",
      border:
        "4px solid #17365f",
      borderRadius: 17,
      background:
        "linear-gradient(145deg, #ffffff, #dff2ff)",
      boxShadow:
        "0 8px 16px rgba(23,54,95,0.15)",
      color: "#17365f",
      fontSize:
        "clamp(27px, 7vw, 38px)",
      fontWeight: 1000,
      fontVariantNumeric:
        "tabular-nums",
    },

    trainCarMissing: {
      borderStyle: "dashed",
      borderColor: "#d34f47",
      background:
        "linear-gradient(145deg, #fff5f3, #ffdeda)",
      color: "#d34f47",
    },

    wheels: {
      marginTop: -2,
      display: "flex",
      gap: 25,
    },

    wheel: {
      width: 13,
      height: 13,
      border:
        "3px solid #17365f",
      borderRadius: "50%",
      background: "#e8a020",
    },

    trainTrack: {
      width: "90%",
      height: 13,
      marginTop: -8,
      padding: "0 7px",
      display: "flex",
      flexDirection: "column",
      justifyContent:
        "space-between",
      borderRadius: 999,
      background:
        "repeating-linear-gradient(90deg, #6b4c32 0 10px, transparent 10px 17px)",
      borderTop:
        "3px solid #17365f",
      borderBottom:
        "3px solid #17365f",
    },

    numberMachine: {
      width: "min(450px, 95%)",
      padding: 17,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 10,
      border:
        "5px solid #17365f",
      borderRadius: 30,
      background:
        "linear-gradient(145deg, #315f93, #17365f)",
      boxShadow:
        "0 16px 30px rgba(23,54,95,0.23)",
    },

    machineScreen: {
      width: "75%",
      minHeight: 105,
      display: "grid",
      placeItems: "center",
      border:
        "5px solid #e8a020",
      borderRadius: 20,
      background:
        "linear-gradient(180deg, #fffef4, #ffedb0)",
      color: "#17365f",
      fontSize:
        "clamp(70px, 20vw, 112px)",
      fontWeight: 1000,
      lineHeight: 1,
      fontVariantNumeric:
        "tabular-nums",
    },

    machineArrow: {
      color: "#ffffff",
      fontSize: 36,
      fontWeight: 1000,
      lineHeight: 1,
    },

    machineSlots: {
      width: "100%",
      display: "grid",
      gridTemplateColumns:
        "repeat(2, minmax(0, 1fr))",
      gap: 10,
    },

    machineSlot: {
      minHeight: 76,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      border:
        "3px solid #e8a020",
      borderRadius: 17,
      background:
        "rgba(255,255,255,0.95)",
      color: "#17365f",
      fontSize: 17,
      fontWeight: 900,
    },

    decompositionOption: {
      width: "100%",
      minHeight: 68,
      display: "grid",
      gridTemplateColumns:
        "1fr auto 1fr",
      alignItems: "center",
      gap: 10,
      direction: "rtl",
    },

    decompositionPart: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      color: "#17365f",
      fontSize:
        "clamp(17px, 4vw, 22px)",
      fontWeight: 900,
    },

    plusSign: {
      color: "#e8a020",
      fontSize: 28,
      fontWeight: 1000,
    },

    wordOption: {
      display: "block",
      width: "100%",
      padding: "4px 8px",
      color: "#17365f",
      fontSize:
        "clamp(20px, 4.8vw, 29px)",
      fontWeight: 900,
      lineHeight: 1.7,
      textAlign: "center",
    },

    numberOption: {
      display: "block",
      width: "100%",
      color: "#17365f",
      fontSize:
        "clamp(34px, 8vw, 52px)",
      fontWeight: 1000,
      lineHeight: 1.2,
      textAlign: "center",
      fontVariantNumeric:
        "tabular-nums",
    },
  };
