import type {
  Lesson48Item,
} from "./lesson48_types";

const question =
  "اِقْرَأِ العَدَدَ، ثُمَّ اخْتَرْ كِتَابَتَهُ الصَّحِيحَةَ.";

export const lesson48Exercise2:
  Lesson48Item[] = [
    {
      id: "l48_e2_q1",
      title: "أَقْرَأُ وَأَخْتَارُ",
      question,
      question_audio_key:
        "ex2_read_number",
      mode: "number-to-word",
      number: 21,
      options: [
        {
          id: "twenty-one",
          label:
            "وَاحِدٌ وَعِشْرُونَ",
        },
        {
          id: "thirty-one",
          label:
            "وَاحِدٌ وَثَلَاثُونَ",
        },
        {
          id: "twenty-two",
          label:
            "اثْنَانِ وَعِشْرُونَ",
        },
      ],
      answer: "twenty-one",
    },
    {
      id: "l48_e2_q2",
      title: "أَقْرَأُ وَأَخْتَارُ",
      question,
      question_audio_key:
        "ex2_read_number",
      mode: "number-to-word",
      number: 26,
      options: [
        {
          id: "thirty-seven",
          label:
            "سَبْعَةٌ وَثَلَاثُونَ",
        },
        {
          id: "twenty-six",
          label:
            "سِتَّةٌ وَعِشْرُونَ",
        },
        {
          id: "thirty-six",
          label:
            "سِتَّةٌ وَثَلَاثُونَ",
        },
      ],
      answer: "twenty-six",
    },
    {
      id: "l48_e2_q3",
      title: "أَقْرَأُ وَأَخْتَارُ",
      question,
      question_audio_key:
        "ex2_read_number",
      mode: "number-to-word",
      number: 32,
      options: [
        {
          id: "twenty-three",
          label:
            "ثَلَاثَةٌ وَعِشْرُونَ",
        },
        {
          id: "thirty-three",
          label:
            "ثَلَاثَةٌ وَثَلَاثُونَ",
        },
        {
          id: "thirty-two",
          label:
            "اثْنَانِ وَثَلَاثُونَ",
        },
      ],
      answer: "thirty-two",
    },
    {
      id: "l48_e2_q4",
      title: "أَقْرَأُ وَأَخْتَارُ",
      question,
      question_audio_key:
        "ex2_read_number",
      mode: "number-to-word",
      number: 37,
      options: [
        {
          id: "thirty-seven",
          label:
            "سَبْعَةٌ وَثَلَاثُونَ",
        },
        {
          id: "twenty-seven",
          label:
            "سَبْعَةٌ وَعِشْرُونَ",
        },
        {
          id: "thirty-eight",
          label:
            "ثَمَانِيَةٌ وَثَلَاثُونَ",
        },
      ],
      answer: "thirty-seven",
    },
  ];
