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
    id: "l11_ex1_q1",
    mission: 1,
    prompt: "أَيْنَ نَنَامُ؟",
    audioKey: "l11_ex1_q1",
    answer: "bedroom",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/arabic/lesson11/s2.webp",
      options: [
        { id: "bedroom", label: "غُرْفَةُ النَّوْمِ", semantic: "normal" },
        { id: "kitchen", label: "الْمَطْبَخُ", semantic: "normal" },
        { id: "bathroom", label: "الْحَمَّامُ", semantic: "normal" }
      ]
    },
    successText: "🌟 أَحْسَنْتَ! نَنَامُ فِي غُرْفَةِ النَّوْمِ.",
    retryText: "فَكِّرْ فِي الْغُرْفَةِ الَّتِي فِيهَا السَّرِيرُ."
  },
  {
    id: "l11_ex1_q2",
    mission: 1,
    prompt: "أَيْنَ نَسْتَقْبِلُ الضُّيُوفَ؟",
    audioKey: "l11_ex1_q2",
    answer: "reception",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/arabic/lesson11/s2.webp",
      options: [
        { id: "bathroom2", label: "الْحَمَّامُ", semantic: "normal" },
        { id: "reception", label: "غُرْفَةُ الِاسْتِقْبَالِ", semantic: "normal" },
        { id: "bedroom2", label: "غُرْفَةُ النَّوْمِ", semantic: "normal" }
      ]
    },
    successText: "🌟 صَحِيحٌ! نَسْتَقْبِلُ الضُّيُوفَ فِي غُرْفَةِ الِاسْتِقْبَالِ.",
    retryText: "تَذَكَّرِ الْغُرْفَةَ الَّتِي نَجْلِسُ فِيهَا مَعَ الضُّيُوفِ."
  },
  {
    id: "l11_ex1_q3",
    mission: 1,
    prompt: "أَيْنَ نُعِدُّ الطَّعَامَ؟",
    audioKey: "l11_ex1_q3",
    answer: "kitchen3",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/arabic/lesson11/s2.webp",
      options: [
        { id: "reception3", label: "غُرْفَةُ الِاسْتِقْبَالِ", semantic: "normal" },
        { id: "bedroom3", label: "غُرْفَةُ النَّوْمِ", semantic: "normal" },
        { id: "kitchen3", label: "الْمَطْبَخُ", semantic: "normal" }
      ]
    },
    successText: "🌟 أَحْسَنْتَ! نُعِدُّ الطَّعَامَ فِي الْمَطْبَخِ.",
    retryText: "فَكِّرْ فِي الْمَكَانِ الَّذِي نَطْبُخُ فِيهِ."
  },
  {
    id: "l11_ex1_q4",
    mission: 1,
    prompt: "أَيْنَ نَغْتَسِلُ؟",
    audioKey: "l11_ex1_q4",
    answer: "bathroom4",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/arabic/lesson11/s2.webp",
      options: [
        { id: "bathroom4", label: "الْحَمَّامُ", semantic: "normal" },
        { id: "kitchen4", label: "الْمَطْبَخُ", semantic: "normal" },
        { id: "reception4", label: "غُرْفَةُ الِاسْتِقْبَالِ", semantic: "normal" }
      ]
    },
    successText: "🌟 مُمْتَازٌ! نَغْتَسِلُ فِي الْحَمَّامِ.",
    retryText: "تَذَكَّرِ الْمَكَانَ الَّذِي نَسْتَحِمُّ فِيهِ."
  },
  {
    id: "l11_ex2_q1",
    mission: 2,
    prompt: "أَيُّ أَدَاةٍ أَسْتَعْمِلُهَا لِرَسْمِ خَطٍّ مُسْتَقِيمٍ؟",
    audioKey: "l11_ex2_q1",
    answer: "ruler",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/arabic/lesson11/s3.webp",
      options: [
        { id: "spoon", label: "مِلْعَقَةٌ", semantic: "normal" },
        { id: "ruler", label: "مِسْطَرَةٌ", semantic: "normal" },
        { id: "ball", label: "كُرَةٌ", semantic: "normal" }
      ]
    },
    successText: "🌟 أَحْسَنْتَ! أَسْتَعْمِلُ الْمِسْطَرَةَ لِرَسْمِ خَطٍّ مُسْتَقِيمٍ.",
    retryText: "اُنْظُرْ إِلَى أَدَوَاتِ الرَّسْمِ فِي الْمَشْهَدِ."
  },
  {
    id: "l11_ex2_q2",
    mission: 2,
    prompt: "أَكْمِلْ: مَنْزِلِي ...",
    audioKey: "l11_ex2_q2",
    answer: "beautiful",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/arabic/lesson11/s4.webp",
      options: [
        { id: "cold", label: "بَارِدٌ", semantic: "normal" },
        { id: "far", label: "بَعِيدٌ", semantic: "normal" },
        { id: "beautiful", label: "جَمِيلٌ", semantic: "normal" }
      ]
    },
    successText: "🌟 صَحِيحٌ! مَنْزِلِي جَمِيلٌ.",
    retryText: "تَذَكَّرْ وَصْفَ فَاضِلٍ لِمَنْزِلِهِ."
  },
  {
    id: "l11_ex2_q3",
    mission: 2,
    prompt: "رَتِّبِ الْكَلِمَتَيْنِ.",
    audioKey: "l11_ex2_q3",
    activityData: {
      kind: "word-order",
      tokens: [
        { id: "beautiful2", label: "جَمِيلٌ", semantic: "normal" },
        { id: "myhome", label: "مَنْزِلِي", semantic: "normal" }
      ],
      correctOrder: ["myhome", "beautiful2"]
    },
    successText: "🌟 أَحْسَنْتَ! مَنْزِلِي جَمِيلٌ.",
    retryText: "اِبْدَأْ بِكَلِمَةِ «مَنْزِلِي»."
  },
  {
    id: "l11_ex2_q4",
    mission: 2,
    prompt: "رَتِّبِ الْكَلِمَتَيْنِ.",
    audioKey: "l11_ex2_q4",
    activityData: {
      kind: "word-order",
      tokens: [
        { id: "tidy", label: "مُرَتَّبَةٌ", semantic: "normal" },
        { id: "rooms", label: "غُرَفٌ", semantic: "normal" }
      ],
      correctOrder: ["rooms", "tidy"]
    },
    successText: "🌟 مُمْتَازٌ! غُرَفٌ مُرَتَّبَةٌ.",
    retryText: "اِبْدَأْ بِكَلِمَةِ «غُرَفٌ»."
  },
  {
    id: "l11_ex3_q1",
    mission: 3,
    prompt: "مَنْ أَذْكُرُ أَوَّلًا عِنْدَ التَّعْرِيفِ بِعَائِلَتِي؟",
    audioKey: "l11_ex3_q1",
    answer: "father",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/arabic/lesson11/s5.webp",
      options: [
        { id: "father", label: "الْأَبُ", semantic: "normal" },
        { id: "teacher", label: "الْمُعَلِّمُ", semantic: "normal" },
        { id: "doctor", label: "الطَّبِيبُ", semantic: "normal" }
      ]
    },
    successText: "🌟 أَحْسَنْتَ! أَذْكُرُ الْأَبَ.",
    retryText: "اُنْظُرْ إِلَى أَفْرَادِ الْعَائِلَةِ فِي الْمَشْهَدِ."
  },
  {
    id: "l11_ex3_q2",
    mission: 3,
    prompt: "اِخْتَرْ فَرْدًا مِنْ أَفْرَادِ الْعَائِلَةِ.",
    audioKey: "l11_ex3_q2",
    answer: "mother",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/arabic/lesson11/s5.webp",
      options: [
        { id: "neighbor", label: "الْجَارُ", semantic: "normal" },
        { id: "mother", label: "الْأُمُّ", semantic: "normal" },
        { id: "driver", label: "السَّائِقُ", semantic: "normal" }
      ]
    },
    successText: "🌟 صَحِيحٌ! الْأُمُّ مِنْ أَفْرَادِ الْعَائِلَةِ.",
    retryText: "اِخْتَرْ شَخْصًا مِنَ الْأُسْرَةِ."
  },
  {
    id: "l11_ex3_q3",
    mission: 3,
    prompt: "مَنْ نَضَعُهُمْ مَعَ الْأَبِ وَالْأُمِّ فِي شَجَرَةِ الْعَائِلَةِ؟",
    audioKey: "l11_ex3_q3",
    answer: "children",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/arabic/lesson11/s6.webp",
      options: [
        { id: "books", label: "الْكُتُبُ", semantic: "normal" },
        { id: "rooms2", label: "الْغُرَفُ", semantic: "normal" },
        { id: "children", label: "الْأَبْنَاءُ", semantic: "normal" }
      ]
    },
    successText: "🌟 أَحْسَنْتَ! نَضَعُ الْأَبَ وَالْأُمَّ وَالْأَبْنَاءَ فِي شَجَرَةِ الْعَائِلَةِ.",
    retryText: "تَذَكَّرْ مَنْ يَظْهَرُ فِي شَجَرَةِ الْعَائِلَةِ."
  },
  {
    id: "l11_ex3_q4",
    mission: 3,
    prompt: "رَتِّبِ الْكَلِمَتَيْنِ.",
    audioKey: "l11_ex3_q4",
    activityData: {
      kind: "word-order",
      tokens: [
        { id: "family", label: "عَائِلَتِي", semantic: "normal" },
        { id: "this", label: "هَذِهِ", semantic: "normal" }
      ],
      correctOrder: ["this", "family"]
    },
    successText: "🌟 مُمْتَازٌ! هَذِهِ عَائِلَتِي.",
    retryText: "اِبْدَأْ بِكَلِمَةِ «هَذِهِ»."
  },
  {
    id: "l11_ex4_q1",
    mission: 4,
    prompt: "مَا الْخُطْوَةُ الَّتِي أَبْدَأُ بِهَا مَشْرُوعَ مَنْزِلِي؟",
    audioKey: "l11_ex4_q1",
    answer: "draw",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/arabic/lesson11/s3.webp",
      options: [
        { id: "sleep", label: "أَنَامُ", semantic: "normal" },
        { id: "draw", label: "أَرْسُمُ", semantic: "normal" },
        { id: "eat", label: "آكُلُ", semantic: "normal" }
      ]
    },
    successText: "🌟 أَحْسَنْتَ! أَبْدَأُ بِرَسْمِ هَيْكَلِ مَنْزِلِي.",
    retryText: "تَذَكَّرْ مَا فَعَلَهُ فَاضِلٌ بِالْقَلَمِ وَالْمِسْطَرَةِ."
  },
  {
    id: "l11_ex4_q2",
    mission: 4,
    prompt: "بَعْدَ أَنْ أَرْسُمَ مَنْزِلِي، مَاذَا أَفْعَلُ؟",
    audioKey: "l11_ex4_q2",
    answer: "color",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/arabic/lesson11/s4.webp",
      options: [
        { id: "erase", label: "أَمْحُو", semantic: "normal" },
        { id: "hide", label: "أُخْفِي", semantic: "normal" },
        { id: "color", label: "أُلَوِّنُ", semantic: "normal" }
      ]
    },
    successText: "🌟 صَحِيحٌ! بَعْدَ الرَّسْمِ أُلَوِّنُ مَنْزِلِي.",
    retryText: "اُنْظُرْ إِلَى الْمَنْزِلِ الْمُلَوَّنِ فِي الْمَشْهَدِ."
  },
  {
    id: "l11_ex4_q3",
    mission: 4,
    prompt: "مَا الَّذِي أَضَعُهُ فِي شَجَرَةِ عَائِلَتِي؟",
    audioKey: "l11_ex4_q3",
    answer: "familyset",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/arabic/lesson11/s6.webp",
      options: [
        { id: "familyset", label: "الْأَبُ وَالْأُمُّ وَالْأَبْنَاءُ", semantic: "normal" },
        { id: "tools", label: "الْقَلَمُ وَالْمِسْطَرَةُ", semantic: "normal" },
        { id: "rooms3", label: "الْمَطْبَخُ وَالْحَمَّامُ", semantic: "normal" }
      ]
    },
    successText: "🌟 مُمْتَازٌ! هَؤُلَاءِ أَفْرَادُ عَائِلَتِي.",
    retryText: "اِخْتَرِ الْمَجْمُوعَةَ الَّتِي تُمَثِّلُ أَفْرَادَ الْأُسْرَةِ."
  },
  {
    id: "l11_ex4_q4",
    mission: 4,
    prompt: "رَتِّبِ الْكَلِمَاتِ الثَّلَاثَ.",
    audioKey: "l11_ex4_q4",
    activityData: {
      kind: "word-order",
      tokens: [
        { id: "familyworld", label: "«عَائِلَتِي»", semantic: "normal" },
        { id: "world", label: "عَالَمَ", semantic: "normal" },
        { id: "finished", label: "أَتْمَمْتُ", semantic: "normal" }
      ],
      correctOrder: ["finished", "world", "familyworld"]
    },
    successText: "🌟 أَحْسَنْتَ! أَتْمَمْتُ عَالَمَ «عَائِلَتِي».",
    retryText: "اِبْدَأْ بِالْفِعْلِ «أَتْمَمْتُ»."
  }
];

const missionTitles = {1:"أَتَعَرَّفُ عَلَى غُرَفِ مَنْزِلِي",2:"أَرْسُمُ وَأَصِفُ مَنْزِلِي",3:"أَعْرِفُ عَائِلَتِي",4:"أُدْمِجُ مَشْرُوعِي"};

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

export default function ArabicLesson11ExercisesV2() {
  return (
    <UnifiedLessonExercisesV2
      lessonKey="arabic-w01-u11"
      audioBase="/audio/v2/arabic/lesson11/exercises"
      questions={questions}
      missionTitles={missionTitles}
      missionCount={4}
      completionMessage="أَحْسَنْتَ يَا فَاضِلُ! أَنْجَزْتَ مَشْرُوعَكَ، وَوَصَفْتَ مَنْزِلَكَ، وَتَعَرَّفْتَ عَلَى عَائِلَتِكَ. أَتْمَمْتَ عَالَمَ «عَائِلَتِي» بِنَجَاحٍ."
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
