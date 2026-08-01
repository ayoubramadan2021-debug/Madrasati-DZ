import type {
  DragMatchItem,
} from "../exercises-v2/DragMatchExerciseV2";

const W = (value: string) => ({
  kind: "word" as const,
  value,
});

export const LESSON_52_EXERCISE_2:
  DragMatchItem[] = [
  {
    "question": "اِسْحَبْ كُلَّ مَكَانٍ إِلَى الْقَرَارِ الصَّحِيحِ.",
    "question_audio_key": "l52_ex2_q1_activity_order",
    "pairs": [
      {
        "match_id": "الْحَدِيقَةُ النَّظِيفَةُ",
        "draggable": {
          "kind": "word",
          "value": "أُمَارِسُ فِيهَا الرِّيَاضَةَ"
        },
        "target": {
          "kind": "word",
          "value": "تَنَفُّسٌ هَادِئٌ"
        }
      },
      {
        "match_id": "الْمَلْعَبُ الْآمِنُ",
        "draggable": {
          "kind": "word",
          "value": "أَلْعَبُ وَأَجْرِي فِيهِ"
        },
        "target": {
          "kind": "word",
          "value": "تَنَفُّسٌ سَرِيعٌ"
        }
      },
      {
        "match_id": "الطَّرِيقُ الْمُزْدَحِمُ",
        "draggable": {
          "kind": "word",
          "value": "أَبْتَعِدُ عَنْهُ"
        },
        "target": {
          "kind": "word",
          "value": "يَعُودُ هَادِئًا"
        }
      },
      {
        "match_id": "الْمَكَانُ الْمَلِيءُ بِالدُّخَانِ",
        "draggable": {
          "kind": "word",
          "value": "لَا أُمَارِسُ فِيهِ الرِّيَاضَةَ"
        },
        "target": {
          "kind": "word",
          "value": "تَنَفُّسٌ هَادِئٌ"
        }
      }
    ]
  },
  {
    "question": "اِسْحَبْ كُلَّ نَشَاطٍ إِلَى الْمَكَانِ الْمُنَاسِبِ.",
    "question_audio_key": "l52_ex2_q2_after_running",
    "pairs": [
      {
        "match_id": "الْجَرْيُ",
        "draggable": {
          "kind": "word",
          "value": "الْمَلْعَبُ الْآمِنُ"
        },
        "target": {
          "kind": "word",
          "value": "نَبْضٌ أَبْطَأُ"
        }
      },
      {
        "match_id": "الْمَشْيُ",
        "draggable": {
          "kind": "word",
          "value": "الْحَدِيقَةُ النَّظِيفَةُ"
        },
        "target": {
          "kind": "word",
          "value": "نَبْضٌ أَسْرَعُ"
        }
      },
      {
        "match_id": "اللَّعِبُ الْجَمَاعِيُّ",
        "draggable": {
          "kind": "word",
          "value": "سَاحَةُ الْمَدْرَسَةِ"
        },
        "target": {
          "kind": "word",
          "value": "يَعُودُ تَدْرِيجِيًّا"
        }
      },
      {
        "match_id": "التَّمَارِينُ الْمُنَظَّمَةُ",
        "draggable": {
          "kind": "word",
          "value": "الْقَاعَةُ الرِّيَاضِيَّةُ"
        },
        "target": {
          "kind": "word",
          "value": "نَبْضٌ أَبْطَأُ"
        }
      }
    ]
  },
  {
    "question": "اِسْحَبْ كُلَّ مَكَانٍ خَطِرٍ إِلَى التَّصَرُّفِ الصَّحِيحِ.",
    "question_audio_key": "l52_ex2_q3_pulse_order",
    "pairs": [
      {
        "match_id": "طَرِيقٌ تَمُرُّ فِيهِ السَّيَّارَاتُ",
        "draggable": {
          "kind": "word",
          "value": "لَا أَجْرِي فِيهِ"
        },
        "target": {
          "kind": "word",
          "value": "الِاسْتِعْدَادُ لِلْحَرَكَةِ"
        }
      },
      {
        "match_id": "مَكَانٌ فِيهِ دُخَانٌ",
        "draggable": {
          "kind": "word",
          "value": "أَبْتَعِدُ عَنْهُ"
        },
        "target": {
          "kind": "word",
          "value": "تَعْوِيضُ السَّوَائِلِ"
        }
      },
      {
        "match_id": "مَكَانٌ فِيهِ نُفَايَاتٌ",
        "draggable": {
          "kind": "word",
          "value": "لَا أَلْعَبُ فِيهِ"
        },
        "target": {
          "kind": "word",
          "value": "الْعَوْدَةُ إِلَى الْهُدُوءِ"
        }
      },
      {
        "match_id": "وَرْشَةُ أَشْغَالٍ",
        "draggable": {
          "kind": "word",
          "value": "أَخْتَارُ مَكَانًا آخَرَ"
        },
        "target": {
          "kind": "word",
          "value": "الِاسْتِعْدَادُ لِلْحَرَكَةِ"
        }
      }
    ]
  },
  {
    "question": "اِسْحَبْ كُلَّ وَصْفٍ إِلَى الْمَكَانِ الَّذِي يُنَاسِبُهُ.",
    "question_audio_key": "l52_ex2_q4_place_decision",
    "pairs": [
      {
        "match_id": "هَوَاءٌ نَقِيٌّ وَأَشْجَارٌ",
        "draggable": {
          "kind": "word",
          "value": "الْحَدِيقَةُ"
        },
        "target": {
          "kind": "word",
          "value": "مَكَانٌ مُنَاسِبٌ"
        }
      },
      {
        "match_id": "أَرْضِيَّةٌ آمِنَةٌ لِلْجَرْيِ",
        "draggable": {
          "kind": "word",
          "value": "الْمَلْعَبُ"
        },
        "target": {
          "kind": "word",
          "value": "نَبْتَعِدُ عَنْهُ"
        }
      },
      {
        "match_id": "دُخَانٌ وَضَجِيجٌ كَثِيرٌ",
        "draggable": {
          "kind": "word",
          "value": "الطَّرِيقُ الْمُزْدَحِمُ"
        },
        "target": {
          "kind": "word",
          "value": "هَوَاءٌ مُلَوَّثٌ"
        }
      },
      {
        "match_id": "آلَاتٌ وَأَتْرِبَةٌ",
        "draggable": {
          "kind": "word",
          "value": "وَرْشَةُ الْأَشْغَالِ"
        },
        "target": {
          "kind": "word",
          "value": "مَكَانٌ مُنَاسِبٌ"
        }
      }
    ]
  }
];
