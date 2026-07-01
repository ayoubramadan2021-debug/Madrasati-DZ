import type { RankOrderItem } from "../exercises-v2/RankOrderExerciseV2";

export const LESSON_17_EXERCISE_2_AUDIO_BASE = "/audio/lesson_17_exercise2";

export const LESSON_17_EXERCISE_2: RankOrderItem[] = [
  {
    scene_image: "/lessons/v2/lesson17-info/s3.webp",
    question_audio_key: "q1",
    title: "أَسْتَخْرِجُ مِنَ البِطَاقَةِ",
    instruction: "البِطَاقَةُ تَقُولُ: الِاسْمُ رَحْمَةُ، العُمْرُ 6 سَنَوَاتٍ، اللَّوْنُ المُفَضَّلُ وَرْدِيٌّ، اللُّعْبَةُ المُفَضَّلَةُ المُكَعَّبَاتُ.",
    question: "كَمْ عُمْرُ رَحْمَةَ؟",
    mode: "pickRank",
    correct: "6 سَنَوَاتٍ",
    options: ["5 سَنَوَاتٍ", "7 سَنَوَاتٍ", "6 سَنَوَاتٍ", "8 سَنَوَاتٍ"],
  },
  {
    scene_image: "/lessons/v2/lesson17-info/s3.webp",
    question_audio_key: "q2",
    title: "أَسْتَخْرِجُ مِنَ البِطَاقَةِ",
    instruction: "أَقْرَأُ البِطَاقَةَ بِهُدُوءٍ ثُمَّ أُجِيبُ.",
    question: "مَا اسْمُ الطِّفْلَةِ فِي البِطَاقَةِ؟",
    mode: "pickRank",
    correct: "رَحْمَةُ",
    options: ["سَلْمَى", "لِينَا", "هِبَةُ", "رَحْمَةُ"],
  },
  {
    scene_image: "/lessons/v2/lesson17-info/s3.webp",
    question_audio_key: "q3",
    title: "أَسْتَخْرِجُ مِنَ البِطَاقَةِ",
    instruction: "أَبْحَثُ عَنْ كَلِمَةِ اللَّوْنِ.",
    question: "مَا اللَّوْنُ المُفَضَّلُ؟",
    mode: "pickRank",
    correct: "وَرْدِيٌّ",
    options: ["أَزْرَقُ", "وَرْدِيٌّ", "أَخْضَرُ", "أَصْفَرُ"],
  },
  {
    scene_image: "/lessons/v2/lesson17-info/s3.webp",
    question_audio_key: "q4",
    title: "أَسْتَخْرِجُ مِنَ البِطَاقَةِ",
    instruction: "أَقْرَأُ البِطَاقَةَ وَلَا أُخَمِّنُ.",
    question: "مَا اللُّعْبَةُ المُفَضَّلَةُ؟",
    mode: "pickRank",
    correct: "المُكَعَّبَاتُ",
    options: ["المُكَعَّبَاتُ", "الكُرَةُ", "السَّيَّارَةُ", "الدُّمْيَةُ"],
  },
  {
    scene_image: "/lessons/v2/lesson17-info/s3.webp",
    question_audio_key: "q5",
    title: "أَسْتَخْرِجُ مِنَ البِطَاقَةِ",
    instruction: "أَتَذَكَّرُ مَكَانَ الجَوَابِ.",
    question: "أَيْنَ أَبْحَثُ عَنِ الجَوَابِ؟",
    mode: "pickRank",
    correct: "فِي البِطَاقَةِ",
    options: ["فِي الحَدِيقَةِ", "فِي الحَقِيبَةِ", "فِي البِطَاقَةِ", "فِي المَطْبَخِ"],
  },
];
