import type {
  Lesson48Item,
} from "./lesson48_types";

const question =
  "رَتِّبِ الأَعْدَادَ، ثُمَّ اخْتَرِ العَدَدَ النَّاقِصَ.";

export const lesson48Exercise3:
  Lesson48Item[] = [
    {
      id: "l48_e3_q1",
      title:
        "أُكْمِلُ القِطَارَ العَدَدِيَّ",
      question,
      question_audio_key:
        "ex3_missing_number",
      mode: "complete-sequence",
      sequence: [
        20,
        21,
        null,
        23,
      ],
      options: [
        {
          id: "22",
          label: "22",
        },
        {
          id: "24",
          label: "24",
        },
        {
          id: "19",
          label: "19",
        },
      ],
      answer: "22",
    },
    {
      id: "l48_e3_q2",
      title:
        "أُكْمِلُ القِطَارَ العَدَدِيَّ",
      question,
      question_audio_key:
        "ex3_missing_number",
      mode: "complete-sequence",
      sequence: [
        26,
        27,
        28,
        null,
        30,
      ],
      options: [
        {
          id: "27",
          label: "27",
        },
        {
          id: "29",
          label: "29",
        },
        {
          id: "31",
          label: "31",
        },
      ],
      answer: "29",
    },
    {
      id: "l48_e3_q3",
      title:
        "أُكْمِلُ القِطَارَ العَدَدِيَّ",
      question,
      question_audio_key:
        "ex3_missing_number",
      mode: "complete-sequence",
      sequence: [
        31,
        null,
        33,
        34,
      ],
      options: [
        {
          id: "30",
          label: "30",
        },
        {
          id: "35",
          label: "35",
        },
        {
          id: "32",
          label: "32",
        },
      ],
      answer: "32",
    },
    {
      id: "l48_e3_q4",
      title:
        "أُكْمِلُ القِطَارَ العَدَدِيَّ",
      question,
      question_audio_key:
        "ex3_missing_number",
      mode: "complete-sequence",
      sequence: [
        35,
        36,
        37,
        38,
        null,
      ],
      options: [
        {
          id: "39",
          label: "39",
        },
        {
          id: "34",
          label: "34",
        },
        {
          id: "38",
          label: "38",
        },
      ],
      answer: "39",
    },
  ];
