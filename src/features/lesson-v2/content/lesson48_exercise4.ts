import type {
  Lesson48Item,
} from "./lesson48_types";

const question =
  "لَاحِظِ العَدَدَ، ثُمَّ اخْتَرْ تَفْكِيكَهُ الصَّحِيحَ إِلَى عَشَرَاتٍ وَوَحَدَاتٍ.";

export const lesson48Exercise4:
  Lesson48Item[] = [
    {
      id: "l48_e4_q1",
      title: "أُفَكِّكُ العَدَدَ",
      question,
      question_audio_key:
        "ex4_decompose_number",
      mode: "number-decomposition",
      number: 24,
      options: [
        {
          id: "2-4",
          label:
            "عَشَرَتَانِ وَأَرْبَعُ وَحَدَاتٍ",
          tens: 2,
          ones: 4,
        },
        {
          id: "3-4",
          label:
            "ثَلَاثُ عَشَرَاتٍ وَأَرْبَعُ وَحَدَاتٍ",
          tens: 3,
          ones: 4,
        },
        {
          id: "2-6",
          label:
            "عَشَرَتَانِ وَسِتُّ وَحَدَاتٍ",
          tens: 2,
          ones: 6,
        },
      ],
      answer: "2-4",
    },
    {
      id: "l48_e4_q2",
      title: "أُفَكِّكُ العَدَدَ",
      question,
      question_audio_key:
        "ex4_decompose_number",
      mode: "number-decomposition",
      number: 29,
      options: [
        {
          id: "3-9",
          label:
            "ثَلَاثُ عَشَرَاتٍ وَتِسْعُ وَحَدَاتٍ",
          tens: 3,
          ones: 9,
        },
        {
          id: "2-9",
          label:
            "عَشَرَتَانِ وَتِسْعُ وَحَدَاتٍ",
          tens: 2,
          ones: 9,
        },
        {
          id: "2-7",
          label:
            "عَشَرَتَانِ وَسَبْعُ وَحَدَاتٍ",
          tens: 2,
          ones: 7,
        },
      ],
      answer: "2-9",
    },
    {
      id: "l48_e4_q3",
      title: "أُفَكِّكُ العَدَدَ",
      question,
      question_audio_key:
        "ex4_decompose_number",
      mode: "number-decomposition",
      number: 34,
      options: [
        {
          id: "2-4",
          label:
            "عَشَرَتَانِ وَأَرْبَعُ وَحَدَاتٍ",
          tens: 2,
          ones: 4,
        },
        {
          id: "3-6",
          label:
            "ثَلَاثُ عَشَرَاتٍ وَسِتُّ وَحَدَاتٍ",
          tens: 3,
          ones: 6,
        },
        {
          id: "3-4",
          label:
            "ثَلَاثُ عَشَرَاتٍ وَأَرْبَعُ وَحَدَاتٍ",
          tens: 3,
          ones: 4,
        },
      ],
      answer: "3-4",
    },
    {
      id: "l48_e4_q4",
      title: "أُفَكِّكُ العَدَدَ",
      question,
      question_audio_key:
        "ex4_decompose_number",
      mode: "number-decomposition",
      number: 38,
      options: [
        {
          id: "3-8",
          label:
            "ثَلَاثُ عَشَرَاتٍ وَثَمَانِي وَحَدَاتٍ",
          tens: 3,
          ones: 8,
        },
        {
          id: "2-8",
          label:
            "عَشَرَتَانِ وَثَمَانِي وَحَدَاتٍ",
          tens: 2,
          ones: 8,
        },
        {
          id: "3-6",
          label:
            "ثَلَاثُ عَشَرَاتٍ وَسِتُّ وَحَدَاتٍ",
          tens: 3,
          ones: 6,
        },
      ],
      answer: "3-8",
    },
  ];
