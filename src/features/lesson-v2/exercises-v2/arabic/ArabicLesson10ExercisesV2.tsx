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
      id: "l10_ex1_q1",
      mission: 1,
      prompt: "مَا عُنْوَانُ الْمَحْفُوظَاتِ الَّتِي نَتَعَلَّمُهَا؟",
      audioKey: "l10_ex1_q1",
      answer: "l10_ex1_q1_o1",
      activityData: {
        kind: "sentence-choice",
        image: "/lessons/v2/arabic/lesson10/s1.webp",
        options: [
          { id: "l10_ex1_q1_o1", label: "قَسَمًا", semantic: "normal" },
          { id: "l10_ex1_q1_o2", label: "التَّحِيَّةُ وَرَدُّهَا", semantic: "normal" },
          { id: "l10_ex1_q1_o3", label: "أُحِبُّ عَائِلَتِي", semantic: "normal" }
        ]
      },
      successText: "🌟 صَحِيحٌ! عُنْوَانُ الْمَحْفُوظَاتِ هُوَ: قَسَمًا.",
      retryText: "تَذَكَّرْ عُنْوَانَ الْمَحْفُوظَاتِ."
    },
{
      id: "l10_ex1_q2",
      mission: 1,
      prompt: "مَا الرَّمْزُ الْوَطَنِيُّ الَّذِي نَحْتَرِمُهُ فِي هَذَا الدَّرْسِ؟",
      audioKey: "l10_ex1_q2",
      answer: "l10_ex1_q2_o2",
      activityData: {
        kind: "sentence-choice",
        image: "/lessons/v2/arabic/lesson10/s2.webp",
        options: [
          { id: "l10_ex1_q2_o1", label: "الْقَلَمُ", semantic: "normal" },
          { id: "l10_ex1_q2_o2", label: "الْعَلَمُ الْجَزَائِرِيُّ", semantic: "normal" },
          { id: "l10_ex1_q2_o3", label: "اللُّعْبَةُ", semantic: "normal" }
        ]
      },
      successText: "🌟 أَحْسَنْتَ! الْعَلَمُ الْجَزَائِرِيُّ رَمْزٌ وَطَنِيٌّ.",
      retryText: "اُنْظُرْ إِلَى الْمَشْهَدِ وَاخْتَرِ الرَّمْزَ الْوَطَنِيَّ."
    },
{
      id: "l10_ex1_q3",
      mission: 1,
      prompt: "كَيْفَ أَقِفُ عِنْدَ الِاسْتِمَاعِ إِلَى النَّشِيدِ؟",
      audioKey: "l10_ex1_q3",
      answer: "l10_ex1_q3_o3",
      activityData: {
        kind: "sentence-choice",
        image: "/lessons/v2/arabic/lesson10/s2.webp",
        options: [
          { id: "l10_ex1_q3_o1", label: "أَتَكَلَّمُ مَعَ زَمِيلِي.", semantic: "normal" },
          { id: "l10_ex1_q3_o2", label: "أَلْعَبُ وَأَضْحَكُ.", semantic: "normal" },
          { id: "l10_ex1_q3_o3", label: "أَقِفُ بِاحْتِرَامٍ وَهُدُوءٍ.", semantic: "normal" }
        ]
      },
      successText: "🌟 مُمْتَازٌ! أَقِفُ بِاحْتِرَامٍ وَهُدُوءٍ.",
      retryText: "تَذَكَّرْ كَيْفَ نَقِفُ عِنْدَ سَمَاعِ النَّشِيدِ."
    },
{
      id: "l10_ex1_q4",
      mission: 1,
      prompt: "كَيْفَ أُؤَدِّي النَّشِيدَ مَعَ زُمَلَائِي؟",
      audioKey: "l10_ex1_q4",
      answer: "l10_ex1_q4_o1",
      activityData: {
        kind: "sentence-choice",
        image: "/lessons/v2/arabic/lesson10/s4.webp",
        options: [
          { id: "l10_ex1_q4_o1", label: "أُرَدِّدُهُ بِثِقَةٍ وَاحْتِرَامٍ.", semantic: "normal" },
          { id: "l10_ex1_q4_o2", label: "أُقَاطِعُ زُمَلَائِي.", semantic: "normal" },
          { id: "l10_ex1_q4_o3", label: "أَتْرُكُ الْمَجْمُوعَةَ.", semantic: "normal" }
        ]
      },
      successText: "🌟 أَحْسَنْتَ! أُرَدِّدُ النَّشِيدَ مَعَ زُمَلَائِي بِثِقَةٍ وَاحْتِرَامٍ.",
      retryText: "تَذَكَّرْ كَيْفَ نُؤَدِّي النَّشِيدَ مَعَ الْمَجْمُوعَةِ."
    },
{
    id: "l10_ex2_q1",
    mission: 2,
    prompt: "أَكْمِلْ: قَسَمًا بِالنَّازِلَاتِ ...",
    audioKey: "l10_ex2_q1",
    answer: "l10_ex2_q1_o2",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/arabic/lesson10/s3.webp",
      options: [
        { id: "l10_ex2_q1_o1", label: "الطَّاهِرَاتِ", semantic: "normal" },
        { id: "l10_ex2_q1_o2", label: "الْمَاحِقَاتِ", semantic: "normal" },
        { id: "l10_ex2_q1_o3", label: "الشَّاهِقَاتِ", semantic: "normal" }
      ]
    },
    successText: "🌟 صَحِيحٌ! الْمَاحِقَاتِ.",
    retryText: "حَاوِلْ مُجَدَّدًا."
  },
{
    id: "l10_ex2_q2",
    mission: 2,
    prompt: "لَوِّنِ الْكَلِمَةَ الصَّحِيحَةَ: الزَّاكِيَاتِ ...",
    audioKey: "l10_ex2_q2",
    answer: "l10_ex2_q2_o1",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/arabic/lesson10/s3.webp",
      options: [
        { id: "l10_ex2_q2_o1", label: "الطَّاهِرَاتِ", semantic: "normal" },
        { id: "l10_ex2_q2_o2", label: "الشَّاهِقَاتِ", semantic: "normal" },
        { id: "l10_ex2_q2_o3", label: "الْخَافِقَاتِ", semantic: "normal" }
      ]
    },
    successText: "🌟 أَحْسَنْتَ! الطَّاهِرَاتِ.",
    retryText: "حَاوِلْ مُجَدَّدًا."
  },
{
    id: "l10_ex2_q3",
    mission: 2,
    prompt: "رَتِّبِ الْكَلِمَتَيْنِ.",
    audioKey: "l10_ex2_q3",
    activityData: {
      kind: "word-order",
      tokens: [
        { id: "l10_ex2_q3_t2", label: "ثُرْنَا", semantic: "normal" },
        { id: "l10_ex2_q3_t1", label: "نَحْنُ", semantic: "normal" }
      ],
      correctOrder: ["l10_ex2_q3_t1", "l10_ex2_q3_t2"]
    },
    successText: "🌟 مُمْتَازٌ! نَحْنُ ثُرْنَا.",
    retryText: "حَاوِلْ مِنْ جَدِيدٍ."
  },
{
    id: "l10_ex2_q4",
    mission: 2,
    prompt: "هَلْ هَذِهِ الْعِبَارَةُ صَحِيحَةٌ؟ فِي الْجِبَالِ الشَّامِخَاتِ الشَّاهِقَاتِ.",
    audioKey: "l10_ex2_q4",
    answer: "l10_ex2_q4_o2",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/arabic/lesson10/s3.webp",
      options: [
        { id: "l10_ex2_q4_o1", label: "لَا", semantic: "normal" },
        { id: "l10_ex2_q4_o2", label: "نَعَمْ", semantic: "normal" }
      ]
    },
    successText: "🌟 أَحْسَنْتَ! نَعَمْ.",
    retryText: "حَاوِلْ مُجَدَّدًا."
  },
{
    id: "l10_ex3_q1",
    mission: 3,
    prompt: "اِخْتَرِ الْكَلِمَةَ الَّتِي تَأْتِي مَعَ «الشَّامِخَاتِ».",
    audioKey: "l10_ex3_q1",
    answer: "l10_ex3_q1_o3",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/arabic/lesson10/s3.webp",
      options: [
        { id: "l10_ex3_q1_o1", label: "الْمَاحِقَاتِ", semantic: "normal" },
        { id: "l10_ex3_q1_o2", label: "الطَّاهِرَاتِ", semantic: "normal" },
        { id: "l10_ex3_q1_o3", label: "الشَّاهِقَاتِ", semantic: "normal" }
      ]
    },
    successText: "🌟 صَحِيحٌ! الشَّامِخَاتِ الشَّاهِقَاتِ.",
    retryText: "حَاوِلْ مُجَدَّدًا."
  },
{
    id: "l10_ex3_q2",
    mission: 3,
    prompt: "أَكْمِلْ: وَالْبُنُودِ اللَّامِعَاتِ ...",
    audioKey: "l10_ex3_q2",
    answer: "l10_ex3_q2_o1",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/arabic/lesson10/s3.webp",
      options: [
        { id: "l10_ex3_q2_o1", label: "الْخَافِقَاتِ", semantic: "normal" },
        { id: "l10_ex3_q2_o2", label: "الشَّاهِقَاتِ", semantic: "normal" },
        { id: "l10_ex3_q2_o3", label: "الطَّاهِرَاتِ", semantic: "normal" }
      ]
    },
    successText: "🌟 أَحْسَنْتَ! الْخَافِقَاتِ.",
    retryText: "حَاوِلْ مُجَدَّدًا."
  },
{
    id: "l10_ex3_q3",
    mission: 3,
    prompt: "رَتِّبِ الْكَلِمَتَيْنِ.",
    audioKey: "l10_ex3_q3",
    activityData: {
      kind: "word-order",
      tokens: [
        { id: "l10_ex3_q3_t2", label: "ثُرْنَا", semantic: "normal" },
        { id: "l10_ex3_q3_t1", label: "نَحْنُ", semantic: "normal" }
      ],
      correctOrder: ["l10_ex3_q3_t1", "l10_ex3_q3_t2"]
    },
    successText: "🌟 مُمْتَازٌ! نَحْنُ ثُرْنَا.",
    retryText: "حَاوِلْ مِنْ جَدِيدٍ."
  },
{
    id: "l10_ex3_q4",
    mission: 3,
    prompt: "رَتِّبِ الْكَلِمَاتِ الثَّلَاثَ.",
    audioKey: "l10_ex3_q4",
    activityData: {
      kind: "word-order",
      tokens: [
        { id: "l10_ex3_q4_t2", label: "تَحْيَا", semantic: "normal" },
        { id: "l10_ex3_q4_t3", label: "الْجَزَائِرُ", semantic: "normal" },
        { id: "l10_ex3_q4_t1", label: "أَنْ", semantic: "normal" }
      ],
      correctOrder: ["l10_ex3_q4_t1", "l10_ex3_q4_t2", "l10_ex3_q4_t3"]
    },
    successText: "🌟 مُمْتَازٌ! أَنْ تَحْيَا الْجَزَائِرُ.",
    retryText: "حَاوِلْ مِنْ جَدِيدٍ."
  },
{
    id: "l10_ex4_q1",
    mission: 4,
    prompt: "«قَسَمًا بِالنَّازِلَاتِ» مِنَ الْبَيْتِ رَقْم:",
    audioKey: "l10_ex4_q1",
    answer: "l10_ex4_q1_o3",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/arabic/lesson10/s3.webp",
      options: [
        { id: "l10_ex4_q1_o1", label: "2", semantic: "normal" },
        { id: "l10_ex4_q1_o2", label: "3", semantic: "normal" },
        { id: "l10_ex4_q1_o3", label: "1", semantic: "normal" }
      ]
    },
    successText: "🌟 صَحِيحٌ! رَقْمُهُ 1.",
    retryText: "حَاوِلْ مُجَدَّدًا."
  },
{
    id: "l10_ex4_q2",
    mission: 4,
    prompt: "«وَالدِّمَاءِ الزَّاكِيَاتِ» مِنَ الْبَيْتِ رَقْم:",
    audioKey: "l10_ex4_q2",
    answer: "l10_ex4_q2_o1",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/arabic/lesson10/s3.webp",
      options: [
        { id: "l10_ex4_q2_o1", label: "2", semantic: "normal" },
        { id: "l10_ex4_q2_o2", label: "1", semantic: "normal" },
        { id: "l10_ex4_q2_o3", label: "3", semantic: "normal" }
      ]
    },
    successText: "🌟 صَحِيحٌ! رَقْمُهُ 2.",
    retryText: "حَاوِلْ مُجَدَّدًا."
  },
{
    id: "l10_ex4_q3",
    mission: 4,
    prompt: "«وَالْبُنُودِ اللَّامِعَاتِ» مِنَ الْبَيْتِ رَقْم:",
    audioKey: "l10_ex4_q3",
    answer: "l10_ex4_q3_o2",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/arabic/lesson10/s3.webp",
      options: [
        { id: "l10_ex4_q3_o1", label: "1", semantic: "normal" },
        { id: "l10_ex4_q3_o2", label: "3", semantic: "normal" },
        { id: "l10_ex4_q3_o3", label: "2", semantic: "normal" }
      ]
    },
    successText: "🌟 صَحِيحٌ! رَقْمُهُ 3.",
    retryText: "حَاوِلْ مُجَدَّدًا."
  },
{
    id: "l10_ex4_q4",
    mission: 4,
    prompt: "لَوِّنْ كَلِمَةَ الْخِتَامِ.",
    audioKey: "l10_ex4_q4",
    answer: "l10_ex4_q4_o3",
    activityData: {
      kind: "sentence-choice",
      image: "/lessons/v2/arabic/lesson10/s3.webp",
      options: [
        { id: "l10_ex4_q4_o1", label: "الْجَزَائِرُ", semantic: "normal" },
        { id: "l10_ex4_q4_o2", label: "مَمَاتٌ", semantic: "normal" },
        { id: "l10_ex4_q4_o3", label: "فَاشْهَدُوا", semantic: "normal" }
      ]
    },
    successText: "🌟 أَحْسَنْتَ! فَاشْهَدُوا.",
    retryText: "حَاوِلْ مُجَدَّدًا."
  }
];

const missionTitles = {1:"أَفْهَمُ مَوْقِفَ النَّشِيدِ",2:"أُكْمِلُ وَأَتَعَرَّفُ",3:"أَرْبِطُ وَأَرَتِّبُ",4:"أُثَبِّتُ حِفْظِي"};

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

export default function ArabicLesson10ExercisesV2() {
  return (
    <UnifiedLessonExercisesV2
      lessonKey="arabic-w01-u10"
      audioBase="/audio/v2/arabic/lesson10/exercises"
      questions={questions}
      missionTitles={missionTitles}
      missionCount={4}
      completionMessage="أَحْسَنْتَ يَا فَاضِلُ! أَتْمَمْتَ نَشَاطَاتِ قَسَمًا، وَتَعَرَّفْتَ عَلَى جُمَلٍ قَصِيرَةٍ مِنَ النَّشِيدِ، وَرَتَّبْتَ كَلِمَاتِهَا وَثَبَّتَّ حِفْظَكَ."
      nextLessonKey="arabic-w01-u11"
      nextPath="/lesson-v2/arabic/lesson11"
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
