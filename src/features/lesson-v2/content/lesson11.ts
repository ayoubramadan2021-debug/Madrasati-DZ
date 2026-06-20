// الدرس 11: ساحَتي مَلْعَبي — أَنا أَتَحَرَّكُ وَأَتَنَقَّل (المشي/الجري/القفز/التسلّق...)
// الراوي: خليل (ar-DZ-IsmaelNeural). مشاهد سرد بلا عدّ.
export const LESSON_11_CONTENT = {
  metadata: {
    title_ar: "ساحَتي مَلْعَبي (أَتَحَرَّكُ وَأَتَنَقَّل)",
    title_fr: "Ma cour de jeux (je bouge et je me deplace)",
    subject: "math",
    grade: 1,
    sort_order: 11,
    template_version: 2,
  },
  audio_base: "/audio/lesson_11_move",
  scenes: [
    { scene_image: "/lessons/v2/lesson11-move/s1.webp", audio_key: "s1_intro" },
    { scene_image: "/lessons/v2/lesson11-move/s2.webp", audio_key: "s2_walk" },
    { scene_image: "/lessons/v2/lesson11-move/s3.webp", audio_key: "s3_run" },
    { scene_image: "/lessons/v2/lesson11-move/s4.webp", audio_key: "s4_jump" },
    { scene_image: "/lessons/v2/lesson11-move/s5.webp", audio_key: "s5_climb" },
    {
      scene_image: "/lessons/v2/lesson11-move/s6.webp",
      audio_key: "s6_closing",
      is_closing: true,
      cta_text: "هَيَّا إِلَى التَّمَارِين ←",
    },
  ],
};
