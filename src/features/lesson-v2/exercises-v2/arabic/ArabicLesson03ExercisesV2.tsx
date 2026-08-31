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
  {
    id: "l03_ex1_q1",
    mission: 1,
    prompt: "اِخْتَرْ فَرْدًا مِنْ أَفْرَادِ الْعَائِلَةِ.",
    audioKey: "l03_ex1_q1",
    answer: "father",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/arabic/lesson03/s5.webp",
      options: [
        { id: "father", label: "أَبِي", semantic: "normal" },
        { id: "doctor", label: "الطَّبِيبُ", semantic: "normal" },
        { id: "policeman", label: "الشُّرْطِيُّ", semantic: "normal" }
      ]
    },
    successText: "🌟 أَحْسَنْتَ! أَبِي مِنْ أَفْرَادِ عَائِلَتِي.",
    retryText: "فَكِّرْ فِي أَفْرَادِ عَائِلَتِكَ، ثُمَّ حَاوِلْ مُجَدَّدًا."
  },
  {
    id: "l03_ex1_q2",
    mission: 1,
    prompt: "اِخْتَرْ فَرْدًا مِنْ أَفْرَادِ الْعَائِلَةِ.",
    audioKey: "l03_ex1_q2",
    answer: "mother",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/arabic/lesson03/s5.webp",
      options: [
        { id: "athlete", label: "الرِّيَاضِيُّ", semantic: "normal" },
        { id: "mother", label: "أُمِّي", semantic: "normal" },
        { id: "teacher", label: "الْمُعَلِّمُ", semantic: "normal" }
      ]
    },
    successText: "🌟 أَحْسَنْتَ! أُمِّي مِنْ أَفْرَادِ عَائِلَتِي.",
    retryText: "اِخْتَرِ الشَّخْصَ الَّذِي يَنْتَمِي إِلَى الْعَائِلَةِ."
  },
  {
    id: "l03_ex1_q3",
    mission: 1,
    prompt: "اِخْتَرْ فَرْدًا مِنْ أَفْرَادِ الْعَائِلَةِ.",
    audioKey: "l03_ex1_q3",
    answer: "grandfather",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/arabic/lesson03/s5.webp",
      options: [
        { id: "doctor2", label: "الطَّبِيبُ", semantic: "normal" },
        { id: "policeman2", label: "الشُّرْطِيُّ", semantic: "normal" },
        { id: "grandfather", label: "جَدِّي", semantic: "normal" }
      ]
    },
    successText: "🌟 أَحْسَنْتَ! جَدِّي مِنْ أَفْرَادِ عَائِلَتِي.",
    retryText: "تَذَكَّرْ أَفْرَادَ الْعَائِلَةِ، ثُمَّ حَاوِلْ مُجَدَّدًا."
  },
  {
    id: "l03_ex1_q4",
    mission: 1,
    prompt: "اِخْتَرْ فَرْدًا مِنْ أَفْرَادِ الْعَائِلَةِ.",
    audioKey: "l03_ex1_q4",
    answer: "grandmother",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/arabic/lesson03/s5.webp",
      options: [
        { id: "teacher2", label: "الْمُعَلِّمَةُ", semantic: "normal" },
        { id: "grandmother", label: "جَدَّتِي", semantic: "normal" },
        { id: "doctor3", label: "الطَّبِيبَةُ", semantic: "normal" }
      ]
    },
    successText: "🌟 أَحْسَنْتَ! جَدَّتِي مِنْ أَفْرَادِ عَائِلَتِي.",
    retryText: "اِخْتَرِ الشَّخْصَ الَّذِي يَنْتَمِي إِلَى الْعَائِلَةِ."
  },
  {
    id: "l03_ex2_q1",
    mission: 2,
    prompt: "أَبُو أَبِي هُوَ...",
    audioKey: "l03_ex2_q1",
    answer: "grandfather-rel",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/arabic/lesson03/s5.webp",
      options: [
        { id: "uncle", label: "عَمِّي", semantic: "normal" },
        { id: "brother", label: "أَخِي", semantic: "normal" },
        { id: "grandfather-rel", label: "جَدِّي", semantic: "normal" }
      ]
    },
    successText: "🌟 صَحِيحٌ! أَبُو أَبِي هُوَ جَدِّي.",
    retryText: "فَكِّرْ فِي صِلَةِ الْقَرَابَةِ، ثُمَّ حَاوِلْ مُجَدَّدًا."
  },
  {
    id: "l03_ex2_q2",
    mission: 2,
    prompt: "أُمُّ أُمِّي هِيَ...",
    audioKey: "l03_ex2_q2",
    answer: "grandmother-rel",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/arabic/lesson03/s5.webp",
      options: [
        { id: "grandmother-rel", label: "جَدَّتِي", semantic: "normal" },
        { id: "sister", label: "أُخْتِي", semantic: "normal" },
        { id: "aunt", label: "خَالَتِي", semantic: "normal" }
      ]
    },
    successText: "🌟 صَحِيحٌ! أُمُّ أُمِّي هِيَ جَدَّتِي.",
    retryText: "فَكِّرْ فِي صِلَةِ الْقَرَابَةِ."
  },
  {
    id: "l03_ex2_q3",
    mission: 2,
    prompt: "ابْنَةُ وَالِدَيَّ هِيَ...",
    audioKey: "l03_ex2_q3",
    answer: "sister-rel",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/arabic/lesson03/s5.webp",
      options: [
        { id: "grandma2", label: "جَدَّتِي", semantic: "normal" },
        { id: "sister-rel", label: "أُخْتِي", semantic: "normal" },
        { id: "teacher3", label: "مُعَلِّمَتِي", semantic: "normal" }
      ]
    },
    successText: "🌟 أَحْسَنْتَ! ابْنَةُ وَالِدَيَّ هِيَ أُخْتِي.",
    retryText: "اِخْتَرْ صِلَةَ الْقَرَابَةِ الصَّحِيحَةَ."
  },
  {
    id: "l03_ex2_q4",
    mission: 2,
    prompt: "أَنَا وَأَبِي وَأُمِّي وَإِخْوَتِي نُكَوِّنُ...",
    audioKey: "l03_ex2_q4",
    answer: "family",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/arabic/lesson03/s5.webp",
      options: [
        { id: "class", label: "قِسْمًا", semantic: "normal" },
        { id: "team", label: "فَرِيقًا", semantic: "normal" },
        { id: "family", label: "عَائِلَةً", semantic: "normal" }
      ]
    },
    successText: "🌟 مُمْتَازٌ! نَحْنُ نُكَوِّنُ عَائِلَةً.",
    retryText: "تَذَكَّرْ عُنْوَانَ الدَّرْسِ، ثُمَّ حَاوِلْ مُجَدَّدًا."
  },
  {
    id: "l03_ex3_q1",
    mission: 3,
    prompt: "رَتِّبِ الْكَلِمَاتِ، وَابْنِ الْجُمْلَةَ.",
    audioKey: "l03_ex3_q1",
    activityData: {
      kind: "word-order",
      tokens: [
        { id: "family", label: "عَائِلَتِي", semantic: "normal" },
        { id: "this-f", label: "هَذِهِ", semantic: "normal" }
      ],
      correctOrder: ["this-f", "family"]
    },
    successText: "🌟 أَحْسَنْتَ! هَذِهِ عَائِلَتِي.",
    retryText: "اِقْرَأِ الْكَلِمَتَيْنِ، ثُمَّ أَعِدْ تَرْتِيبَهُمَا."
  },
  {
    id: "l03_ex3_q2",
    mission: 3,
    prompt: "رَتِّبِ الْكَلِمَاتِ، وَابْنِ الْجُمْلَةَ.",
    audioKey: "l03_ex3_q2",
    activityData: {
      kind: "word-order",
      tokens: [
        { id: "father2", label: "أَبِي", semantic: "normal" },
        { id: "this-m", label: "هَذَا", semantic: "normal" }
      ],
      correctOrder: ["this-m", "father2"]
    },
    successText: "🌟 أَحْسَنْتَ! هَذَا أَبِي.",
    retryText: "اِقْرَأِ الْكَلِمَتَيْنِ، ثُمَّ أَعِدْ تَرْتِيبَهُمَا."
  },
  {
    id: "l03_ex3_q3",
    mission: 3,
    prompt: "رَتِّبِ الْكَلِمَاتِ، وَابْنِ الْجُمْلَةَ.",
    audioKey: "l03_ex3_q3",
    activityData: {
      kind: "word-order",
      tokens: [
        { id: "mother2", label: "أُمِّي", semantic: "normal" },
        { id: "this-f2", label: "هَذِهِ", semantic: "normal" }
      ],
      correctOrder: ["this-f2", "mother2"]
    },
    successText: "🌟 أَحْسَنْتَ! هَذِهِ أُمِّي.",
    retryText: "اِقْرَأِ الْكَلِمَتَيْنِ، ثُمَّ أَعِدْ تَرْتِيبَهُمَا."
  },
  {
    id: "l03_ex3_q4",
    mission: 3,
    prompt: "رَتِّبِ الْكَلِمَاتِ، وَابْنِ الْجُمْلَةَ.",
    audioKey: "l03_ex3_q4",
    activityData: {
      kind: "word-order",
      tokens: [
        { id: "family2", label: "عَائِلَتِي", semantic: "normal" },
        { id: "love", label: "أُحِبُّ", semantic: "normal" }
      ],
      correctOrder: ["love", "family2"]
    },
    successText: "🌟 أَحْسَنْتَ! أُحِبُّ عَائِلَتِي.",
    retryText: "اِقْرَأِ الْكَلِمَتَيْنِ، ثُمَّ أَعِدْ تَرْتِيبَهُمَا."
  },
  {
    id: "l03_ex4_q1",
    mission: 4,
    prompt: "اُنْظُرْ إِلَى صُورَةِ الْعَائِلَةِ، ثُمَّ اخْتَرِ الْجُمْلَةَ الْمُنَاسِبَةَ.",
    audioKey: "l03_ex4_q1",
    answer: "my-family",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/arabic/lesson03/s5.webp",
      options: [
        { id: "my-family", label: "هَؤُلَاءِ أَفْرَادُ عَائِلَتِي.", semantic: "normal" },
        { id: "friends", label: "هَؤُلَاءِ أَصْدِقَائِي.", semantic: "normal" },
        { id: "classmates", label: "هَؤُلَاءِ تَلَامِيذُ الْقِسْمِ.", semantic: "normal" }
      ]
    },
    successText: "🌟 أَحْسَنْتَ! هَؤُلَاءِ أَفْرَادُ عَائِلَتِي.",
    retryText: "اُنْظُرْ إِلَى الصُّورَةِ وَتَذَكَّرْ أَفْرَادَ عَائِلَتِكَ."
  },
  {
    id: "l03_ex4_q2",
    mission: 4,
    prompt: "مَنْ لَا يَنْتَمِي إِلَى أَفْرَادِ الْعَائِلَةِ؟",
    audioKey: "l03_ex4_q2",
    answer: "not-family",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/arabic/lesson03/s5.webp",
      options: [
        { id: "father3", label: "أَبِي", semantic: "normal" },
        { id: "mother3", label: "أُمِّي", semantic: "normal" },
        { id: "not-family", label: "الشُّرْطِيُّ", semantic: "normal" }
      ]
    },
    successText: "🌟 صَحِيحٌ! الشُّرْطِيُّ لَيْسَ فَرْدًا مِنْ عَائِلَتِي لِمُجَرَّدِ مِهْنَتِهِ.",
    retryText: "مَيِّزْ بَيْنَ فَرْدِ الْعَائِلَةِ وَصَاحِبِ الْمِهْنَةِ."
  },
  {
    id: "l03_ex4_q3",
    mission: 4,
    prompt: "اِخْتَرِ الْجُمْلَةَ الَّتِي تُعَرِّفُ بِعَائِلَتِكَ.",
    audioKey: "l03_ex4_q3",
    answer: "introduce",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/arabic/lesson03/s5.webp",
      options: [
        { id: "school", label: "هَذِهِ مَدْرَسَتِي.", semantic: "normal" },
        { id: "introduce", label: "هَذِهِ عَائِلَتِي.", semantic: "normal" },
        { id: "bag", label: "هَذِهِ مِحْفَظَتِي.", semantic: "normal" }
      ]
    },
    successText: "🌟 أَحْسَنْتَ! هَذِهِ عَائِلَتِي.",
    retryText: "تَذَكَّرْ كَيْفَ تُعَرِّفُ بِعَائِلَتِكَ."
  },
  {
    id: "l03_ex4_q4",
    mission: 4,
    prompt: "اِخْتَرْ مَا تَعَلَّمْتَهُ فِي هَذَا الدَّرْسِ.",
    audioKey: "l03_ex4_q4",
    answer: "goal",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/arabic/lesson03/s5.webp",
      options: [
        { id: "goal", label: "أَتَعَرَّفُ عَلَى أَفْرَادِ عَائِلَتِي وَأُسَمِّيهِمْ.", semantic: "normal" },
        { id: "numbers", label: "أَتَعَلَّمُ جَمْعَ الْأَعْدَادِ.", semantic: "normal" },
        { id: "colors", label: "أَتَعَلَّمُ أَلْوَانَ الطَّيْفِ.", semantic: "normal" }
      ]
    },
    successText: "🌟 مُمْتَازٌ! تَعَرَّفْتَ عَلَى أَفْرَادِ عَائِلَتِكَ.",
    retryText: "تَذَكَّرْ عُنْوَانَ الدَّرْسِ وَهَدَفَهُ."
  }
];

const missionTitles = {1:"أَتَعَرَّفُ وَأَخْتَارُ",2:"أُمَيِّزُ وَأَرْبِطُ",3:"أَقْرَأُ وَأَبْنِي",4:"أُوَظِّفُ وَأُعَبِّرُ"};

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

export default function ArabicLesson03ExercisesV2() {
  return (
    <UnifiedLessonExercisesV2
      lessonKey="arabic-w01-u03"
      audioBase="/audio/v2/arabic/lesson03/exercises"
      questions={questions}
      missionTitles={missionTitles}
      missionCount={4}
      completionMessage="أَحْسَنْتَ يَا فَاضِلُ! أَتْمَمْتَ نَشَاطَاتِ دَرْسِ تَعَرَّفْ عَلَى عَائِلَتِي بِنَجَاحٍ، وَتَعَرَّفْتَ عَلَى أَفْرَادِ الْعَائِلَةِ وَصِلَاتِ الْقَرَابَةِ، وَاسْتَطَعْتَ أَنْ تُعَرِّفَ بِعَائِلَتِكَ."
      nextLessonKey="islamic-w01-u04"
      nextPath="/lesson-v2/islamic/lesson04"
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
