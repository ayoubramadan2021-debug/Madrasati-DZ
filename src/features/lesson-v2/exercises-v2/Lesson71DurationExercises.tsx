import type {
  CSSProperties,
} from "react";

import UnifiedLessonExercisesV2, {
  type UnifiedLessonExerciseQuestionV2,
  type UnifiedLessonExerciseRenderContextV2,
} from "./UnifiedLessonExercisesV2";

import DurationOrderLabV2, {
  type DurationOrderItemV2,
} from "./DurationOrderLabV2";

type Mission =
  | 1
  | 2
  | 3
  | 4;

type Lesson71Question =
  UnifiedLessonExerciseQuestionV2 & {
    mission: Mission;

    visual:
      | "duration"
      | "compare"
      | "daily"
      | "order";

    orderItems?:
      DurationOrderItemV2[];

    correctOrder?:
      string[];
  };

const AUDIO_BASE =
  "/audio/teachers/taline/"
  + "lesson_71_duration/exercises";

const SMALL_CITY_QUIZ =
  "/world/"
  + "b2c0405e-4559-4813-9a73-82b4f0ab4f4c"
  + "/quiz";

const MISSION_TITLES: Record<
  Mission,
  string
> = {
  1: "أَتَعَرَّفُ عَلَى الْمُدَّةِ",
  2: "أُقَارِنُ بَيْنَ الْمُدَدِ",
  3: "أُطَبِّقُ مَا تَعَلَّمْتُ",
  4: "أُرَتِّبُ حَسَبَ الْمُدَّةِ",
};

const choice = (
  id: string,
  content: string,
) => ({
  id,
  content,
});

const QUESTIONS:
  Lesson71Question[] = [

  // ========================================================
  // MISSION 1 — RECOGNITION
  // ========================================================

  {
    id: "l71_ex1_q1",
    mission: 1,
    visual: "duration",

    prompt:
      "مَاذَا نَقْصِدُ بِالْمُدَّةِ الزَّمَنِيَّةِ؟",

    audioKey:
      "l71_ex1_q1",

    choices: [
      choice(
        "a",
        "الْوَقْتُ الَّذِي يَسْتَغْرِقُهُ النَّشَاطُ",
      ),
      choice(
        "b",
        "لَوْنُ النَّشَاطِ",
      ),
      choice(
        "c",
        "مَكَانُ النَّشَاطِ",
      ),
      choice(
        "d",
        "شَكْلُ النَّشَاطِ",
      ),
    ],

    answer: "a",
    columns: 2,
  },

  {
    id: "l71_ex1_q2",
    mission: 1,
    visual: "duration",

    prompt:
      "أَيُّ نَشَاطٍ يَسْتَغْرِقُ مُدَّةً قَصِيرَةً؟",

    audioKey:
      "l71_ex1_q2",

    choices: [
      choice(
        "a",
        "النَّوْمُ لَيْلًا",
      ),
      choice(
        "b",
        "شُرْبُ كَأْسٍ مِنَ الْمَاءِ",
      ),
      choice(
        "c",
        "قَضَاءُ يَوْمٍ دِرَاسِيٍّ",
      ),
      choice(
        "d",
        "رِحْلَةٌ طَوِيلَةٌ",
      ),
    ],

    answer: "b",
    columns: 2,
  },

  {
    id: "l71_ex1_q3",
    mission: 1,
    visual: "duration",

    prompt:
      "أَيُّ نَشَاطٍ يَسْتَغْرِقُ وَقْتًا أَطْوَلَ؟",

    audioKey:
      "l71_ex1_q3",

    choices: [
      choice(
        "a",
        "فَتْحُ الْكِتَابِ",
      ),
      choice(
        "b",
        "رَفْعُ الْقَلَمِ",
      ),
      choice(
        "c",
        "إِنْجَازُ وَاجِبٍ دِرَاسِيٍّ",
      ),
      choice(
        "d",
        "شُرْبُ رَشْفَةِ مَاءٍ",
      ),
    ],

    answer: "c",
    columns: 2,
  },

  {
    id: "l71_ex1_q4",
    mission: 1,
    visual: "duration",

    prompt:
      "عِنْدَ مُقَارَنَةِ مُدَّتَيْنِ، مَا السُّؤَالُ الْمُنَاسِبُ؟",

    audioKey:
      "l71_ex1_q4",

    choices: [
      choice(
        "a",
        "أَيُّهُمَا أَجْمَلُ؟",
      ),
      choice(
        "b",
        "أَيُّهُمَا أَكْبَرُ حَجْمًا؟",
      ),
      choice(
        "c",
        "أَيُّهُمَا يَنْتَهِي أَوَّلًا؟",
      ),
      choice(
        "d",
        "أَيُّهُمَا أَكْثَرُ لَوْنًا؟",
      ),
    ],

    answer: "c",
    columns: 2,
  },

  // ========================================================
  // MISSION 2 — COMPARISON
  // ========================================================

  {
    id: "l71_ex2_q1",
    mission: 2,
    visual: "compare",

    prompt:
      "أَيُّهُمَا أَقْصَرُ مُدَّةً: غَسْلُ الْيَدَيْنِ أَمْ قَضَاءُ يَوْمٍ دِرَاسِيٍّ؟",

    audioKey:
      "l71_ex2_q1",

    choices: [
      choice(
        "a",
        "غَسْلُ الْيَدَيْنِ",
      ),
      choice(
        "b",
        "الْيَوْمُ الدِّرَاسِيُّ",
      ),
    ],

    answer: "a",
    columns: 2,
  },

  {
    id: "l71_ex2_q2",
    mission: 2,
    visual: "compare",

    prompt:
      "أَيُّهُمَا أَطْوَلُ مُدَّةً: شُرْبُ كَأْسٍ مِنَ الْمَاءِ أَمِ النَّوْمُ لَيْلًا؟",

    audioKey:
      "l71_ex2_q2",

    choices: [
      choice(
        "a",
        "شُرْبُ الْمَاءِ",
      ),
      choice(
        "b",
        "النَّوْمُ لَيْلًا",
      ),
    ],

    answer: "b",
    columns: 2,
  },

  {
    id: "l71_ex2_q3",
    mission: 2,
    visual: "compare",

    prompt:
      "أَيُّهُمَا يَنْتَهِي أَوَّلًا: رَبْطُ الْحِذَاءِ أَمْ مُشَاهَدَةُ فِيلْمٍ؟",

    audioKey:
      "l71_ex2_q3",

    choices: [
      choice(
        "a",
        "رَبْطُ الْحِذَاءِ",
      ),
      choice(
        "b",
        "مُشَاهَدَةُ فِيلْمٍ",
      ),
    ],

    answer: "a",
    columns: 2,
  },

  {
    id: "l71_ex2_q4",
    mission: 2,
    visual: "compare",

    prompt:
      "أَيُّهُمَا يَحْتَاجُ إِلَى وَقْتٍ أَكْثَرَ: كِتَابَةُ الِاسْمِ أَمْ قَضَاءُ يَوْمٍ فِي الْمَدْرَسَةِ؟",

    audioKey:
      "l71_ex2_q4",

    choices: [
      choice(
        "a",
        "كِتَابَةُ الِاسْمِ",
      ),
      choice(
        "b",
        "يَوْمٌ فِي الْمَدْرَسَةِ",
      ),
    ],

    answer: "b",
    columns: 2,
  },

  // ========================================================
  // MISSION 3 — APPLICATION
  // ========================================================

  {
    id: "l71_ex3_q1",
    mission: 3,
    visual: "daily",

    prompt:
      "إِذَا أَرَدْنَا نَشَاطًا يَنْتَهِي سَرِيعًا، فَأَيَّهُمَا نَخْتَارُ؟",

    audioKey:
      "l71_ex3_q1",

    choices: [
      choice(
        "a",
        "فَتْحُ الْكِتَابِ",
      ),
      choice(
        "b",
        "حَلُّ مَجْمُوعَةٍ كَبِيرَةٍ مِنَ التَّمَارِينِ",
      ),
    ],

    answer: "a",
    columns: 2,
  },

  {
    id: "l71_ex3_q2",
    mission: 3,
    visual: "daily",

    prompt:
      "أَيُّ نَشَاطٍ يَحْتَاجُ إِلَى وَقْتٍ أَكْثَرَ؟",

    audioKey:
      "l71_ex3_q2",

    choices: [
      choice(
        "a",
        "رَفْعُ الْقَلَمِ",
      ),
      choice(
        "b",
        "تَنَاوُلُ وَجْبَةٍ",
      ),
    ],

    answer: "b",
    columns: 2,
  },

  {
    id: "l71_ex3_q3",
    mission: 3,
    visual: "daily",

    prompt:
      "أَيُّ نَشَاطٍ يَنْتَهِي أَوَّلًا؟",

    audioKey:
      "l71_ex3_q3",

    choices: [
      choice(
        "a",
        "غَسْلُ الْيَدَيْنِ",
      ),
      choice(
        "b",
        "حِصَّةٌ دِرَاسِيَّةٌ",
      ),
    ],

    answer: "a",
    columns: 2,
  },

  {
    id: "l71_ex3_q4",
    mission: 3,
    visual: "daily",

    prompt:
      "أَيُّ نَشَاطٍ مُدَّتُهُ أَطْوَلُ؟",

    audioKey:
      "l71_ex3_q4",

    choices: [
      choice(
        "a",
        "شُرْبُ كَأْسٍ مِنَ الْمَاءِ",
      ),
      choice(
        "b",
        "النَّوْمُ لَيْلًا",
      ),
    ],

    answer: "b",
    columns: 2,
  },

  // ========================================================
  // MISSION 4 — REAL ORDERING
  // ========================================================

  {
    id: "l71_ex4_q1",
    mission: 4,
    visual: "order",

    prompt:
      "رَتِّبِ الْأَنْشِطَةَ مِنَ الْأَقْصَرِ مُدَّةً إِلَى الْأَطْوَلِ مُدَّةً.",

    audioKey:
      "l71_ex4_q1",

    orderItems: [
      {
        id: "blink",
        label: "رَمْشَةُ عَيْنٍ",
        icon: "👁️",
      },
      {
        id: "wash",
        label: "غَسْلُ الْيَدَيْنِ",
        icon: "🧼",
      },
      {
        id: "class",
        label: "حِصَّةٌ دِرَاسِيَّةٌ",
        icon: "📚",
      },
    ],

    correctOrder: [
      "blink",
      "wash",
      "class",
    ],
  },

  {
    id: "l71_ex4_q2",
    mission: 4,
    visual: "order",

    prompt:
      "رَتِّبِ الْأَنْشِطَةَ مِنَ الْأَقْصَرِ مُدَّةً إِلَى الْأَطْوَلِ مُدَّةً.",

    audioKey:
      "l71_ex4_q2",

    orderItems: [
      {
        id: "water",
        label: "شُرْبُ كَأْسِ مَاءٍ",
        icon: "🥛",
      },
      {
        id: "meal",
        label: "تَنَاوُلُ وَجْبَةٍ",
        icon: "🍽️",
      },
      {
        id: "sleep",
        label: "النَّوْمُ لَيْلًا",
        icon: "🌙",
      },
    ],

    correctOrder: [
      "water",
      "meal",
      "sleep",
    ],
  },

  {
    id: "l71_ex4_q3",
    mission: 4,
    visual: "order",

    prompt:
      "رَتِّبِ الْأَنْشِطَةَ مِنَ الْأَقْصَرِ مُدَّةً إِلَى الْأَطْوَلِ مُدَّةً.",

    audioKey:
      "l71_ex4_q3",

    orderItems: [
      {
        id: "bag",
        label: "فَتْحُ الْحَقِيبَةِ",
        icon: "🎒",
      },
      {
        id: "exercise",
        label: "حَلُّ تَمْرِينٍ",
        icon: "✏️",
      },
      {
        id: "schoolday",
        label: "يَوْمٌ دِرَاسِيٌّ",
        icon: "🏫",
      },
    ],

    correctOrder: [
      "bag",
      "exercise",
      "schoolday",
    ],
  },

  {
    id: "l71_ex4_q4",
    mission: 4,
    visual: "order",

    prompt:
      "أَكْمِلِ التَّرْتِيبَ مِنَ الْأَقْصَرِ مُدَّةً إِلَى الْأَطْوَلِ مُدَّةً.",

    audioKey:
      "l71_ex4_q4",

    orderItems: [
      {
        id: "shoes",
        label: "ارْتِدَاءُ الْحِذَاءِ",
        icon: "👟",
      },
      {
        id: "shower",
        label: "الِاسْتِحْمَامُ",
        icon: "🚿",
      },
      {
        id: "trip",
        label: "رِحْلَةٌ مَدْرَسِيَّةٌ",
        icon: "🚌",
      },
    ],

    correctOrder: [
      "shoes",
      "shower",
      "trip",
    ],
  },
];

function Lesson71Visual({
  kind,
}: {
  kind:
    Lesson71Question["visual"];
}) {
  const symbol =
    kind === "duration"
      ? "⏱️"
      : kind === "compare"
        ? "⏳ ↔️ ⌛"
        : kind === "daily"
          ? "🧼 📚 🌙"
          : "① ② ③";

  const label =
    kind === "duration"
      ? "لِكُلِّ نَشَاطٍ مُدَّةٌ"
      : kind === "compare"
        ? "أُقَارِنُ بَيْنَ الْمُدَدِ"
        : kind === "daily"
          ? "أَنْشِطَةٌ مِنْ يَوْمِنَا"
          : "أُرَتِّبُ حَسَبَ الْمُدَّةِ";

  return (
    <div
      style={
        styles.visual
      }
    >
      <div
        style={
          styles.symbol
        }
      >
        {symbol}
      </div>

      <div
        style={
          styles.visualLabel
        }
      >
        {label}
      </div>
    </div>
  );
}

function renderLesson71Activity({
  question,
  locked,
  showResult,
  submitResult,
}: UnifiedLessonExerciseRenderContextV2<
  Lesson71Question
>) {
  if (
    question.visual === "order"
    && question.orderItems
    && question.correctOrder
  ) {
    return (
      <div style={styles.card}>
        <Lesson71Visual
          kind="order"
        />

        <DurationOrderLabV2
          key={question.id}
          items={
            question.orderItems
          }
          correctOrder={
            question.correctOrder
          }
          locked={locked}
          showResult={
            showResult
          }
          onResult={
            submitResult
          }
        />
      </div>
    );
  }

  return (
    <div style={styles.card}>
      <Lesson71Visual
        kind={question.visual}
      />

    </div>
  );
}

export default function
Lesson71DurationExercises() {
  return (
    <UnifiedLessonExercisesV2
      lessonKey="lesson71"

      audioBase={
        AUDIO_BASE
      }

      questions={
        QUESTIONS
      }

      missionTitles={
        MISSION_TITLES
      }

      missionCount={4}

      completionMessage={
        "أَحْسَنْتَ! أَصْبَحْتَ "
        + "تُقَارِنُ بَيْنَ الْمُدَدِ "
        + "الزَّمَنِيَّةِ."
      }

      nextPath="/lesson-v2/72"

      nextLabel={
        "الدرس التالي"
      }

      quizPath={
        SMALL_CITY_QUIZ
      }

      renderActivity={
        renderLesson71Activity
      }
    />
  );
}

const styles: Record<
  string,
  CSSProperties
> = {
  card: {
    width: "100%",
    display: "grid",
    gap: 14,
  },

  visual: {
    minHeight: 105,
    borderRadius: 22,
    background:
      "linear-gradient(180deg,#FFF9ED,#FFFFFF)",
    border:
      "2px solid #E8A020",
    display: "grid",
    placeItems: "center",
    padding: 12,
    textAlign: "center",
  },

  symbol: {
    fontSize: 35,
    fontWeight: 900,
  },

  visualLabel: {
    fontSize: 18,
    color: "#17365F",
    fontWeight: 900,
  },

  prompt: {
    textAlign: "center",
    fontSize: 21,
    lineHeight: 1.8,
    color: "#17365F",
    fontWeight: 900,
  },
};
