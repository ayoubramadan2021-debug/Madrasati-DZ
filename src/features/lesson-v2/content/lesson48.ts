export const lesson48CanonicalText = {
  s1_intro:
    "مَرْحَبًا أَحِبَّائِي! سَنَكْتَشِفُ اليَوْمَ الأَعْدَادَ مِنْ عِشْرِينَ إِلَى تِسْعَةٍ وَثَلَاثِينَ، وَسَنَتَعَلَّمُ كَيْفَ نَقْرَؤُهَا وَنَكْتُبُهَا.",

  s2_tens_ones:
    "يَتَكَوَّنُ العَدَدُ مِنْ عَشَرَاتٍ وَوَحَدَاتٍ. فَاثْنَانِ وَعِشْرُونَ فِيهِ عَشَرَتَانِ وَوَحْدَتَانِ، وَثَمَانِيَةٌ وَعِشْرُونَ فِيهِ عَشَرَتَانِ وَثَمَانِي وَحَدَاتٍ.",

  s3_read_numbers:
    "نَقْرَأُ الأَعْدَادَ بِالنَّظَرِ إِلَى العَشَرَاتِ وَالوَحَدَاتِ: اثْنَانِ وَعِشْرُونَ، ثَمَانِيَةٌ وَعِشْرُونَ، ثَلَاثَةٌ وَثَلَاثُونَ، وَسَبْعَةٌ وَثَلَاثُونَ.",

  s4_match_number_name:
    "نُطَابِقُ كُلَّ عَدَدٍ مَعَ كِتَابَتِهِ بِالحُرُوفِ. فَبِطَاقَةُ أَرْبَعَةٍ وَثَلَاثِينَ تُطَابِقُ العَدَدَ أَرْبَعَةً وَثَلَاثِينَ، وَبِطَاقَةُ ثَمَانِيَةٍ وَعِشْرِينَ تُطَابِقُ العَدَدَ ثَمَانِيَةً وَعِشْرِينَ.",

  s5_number_sequence:
    "نُكْمِلُ الأَعْدَادَ بِالتَّرْتِيبِ. بَعْدَ سَبْعَةٍ وَعِشْرِينَ يَأْتِي ثَمَانِيَةٌ وَعِشْرُونَ، ثُمَّ تِسْعَةٌ وَعِشْرُونَ، ثُمَّ ثَلَاثُونَ، ثُمَّ وَاحِدٌ وَثَلَاثُونَ.",

  s6_closing:
    "أَحْسَنْتُمْ! نَسْتَطِيعُ الآنَ قِرَاءَةَ الأَعْدَادِ إِلَى تِسْعَةٍ وَثَلَاثِينَ، وَكِتَابَتَهَا، وَتَفْكِيكَهَا إِلَى عَشَرَاتٍ وَوَحَدَاتٍ، وَإِكْمَالَ تَرْتِيبِهَا.",
} as const;

export const lesson48 = {
  id: "lesson48",
  lesson_number: 48,
  title: "الأَعْدَادُ إِلَى 39 (1)",
  title_fr: "Les nombres jusqu’à 39 (1)",
  subject: "math",
  teacher: "khalil",

  audio_base:
    "/audio/teachers/khalil/lesson_48_numbers_to_39",

  exercisePath: "/lesson-v2/48/exercises",

  nextLessonKey: "lesson49",

  objectives: [
    "قراءة الأعداد من 20 إلى 39.",
    "التعرف على العشرات والوحدات.",
    "مطابقة العدد مع كتابته بالحروف.",
    "تفكيك العدد إلى عشرات ووحدات.",
    "إكمال متتالية عددية تصاعدية.",
  ],

  slides: [
    {
      scene: 1,
      key: "s1_intro",
      audio_key: "s1_intro",
      speaker: "khalil",
      image:
        "/lessons/v2/lesson48-numbers-to-39/s1.webp",
      scene_image:
        "/lessons/v2/lesson48-numbers-to-39/s1.webp",
      text: lesson48CanonicalText.s1_intro,
    },
    {
      scene: 2,
      key: "s2_tens_ones",
      audio_key: "s2_tens_ones",
      speaker: "khalil",
      image:
        "/lessons/v2/lesson48-numbers-to-39/s2.webp",
      scene_image:
        "/lessons/v2/lesson48-numbers-to-39/s2.webp",
      text: lesson48CanonicalText.s2_tens_ones,
    },
    {
      scene: 3,
      key: "s3_read_numbers",
      audio_key: "s3_read_numbers",
      speaker: "khalil",
      image:
        "/lessons/v2/lesson48-numbers-to-39/s3.webp",
      scene_image:
        "/lessons/v2/lesson48-numbers-to-39/s3.webp",
      text: lesson48CanonicalText.s3_read_numbers,
    },
    {
      scene: 4,
      key: "s4_match_number_name",
      audio_key: "s4_match_number_name",
      speaker: "khalil",
      image:
        "/lessons/v2/lesson48-numbers-to-39/s4.webp",
      scene_image:
        "/lessons/v2/lesson48-numbers-to-39/s4.webp",
      text:
        lesson48CanonicalText.s4_match_number_name,
    },
    {
      scene: 5,
      key: "s5_number_sequence",
      audio_key: "s5_number_sequence",
      speaker: "khalil",
      image:
        "/lessons/v2/lesson48-numbers-to-39/s5.webp",
      scene_image:
        "/lessons/v2/lesson48-numbers-to-39/s5.webp",
      text:
        lesson48CanonicalText.s5_number_sequence,
    },
    {
      scene: 6,
      key: "s6_closing",
      audio_key: "s6_closing",
      speaker: "khalil",
      image:
        "/lessons/v2/lesson48-numbers-to-39/s6.webp",
      scene_image:
        "/lessons/v2/lesson48-numbers-to-39/s6.webp",
      text: lesson48CanonicalText.s6_closing,
      is_closing: true,
      cta_text: "هَيَّا نَتَدَرَّبْ",
    },
  ],
} as const;

export default lesson48;
