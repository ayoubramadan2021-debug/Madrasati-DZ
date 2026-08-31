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
    id: "l05_ex1_q1",
    mission: 1,
    prompt: "أَيْنَ نُعِدُّ الطَّعَامَ؟ اِخْتَرِ الْغُرْفَةَ الْمُنَاسِبَةَ.",
    audioKey: "l05_ex1_q1",
    answer: "kitchen",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/arabic/lesson05/s4.webp",
      options: [
        { id: "kitchen", label: "الْمَطْبَخُ", semantic: "normal" },
        { id: "bedroom", label: "غُرْفَةُ النَّوْمِ", semantic: "normal" },
        { id: "bathroom", label: "الْحَمَّامُ", semantic: "normal" }
      ]
    },
    successText: "🌟 أَحْسَنْتَ! نُعِدُّ الطَّعَامَ فِي الْمَطْبَخِ.",
    retryText: "فَكِّرْ: أَيْنَ نَطْبُخُ وَنُعِدُّ الطَّعَامَ؟"
  },
  {
    id: "l05_ex1_q2",
    mission: 1,
    prompt: "أَيْنَ نَنَامُ؟ اِخْتَرِ الْغُرْفَةَ الْمُنَاسِبَةَ.",
    audioKey: "l05_ex1_q2",
    answer: "bedroom",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/arabic/lesson05/s5.webp",
      options: [
        { id: "living", label: "غُرْفَةُ الْجُلُوسِ", semantic: "normal" },
        { id: "bedroom", label: "غُرْفَةُ النَّوْمِ", semantic: "normal" },
        { id: "kitchen2", label: "الْمَطْبَخُ", semantic: "normal" }
      ]
    },
    successText: "🌟 صَحِيحٌ! نَنَامُ فِي غُرْفَةِ النَّوْمِ.",
    retryText: "تَذَكَّرِ الْغُرْفَةَ الَّتِي فِيهَا السَّرِيرُ."
  },
  {
    id: "l05_ex1_q3",
    mission: 1,
    prompt: "أَيْنَ نَجْلِسُ مَعَ الْعَائِلَةِ؟",
    audioKey: "l05_ex1_q3",
    answer: "living",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/arabic/lesson05/s3.webp",
      options: [
        { id: "bathroom2", label: "الْحَمَّامُ", semantic: "normal" },
        { id: "bedroom2", label: "غُرْفَةُ النَّوْمِ", semantic: "normal" },
        { id: "living", label: "غُرْفَةُ الْجُلُوسِ", semantic: "normal" }
      ]
    },
    successText: "🌟 أَحْسَنْتَ! نَجْلِسُ مَعَ الْعَائِلَةِ فِي غُرْفَةِ الْجُلُوسِ.",
    retryText: "فَكِّرْ فِي الْغُرْفَةِ الَّتِي فِيهَا الْأَرِيكَةُ."
  },
  {
    id: "l05_ex1_q4",
    mission: 1,
    prompt: "أَيْنَ نَغْتَسِلُ؟ اِخْتَرِ الْغُرْفَةَ الْمُنَاسِبَةَ.",
    audioKey: "l05_ex1_q4",
    answer: "bathroom",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/arabic/lesson05/s4.webp",
      options: [
        { id: "living2", label: "غُرْفَةُ الْجُلُوسِ", semantic: "normal" },
        { id: "bathroom", label: "الْحَمَّامُ", semantic: "normal" },
        { id: "kitchen3", label: "الْمَطْبَخُ", semantic: "normal" }
      ]
    },
    successText: "🌟 صَحِيحٌ! نَغْتَسِلُ فِي الْحَمَّامِ.",
    retryText: "تَذَكَّرِ الْمَكَانَ الَّذِي نَسْتَعْمِلُ فِيهِ الْمَاءَ لِلِاغْتِسَالِ."
  },
  {
    id: "l05_ex2_q1",
    mission: 2,
    prompt: "أَيْنَ نَضَعُ السَّرِيرَ؟",
    audioKey: "l05_ex2_q1",
    answer: "bedroom-bed",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/arabic/lesson05/s5.webp",
      options: [
        { id: "bathroom-bed", label: "الْحَمَّامُ", semantic: "normal" },
        { id: "kitchen-bed", label: "الْمَطْبَخُ", semantic: "normal" },
        { id: "bedroom-bed", label: "غُرْفَةُ النَّوْمِ", semantic: "normal" }
      ]
    },
    successText: "🌟 أَحْسَنْتَ! السَّرِيرُ مِنْ أَثَاثِ غُرْفَةِ النَّوْمِ.",
    retryText: "فَكِّرْ: فِي أَيِّ غُرْفَةٍ نَنَامُ؟"
  },
  {
    id: "l05_ex2_q2",
    mission: 2,
    prompt: "أَيْنَ نَضَعُ الثَّلَّاجَةَ؟",
    audioKey: "l05_ex2_q2",
    answer: "kitchen-fridge",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/arabic/lesson05/s4.webp",
      options: [
        { id: "kitchen-fridge", label: "الْمَطْبَخُ", semantic: "normal" },
        { id: "living-fridge", label: "غُرْفَةُ الْجُلُوسِ", semantic: "normal" },
        { id: "bedroom-fridge", label: "غُرْفَةُ النَّوْمِ", semantic: "normal" }
      ]
    },
    successText: "🌟 صَحِيحٌ! الثَّلَّاجَةُ مِنْ أَدَوَاتِ الْمَطْبَخِ.",
    retryText: "تَذَكَّرْ أَيْنَ نَحْفَظُ الطَّعَامَ بَارِدًا."
  },
  {
    id: "l05_ex2_q3",
    mission: 2,
    prompt: "أَيْنَ نَضَعُ الْأَرِيكَةَ؟",
    audioKey: "l05_ex2_q3",
    answer: "living-sofa",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/arabic/lesson05/s3.webp",
      options: [
        { id: "kitchen-sofa", label: "الْمَطْبَخُ", semantic: "normal" },
        { id: "living-sofa", label: "غُرْفَةُ الْجُلُوسِ", semantic: "normal" },
        { id: "bathroom-sofa", label: "الْحَمَّامُ", semantic: "normal" }
      ]
    },
    successText: "🌟 أَحْسَنْتَ! الْأَرِيكَةُ مِنْ أَثَاثِ غُرْفَةِ الْجُلُوسِ.",
    retryText: "فَكِّرْ فِي الْغُرْفَةِ الَّتِي نَجْلِسُ فِيهَا مَعَ الْعَائِلَةِ."
  },
  {
    id: "l05_ex2_q4",
    mission: 2,
    prompt: "أَيْنَ نَجِدُ حَوْضَ الِاسْتِحْمَامِ؟",
    audioKey: "l05_ex2_q4",
    answer: "bathroom-tub",
    activityData: {
      kind: "sentence-choice",
      options: [
        { id: "bedroom-tub", label: "غُرْفَةُ النَّوْمِ", semantic: "normal" },
        { id: "living-tub", label: "غُرْفَةُ الْجُلُوسِ", semantic: "normal" },
        { id: "bathroom-tub", label: "الْحَمَّامُ", semantic: "normal" }
      ]
    },
    successText: "🌟 صَحِيحٌ! حَوْضُ الِاسْتِحْمَامِ فِي الْحَمَّامِ.",
    retryText: "تَذَكَّرْ أَيْنَ نَغْتَسِلُ."
  },
  {
    id: "l05_ex3_q1",
    mission: 3,
    prompt: "رَتِّبِ الْكَلِمَاتِ، وَابْنِ الْجُمْلَةَ.",
    audioKey: "l05_ex3_q1",
    activityData: {
      kind: "word-order",
      tokens: [
        { id: "kitchen", label: "الْمَطْبَخُ", semantic: "normal" },
        { id: "this", label: "هَذَا", semantic: "normal" }
      ],
      correctOrder: ["this", "kitchen"]
    },
    successText: "🌟 أَحْسَنْتَ! هَذَا الْمَطْبَخُ.",
    retryText: "اِقْرَأِ الْكَلِمَتَيْنِ، ثُمَّ أَعِدْ تَرْتِيبَهُمَا."
  },
  {
    id: "l05_ex3_q2",
    mission: 3,
    prompt: "رَتِّبِ الْكَلِمَاتِ، وَابْنِ الْجُمْلَةَ.",
    audioKey: "l05_ex3_q2",
    activityData: {
      kind: "word-order",
      tokens: [
        { id: "sleep", label: "النَّوْمِ", semantic: "normal" },
        { id: "room", label: "غُرْفَةُ", semantic: "normal" },
        { id: "thisf", label: "هَذِهِ", semantic: "normal" }
      ],
      correctOrder: ["thisf", "room", "sleep"]
    },
    successText: "🌟 أَحْسَنْتَ! هَذِهِ غُرْفَةُ النَّوْمِ.",
    retryText: "رَتِّبِ الْكَلِمَاتِ لِتَصِفَ الْغُرْفَةَ."
  },
  {
    id: "l05_ex3_q3",
    mission: 3,
    prompt: "رَتِّبِ الْكَلِمَاتِ، وَابْنِ الْجُمْلَةَ.",
    audioKey: "l05_ex3_q3",
    activityData: {
      kind: "word-order",
      tokens: [
        { id: "living", label: "الْجُلُوسِ", semantic: "normal" },
        { id: "thisf2", label: "هَذِهِ", semantic: "normal" },
        { id: "room2", label: "غُرْفَةُ", semantic: "normal" }
      ],
      correctOrder: ["thisf2", "room2", "living"]
    },
    successText: "🌟 أَحْسَنْتَ! هَذِهِ غُرْفَةُ الْجُلُوسِ.",
    retryText: "اِقْرَأْ مِنَ الْيَمِينِ، ثُمَّ رَتِّبِ الْكَلِمَاتِ."
  },
  {
    id: "l05_ex3_q4",
    mission: 3,
    prompt: "رَتِّبِ الْكَلِمَاتِ، وَابْنِ الْجُمْلَةَ.",
    audioKey: "l05_ex3_q4",
    activityData: {
      kind: "word-order",
      tokens: [
        { id: "home", label: "مَنْزِلُنَا", semantic: "normal" },
        { id: "love", label: "أُحِبُّ", semantic: "normal" }
      ],
      correctOrder: ["love", "home"]
    },
    successText: "🌟 أَحْسَنْتَ! أُحِبُّ مَنْزِلَنَا.",
    retryText: "اِقْرَأِ الْكَلِمَتَيْنِ، ثُمَّ أَعِدْ تَرْتِيبَهُمَا."
  },
  {
    id: "l05_ex4_q1",
    mission: 4,
    prompt: "اِخْتَرِ الْجُمْلَةَ الَّتِي تَصِفُ مَنْزِلًا يَضُمُّ غُرَفًا مُخْتَلِفَةً.",
    audioKey: "l05_ex4_q1",
    answer: "home-parts",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/arabic/lesson05/s2.webp",
      options: [
        { id: "home-parts", label: "يَتَكَوَّنُ الْمَنْزِلُ مِنْ غُرَفٍ مُخْتَلِفَةٍ.", semantic: "normal" },
        { id: "school", label: "تَتَكَوَّنُ الْمَدْرَسَةُ مِنْ أَقْسَامٍ.", semantic: "normal" },
        { id: "street", label: "يَسِيرُ النَّاسُ فِي الشَّارِعِ.", semantic: "normal" }
      ]
    },
    successText: "🌟 مُمْتَازٌ! يَتَكَوَّنُ الْمَنْزِلُ مِنْ غُرَفٍ مُخْتَلِفَةٍ.",
    retryText: "فَكِّرْ فِي أَجْزَاءِ الْمَنْزِلِ."
  },
  {
    id: "l05_ex4_q2",
    mission: 4,
    prompt: "أَيُّ مَجْمُوعَةٍ تُمَثِّلُ غُرَفًا مِنَ الْمَنْزِلِ؟",
    audioKey: "l05_ex4_q2",
    answer: "rooms-set",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/arabic/lesson05/s6.webp",
      options: [
        { id: "school-set", label: "الْقِسْمُ، السَّاحَةُ، الْمَكْتَبَةُ.", semantic: "normal" },
        { id: "street-set", label: "الطَّرِيقُ، الْحَدِيقَةُ، الْمَتْجَرُ.", semantic: "normal" },
        { id: "rooms-set", label: "الْمَطْبَخُ، غُرْفَةُ النَّوْمِ، غُرْفَةُ الْجُلُوسِ، الْحَمَّامُ.", semantic: "normal" }
      ]
    },
    successText: "🌟 أَحْسَنْتَ! هَذِهِ مِنْ غُرَفِ الْمَنْزِلِ.",
    retryText: "تَذَكَّرِ الْغُرَفَ الَّتِي تَعَلَّمْتَهَا."
  },
  {
    id: "l05_ex4_q3",
    mission: 4,
    prompt: "اِخْتَرِ الْجُمْلَةَ الصَّحِيحَةَ.",
    audioKey: "l05_ex4_q3",
    answer: "correct-home",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/arabic/lesson05/s6.webp",
      options: [
        { id: "wrong-home1", label: "نَضَعُ السَّرِيرَ فِي الْمَطْبَخِ.", semantic: "normal" },
        { id: "correct-home", label: "لِكُلِّ غُرْفَةٍ فِي الْمَنْزِلِ اسْتِعْمَالٌ وَأَثَاثٌ مُنَاسِبٌ.", semantic: "normal" },
        { id: "wrong-home2", label: "نَضَعُ الثَّلَّاجَةَ فِي غُرْفَةِ النَّوْمِ.", semantic: "normal" }
      ]
    },
    successText: "🌟 صَحِيحٌ! لِكُلِّ غُرْفَةٍ اسْتِعْمَالٌ وَأَثَاثٌ مُنَاسِبٌ.",
    retryText: "ارْبِطْ كُلَّ غُرْفَةٍ بِمَا نَسْتَعْمِلُهُ فِيهَا."
  },
  {
    id: "l05_ex4_q4",
    mission: 4,
    prompt: "اِخْتَرْ مَا تَعَلَّمْتَهُ فِي دَرْسِ فِي مَنْزِلِنَا.",
    audioKey: "l05_ex4_q4",
    answer: "goal",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/arabic/lesson05/s2.webp",
      options: [
        { id: "goal", label: "أُسَمِّي غُرَفَ الْمَنْزِلِ وَأَرْبِطُهَا بِأَثَاثِهَا.", semantic: "normal" },
        { id: "numbers", label: "أَجْمَعُ الْأَعْدَادَ وَأَطْرَحُهَا.", semantic: "normal" },
        { id: "family", label: "أُسَمِّي أَفْرَادَ عَائِلَتِي فَقَطْ.", semantic: "normal" }
      ]
    },
    successText: "🌟 مُمْتَازٌ! أَصْبَحْتَ تَتَعَرَّفُ عَلَى غُرَفِ الْمَنْزِلِ وَأَثَاثِهَا.",
    retryText: "تَذَكَّرْ عُنْوَانَ الدَّرْسِ وَأَنْشِطَتَهُ."
  }
];

const missionTitles = {1:"أَكْتَشِفُ غُرَفَ الْمَنْزِلِ",2:"أَرْبِطُ الْغُرْفَةَ بِأَثَاثِهَا",3:"أَقْرَأُ وَأَبْنِي",4:"أَصِفُ مَنْزِلَنَا"};

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

export default function ArabicLesson05ExercisesV2() {
  return (
    <UnifiedLessonExercisesV2
      lessonKey="arabic-w01-u05"
      audioBase="/audio/v2/arabic/lesson05/exercises"
      questions={questions}
      missionTitles={missionTitles}
      missionCount={4}
      completionMessage="أَحْسَنْتَ يَا فَاضِلُ! أَتْمَمْتَ نَشَاطَاتِ دَرْسِ فِي مَنْزِلِنَا بِنَجَاحٍ، وَتَعَرَّفْتَ عَلَى الْمَطْبَخِ وَغُرْفَةِ النَّوْمِ وَغُرْفَةِ الْجُلُوسِ وَالْحَمَّامِ، وَرَبَطْتَ كُلَّ غُرْفَةٍ بِاسْتِعْمَالِهَا وَأَثَاثِهَا."
      nextLessonKey="islamic-w01-u06"
      nextPath="/lesson-v2/islamic/lesson06"
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
