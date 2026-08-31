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
    id: "l09_ex1_q1",
    mission: 1,
    prompt: "مَا التَّحِيَّةُ الَّتِي أَبْدَأُ بِهَا؟",
    audioKey: "l09_ex1_q1",
    answer: "salam",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/civics/lesson09/s2.webp",
      options: [
        { id: "salam", label: "السَّلَامُ عَلَيْكُمْ.", semantic: "normal" },
        { id: "silent", label: "لَا أَقُولُ شَيْئًا.", semantic: "normal" },
        { id: "noise", label: "أَرْفَعُ صَوْتِي.", semantic: "normal" }
      ]
    },
    successText: "🌟 أَحْسَنْتَ! أَبْدَأُ بِالتَّحِيَّةِ: السَّلَامُ عَلَيْكُمْ.",
    retryText: "تَذَكَّرْ عِبَارَةَ التَّحِيَّةِ فِي الدَّرْسِ."
  },
  {
    id: "l09_ex1_q2",
    mission: 1,
    prompt: "مَاذَا أَقُولُ لِمَنْ قَالَ لِي: السَّلَامُ عَلَيْكُمْ؟",
    audioKey: "l09_ex1_q2",
    answer: "reply",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/civics/lesson09/s3.webp",
      options: [
        { id: "leave", label: "أَبْتَعِدُ دُونَ رَدٍّ.", semantic: "normal" },
        { id: "reply", label: "وَعَلَيْكُمُ السَّلَامُ.", semantic: "normal" },
        { id: "ignore", label: "أَتَجَاهَلُهُ.", semantic: "normal" }
      ]
    },
    successText: "🌟 صَحِيحٌ! أَرُدُّ: وَعَلَيْكُمُ السَّلَامُ.",
    retryText: "التَّحِيَّةُ لَهَا رَدٌّ مُنَاسِبٌ."
  },
  {
    id: "l09_ex1_q3",
    mission: 1,
    prompt: "عِنْدَمَا يُحَيِّينِي شَخْصٌ، مَاذَا أَفْعَلُ؟",
    audioKey: "l09_ex1_q3",
    answer: "return",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/civics/lesson09/s3.webp",
      options: [
        { id: "ignore2", label: "أَتَجَاهَلُهُ.", semantic: "normal" },
        { id: "turn", label: "أُدِيرُ وَجْهِي.", semantic: "normal" },
        { id: "return", label: "أَرُدُّ عَلَيْهِ التَّحِيَّةَ بِأَدَبٍ.", semantic: "normal" }
      ]
    },
    successText: "🌟 أَحْسَنْتَ! أَرُدُّ التَّحِيَّةَ بِأَدَبٍ.",
    retryText: "فَكِّرْ فِي السُّلُوكِ الْمُهَذَّبِ عِنْدَ سَمَاعِ التَّحِيَّةِ."
  },
  {
    id: "l09_ex1_q4",
    mission: 1,
    prompt: "أَيُّ سُلُوكٍ يَدُلُّ عَلَى الْأَدَبِ فِي التَّحِيَّةِ؟",
    audioKey: "l09_ex1_q4",
    answer: "polite",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/civics/lesson09/s7.webp",
      options: [
        { id: "mock", label: "أَسْخَرُ مِنَ الْآخَرِينَ.", semantic: "normal" },
        { id: "polite", label: "أُحَيِّي وَأَرُدُّ التَّحِيَّةَ بِلُطْفٍ.", semantic: "normal" },
        { id: "ignore3", label: "لَا أَرُدُّ التَّحِيَّةَ.", semantic: "normal" }
      ]
    },
    successText: "🌟 مُمْتَازٌ! التَّحِيَّةُ وَرَدُّهَا مِنَ السُّلُوكِ الْمُهَذَّبِ.",
    retryText: "اِخْتَرِ السُّلُوكَ الَّذِي يَدُلُّ عَلَى الِاحْتِرَامِ."
  },
  {
    id: "l09_ex2_q1",
    mission: 2,
    prompt: "لَقِيتُ صَدِيقِي. مَاذَا أَفْعَلُ؟",
    audioKey: "l09_ex2_q1",
    answer: "greet",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/civics/lesson09/s2.webp",
      options: [
        { id: "ignore4", label: "أَمُرُّ دُونَ كَلَامٍ.", semantic: "normal" },
        { id: "push", label: "أَدْفَعُهُ.", semantic: "normal" },
        { id: "greet", label: "أُحَيِّيهِ بِأَدَبٍ.", semantic: "normal" }
      ]
    },
    successText: "🌟 أَحْسَنْتَ! أُحَيِّي صَدِيقِي بِأَدَبٍ.",
    retryText: "تَذَكَّرْ مَا نَفْعَلُهُ عِنْدَ اللِّقَاءِ."
  },
  {
    id: "l09_ex2_q2",
    mission: 2,
    prompt: "سَمِعْتُ: السَّلَامُ عَلَيْكُمْ. مَا السُّلُوكُ الصَّحِيحُ؟",
    audioKey: "l09_ex2_q2",
    answer: "respond",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/civics/lesson09/s3.webp",
      options: [
        { id: "respond", label: "أَقُولُ: وَعَلَيْكُمُ السَّلَامُ.", semantic: "normal" },
        { id: "silence2", label: "أَبْقَى صَامِتًا.", semantic: "normal" },
        { id: "walk", label: "أَمْشِي دُونَ رَدٍّ.", semantic: "normal" }
      ]
    },
    successText: "🌟 صَحِيحٌ! أَرُدُّ التَّحِيَّةَ.",
    retryText: "اِخْتَرِ الرَّدَّ الْمُنَاسِبَ عَلَى السَّلَامِ."
  },
  {
    id: "l09_ex2_q3",
    mission: 2,
    prompt: "أَيُّ سُلُوكٍ غَيْرُ صَحِيحٍ عِنْدَ التَّحِيَّةِ؟",
    audioKey: "l09_ex2_q3",
    answer: "bad",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/civics/lesson09/s7.webp",
      options: [
        { id: "smile", label: "أَبْتَسِمُ وَأُحَيِّي.", semantic: "normal" },
        { id: "bad", label: "أَتَجَاهَلُ مَنْ يُحَيِّينِي.", semantic: "normal" },
        { id: "reply2", label: "أَرُدُّ التَّحِيَّةَ.", semantic: "normal" }
      ]
    },
    successText: "🌟 أَحْسَنْتَ! تَجَاهُلُ التَّحِيَّةِ سُلُوكٌ غَيْرُ صَحِيحٍ.",
    retryText: "اِخْتَرِ السُّلُوكَ الَّذِي لَا يَدُلُّ عَلَى الِاحْتِرَامِ."
  },
  {
    id: "l09_ex2_q4",
    mission: 2,
    prompt: "مَا الَّذِي يَجْعَلُ التَّحِيَّةَ أَجْمَلَ؟",
    audioKey: "l09_ex2_q4",
    answer: "smile",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/civics/lesson09/s7.webp",
      options: [
        { id: "anger", label: "الْغَضَبُ.", semantic: "normal" },
        { id: "shout", label: "الصُّرَاخُ.", semantic: "normal" },
        { id: "smile", label: "الِابْتِسَامَةُ وَالْكَلَامُ الْمُهَذَّبُ.", semantic: "normal" }
      ]
    },
    successText: "🌟 مُمْتَازٌ! أُحَيِّي بِلُطْفٍ وَابْتِسَامَةٍ.",
    retryText: "فَكِّرْ فِي السُّلُوكِ اللَّطِيفِ عِنْدَ التَّحِيَّةِ."
  },
  {
    id: "l09_ex3_q1",
    mission: 3,
    prompt: "رَتِّبِ الْكَلِمَاتِ، وَابْنِ التَّحِيَّةَ.",
    audioKey: "l09_ex3_q1",
    activityData: {
      kind: "word-order",
      tokens: [
        { id: "alaykum", label: "عَلَيْكُمْ", semantic: "normal" },
        { id: "salam", label: "السَّلَامُ", semantic: "normal" }
      ],
      correctOrder: ["salam", "alaykum"]
    },
    successText: "🌟 أَحْسَنْتَ! السَّلَامُ عَلَيْكُمْ.",
    retryText: "اِبْدَأْ بِـ«السَّلَامُ»."
  },
  {
    id: "l09_ex3_q2",
    mission: 3,
    prompt: "رَتِّبِ الْكَلِمَاتِ، وَابْنِ رَدَّ التَّحِيَّةِ.",
    audioKey: "l09_ex3_q2",
    activityData: {
      kind: "word-order",
      tokens: [
        { id: "salam2", label: "السَّلَامُ", semantic: "normal" },
        { id: "waalaykum", label: "وَعَلَيْكُمُ", semantic: "normal" }
      ],
      correctOrder: ["waalaykum", "salam2"]
    },
    successText: "🌟 صَحِيحٌ! وَعَلَيْكُمُ السَّلَامُ.",
    retryText: "اِبْدَأْ بِـ«وَعَلَيْكُمُ»."
  },
  {
    id: "l09_ex3_q3",
    mission: 3,
    prompt: "رَتِّبِ الْكَلِمَاتِ، وَابْنِ الْجُمْلَةَ.",
    audioKey: "l09_ex3_q3",
    activityData: {
      kind: "word-order",
      tokens: [
        { id: "friends", label: "أَصْدِقَائِي", semantic: "normal" },
        { id: "greet", label: "أُحَيِّي", semantic: "normal" }
      ],
      correctOrder: ["greet", "friends"]
    },
    successText: "🌟 أَحْسَنْتَ! أُحَيِّي أَصْدِقَائِي.",
    retryText: "اِبْدَأْ بِالْفِعْلِ «أُحَيِّي»."
  },
  {
    id: "l09_ex3_q4",
    mission: 3,
    prompt: "رَتِّبِ الْكَلِمَاتِ، وَابْنِ الْجُمْلَةَ.",
    audioKey: "l09_ex3_q4",
    activityData: {
      kind: "word-order",
      tokens: [
        { id: "greeting", label: "التَّحِيَّةَ", semantic: "normal" },
        { id: "return2", label: "أَرُدُّ", semantic: "normal" }
      ],
      correctOrder: ["return2", "greeting"]
    },
    successText: "🌟 مُمْتَازٌ! أَرُدُّ التَّحِيَّةَ.",
    retryText: "اِبْدَأْ بِـ«أَرُدُّ»."
  },
  {
    id: "l09_ex4_q1",
    mission: 4,
    prompt: "دَخَلْتُ مَكَانًا وَوَجَدْتُ أَصْدِقَائِي. بِمَاذَا أَبْدَأُ؟",
    audioKey: "l09_ex4_q1",
    answer: "start",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/civics/lesson09/s2.webp",
      options: [
        { id: "start", label: "أَبْدَأُ بِالتَّحِيَّةِ.", semantic: "normal" },
        { id: "ignore5", label: "أَتَجَاهَلُهُمْ.", semantic: "normal" },
        { id: "noise2", label: "أُحْدِثُ ضَجِيجًا.", semantic: "normal" }
      ]
    },
    successText: "🌟 أَحْسَنْتَ! أَبْدَأُ بِالتَّحِيَّةِ.",
    retryText: "تَذَكَّرْ مَا نَقُولُهُ عِنْدَ اللِّقَاءِ."
  },
  {
    id: "l09_ex4_q2",
    mission: 4,
    prompt: "قَالَ لِي صَدِيقِي: السَّلَامُ عَلَيْكُمْ. مَاذَا أَقُولُ؟",
    audioKey: "l09_ex4_q2",
    answer: "reply_final",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/civics/lesson09/s3.webp",
      options: [
        { id: "bye", label: "مَعَ السَّلَامَةِ.", semantic: "normal" },
        { id: "nothing", label: "لَا شَيْءَ.", semantic: "normal" },
        { id: "reply_final", label: "وَعَلَيْكُمُ السَّلَامُ.", semantic: "normal" }
      ]
    },
    successText: "🌟 صَحِيحٌ! وَعَلَيْكُمُ السَّلَامُ.",
    retryText: "رُدَّ التَّحِيَّةَ بِالرَّدِّ الْمُنَاسِبِ."
  },
  {
    id: "l09_ex4_q3",
    mission: 4,
    prompt: "كَيْفَ أَجْعَلُ تَحِيَّتِي مُهَذَّبَةً؟",
    audioKey: "l09_ex4_q3",
    answer: "nice",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/civics/lesson09/s7.webp",
      options: [
        { id: "angry", label: "بِوَجْهٍ غَاضِبٍ.", semantic: "normal" },
        { id: "nice", label: "بِابْتِسَامَةٍ وَكَلَامٍ طَيِّبٍ.", semantic: "normal" },
        { id: "loud", label: "بِصَوْتٍ مُزْعِجٍ.", semantic: "normal" }
      ]
    },
    successText: "🌟 أَحْسَنْتَ! أُحَيِّي بِلُطْفٍ وَابْتِسَامَةٍ.",
    retryText: "اِخْتَرِ الطَّرِيقَةَ الَّتِي تَدُلُّ عَلَى الْأَدَبِ."
  },
  {
    id: "l09_ex4_q4",
    mission: 4,
    prompt: "مَا خُلَاصَةُ دَرْسِ التَّحِيَّةِ وَرَدِّهَا؟",
    audioKey: "l09_ex4_q4",
    answer: "goal",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/civics/lesson09/s7.webp",
      options: [
        { id: "goal", label: "أُحَيِّي الْآخَرِينَ وَأَرُدُّ التَّحِيَّةَ بِأَدَبٍ.", semantic: "normal" },
        { id: "rooms", label: "أَتَعَرَّفُ عَلَى غُرَفِ الْمَنْزِلِ.", semantic: "normal" },
        { id: "numbers", label: "أَجْمَعُ الْأَعْدَادَ.", semantic: "normal" }
      ]
    },
    successText: "🌟 مُمْتَازٌ! أُحَيِّي وَأَرُدُّ التَّحِيَّةَ بِأَدَبٍ.",
    retryText: "تَذَكَّرْ عُنْوَانَ الدَّرْسِ وَمَا تَعَلَّمْتَهُ."
  }
];

const missionTitles = {1:"أَتَعَرَّفُ التَّحِيَّةَ وَرَدَّهَا",2:"أُمَيِّزُ السُّلُوكَ الصَّحِيحَ",3:"أَقْرَأُ وَأَبْنِي",4:"أُطَبِّقُ التَّحِيَّةَ وَرَدَّهَا"};

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

export default function CivicsLesson09ExercisesV2() {
  return (
    <UnifiedLessonExercisesV2
      lessonKey="civics-w01-u09"
      audioBase="/audio/v2/civics/lesson09/exercises"
      questions={questions}
      missionTitles={missionTitles}
      missionCount={4}
      completionMessage="أَحْسَنْتَ يَا فَاضِلُ! أَتْمَمْتَ نَشَاطَاتِ دَرْسِ التَّحِيَّةِ وَرَدِّهَا بِنَجَاحٍ، وَتَعَلَّمْتَ أَنْ تَبْدَأَ بِالتَّحِيَّةِ، وَأَنْ تَرُدَّهَا بِأَدَبٍ، وَأَنْ تَتَعَامَلَ مَعَ الْآخَرِينَ بِلُطْفٍ وَاحْتِرَامٍ."
      nextLessonKey="arabic-w01-u10"
      nextPath="/lesson-v2/arabic/lesson10"
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
