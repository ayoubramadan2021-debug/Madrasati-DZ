import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

import UnifiedExerciseScreenV2 from "../components/UnifiedExerciseScreenV2";
import UnifiedExerciseAnswersV2 from "../components/UnifiedExerciseAnswersV2";
import LessonCompleteV2 from "../components/LessonCompleteV2";
import StraightLineLabV2 from "./StraightLineLabV2";

type Feedback =
  | "idle"
  | "correct"
  | "wrong";

type Mission = 1 | 2 | 3 | 4;

type QuestionKind = "identify" | "classify" | "ruler" | "connect";

type VisualKind = "lines" | "compare" | "ruler" | "points";

type Choice = {
  id: string;
  label: string;
};

type Question = {
  id: string;
  mission: Mission;
  kind: QuestionKind;
  visual: VisualKind;

  prompt: string;
  audioKey: string;

  choices: Choice[];
  answer: string;


  revealText?: string;
  start?: { x: number; y: number };
  end?: { x: number; y: number };
};

type WordTiming = {
  text: string;
  offset: number;
  duration: number;
};

const AUDIO_BASE =
  "/audio/teachers/khalil/"
  + "lesson_70_straight_lines/exercises";

const NEXT_LESSON = "/lesson-v2/71";

const FEEDBACK_DELAY = 1450;

const choice = (
  id: string,
  label: string,
): Choice => ({
  id,
  label,
});

const QUESTIONS: Question[] = [
  { id:"l70_ex1_q1", mission:1, kind:"identify", visual:"lines",
    prompt:"اِخْتَرِ الْخَطَّ الْمُسْتَقِيمَ.", audioKey:"l70_ex1_q1",
    choices:[choice("a","━━━━━━"),choice("b","〰〰〰"),choice("c","⌒⌒⌒"),choice("d","〽〽〽")], answer:"a" },

  { id:"l70_ex1_q2", mission:1, kind:"identify", visual:"lines",
    prompt:"أَيُّ خَطٍّ لَا يَنْحَنِي وَلَا يَتَعَرَّجُ؟", audioKey:"l70_ex1_q2",
    choices:[choice("a","〰〰〰"),choice("b","╱"),choice("c","⌒⌒⌒"),choice("d","〽〽〽")], answer:"b" },

  { id:"l70_ex1_q3", mission:1, kind:"identify", visual:"lines",
    prompt:"جِدِ الْخَطَّ الْمُسْتَقِيمَ الْعَمُودِيَّ.", audioKey:"l70_ex1_q3",
    choices:[choice("a","∿"),choice("b","〽"),choice("c","┃"),choice("d","⌒")], answer:"c" },

  { id:"l70_ex1_q4", mission:1, kind:"identify", visual:"lines",
    prompt:"أَيُّ خَطٍّ مِنْ هَذِهِ الْخُطُوطِ مُسْتَقِيمٌ؟", audioKey:"l70_ex1_q4",
    choices:[choice("a","⌒⌒"),choice("b","〰〰"),choice("c","〽〽"),choice("d","━━━━")], answer:"d" },

  { id:"l70_ex2_q1", mission:2, kind:"classify", visual:"compare",
    prompt:"أَيُّ خَطٍّ غَيْرُ مُسْتَقِيمٍ؟", audioKey:"l70_ex2_q1",
    choices:[choice("a","━━━━"),choice("b","┃"),choice("c","〰〰"),choice("d","╱")], answer:"c" },

  { id:"l70_ex2_q2", mission:2, kind:"classify", visual:"compare",
    prompt:"اِخْتَرِ الْخَطَّ الْمَائِلَ الْمُسْتَقِيمَ.", audioKey:"l70_ex2_q2",
    choices:[choice("a","╱"),choice("b","⌒"),choice("c","〽"),choice("d","〰")], answer:"a" },

  { id:"l70_ex2_q3", mission:2, kind:"classify", visual:"compare",
    prompt:"أَيُّ خَطٍّ مُتَعَرِّجٌ وَلَيْسَ مُسْتَقِيمًا؟", audioKey:"l70_ex2_q3",
    choices:[choice("a","┃"),choice("b","━━━━"),choice("c","╲"),choice("d","〽〽")], answer:"d" },

  { id:"l70_ex2_q4", mission:2, kind:"classify", visual:"compare",
    prompt:"أَيُّ خَطٍّ مُنْحَنٍ وَلَيْسَ مُسْتَقِيمًا؟", audioKey:"l70_ex2_q4",
    choices:[choice("a","━━━━"),choice("b","⌒⌒"),choice("c","┃"),choice("d","╱")], answer:"b" },


  { id:"l70_ex3_q1", mission:3, kind:"ruler", visual:"ruler",
    prompt:"مَا الْأَدَاةُ الَّتِي نَسْتَعْمِلُهَا لِرَسْمِ خَطٍّ مُسْتَقِيمٍ؟", audioKey:"l70_ex3_q1",
    choices:[choice("a","الْمِسْطَرَةُ"),choice("b","الْمِمْحَاةُ"),choice("c","الْمِبْرَاةُ"),choice("d","الْفُرْشَاةُ")], answer:"a" },

  { id:"l70_ex3_q2", mission:3, kind:"ruler", visual:"ruler",
    prompt:"مَاذَا نَفْعَلُ بِالْمِسْطَرَةِ قَبْلَ الرَّسْمِ؟", audioKey:"l70_ex3_q2",
    choices:[choice("a","نُحَرِّكُهَا بِسُرْعَةٍ"),choice("b","نُثَبِّتُهَا جَيِّدًا"),choice("c","نَرْفَعُهَا"),choice("d","نُدِيرُهَا بَعِيدًا")], answer:"b" },

  { id:"l70_ex3_q3", mission:3, kind:"ruler", visual:"ruler",
    prompt:"أَيْنَ نُمَرِّرُ الْقَلَمَ عِنْدَ الرَّسْمِ بِالْمِسْطَرَةِ؟", audioKey:"l70_ex3_q3",
    choices:[choice("a","فَوْقَ وَسَطِهَا"),choice("b","بَعِيدًا عَنْهَا"),choice("c","عَلَى حَافَّتِهَا"),choice("d","خَلْفَ الْوَرَقَةِ")], answer:"c" },

  { id:"l70_ex3_q4", mission:3, kind:"ruler", visual:"ruler",
    prompt:"اِخْتَرِ الطَّرِيقَةَ الصَّحِيحَةَ لِرَسْمِ خَطٍّ مُسْتَقِيمٍ.", audioKey:"l70_ex3_q4",
    choices:[
      choice("a","أَرْسُمُ دُونَ أَدَاةٍ"),
      choice("b","أُحَرِّكُ الْمِسْطَرَةَ أَثْنَاءَ الرَّسْمِ"),
      choice("c","أَرْسُمُ خَطًّا مُتَعَرِّجًا"),
      choice("d","أُثَبِّتُ الْمِسْطَرَةَ وَأَمُرُّ بِالْقَلَمِ عَلَى حَافَّتِهَا")
    ], answer:"d" },


  { id:"l70_ex4_q1", mission:4, kind:"connect", visual:"points",
    prompt:"اِرْبِطْ بَيْنَ النُّقْطَتَيْنِ بِخَطٍّ مُسْتَقِيمٍ.", audioKey:"l70_ex4_q1",
    choices:[], answer:"done", revealText:"خَطٌّ مُسْتَقِيمٌ بَيْنَ النُّقْطَتَيْنِ.",
    start:{ x:18, y:50 }, end:{ x:82, y:50 } },

  { id:"l70_ex4_q2", mission:4, kind:"connect", visual:"points",
    prompt:"اِرْسُمْ خَطًّا مُسْتَقِيمًا مِنَ النُّقْطَةِ الْأُولَى إِلَى الثَّانِيَةِ.", audioKey:"l70_ex4_q2",
    choices:[], answer:"done", revealText:"رُبِطَتِ النُّقْطَتَانِ بِخَطٍّ مُسْتَقِيمٍ.",
    start:{ x:50, y:18 }, end:{ x:50, y:82 } },

  { id:"l70_ex4_q3", mission:4, kind:"connect", visual:"points",
    prompt:"صِلْ بَيْنَ النُّقْطَتَيْنِ بِخَطٍّ مُسْتَقِيمٍ مَائِلٍ.", audioKey:"l70_ex4_q3",
    choices:[], answer:"done", revealText:"هَذَا خَطٌّ مُسْتَقِيمٌ مَائِلٌ.",
    start:{ x:22, y:76 }, end:{ x:78, y:24 } },

  { id:"l70_ex4_q4", mission:4, kind:"connect", visual:"points",
    prompt:"أَكْمِلْ رَبْطَ النُّقْطَتَيْنِ بِخَطٍّ مُسْتَقِيمٍ.", audioKey:"l70_ex4_q4",
    choices:[], answer:"done", revealText:"أَحْسَنْتَ! رَسَمْتَ خَطًّا مُسْتَقِيمًا.",
    start:{ x:22, y:24 }, end:{ x:78, y:76 } },

];


function Lesson70Visual({
  kind,
}: {
  kind: VisualKind;
}) {
  const symbol =
    kind === "lines"
      ? "━ 〰 ⌒"
      : kind === "compare"
        ? "مُسْتَقِيم / غَيْرُ مُسْتَقِيم"
        : kind === "ruler"
          ? "📏"
          : "●────●";

  const label =
    kind === "lines"
      ? "خُطُوطٌ مُخْتَلِفَةٌ"
      : kind === "compare"
        ? "نُمَيِّزُ بَيْنَ الْخُطُوطِ"
        : kind === "ruler"
          ? "نَسْتَعْمِلُ الْمِسْطَرَةَ"
          : "نَرْبِطُ بَيْنَ نُقْطَتَيْنِ";

  return (
    <div style={styles.activityVisual}>
      <div style={styles.visualSymbol}>{symbol}</div>
      <div style={styles.visualLabel}>{label}</div>
    </div>
  );
}

function PromptActivity({
  question,
  showResult,
}: {
  question: Question;
  showResult: boolean;
}) {
  return (
    <div style={styles.activityCard}>
      <Lesson70Visual kind={question.visual} />

      <div style={styles.lesson70PromptBox}>
        {question.prompt}
      </div>

      {showResult && question.revealText && (
        <div style={styles.reveal}>
          ✅ {question.revealText}
        </div>
      )}
    </div>
  );
}

function renderActivity(
  question: Question,
  showResult: boolean,
  onDrawResult: (correct: boolean) => void,
  locked: boolean,
): ReactNode {
  if (
    question.kind === "connect"
    && question.start
    && question.end
  ) {
    return (
      <div style={styles.activityCard}>
        <Lesson70Visual kind="points" />

        <div style={styles.lesson70PromptBox}>
          {question.prompt}
        </div>

        <StraightLineLabV2
          key={question.id}
          start={question.start}
          end={question.end}
          locked={locked}
          showResult={showResult}
          onResult={onDrawResult}
        />

        {showResult && question.revealText && (
          <div style={styles.reveal}>
            ✅ {question.revealText}
          </div>
        )}
      </div>
    );
  }

  return (
    <PromptActivity
      question={question}
      showResult={showResult}
    />
  );
}

function fallbackTimings(
  text: string,
): WordTiming[] {
  return text
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((word, index) => ({
      text: word,
      offset: index * 500,
      duration: 450,
    }));
}

export default function
Lesson70StraightLinesExercises() {
  const [
    questionIndex,
    setQuestionIndex,
  ] = useState(0);

  const [
    selectedId,
    setSelectedId,
  ] = useState<string | null>(null);

  const [
    feedback,
    setFeedback,
  ] = useState<Feedback>("idle");

  const [
    locked,
    setLocked,
  ] = useState(false);

  const [
    complete,
    setComplete,
  ] = useState(false);

  const [
    timings,
    setTimings,
  ] = useState<WordTiming[]>([]);

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

  const animationRef =
    useRef<number | null>(null);

  const question =
    QUESTIONS[questionIndex];

  const missionIndex =
    questionIndex % 4;

  const stopAudio =
    useCallback(() => {
      if (animationRef.current) {
        cancelAnimationFrame(
          animationRef.current,
        );

        animationRef.current = null;
      }

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      setIsPlaying(false);
    }, []);

  const updateKaraoke =
    useCallback(() => {
      const audio =
        audioRef.current;

      if (!audio) return;

      const currentTime =
        audio.currentTime * 1000;

      let index = -1;

      timings.forEach(
        (timing, timingIndex) => {
          if (
            currentTime >= timing.offset
          ) {
            index = timingIndex;
          }
        },
      );

      setActiveWordIndex(index);

      if (
        !audio.paused
        && !audio.ended
      ) {
        animationRef.current =
          requestAnimationFrame(
            updateKaraoke,
          );
      }
    }, [timings]);

  const replay =
    useCallback(async () => {
      stopAudio();

      const audio =
        new Audio(
          `${AUDIO_BASE}/`
          + `${question.audioKey}.mp3`,
        );

      audioRef.current = audio;
      setActiveWordIndex(-1);
      setIsPlaying(true);

      audio.onended = () => {
        setIsPlaying(false);
        setActiveWordIndex(
          Math.max(
            0,
            timings.length - 1,
          ),
        );
      };

      try {
        await audio.play();

        animationRef.current =
          requestAnimationFrame(
            updateKaraoke,
          );
      } catch {
        setIsPlaying(false);
      }
    }, [
      question.audioKey,
      stopAudio,
      timings.length,
      updateKaraoke,
    ]);

  useEffect(() => {
    let active = true;

    stopAudio();
    setSelectedId(null);
    setFeedback("idle");
    setLocked(false);
    setActiveWordIndex(-1);

    fetch(
      `${AUDIO_BASE}/`
      + `${question.audioKey}.json`,
    )
      .then(response => {
        if (!response.ok) {
          throw new Error(
            "timings unavailable",
          );
        }

        return response.json();
      })
      .then(payload => {
        if (!active) return;

        const loaded =
          Array.isArray(payload)
            ? payload
            : [];

        setTimings(
          loaded.length > 0
            ? loaded
            : fallbackTimings(
                question.prompt,
              ),
        );
      })
      .catch(() => {
        if (!active) return;

        setTimings(
          fallbackTimings(
            question.prompt,
          ),
        );
      });

    return () => {
      active = false;
      stopAudio();
    };
  }, [
    question.audioKey,
    question.prompt,
    stopAudio,
  ]);

  useEffect(() => {
    if (timings.length === 0) {
      return;
    }

    const timer =
      window.setTimeout(
        () => {
          void replay();
        },
        500,
      );

    return () => {
      window.clearTimeout(timer);
    };
  }, [
    question.id,
    replay,
    timings.length,
  ]);

  const selectAnswer =
    useCallback(
      (answerId: string) => {
        if (locked) return;

        stopAudio();
        setSelectedId(answerId);

        const isCorrect =
          answerId === question.answer;

        if (!isCorrect) {
          setFeedback("wrong");
          setLocked(true);

          window.setTimeout(() => {
            setFeedback("idle");
            setSelectedId(null);
            setLocked(false);
          }, 900);

          return;
        }

        setFeedback("correct");
        setLocked(true);

        window.setTimeout(() => {
          if (
            questionIndex
            < QUESTIONS.length - 1
          ) {
            setQuestionIndex(
              current => current + 1,
            );

            return;
          }

          setComplete(true);
        }, FEEDBACK_DELAY);
      },
      [
        locked,
        question.answer,
        questionIndex,
        stopAudio,
      ],
    );

  const restart =
    useCallback(() => {
      stopAudio();
      setQuestionIndex(0);
      setSelectedId(null);
      setFeedback("idle");
      setLocked(false);
      setComplete(false);
      setTimings([]);
      setActiveWordIndex(-1);
    }, [stopAudio]);

  const questionWords =
    useMemo(
      () =>
        timings.length > 0
          ? timings.map(
              timing => timing.text,
            )
          : question.prompt
              .trim()
              .split(/\s+/),
      [question.prompt, timings],
    );

  const safeActiveIndex =
    activeWordIndex >= 0
      ? Math.min(
          activeWordIndex,
          questionWords.length - 1,
        )
      : -1;

  const displayedQuestionWords =
    safeActiveIndex >= 0
      ? questionWords.slice(
          0,
          safeActiveIndex + 1,
        )
      : [];

  const displayedActiveWordIndex =
    displayedQuestionWords.length > 0
      ? displayedQuestionWords.length - 1
      : -1;

  const displayedActiveWord =
    displayedActiveWordIndex >= 0
      ? displayedQuestionWords[
          displayedActiveWordIndex
        ] ?? ""
      : "";

  const answerOptions =
    question.choices.map(
      option => ({
        id: option.id,
        ariaLabel: option.label,
        content: (
          <div style={styles.answer}>
            {option.label}
          </div>
        ),
      }),
    );

  if (complete) {
    return (
      <LessonCompleteV2
        lessonKey="lesson70"
        message={
          "أَتْمَمْتَ تَمَارِينَ "
          + "الْخُطُوطِ الْمُسْتَقِيمَةِ."
        }
        onReplay={restart}
        nextPath={NEXT_LESSON}
        nextLabel="الدرس التالي"
        quizPath="/world/b2c0405e-4559-4813-9a73-82b4f0ab4f4c/quiz"
      />
    );
  }

  return (
    <UnifiedExerciseScreenV2
      index={missionIndex}
      total={4}
      missionTitle=""
      questionWords={
        displayedQuestionWords
      }
      activeWordIndex={
        displayedActiveWordIndex
      }
      activeWord={
        displayedActiveWord
      }
      onReplay={replay}
      isPlaying={isPlaying}
      activity={renderActivity(
        question,
        feedback === "correct",
        correct =>
          selectAnswer(
            correct
              ? question.answer
              : "__draw_wrong__",
          ),
        locked,
      )}
      answers={
        <UnifiedExerciseAnswersV2
          options={answerOptions}
          selectedId={selectedId}
          feedback={feedback}
          correctId={question.answer}
          showCorrect={false}
          onSelect={selectAnswer}
          variant="text"
          columns={2}
        />
      }
      feedback={feedback}
    />
  );
}

const styles: Record<
  string,
  CSSProperties
> = {
  activityCard: {
    width: "100%",
    maxWidth: 680,
    margin: "0 auto",
    padding: 13,
    boxSizing: "border-box",
    display: "grid",
    gap: 13,
    border: "4px solid #edb21f",
    borderRadius: 28,
    background: "#ffffff",
    boxShadow:
      "0 9px 22px rgba(23,54,95,.12)",
  },

  activityVisual: {
    minHeight: 125,
    display: "grid",
    placeItems: "center",
    gap: 8,
    padding: 14,
    borderRadius: 22,
    background: "#fffaf0",
    border: "3px solid rgba(232,160,32,.35)",
  },

  visualSymbol: {
    direction: "ltr",
    color: "#17365f",
    fontSize: "clamp(34px,9vw,58px)",
    fontWeight: 900,
    letterSpacing: 10,
    textAlign: "center",
  },

  visualLabel: {
    color: "#17365f",
    fontSize: "clamp(16px,4vw,22px)",
    fontWeight: 900,
    textAlign: "center",
  },

  lesson70PromptBox: {
    padding: "12px 15px",
    borderRadius: 20,
    background: "#f7fbff",
    border: "3px solid rgba(23,54,95,.14)",
    color: "#17365f",
    fontSize: "clamp(18px,4.8vw,26px)",
    fontWeight: 900,
    lineHeight: 1.7,
    textAlign: "center",
  },

  visual: {
    width: "100%",
    minHeight: 115,
    position: "relative",
    display: "grid",
    placeItems: "center",
    overflow: "hidden",
    borderRadius: 22,
  },

  visualSvg: {
    width: "100%",
    height: 115,
    display: "block",
  },

  emoji: {
    position: "absolute",
    inset: 0,
    display: "grid",
    placeItems: "center",
    direction: "ltr",
    fontSize: "clamp(38px,10vw,65px)",
    letterSpacing: 12,
  },

  sentence: {
    minHeight: 92,
    padding: "12px 15px",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    border: "3px solid #edb21f",
    borderRadius: 20,
    background: "#fffaf0",
    color: "#17365f",
    direction: "rtl",
    textAlign: "center",
    fontSize: "clamp(18px,4.8vw,27px)",
    fontWeight: 900,
    lineHeight: 1.8,
  },

  blank: {
    minWidth: 110,
    padding: "2px 10px",
    borderBottom: "4px solid #edb21f",
    color: "#16834c",
    textAlign: "center",
  },

    questionBox: {
    padding: "11px 15px",
    border: "3px solid #edb21f",
    borderRadius: 19,
    background: "#fffaf0",
    color: "#17365f",
    direction: "rtl",
    textAlign: "center",
    fontSize: "clamp(17px,4.5vw,25px)",
    fontWeight: 1000,
    lineHeight: 1.7,
  },

  reveal: {
    padding: "10px 14px",
    border: "3px solid #28a95b",
    borderRadius: 18,
    background: "#edfff3",
    color: "#16713e",
    direction: "rtl",
    textAlign: "center",
    fontSize: "clamp(17px,4.4vw,24px)",
    fontWeight: 1000,
    lineHeight: 1.65,
  },

  answer: {
    width: "100%",
    minHeight: 62,
    padding: "5px 7px",
    boxSizing: "border-box",
    display: "grid",
    placeItems: "center",
    color: "#17365f",
    direction: "rtl",
    textAlign: "center",
    fontSize: "clamp(14px,3.7vw,20px)",
    fontWeight: 900,
    lineHeight: 1.5,
  },
};
