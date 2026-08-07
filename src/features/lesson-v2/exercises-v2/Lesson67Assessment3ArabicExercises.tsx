import {
  type CSSProperties,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import LessonCompleteV2 from "../components/LessonCompleteV2";
import UnifiedExerciseAnswersV2 from "../components/UnifiedExerciseAnswersV2";
import UnifiedExerciseScreenV2 from "../components/UnifiedExerciseScreenV2";

import "./lesson67-exercises.css";

const AUDIO_BASE =
  "/audio/teachers/taline/lesson_67_assessment_3_arabic/exercises";

const CORRECT_SOUND =
  "/audio/v2_feedback/correct.mp3";

const RETRY_SOUND =
  "/audio/v2_feedback/retry.mp3";

const AUTO_PLAY_DELAY = 320;
const FEEDBACK_DELAY = 1300;

type Mission = 1 | 2 | 3 | 4;

type FeedbackState =
  | "idle"
  | "correct"
  | "wrong";

type KaraokeWord = {
  text: string;
  offset: number;
  duration: number;
};


type QuestionKind =
  | "observe"
  | "complete"
  | "order"
  | "reading";

type Choice = {
  id: string;
  label: string;
};

type Lesson67Question = {
  id: string;
  mission: Mission;
  kind: QuestionKind;

  prompt: string;
  audioKey: string;

  choices: Choice[];
  answer: string;

  image: string;

  revealText?: string;

  sentenceBefore?: string;
  sentenceAfter?: string;
  answerWord?: string;

  words?: string[];
  correctSentence?: string;

  passage?: string;
  questionText?: string;
  explanation?: string;
};

const QUESTIONS: Lesson67Question[] =
[
  {
    "id": "l67_ex1_q1",
    "mission": 1,
    "kind": "observe",
    "prompt": "جِدِ الْمَكَانَ الْمُنَاسِبَ لِلرِّحْلَةِ.",
    "audioKey": "l67_ex1_q1",
    "choices": [
      {
        "id": "a",
        "label": "الْمَرْجُ الْأَخْضَرُ"
      },
      {
        "id": "b",
        "label": "الْمُسْتَنْقَعُ"
      },
      {
        "id": "c",
        "label": "الْمَغَارَةُ الْمُظْلِمَةُ"
      },
      {
        "id": "d",
        "label": "الطَّرِيقُ الْمُزْدَحِمُ"
      }
    ],
    "answer": "a",
    "image": "/lessons/v2/lesson67-mobilize-my-knowledge/s3.webp",
    "revealText": "هَذَا الْمَرْجُ مُنَاسِبٌ لِلرِّحْلَةِ."
  },
  {
    "id": "l67_ex1_q2",
    "mission": 1,
    "kind": "observe",
    "prompt": "جِدِ الْمَكَانَ الْمُنَاسِبَ لِلرِّحْلَةِ.",
    "audioKey": "l67_ex1_q2",
    "choices": [
      {
        "id": "a",
        "label": "الْمَصْنَعُ"
      },
      {
        "id": "b",
        "label": "الْحَدِيقَةُ الطَّبِيعِيَّةُ"
      },
      {
        "id": "c",
        "label": "الْوَادِي الْعَمِيقُ"
      },
      {
        "id": "d",
        "label": "الشَّاطِئُ الْهَائِجُ"
      }
    ],
    "answer": "b",
    "image": "/lessons/v2/lesson67-mobilize-my-knowledge/s3.webp",
    "revealText": "هَذِهِ الْحَدِيقَةُ مُنَاسِبَةٌ لِلرِّحْلَةِ."
  },
  {
    "id": "l67_ex1_q3",
    "mission": 1,
    "kind": "observe",
    "prompt": "جِدِ الْمَكَانَ الْمُنَاسِبَ لِلرِّحْلَةِ.",
    "audioKey": "l67_ex1_q3",
    "choices": [
      {
        "id": "a",
        "label": "الطَّرِيقُ الصَّخْرِيُّ"
      },
      {
        "id": "b",
        "label": "الْمَكَانُ الْمُلَوَّثُ"
      },
      {
        "id": "c",
        "label": "الْفَضَاءُ الْعُشْبِيُّ الْآمِنُ"
      },
      {
        "id": "d",
        "label": "الْمُسْتَنْقَعُ"
      }
    ],
    "answer": "c",
    "image": "/lessons/v2/lesson67-mobilize-my-knowledge/s3.webp",
    "revealText": "هَذَا الْفَضَاءُ آمِنٌ وَمُنَاسِبٌ."
  },
  {
    "id": "l67_ex1_q4",
    "mission": 1,
    "kind": "observe",
    "prompt": "جِدِ الْمَكَانَ الْمُنَاسِبَ لِلرِّحْلَةِ.",
    "audioKey": "l67_ex1_q4",
    "choices": [
      {
        "id": "a",
        "label": "الْمَغَارَةُ"
      },
      {
        "id": "b",
        "label": "الْمُنْحَدَرُ الْخَطِيرُ"
      },
      {
        "id": "c",
        "label": "طَرِيقُ السَّيَّارَاتِ"
      },
      {
        "id": "d",
        "label": "الْمُتَنَزَّهُ الْوَاسِعُ"
      }
    ],
    "answer": "d",
    "image": "/lessons/v2/lesson67-mobilize-my-knowledge/s3.webp",
    "revealText": "هَذَا الْمُتَنَزَّهُ مُنَاسِبٌ لِلرِّحْلَةِ."
  },
  {
    "id": "l67_ex2_q1",
    "mission": 2,
    "kind": "complete",
    "prompt": "أَكْمِلِ الْجُمْلَةَ بِالْكَلِمَةِ الْمُنَاسِبَةِ.",
    "audioKey": "l67_ex2_q1",
    "choices": [
      {
        "id": "a",
        "label": "الْهَوَاءَ"
      },
      {
        "id": "b",
        "label": "الْمَاءَ"
      },
      {
        "id": "c",
        "label": "الطَّعَامَ"
      },
      {
        "id": "d",
        "label": "التُّرَابَ"
      }
    ],
    "answer": "a",
    "image": "/lessons/v2/lesson67-mobilize-my-knowledge/s3.webp",
    "sentenceBefore": "هَذَا الْمَكَانُ يُوَفِّرُ لَنَا",
    "sentenceAfter": "النَّقِيَّ.",
    "answerWord": "الْهَوَاءَ"
  },
  {
    "id": "l67_ex2_q2",
    "mission": 2,
    "kind": "complete",
    "prompt": "أَكْمِلِ الْجُمْلَةَ بِالْكَلِمَةِ الْمُنَاسِبَةِ.",
    "audioKey": "l67_ex2_q2",
    "choices": [
      {
        "id": "a",
        "label": "الْهَوَاءَ"
      },
      {
        "id": "b",
        "label": "الْمَاءَ"
      },
      {
        "id": "c",
        "label": "التُّرَابَ"
      },
      {
        "id": "d",
        "label": "الطَّعَامَ"
      }
    ],
    "answer": "b",
    "image": "/lessons/v2/lesson67-mobilize-my-knowledge/s3.webp",
    "sentenceBefore": "نَشْرَبُ مِنَ النَّهْرِ",
    "sentenceAfter": "النَّقِيَّ.",
    "answerWord": "الْمَاءَ"
  },
  {
    "id": "l67_ex2_q3",
    "mission": 2,
    "kind": "complete",
    "prompt": "أَكْمِلِ الْجُمْلَةَ بِالْكَلِمَةِ الْمُنَاسِبَةِ.",
    "audioKey": "l67_ex2_q3",
    "choices": [
      {
        "id": "a",
        "label": "السَّيَّارَةَ"
      },
      {
        "id": "b",
        "label": "الطَّاوِلَةَ"
      },
      {
        "id": "c",
        "label": "الطَّبِيعَةَ"
      },
      {
        "id": "d",
        "label": "الْحَقِيبَةَ"
      }
    ],
    "answer": "c",
    "image": "/lessons/v2/lesson67-mobilize-my-knowledge/s3.webp",
    "sentenceBefore": "نَحْمِي",
    "sentenceAfter": "الْجَمِيلَةَ.",
    "answerWord": "الطَّبِيعَةَ"
  },
  {
    "id": "l67_ex2_q4",
    "mission": 2,
    "kind": "complete",
    "prompt": "أَكْمِلِ الْجُمْلَةَ بِالْكَلِمَةِ الْمُنَاسِبَةِ.",
    "audioKey": "l67_ex2_q4",
    "choices": [
      {
        "id": "a",
        "label": "الْمُظْلِمَ"
      },
      {
        "id": "b",
        "label": "الْخَطِيرَ"
      },
      {
        "id": "c",
        "label": "الْمُلَوَّثَ"
      },
      {
        "id": "d",
        "label": "الْآمِنَ"
      }
    ],
    "answer": "d",
    "image": "/lessons/v2/lesson67-mobilize-my-knowledge/s3.webp",
    "sentenceBefore": "نَخْتَارُ الْمَكَانَ",
    "sentenceAfter": "لِلرِّحْلَةِ.",
    "answerWord": "الْآمِنَ"
  },
  {
    "id": "l67_ex3_q1",
    "mission": 3,
    "kind": "order",
    "prompt": "رَتِّبِ الْكَلِمَاتِ لِتُكَوِّنَ جُمْلَةً صَحِيحَةً.",
    "audioKey": "l67_ex3_q1",
    "choices": [
      {
        "id": "a",
        "label": "الْقَلْبُ فِي الْجِهَةِ الْيُسْرَى مِنَ الصَّدْرِ."
      },
      {
        "id": "b",
        "label": "فِي الْقَلْبُ الصَّدْرِ الْجِهَةِ الْيُسْرَى."
      },
      {
        "id": "c",
        "label": "الصَّدْرِ مِنَ الْقَلْبُ فِي الْيُسْرَى."
      },
      {
        "id": "d",
        "label": "الْجِهَةِ الْقَلْبُ الصَّدْرِ فِي."
      }
    ],
    "answer": "a",
    "image": "/lessons/v2/lesson67-mobilize-my-knowledge/s4.webp",
    "words": [
      "الصَّدْرِ",
      "الْيُسْرَى",
      "فِي",
      "الْقَلْبُ",
      "مِنَ",
      "الْجِهَةِ"
    ],
    "correctSentence": "الْقَلْبُ فِي الْجِهَةِ الْيُسْرَى مِنَ الصَّدْرِ."
  },
  {
    "id": "l67_ex3_q2",
    "mission": 3,
    "kind": "order",
    "prompt": "رَتِّبِ الْكَلِمَاتِ لِتُكَوِّنَ جُمْلَةً صَحِيحَةً.",
    "audioKey": "l67_ex3_q2",
    "choices": [
      {
        "id": "a",
        "label": "يَدِي أَضَعُ صَدْرِي عَلَى."
      },
      {
        "id": "b",
        "label": "أَضَعُ يَدِي عَلَى صَدْرِي."
      },
      {
        "id": "c",
        "label": "عَلَى صَدْرِي أَضَعُ يَدِي."
      },
      {
        "id": "d",
        "label": "صَدْرِي يَدِي عَلَى أَضَعُ."
      }
    ],
    "answer": "b",
    "image": "/lessons/v2/lesson67-mobilize-my-knowledge/s4.webp",
    "words": [
      "صَدْرِي",
      "عَلَى",
      "يَدِي",
      "أَضَعُ"
    ],
    "correctSentence": "أَضَعُ يَدِي عَلَى صَدْرِي."
  },
  {
    "id": "l67_ex3_q3",
    "mission": 3,
    "kind": "order",
    "prompt": "رَتِّبِ الْكَلِمَاتِ لِتُكَوِّنَ جُمْلَةً صَحِيحَةً.",
    "audioKey": "l67_ex3_q3",
    "choices": [
      {
        "id": "a",
        "label": "الْقَلْبُ بِانْتِظَامٍ يَنْبِضُ."
      },
      {
        "id": "b",
        "label": "بِانْتِظَامٍ يَنْبِضُ الْقَلْبُ."
      },
      {
        "id": "c",
        "label": "يَنْبِضُ الْقَلْبُ بِانْتِظَامٍ."
      },
      {
        "id": "d",
        "label": "الْقَلْبُ يَنْبِضُ بِانْتِظَامٍ يَنْبِضُ."
      }
    ],
    "answer": "c",
    "image": "/lessons/v2/lesson67-mobilize-my-knowledge/s4.webp",
    "words": [
      "بِانْتِظَامٍ",
      "الْقَلْبُ",
      "يَنْبِضُ"
    ],
    "correctSentence": "يَنْبِضُ الْقَلْبُ بِانْتِظَامٍ."
  },
  {
    "id": "l67_ex3_q4",
    "mission": 3,
    "kind": "order",
    "prompt": "رَتِّبِ الْكَلِمَاتِ لِتُكَوِّنَ جُمْلَةً صَحِيحَةً.",
    "audioKey": "l67_ex3_q4",
    "choices": [
      {
        "id": "a",
        "label": "الدَّمَ الْجِسْمِ يَضُخُّ فِي الْقَلْبُ."
      },
      {
        "id": "b",
        "label": "الْجِسْمِ فِي الْقَلْبُ يَضُخُّ الدَّمَ."
      },
      {
        "id": "c",
        "label": "الْقَلْبُ فِي الدَّمَ يَضُخُّ الْجِسْمِ."
      },
      {
        "id": "d",
        "label": "يَضُخُّ الْقَلْبُ الدَّمَ فِي الْجِسْمِ."
      }
    ],
    "answer": "d",
    "image": "/lessons/v2/lesson67-mobilize-my-knowledge/s4.webp",
    "words": [
      "الْجِسْمِ",
      "فِي",
      "الدَّمَ",
      "الْقَلْبُ",
      "يَضُخُّ"
    ],
    "correctSentence": "يَضُخُّ الْقَلْبُ الدَّمَ فِي الْجِسْمِ."
  },
  {
    "id": "l67_ex4_q1",
    "mission": 4,
    "kind": "reading",
    "prompt": "اِقْرَأِ النَّصَّ ثُمَّ أَجِبْ عَنِ السُّؤَالِ.",
    "audioKey": "l67_ex4_q1",
    "choices": [
      {
        "id": "a",
        "label": "لِأَنَّهُ بَذَلَ جُهْدًا كَبِيرًا."
      },
      {
        "id": "b",
        "label": "لِأَنَّهُ نَائِمٌ."
      },
      {
        "id": "c",
        "label": "لِأَنَّهُ يَقْرَأُ."
      },
      {
        "id": "d",
        "label": "لِأَنَّهُ جَائِعٌ."
      }
    ],
    "answer": "a",
    "image": "/lessons/v2/lesson67-mobilize-my-knowledge/s4.webp",
    "passage": "جَرَى أَمِينٌ بِسُرْعَةٍ، ثُمَّ أَحَسَّ بِدَقَّاتِ قَلْبِهِ تَزْدَادُ.",
    "questionText": "لِمَاذَا يَنْبِضُ قَلْبُ أَمِينٍ بِسُرْعَةٍ؟",
    "explanation": "يَنْبِضُ قَلْبُ أَمِينٍ بِسُرْعَةٍ لِأَنَّهُ بَذَلَ جُهْدًا."
  },
  {
    "id": "l67_ex4_q2",
    "mission": 4,
    "kind": "reading",
    "prompt": "اِقْرَأِ النَّصَّ ثُمَّ أَجِبْ عَنِ السُّؤَالِ.",
    "audioKey": "l67_ex4_q2",
    "choices": [
      {
        "id": "a",
        "label": "لِأَنَّهُ جَلَسَ."
      },
      {
        "id": "b",
        "label": "لِأَنَّهُ لَعِبَ وَبَذَلَ جُهْدًا."
      },
      {
        "id": "c",
        "label": "لِأَنَّهُ نَامَ."
      },
      {
        "id": "d",
        "label": "لِأَنَّهُ قَرَأَ كِتَابًا."
      }
    ],
    "answer": "b",
    "image": "/lessons/v2/lesson67-mobilize-my-knowledge/s4.webp",
    "passage": "لَعِبَ سَامِي كُرَةَ الْقَدَمِ، فَتَسَارَعَ نَبْضُ قَلْبِهِ.",
    "questionText": "لِمَاذَا تَسَارَعَ نَبْضُ قَلْبِ سَامِي؟",
    "explanation": "تَسَارَعَ نَبْضُ قَلْبِ سَامِي لِأَنَّهُ لَعِبَ وَبَذَلَ جُهْدًا."
  },
  {
    "id": "l67_ex4_q3",
    "mission": 4,
    "kind": "reading",
    "prompt": "اِقْرَأِ النَّصَّ ثُمَّ أَجِبْ عَنِ السُّؤَالِ.",
    "audioKey": "l67_ex4_q3",
    "choices": [
      {
        "id": "a",
        "label": "لِأَنَّهَا تَشْرَبُ الْمَاءَ."
      },
      {
        "id": "b",
        "label": "لِأَنَّهَا تَكْتُبُ."
      },
      {
        "id": "c",
        "label": "لِأَنَّهَا صَعِدَتِ الدَّرَجَ."
      },
      {
        "id": "d",
        "label": "لِأَنَّهَا نَائِمَةٌ."
      }
    ],
    "answer": "c",
    "image": "/lessons/v2/lesson67-mobilize-my-knowledge/s4.webp",
    "passage": "صَعِدَتْ يَاسَمِينُ الدَّرَجَ، فَشَعَرَتْ بِقَلْبِهَا يَنْبِضُ بِسُرْعَةٍ.",
    "questionText": "مَا سَبَبُ سُرْعَةِ نَبْضِ قَلْبِ يَاسَمِين؟",
    "explanation": "يَنْبِضُ قَلْبُ يَاسَمِين بِسُرْعَةٍ لِأَنَّهَا صَعِدَتِ الدَّرَجَ."
  },
  {
    "id": "l67_ex4_q4",
    "mission": 4,
    "kind": "reading",
    "prompt": "اِقْرَأِ النَّصَّ ثُمَّ أَجِبْ عَنِ السُّؤَالِ.",
    "audioKey": "l67_ex4_q4",
    "choices": [
      {
        "id": "a",
        "label": "لِأَنَّهُ يَرْسُمُ."
      },
      {
        "id": "b",
        "label": "لِأَنَّهُ يَأْكُلُ."
      },
      {
        "id": "c",
        "label": "لِأَنَّهُ جَالِسٌ."
      },
      {
        "id": "d",
        "label": "لِأَنَّهُ قَفَزَ وَبَذَلَ جُهْدًا."
      }
    ],
    "answer": "d",
    "image": "/lessons/v2/lesson67-mobilize-my-knowledge/s4.webp",
    "passage": "قَفَزَ أَنِيسٌ مَرَّاتٍ كَثِيرَةً، فَازْدَادَ نَبْضُ قَلْبِهِ.",
    "questionText": "لِمَاذَا ازْدَادَ نَبْضُ قَلْبِ أَنِيس؟",
    "explanation": "ازْدَادَ نَبْضُ قَلْبِ أَنِيس لِأَنَّهُ قَفَزَ وَبَذَلَ جُهْدًا."
  }
];

const LessonCompleteAny =
  LessonCompleteV2 as any;

function playFeedback(
  source: string,
) {
  try {
    const audio = new Audio(source);
    audio.volume = 0.9;

    audio
      .play()
      .catch(() => undefined);
  } catch {
    // لا شيء.
  }
}



function LessonImage({
  source,
  alt,
}: {
  source: string;
  alt: string;
}) {
  return (
    <img
      src={source}
      alt={alt}
      style={styles.lessonImage}
    />
  );
}

function ObserveBoard({
  question,
  showResult,
}: {
  question: Lesson67Question;
  showResult: boolean;
}) {
  return (
    <div style={styles.activityCard}>
      <LessonImage
        source={question.image}
        alt="اختيار المكان المناسب"
      />

      {showResult && (
        <div style={styles.revealBox}>
          ✅ {question.revealText}
        </div>
      )}
    </div>
  );
}

function CompleteBoard({
  question,
  showResult,
}: {
  question: Lesson67Question;
  showResult: boolean;
}) {
  return (
    <div style={styles.activityCard}>
      <LessonImage
        source={question.image}
        alt="إكمال الجملة"
      />

      <div style={styles.sentenceBox}>
        <span>{question.sentenceBefore}</span>

        <strong style={styles.blankWord}>
          {showResult
            ? question.answerWord
            : "........"}
        </strong>

        <span>{question.sentenceAfter}</span>
      </div>
    </div>
  );
}

function OrderBoard({
  question,
  showResult,
}: {
  question: Lesson67Question;
  showResult: boolean;
}) {
  return (
    <div style={styles.activityCard}>
      <LessonImage
        source={question.image}
        alt="ترتيب الكلمات"
      />

      <div style={styles.wordChips}>
        {(question.words ?? []).map(
          (word, index) => (
            <span
              key={`${word}-${index}`}
              style={styles.wordChip}
            >
              {word}
            </span>
          ),
        )}
      </div>

      <div style={styles.orderResult}>
        {showResult
          ? question.correctSentence
          : "؟"}
      </div>
    </div>
  );
}

function ReadingBoard({
  question,
  showResult,
}: {
  question: Lesson67Question;
  showResult: boolean;
}) {
  return (
    <div style={styles.activityCard}>
      <LessonImage
        source={question.image}
        alt="القراءة والفهم"
      />

      <div style={styles.readingText}>
        {question.passage}
      </div>

      <div style={styles.readingQuestion}>
        {question.questionText}
      </div>

      {showResult && (
        <div style={styles.revealBox}>
          ✅ {question.explanation}
        </div>
      )}
    </div>
  );
}

function renderActivity(
  question: Lesson67Question,
  showResult: boolean,
): ReactNode {
  if (question.kind === "observe") {
    return (
      <ObserveBoard
        question={question}
        showResult={showResult}
      />
    );
  }

  if (question.kind === "complete") {
    return (
      <CompleteBoard
        question={question}
        showResult={showResult}
      />
    );
  }

  if (question.kind === "order") {
    return (
      <OrderBoard
        question={question}
        showResult={showResult}
      />
    );
  }

  return (
    <ReadingBoard
      question={question}
      showResult={showResult}
    />
  );
}


export default function Lesson67Assessment3ArabicExercises() {
  const navigate = useNavigate();

  const [mission, setMission] =
    useState<Mission>(1);

  const [questionIndex, setQuestionIndex] =
    useState(0);

  const [selectedId, setSelectedId] =
    useState<string | null>(null);

  const [feedback, setFeedback] =
    useState<FeedbackState>("idle");

  const [complete, setComplete] =
    useState(false);

  const [boundaries, setBoundaries] =
    useState<KaraokeWord[]>([]);

  const [activeWordIndex, setActiveWordIndex] =
    useState(-1);

  const [isPlaying, setIsPlaying] =
    useState(false);

  const audioRef =
    useRef<HTMLAudioElement | null>(null);

  const boundariesRef =
    useRef<KaraokeWord[]>([]);

  const answerLockedRef =
    useRef(false);

  const timerRef =
    useRef<number | null>(null);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-lesson67-exercises",
      "true",
    );

    return () => {
      document.documentElement.removeAttribute(
        "data-lesson67-exercises",
      );
    };
  }, []);

  const clearTimer =
    useCallback(() => {
      if (timerRef.current !== null) {
        window.clearTimeout(
          timerRef.current,
        );

        timerRef.current = null;
      }
    }, []);

  const missionQuestions =
    useMemo(
      () =>
        QUESTIONS.filter(
          (item) =>
            item.mission === mission,
        ),
      [mission],
    );

  const question =
    missionQuestions[questionIndex];
  const displayedChoices =
    question?.choices ?? [];

  const audioSource =
    `${AUDIO_BASE}/${question.audioKey}.mp3`;

  const timingSource =
    `${AUDIO_BASE}/${question.audioKey}.json`;

  useEffect(() => {
    clearTimer();

    answerLockedRef.current = false;

    setSelectedId(null);
    setFeedback("idle");
  }, [
    clearTimer,
    question.id,
  ]);

  useEffect(() => {
    let cancelled = false;

    setBoundaries([]);
    boundariesRef.current = [];

    setActiveWordIndex(-1);
    setIsPlaying(false);

    fetch(timingSource)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `HTTP ${response.status}`,
          );
        }

        return response.json();
      })
      .then((data) => {
        if (cancelled) return;

        const items =
          Array.isArray(data)
            ? data.filter(
                (item) =>
                  item &&
                  typeof item.text === "string",
              )
            : [];

        boundariesRef.current = items;
        setBoundaries(items);
      })
      .catch(() => {
        if (cancelled) return;

        boundariesRef.current = [];
        setBoundaries([]);
      });

    const audio =
      new Audio(audioSource);

    audio.preload = "auto";

    const onPlay = () => {
      if (!cancelled) {
        setIsPlaying(true);
      }
    };

    const onPause = () => {
      if (!cancelled) {
        setIsPlaying(false);
      }
    };

    const onEnded = () => {
      if (cancelled) return;

      setIsPlaying(false);

      setActiveWordIndex(
        boundariesRef.current.length > 0
          ? boundariesRef.current.length - 1
          : -1,
      );
    };

    const onTimeUpdate = () => {
      if (cancelled) return;

      const currentMs =
        audio.currentTime * 1000;

      const words =
        boundariesRef.current;

      let active = -1;

      for (
        let index = 0;
        index < words.length;
        index += 1
      ) {
        const start =
          Number(
            words[index].offset,
          ) || 0;

        const nextStart =
          index < words.length - 1
            ? Number(
                words[index + 1].offset,
              ) || start
            : Number.POSITIVE_INFINITY;

        if (
          currentMs >= start &&
          currentMs < nextStart
        ) {
          active = index;
          break;
        }
      }

      setActiveWordIndex(active);
    };

    audio.addEventListener(
      "play",
      onPlay,
    );

    audio.addEventListener(
      "pause",
      onPause,
    );

    audio.addEventListener(
      "ended",
      onEnded,
    );

    audio.addEventListener(
      "timeupdate",
      onTimeUpdate,
    );

    audioRef.current = audio;

    const autoTimer =
      window.setTimeout(() => {
        if (cancelled) return;

        setActiveWordIndex(-1);
        audio.currentTime = 0;

        audio
          .play()
          .catch(() => {
            setIsPlaying(false);
          });
      }, AUTO_PLAY_DELAY);

    return () => {
      cancelled = true;

      window.clearTimeout(
        autoTimer,
      );

      audio.pause();

      audio.removeEventListener(
        "play",
        onPlay,
      );

      audio.removeEventListener(
        "pause",
        onPause,
      );

      audio.removeEventListener(
        "ended",
        onEnded,
      );

      audio.removeEventListener(
        "timeupdate",
        onTimeUpdate,
      );

      if (
        audioRef.current === audio
      ) {
        audioRef.current = null;
      }
    };
  }, [
    audioSource,
    timingSource,
  ]);

  useEffect(() => {
    return () => {
      clearTimer();
    };
  }, [clearTimer]);

  const replay =
    useCallback(() => {
      const audio =
        audioRef.current;

      if (!audio) return;

      setActiveWordIndex(-1);
      audio.currentTime = 0;

      audio
        .play()
        .catch(() => {
          setIsPlaying(false);
        });
    }, []);

  const moveForward =
    useCallback(() => {
      if (
        questionIndex <
        missionQuestions.length - 1
      ) {
        setQuestionIndex(
          (current) =>
            current + 1,
        );

        return;
      }

      if (mission < 4) {
        setMission(
          (mission + 1) as Mission,
        );

        setQuestionIndex(0);
        return;
      }

      setComplete(true);
    }, [
      mission,
      missionQuestions.length,
      questionIndex,
    ]);

  const selectAnswer =
    useCallback(
      (choiceId: string) => {
        if (
          feedback !== "idle" ||
          answerLockedRef.current
        ) {
          return;
        }

        answerLockedRef.current = true;
        setSelectedId(choiceId);

        if (
          choiceId === question.answer
        ) {
          setFeedback("correct");

          playFeedback(
            CORRECT_SOUND,
          );

          timerRef.current =
            window.setTimeout(
              moveForward,
              FEEDBACK_DELAY,
            );

          return;
        }

        setFeedback("wrong");

        playFeedback(
          RETRY_SOUND,
        );

        timerRef.current =
          window.setTimeout(() => {
            setSelectedId(null);
            setFeedback("idle");

            answerLockedRef.current =
              false;

            timerRef.current = null;
          }, FEEDBACK_DELAY);
      },
      [
        feedback,
        moveForward,
        question.answer,
      ],
    );

  const restart =
    useCallback(() => {
      clearTimer();

      answerLockedRef.current = false;

      setMission(1);
      setQuestionIndex(0);
      setSelectedId(null);
      setFeedback("idle");
      setComplete(false);
    }, [clearTimer]);

  const questionWords =
    boundaries.length > 0
      ? boundaries.map(
          (word) =>
            word.text,
        )
      : question.prompt
          .trim()
          .split(/\s+/);

  const safeActiveIndex =
    activeWordIndex >= 0
      ? Math.min(
          activeWordIndex,
          questionWords.length - 1,
        )
      : -1;

  const displayedQuestionWords =
    safeActiveIndex >= 0
      ? questionWords.slice(
          0,
          safeActiveIndex + 1,
        )
      : [];

  const displayedActiveWordIndex =
    displayedQuestionWords.length > 0
      ? displayedQuestionWords.length - 1
      : -1;

  const displayedActiveWord =
    displayedActiveWordIndex >= 0
      ? displayedQuestionWords[
          displayedActiveWordIndex
        ] ?? ""
      : "";

  const activity =
    renderActivity(
      question,
      feedback === "correct",
    );

  const answerOptions =
    displayedChoices.map(
      (choice) => ({
        id: choice.id,
        ariaLabel: choice.label,
        content: (
          <div style={styles.textAnswer}>
            <strong>
              {choice.label}
            </strong>
          </div>
        ),
      }),
    );

  if (complete) {
    return (
      <LessonCompleteAny
        lessonKey="lesson67"
        title="أَحْسَنْتَ يَا بَطَلُ!"
        subtitle="أَتْقَنْتَ تَمَارِينَ الْحَصِيلَةِ 3."
        nextPath="/lesson-v2/lesson68"
        nextLabel="الدَّرْسُ التَّالِي"
        onNext={() =>
          navigate(
            "/lesson-v2/lesson68",
          )
        }
        onContinue={() =>
          navigate(
            "/lesson-v2/lesson68",
          )
        }
        onRetry={restart}
        onRestart={restart}
      />
    );
  }

  return (
    <UnifiedExerciseScreenV2
      index={questionIndex}
      total={missionQuestions.length}
      missionTitle=""
      questionWords={
        displayedQuestionWords
      }
      activeWordIndex={
        displayedActiveWordIndex
      }
      activeWord={
        displayedActiveWord
      }
      onReplay={replay}
      isPlaying={isPlaying}
      activity={activity}
      answers={
        <UnifiedExerciseAnswersV2
          options={answerOptions}
          selectedId={selectedId}
          feedback={feedback}
          correctId={question.answer}
          showCorrect={false}
          onSelect={selectAnswer}
          variant="text"
          columns={2}
          direction="rtl"
          disabled={
            feedback !== "idle"
          }
        />
      }
      feedback={feedback}
      successText="أَحْسَنْتَ ✅"
      retryText="حَاوِلْ مَرَّةً أُخْرَى ✨"
      activityLabel="محتوى تمرين الدرس 66"
      answersLabel="خيارات الإجابة"
    />
  );
}


const styles: Record<
  string,
  CSSProperties
> = {
  activityCard: {
    width: "100%",
    maxWidth: 650,
    margin: "0 auto",
    padding: 14,
    boxSizing: "border-box",
    border: "4px solid #edb21f",
    borderRadius: 28,
    background: "#ffffff",
    color: "#17365f",
    display: "grid",
    gap: 13,
    boxShadow:
      "0 10px 24px rgba(23,54,95,.13)",
  },

  lessonImage: {
    width: "100%",
    height: "clamp(320px,58dvh,520px)",
    objectFit: "contain",
    objectPosition: "center",
    display: "block",
    borderRadius: 22,
    background: "#f2faf5",
  },

  revealBox: {
    padding: "10px 14px",
    border: "3px solid #20a66a",
    borderRadius: 18,
    background: "#eafff3",
    color: "#137a4c",
    textAlign: "center",
    direction: "rtl",
    fontSize: "clamp(17px,4.5vw,24px)",
    fontWeight: 1000,
    lineHeight: 1.6,
  },

  sentenceBox: {
    padding: "13px 15px",
    border: "3px solid #edb21f",
    borderRadius: 19,
    background: "#fffaf0",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    direction: "rtl",
    textAlign: "center",
    fontSize: "clamp(19px,5vw,28px)",
    fontWeight: 900,
    lineHeight: 1.7,
  },

  blankWord: {
    minWidth: 110,
    padding: "2px 10px",
    borderBottom: "4px solid #edb21f",
    color: "#137a4c",
    textAlign: "center",
  },

  wordChips: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
    direction: "rtl",
  },

  wordChip: {
    padding: "7px 12px",
    border: "2px solid #91b9dd",
    borderRadius: 999,
    background: "#edf7ff",
    color: "#17365f",
    fontSize: "clamp(16px,4.2vw,22px)",
    fontWeight: 900,
  },

  orderResult: {
    minHeight: 62,
    padding: "10px 13px",
    border: "3px solid #edb21f",
    borderRadius: 18,
    background: "#fffaf0",
    display: "grid",
    placeItems: "center",
    direction: "rtl",
    textAlign: "center",
    color: "#17365f",
    fontSize: "clamp(18px,4.7vw,25px)",
    fontWeight: 1000,
    lineHeight: 1.6,
  },

  readingText: {
    padding: "10px 14px",
    borderRadius: 18,
    background: "#edf7ff",
    direction: "rtl",
    textAlign: "center",
    color: "#17365f",
    fontSize: "clamp(17px,4.5vw,23px)",
    fontWeight: 800,
    lineHeight: 1.7,
  },

  readingQuestion: {
    padding: "9px 13px",
    border: "3px solid #edb21f",
    borderRadius: 18,
    background: "#fffaf0",
    direction: "rtl",
    textAlign: "center",
    color: "#17365f",
    fontSize: "clamp(17px,4.5vw,23px)",
    fontWeight: 1000,
    lineHeight: 1.6,
  },

  textAnswer: {
    width: "100%",
    minHeight: 60,
    display: "grid",
    placeItems: "center",
    direction: "rtl",
    textAlign: "center",
    padding: "3px 5px",
    boxSizing: "border-box",
    fontSize: "clamp(14px,3.7vw,20px)",
    lineHeight: 1.5,
  },
};
