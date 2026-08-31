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
    id: "l04_ex1_q1",
    mission: 1,
    prompt: "اِخْتَرِ اسْمَ السُّورَةِ الَّتِي تَعَلَّمْتَهَا.",
    audioKey: "l04_ex1_q1",
    answer: "fatiha",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/islamic/lesson04/s4.webp",
      options: [
        { id: "fatiha", label: "سُورَةُ الْفَاتِحَةِ", semantic: "normal" },
        { id: "nas", label: "سُورَةُ النَّاسِ", semantic: "normal" },
        { id: "falaq", label: "سُورَةُ الْفَلَقِ", semantic: "normal" }
      ]
    },
    successText: "🌟 أَحْسَنْتَ! هَذِهِ سُورَةُ الْفَاتِحَةِ.",
    retryText: "تَذَكَّرْ عُنْوَانَ الدَّرْسِ، ثُمَّ حَاوِلْ مُجَدَّدًا."
  },
  {
    id: "l04_ex1_q2",
    mission: 1,
    prompt: "اِخْتَرْ بِمَ تَبْدَأُ سُورَةُ الْفَاتِحَةِ.",
    audioKey: "l04_ex1_q2",
    answer: "basmala",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/islamic/lesson04/s2.webp",
      options: [
        { id: "wrong1", label: "قُلْ هُوَ اللَّهُ أَحَدٌ", semantic: "normal" },
        { id: "basmala", label: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", semantic: "normal" },
        { id: "wrong2", label: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ", semantic: "normal" }
      ]
    },
    successText: "🌟 صَحِيحٌ! نَبْدَأُ بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ.",
    retryText: "تَذَكَّرْ أَوَّلَ مَا قَرَأْتَهُ فِي السُّورَةِ."
  },
  {
    id: "l04_ex1_q3",
    mission: 1,
    prompt: "اِخْتَرِ الْآيَةَ الَّتِي فِيهَا الْحَمْدُ لِلَّهِ.",
    audioKey: "l04_ex1_q3",
    answer: "hamd",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/islamic/lesson04/s2.webp",
      options: [
        { id: "wrong3", label: "مَالِكِ يَوْمِ الدِّينِ", semantic: "normal" },
        { id: "wrong4", label: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ", semantic: "normal" },
        { id: "hamd", label: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", semantic: "normal" }
      ]
    },
    successText: "🌟 أَحْسَنْتَ! الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ.",
    retryText: "ابْحَثْ عَنِ الْآيَةِ الَّتِي تَبْدَأُ بِالْحَمْدِ."
  },
  {
    id: "l04_ex1_q4",
    mission: 1,
    prompt: "اِخْتَرِ الْآيَةَ الَّتِي نَسْأَلُ فِيهَا اللَّهَ الْهِدَايَةَ.",
    audioKey: "l04_ex1_q4",
    answer: "guide",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/islamic/lesson04/s2.webp",
      options: [
        { id: "wrong5", label: "الرَّحْمَٰنِ الرَّحِيمِ", semantic: "normal" },
        { id: "guide", label: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ", semantic: "normal" },
        { id: "wrong6", label: "مَالِكِ يَوْمِ الدِّينِ", semantic: "normal" }
      ]
    },
    successText: "🌟 أَحْسَنْتَ! اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ.",
    retryText: "تَذَكَّرِ الْآيَةَ الَّتِي نَطْلُبُ فِيهَا الْهِدَايَةَ."
  },
  {
    id: "l04_ex2_q1",
    mission: 2,
    prompt: "مَا الَّذِي يَأْتِي بَعْدَ: الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ؟",
    audioKey: "l04_ex2_q1",
    answer: "rahman",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/islamic/lesson04/s2.webp",
      options: [
        { id: "wrong7", label: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", semantic: "normal" },
        { id: "wrong8", label: "مَالِكِ يَوْمِ الدِّينِ", semantic: "normal" },
        { id: "rahman", label: "الرَّحْمَٰنِ الرَّحِيمِ", semantic: "normal" }
      ]
    },
    successText: "🌟 صَحِيحٌ! الرَّحْمَٰنِ الرَّحِيمِ.",
    retryText: "رَاجِعْ تَرْتِيبَ آيَاتِ السُّورَةِ."
  },
  {
    id: "l04_ex2_q2",
    mission: 2,
    prompt: "مَا الَّذِي يَأْتِي بَعْدَ: الرَّحْمَٰنِ الرَّحِيمِ؟",
    audioKey: "l04_ex2_q2",
    answer: "malik",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/islamic/lesson04/s2.webp",
      options: [
        { id: "malik", label: "مَالِكِ يَوْمِ الدِّينِ", semantic: "normal" },
        { id: "wrong9", label: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ", semantic: "normal" },
        { id: "wrong10", label: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", semantic: "normal" }
      ]
    },
    successText: "🌟 أَحْسَنْتَ! مَالِكِ يَوْمِ الدِّينِ.",
    retryText: "تَذَكَّرْ تَرْتِيبَ الْآيَاتِ."
  },
  {
    id: "l04_ex2_q3",
    mission: 2,
    prompt: "أَكْمِلْ: إِيَّاكَ نَعْبُدُ...",
    audioKey: "l04_ex2_q3",
    answer: "nastaeen",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/islamic/lesson04/s5.webp",
      options: [
        { id: "wrong11", label: "وَلَا الضَّالِّينَ", semantic: "normal" },
        { id: "nastaeen", label: "وَإِيَّاكَ نَسْتَعِينُ", semantic: "normal" },
        { id: "wrong12", label: "رَبِّ الْعَالَمِينَ", semantic: "normal" }
      ]
    },
    successText: "🌟 صَحِيحٌ! وَإِيَّاكَ نَسْتَعِينُ.",
    retryText: "تَذَكَّرْ تَتِمَّةَ الْآيَةِ بِهُدُوءٍ."
  },
  {
    id: "l04_ex2_q4",
    mission: 2,
    prompt: "أَكْمِلْ آخِرَ السُّورَةِ: غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ...",
    audioKey: "l04_ex2_q4",
    answer: "dalleen",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/islamic/lesson04/s2.webp",
      options: [
        { id: "wrong13", label: "وَإِيَّاكَ نَسْتَعِينُ", semantic: "normal" },
        { id: "wrong14", label: "الرَّحْمَٰنِ الرَّحِيمِ", semantic: "normal" },
        { id: "dalleen", label: "وَلَا الضَّالِّينَ", semantic: "normal" }
      ]
    },
    successText: "🌟 أَحْسَنْتَ! وَلَا الضَّالِّينَ.",
    retryText: "تَذَكَّرْ آخِرَ كَلِمَاتِ سُورَةِ الْفَاتِحَةِ."
  },
  {
    id: "l04_ex3_q1",
    mission: 3,
    prompt: "رَتِّبْ كَلِمَاتِ الْآيَةِ كَمَا تَعَلَّمْتَهَا.",
    audioKey: "l04_ex3_q1",
    activityData: {
      kind: "word-order",
      tokens: [
        { id: "alameen", label: "الْعَالَمِينَ", semantic: "normal" },
        { id: "hamd", label: "الْحَمْدُ", semantic: "normal" },
        { id: "rabb", label: "رَبِّ", semantic: "normal" },
        { id: "lillah", label: "لِلَّهِ", semantic: "normal" }
      ],
      correctOrder: ["hamd", "lillah", "rabb", "alameen"]
    },
    successText: "🌟 أَحْسَنْتَ! الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ.",
    retryText: "اِقْرَأِ الْكَلِمَاتِ، ثُمَّ أَعِدْ تَرْتِيبَهَا."
  },
  {
    id: "l04_ex3_q2",
    mission: 3,
    prompt: "رَتِّبْ كَلِمَاتِ الْآيَةِ كَمَا تَعَلَّمْتَهَا.",
    audioKey: "l04_ex3_q2",
    activityData: {
      kind: "word-order",
      tokens: [
        { id: "rahim", label: "الرَّحِيمِ", semantic: "normal" },
        { id: "rahman", label: "الرَّحْمَٰنِ", semantic: "normal" }
      ],
      correctOrder: ["rahman", "rahim"]
    },
    successText: "🌟 أَحْسَنْتَ! الرَّحْمَٰنِ الرَّحِيمِ.",
    retryText: "اِقْرَأِ الْكَلِمَتَيْنِ، ثُمَّ أَعِدْ تَرْتِيبَهُمَا."
  },
  {
    id: "l04_ex3_q3",
    mission: 3,
    prompt: "رَتِّبْ كَلِمَاتِ الْآيَةِ كَمَا تَعَلَّمْتَهَا.",
    audioKey: "l04_ex3_q3",
    activityData: {
      kind: "word-order",
      tokens: [
        { id: "mustaqim", label: "الْمُسْتَقِيمَ", semantic: "normal" },
        { id: "sirat", label: "الصِّرَاطَ", semantic: "normal" },
        { id: "ihdina", label: "اهْدِنَا", semantic: "normal" }
      ],
      correctOrder: ["ihdina", "sirat", "mustaqim"]
    },
    successText: "🌟 أَحْسَنْتَ! اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ.",
    retryText: "اِقْرَأِ الْكَلِمَاتِ، ثُمَّ أَعِدْ تَرْتِيبَهَا."
  },
  {
    id: "l04_ex3_q4",
    mission: 3,
    prompt: "رَتِّبْ كَلِمَاتِ الْآيَةِ كَمَا تَعَلَّمْتَهَا.",
    audioKey: "l04_ex3_q4",
    activityData: {
      kind: "word-order",
      tokens: [
        { id: "nastaeen2", label: "نَسْتَعِينُ", semantic: "normal" },
        { id: "iyyaka2", label: "وَإِيَّاكَ", semantic: "normal" },
        { id: "nabud", label: "نَعْبُدُ", semantic: "normal" },
        { id: "iyyaka1", label: "إِيَّاكَ", semantic: "normal" }
      ],
      correctOrder: ["iyyaka1", "nabud", "iyyaka2", "nastaeen2"]
    },
    successText: "🌟 أَحْسَنْتَ! إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ.",
    retryText: "اِقْرَأِ الْكَلِمَاتِ بِهُدُوءٍ، ثُمَّ أَعِدْ تَرْتِيبَهَا."
  },
  {
    id: "l04_ex4_q1",
    mission: 4,
    prompt: "اِخْتَرِ الْجُمْلَةَ الَّتِي تَأْتِي فِي سُورَةِ الْفَاتِحَةِ.",
    audioKey: "l04_ex4_q1",
    answer: "fatiha-line1",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/islamic/lesson04/s5.webp",
      options: [
        { id: "fatiha-line1", label: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", semantic: "normal" },
        { id: "other1", label: "قُلْ هُوَ اللَّهُ أَحَدٌ", semantic: "normal" },
        { id: "other2", label: "مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ", semantic: "normal" }
      ]
    },
    successText: "🌟 أَحْسَنْتَ! هَذِهِ مِنْ سُورَةِ الْفَاتِحَةِ.",
    retryText: "مَيِّزْ بَيْنَ آيَاتِ سُورَةِ الْفَاتِحَةِ وَغَيْرِهَا."
  },
  {
    id: "l04_ex4_q2",
    mission: 4,
    prompt: "اِخْتَرِ الْآيَةَ الَّتِي تَأْتِي قَبْلَ: اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ.",
    audioKey: "l04_ex4_q2",
    answer: "before-guide",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/islamic/lesson04/s2.webp",
      options: [
        { id: "other3", label: "الرَّحْمَٰنِ الرَّحِيمِ", semantic: "normal" },
        { id: "other4", label: "مَالِكِ يَوْمِ الدِّينِ", semantic: "normal" },
        { id: "before-guide", label: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", semantic: "normal" }
      ]
    },
    successText: "🌟 صَحِيحٌ! إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ.",
    retryText: "رَاجِعْ تَرْتِيبَ آيَاتِ السُّورَةِ."
  },
  {
    id: "l04_ex4_q3",
    mission: 4,
    prompt: "اِخْتَرْ تَتِمَّةَ: صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ...",
    audioKey: "l04_ex4_q3",
    answer: "ending",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/islamic/lesson04/s2.webp",
      options: [
        { id: "other5", label: "مَالِكِ يَوْمِ الدِّينِ", semantic: "normal" },
        { id: "ending", label: "غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ", semantic: "normal" },
        { id: "other6", label: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", semantic: "normal" }
      ]
    },
    successText: "🌟 أَحْسَنْتَ! غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ.",
    retryText: "تَذَكَّرْ خَاتِمَةَ السُّورَةِ."
  },
  {
    id: "l04_ex4_q4",
    mission: 4,
    prompt: "اِخْتَرْ مَا تَعَلَّمْتَهُ فِي هَذَا الدَّرْسِ.",
    audioKey: "l04_ex4_q4",
    answer: "goal",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/islamic/lesson04/s4.webp",
      options: [
        { id: "goal", label: "أَقْرَأُ سُورَةَ الْفَاتِحَةِ وَأُرَتِّبُ آيَاتِهَا.", semantic: "normal" },
        { id: "math", label: "أَجْمَعُ الْأَعْدَادَ.", semantic: "normal" },
        { id: "home", label: "أَتَعَرَّفُ عَلَى غُرَفِ الْمَنْزِلِ.", semantic: "normal" }
      ]
    },
    successText: "🌟 مُمْتَازٌ! تَعَلَّمْتَ سُورَةَ الْفَاتِحَةِ وَتَرْتِيبَ آيَاتِهَا.",
    retryText: "تَذَكَّرْ عُنْوَانَ الدَّرْسِ وَهَدَفَهُ."
  }
];

const missionTitles = {1:"أَتَعَرَّفُ وَأَخْتَارُ",2:"أُمَيِّزُ وَأَرْبِطُ",3:"أَقْرَأُ وَأَبْنِي",4:"أُوَظِّفُ وَأُرَتِّبُ"};

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

export default function IslamicLesson04ExercisesV2() {
  return (
    <UnifiedLessonExercisesV2
      lessonKey="islamic-w01-u04"
      audioBase="/audio/v2/islamic/lesson04/exercises"
      questions={questions}
      missionTitles={missionTitles}
      missionCount={4}
      completionMessage="أَحْسَنْتَ يَا فَاضِلُ! أَتْمَمْتَ نَشَاطَاتِ سُورَةِ الْفَاتِحَةِ بِنَجَاحٍ، وَتَعَرَّفْتَ عَلَى آيَاتِهَا وَتَرْتِيبِهَا، وَأَصْبَحْتَ أَقْدَرَ عَلَى قِرَاءَتِهَا بِتَرْتِيبٍ صَحِيحٍ."
      nextLessonKey="arabic-w01-u05"
      nextPath="/lesson-v2/arabic/lesson05"
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
