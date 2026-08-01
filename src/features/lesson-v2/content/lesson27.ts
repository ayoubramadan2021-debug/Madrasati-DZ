export const LESSON_27_CONTENT = {
  id: "lesson27",
  title: "الرَّمْزَانِ + وَ =",
  subtitle: "أَتَعَلَّمُ مَعْنَى زَائِد وَيُسَاوِي",
  teacher: "taline",
  audio_base: "/audio/teachers/taline/lesson_27_plus_equals",

  scenes: [
    {
      id: "s1_intro",
      scene_image: "/lessons/v2/lesson27-plus-equals/s1.webp",
      audio_key: "s1_intro",
      text: "مَرْحَبًا أَحِبَّائِي! اليَوْمَ نَتَعَلَّمُ رَمْزَيْنِ جَدِيدَيْنِ فِي الحِسَابْ: زَائِد وَيُسَاوِي.",
    },
    {
      id: "s2_plus_meaning",
      scene_image: "/lessons/v2/lesson27-plus-equals/s2.webp",
      audio_key: "s2_plus_meaning",
      text: "عِنْدَنَا أَرْبَعُ زَهْرَاتٍ حَمْرَاءَ، وَأَضَفْنَا ثَلَاثَ زَهْرَاتٍ بَيْضَاءَ. نَسْتَعْمِلُ الرَّمْزَ زَائِد.",
      items_count: 1,
      items_emoji: "➕",
      count_word_indices: [10],
    },
    {
      id: "s3_equals_meaning",
      scene_image: "/lessons/v2/lesson27-plus-equals/s3.webp",
      audio_key: "s3_equals_meaning",
      text: "بَعْدَ أَنْ جَمَعْنَا الزَّهْرَاتِ، نَحْسِبُ العَدَدَ الكُلِّيَّ. أَرْبَعَةٌ زَائِدُ أَرْبَعَةٍ يُسَاوِي ثَمَانِيَةً.",
      items_count: 1,
      items_emoji: "=",
      count_word_indices: [10],
    },
    {
      id: "s4_story_balls",
      scene_image: "/lessons/v2/lesson27-plus-equals/s4.webp",
      audio_key: "s4_story_balls",
      text: "أَرْبَعُ كُرَاتٍ زَائِدُ ثَلَاثِ كُرَاتٍ يُسَاوِي سَبْعَ كُرَاتٍ.",
    },
    {
      id: "s5_write_operation",
      scene_image: "/lessons/v2/lesson27-plus-equals/s5.webp",
      audio_key: "s5_write_operation",
      text: "نَجْمَعُ أَرْبَعَ زَهْرَاتٍ حَمْرَاءَ مَعَ ثَلَاثِ زَهْرَاتٍ بَيْضَاءَ، فَيُصْبِحُ العَدَدُ الكُلِّيُّ سَبْعَ زَهْرَاتٍ.",
    },
    {
      id: "s6_closing",
      scene_image: "/lessons/v2/lesson27-plus-equals/s6.webp",
      audio_key: "s6_closing",
      text: "تَعَلَّمْنَا أَنَّ الرَّمْزَ زَائِد يَعْنِي نُضِيفُ، وَالرَّمْزَ يُسَاوِي يَدُلُّ عَلَى النَّتِيجَةِ.",
      is_closing: true,
      cta_text: "هَيَّا نَتَدَرَّب ←",
    },
  ],
} as const;
