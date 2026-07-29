import {
  type CSSProperties,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import UnifiedExerciseAnswersV2 from
  "../components/UnifiedExerciseAnswersV2";
import UnifiedExerciseScreenV2 from
  "../components/UnifiedExerciseScreenV2";

import type {
  GridCoord,
  GridDirection,
  GridLandmark,
  GridNavigationItem,
  GridRouteOption,
  MissingArrowItem,
} from "../content/lesson47_types";

const CORRECT_SOUND =
  "/audio/v2_feedback/correct.mp3";
const RETRY_SOUND =
  "/audio/v2_feedback/retry.mp3";

const AUTO_PLAY_DELAY = 320;
const FEEDBACK_DELAY = 760;

// LESSON47_FINAL_BOUNDARY_SYNC
// The active word starts exactly at its WordBoundary offset and stays active until the next offset.
const KARAOKE_LEAD_MS = 0;

const BACKGROUND_IMAGE =
  "/lessons/v2/lesson47-grid-navigation/s1.webp";

type FeedbackState =
  | "idle"
  | "correct"
  | "wrong";

type KaraokeWord = {
  text: string;
  offset: number;
  duration: number;
};

type Props = {
  items: GridNavigationItem[];
  audio_base: string;
  missionTitle: string;
  onComplete: () => void;
};

const ARROWS: Record<GridDirection, string> = {
  up: "↑",
  down: "↓",
  left: "←",
  right: "→",
};

const DIRECTION_LABELS:
  Record<GridDirection, string> = {
  up: "إِلَى الأَعْلَى",
  down: "إِلَى الأَسْفَلِ",
  left: "يَسَارًا",
  right: "يَمِينًا",
};

const COLORS = {
  navy: "#17365f",
  gold: "#edb21f",
  green: "#20a567",
  greenSoft: "#e8f8ef",
  red: "#d94a45",
  redSoft: "#fff0ee",
  blueSoft: "#eaf4ff",
  cream: "#fff8ec",
  white: "#ffffff",
};

function sameCoordinate(
  first: GridCoord,
  second: GridCoord,
) {
  return (
    first.row === second.row &&
    first.col === second.col
  );
}

function coordKey(coordinate: GridCoord) {
  return `${coordinate.row}-${coordinate.col}`;
}

function stepFrom(
  coordinate: GridCoord,
  direction: GridDirection,
): GridCoord {
  if (direction === "up") {
    return {
      row: coordinate.row - 1,
      col: coordinate.col,
    };
  }

  if (direction === "down") {
    return {
      row: coordinate.row + 1,
      col: coordinate.col,
    };
  }

  if (direction === "left") {
    return {
      row: coordinate.row,
      col: coordinate.col - 1,
    };
  }

  return {
    row: coordinate.row,
    col: coordinate.col + 1,
  };
}

function routeCells(
  start: GridCoord,
  route: GridDirection[],
) {
  const cells: GridCoord[] = [{ ...start }];
  let current = { ...start };

  route.forEach((direction) => {
    current = stepFrom(current, direction);
    cells.push(current);
  });

  return cells;
}

function answerRoute(
  item: MissingArrowItem,
) {
  return item.route.map((direction, index) =>
    index === item.missingIndex
      ? item.answer
      : direction,
  ) as GridDirection[];
}

function endpoint(
  start: GridCoord,
  route: GridDirection[],
) {
  return route.reduce(
    (current, direction) =>
      stepFrom(current, direction),
    start,
  );
}

function playSound(source: string) {
  const audio = new Audio(source);
  audio.volume = 0.9;
  audio.play().catch(() => undefined);
}

function landmarkAt(
  landmarks: GridLandmark[] | undefined,
  coordinate: GridCoord,
) {
  return landmarks?.find((landmark) =>
    sameCoordinate(
      landmark.position,
      coordinate,
    ),
  );
}

function RouteStrip({
  route,
  missingIndex = -1,
  revealDirection,
}: {
  route: Array<GridDirection | null>;
  missingIndex?: number;
  revealDirection?: GridDirection;
}) {
  return (
    <div
      dir="ltr"
      style={styles.routeStrip}
      aria-label="خطوات المسلك بالترتيب"
    >
      {route.map((direction, index) => {
        const isMissing = index === missingIndex;

        const shownDirection =
          isMissing && revealDirection
            ? revealDirection
            : direction;

        return (
          <span
            key={`${direction ?? "missing"}-${index}`}
            style={styles.routeStep}
          >
            <span
              style={{
                ...styles.routeArrow,
                ...(isMissing
                  ? styles.missingArrow
                  : {}),
                ...(isMissing && revealDirection
                  ? styles.revealedArrow
                  : {}),
              }}
            >
              {shownDirection
                ? ARROWS[shownDirection]
                : "؟"}
            </span>

            <small style={styles.routeStepNumber}>
              {index + 1}
            </small>
          </span>
        );
      })}
    </div>
  );
}

function GridBoard({
  item,
  feedback,
}: {
  item: GridNavigationItem;
  feedback: FeedbackState;
}) {
  const correct = feedback === "correct";

  const fullRoute = useMemo(() => {
    if (item.mode === "identify-direction") {
      return [item.direction];
    }

    if (item.mode === "find-destination") {
      return item.route;
    }

    if (item.mode === "missing-arrow") {
      return answerRoute(item);
    }

    return item.route;
  }, [item]);

  const fullRouteCells = useMemo(
    () => routeCells(item.start, fullRoute),
    [item.start, fullRoute],
  );

  const teachingCells = useMemo(() => {
    if (item.mode === "match-route") {
      return item.pathCells;
    }

    if (item.mode === "missing-arrow") {
      return fullRouteCells;
    }

    if (item.mode === "find-destination") {
      return correct
        ? fullRouteCells
        : fullRouteCells.slice(0, -1);
    }

    return correct ? fullRouteCells : [];
  }, [item, fullRouteCells, correct]);

  const missingTarget =
    item.mode === "missing-arrow"
      ? fullRouteCells[item.missingIndex + 1]
      : undefined;

  const goal =
    item.mode === "missing-arrow" ||
    item.mode === "match-route"
      ? item.goal
      : item.mode === "identify-direction"
        ? endpoint(item.start, [item.direction])
        : undefined;

  const landmarks =
    item.mode === "find-destination" ||
    item.mode === "match-route"
      ? item.landmarks
      : undefined;

  return (
    <div style={styles.activityCard}>
      {item.mode === "identify-direction" && (
        <>
          <strong style={styles.childInstruction}>
            اُنْظُرْ إِلَى السَّهْمِ. فِي أَيِّ
            اتِّجَاهٍ يَسِيرُ الطِّفْلُ؟
          </strong>
          <RouteStrip route={[item.direction]} />
        </>
      )}

      {item.mode === "find-destination" && (
        <>
          <strong style={styles.childInstruction}>
            اُنْظُرْ إِلَى الأَسْهُمِ
            بِالتَّرْتِيبِ. إِلَى أَيْنَ
            تَأْخُذُكَ؟
          </strong>
          <RouteStrip route={item.route} />
        </>
      )}

      {item.mode === "missing-arrow" && (
        <>
          <strong style={styles.childInstruction}>
            اُنْظُرْ إِلَى مَسَارِ الطِّفْلِ.
            فِي أَيِّ اتِّجَاهٍ يُتَابِعُ
            طَرِيقَهُ؟
          </strong>
          <RouteStrip
            route={item.route}
            missingIndex={item.missingIndex}
            revealDirection={
              correct ? item.answer : undefined
            }
          />
        </>
      )}

      {item.mode === "match-route" && (
        <strong style={styles.childInstruction}>
          اِبْدَأْ مِنَ الطِّفْلِ، وَاتَّبِعِ
          الأَرْقَامَ: 1 ثُمَّ 2 ثُمَّ 3.
        </strong>
      )}

      <div
        style={{
          ...styles.grid,
          gridTemplateColumns:
            `repeat(${item.cols}, minmax(38px, 68px))`,
        }}
      >
        {Array.from(
          { length: item.rows * item.cols },
          (_, index) => {
            const coordinate = {
              row:
                Math.floor(index / item.cols) + 1,
              col:
                index % item.cols + 1,
            };

            const isStart = sameCoordinate(
              coordinate,
              item.start,
            );

            const isGoal = goal
              ? sameCoordinate(coordinate, goal)
              : false;

            const teachingStepIndex =
              teachingCells.findIndex((cell) =>
                sameCoordinate(cell, coordinate),
              );

            const isHighlighted =
              teachingStepIndex >= 0;

            const isQuestionCell =
              Boolean(missingTarget) &&
              sameCoordinate(
                coordinate,
                missingTarget as GridCoord,
              ) &&
              !correct;

            const landmark = landmarkAt(
              landmarks,
              coordinate,
            );

            const destinationReached =
              item.mode === "find-destination" &&
              correct &&
              sameCoordinate(
                coordinate,
                endpoint(item.start, item.route),
              );

            return (
              <div
                key={coordKey(coordinate)}
                style={{
                  ...styles.cell,
                  ...(isHighlighted
                    ? styles.pathCell
                    : {}),
                  ...(isQuestionCell
                    ? styles.questionCell
                    : {}),
                  ...(destinationReached
                    ? styles.destinationCell
                    : {}),
                }}
              >
                {landmark && (
                  <span
                    style={styles.landmark}
                    title={landmark.label}
                    aria-label={landmark.label}
                  >
                    {landmark.icon}
                  </span>
                )}

                {isStart && (
                  <span
                    style={styles.childMarker}
                    aria-label="ابدأ من الطفل"
                  >
                    🧒
                  </span>
                )}

                {!isStart &&
                  teachingStepIndex > 0 &&
                  !isQuestionCell && (
                  <span style={styles.pathStepBadge}>
                    {teachingStepIndex}
                  </span>
                )}

                {isQuestionCell && (
                  <span style={styles.questionMark}>
                    ؟
                  </span>
                )}

                {isGoal &&
                  item.mode !== "identify-direction" && (
                  <span
                    style={styles.goalMarker}
                    aria-label="نقطة الوصول"
                  >
                    ★
                  </span>
                )}

                {isGoal &&
                  item.mode === "identify-direction" &&
                  correct && (
                  <span style={styles.goalMarker}>
                    ✓
                  </span>
                )}
              </div>
            );
          },
        )}
      </div>

      {item.mode === "find-destination" && (
        <strong style={styles.activityHint}>
          السَّهْمُ 1 هُوَ الخُطْوَةُ الأُولَى،
          وَالسَّهْمُ 2 هُوَ الخُطْوَةُ الثَّانِيَةُ.
        </strong>
      )}

      {item.mode === "missing-arrow" && (
        <strong style={styles.activityHint}>
          أَكْمِلِ السَّهْمَ النَّاقِصَ فِي
          الفَرَاغِ لِيَكْتَمِلَ الطَّرِيقُ.
        </strong>
      )}

      {item.mode === "match-route" && (
        <strong style={styles.activityHint}>
          نَقْرَأُ المَسْلَكَ بِتَرْتِيبِ
          الأَرْقَامِ، لَا بِمَكَانِ الخَانَةِ.
        </strong>
      )}
    </div>
  );
}

function DirectionAnswer({
  direction,
}: {
  direction: GridDirection;
}) {
  return (
    <span
      dir="rtl"
      style={styles.directionAnswer}
    >
      <span>{DIRECTION_LABELS[direction]}</span>
    </span>
  );
}

function LandmarkAnswer({
  landmark,
}: {
  landmark: GridLandmark;
}) {
  return (
    <span style={styles.landmarkAnswer}>
      <span style={styles.landmarkAnswerIcon}>
        {landmark.icon}
      </span>
      <span>{landmark.label}</span>
    </span>
  );
}

function RouteAnswer({
  option,
}: {
  option: GridRouteOption;
}) {
  return (
    <span
      dir="ltr"
      style={styles.routeAnswer}
    >
      {option.route.map((direction, index) => (
        <span
          key={`${direction}-${index}`}
          style={styles.routeAnswerArrow}
        >
          {ARROWS[direction]}
        </span>
      ))}
    </span>
  );
}

function answerOptionsFor(
  item: GridNavigationItem,
) {
  if (item.mode === "identify-direction") {
    return item.options.map((direction) => ({
      id: direction,
      ariaLabel: DIRECTION_LABELS[direction],
      content: (
        <DirectionAnswer direction={direction} />
      ),
    }));
  }

  if (item.mode === "missing-arrow") {
    return item.options.map((direction) => ({
      id: direction,
      ariaLabel: DIRECTION_LABELS[direction],
      content: (
        <DirectionAnswer direction={direction} />
      ),
    }));
  }

  if (item.mode === "find-destination") {
    return item.options
      .map((optionId) =>
        item.landmarks.find(
          (landmark) => landmark.id === optionId,
        ),
      )
      .filter(
        (landmark): landmark is GridLandmark =>
          Boolean(landmark),
      )
      .map((landmark) => ({
        id: landmark.id,
        ariaLabel: landmark.label,
        content: (
          <LandmarkAnswer landmark={landmark} />
        ),
      }));
  }

  return item.options.map((option) => ({
    id: option.id,
    ariaLabel: option.route
      .map((direction) => DIRECTION_LABELS[direction])
      .join("، "),
    content: <RouteAnswer option={option} />,
  }));
}

function correctAnswerId(item: GridNavigationItem) {
  return item.answer;
}

function answerColumns(item: GridNavigationItem) {
  if (
    item.mode === "identify-direction" ||
    item.mode === "missing-arrow"
  ) {
    return 2 as const;
  }

  return item.mode === "match-route"
    ? 1 as const
    : 3 as const;
}

function answerVariant(item: GridNavigationItem) {
  return item.mode === "find-destination"
    ? "image" as const
    : "text" as const;
}

export default function GridNavigationExerciseV2({
  items,
  audio_base,
  missionTitle,
  onComplete,
}: Props) {
  const [itemIndex, setItemIndex] =
    useState(0);

  const [selectedId, setSelectedId] =
    useState<string | null>(null);

  const [feedback, setFeedback] =
    useState<FeedbackState>("idle");

  const [boundaries, setBoundaries] =
    useState<KaraokeWord[]>([]);

  const [activeWordIndex, setActiveWordIndex] =
    useState(-1);

  const [isPlaying, setIsPlaying] =
    useState(false);

  const audioRef =
    useRef<HTMLAudioElement | null>(null);

  const boundariesRef =
    useRef<KaraokeWord[]>([]);

  const feedbackTimerRef =
    useRef<number | null>(null);

  const answerLockRef = useRef(false);

  const item = items[itemIndex];

  const clearFeedbackTimer =
    useCallback(() => {
      if (feedbackTimerRef.current !== null) {
        window.clearTimeout(
          feedbackTimerRef.current,
        );
        feedbackTimerRef.current = null;
      }
    }, []);

  const stopQuestionAudio =
    useCallback(() => {
      const audio = audioRef.current;

      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }

      setIsPlaying(false);
      setActiveWordIndex(-1);
    }, []);

  const resetAnswerState =
    useCallback(() => {
      clearFeedbackTimer();
      setSelectedId(null);
      setFeedback("idle");
      answerLockRef.current = false;
    }, [clearFeedbackTimer]);

  useEffect(() => {
    resetAnswerState();
  }, [itemIndex, resetAnswerState]);

  useEffect(() => {
    if (!item) {
      return undefined;
    }

    let cancelled = false;
    let karaokeFrame = 0;

    // Date.now prevents Chrome from mixing a newly generated JSON with an old cached MP3.
    const cacheToken = encodeURIComponent(
      `${Date.now()}-${item.id}-${item.question_audio_key}`,
    );

    const audioSource =
      `${audio_base}/${item.question_audio_key}.mp3?v=${cacheToken}`;

    const boundarySource =
      `${audio_base}/${item.question_audio_key}.json?v=${cacheToken}`;

    boundariesRef.current = [];
    setBoundaries([]);
    setActiveWordIndex(-1);
    setIsPlaying(false);

    fetch(boundarySource, {
      cache: "no-store",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `HTTP ${response.status}`,
          );
        }

        return response.json();
      })
      .then((data) => {
        if (cancelled) {
          return;
        }

        const words = Array.isArray(data)
          ? data
          : [];

        boundariesRef.current = words;
        setBoundaries(words);
      })
      .catch(() => {
        if (cancelled) {
          return;
        }

        boundariesRef.current = [];
        setBoundaries([]);
      });

    const audio = new Audio(audioSource);
    audio.preload = "auto";

    const updateKaraoke = () => {
      if (cancelled) {
        return;
      }

      const currentMs = Math.max(
        0,
        audio.currentTime * 1000 + KARAOKE_LEAD_MS,
      );

      const words = boundariesRef.current;
      let nextIndex = -1;

      for (
        let index = 0;
        index < words.length;
        index += 1
      ) {
        const start = Number(words[index].offset) || 0;
        const nextStart =
          index < words.length - 1
            ? Number(words[index + 1].offset)
            : Number.POSITIVE_INFINITY;

        const lastFallbackEnd =
          start + Math.max(
            Number(words[index].duration) || 0,
            700,
          );

        const end =
          index < words.length - 1
            ? nextStart
            : Number.isFinite(audio.duration)
              ? audio.duration * 1000 + 80
              : lastFallbackEnd;

        if (currentMs >= start && currentMs < end) {
          nextIndex = index;
          break;
        }
      }

      setActiveWordIndex(nextIndex);

      if (!audio.paused && !audio.ended) {
        karaokeFrame = window.requestAnimationFrame(
          updateKaraoke,
        );
      }
    };

    const onPlay = () => {
      if (!cancelled) {
        setIsPlaying(true);
        window.cancelAnimationFrame(karaokeFrame);
        karaokeFrame = window.requestAnimationFrame(
          updateKaraoke,
        );
      }
    };

    const onPause = () => {
      window.cancelAnimationFrame(karaokeFrame);

      if (!cancelled) {
        setIsPlaying(false);
      }
    };

    const onEnded = () => {
      window.cancelAnimationFrame(karaokeFrame);

      if (!cancelled) {
        setIsPlaying(false);
        setActiveWordIndex(-1);
      }
    };

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    audioRef.current = audio;

    const autoTimer = window.setTimeout(() => {
      if (cancelled) {
        return;
      }

      audio.currentTime = 0;
      audio.play().catch(() => {
        setIsPlaying(false);
      });
    }, AUTO_PLAY_DELAY);

    return () => {
      cancelled = true;
      window.clearTimeout(autoTimer);
      window.cancelAnimationFrame(karaokeFrame);
      audio.pause();
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);

      if (audioRef.current === audio) {
        audioRef.current = null;
      }
    };
  }, [audio_base, item?.id, item?.question_audio_key]);

  useEffect(() => {
    return () => {
      clearFeedbackTimer();
      stopQuestionAudio();
    };
  }, [clearFeedbackTimer, stopQuestionAudio]);

  const replayQuestion = useCallback(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    setActiveWordIndex(-1);
    audio.currentTime = 0;
    audio.play().catch(() => {
      setIsPlaying(false);
    });
  }, []);

  const moveForward = useCallback(() => {
    if (itemIndex < items.length - 1) {
      setItemIndex((current) => current + 1);
      return;
    }

    onComplete();
  }, [itemIndex, items.length, onComplete]);

  const selectAnswer = useCallback(
    (choiceId: string) => {
      if (
        !item ||
        feedback !== "idle" ||
        answerLockRef.current
      ) {
        return;
      }

      answerLockRef.current = true;
      stopQuestionAudio();
      setSelectedId(choiceId);

      if (choiceId === correctAnswerId(item)) {
        setFeedback("correct");
        playSound(CORRECT_SOUND);

        feedbackTimerRef.current =
          window.setTimeout(
            moveForward,
            FEEDBACK_DELAY,
          );

        return;
      }

      setFeedback("wrong");
      playSound(RETRY_SOUND);

      feedbackTimerRef.current =
        window.setTimeout(() => {
          setSelectedId(null);
          setFeedback("idle");
          answerLockRef.current = false;
          feedbackTimerRef.current = null;
        }, FEEDBACK_DELAY);
    },
    [
      feedback,
      item,
      moveForward,
      stopQuestionAudio,
    ],
  );

  if (!item) {
    return null;
  }

  const questionWords =
    boundaries.length > 0
      ? boundaries.map((word) => word.text)
      : item.question.trim().split(/\s+/);

  const options = answerOptionsFor(item);

  const activity: ReactNode = (
    <GridBoard
      item={item}
      feedback={feedback}
    />
  );

  return (
    <UnifiedExerciseScreenV2
      index={itemIndex}
      total={items.length}
      missionTitle={missionTitle}
      questionWords={questionWords}
      activeWordIndex={activeWordIndex}
      activeWord={
        activeWordIndex >= 0
          ? questionWords[activeWordIndex] ?? ""
          : ""
      }
      onReplay={replayQuestion}
      isPlaying={isPlaying}
      backgroundImage={BACKGROUND_IMAGE}
      activity={activity}
      answers={
        <UnifiedExerciseAnswersV2
          options={options}
          selectedId={selectedId}
          feedback={feedback}
          correctId={correctAnswerId(item)}
          showCorrect={false}
          onSelect={selectAnswer}
          variant={answerVariant(item)}
          columns={answerColumns(item)}
          disabled={feedback !== "idle"}
          direction="rtl"
        />
      }
      feedback={feedback}
      activityLabel="مرصوفة التنقل"
      answersLabel="اختر الإجابة الصحيحة"
    />
  );
}

const styles: Record<string, CSSProperties> = {
  activityCard: {
    width: "100%",
    maxWidth: 650,
    minHeight: 245,
    boxSizing: "border-box",
    padding: "14px 10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    background:
      "linear-gradient(145deg,#ffffff,#fff8e6)",
  },

  grid: {
    width: "min(100%, 430px)",
    display: "grid",
    justifyContent: "center",
    gap: 5,
    direction: "ltr",
  },

  cell: {
    position: "relative",
    aspectRatio: "1 / 1",
    minWidth: 0,
    border: `2px solid ${COLORS.navy}`,
    borderRadius: 11,
    background: COLORS.white,
    display: "grid",
    placeItems: "center",
    overflow: "hidden",
    boxShadow: "inset 0 0 0 1px rgba(237,178,31,.12)",
    transition: "all .18s ease",
  },

  pathCell: {
    background: COLORS.blueSoft,
    borderColor: COLORS.gold,
    boxShadow:
      "inset 0 0 0 3px rgba(237,178,31,.3)",
  },

  destinationCell: {
    background: COLORS.greenSoft,
    borderColor: COLORS.green,
    transform: "scale(1.04)",
  },

  childMarker: {
    position: "relative",
    zIndex: 4,
    fontSize: "clamp(27px,8vw,42px)",
    lineHeight: 1,
    filter: "drop-shadow(0 3px 3px rgba(0,0,0,.18))",
  },

  pathStepBadge: {
    minWidth: 29,
    height: 29,
    padding: "0 5px",
    borderRadius: 999,
    background: COLORS.navy,
    color: COLORS.white,
    display: "grid",
    placeItems: "center",
    fontSize: "clamp(16px,5vw,22px)",
    fontWeight: 1000,
    lineHeight: 1,
    boxShadow: "0 3px 8px rgba(23,54,95,.25)",
    zIndex: 4,
  },

  questionCell: {
    background: COLORS.redSoft,
    borderColor: COLORS.red,
    borderStyle: "dashed",
    boxShadow: "inset 0 0 0 3px rgba(217,74,69,.15)",
  },

  questionMark: {
    color: COLORS.red,
    fontSize: "clamp(29px,9vw,46px)",
    lineHeight: 1,
    fontWeight: 1000,
    zIndex: 4,
  },

  goalMarker: {
    position: "absolute",
    insetInlineEnd: 4,
    insetBlockEnd: 2,
    color: COLORS.green,
    fontSize: "clamp(18px,5vw,27px)",
    lineHeight: 1,
    zIndex: 3,
  },

  landmark: {
    fontSize: "clamp(25px,8vw,42px)",
    lineHeight: 1,
    filter: "drop-shadow(0 3px 3px rgba(0,0,0,.18))",
  },

  routeStrip: {
    width: "min(100%, 520px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 8,
  },

  routeStep: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },

  routeStepNumber: {
    minWidth: 25,
    height: 25,
    padding: "0 5px",
    borderRadius: 999,
    background: COLORS.navy,
    color: COLORS.white,
    display: "grid",
    placeItems: "center",
    fontSize: 15,
    fontWeight: 1000,
    lineHeight: 1,
  },

  routeArrow: {
    width: "clamp(46px,13vw,66px)",
    height: "clamp(46px,13vw,66px)",
    border: `4px solid ${COLORS.gold}`,
    borderRadius: 16,
    background: COLORS.white,
    color: COLORS.navy,
    display: "grid",
    placeItems: "center",
    fontSize: "clamp(31px,9vw,49px)",
    fontWeight: 1000,
    boxShadow: "0 5px 12px rgba(23,54,95,.12)",
  },

  missingArrow: {
    borderStyle: "dashed",
    background: COLORS.redSoft,
    color: COLORS.red,
  },

  revealedArrow: {
    background: COLORS.greenSoft,
    color: COLORS.green,
    borderStyle: "solid",
    borderColor: COLORS.green,
  },

  directionHero: {
    width: "clamp(105px,31vw,160px)",
    height: "clamp(105px,31vw,160px)",
    borderRadius: 30,
    border: `5px solid ${COLORS.gold}`,
    background:
      "radial-gradient(circle,#ffffff 35%,#fff1be 100%)",
    display: "grid",
    placeItems: "center",
    boxShadow: "0 12px 25px rgba(23,54,95,.15)",
  },

  directionArrow: {
    color: COLORS.navy,
    fontSize: "clamp(75px,23vw,120px)",
    fontWeight: 1000,
    lineHeight: 1,
  },

  childInstruction: {
    width: "min(100%, 560px)",
    color: COLORS.navy,
    fontSize: "clamp(15px,4.2vw,20px)",
    lineHeight: 1.75,
    textAlign: "center",
    background: "#fff4c9",
    border: `2px solid ${COLORS.gold}`,
    borderRadius: 16,
    padding: "7px 10px",
    boxSizing: "border-box",
  },

  activityHint: {
    color: COLORS.navy,
    fontSize: "clamp(15px,4vw,19px)",
    lineHeight: 1.6,
    textAlign: "center",
  },

  directionAnswer: {
    width: "100%",
    minHeight: 54,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: COLORS.navy,
    fontSize: "clamp(19px,5vw,27px)",
    fontWeight: 1000,
    lineHeight: 1.45,
    textAlign: "center",
  },

  landmarkAnswer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },

  landmarkAnswerIcon: {
    fontSize: "clamp(32px,10vw,50px)",
    lineHeight: 1,
  },

  routeAnswer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 5,
  },

  routeAnswerArrow: {
    minWidth: 35,
    color: COLORS.navy,
    fontSize: "clamp(28px,8vw,42px)",
    lineHeight: 1,
    fontWeight: 1000,
  },
};
