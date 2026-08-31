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
    id: "l07_ex1_q1",
    mission: 1,
    prompt: "أَيْنَ نَجِدُ الْمِلْعَقَةَ وَالْقِدْرَ؟",
    audioKey: "l07_ex1_q1",
    answer: "kitchen",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/arabic/lesson05/s4.webp",
      options: [
        { id: "kitchen", label: "فِي الْمَطْبَخِ.", semantic: "normal" },
        { id: "bedroom", label: "فِي غُرْفَةِ النَّوْمِ.", semantic: "normal" },
        { id: "bathroom", label: "فِي الْحَمَّامِ.", semantic: "normal" }
      ]
    },
    successText: "🌟 أَحْسَنْتَ! الْمِلْعَقَةُ وَالْقِدْرُ مِنْ أَدَوَاتِ الْمَطْبَخِ.",
    retryText: "فَكِّرْ: أَيْنَ نُعِدُّ الطَّعَامَ؟"
  },
  {
    id: "l07_ex1_q2",
    mission: 1,
    prompt: "أَيْنَ نَجِدُ الصَّابُونَ وَحَوْضَ الِاسْتِحْمَامِ؟",
    audioKey: "l07_ex1_q2",
    answer: "bathroom",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/arabic/lesson05/s4.webp",
      options: [
        { id: "living", label: "فِي غُرْفَةِ الْجُلُوسِ.", semantic: "normal" },
        { id: "bathroom", label: "فِي الْحَمَّامِ.", semantic: "normal" },
        { id: "kitchen2", label: "فِي الْمَطْبَخِ.", semantic: "normal" }
      ]
    },
    successText: "🌟 صَحِيحٌ! الصَّابُونُ وَحَوْضُ الِاسْتِحْمَامِ فِي الْحَمَّامِ.",
    retryText: "تَذَكَّرِ الْمَكَانَ الَّذِي نَغْتَسِلُ فِيهِ."
  },
  {
    id: "l07_ex1_q3",
    mission: 1,
    prompt: "أَيْنَ نَجِدُ السَّرِيرَ وَالْخِزَانَةَ؟",
    audioKey: "l07_ex1_q3",
    answer: "bedroom",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/arabic/lesson05/s5.webp",
      options: [
        { id: "kitchen3", label: "فِي الْمَطْبَخِ.", semantic: "normal" },
        { id: "living2", label: "فِي غُرْفَةِ الْجُلُوسِ.", semantic: "normal" },
        { id: "bedroom", label: "فِي غُرْفَةِ النَّوْمِ.", semantic: "normal" }
      ]
    },
    successText: "🌟 أَحْسَنْتَ! السَّرِيرُ وَالْخِزَانَةُ فِي غُرْفَةِ النَّوْمِ.",
    retryText: "فَكِّرْ فِي الْغُرْفَةِ الَّتِي نَنَامُ فِيهَا."
  },
  {
    id: "l07_ex1_q4",
    mission: 1,
    prompt: "أَيْنَ نَجِدُ الْأَرِيكَةَ؟",
    audioKey: "l07_ex1_q4",
    answer: "living",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/arabic/lesson05/s3.webp",
      options: [
        { id: "bathroom2", label: "فِي الْحَمَّامِ.", semantic: "normal" },
        { id: "living", label: "فِي غُرْفَةِ الْجُلُوسِ.", semantic: "normal" },
        { id: "bedroom2", label: "فِي غُرْفَةِ النَّوْمِ.", semantic: "normal" }
      ]
    },
    successText: "🌟 صَحِيحٌ! الْأَرِيكَةُ مِنْ أَثَاثِ غُرْفَةِ الْجُلُوسِ.",
    retryText: "تَذَكَّرْ أَيْنَ تَجْتَمِعُ الْعَائِلَةُ لِلْجُلُوسِ."
  },
  {
    id: "l07_ex2_q1",
    mission: 2,
    prompt: "أَيُّ شَيْءٍ لَا يَنْتَمِي إِلَى أَدَوَاتِ الْمَطْبَخِ؟",
    audioKey: "l07_ex2_q1",
    answer: "book",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/arabic/lesson05/s4.webp",
      options: [
        { id: "spoon", label: "مِلْعَقَةٌ", semantic: "normal" },
        { id: "plate", label: "صَحْنٌ", semantic: "normal" },
        { id: "book", label: "كِتَابٌ", semantic: "normal" }
      ]
    },
    successText: "🌟 أَحْسَنْتَ! الْكِتَابُ لَيْسَ مِنْ أَدَوَاتِ الْمَطْبَخِ.",
    retryText: "تَذَكَّرْ مَا نَسْتَعْمِلُهُ لِلْأَكْلِ وَإِعْدَادِ الطَّعَامِ."
  },
  {
    id: "l07_ex2_q2",
    mission: 2,
    prompt: "أَيُّ شَيْءٍ لَا يَنْتَمِي إِلَى أَدَوَاتِ الْحَمَّامِ؟",
    audioKey: "l07_ex2_q2",
    answer: "ball",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/arabic/lesson05/s4.webp",
      options: [
        { id: "ball", label: "كُرَةٌ", semantic: "normal" },
        { id: "soap", label: "صَابُونٌ", semantic: "normal" },
        { id: "shower", label: "مِرَشٌّ", semantic: "normal" }
      ]
    },
    successText: "🌟 صَحِيحٌ! الْكُرَةُ لَيْسَتْ مِنْ أَدَوَاتِ الْحَمَّامِ.",
    retryText: "اِخْتَرِ الشَّيْءَ الَّذِي نَلْعَبُ بِهِ وَلَا نَسْتَعْمِلُهُ فِي الْحَمَّامِ."
  },
  {
    id: "l07_ex2_q3",
    mission: 2,
    prompt: "أَيُّ شَيْءٍ لَا يَنْتَمِي إِلَى غُرْفَةِ النَّوْمِ؟",
    audioKey: "l07_ex2_q3",
    answer: "fridge",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/arabic/lesson05/s5.webp",
      options: [
        { id: "wardrobe", label: "خِزَانَةٌ", semantic: "normal" },
        { id: "fridge", label: "ثَلَّاجَةٌ", semantic: "normal" },
        { id: "bed", label: "سَرِيرٌ", semantic: "normal" }
      ]
    },
    successText: "🌟 أَحْسَنْتَ! الثَّلَّاجَةُ مَكَانُهَا الْمَطْبَخُ.",
    retryText: "فَكِّرْ فِي الْجِهَازِ الَّذِي نَحْفَظُ فِيهِ الطَّعَامَ."
  },
  {
    id: "l07_ex2_q4",
    mission: 2,
    prompt: "أَيُّ شَيْءٍ لَا يَنْتَمِي إِلَى غُرْفَةِ الْجُلُوسِ؟",
    audioKey: "l07_ex2_q4",
    answer: "bathtub",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/arabic/lesson05/s3.webp",
      options: [
        { id: "sofa", label: "أَرِيكَةٌ", semantic: "normal" },
        { id: "table", label: "طَاوِلَةٌ", semantic: "normal" },
        { id: "bathtub", label: "حَوْضُ اسْتِحْمَامٍ", semantic: "normal" }
      ]
    },
    successText: "🌟 مُمْتَازٌ! حَوْضُ الِاسْتِحْمَامِ مَكَانُهُ الْحَمَّامُ.",
    retryText: "اِخْتَرِ الشَّيْءَ الَّذِي نَسْتَعْمِلُهُ لِلِاغْتِسَالِ."
  },
  {
    id: "l07_ex3_q1",
    mission: 3,
    prompt: "رَتِّبِ الْكَلِمَاتِ، وَابْنِ الْجُمْلَةَ.",
    audioKey: "l07_ex3_q1",
    activityData: {
      kind: "word-order",
      tokens: [
        { id: "kitchen", label: "الْمَطْبَخِ", semantic: "normal" },
        { id: "in", label: "فِي", semantic: "normal" },
        { id: "spoon", label: "الْمِلْعَقَةُ", semantic: "normal" }
      ],
      correctOrder: ["spoon", "in", "kitchen"]
    },
    successText: "🌟 أَحْسَنْتَ! الْمِلْعَقَةُ فِي الْمَطْبَخِ.",
    retryText: "اِبْدَأْ بِاسْمِ الشَّيْءِ، ثُمَّ حَدِّدْ مَكَانَهُ."
  },
  {
    id: "l07_ex3_q2",
    mission: 3,
    prompt: "رَتِّبِ الْكَلِمَاتِ، وَابْنِ الْجُمْلَةَ.",
    audioKey: "l07_ex3_q2",
    activityData: {
      kind: "word-order",
      tokens: [
        { id: "bathroom", label: "الْحَمَّامِ", semantic: "normal" },
        { id: "in2", label: "فِي", semantic: "normal" },
        { id: "soap", label: "الصَّابُونُ", semantic: "normal" }
      ],
      correctOrder: ["soap", "in2", "bathroom"]
    },
    successText: "🌟 أَحْسَنْتَ! الصَّابُونُ فِي الْحَمَّامِ.",
    retryText: "اِقْرَأِ الْكَلِمَاتِ وَارْبِطِ الشَّيْءَ بِمَكَانِهِ."
  },
  {
    id: "l07_ex3_q3",
    mission: 3,
    prompt: "رَتِّبِ الْكَلِمَاتِ، وَابْنِ الْجُمْلَةَ.",
    audioKey: "l07_ex3_q3",
    activityData: {
      kind: "word-order",
      tokens: [
        { id: "together", label: "مُجْتَمِعَةٌ", semantic: "normal" },
        { id: "family", label: "الْعَائِلَةُ", semantic: "normal" }
      ],
      correctOrder: ["family", "together"]
    },
    successText: "🌟 أَحْسَنْتَ! الْعَائِلَةُ مُجْتَمِعَةٌ.",
    retryText: "اِبْدَأْ بِـ«الْعَائِلَةُ»."
  },
  {
    id: "l07_ex3_q4",
    mission: 3,
    prompt: "رَتِّبِ الْكَلِمَاتِ، وَابْنِ الْجُمْلَةَ.",
    audioKey: "l07_ex3_q4",
    activityData: {
      kind: "word-order",
      tokens: [
        { id: "home", label: "مَنْزِلَنَا", semantic: "normal" },
        { id: "arrange", label: "نُرَتِّبُ", semantic: "normal" }
      ],
      correctOrder: ["arrange", "home"]
    },
    successText: "🌟 أَحْسَنْتَ! نُرَتِّبُ مَنْزِلَنَا.",
    retryText: "اِبْدَأْ بِالْفِعْلِ «نُرَتِّبُ»."
  },
  {
    id: "l07_ex4_q1",
    mission: 4,
    prompt: "الْعَائِلَةُ مُجْتَمِعَةٌ فِي الْمَنْزِلِ. أَيْنَ نَجْلِسُ مَعًا؟",
    audioKey: "l07_ex4_q1",
    answer: "family-living",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/arabic/lesson05/s3.webp",
      options: [
        { id: "family-living", label: "فِي غُرْفَةِ الْجُلُوسِ.", semantic: "normal" },
        { id: "family-bath", label: "فِي الْحَمَّامِ.", semantic: "normal" },
        { id: "family-bed", label: "فِي غُرْفَةِ النَّوْمِ لِلنَّوْمِ جَمِيعًا.", semantic: "normal" }
      ]
    },
    successText: "🌟 أَحْسَنْتَ! نَجْلِسُ مَعًا فِي غُرْفَةِ الْجُلُوسِ.",
    retryText: "تَذَكَّرْ مَكَانَ الْأَرِيكَةِ وَالْجُلُوسِ."
  },
  {
    id: "l07_ex4_q2",
    mission: 4,
    prompt: "نُرِيدُ إِعْدَادَ الطَّعَامِ لِلْعَائِلَةِ. أَيُّ مَجْمُوعَةٍ نَحْتَاجُهَا؟",
    audioKey: "l07_ex4_q2",
    answer: "kitchen-set",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/arabic/lesson05/s4.webp",
      options: [
        { id: "school-set", label: "قَلَمٌ، دَفْتَرٌ، مِمْحَاةٌ.", semantic: "normal" },
        { id: "bath-set", label: "صَابُونٌ، مِرَشٌّ، حَوْضٌ.", semantic: "normal" },
        { id: "kitchen-set", label: "قِدْرٌ، مِلْعَقَةٌ، صَحْنٌ.", semantic: "normal" }
      ]
    },
    successText: "🌟 صَحِيحٌ! هَذِهِ أَدَوَاتٌ نَسْتَعْمِلُهَا فِي الْمَطْبَخِ.",
    retryText: "اِخْتَرِ الْأَدَوَاتِ الَّتِي نَسْتَعْمِلُهَا لِإِعْدَادِ الطَّعَامِ."
  },
  {
    id: "l07_ex4_q3",
    mission: 4,
    prompt: "اِخْتَرِ السُّلُوكَ الصَّحِيحَ فِي الْمَنْزِلِ.",
    audioKey: "l07_ex4_q3",
    answer: "order",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/arabic/lesson07/s7.webp",
      options: [
        { id: "mix", label: "نَضَعُ كُلَّ الْأَدَوَاتِ فِي أَيِّ غُرْفَةٍ.", semantic: "normal" },
        { id: "order", label: "نَضَعُ كُلَّ شَيْءٍ فِي مَكَانِهِ الْمُنَاسِبِ.", semantic: "normal" },
        { id: "throw", label: "نَتْرُكُ الْأَدَوَاتِ مُبَعْثَرَةً.", semantic: "normal" }
      ]
    },
    successText: "🌟 مُمْتَازٌ! نَضَعُ كُلَّ شَيْءٍ فِي مَكَانِهِ الْمُنَاسِبِ.",
    retryText: "فَكِّرْ فِي تَرْتِيبِ الْمَنْزِلِ وَاسْتِعْمَالِ كُلِّ غُرْفَةٍ."
  },
  {
    id: "l07_ex4_q4",
    mission: 4,
    prompt: "اِخْتَرْ مَا تَعَلَّمْتَهُ فِي دَرْسِ الْعَائِلَةُ مُجْتَمِعَةٌ.",
    audioKey: "l07_ex4_q4",
    answer: "goal",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/arabic/lesson07/s7.webp",
      options: [
        { id: "goal", label: "أُمَيِّزُ أَدَوَاتِ الْمَنْزِلِ وَأَرْبِطُ كُلَّ شَيْءٍ بِمَكَانِهِ.", semantic: "normal" },
        { id: "numbers", label: "أَجْمَعُ الْأَعْدَادَ.", semantic: "normal" },
        { id: "permission", label: "أَتَعَلَّمُ الِاسْتِئْذَانَ فَقَطْ.", semantic: "normal" }
      ]
    },
    successText: "🌟 أَحْسَنْتَ! أَصْبَحْتَ أَكْثَرَ قُدْرَةً عَلَى تَنْظِيمِ مَنْزِلِكَ وَتَمْيِيزِ أَدَوَاتِهِ.",
    retryText: "تَذَكَّرْ أَنْشِطَةَ الْمَطْبَخِ وَالْحَمَّامِ وَأَثَاثَ الْغُرَفِ."
  }
];

const missionTitles = {1:"أُصَنِّفُ أَدَوَاتِ الْمَنْزِلِ",2:"أَكْتَشِفُ الدَّخِيلَ",3:"أَقْرَأُ وَأَبْنِي",4:"أُطَبِّقُ: الْعَائِلَةُ مُجْتَمِعَةٌ"};

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

export default function ArabicLesson07ExercisesV2() {
  return (
    <UnifiedLessonExercisesV2
      lessonKey="arabic-w01-u07"
      audioBase="/audio/v2/arabic/lesson07/exercises"
      questions={questions}
      missionTitles={missionTitles}
      missionCount={4}
      completionMessage="أَحْسَنْتَ يَا فَاضِلُ! أَتْمَمْتَ نَشَاطَاتِ دَرْسِ الْعَائِلَةُ مُجْتَمِعَةٌ بِنَجَاحٍ، وَتَعَلَّمْتَ أَنْ تُمَيِّزَ أَدَوَاتِ الْمَطْبَخِ وَالْحَمَّامِ وَأَثَاثَ الْغُرَفِ، وَأَنْ تَضَعَ كُلَّ شَيْءٍ فِي مَكَانِهِ الْمُنَاسِبِ."
      nextLessonKey="islamic-w01-u08"
      nextPath="/lesson-v2/islamic/lesson08"
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
