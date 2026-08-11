import {
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
} from "react";

type Props = {
  words: string[];
  activeIndex?: number;
  activeWord?: string;

  /*
   * عدد الكلمات التي وصل وقت ظهورها.
   *
   * كل الكلمات موجودة منذ البداية في DOM
   * لحجز الحجم الكامل للجملة.
   *
   * الكلمات التي لم يصل وقتها:
   * visibility:hidden
   *
   * لذلك لا يتغير حجم البطاقة عند بدء الصوت.
   */
  shownWordCount?: number;
};

const COLORS = {
  white: "#ffffff",
  navy: "#17365f",
  gold: "#edb21f",
};

function cleanText(text: string) {
  return (text || "")
    .replace(/[،,.!?؟؛:]/g, "")
    .trim();
}

export default function UnifiedExerciseKaraokeV2({
  words,
  activeIndex = -1,
  activeWord = "",
  shownWordCount,
}: Props) {
  const cleanActiveWord =
    cleanText(activeWord);

  /*
   * MODERN MODE
   * -----------
   * UnifiedLessonExercisesV2 sends shownWordCount.
   * In that case we use it exactly as supplied.
   *
   * LEGACY MODE
   * -----------
   * Older exercise engines send only activeIndex
   * or activeWord.
   *
   * We therefore remember the farthest word reached
   * during the current sentence.
   *
   * This gives the same visual logic:
   *
   * future  -> hidden
   * current -> gold
   * past    -> navy
   */
  const wordsSignature =
    useMemo(
      () => words.join("\u0001"),
      [words],
    );

  const [legacyShownWordCount, setLegacyShownWordCount] =
    useState(0);

  useEffect(() => {
    setLegacyShownWordCount(0);
  }, [wordsSignature]);

  const legacyActiveIndex =
    useMemo(
      () => {
        if (
          activeIndex >= 0
          && activeIndex < words.length
        ) {
          return activeIndex;
        }

        if (
          cleanActiveWord.length === 0
        ) {
          return -1;
        }

        return words.findIndex(
          (word) =>
            cleanText(word)
              === cleanActiveWord,
        );
      },
      [
        activeIndex,
        cleanActiveWord,
        words,
      ],
    );

  useEffect(() => {
    if (shownWordCount !== undefined) {
      return;
    }

    if (legacyActiveIndex < 0) {
      return;
    }

    setLegacyShownWordCount(
      (previous) =>
        Math.max(
          previous,
          legacyActiveIndex + 1,
        ),
    );
  }, [
    shownWordCount,
    legacyActiveIndex,
  ]);

  const effectiveShownWordCount =
    shownWordCount !== undefined
      ? Math.max(
          0,
          Math.min(
            words.length,
            shownWordCount,
          ),
        )
      : legacyShownWordCount;

  const effectiveActiveIndex =
    activeIndex >= 0
      ? activeIndex
      : legacyActiveIndex;

  return (
    <div
      className="unified-exercise-karaoke-v2"
      style={styles.questionBox}
    >
      <div
        className="unified-exercise-karaoke-v2__text"
        style={styles.questionText}
      >
        {words.map((word, index) => {
          const isShown =
            index < effectiveShownWordCount;

          const isActive =
            isShown
            && effectiveActiveIndex >= 0
            && index === effectiveActiveIndex;

          return (
            <span
              key={`${word}-${index}`}
              style={
                !isShown
                  ? styles.wordHidden
                  : isActive
                    ? styles.wordActive
                    : styles.wordShown
              }
            >
              {word}{" "}
            </span>
          );
        })}
      </div>
    </div>
  );
}

const styles: Record<
  string,
  CSSProperties
> = {
  questionBox: {
    width: "100%",
    maxWidth: 620,
    margin: "0 auto 10px",
    background:
      "rgba(255,255,255,.96)",
    border:
      `4px solid ${COLORS.gold}`,
    borderRadius: 22,
    padding: "12px 12px",
    textAlign: "center",
    boxShadow:
      "0 6px 14px rgba(0,0,0,.07)",
    boxSizing: "border-box",
  },

  questionText: {
    fontSize:
      "clamp(20px,5.4vw,32px)",
    lineHeight: 1.55,
    fontWeight: 1000,
    color: COLORS.navy,
  },

  /*
   * الكلمة موجودة وتحجز مكانها،
   * لكنها غير مرئية قبل وصول توقيتها.
   */
  wordHidden: {
    display: "inline-block",
    visibility: "hidden",
    padding: "0 2px",
    borderRadius: 8,
    color: COLORS.gold,
    background: "transparent",
  },

  /*
   * الكلمة بعد ظهورها تبقى ذهبية.
   */
  /*
   * الكلمة التي انتهى نطقها تبقى ظاهرة
   * لكن تعود إلى اللون العادي.
   */
  wordShown: {
    display: "inline-block",
    visibility: "visible",
    padding: "0 2px",
    borderRadius: 8,
    color: COLORS.navy,
    fontWeight: 900,
    background: "transparent",
    transition:
      "color .18s ease",
  },

  /*
   * الكلمة التي ينطقها الصوت حاليًا
   * تكون أوضح قليلًا، دون تغيير مساحة النص.
   */
  wordActive: {
    display: "inline-block",
    visibility: "visible",
    color: COLORS.gold,
    fontWeight: 1000,
    transform:
      "translateY(-2px) scale(1.06)",
    transformOrigin: "center",
    transition:
      "transform .18s ease",
    padding: "0 2px",
    borderRadius: 8,
    background: "transparent",
  },
};
