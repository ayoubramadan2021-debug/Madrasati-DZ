import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import UnifiedExerciseAnswersV2 from "../components/UnifiedExerciseAnswersV2";
import UnifiedExerciseScreenV2 from "../components/UnifiedExerciseScreenV2";

export type TableReadingMode =
  | "cell"
  | "row"
  | "column"
  | "inference";

export type TableReadingColumn = {
  key: string;
  label: string;
};

export type TableReadingRow = {
  id: string;
  label: string;
  icon?: string;
  values: Record<string, string | number>;
};

export type TableReadingAnswer = {
  id: string;
  label: string;
};

export type TableReadingItem = {
  id: string;

  mode: TableReadingMode;

  missionTitle: string;

  question: string;
  question_audio_key: string;

  background_image?: string;

  tableTitle: string;
  cornerLabel?: string;

  columns: TableReadingColumn[];
  rows: TableReadingRow[];

  focusRowId?: string;
  focusColumnKey?: string;

  helperText?: string;

  options: TableReadingAnswer[];
  correctId: string;

  answerVariant?: "number" | "text";
  answerColumns?: 1 | 2 | 3;
};

export type TableReadingExerciseV2Props = {
  items: TableReadingItem[];

  audio_base: string;

  onComplete?: (
    score: number,
    total: number,
  ) => void;
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

const FEEDBACK_CORRECT =
  "/audio/v2_feedback/correct.mp3";

const FEEDBACK_RETRY =
  "/audio/v2_feedback/retry.mp3";

async function loadWordTimings(
  audioBase: string,
  key: string,
): Promise<WordTiming[] | null> {
  try {
    const response = await fetch(
      `${audioBase}/${key}.json`,
    );

    if (!response.ok) {
      return null;
    }

    return (
      await response.json()
    ) as WordTiming[];
  } catch {
    return null;
  }
}

function playFeedback(
  correct: boolean,
): void {
  try {
    const audio = new Audio(
      correct
        ? FEEDBACK_CORRECT
        : FEEDBACK_RETRY,
    );

    void audio.play();
  } catch {
    // يبقى النشاط فعالًا دون المؤثر الصوتي.
  }
}

function TableBoard({
  item,
}: {
  item: TableReadingItem;
}) {
  return (
    <div
      className="table-reading-board"
      dir="rtl"
    >
      <style>{`
        .table-reading-board {
          width: 100%;
          max-width: 680px;
          box-sizing: border-box;
          padding: 8px 4px;
          margin: 0 auto;
        }

        .table-reading-title {
          width: fit-content;
          max-width: calc(100% - 16px);
          box-sizing: border-box;

          margin: 0 auto 8px;
          padding: 7px 18px;

          border: 3px solid #E8A020;
          border-radius: 999px;

          background: rgba(255,248,224,.97);
          color: #17365F;

          font-family:
            "Tajawal",
            system-ui,
            sans-serif;

          font-size:
            clamp(16px, 4.6vw, 22px);

          line-height: 1.4;
          font-weight: 1000;
          text-align: center;

          box-shadow:
            0 5px 12px rgba(232,160,32,.16);
        }

        .table-reading-helper {
          margin: 0 auto 8px;
          padding: 0 12px;

          color: #52677F;

          font-family:
            "Tajawal",
            system-ui,
            sans-serif;

          font-size:
            clamp(13px, 3.7vw, 17px);

          line-height: 1.55;
          font-weight: 900;
          text-align: center;
        }

        .table-reading-scroll {
          width: 100%;
          overflow-x: auto;
          overscroll-behavior-x: contain;
          padding-bottom: 4px;
        }

        .table-reading-table {
          width: 100%;
          min-width: 470px;

          table-layout: fixed;
          border-collapse: separate;
          border-spacing: 5px;
        }

        .table-reading-table th,
        .table-reading-table td {
          box-sizing: border-box;
          height: 54px;
          padding: 7px 5px;

          border: 3px solid #D9E1EA;
          border-radius: 14px;

          background: rgba(255,255,255,.97);
          color: #17365F;

          font-family:
            "Tajawal",
            system-ui,
            sans-serif;

          font-size:
            clamp(15px, 4vw, 20px);

          line-height: 1.3;
          font-weight: 1000;
          text-align: center;

          box-shadow:
            0 4px 10px rgba(23,54,95,.08);

          transition:
            transform .2s ease,
            border-color .2s ease,
            background .2s ease,
            box-shadow .2s ease;
        }

        .table-reading-table thead th {
          border-color: #E8A020;

          background:
            linear-gradient(
              180deg,
              #FFF6D9,
              #FFE9A8
            );

          color: #68450D;
        }

        .table-reading-row-heading {
          border-color: #73A1D5 !important;

          background:
            linear-gradient(
              180deg,
              #F5FAFF,
              #E7F2FE
            ) !important;
        }

        .table-reading-icon {
          display: inline-block;
          margin-left: 5px;

          color: #3579BC;

          font-family:
            "Segoe UI Symbol",
            "Noto Sans Symbols 2",
            sans-serif;

          font-size: 23px;
          vertical-align: middle;

          filter:
            grayscale(1)
            sepia(1)
            saturate(7)
            hue-rotate(170deg)
            brightness(.78);

          text-shadow:
            0 2px 5px rgba(53,121,188,.18);
        }

        .table-reading-row-focus {
          border-color: #5991D1 !important;
          background: #EAF4FF !important;
        }

        .table-reading-column-focus {
          border-color: #D59A17 !important;
          background: #FFF5D0 !important;
        }

        .table-reading-intersection {
          border-color: #4C8AC8 !important;
          background: #EAF4FF !important;

          transform: scale(1.035);

          box-shadow:
            0 0 0 5px rgba(76,138,200,.13),
            0 8px 18px rgba(76,138,200,.18) !important;
        }

        @media (max-width: 520px) {
          .table-reading-board {
            padding-inline: 0;
          }

          .table-reading-table {
            min-width: 445px;
            border-spacing: 4px;
          }

          .table-reading-table th,
          .table-reading-table td {
            height: 50px;
            padding: 6px 4px;
            border-radius: 12px;
          }
        }
      `}</style>

      <div className="table-reading-title">
        {item.tableTitle}
      </div>

      {item.helperText && (
        <p className="table-reading-helper">
          {item.helperText}
        </p>
      )}

      <div className="table-reading-scroll">
        <table
          className="table-reading-table"
          aria-label={item.tableTitle}
        >
          <thead>
            <tr>
              <th>
                {item.cornerLabel ??
                  "اللُّعْبَةُ"}
              </th>

              {item.columns.map(
                (column) => {
                  const columnFocused =
                    item.focusColumnKey ===
                    column.key;

                  return (
                    <th
                      key={column.key}
                      className={
                        columnFocused
                          ? "table-reading-column-focus"
                          : undefined
                      }
                    >
                      {column.label}
                    </th>
                  );
                },
              )}
            </tr>
          </thead>

          <tbody>
            {item.rows.map((row) => {
              const rowFocused =
                item.focusRowId === row.id;

              return (
                <tr key={row.id}>
                  <th
                    className={[
                      "table-reading-row-heading",
                      rowFocused
                        ? "table-reading-row-focus"
                        : "",
                    ].join(" ")}
                  >
                    {row.icon && (
                      <span
                        className="table-reading-icon"
                        aria-hidden="true"
                      >
                        {row.icon}
                      </span>
                    )}

                    {row.label}
                  </th>

                  {item.columns.map(
                    (column) => {
                      const columnFocused =
                        item.focusColumnKey ===
                        column.key;

                      const intersection =
                        rowFocused &&
                        columnFocused;

                      return (
                        <td
                          key={column.key}
                          className={[
                            rowFocused
                              ? "table-reading-row-focus"
                              : "",
                            columnFocused
                              ? "table-reading-column-focus"
                              : "",
                            intersection
                              ? "table-reading-intersection"
                              : "",
                          ].join(" ")}
                        >
                          {
                            row.values[
                              column.key
                            ]
                          }
                        </td>
                      );
                    },
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function TableReadingExerciseV2({
  items,
  audio_base,
  onComplete,
}: TableReadingExerciseV2Props) {
  const [itemIndex, setItemIndex] =
    useState(0);

  const [score, setScore] =
    useState(0);

  const [timings, setTimings] =
    useState<
      Record<string, WordTiming[]>
    >({});

  const [selectedId, setSelectedId] =
    useState<string | null>(null);

  const [feedback, setFeedback] =
    useState<FeedbackState>("idle");

  const [attempts, setAttempts] =
    useState(0);

  const [locked, setLocked] =
    useState(false);

  const [activeKey, setActiveKey] =
    useState<string | null>(null);

  const [activeWordIndex, setActiveWordIndex] =
    useState(-1);

  const [isPlaying, setIsPlaying] =
    useState(false);

  const audioRef =
    useRef<HTMLAudioElement | null>(null);

  const wordTimersRef =
    useRef<number[]>([]);

  const transitionTimerRef =
    useRef<number | null>(null);

  const item = items[itemIndex];

  const stopQuestionAudio =
    useCallback(() => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }

      wordTimersRef.current.forEach(
        (timer) =>
          window.clearTimeout(timer),
      );

      wordTimersRef.current = [];

      setActiveKey(null);
      setActiveWordIndex(-1);
      setIsPlaying(false);
    }, []);

  const clearTransition =
    useCallback(() => {
      if (
        transitionTimerRef.current !==
        null
      ) {
        window.clearTimeout(
          transitionTimerRef.current,
        );

        transitionTimerRef.current = null;
      }
    }, []);

  const playQuestion =
    useCallback(
      async (
        key: string,
        words: WordTiming[],
      ) => {
        stopQuestionAudio();

        const audio = new Audio(
          `${audio_base}/${key}.mp3`,
        );

        audioRef.current = audio;

        setActiveKey(key);
        setActiveWordIndex(-1);
        setIsPlaying(true);

        audio.addEventListener(
          "ended",
          () => {
            setActiveKey(null);
            setActiveWordIndex(-1);
            setIsPlaying(false);
          },
          { once: true },
        );

        try {
          await audio.play();
        } catch {
          setActiveKey(null);
          setActiveWordIndex(-1);
          setIsPlaying(false);
          return;
        }

        words.forEach(
          (word, index) => {
            const startTimer =
              window.setTimeout(() => {
                setActiveWordIndex(index);
              }, word.offset);

            const endTimer =
              window.setTimeout(() => {
                setActiveWordIndex(
                  (current) =>
                    current === index
                      ? -1
                      : current,
                );
              }, word.offset + word.duration);

            wordTimersRef.current.push(
              startTimer,
              endTimer,
            );
          },
        );
      },
      [
        audio_base,
        stopQuestionAudio,
      ],
    );

  useEffect(() => {
    let cancelled = false;

    void Promise.all(
      items.map(
        async (currentItem) => ({
          key:
            currentItem.question_audio_key,

          words:
            await loadWordTimings(
              audio_base,
              currentItem.question_audio_key,
            ),
        }),
      ),
    ).then((loadedItems) => {
      if (cancelled) {
        return;
      }

      const loaded:
        Record<string, WordTiming[]> = {};

      loadedItems.forEach(
        ({ key, words }) => {
          if (words) {
            loaded[key] = words;
          }
        },
      );

      setTimings(loaded);
    });

    return () => {
      cancelled = true;
    };
  }, [
    audio_base,
    items,
  ]);

  const currentWords =
    item
      ? timings[
          item.question_audio_key
        ]
      : undefined;

  useEffect(() => {
    clearTransition();
    stopQuestionAudio();

    setSelectedId(null);
    setFeedback("idle");
    setAttempts(0);
    setLocked(false);

    if (
      !item ||
      !currentWords
    ) {
      return;
    }

    const timer =
      window.setTimeout(() => {
        void playQuestion(
          item.question_audio_key,
          currentWords,
        );
      }, 250);

    return () => {
      window.clearTimeout(timer);
    };
  }, [
    clearTransition,
    currentWords,
    item,
    itemIndex,
    playQuestion,
    stopQuestionAudio,
  ]);

  useEffect(
    () => () => {
      clearTransition();
      stopQuestionAudio();
    },
    [
      clearTransition,
      stopQuestionAudio,
    ],
  );

  if (!item) {
    return null;
  }

  const questionWords =
    currentWords?.map(
      (word) => word.text,
    ) ??
    item.question
      .trim()
      .split(/\s+/)
      .filter(Boolean);

  const replayQuestion = () => {
    if (!currentWords) {
      return;
    }

    void playQuestion(
      item.question_audio_key,
      currentWords,
    );
  };

  const advance = (
    finalScore: number,
  ) => {
    if (
      itemIndex <
      items.length - 1
    ) {
      setItemIndex(
        (current) => current + 1,
      );

      return;
    }

    onComplete?.(
      finalScore,
      items.length,
    );
  };

  const handleSelect = (
    optionId: string,
  ) => {
    if (
      locked ||
      feedback !== "idle"
    ) {
      return;
    }

    stopQuestionAudio();

    setSelectedId(optionId);

    const correct =
      optionId === item.correctId;

    const nextAttempts =
      attempts + 1;

    setAttempts(nextAttempts);

    if (correct) {
      const nextScore =
        score + 1;

      setScore(nextScore);
      setLocked(true);
      setFeedback("correct");

      playFeedback(true);

      transitionTimerRef.current =
        window.setTimeout(() => {
          advance(nextScore);
        }, 1800);

      return;
    }

    setFeedback("wrong");
    playFeedback(false);

    if (nextAttempts >= 3) {
      setLocked(true);

      transitionTimerRef.current =
        window.setTimeout(() => {
          advance(score);
        }, 2300);

      return;
    }

    transitionTimerRef.current =
      window.setTimeout(() => {
        setSelectedId(null);
        setFeedback("idle");
      }, 1500);
  };

  return (
    <UnifiedExerciseScreenV2
      index={itemIndex}
      total={items.length}
      missionTitle={item.missionTitle}
      questionWords={questionWords}
      activeWordIndex={
        activeKey ===
        item.question_audio_key
          ? activeWordIndex
          : -1
      }
      onReplay={replayQuestion}
      isPlaying={
        activeKey ===
          item.question_audio_key &&
        isPlaying
      }
      backgroundImage={
        item.background_image
      }
      activity={
        <TableBoard item={item} />
      }
      answers={
        <div className="table-reading-answer-options">
          <style>{`
            .table-reading-answer-options {
              width: 100%;
            }

            .table-reading-answer-options button {
              border-color: #E8A020 !important;

              box-shadow:
                0 5px 12px rgba(232,160,32,.16) !important;
            }

            .table-reading-answer-options button:not(:disabled):hover {
              border-color: #D9910A !important;
            }

            .table-reading-answer-options svg,
            .table-reading-answer-options [aria-hidden="true"] {
              color: #E8A020 !important;
              fill: currentColor !important;
            }
          `}</style>

          <UnifiedExerciseAnswersV2
          options={item.options.map(
            (option) => ({
              id: option.id,
              content: option.label,
              ariaLabel:
                `اختيار ${option.label}`,
            }),
          )}
          selectedId={selectedId}
          correctId={item.correctId}
          showCorrect={
            locked &&
            feedback === "wrong"
          }
          feedback={feedback}
          onSelect={handleSelect}
          variant={
            item.answerVariant ??
            "text"
          }
          columns={
            item.answerColumns ?? 3
          }
          disabled={locked}
          direction="rtl"
        />
        </div>
      }
      feedback={feedback}
      successText="🌟 أَحْسَنْتَ!"
      retryText="حَاوِلْ مَرَّةً أُخْرَى ✨"
      activityLabel="جدول المعطيات"
      answersLabel="خيارات الإجابة"
    />
  );
}
