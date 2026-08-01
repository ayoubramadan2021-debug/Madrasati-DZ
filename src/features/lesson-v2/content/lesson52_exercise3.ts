import type {
  DragMatchItem,
} from "../exercises-v2/DragMatchExerciseV2";

const W = (value: string) => ({
  kind: "word" as const,
  value,
});

export const LESSON_52_EXERCISE_3:
  DragMatchItem[] = [
  {
    "question": "اِرْبِطْ كُلَّ مَرْحَلَةٍ بِحَالَةِ التَّنَفُّسِ.",
    "question_audio_key": "l52_ex3_q1_breathing",
    "pairs": [
      {
        "match_id": "قَبْلَ الْجَرْيِ",
        "draggable": {
          "kind": "word",
          "value": "تَنَفُّسٌ هَادِئٌ"
        },
        "target": {
          "kind": "word",
          "value": "تَنَفُّسٌ هَادِئٌ"
        }
      },
      {
        "match_id": "بَعْدَ الْجَرْيِ",
        "draggable": {
          "kind": "word",
          "value": "تَنَفُّسٌ أَسْرَعُ"
        },
        "target": {
          "kind": "word",
          "value": "تَنَفُّسٌ سَرِيعٌ"
        }
      },
      {
        "match_id": "بَعْدَ الرَّاحَةِ",
        "draggable": {
          "kind": "word",
          "value": "يَعُودُ التَّنَفُّسُ تَدْرِيجِيًّا"
        },
        "target": {
          "kind": "word",
          "value": "يَعُودُ هَادِئًا"
        }
      },
      {
        "match_id": "فِي مَكَانٍ مُدَخَّنٍ",
        "draggable": {
          "kind": "word",
          "value": "يَصْعُبُ التَّنَفُّسُ"
        },
        "target": {
          "kind": "word",
          "value": "تَنَفُّسٌ هَادِئٌ"
        }
      }
    ]
  },
  {
    "question": "اِرْبِطْ كُلَّ مَرْحَلَةٍ بِحَالَةِ نَبْضِ الْقَلْبِ.",
    "question_audio_key": "l52_ex3_q2_heartbeat",
    "pairs": [
      {
        "match_id": "قَبْلَ الْجَرْيِ",
        "draggable": {
          "kind": "word",
          "value": "نَبْضٌ عَادِيٌّ"
        },
        "target": {
          "kind": "word",
          "value": "نَبْضٌ أَبْطَأُ"
        }
      },
      {
        "match_id": "أَثْنَاءَ الْجَرْيِ",
        "draggable": {
          "kind": "word",
          "value": "نَبْضٌ أَسْرَعُ"
        },
        "target": {
          "kind": "word",
          "value": "نَبْضٌ أَسْرَعُ"
        }
      },
      {
        "match_id": "بَعْدَ الرَّاحَةِ",
        "draggable": {
          "kind": "word",
          "value": "يَبْدَأُ النَّبْضُ فِي الِانْخِفَاضِ"
        },
        "target": {
          "kind": "word",
          "value": "يَعُودُ تَدْرِيجِيًّا"
        }
      },
      {
        "match_id": "عِنْدَ الْمِعْصَمِ",
        "draggable": {
          "kind": "word",
          "value": "أَقِيسُ النَّبْضَ بِأَصَابِعِي"
        },
        "target": {
          "kind": "word",
          "value": "نَبْضٌ أَبْطَأُ"
        }
      }
    ]
  },
  {
    "question": "اِرْبِطْ كُلَّ سُلُوكٍ بِفَائِدَتِهِ.",
    "question_audio_key": "l52_ex3_q3_healthy_behavior",
    "pairs": [
      {
        "match_id": "الْإِحْمَاءُ",
        "draggable": {
          "kind": "word",
          "value": "يُهَيِّئُ الْجِسْمَ لِلنَّشَاطِ"
        },
        "target": {
          "kind": "word",
          "value": "الِاسْتِعْدَادُ لِلْحَرَكَةِ"
        }
      },
      {
        "match_id": "الْمَكَانُ النَّظِيفُ",
        "draggable": {
          "kind": "word",
          "value": "يُسَاعِدُ عَلَى التَّنَفُّسِ الْجَيِّدِ"
        },
        "target": {
          "kind": "word",
          "value": "تَعْوِيضُ السَّوَائِلِ"
        }
      },
      {
        "match_id": "شُرْبُ الْمَاءِ",
        "draggable": {
          "kind": "word",
          "value": "يُعَوِّضُ مَا يَفْقِدُهُ الْجِسْمُ"
        },
        "target": {
          "kind": "word",
          "value": "الْعَوْدَةُ إِلَى الْهُدُوءِ"
        }
      },
      {
        "match_id": "التَّهْدِئَةُ",
        "draggable": {
          "kind": "word",
          "value": "تُعِيدُ التَّنَفُّسَ وَالنَّبْضَ تَدْرِيجِيًّا"
        },
        "target": {
          "kind": "word",
          "value": "الِاسْتِعْدَادُ لِلْحَرَكَةِ"
        }
      }
    ]
  },
  {
    "question": "اِرْبِطْ كُلَّ مَكَانٍ بِالْقَرَارِ الْمُنَاسِبِ.",
    "question_audio_key": "l52_ex3_q4_places",
    "pairs": [
      {
        "match_id": "الْحَدِيقَةُ النَّظِيفَةُ",
        "draggable": {
          "kind": "word",
          "value": "أُمَارِسُ فِيهَا الرِّيَاضَةَ"
        },
        "target": {
          "kind": "word",
          "value": "مَكَانٌ مُنَاسِبٌ"
        }
      },
      {
        "match_id": "الْمَلْعَبُ الْآمِنُ",
        "draggable": {
          "kind": "word",
          "value": "أَلْعَبُ فِيهِ بِأَمَانٍ"
        },
        "target": {
          "kind": "word",
          "value": "نَبْتَعِدُ عَنْهُ"
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
          "value": "هَوَاءٌ مُلَوَّثٌ"
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
          "value": "مَكَانٌ مُنَاسِبٌ"
        }
      }
    ]
  }
];
