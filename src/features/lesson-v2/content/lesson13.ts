export const LESSON_13_CONTENT = {
  metadata: {
    title_ar: "أَعُدُّ الأَشْيَاءَ (الأَعْدَادُ 1-10)",
    title_fr: "Je compte les choses (nombres 1-10)",
    subject: "math",
    grade: 1,
    sort_order: 13,
    template_version: 2,
  },

  audio_base: "/audio/lesson_13_counting",

  scenes: [
    {
      scene_image: "/lessons/v2/lesson13-counting/s1.webp",
      audio_key: "s1_intro",
    },

    {
      scene_image: "/lessons/v2/lesson13-counting/s2.webp",
      audio_key: "s2_three",
      items_emoji_list: ["🟥", "🟨", "🟦"],
      count_word_indices: [8, 9, 10],

      items_count: 3,
    },

    {
      scene_image: "/lessons/v2/lesson13-counting/s3.webp",
      audio_key: "s3_five",
      items_emoji_list: ["🔴", "🔵", "🟢", "🟡", "🟣"],
      count_word_indices: [6, 7, 8, 9, 10],

      items_count: 5,
    },

    {
      scene_image: "/lessons/v2/lesson13-counting/s4.webp",
      audio_key: "s4_eight",

      items_count: 8,
      items_emoji_list: [
        "🧸", "🧸", "🧸", "🧸",
        "🧸", "🧸", "🧸", "🧸"
      ],
      count_word_indices: [8, 9, 10, 11, 12, 13, 14, 15],
    },

    {
      scene_image: "/lessons/v2/lesson13-counting/s5.webp",
      audio_key: "s5_ten",
      items_emoji_list: ["🎈", "🎈", "🎈", "🎈", "🎈", "🎈", "🎈", "🎈", "🎈", "🎈"],
      count_word_indices: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],

      items_count: 10,
    },

    {
      scene_image: "/lessons/v2/lesson13-counting/s6.webp",
      audio_key: "s6_closing",
      is_closing: true,
      cta_text: "هَيَّا إِلَى التَّمَارِين ←",
    },
  ],
};
