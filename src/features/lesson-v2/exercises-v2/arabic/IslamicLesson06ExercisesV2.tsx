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
    id: "l06_ex1_q1",
    mission: 1,
    prompt: "مَتَى أَسْتَأْذِنُ؟",
    audioKey: "l06_ex1_q1",
    answer: "before-enter",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/islamic/lesson06/s6.webp",
      options: [
        { id: "before-enter", label: "قَبْلَ أَنْ أَدْخُلَ.", semantic: "normal" },
        { id: "after-enter", label: "بَعْدَ أَنْ أَدْخُلَ.", semantic: "normal" },
        { id: "never", label: "لَا أَسْتَأْذِنُ.", semantic: "normal" }
      ]
    },
    successText: "🌟 أَحْسَنْتَ! أَسْتَأْذِنُ قَبْلَ أَنْ أَدْخُلَ.",
    retryText: "تَذَكَّرْ: الِاسْتِئْذَانُ يَكُونُ قَبْلَ الدُّخُولِ."
  },
  {
    id: "l06_ex1_q2",
    mission: 1,
    prompt: "اِخْتَرِ الْعِبَارَةَ الْمُنَاسِبَةَ لِطَلَبِ الْإِذْنِ.",
    audioKey: "l06_ex1_q2",
    answer: "ask",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/islamic/lesson06/s2.webp",
      options: [
        { id: "command", label: "اِفْتَحُوا الْبَابَ.", semantic: "normal" },
        { id: "ask", label: "السَّلَامُ عَلَيْكُمْ، أَأَدْخُلُ؟", semantic: "normal" },
        { id: "silent", label: "أَدْخُلُ دُونَ كَلَامٍ.", semantic: "normal" }
      ]
    },
    successText: "🌟 صَحِيحٌ! أَطْلُبُ الْإِذْنَ بِأَدَبٍ.",
    retryText: "اِخْتَرْ عِبَارَةً فِيهَا سَلَامٌ وَطَلَبٌ لِلْإِذْنِ."
  },
  {
    id: "l06_ex1_q3",
    mission: 1,
    prompt: "مَاذَا أَفْعَلُ بَعْدَ أَنْ أَطْلُبَ الْإِذْنَ؟",
    audioKey: "l06_ex1_q3",
    answer: "wait",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/islamic/lesson06/s3.webp",
      options: [
        { id: "enter-fast", label: "أَدْخُلُ مُبَاشَرَةً.", semantic: "normal" },
        { id: "shout", label: "أَرْفَعُ صَوْتِي.", semantic: "normal" },
        { id: "wait", label: "أَنْتَظِرُ الْجَوَابَ.", semantic: "normal" }
      ]
    },
    successText: "🌟 أَحْسَنْتَ! أَنْتَظِرُ الْجَوَابَ بَعْدَ طَلَبِ الْإِذْنِ.",
    retryText: "لَا أَدْخُلْ حَتَّى أَسْمَعَ الْجَوَابَ."
  },
  {
    id: "l06_ex1_q4",
    mission: 1,
    prompt: "إِذَا لَمْ يُؤْذَنْ لِي بِالدُّخُولِ، مَاذَا أَفْعَلُ؟",
    audioKey: "l06_ex1_q4",
    answer: "return",
    activityData: {
      kind: "sentence-choice",
      options: [
        { id: "force", label: "أَدْخُلُ رَغْمًا عَنْهُمْ.", semantic: "normal" },
        { id: "return", label: "أَعُودُ بِهُدُوءٍ وَلَا أَدْخُلُ.", semantic: "normal" },
        { id: "anger", label: "أَغْضَبُ وَأَصْرُخُ.", semantic: "normal" }
      ]
    },
    successText: "🌟 مُمْتَازٌ! إِذَا لَمْ يُؤْذَنْ لِي أَعُودُ بِأَدَبٍ.",
    retryText: "الِاسْتِئْذَانُ يَعْنِي أَنْ أَحْتَرِمَ جَوَابَ الْآخَرِينَ."
  },
  {
    id: "l06_ex2_q1",
    mission: 2,
    prompt: "اِخْتَرِ السُّلُوكَ الصَّحِيحَ عِنْدَ بَابٍ مُغْلَقٍ.",
    audioKey: "l06_ex2_q1",
    answer: "polite",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/islamic/lesson06/s2.webp",
      options: [
        { id: "push", label: "أَفْتَحُ الْبَابَ وَأَدْخُلُ.", semantic: "normal" },
        { id: "loud", label: "أَضْرِبُ الْبَابَ بِقُوَّةٍ.", semantic: "normal" },
        { id: "polite", label: "أَطْرُقُ بِأَدَبٍ وَأَسْتَأْذِنُ.", semantic: "normal" }
      ]
    },
    successText: "🌟 أَحْسَنْتَ! أَطْرُقُ بِأَدَبٍ وَأَسْتَأْذِنُ.",
    retryText: "اِخْتَرِ السُّلُوكَ الَّذِي يَدُلُّ عَلَى الْأَدَبِ."
  },
  {
    id: "l06_ex2_q2",
    mission: 2,
    prompt: "قَالَ لِي أَبِي: تَفَضَّلْ. مَاذَا أَفْعَلُ؟",
    audioKey: "l06_ex2_q2",
    answer: "enter",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/islamic/lesson06/s4.webp",
      options: [
        { id: "enter", label: "أَدْخُلُ بِهُدُوءٍ.", semantic: "normal" },
        { id: "leave", label: "أَبْتَعِدُ وَأَصْرُخُ.", semantic: "normal" },
        { id: "ignore", label: "لَا أَسْمَعُ كَلَامَهُ.", semantic: "normal" }
      ]
    },
    successText: "🌟 صَحِيحٌ! بَعْدَ الْإِذْنِ أَدْخُلُ بِهُدُوءٍ.",
    retryText: "تَذَكَّرْ: «تَفَضَّلْ» تَعْنِي أَنَّ الدُّخُولَ مَسْمُوحٌ."
  },
  {
    id: "l06_ex2_q3",
    mission: 2,
    prompt: "قَالَتْ لِي أُمِّي: اِنْتَظِرْ. مَاذَا أَفْعَلُ؟",
    audioKey: "l06_ex2_q3",
    answer: "stay",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/islamic/lesson06/s3.webp",
      options: [
        { id: "enter-anyway", label: "أَدْخُلُ عَلَى الْفَوْرِ.", semantic: "normal" },
        { id: "stay", label: "أَبْقَى خَارِجًا وَأَنْتَظِرُ.", semantic: "normal" },
        { id: "open", label: "أَفْتَحُ الْبَابَ بِنَفْسِي.", semantic: "normal" }
      ]
    },
    successText: "🌟 أَحْسَنْتَ! أَحْتَرِمُ الْجَوَابَ وَأَنْتَظِرُ.",
    retryText: "اِسْمَعِ الْجَوَابَ وَاحْتَرِمْهُ."
  },
  {
    id: "l06_ex2_q4",
    mission: 2,
    prompt: "أَيُّ سُلُوكٍ يَحْتَرِمُ خُصُوصِيَّةَ الْآخَرِينَ؟",
    audioKey: "l06_ex2_q4",
    answer: "respect",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/islamic/lesson06/s2.webp",
      options: [
        { id: "peek", label: "أَنْظُرُ دَاخِلَ الْغُرْفَةِ دُونَ إِذْنٍ.", semantic: "normal" },
        { id: "enter-room", label: "أَدْخُلُ غُرْفَةَ غَيْرِي مُبَاشَرَةً.", semantic: "normal" },
        { id: "respect", label: "أَسْتَأْذِنُ قَبْلَ الدُّخُولِ.", semantic: "normal" }
      ]
    },
    successText: "🌟 مُمْتَازٌ! أَسْتَأْذِنُ فَأَحْتَرِمُ خُصُوصِيَّةَ غَيْرِي.",
    retryText: "فَكِّرْ فِي السُّلُوكِ الَّذِي يَحْفَظُ حَقَّ الْآخَرِينَ."
  },
  {
    id: "l06_ex3_q1",
    mission: 3,
    prompt: "رَتِّبِ الْكَلِمَاتِ، وَابْنِ الْجُمْلَةَ.",
    audioKey: "l06_ex3_q1",
    activityData: {
      kind: "word-order",
      tokens: [
        { id: "enter", label: "الدُّخُولِ", semantic: "normal" },
        { id: "before", label: "قَبْلَ", semantic: "normal" },
        { id: "ask", label: "أَسْتَأْذِنُ", semantic: "normal" }
      ],
      correctOrder: ["ask", "before", "enter"]
    },
    successText: "🌟 أَحْسَنْتَ! أَسْتَأْذِنُ قَبْلَ الدُّخُولِ.",
    retryText: "اِقْرَأِ الْكَلِمَاتِ، ثُمَّ رَتِّبْهَا لِتَبْدَأَ بِـ«أَسْتَأْذِنُ»."
  },
  {
    id: "l06_ex3_q2",
    mission: 3,
    prompt: "رَتِّبِ الْكَلِمَاتِ، وَابْنِ الْجُمْلَةَ.",
    audioKey: "l06_ex3_q2",
    activityData: {
      kind: "word-order",
      tokens: [
        { id: "alaykum", label: "عَلَيْكُمْ", semantic: "normal" },
        { id: "salam", label: "السَّلَامُ", semantic: "normal" }
      ],
      correctOrder: ["salam", "alaykum"]
    },
    successText: "🌟 أَحْسَنْتَ! السَّلَامُ عَلَيْكُمْ.",
    retryText: "اِقْرَأِ الْكَلِمَتَيْنِ، ثُمَّ رَتِّبْهُمَا."
  },
  {
    id: "l06_ex3_q3",
    mission: 3,
    prompt: "رَتِّبِ الْكَلِمَاتِ، وَابْنِ الْجُمْلَةَ.",
    audioKey: "l06_ex3_q3",
    activityData: {
      kind: "word-order",
      tokens: [
        { id: "permission", label: "الْإِذْنَ", semantic: "normal" },
        { id: "wait", label: "أَنْتَظِرُ", semantic: "normal" }
      ],
      correctOrder: ["wait", "permission"]
    },
    successText: "🌟 أَحْسَنْتَ! أَنْتَظِرُ الْإِذْنَ.",
    retryText: "اِبْدَأْ بِالْفِعْلِ «أَنْتَظِرُ»."
  },
  {
    id: "l06_ex3_q4",
    mission: 3,
    prompt: "رَتِّبِ الْكَلِمَاتِ، وَابْنِ الْجُمْلَةَ.",
    audioKey: "l06_ex3_q4",
    activityData: {
      kind: "word-order",
      tokens: [
        { id: "permission2", label: "إِذْنٍ", semantic: "normal" },
        { id: "without", label: "دُونَ", semantic: "normal" },
        { id: "not", label: "لَا", semantic: "normal" },
        { id: "enter2", label: "أَدْخُلُ", semantic: "normal" }
      ],
      correctOrder: ["not", "enter2", "without", "permission2"]
    },
    successText: "🌟 أَحْسَنْتَ! لَا أَدْخُلُ دُونَ إِذْنٍ.",
    retryText: "اِقْرَأِ الْكَلِمَاتِ، ثُمَّ ابْنِ جُمْلَةً تَدُلُّ عَلَى الِاسْتِئْذَانِ."
  },
  {
    id: "l06_ex4_q1",
    mission: 4,
    prompt: "وَجَدْتُ بَابَ غُرْفَةٍ مُغْلَقًا. مَاذَا أَفْعَلُ أَوَّلًا؟",
    audioKey: "l06_ex4_q1",
    answer: "first-step",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/islamic/lesson06/s2.webp",
      options: [
        { id: "first-step", label: "أَطْرُقُ بِأَدَبٍ وَأَطْلُبُ الْإِذْنَ.", semantic: "normal" },
        { id: "open-first", label: "أَفْتَحُ الْبَابَ مُبَاشَرَةً.", semantic: "normal" },
        { id: "peek-first", label: "أَنْظُرُ مِنْ فَتْحَةِ الْبَابِ.", semantic: "normal" }
      ]
    },
    successText: "🌟 أَحْسَنْتَ! أَبْدَأُ بِطَلَبِ الْإِذْنِ.",
    retryText: "تَذَكَّرِ الْخُطْوَةَ الْأُولَى قَبْلَ الدُّخُولِ."
  },
  {
    id: "l06_ex4_q2",
    mission: 4,
    prompt: "طَلَبْتُ الْإِذْنَ وَسَمِعْتُ: تَفَضَّلْ. مَاذَا أَفْعَلُ؟",
    audioKey: "l06_ex4_q2",
    answer: "after-yes",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/islamic/lesson06/s4.webp",
      options: [
        { id: "wait-forever", label: "أَبْقَى فِي مَكَانِي دَائِمًا.", semantic: "normal" },
        { id: "shout2", label: "أَرْفَعُ صَوْتِي.", semantic: "normal" },
        { id: "after-yes", label: "أَدْخُلُ بِهُدُوءٍ وَأَدَبٍ.", semantic: "normal" }
      ]
    },
    successText: "🌟 صَحِيحٌ! بَعْدَ الْإِذْنِ أَدْخُلُ بِأَدَبٍ.",
    retryText: "«تَفَضَّلْ» تَعْنِي أَنَّ الدُّخُولَ مَسْمُوحٌ."
  },
  {
    id: "l06_ex4_q3",
    mission: 4,
    prompt: "طَلَبْتُ الْإِذْنَ وَلَمْ أَسْمَعْ جَوَابًا. مَاذَا أَفْعَلُ؟",
    audioKey: "l06_ex4_q3",
    answer: "no-answer",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/islamic/lesson06/s3.webp",
      options: [
        { id: "enter-noanswer", label: "أَدْخُلُ لِأَعْرِفَ مَنْ فِي الدَّاخِلِ.", semantic: "normal" },
        { id: "no-answer", label: "أَنْتَظِرُ، ثُمَّ أَعُودُ إِذَا لَمْ يُؤْذَنْ لِي.", semantic: "normal" },
        { id: "push-noanswer", label: "أَدْفَعُ الْبَابَ.", semantic: "normal" }
      ]
    },
    successText: "🌟 مُمْتَازٌ! لَا أَدْخُلُ دُونَ إِذْنٍ.",
    retryText: "عَدَمُ الْجَوَابِ لَا يَعْنِي السَّمَاحَ بِالدُّخُولِ."
  },
  {
    id: "l06_ex4_q4",
    mission: 4,
    prompt: "اِخْتَرْ مَا تَعَلَّمْتَهُ فِي دَرْسِ أَسْتَأْذِنُ.",
    audioKey: "l06_ex4_q4",
    answer: "goal",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/islamic/lesson06/s3.webp",
      options: [
        { id: "goal", label: "أَسْتَأْذِنُ قَبْلَ الدُّخُولِ وَأَحْتَرِمُ الْجَوَابَ.", semantic: "normal" },
        { id: "math", label: "أَجْمَعُ الْأَعْدَادَ.", semantic: "normal" },
        { id: "home", label: "أُسَمِّي غُرَفَ الْمَنْزِلِ.", semantic: "normal" }
      ]
    },
    successText: "🌟 أَحْسَنْتَ! تَعَلَّمْتَ أَدَبَ الِاسْتِئْذَانِ.",
    retryText: "تَذَكَّرْ عُنْوَانَ الدَّرْسِ وَقَاعِدَتَهُ."
  }
];

const missionTitles = {1:"أَعْرِفُ مَتَى أَسْتَأْذِنُ",2:"أُمَيِّزُ سُلُوكَ الِاسْتِئْذَانِ",3:"أَقْرَأُ وَأَبْنِي",4:"أُطَبِّقُ الِاسْتِئْذَانَ"};

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

export default function IslamicLesson06ExercisesV2() {
  return (
    <UnifiedLessonExercisesV2
      lessonKey="islamic-w01-u06"
      audioBase="/audio/v2/islamic/lesson06/exercises"
      questions={questions}
      missionTitles={missionTitles}
      missionCount={4}
      completionMessage="أَحْسَنْتَ يَا فَاضِلُ! أَتْمَمْتَ نَشَاطَاتِ دَرْسِ أَسْتَأْذِنُ بِنَجَاحٍ، وَتَعَلَّمْتَ أَنْ تَطْلُبَ الْإِذْنَ قَبْلَ الدُّخُولِ، وَأَنْ تَنْتَظِرَ الْجَوَابَ، وَأَنْ تَحْتَرِمَ إِذْنَ الْآخَرِينَ."
      nextLessonKey="arabic-w01-u07"
      nextPath="/lesson-v2/arabic/lesson07"
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
