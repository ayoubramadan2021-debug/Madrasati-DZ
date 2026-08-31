import UnifiedLessonExercisesV2, {
  type UnifiedLessonExerciseRenderContextV2,
} from "../UnifiedLessonExercisesV2";

import ArabicLanguageActivityKitV1, {
  type ArabicCharacterV1,
  type ArabicExerciseQuestionV1,
} from "./ArabicLanguageActivityKitV1";

const P =
  "/lessons/v2/arabic/lesson01/activity-characters";

const SCENE =
  "/lessons/v2/arabic/lesson01";

const characters: Record<
  string,
  ArabicCharacterV1
> = {
  fadel: {
    id: "fadel",
    label: "فَاضِلٌ",
    image: `${P}/fadel.webp`,
  },
  rahma: {
    id: "rahma",
    label: "رَحْمَةُ",
    image: `${P}/rahma.webp`,
  },
  sirine: {
    id: "sirine",
    label: "سِيرِينُ",
    image: `${P}/sirine.webp`,
  },
  taline: {
    id: "taline",
    label: "تَالِينُ",
    image: `${P}/taline.webp`,
  },
  khalil: {
    id: "khalil",
    label: "خَلِيلٌ",
    image: `${P}/khalil.webp`,
  },
};

const questions: ArabicExerciseQuestionV1[] = [
  // ==========================================================
  // EX1 — أستمع وأتعرف — 4 questions
  // ==========================================================
  {
    id: "l01_ex1_q1",
    mission: 1,
    prompt:
      "اِخْتَرْ صُورَةَ فَاضِلٍ.",
    audioKey: "l01_ex1_q1",
    answer: "fadel",
    activityData: {
      kind: "character-choice",
      options: [
        characters.rahma,
        characters.fadel,
        characters.sirine,
      ],
    },
    successText:
      "🌟 أَحْسَنْتَ! هَذَا فَاضِلٌ.",
    retryText:
      "اِسْتَمِعْ جَيِّدًا، ثُمَّ حَاوِلْ مُجَدَّدًا.",
  },
  {
    id: "l01_ex1_q2",
    mission: 1,
    prompt:
      "اِخْتَرْ صُورَةَ رَحْمَةَ.",
    audioKey: "l01_ex1_q2",
    answer: "rahma",
    activityData: {
      kind: "character-choice",
      options: [
        characters.sirine,
        characters.rahma,
        characters.fadel,
      ],
    },
    successText:
      "🌟 أَحْسَنْتَ! هَذِهِ رَحْمَةُ.",
    retryText:
      "اِسْتَمِعْ جَيِّدًا، ثُمَّ حَاوِلْ مُجَدَّدًا.",
  },
  {
    id: "l01_ex1_q3",
    mission: 1,
    prompt:
      "اِخْتَرْ صُورَةَ سِيرِينَ.",
    audioKey: "l01_ex1_q3",
    answer: "sirine",
    activityData: {
      kind: "character-choice",
      options: [
        characters.fadel,
        characters.sirine,
        characters.rahma,
      ],
    },
    successText:
      "🌟 أَحْسَنْتَ! هَذِهِ سِيرِينُ.",
    retryText:
      "اِسْتَمِعْ جَيِّدًا، ثُمَّ حَاوِلْ مُجَدَّدًا.",
  },
  {
    id: "l01_ex1_q4",
    mission: 1,
    prompt:
      "اِخْتَرْ صُورَةَ تَالِينَ.",
    audioKey: "l01_ex1_q4",
    answer: "taline",
    activityData: {
      kind: "character-choice",
      options: [
        characters.khalil,
        characters.taline,
        characters.fadel,
      ],
    },
    successText:
      "🌟 أَحْسَنْتَ! هَذِهِ تَالِينُ.",
    retryText:
      "اِسْتَمِعْ جَيِّدًا، ثُمَّ حَاوِلْ مُجَدَّدًا.",
  },

  // ==========================================================
  // EX2 — أربط وأميز — 4 questions
  // ==========================================================
  {
    id: "l01_ex2_q1",
    mission: 2,
    prompt:
      "صِلْ كُلَّ اسْمٍ بِصُورَتِهِ.",
    audioKey: "l01_ex2_q1",
    activityData: {
      kind: "picture-word-match",
      pairs: [
        characters.fadel,
        characters.rahma,
        characters.sirine,
        characters.taline,
      ],
    },
    successText:
      "🌟 مُمْتَاز! رَبَطْتَ الْأَسْمَاءَ بِالصُّوَرِ.",
    retryText:
      "اُنْظُرْ إِلَى الصُّورَةِ وَالِاسْمِ، ثُمَّ حَاوِلْ مُجَدَّدًا.",
  },
  {
    id: "l01_ex2_q2",
    mission: 2,
    prompt:
      "اُنْظُرْ إِلَى الصُّورَةِ، ثُمَّ اخْتَرِ الاِسْمَ الصَّحِيحَ.",
    audioKey: "l01_ex2_q2",
    answer: "fadel",
    activityData: {
      kind: "sentence-choice",
      image: `${P}/fadel.webp`,
      options: [
        {
          id: "rahma",
          label: "رَحْمَةُ",
          semantic: "character",
        },
        {
          id: "fadel",
          label: "فَاضِلٌ",
          semantic: "character",
        },
        {
          id: "sirine",
          label: "سِيرِينُ",
          semantic: "character",
        },
      ],
    },
    successText:
      "🌟 أَحْسَنْتَ! اسْمُهُ فَاضِلٌ.",
    retryText:
      "اُنْظُرْ إِلَى الصُّورَةِ، ثُمَّ اقْرَأِ الْأَسْمَاءَ.",
  },
  {
    id: "l01_ex2_q3",
    mission: 2,
    prompt:
      "لَوِّنْ كَلِمَةَ أَنَا.",
    audioKey: "l01_ex2_q3",
    answer: "ana",
    activityData: {
      kind: "word-recognition",
      targetColor: "red",
      words: [
        {
          id: "fadel",
          label: "فَاضِلٌ",
          semantic: "character",
        },
        {
          id: "ana",
          label: "أَنَا",
          semantic: "important",
        },
        {
          id: "rahma",
          label: "رَحْمَةُ",
          semantic: "character",
        },
        {
          id: "ismi",
          label: "إِسْمِي",
          semantic: "important",
        },
      ],
    },
    successText:
      "🌟 أَحْسَنْتَ! لَوَّنْتَ كَلِمَةَ أَنَا.",
    retryText:
      "ابْحَثْ عَنْ كَلِمَةِ أَنَا، ثُمَّ حَاوِلْ مُجَدَّدًا.",
  },
  {
    id: "l01_ex2_q4",
    mission: 2,
    prompt:
      "اِخْتَرْ كَلِمَةَ إِسْمِي.",
    audioKey: "l01_ex2_q4",
    answer: "ismi",
    activityData: {
      kind: "word-recognition",
      targetColor: "blue",
      words: [
        {
          id: "ana",
          label: "أَنَا",
          semantic: "important",
        },
        {
          id: "ismi",
          label: "إِسْمِي",
          semantic: "important",
        },
        {
          id: "fadel",
          label: "فَاضِلٌ",
          semantic: "character",
        },
        {
          id: "sirine",
          label: "سِيرِينُ",
          semantic: "character",
        },
      ],
    },
    successText:
      "🌟 صَحِيح! هَذِهِ كَلِمَةُ إِسْمِي.",
    retryText:
      "اِسْتَمِعْ إِلَى الْكَلِمَةِ، ثُمَّ حَاوِلْ مُجَدَّدًا.",
  },

  // ==========================================================
  // EX3 — أبني وأقرأ — 4 questions
  // ==========================================================
  {
    id: "l01_ex3_q1",
    mission: 3,
    prompt:
      "رَتِّبْ الْكَلِمَاتِ، وَابْنِ الْجُمْلَةَ.",
    audioKey: "l01_ex3_q1",
    activityData: {
      kind: "word-order",
      tokens: [
        {
          id: "fadel",
          label: "فَاضِلٌ",
          semantic: "character",
        },
        {
          id: "ana",
          label: "أَنَا",
          semantic: "important",
        },
        {
          id: "ismi",
          label: "إِسْمِي",
          semantic: "important",
        },
      ],
      correctOrder: [
        "ana",
        "ismi",
        "fadel",
      ],
    },
    successText:
      "🌟 أَحْسَنْتَ! أَنَا إِسْمِي فَاضِلٌ.",
    retryText:
      "اِقْرَأِ الْكَلِمَاتِ، ثُمَّ أَعِدْ تَرْتِيبَهَا.",
  },
  {
    id: "l01_ex3_q2",
    mission: 3,
    prompt:
      "اُنْظُرْ إِلَى تَالِينٍ، ثُمَّ اخْتَرِ الْكَلِمَةَ الْمُنَاسِبَةَ.",
    audioKey: "l01_ex3_q2",
    answer: "teacher",
    activityData: {
      kind: "role-choice",
      person: characters.taline,
      options: [
        {
          id: "teacher",
          label: "مُعَلِّمَةٌ",
          semantic: "important",
        },
        {
          id: "guide_f",
          label: "مُرْشِدَةٌ",
          semantic: "important",
        },
      ],
    },
    successText:
      "🌟 صَحِيح! تَالِينُ مُعَلِّمَةٌ.",
    retryText:
      "اِقْرَأِ الْكَلِمَتَيْنِ، ثُمَّ حَاوِلْ مُجَدَّدًا.",
  },
  {
    id: "l01_ex3_q3",
    mission: 3,
    prompt:
      "اُنْظُرْ إِلَى خَلِيلٍ، ثُمَّ اخْتَرِ الْكَلِمَةَ الْمُنَاسِبَةَ.",
    audioKey: "l01_ex3_q3",
    answer: "guide",
    activityData: {
      kind: "role-choice",
      person: characters.khalil,
      options: [
        {
          id: "guide",
          label: "مُرْشِدٌ",
          semantic: "important",
        },
        {
          id: "teacher_m",
          label: "مُعَلِّمٌ",
          semantic: "important",
        },
      ],
    },
    successText:
      "🌟 صَحِيح! خَلِيلٌ مُرْشِدٌ.",
    retryText:
      "اِقْرَأِ الْكَلِمَتَيْنِ، ثُمَّ حَاوِلْ مُجَدَّدًا.",
  },
  {
    id: "l01_ex3_q4",
    mission: 3,
    prompt:
      "اُنْظُرْ إِلَى الصُّورَةِ، ثُمَّ اخْتَرِ الْجُمْلَةَ الصَّحِيحَةَ.",
    audioKey: "l01_ex3_q4",
    answer: "ball",
    activityData: {
      kind: "sentence-choice",
      image: `${SCENE}/s3.webp`,
      options: [
        {
          id: "ball",
          label: "فَاضِلٌ يُحِبُّ اللَّعِبَ بِالْكُرَةِ.",
          semantic: "normal",
        },
        {
          id: "teacher",
          label: "فَاضِلٌ مُعَلِّمٌ.",
          semantic: "normal",
        },
      ],
    },
    successText:
      "🌟 مُمْتَاز! فَاضِلٌ يُحِبُّ اللَّعِبَ بِالْكُرَةِ.",
    retryText:
      "اُنْظُرْ إِلَى الْكُرَةِ، ثُمَّ اقْرَأِ الْجُمْلَتَيْنِ.",
  },

  // ==========================================================
  // EX4 — أعبر من خلال الصور — 6 guided expression questions
  // ==========================================================
  {
    id: "l01_ex4_q1",
    mission: 4,
    prompt:
      "رَتِّبْ الْكَلِمَاتِ لِتُعَبِّرَ عَنِ الصُّورَةِ.",
    audioKey: "l01_ex4_expression",
    activityData: {
      kind: "image-expression",
      image: `${SCENE}/s2.webp`,
      tokens: [
        {
          id: "fadel",
          label: "فَاضِلٌ",
          semantic: "character",
        },
        {
          id: "ana",
          label: "أَنَا",
          semantic: "important",
        },
        {
          id: "ismi",
          label: "إِسْمِي",
          semantic: "important",
        },
      ],
      correctOrder: [
        "ana",
        "ismi",
        "fadel",
      ],
    },
    successText:
      "🌟 أَحْسَنْتَ! أَنَا إِسْمِي فَاضِلٌ.",
    retryText:
      "اُنْظُرْ إِلَى الصُّورَةِ، ثُمَّ أَعِدْ بِنَاءَ الْجُمْلَةِ.",
  },
  {
    id: "l01_ex4_q2",
    mission: 4,
    prompt:
      "رَتِّبْ الْكَلِمَاتِ لِتُعَبِّرَ عَنِ الصُّورَةِ.",
    audioKey: "l01_ex4_expression",
    activityData: {
      kind: "image-expression",
      image: `${SCENE}/s3.webp`,
      tokens: [
        {
          id: "ball",
          label: "بِالْكُرَةِ",
          semantic: "important",
        },
        {
          id: "play",
          label: "اللَّعِبَ",
          semantic: "normal",
        },
        {
          id: "likes",
          label: "يُحِبُّ",
          semantic: "normal",
        },
        {
          id: "fadel",
          label: "فَاضِلٌ",
          semantic: "character",
        },
      ],
      correctOrder: [
        "fadel",
        "likes",
        "play",
        "ball",
      ],
    },
    successText:
      "🌟 مُمْتَاز! فَاضِلٌ يُحِبُّ اللَّعِبَ بِالْكُرَةِ.",
    retryText:
      "اُنْظُرْ إِلَى فَاضِلٍ وَالْكُرَةِ، ثُمَّ أَعِدْ بِنَاءَ الْجُمْلَةِ.",
  },
  {
    id: "l01_ex4_q3",
    mission: 4,
    prompt:
      "رَتِّبْ الْكَلِمَاتِ لِتُعَبِّرَ عَنِ الصُّورَةِ.",
    audioKey: "l01_ex4_expression",
    activityData: {
      kind: "image-expression",
      image: `${P}/rahma.webp`,
      tokens: [
        {
          id: "rahma",
          label: "رَحْمَةُ",
          semantic: "character",
        },
        {
          id: "this_f",
          label: "هَذِهِ",
          semantic: "normal",
        },
      ],
      correctOrder: [
        "this_f",
        "rahma",
      ],
    },
    successText:
      "🌟 أَحْسَنْتَ! هَذِهِ رَحْمَةُ.",
    retryText:
      "اُنْظُرْ إِلَى الصُّورَةِ، ثُمَّ أَعِدْ بِنَاءَ الْجُمْلَةِ.",
  },
  {
    id: "l01_ex4_q4",
    mission: 4,
    prompt:
      "رَتِّبْ الْكَلِمَاتِ لِتُعَبِّرَ عَنِ الصُّورَةِ.",
    audioKey: "l01_ex4_expression",
    activityData: {
      kind: "image-expression",
      image: `${P}/sirine.webp`,
      tokens: [
        {
          id: "sirine",
          label: "سِيرِينُ",
          semantic: "character",
        },
        {
          id: "this_f",
          label: "هَذِهِ",
          semantic: "normal",
        },
      ],
      correctOrder: [
        "this_f",
        "sirine",
      ],
    },
    successText:
      "🌟 أَحْسَنْتَ! هَذِهِ سِيرِينُ.",
    retryText:
      "اُنْظُرْ إِلَى الصُّورَةِ، ثُمَّ أَعِدْ بِنَاءَ الْجُمْلَةِ.",
  },
  {
    id: "l01_ex4_q5",
    mission: 4,
    prompt:
      "رَتِّبْ الْكَلِمَاتِ لِتُعَبِّرَ عَنِ الصُّورَةِ.",
    audioKey: "l01_ex4_expression",
    activityData: {
      kind: "image-expression",
      image: `${P}/taline.webp`,
      tokens: [
        {
          id: "teacher",
          label: "مُعَلِّمَةٌ",
          semantic: "important",
        },
        {
          id: "taline",
          label: "تَالِينُ",
          semantic: "character",
        },
      ],
      correctOrder: [
        "taline",
        "teacher",
      ],
    },
    successText:
      "🌟 صَحِيح! تَالِينُ مُعَلِّمَةٌ.",
    retryText:
      "اُنْظُرْ إِلَى تَالِينٍ، ثُمَّ أَعِدْ بِنَاءَ الْجُمْلَةِ.",
  },
  {
    id: "l01_ex4_q6",
    mission: 4,
    prompt:
      "رَتِّبْ الْكَلِمَاتِ لِتُعَبِّرَ عَنِ الصُّورَةِ.",
    audioKey: "l01_ex4_expression",
    activityData: {
      kind: "image-expression",
      image: `${P}/khalil.webp`,
      tokens: [
        {
          id: "guide",
          label: "مُرْشِدٌ",
          semantic: "important",
        },
        {
          id: "khalil",
          label: "خَلِيلٌ",
          semantic: "character",
        },
      ],
      correctOrder: [
        "khalil",
        "guide",
      ],
    },
    successText:
      "🌟 صَحِيح! خَلِيلٌ مُرْشِدٌ.",
    retryText:
      "اُنْظُرْ إِلَى خَلِيلٍ، ثُمَّ أَعِدْ بِنَاءَ الْجُمْلَةِ.",
  },
];

const missionTitles: Record<number, string> = {
  1: "أَتَعَرَّفُ وَأَخْتَارُ",
  2: "أَرْبِطُ وَأُمَيِّزُ",
  3: "أَبْنِي وَأَقْرَأُ",
  4: "أُعَبِّرُ مِنْ خِلَالِ الصُّوَرِ",
};

function renderActivity(
  context:
    UnifiedLessonExerciseRenderContextV2<
      ArabicExerciseQuestionV1
    >,
) {
  return (
    <ArabicLanguageActivityKitV1
      {...context}
    />
  );
}

export default function ArabicLesson01ExercisesV2() {
  return (
    <UnifiedLessonExercisesV2
      lessonKey="arabic-w01-u01"
      audioBase="/audio/v2/arabic/lesson01/exercises"
      questions={questions}
      missionTitles={missionTitles}
      missionCount={4}
      completionMessage="أَحْسَنْتَ يَا بَطَلُ! أَتْمَمْتَ نَشَاطَاتِ الدَّرْسِ بِنَجَاحٍ، وَتَعَلَّمْتَ كَيْفَ تُعَرِّفُ بِنَفْسِكَ وَتَتَعَرَّفُ إِلَى أَصْدِقَائِكَ."
      nextLessonKey="arabic-w01-u02"
      nextPath="/lesson-v2/islamic/lesson02"
      nextLabel="الدَّرْسُ التَّالِي"
      returnPath="/world/arabic-family-local"
      returnLabel="العودة إلى عالم عائلتي"
      quizPath={null}
      feedbackDelay={1450}
      retryDelay={900}
      autoPlayDelay={500}
      renderActivity={renderActivity}
    />
  );
}
