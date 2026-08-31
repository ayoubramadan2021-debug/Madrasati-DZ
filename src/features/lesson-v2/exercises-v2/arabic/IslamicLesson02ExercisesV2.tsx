import UnifiedLessonExercisesV2, {
  type UnifiedLessonExerciseRenderContextV2,
} from "../UnifiedLessonExercisesV2";

import ArabicLanguageActivityKitV1, {
  type ArabicCharacterV1,
  type ArabicExerciseQuestionV1,
} from "./ArabicLanguageActivityKitV1";

const P =
  "/lessons/v2/islamic/lesson02/activity-characters";

const SCENE =
  "/lessons/v2/islamic/lesson02";

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
    id: "l02_ex1_q1",
    mission: 1,
    prompt: "اِخْتَرِ السُّلُوكَ الَّذِي يَدُلُّ عَلَى طَاعَةِ الْوَالِدَيْنِ.",
    audioKey: "l02_ex1_q1",
    answer: "obey",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/islamic/lesson02/s5.webp",
      options: [
        { id: "obey", label: "أَسْتَجِيبُ لِطَلَبِ وَالِدَيَّ.", semantic: "normal" },
        { id: "ignore", label: "أَتَجَاهَلُ طَلَبَهُمَا.", semantic: "normal" },
        { id: "shout", label: "أَرْفَعُ صَوْتِي عَلَيْهِمَا.", semantic: "normal" }
      ]
    },
    successText: "🌟 أَحْسَنْتَ! أَسْتَجِيبُ لِطَلَبِ وَالِدَيَّ بِأَدَبٍ.",
    retryText: "فَكِّرْ فِي مَعْنَى طَاعَةِ الْوَالِدَيْنِ، ثُمَّ حَاوِلْ مُجَدَّدًا."
  },
  {
    id: "l02_ex1_q2",
    mission: 1,
    prompt: "اِخْتَرِ الْجُمْلَةَ الَّتِي تَدُلُّ عَلَى احْتِرَامِ الْوَالِدَيْنِ.",
    audioKey: "l02_ex1_q2",
    answer: "respect",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/islamic/lesson02/s5.webp",
      options: [
        { id: "interrupt", label: "أُقَاطِعُ كَلَامَهُمَا.", semantic: "normal" },
        { id: "respect", label: "أَتَحَدَّثُ مَعَهُمَا بِأَدَبٍ وَاحْتِرَامٍ.", semantic: "normal" },
        { id: "turn", label: "أُدِيرُ ظَهْرِي لَهُمَا.", semantic: "normal" }
      ]
    },
    successText: "🌟 أَحْسَنْتَ! أَتَحَدَّثُ مَعَ وَالِدَيَّ بِأَدَبٍ وَاحْتِرَامٍ.",
    retryText: "اِخْتَرِ الْجُمْلَةَ الَّتِي تَدُلُّ عَلَى الِاحْتِرَامِ."
  },
  {
    id: "l02_ex1_q3",
    mission: 1,
    prompt: "اِخْتَرْ لِمَاذَا أُحْسِنُ إِلَى وَالِدَيَّ.",
    audioKey: "l02_ex1_q3",
    answer: "care",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/islamic/lesson02/s4.webp",
      options: [
        { id: "play", label: "لِأَنَّهُمَا يَتْرُكَانِنِي أَلْعَبُ دَائِمًا.", semantic: "normal" },
        { id: "gifts", label: "لِأَنَّهُمَا يُقَدِّمَانِ لِي الْهَدَايَا فَقَطْ.", semantic: "normal" },
        { id: "care", label: "لِأَنَّهُمَا يُرَبِّيَانِنِي وَيَتْعَبَانِ مِنْ أَجْلِي.", semantic: "normal" }
      ]
    },
    successText: "🌟 أَحْسَنْتَ! وَالِدَايَ يُرَبِّيَانِنِي وَيَتْعَبَانِ مِنْ أَجْلِي.",
    retryText: "تَذَكَّرْ مَا يَفْعَلُهُ وَالِدَاكَ مِنْ أَجْلِكَ."
  },
  {
    id: "l02_ex1_q4",
    mission: 1,
    prompt: "اِخْتَرْ كَيْفَ أُجِيبُ أَبِي أَوْ أُمِّي عِنْدَمَا يُنَادِيَانِنِي.",
    audioKey: "l02_ex1_q4",
    answer: "polite",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/islamic/lesson02/s5.webp",
      options: [
        { id: "ignore2", label: "لَا أُجِيبُ.", semantic: "normal" },
        { id: "polite", label: "أُجِيبُ بِأَدَبٍ وَهُدُوءٍ.", semantic: "normal" },
        { id: "angry", label: "أُجِيبُ بِغَضَبٍ.", semantic: "normal" }
      ]
    },
    successText: "🌟 أَحْسَنْتَ! أُجِيبُ وَالِدَيَّ بِأَدَبٍ وَهُدُوءٍ.",
    retryText: "فَكِّرْ فِي الْكَلَامِ الْمُؤَدَّبِ مَعَ الْوَالِدَيْنِ."
  },
  {
    id: "l02_ex2_q1",
    mission: 2,
    prompt: "اِخْتَرِ التَّصَرُّفَ الصَّحِيحَ مَعَ أُمِّي.",
    audioKey: "l02_ex2_q1",
    answer: "mother-good",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/islamic/lesson02/s5.webp",
      options: [
        { id: "mother-bad1", label: "أَرْفَعُ صَوْتِي عَلَيْهَا.", semantic: "normal" },
        { id: "mother-bad2", label: "أَتَجَاهَلُ كَلَامَهَا.", semantic: "normal" },
        { id: "mother-good", label: "أَسْتَمِعُ إِلَيْهَا وَأَتَكَلَّمُ بِأَدَبٍ.", semantic: "normal" }
      ]
    },
    successText: "🌟 صَحِيحٌ! أَسْتَمِعُ إِلَى أُمِّي وَأَتَكَلَّمُ مَعَهَا بِأَدَبٍ.",
    retryText: "مَيِّزِ السُّلُوكَ الْمُؤَدَّبَ مَعَ الْأُمِّ."
  },
  {
    id: "l02_ex2_q2",
    mission: 2,
    prompt: "اِخْتَرِ التَّصَرُّفَ الصَّحِيحَ مَعَ أَبِي.",
    audioKey: "l02_ex2_q2",
    answer: "father-good",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/islamic/lesson02/s5.webp",
      options: [
        { id: "father-good", label: "أَسْتَجِيبُ لِطَلَبِ أَبِي بِاحْتِرَامٍ.", semantic: "normal" },
        { id: "father-bad1", label: "أُقَاطِعُ كَلَامَ أَبِي.", semantic: "normal" },
        { id: "father-bad2", label: "أَرْفُضُ كَلَامَهُ دُونَ أَدَبٍ.", semantic: "normal" }
      ]
    },
    successText: "🌟 صَحِيحٌ! أَسْتَجِيبُ لِطَلَبِ أَبِي بِاحْتِرَامٍ.",
    retryText: "مَيِّزِ السُّلُوكَ الَّذِي يَدُلُّ عَلَى احْتِرَامِ الْأَبِ."
  },
  {
    id: "l02_ex2_q3",
    mission: 2,
    prompt: "اِخْتَرِ الْجُمْلَةَ الصَّحِيحَةَ عَنْ وَالِدَيَّ.",
    audioKey: "l02_ex2_q3",
    answer: "parents-care",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/islamic/lesson02/s4.webp",
      options: [
        { id: "parents-wrong1", label: "وَالِدَايَ لَا يَهْتَمَّانِ بِي.", semantic: "normal" },
        { id: "parents-care", label: "وَالِدَايَ يُرَبِّيَانِنِي وَيَتْعَبَانِ مِنْ أَجْلِي.", semantic: "normal" },
        { id: "parents-wrong2", label: "وَالِدَايَ لَا يُسَاعِدَانِنِي.", semantic: "normal" }
      ]
    },
    successText: "🌟 أَحْسَنْتَ! أَعْرِفُ فَضْلَ وَالِدَيَّ عَلَيَّ.",
    retryText: "تَذَكَّرْ مَا تَعَلَّمْتَهُ عَنْ فَضْلِ الْوَالِدَيْنِ."
  },
  {
    id: "l02_ex2_q4",
    mission: 2,
    prompt: "اِخْتَرِ الدُّعَاءَ الَّذِي تَعَلَّمْتَهُ لِلْوَالِدَيْنِ.",
    audioKey: "l02_ex2_q4",
    answer: "dua",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/islamic/lesson02/s6.webp",
      options: [
        { id: "dua-wrong1", label: "رَبِّ زِدْنِي عِلْمًا.", semantic: "normal" },
        { id: "dua-wrong2", label: "رَبِّ اشْرَحْ لِي صَدْرِي.", semantic: "normal" },
        { id: "dua", label: "وَقُلْ رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا.", semantic: "normal" }
      ]
    },
    successText: "🌟 أَحْسَنْتَ! هَذَا هُوَ الدُّعَاءُ الَّذِي تَعَلَّمْتَهُ لِلْوَالِدَيْنِ.",
    retryText: "تَذَكَّرِ الْآيَةَ الَّتِي تَعَلَّمْتَهَا فِي الدَّرْسِ."
  },
  {
    id: "l02_ex3_q1",
    mission: 3,
    prompt: "رَتِّبِ الْكَلِمَاتِ، وَابْنِ الْجُمْلَةَ.",
    audioKey: "l02_ex3_q1",
    activityData: {
      kind: "word-order",
      tokens: [
        { id: "parents", label: "وَالِدَيَّ", semantic: "normal" },
        { id: "obey", label: "أُطِيعُ", semantic: "normal" }
      ],
      correctOrder: ["obey", "parents"]
    },
    successText: "🌟 أَحْسَنْتَ! أُطِيعُ وَالِدَيَّ.",
    retryText: "اِقْرَأِ الْكَلِمَتَيْنِ، ثُمَّ أَعِدْ تَرْتِيبَهُمَا."
  },
  {
    id: "l02_ex3_q2",
    mission: 3,
    prompt: "رَتِّبِ الْكَلِمَاتِ، وَابْنِ الْجُمْلَةَ.",
    audioKey: "l02_ex3_q2",
    activityData: {
      kind: "word-order",
      tokens: [
        { id: "father", label: "أَبِي", semantic: "normal" },
        { id: "respect", label: "أَحْتَرِمُ", semantic: "normal" }
      ],
      correctOrder: ["respect", "father"]
    },
    successText: "🌟 أَحْسَنْتَ! أَحْتَرِمُ أَبِي.",
    retryText: "اِقْرَأِ الْكَلِمَتَيْنِ، ثُمَّ أَعِدْ تَرْتِيبَهُمَا."
  },
  {
    id: "l02_ex3_q3",
    mission: 3,
    prompt: "رَتِّبِ الْكَلِمَاتِ، وَابْنِ الْجُمْلَةَ.",
    audioKey: "l02_ex3_q3",
    activityData: {
      kind: "word-order",
      tokens: [
        { id: "mother", label: "أُمِّي", semantic: "normal" },
        { id: "with", label: "مَعَ", semantic: "normal" },
        { id: "politely", label: "بِأَدَبٍ", semantic: "normal" },
        { id: "speak", label: "أَتَكَلَّمُ", semantic: "normal" }
      ],
      correctOrder: ["speak", "with", "mother", "politely"]
    },
    successText: "🌟 أَحْسَنْتَ! أَتَكَلَّمُ مَعَ أُمِّي بِأَدَبٍ.",
    retryText: "اِقْرَأِ الْكَلِمَاتِ، ثُمَّ أَعِدْ تَرْتِيبَهَا."
  },
  {
    id: "l02_ex3_q4",
    mission: 3,
    prompt: "رَتِّبْ كَلِمَاتِ الدُّعَاءِ كَمَا تَعَلَّمْتَهَا.",
    audioKey: "l02_ex3_q4",
    activityData: {
      kind: "word-order",
      tokens: [
        { id: "small", label: "صَغِيرًا", semantic: "normal" },
        { id: "mercy", label: "ارْحَمْهُمَا", semantic: "normal" },
        { id: "as", label: "كَمَا", semantic: "normal" },
        { id: "say", label: "وَقُلْ", semantic: "normal" },
        { id: "raised", label: "رَبَّيَانِي", semantic: "normal" },
        { id: "lord", label: "رَبِّ", semantic: "normal" }
      ],
      correctOrder: ["say", "lord", "mercy", "as", "raised", "small"]
    },
    successText: "🌟 أَحْسَنْتَ! وَقُلْ رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا.",
    retryText: "أَعِدْ تَرْتِيبَ كَلِمَاتِ الدُّعَاءِ بِهُدُوءٍ."
  },
  {
    id: "l02_ex4_q1",
    mission: 4,
    prompt: "اُنْظُرْ إِلَى الصُّورَةِ، ثُمَّ اخْتَرِ الْجُمْلَةَ الْمُنَاسِبَةَ.",
    audioKey: "l02_ex4_q1",
    answer: "care-scene",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/islamic/lesson02/s4.webp",
      options: [
        { id: "care-scene", label: "وَالِدَايَ يَعْتَنِيَانِ بِي وَيَتْعَبَانِ مِنْ أَجْلِي.", semantic: "normal" },
        { id: "care-wrong1", label: "أَنَا لَا أَحْتَاجُ إِلَى وَالِدَيَّ.", semantic: "normal" },
        { id: "care-wrong2", label: "وَالِدَايَ لَا يَهْتَمَّانِ بِي.", semantic: "normal" }
      ]
    },
    successText: "🌟 أَحْسَنْتَ! أَعْرِفُ فَضْلَ وَالِدَيَّ عَلَيَّ.",
    retryText: "اُنْظُرْ إِلَى الصُّورَةِ وَتَذَكَّرْ فَضْلَ الْوَالِدَيْنِ."
  },
  {
    id: "l02_ex4_q2",
    mission: 4,
    prompt: "اُنْظُرْ إِلَى الصُّورَةِ، ثُمَّ اخْتَرِ السُّلُوكَ الْمُنَاسِبَ.",
    audioKey: "l02_ex4_q2",
    answer: "respect-scene",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/islamic/lesson02/s5.webp",
      options: [
        { id: "respect-wrong1", label: "أُقَاطِعُ وَالِدَيَّ.", semantic: "normal" },
        { id: "respect-wrong2", label: "أَرْفَعُ صَوْتِي عَلَيْهِمَا.", semantic: "normal" },
        { id: "respect-scene", label: "أَتَحَدَّثُ مَعَ وَالِدَيَّ بِأَدَبٍ.", semantic: "normal" }
      ]
    },
    successText: "🌟 أَحْسَنْتَ! أَتَحَدَّثُ مَعَ وَالِدَيَّ بِأَدَبٍ.",
    retryText: "اِخْتَرِ السُّلُوكَ الَّذِي يَدُلُّ عَلَى الِاحْتِرَامِ."
  },
  {
    id: "l02_ex4_q3",
    mission: 4,
    prompt: "طَلَبَ مِنِّي وَالِدَايَ أَمْرًا مُنَاسِبًا. اِخْتَرْ مَاذَا أَفْعَلُ.",
    audioKey: "l02_ex4_q3",
    answer: "respond",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/islamic/lesson02/s5.webp",
      options: [
        { id: "reject-request", label: "أَرْفُضُ دُونَ سَبَبٍ.", semantic: "normal" },
        { id: "respond", label: "أَسْتَجِيبُ لَهُمَا بِأَدَبٍ.", semantic: "normal" },
        { id: "ignore-request", label: "أَتَجَاهَلُهُمَا.", semantic: "normal" }
      ]
    },
    successText: "🌟 أَحْسَنْتَ! أَسْتَجِيبُ لِوَالِدَيَّ بِأَدَبٍ.",
    retryText: "تَذَكَّرْ مَعْنَى طَاعَةِ الْوَالِدَيْنِ."
  },
  {
    id: "l02_ex4_q4",
    mission: 4,
    prompt: "أَكْمِلِ الدُّعَاءَ الَّذِي تَعَلَّمْتَهُ: وَقُلْ رَبِّ ارْحَمْهُمَا...",
    audioKey: "l02_ex4_q4",
    answer: "dua-end",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/islamic/lesson02/s6.webp",
      options: [
        { id: "dua-end", label: "كَمَا رَبَّيَانِي صَغِيرًا.", semantic: "normal" },
        { id: "dua-end-wrong1", label: "وَاغْفِرْ لِي ذَنْبِي.", semantic: "normal" },
        { id: "dua-end-wrong2", label: "وَزِدْنِي عِلْمًا.", semantic: "normal" }
      ]
    },
    successText: "🌟 مُمْتَازٌ! كَمَا رَبَّيَانِي صَغِيرًا.",
    retryText: "تَذَكَّرْ آخِرَ كَلِمَاتِ الدُّعَاءِ."
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

export default function IslamicLesson02ExercisesV2() {
  return (
    <UnifiedLessonExercisesV2
      lessonKey="islamic-w01-u02"
      audioBase="/audio/v2/islamic/lesson02/exercises"
      questions={questions}
      missionTitles={missionTitles}
      missionCount={4}
      completionMessage="أَحْسَنْتَ يَا فَاضِلُ! أَتْمَمْتَ نَشَاطَاتِ دَرْسِ أُطِيعُ وَالِدَيَّ بِنَجَاحٍ، وَتَعَلَّمْتَ أَنْ تَسْتَمِعَ إِلَى وَالِدَيْكَ، وَتُحْسِنَ التَّعَامُلَ مَعَهُمَا، وَتُسَاعِدَهُمَا."
      nextLessonKey="arabic-w01-u03"
      nextPath="/lesson-v2/arabic/lesson03"
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
