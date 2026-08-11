import type {
  CSSProperties,
} from "react";

import UnifiedLessonExercisesV2, {
  type UnifiedLessonExerciseQuestionV2,
  type UnifiedLessonExerciseRenderContextV2,
} from "./UnifiedLessonExercisesV2";

import StraightLineLabV2 from "./StraightLineLabV2";

type Mission = 1 | 2 | 3 | 4;

type QuestionKind =
  | "identify"
  | "classify"
  | "ruler"
  | "connect";

type VisualKind =
  | "lines"
  | "compare"
  | "ruler"
  | "points";

type Point = {
  x: number;
  y: number;
};

type Question =
  UnifiedLessonExerciseQuestionV2 & {
    mission: Mission;
    kind: QuestionKind;
    visual: VisualKind;

    revealText?: string;

    start?: Point;
    end?: Point;
  };

const AUDIO_BASE =
  "/audio/teachers/khalil/"
  + "lesson_70_straight_lines/exercises";

const NEXT_LESSON =
  "/lesson-v2/71";

const SMALL_CITY_QUIZ =
  "/world/"
  + "b2c0405e-4559-4813-9a73-82b4f0ab4f4c"
  + "/quiz";

const MISSION_TITLES: Record<
  Mission,
  string
> = {
  1: "أَتَعَرَّفُ عَلَى الْخَطِّ الْمُسْتَقِيمِ",
  2: "أُمَيِّزُ بَيْنَ الْخُطُوطِ",
  3: "أَسْتَعْمِلُ الْمِسْطَرَةَ",
  4: "أَرْسُمُ خَطًّا مُسْتَقِيمًا",
};

const choice = (
  id: string,
  label: string,
) => ({
  id,
  content: label,
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
      <div style={styles.visualSymbol}>
        {symbol}
      </div>

      <div style={styles.visualLabel}>
        {label}
      </div>
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
      <Lesson70Visual
        kind={question.visual}
      />

      <div
        style={
          styles.lesson70PromptBox
        }
      >
        {question.prompt}
      </div>

      {showResult
        && question.revealText
        && (
          <div style={styles.reveal}>
            ✅ {question.revealText}
          </div>
        )}
    </div>
  );
}

function renderLesson70Activity({
  question,
  showResult,
  submitResult,
  locked,
}: UnifiedLessonExerciseRenderContextV2<Question>) {
  if (
    question.kind === "connect"
    && question.start
    && question.end
  ) {
    return (
      <div style={styles.activityCard}>
        <Lesson70Visual
          kind="points"
        />

        <div
          style={
            styles.lesson70PromptBox
          }
        >
          {question.prompt}
        </div>

        <StraightLineLabV2
          key={question.id}
          start={question.start}
          end={question.end}
          locked={locked}
          showResult={showResult}
          onResult={submitResult}
        />

        {showResult
          && question.revealText
          && (
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

export default function
Lesson70StraightLinesExercises() {
  return (
    <UnifiedLessonExercisesV2
      lessonKey="lesson70"

      audioBase={AUDIO_BASE}

      questions={QUESTIONS}

      missionTitles={
        MISSION_TITLES
      }

      missionCount={4}

      completionMessage={
        "أَتْمَمْتَ تَمَارِينَ "
        + "الْخُطُوطِ الْمُسْتَقِيمَةِ."
      }

      nextPath={NEXT_LESSON}
      nextLabel="الدرس التالي"

      quizPath={
        SMALL_CITY_QUIZ
      }

      renderActivity={
        renderLesson70Activity
      }
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
