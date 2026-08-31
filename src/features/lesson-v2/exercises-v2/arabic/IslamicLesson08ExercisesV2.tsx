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
    id: "l08_ex1_q1",
    mission: 1,
    prompt: "كَيْفَ أُسْعِدُ أُمِّي الْغَالِيَةَ؟",
    audioKey: "l08_ex1_q1",
    answer: "kind",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/islamic/lesson08/s2.webp",
      options: [
        { id: "ignore", label: "أُهْمِلُهَا.", semantic: "normal" },
        { id: "kind", label: "أُسْعِدُهَا بِكَلِمَةٍ طَيِّبَةٍ أَوْ هَدِيَّةٍ جَمِيلَةٍ.", semantic: "normal" },
        { id: "shout", label: "أَرْفَعُ صَوْتِي عَلَيْهَا.", semantic: "normal" }
      ]
    },
    successText: "🌟 أَحْسَنْتَ! أُسْعِدُ أُمِّي بِكَلِمَةٍ طَيِّبَةٍ أَوْ هَدِيَّةٍ جَمِيلَةٍ.",
    retryText: "تَذَكَّرْ مَا قَالَهُ الْمَشْهَدُ عَنْ حُبِّ الْأُمِّ."
  },
  {
    id: "l08_ex1_q2",
    mission: 1,
    prompt: "مَاذَا أَفْعَلُ مَعَ أَبِي الْكَرِيمِ؟",
    audioKey: "l08_ex1_q2",
    answer: "thank",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/islamic/lesson08/s3.webp",
      options: [
        { id: "thank", label: "أَشْكُرُهُ عَلَى مَا يُقَدِّمُهُ لِي.", semantic: "normal" },
        { id: "ignore", label: "أُهْمِلُهُ.", semantic: "normal" },
        { id: "anger", label: "أَغْضَبُ مِنْهُ.", semantic: "normal" }
      ]
    },
    successText: "🌟 صَحِيحٌ! أَشْكُرُ أَبِي عَلَى مَا يُقَدِّمُهُ لِي.",
    retryText: "تَذَكَّرْ مَشْهَدَ شُكْرِ الْأَبِ."
  },
  {
    id: "l08_ex1_q3",
    mission: 1,
    prompt: "كَيْفَ أَتَعَامَلُ مَعَ جَدِّي الْعَزِيزِ؟",
    audioKey: "l08_ex1_q3",
    answer: "respect",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/islamic/lesson08/s4.webp",
      options: [
        { id: "ignore", label: "أُهْمِلُهُ.", semantic: "normal" },
        { id: "respect", label: "أُحِبُّهُ وَأَحْتَرِمُهُ.", semantic: "normal" },
        { id: "hurt", label: "أُؤْذِيهِ.", semantic: "normal" }
      ]
    },
    successText: "🌟 أَحْسَنْتَ! أُحِبُّ جَدِّي وَأَحْتَرِمُهُ.",
    retryText: "تَذَكَّرْ كَيْفَ عَبَّرَ فَاضِلٌ عَنْ حُبِّ جَدِّهِ."
  },
  {
    id: "l08_ex1_q4",
    mission: 1,
    prompt: "مَا الَّذِي يَنْشُرُ الْمَحَبَّةَ؟",
    audioKey: "l08_ex1_q4",
    answer: "love",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/islamic/lesson08/s6.webp",
      options: [
        { id: "anger", label: "الْغَضَبُ.", semantic: "normal" },
        { id: "fight", label: "الْخُصُومَةُ.", semantic: "normal" },
        { id: "love", label: "الْكَلِمَةُ الطَّيِّبَةُ وَالِابْتِسَامَةُ.", semantic: "normal" }
      ]
    },
    successText: "🌟 مُمْتَازٌ! الْكَلِمَةُ الطَّيِّبَةُ وَالِابْتِسَامَةُ تَنْشُرَانِ الْمَحَبَّةَ.",
    retryText: "اِبْحَثْ عَمَّا يَنْشُرُ الْمَحَبَّةَ فِي الْمَشْهَدِ."
  },
  {
    id: "l08_ex2_q1",
    mission: 2,
    prompt: "اِخْتَرْ مَا يُنَاسِبُ مَشْهَدَ الْأُمِّ.",
    audioKey: "l08_ex2_q1",
    answer: "mother",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/islamic/lesson08/s2.webp",
      options: [
        { id: "mother", label: "كَلِمَةٌ طَيِّبَةٌ وَهَدِيَّةٌ جَمِيلَةٌ.", semantic: "normal" },
        { id: "father", label: "شُكْرُ أَبِي عَلَى مَا يُقَدِّمُهُ.", semantic: "normal" },
        { id: "siblings", label: "مُشَارَكَةُ الْإِخْوَةِ.", semantic: "normal" }
      ]
    },
    successText: "🌟 صَحِيحٌ! هَذَا مَا يُنَاسِبُ مَشْهَدَ الْأُمِّ.",
    retryText: "اُنْظُرْ إِلَى صُورَةِ الْمَشْهَدِ وَتَذَكَّرْ كَلِمَاتِهِ."
  },
  {
    id: "l08_ex2_q2",
    mission: 2,
    prompt: "اِخْتَرْ مَا يُنَاسِبُ مَشْهَدَ الْجَدِّ.",
    audioKey: "l08_ex2_q2",
    answer: "grandfather",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/islamic/lesson08/s4.webp",
      options: [
        { id: "teacher", label: "أَشْكُرُ مَنْ يُعَلِّمُنِي.", semantic: "normal" },
        { id: "grandfather", label: "أَحْتَرِمُ جَدِّي وَأُسْعِدُهُ بِالْكَلَامِ الطَّيِّبِ.", semantic: "normal" },
        { id: "siblings", label: "أُشَارِكُ إِخْوَتِي.", semantic: "normal" }
      ]
    },
    successText: "🌟 أَحْسَنْتَ! هَذَا هُوَ السُّلُوكُ الْمُنَاسِبُ مَعَ جَدِّي.",
    retryText: "تَذَكَّرْ مَضْمُونَ الْمَشْهَدِ الرَّابِعِ."
  },
  {
    id: "l08_ex2_q3",
    mission: 2,
    prompt: "اِخْتَرْ مَا أَفْعَلُهُ مَعَ إِخْوَتِي.",
    audioKey: "l08_ex2_q3",
    answer: "siblings",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/islamic/lesson08/s5.webp",
      options: [
        { id: "ignore", label: "لَا أُشَارِكُهُمْ.", semantic: "normal" },
        { id: "fight", label: "أَتَشَاجَرُ مَعَهُمْ.", semantic: "normal" },
        { id: "siblings", label: "أُشَارِكُهُمْ وَأُقَدِّمُ لَهُمُ الْهَدَايَا الْجَمِيلَةَ.", semantic: "normal" }
      ]
    },
    successText: "🌟 أَحْسَنْتَ! أُحِبُّ إِخْوَتِي وَأُشَارِكُهُمْ.",
    retryText: "تَذَكَّرْ مَشْهَدَ حُبِّ الْإِخْوَةِ."
  },
  {
    id: "l08_ex2_q4",
    mission: 2,
    prompt: "مَنْ أَشْكُرُ فِي هَذَا الْمَشْهَدِ؟",
    audioKey: "l08_ex2_q4",
    answer: "teacher",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/islamic/lesson08/s6.webp",
      options: [
        { id: "teacher", label: "مَنْ يُعَلِّمُنِي.", semantic: "normal" },
        { id: "toy", label: "لُعْبَتِي.", semantic: "normal" },
        { id: "room", label: "غُرْفَتِي.", semantic: "normal" }
      ]
    },
    successText: "🌟 صَحِيحٌ! أَشْكُرُ مَنْ يُعَلِّمُنِي.",
    retryText: "اِقْرَأْ مَعْنَى الْمَشْهَدِ السَّادِسِ."
  },
  {
    id: "l08_ex3_q1",
    mission: 3,
    prompt: "رَتِّبِ الْكَلِمَاتِ، وَابْنِ الْجُمْلَةَ.",
    audioKey: "l08_ex3_q1",
    activityData: {
      kind: "word-order",
      tokens: [
        { id: "mother", label: "أُمِّي", semantic: "normal" },
        { id: "love", label: "أُحِبُّ", semantic: "normal" }
      ],
      correctOrder: ["love", "mother"]
    },
    successText: "🌟 أَحْسَنْتَ! أُحِبُّ أُمِّي.",
    retryText: "اِبْدَأْ بِـ«أُحِبُّ»."
  },
  {
    id: "l08_ex3_q2",
    mission: 3,
    prompt: "رَتِّبِ الْكَلِمَاتِ، وَابْنِ الْجُمْلَةَ.",
    audioKey: "l08_ex3_q2",
    activityData: {
      kind: "word-order",
      tokens: [
        { id: "father", label: "أَبِي", semantic: "normal" },
        { id: "thank", label: "أَشْكُرُ", semantic: "normal" }
      ],
      correctOrder: ["thank", "father"]
    },
    successText: "🌟 صَحِيحٌ! أَشْكُرُ أَبِي.",
    retryText: "اِبْدَأْ بِـ«أَشْكُرُ»."
  },
  {
    id: "l08_ex3_q3",
    mission: 3,
    prompt: "رَتِّبِ الْكَلِمَاتِ، وَابْنِ الْجُمْلَةَ.",
    audioKey: "l08_ex3_q3",
    activityData: {
      kind: "word-order",
      tokens: [
        { id: "grandfather", label: "جَدِّي", semantic: "normal" },
        { id: "respect", label: "أَحْتَرِمُ", semantic: "normal" }
      ],
      correctOrder: ["respect", "grandfather"]
    },
    successText: "🌟 أَحْسَنْتَ! أَحْتَرِمُ جَدِّي.",
    retryText: "اِبْدَأْ بِـ«أَحْتَرِمُ»."
  },
  {
    id: "l08_ex3_q4",
    mission: 3,
    prompt: "رَتِّبِ الْكَلِمَاتِ، وَابْنِ الْجُمْلَةَ.",
    audioKey: "l08_ex3_q4",
    activityData: {
      kind: "word-order",
      tokens: [
        { id: "siblings", label: "إِخْوَتِي", semantic: "normal" },
        { id: "share", label: "أُشَارِكُ", semantic: "normal" }
      ],
      correctOrder: ["share", "siblings"]
    },
    successText: "🌟 مُمْتَازٌ! أُشَارِكُ إِخْوَتِي.",
    retryText: "اِبْدَأْ بِـ«أُشَارِكُ»."
  },
  {
    id: "l08_ex4_q1",
    mission: 4,
    prompt: "أَرَدْتُ أَنْ أُعَبِّرَ عَنْ حُبِّي لِأُمِّي. مَاذَا أَفْعَلُ؟",
    audioKey: "l08_ex4_q1",
    answer: "mother",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/islamic/lesson08/s2.webp",
      options: [
        { id: "ignore", label: "أُهْمِلُهَا.", semantic: "normal" },
        { id: "anger", label: "أَغْضَبُ مِنْهَا.", semantic: "normal" },
        { id: "mother", label: "أَقُولُ كَلِمَةً طَيِّبَةً أَوْ أُقَدِّمُ هَدِيَّةً جَمِيلَةً.", semantic: "normal" }
      ]
    },
    successText: "🌟 أَحْسَنْتَ! هَكَذَا أُعَبِّرُ عَنْ حُبِّي لِأُمِّي.",
    retryText: "تَذَكَّرْ الْمَشْهَدَ الثَّانِي."
  },
  {
    id: "l08_ex4_q2",
    mission: 4,
    prompt: "قَدَّمَ لِي أَبِي شَيْئًا جَمِيلًا. مَاذَا أَفْعَلُ؟",
    audioKey: "l08_ex4_q2",
    answer: "father",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/islamic/lesson08/s3.webp",
      options: [
        { id: "ignore", label: "لَا أَقُولُ شَيْئًا.", semantic: "normal" },
        { id: "leave", label: "أَغَادِرُ.", semantic: "normal" },
        { id: "father", label: "أَشْكُرُهُ وَأُعَبِّرُ لَهُ عَنْ امْتِنَانِي بِأَدَبٍ.", semantic: "normal" }
      ]
    },
    successText: "🌟 صَحِيحٌ! أَشْكُرُ أَبِي وَأُعَبِّرُ لَهُ عَنْ امْتِنَانِي.",
    retryText: "تَذَكَّرْ مَشْهَدَ الْأَبِ."
  },
  {
    id: "l08_ex4_q3",
    mission: 4,
    prompt: "بَعْدَ أَنْ أَحْفَظَ سُورَةَ الْفَاتِحَةِ، مَاذَا أَفْعَلُ؟",
    audioKey: "l08_ex4_q3",
    answer: "fatiha",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/islamic/lesson08/s7.webp",
      options: [
        { id: "fatiha", label: "أُسْمِعُهَا لِعَائِلَتِي.", semantic: "normal" },
        { id: "forget", label: "أَنْسَاهَا.", semantic: "normal" },
        { id: "hide", label: "لَا أُسْمِعُهَا لِأَحَدٍ.", semantic: "normal" }
      ]
    },
    successText: "🌟 أَحْسَنْتَ! أَحْفَظُ سُورَةَ الْفَاتِحَةِ وَأُسْمِعُهَا لِعَائِلَتِي.",
    retryText: "تَذَكَّرْ خُلَاصَةَ الْمَشْهَدِ السَّابِعِ."
  },
  {
    id: "l08_ex4_q4",
    mission: 4,
    prompt: "مَا خُلَاصَةُ دَرْسِ أُحِبُّ عَائِلَتِي؟",
    audioKey: "l08_ex4_q4",
    answer: "goal",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/islamic/lesson08/s7.webp",
      options: [
        { id: "rooms", label: "أَتَعَرَّفُ عَلَى غُرَفِ الْمَنْزِلِ.", semantic: "normal" },
        { id: "goal", label: "أُحِبُّ عَائِلَتِي وَأُعَبِّرُ عَنْ حُبِّي بِالْكَلَامِ الطَّيِّبِ وَالْعَمَلِ الْجَمِيلِ.", semantic: "normal" },
        { id: "numbers", label: "أَجْمَعُ الْأَعْدَادَ.", semantic: "normal" }
      ]
    },
    successText: "🌟 مُمْتَازٌ! هَذِهِ هِيَ فِكْرَةُ الدَّرْسِ.",
    retryText: "تَذَكَّرْ عُنْوَانَ الدَّرْسِ وَأَهْدَافَهُ."
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

export default function IslamicLesson08ExercisesV2() {
  return (
    <UnifiedLessonExercisesV2
      lessonKey="islamic-w01-u08"
      audioBase="/audio/v2/islamic/lesson08/exercises"
      questions={questions}
      missionTitles={missionTitles}
      missionCount={4}
      completionMessage="أَحْسَنْتَ يَا فَاضِلُ! أَتْمَمْتَ نَشَاطَاتِ دَرْسِ أُحِبُّ عَائِلَتِي بِنَجَاحٍ، وَتَعَلَّمْتَ أَنْ تُعَبِّرَ عَنْ حُبِّكَ لِعَائِلَتِكَ بِالْكَلَامِ الطَّيِّبِ وَالْعَمَلِ الْجَمِيلِ، وَأَنْ تَشْكُرَ أَبَاكَ وَأُمَّكَ وَمَنْ يُعَلِّمُكَ، وَأَنْ تُحِبَّ جَدَّكَ وَإِخْوَتَكَ وَتَحْتَرِمَهُمْ."
      nextLessonKey="civics-w01-u09"
      nextPath="/lesson-v2/civics/lesson09"
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
