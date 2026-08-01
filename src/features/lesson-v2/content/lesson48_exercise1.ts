import type {
  Lesson48Item,
} from "./lesson48_types";

const question =
  "لَاحِظِ العَشَرَاتِ وَالوَحَدَاتِ، ثُمَّ اخْتَرِ العَدَدَ الصَّحِيحَ.";

export const lesson48Exercise1:
  Lesson48Item[] = [
    {
      id: "l48_e1_q1",
      title: "أُرَكِّبُ العَدَدَ",
      question,
      question_audio_key:
        "ex1_build_number",
      mode: "tens-ones",
      tens: 2,
      ones: 2,
      options: [
        {
          id: "22",
          label: "22",
        },
        {
          id: "20",
          label: "20",
        },
        {
          id: "24",
          label: "24",
        },
      ],
      answer: "22",
    },
    {
      id: "l48_e1_q2",
      title: "أُرَكِّبُ العَدَدَ",
      question,
      question_audio_key:
        "ex1_build_number",
      mode: "tens-ones",
      tens: 2,
      ones: 8,
      options: [
        {
          id: "26",
          label: "26",
        },
        {
          id: "28",
          label: "28",
        },
        {
          id: "38",
          label: "38",
        },
      ],
      answer: "28",
    },
    {
      id: "l48_e1_q3",
      title: "أُرَكِّبُ العَدَدَ",
      question,
      question_audio_key:
        "ex1_build_number",
      mode: "tens-ones",
      tens: 3,
      ones: 3,
      options: [
        {
          id: "23",
          label: "23",
        },
        {
          id: "30",
          label: "30",
        },
        {
          id: "33",
          label: "33",
        },
      ],
      answer: "33",
    },
    {
      id: "l48_e1_q4",
      title: "أُرَكِّبُ العَدَدَ",
      question,
      question_audio_key:
        "ex1_build_number",
      mode: "tens-ones",
      tens: 3,
      ones: 9,
      options: [
        {
          id: "36",
          label: "36",
        },
        {
          id: "39",
          label: "39",
        },
        {
          id: "29",
          label: "29",
        },
      ],
      answer: "39",
    },
  ];
