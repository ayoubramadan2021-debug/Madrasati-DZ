import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

import UnifiedExerciseScreenV2 from "../components/UnifiedExerciseScreenV2";
import UnifiedExerciseAnswersV2 from "../components/UnifiedExerciseAnswersV2";
import LessonCompleteV2 from "../components/LessonCompleteV2";

type Feedback =
  | "idle"
  | "correct"
  | "wrong";

type Mission = 1 | 2 | 3 | 4;

type QuestionKind =
  | "fill"
  | "behavior"
  | "heart"
  | "reading";

type VisualKind =
  | "air"
  | "smoke"
  | "heart"
  | "book";

type Choice = {
  id: string;
  label: string;
};

type Question = {
  id: string;
  mission: Mission;
  kind: QuestionKind;
  visual: VisualKind;

  prompt: string;
  audioKey: string;

  choices: Choice[];
  answer: string;

  sentenceBefore?: string;
  sentenceAfter?: string;
  answerWord?: string;

  situation?: string;
  passage?: string;
  questionText?: string;
  revealText?: string;
};

type WordTiming = {
  text: string;
  offset: number;
  duration: number;
};

const AUDIO_BASE =
  "/audio/teachers/taline/"
  + "lesson_69_assessment_3_science/exercises";

const WORLD_HOME =
  "/world/827a3923-94f7-4b33-99e6-2d3c8d957e0c";

const FEEDBACK_DELAY = 1450;

const choice = (
  id: string,
  label: string,
): Choice => ({
  id,
  label,
});

const QUESTIONS: Question[] = [
  {
    id: "l69_ex1_q1",
    mission: 1,
    kind: "fill",
    visual: "air",
    prompt:
      "أَكْمِلِ الْجُمْلَةَ "
      + "بِالْكَلِمَةِ الْمُنَاسِبَةِ.",
    audioKey: "l69_ex1_q1",
    sentenceBefore:
      "كَثْرَةُ النَّوَافِذِ تَسْمَحُ "
      + "بِدُخُولِ",
    sentenceAfter:
      "النَّقِيِّ إِلَى الْقِسْمِ.",
    answerWord: "الْهَوَاءِ",
    choices: [
      choice("a", "الْهَوَاءِ"),
      choice("b", "الدُّخَانِ"),
      choice("c", "الْغُبَارِ"),
      choice("d", "الضَّوْضَاءِ"),
    ],
    answer: "a",
  },
  {
    id: "l69_ex1_q2",
    mission: 1,
    kind: "fill",
    visual: "air",
    prompt:
      "أَكْمِلِ الْجُمْلَةَ "
      + "بِالْكَلِمَةِ الْمُنَاسِبَةِ.",
    audioKey: "l69_ex1_q2",
    sentenceBefore:
      "نَتَنَفَّسُ الْهَوَاءَ",
    sentenceAfter:
      "لِنَحْفَظَ صِحَّتَنَا.",
    answerWord: "النَّقِيَّ",
    choices: [
      choice("a", "الْمُلَوَّثَ"),
      choice("b", "النَّقِيَّ"),
      choice("c", "الْمُغْبَرَّ"),
      choice("d", "الدَّاخِنَ"),
    ],
    answer: "b",
  },
  {
    id: "l69_ex1_q3",
    mission: 1,
    kind: "fill",
    visual: "air",
    prompt:
      "أَكْمِلِ الْجُمْلَةَ "
      + "بِالْكَلِمَةِ الْمُنَاسِبَةِ.",
    audioKey: "l69_ex1_q3",
    sentenceBefore:
      "تَكُونُ تَهْوِيَةُ الْقِسْمِ "
      + "جَيِّدَةً عِنْدَمَا تَكُونُ "
      + "النَّوَافِذُ",
    sentenceAfter: ".",
    answerWord: "مَفْتُوحَةً",
    choices: [
      choice("a", "مُغْلَقَةً"),
      choice("b", "مَكْسُورَةً"),
      choice("c", "مَفْتُوحَةً"),
      choice("d", "مُلَوَّنَةً"),
    ],
    answer: "c",
  },
  {
    id: "l69_ex1_q4",
    mission: 1,
    kind: "fill",
    visual: "air",
    prompt:
      "أَكْمِلِ الْجُمْلَةَ "
      + "بِالْكَلِمَةِ الْمُنَاسِبَةِ.",
    audioKey: "l69_ex1_q4",
    sentenceBefore:
      "لِتَجْدِيدِ هَوَاءِ الْقِسْمِ",
    sentenceAfter:
      "النَّوَافِذَ.",
    answerWord: "نَفْتَحُ",
    choices: [
      choice("a", "نُغْلِقُ"),
      choice("b", "نَكْسِرُ"),
      choice("c", "نُلَوِّنُ"),
      choice("d", "نَفْتَحُ"),
    ],
    answer: "d",
  },

  {
    id: "l69_ex2_q1",
    mission: 2,
    kind: "behavior",
    visual: "smoke",
    prompt:
      "جِدِ التَّصَرُّفَ الصَّحِيحَ.",
    audioKey: "l69_ex2_q1",
    situation:
      "اِنْبَعَثَ دُخَانٌ أَسْوَدُ "
      + "فِي الْقِسْمِ.",
    choices: [
      choice(
        "a",
        "أَفْتَحُ النَّوَافِذَ "
        + "وَأُخْبِرُ الْمُعَلِّمَةَ.",
      ),
      choice(
        "b",
        "أُشْعِلُ الْمَصَابِيحَ.",
      ),
      choice(
        "c",
        "أُغْلِقُ النَّوَافِذَ.",
      ),
      choice(
        "d",
        "أَبْقَى قَرِيبًا مِنَ الدُّخَانِ.",
      ),
    ],
    answer: "a",
    revealText:
      "أَفْتَحُ النَّوَافِذَ "
      + "وَأُخْبِرُ الْمُعَلِّمَةَ.",
  },
  {
    id: "l69_ex2_q2",
    mission: 2,
    kind: "behavior",
    visual: "air",
    prompt:
      "جِدِ التَّصَرُّفَ الصَّحِيحَ.",
    audioKey: "l69_ex2_q2",
    situation:
      "شَمَمْتُ رَائِحَةً غَيْرَ "
      + "مُرِيحَةٍ فِي الْغُرْفَةِ.",
    choices: [
      choice(
        "a",
        "أَخْتَبِئُ تَحْتَ الطَّاوِلَةِ.",
      ),
      choice(
        "b",
        "أُهَوِّي الْغُرْفَةَ "
        + "بِفَتْحِ النَّافِذَةِ.",
      ),
      choice(
        "c",
        "أُغْلِقُ الْبَابَ وَالنَّافِذَةَ.",
      ),
      choice(
        "d",
        "أَزِيدُ الرَّائِحَةَ.",
      ),
    ],
    answer: "b",
    revealText:
      "أُهَوِّي الْغُرْفَةَ "
      + "بِفَتْحِ النَّافِذَةِ.",
  },
  {
    id: "l69_ex2_q3",
    mission: 2,
    kind: "behavior",
    visual: "air",
    prompt:
      "جِدِ التَّصَرُّفَ الصَّحِيحَ.",
    audioKey: "l69_ex2_q3",
    situation:
      "كَانَ الْقِسْمُ مُغْلَقًا "
      + "وَهَوَاؤُهُ غَيْرَ نَقِيٍّ.",
    choices: [
      choice(
        "a",
        "أُطْفِئُ الْمَصَابِيحَ فَقَطْ.",
      ),
      choice(
        "b",
        "أُغْلِقُ النَّوَافِذَ.",
      ),
      choice(
        "c",
        "أَفْتَحُ النَّوَافِذَ "
        + "لِتَجْدِيدِ الْهَوَاءِ.",
      ),
      choice(
        "d",
        "أَنْشُرُ الْغُبَارَ.",
      ),
    ],
    answer: "c",
    revealText:
      "أَفْتَحُ النَّوَافِذَ "
      + "لِتَجْدِيدِ الْهَوَاءِ.",
  },
  {
    id: "l69_ex2_q4",
    mission: 2,
    kind: "behavior",
    visual: "smoke",
    prompt:
      "جِدِ التَّصَرُّفَ الصَّحِيحَ.",
    audioKey: "l69_ex2_q4",
    situation:
      "رَأَيْتُ دُخَانًا كَثِيفًا "
      + "قُرْبِي.",
    choices: [
      choice(
        "a",
        "أَقْتَرِبُ مِنَ الدُّخَانِ.",
      ),
      choice(
        "b",
        "أَلْعَبُ بِجَانِبِهِ.",
      ),
      choice(
        "c",
        "أَتَجَاهَلُهُ.",
      ),
      choice(
        "d",
        "أَبْتَعِدُ عَنِ الدُّخَانِ "
        + "وَأُنَبِّهُ الْكِبَارَ.",
      ),
    ],
    answer: "d",
    revealText:
      "أَبْتَعِدُ عَنِ الدُّخَانِ "
      + "وَأُنَبِّهُ الْكِبَارَ.",
  },

  {
    id: "l69_ex3_q1",
    mission: 3,
    kind: "heart",
    visual: "heart",
    prompt:
      "أَكْمِلِ الْجُمْلَةَ "
      + "عَنْ نَبْضِ الْقَلْبِ.",
    audioKey: "l69_ex3_q1",
    sentenceBefore:
      "عِنْدَمَا شَعَرْتُ بِالْخَوْفِ "
      + "بَدَأَ قَلْبِي يَنْبِضُ",
    sentenceAfter: ".",
    answerWord: "بِسُرْعَةٍ",
    choices: [
      choice("a", "بِسُرْعَةٍ"),
      choice("b", "بِلَا حَرَكَةٍ"),
      choice("c", "بِبُطْءٍ شَدِيدٍ"),
      choice("d", "مَرَّةً وَاحِدَةً"),
    ],
    answer: "a",
  },
  {
    id: "l69_ex3_q2",
    mission: 3,
    kind: "heart",
    visual: "heart",
    prompt:
      "أَكْمِلِ الْجُمْلَةَ "
      + "عَنْ نَبْضِ الْقَلْبِ.",
    audioKey: "l69_ex3_q2",
    sentenceBefore:
      "بَعْدَ الْجَرْيِ يَزْدَادُ",
    sentenceAfter:
      "الْقَلْبِ.",
    answerWord: "نَبْضُ",
    choices: [
      choice("a", "حَجْمُ"),
      choice("b", "نَبْضُ"),
      choice("c", "لَوْنُ"),
      choice("d", "شَكْلُ"),
    ],
    answer: "b",
  },
  {
    id: "l69_ex3_q3",
    mission: 3,
    kind: "heart",
    visual: "heart",
    prompt:
      "أَكْمِلِ الْجُمْلَةَ "
      + "عَنْ نَبْضِ الْقَلْبِ.",
    audioKey: "l69_ex3_q3",
    sentenceBefore:
      "عِنْدَ الرَّاحَةِ يَنْبِضُ "
      + "الْقَلْبُ",
    sentenceAfter: ".",
    answerWord: "بِانْتِظَامٍ",
    choices: [
      choice("a", "بِخَوْفٍ"),
      choice("b", "بِضَوْضَاءٍ"),
      choice("c", "بِانْتِظَامٍ"),
      choice("d", "بِدُونِ تَوَقُّفٍ"),
    ],
    answer: "c",
  },
  {
    id: "l69_ex3_q4",
    mission: 3,
    kind: "heart",
    visual: "heart",
    prompt:
      "أَكْمِلِ الْجُمْلَةَ "
      + "عَنْ نَبْضِ الْقَلْبِ.",
    audioKey: "l69_ex3_q4",
    sentenceBefore:
      "بَعْدَ التَّوَقُّفِ عَنِ الْجَرْيِ "
      + "يَعُودُ نَبْضُ الْقَلْبِ",
    sentenceAfter:
      "إِلَى حَالَتِهِ الْعَادِيَّةِ.",
    answerWord: "تَدْرِيجِيًّا",
    choices: [
      choice("a", "فَجْأَةً"),
      choice("b", "لَا يَعُودُ"),
      choice("c", "بِالْخَوْفِ"),
      choice("d", "تَدْرِيجِيًّا"),
    ],
    answer: "d",
  },

  {
    id: "l69_ex4_q1",
    mission: 4,
    kind: "reading",
    visual: "book",
    prompt:
      "اِقْرَأِ الْمَوْقِفَ "
      + "ثُمَّ أَجِبْ عَنِ السُّؤَالِ.",
    audioKey: "l69_ex4_q1",
    passage:
      "دَخَلَ دُخَانٌ إِلَى الْقِسْمِ، "
      + "فَفَتَحَتِ الْمُعَلِّمَةُ النَّوَافِذَ.",
    questionText:
      "لِمَاذَا فَتَحَتِ الْمُعَلِّمَةُ "
      + "النَّوَافِذَ؟",
    choices: [
      choice(
        "a",
        "لِتَجْدِيدِ الْهَوَاءِ "
        + "وَإِخْرَاجِ الدُّخَانِ.",
      ),
      choice(
        "b",
        "لِإِدْخَالِ الْغُبَارِ.",
      ),
      choice(
        "c",
        "لِزِيَادَةِ الدُّخَانِ.",
      ),
      choice(
        "d",
        "لِإِظْلَامِ الْقِسْمِ.",
      ),
    ],
    answer: "a",
    revealText:
      "فَتَحَتِ الْمُعَلِّمَةُ النَّوَافِذَ "
      + "لِتَجْدِيدِ الْهَوَاءِ "
      + "وَإِخْرَاجِ الدُّخَانِ.",
  },
  {
    id: "l69_ex4_q2",
    mission: 4,
    kind: "reading",
    visual: "heart",
    prompt:
      "اِقْرَأِ الْمَوْقِفَ "
      + "ثُمَّ أَجِبْ عَنِ السُّؤَالِ.",
    audioKey: "l69_ex4_q2",
    passage:
      "جَرَى أَمِينٌ بِسُرْعَةٍ، "
      + "فَازْدَادَ نَبْضُ قَلْبِهِ.",
    questionText:
      "لِمَاذَا ازْدَادَ نَبْضُ "
      + "قَلْبِ أَمِينٍ؟",
    choices: [
      choice(
        "a",
        "لِأَنَّهُ جَلَسَ.",
      ),
      choice(
        "b",
        "لِأَنَّهُ بَذَلَ جُهْدًا.",
      ),
      choice(
        "c",
        "لِأَنَّهُ نَامَ.",
      ),
      choice(
        "d",
        "لِأَنَّهُ قَرَأَ.",
      ),
    ],
    answer: "b",
    revealText:
      "ازْدَادَ نَبْضُ قَلْبِ أَمِينٍ "
      + "لِأَنَّهُ بَذَلَ جُهْدًا.",
  },
  {
    id: "l69_ex4_q3",
    mission: 4,
    kind: "reading",
    visual: "air",
    prompt:
      "اِقْرَأِ الْمَوْقِفَ "
      + "ثُمَّ أَجِبْ عَنِ السُّؤَالِ.",
    audioKey: "l69_ex4_q3",
    passage:
      "فِي الْقِسْمِ نَوَافِذُ كَثِيرَةٌ "
      + "تُفْتَحُ كُلَّ يَوْمٍ.",
    questionText:
      "مَا فَائِدَةُ فَتْحِ النَّوَافِذِ؟",
    choices: [
      choice(
        "a",
        "إِدْخَالُ الدُّخَانِ.",
      ),
      choice(
        "b",
        "مَنْعُ الضَّوْءِ.",
      ),
      choice(
        "c",
        "دُخُولُ الْهَوَاءِ النَّقِيِّ.",
      ),
      choice(
        "d",
        "زِيَادَةُ الْغُبَارِ.",
      ),
    ],
    answer: "c",
    revealText:
      "فَتْحُ النَّوَافِذِ يَسْمَحُ "
      + "بِدُخُولِ الْهَوَاءِ النَّقِيِّ.",
  },
  {
    id: "l69_ex4_q4",
    mission: 4,
    kind: "reading",
    visual: "heart",
    prompt:
      "اِقْرَأِ الْمَوْقِفَ "
      + "ثُمَّ أَجِبْ عَنِ السُّؤَالِ.",
    audioKey: "l69_ex4_q4",
    passage:
      "سَمِعَ الطِّفْلُ صَوْتًا مُفَاجِئًا، "
      + "فَشَعَرَ بِالْخَوْفِ.",
    questionText:
      "مَاذَا يَحْدُثُ لِنَبْضِ قَلْبِهِ؟",
    choices: [
      choice(
        "a",
        "يَتَوَقَّفُ.",
      ),
      choice(
        "b",
        "لَا يَتَغَيَّرُ أَبَدًا.",
      ),
      choice(
        "c",
        "يَخْتَفِي.",
      ),
      choice(
        "d",
        "يَنْبِضُ بِسُرْعَةٍ.",
      ),
    ],
    answer: "d",
    revealText:
      "عِنْدَ الْخَوْفِ يَنْبِضُ "
      + "الْقَلْبُ بِسُرْعَةٍ.",
  },
];

function ScienceVisual({
  kind,
}: {
  kind: VisualKind;
}) {
  const emoji =
    kind === "air"
      ? "🪟  🍃"
      : kind === "smoke"
        ? "🪟  💨"
        : kind === "heart"
          ? "❤️  💓"
          : "📖  🔎";

  return (
    <div
      style={styles.visual}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 640 160"
        style={styles.visualSvg}
      >
        <rect
          x="6"
          y="6"
          width="628"
          height="148"
          rx="30"
          fill="#f7fbff"
          stroke="#9ac5e8"
          strokeWidth="5"
        />

        <path
          d="M40 118 C150 55 245 138 340 75 C430 18 510 120 600 54"
          fill="none"
          stroke={
            kind === "heart"
              ? "#e95555"
              : "#56b98a"
          }
          strokeWidth="9"
          strokeLinecap="round"
          opacity=".35"
        />

        <circle
          cx="75"
          cy="80"
          r="38"
          fill="#fff4be"
          stroke="#edb21f"
          strokeWidth="5"
        />

        <circle
          cx="565"
          cy="80"
          r="38"
          fill="#edfff3"
          stroke="#28a95b"
          strokeWidth="5"
        />
      </svg>

      <div style={styles.emoji}>
        {emoji}
      </div>
    </div>
  );
}

function FillActivity({
  question,
  showResult,
}: {
  question: Question;
  showResult: boolean;
}) {
  return (
    <div style={styles.activityCard}>
      <ScienceVisual
        kind={question.visual}
      />

      <div style={styles.sentence}>
        <span>
          {question.sentenceBefore}
        </span>

        <strong style={styles.blank}>
          {showResult
            ? question.answerWord
            : "........"}
        </strong>

        <span>
          {question.sentenceAfter}
        </span>
      </div>
    </div>
  );
}

function BehaviorActivity({
  question,
  showResult,
}: {
  question: Question;
  showResult: boolean;
}) {
  return (
    <div style={styles.activityCard}>
      <ScienceVisual
        kind={question.visual}
      />

      <div style={styles.situation}>
        {question.situation}
      </div>

      {showResult && (
        <div style={styles.reveal}>
          ✅ {question.revealText}
        </div>
      )}
    </div>
  );
}

function ReadingActivity({
  question,
  showResult,
}: {
  question: Question;
  showResult: boolean;
}) {
  return (
    <div style={styles.activityCard}>
      <ScienceVisual
        kind={question.visual}
      />

      <div style={styles.passage}>
        {question.passage}
      </div>

      <div style={styles.questionBox}>
        {question.questionText}
      </div>

      {showResult && (
        <div style={styles.reveal}>
          ✅ {question.revealText}
        </div>
      )}
    </div>
  );
}

function renderActivity(
  question: Question,
  showResult: boolean,
): ReactNode {
  if (
    question.kind === "fill"
    || question.kind === "heart"
  ) {
    return (
      <FillActivity
        question={question}
        showResult={showResult}
      />
    );
  }

  if (question.kind === "behavior") {
    return (
      <BehaviorActivity
        question={question}
        showResult={showResult}
      />
    );
  }

  return (
    <ReadingActivity
      question={question}
      showResult={showResult}
    />
  );
}

function fallbackTimings(
  text: string,
): WordTiming[] {
  return text
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((word, index) => ({
      text: word,
      offset: index * 500,
      duration: 450,
    }));
}

export default function
Lesson69Assessment3ScienceExercises() {
  const [
    questionIndex,
    setQuestionIndex,
  ] = useState(0);

  const [
    selectedId,
    setSelectedId,
  ] = useState<string | null>(null);

  const [
    feedback,
    setFeedback,
  ] = useState<Feedback>("idle");

  const [
    locked,
    setLocked,
  ] = useState(false);

  const [
    complete,
    setComplete,
  ] = useState(false);

  const [
    timings,
    setTimings,
  ] = useState<WordTiming[]>([]);

  const [
    activeWordIndex,
    setActiveWordIndex,
  ] = useState(-1);

  const [
    isPlaying,
    setIsPlaying,
  ] = useState(false);

  const audioRef =
    useRef<HTMLAudioElement | null>(
      null,
    );

  const animationRef =
    useRef<number | null>(null);

  const question =
    QUESTIONS[questionIndex];

  const missionIndex =
    questionIndex % 4;

  const stopAudio =
    useCallback(() => {
      if (animationRef.current) {
        cancelAnimationFrame(
          animationRef.current,
        );

        animationRef.current = null;
      }

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      setIsPlaying(false);
    }, []);

  const updateKaraoke =
    useCallback(() => {
      const audio =
        audioRef.current;

      if (!audio) return;

      const currentTime =
        audio.currentTime * 1000;

      let index = -1;

      timings.forEach(
        (timing, timingIndex) => {
          if (
            currentTime >= timing.offset
          ) {
            index = timingIndex;
          }
        },
      );

      setActiveWordIndex(index);

      if (
        !audio.paused
        && !audio.ended
      ) {
        animationRef.current =
          requestAnimationFrame(
            updateKaraoke,
          );
      }
    }, [timings]);

  const replay =
    useCallback(async () => {
      stopAudio();

      const audio =
        new Audio(
          `${AUDIO_BASE}/`
          + `${question.audioKey}.mp3`,
        );

      audioRef.current = audio;
      setActiveWordIndex(-1);
      setIsPlaying(true);

      audio.onended = () => {
        setIsPlaying(false);
        setActiveWordIndex(
          Math.max(
            0,
            timings.length - 1,
          ),
        );
      };

      try {
        await audio.play();

        animationRef.current =
          requestAnimationFrame(
            updateKaraoke,
          );
      } catch {
        setIsPlaying(false);
      }
    }, [
      question.audioKey,
      stopAudio,
      timings.length,
      updateKaraoke,
    ]);

  useEffect(() => {
    let active = true;

    stopAudio();
    setSelectedId(null);
    setFeedback("idle");
    setLocked(false);
    setActiveWordIndex(-1);

    fetch(
      `${AUDIO_BASE}/`
      + `${question.audioKey}.json`,
    )
      .then(response => {
        if (!response.ok) {
          throw new Error(
            "timings unavailable",
          );
        }

        return response.json();
      })
      .then(payload => {
        if (!active) return;

        const loaded =
          Array.isArray(payload)
            ? payload
            : [];

        setTimings(
          loaded.length > 0
            ? loaded
            : fallbackTimings(
                question.prompt,
              ),
        );
      })
      .catch(() => {
        if (!active) return;

        setTimings(
          fallbackTimings(
            question.prompt,
          ),
        );
      });

    return () => {
      active = false;
      stopAudio();
    };
  }, [
    question.audioKey,
    question.prompt,
    stopAudio,
  ]);

  useEffect(() => {
    if (timings.length === 0) {
      return;
    }

    const timer =
      window.setTimeout(
        () => {
          void replay();
        },
        500,
      );

    return () => {
      window.clearTimeout(timer);
    };
  }, [
    question.id,
    replay,
    timings.length,
  ]);

  const selectAnswer =
    useCallback(
      (answerId: string) => {
        if (locked) return;

        stopAudio();
        setSelectedId(answerId);

        const isCorrect =
          answerId === question.answer;

        if (!isCorrect) {
          setFeedback("wrong");
          setLocked(true);

          window.setTimeout(() => {
            setFeedback("idle");
            setSelectedId(null);
            setLocked(false);
          }, 900);

          return;
        }

        setFeedback("correct");
        setLocked(true);

        window.setTimeout(() => {
          if (
            questionIndex
            < QUESTIONS.length - 1
          ) {
            setQuestionIndex(
              current => current + 1,
            );

            return;
          }

          setComplete(true);
        }, FEEDBACK_DELAY);
      },
      [
        locked,
        question.answer,
        questionIndex,
        stopAudio,
      ],
    );

  const restart =
    useCallback(() => {
      stopAudio();
      setQuestionIndex(0);
      setSelectedId(null);
      setFeedback("idle");
      setLocked(false);
      setComplete(false);
      setTimings([]);
      setActiveWordIndex(-1);
    }, [stopAudio]);

  const questionWords =
    useMemo(
      () =>
        timings.length > 0
          ? timings.map(
              timing => timing.text,
            )
          : question.prompt
              .trim()
              .split(/\s+/),
      [question.prompt, timings],
    );

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

  const answerOptions =
    question.choices.map(
      option => ({
        id: option.id,
        ariaLabel: option.label,
        content: (
          <div style={styles.answer}>
            {option.label}
          </div>
        ),
      }),
    );

  if (complete) {
    return (
      <LessonCompleteV2
        lessonKey="lesson69"
        message={
          "أَتْمَمْتَ تَمَارِينَ "
          + "الْحَصِيلَةِ الثَّالِثَةِ."
        }
        onReplay={restart}
        nextPath={WORLD_HOME}
        nextLabel="العودة إلى العالم"
        quizPath="/world/827a3923-94f7-4b33-99e6-2d3c8d957e0c/quiz"
      />
    );
  }

  return (
    <UnifiedExerciseScreenV2
      index={missionIndex}
      total={4}
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
      activity={renderActivity(
        question,
        feedback === "correct",
      )}
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
        />
      }
      feedback={feedback}
    />
  );
}

const styles: Record<
  string,
  CSSProperties
> = {
  activityCard: {
    width: "100%",
    maxWidth: 680,
    margin: "0 auto",
    padding: 13,
    boxSizing: "border-box",
    display: "grid",
    gap: 13,
    border: "4px solid #edb21f",
    borderRadius: 28,
    background: "#ffffff",
    boxShadow:
      "0 9px 22px rgba(23,54,95,.12)",
  },

  visual: {
    width: "100%",
    minHeight: 115,
    position: "relative",
    display: "grid",
    placeItems: "center",
    overflow: "hidden",
    borderRadius: 22,
  },

  visualSvg: {
    width: "100%",
    height: 115,
    display: "block",
  },

  emoji: {
    position: "absolute",
    inset: 0,
    display: "grid",
    placeItems: "center",
    direction: "ltr",
    fontSize: "clamp(38px,10vw,65px)",
    letterSpacing: 12,
  },

  sentence: {
    minHeight: 92,
    padding: "12px 15px",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    border: "3px solid #edb21f",
    borderRadius: 20,
    background: "#fffaf0",
    color: "#17365f",
    direction: "rtl",
    textAlign: "center",
    fontSize: "clamp(18px,4.8vw,27px)",
    fontWeight: 900,
    lineHeight: 1.8,
  },

  blank: {
    minWidth: 110,
    padding: "2px 10px",
    borderBottom: "4px solid #edb21f",
    color: "#16834c",
    textAlign: "center",
  },

  situation: {
    minHeight: 76,
    padding: "12px 15px",
    display: "grid",
    placeItems: "center",
    border: "3px solid #9ac5e8",
    borderRadius: 19,
    background: "#edf7ff",
    color: "#17365f",
    direction: "rtl",
    textAlign: "center",
    fontSize: "clamp(18px,4.8vw,26px)",
    fontWeight: 900,
    lineHeight: 1.7,
  },

  passage: {
    padding: "11px 15px",
    border: "3px solid #9ac5e8",
    borderRadius: 19,
    background: "#edf7ff",
    color: "#17365f",
    direction: "rtl",
    textAlign: "center",
    fontSize: "clamp(17px,4.4vw,24px)",
    fontWeight: 850,
    lineHeight: 1.75,
  },

  questionBox: {
    padding: "11px 15px",
    border: "3px solid #edb21f",
    borderRadius: 19,
    background: "#fffaf0",
    color: "#17365f",
    direction: "rtl",
    textAlign: "center",
    fontSize: "clamp(17px,4.5vw,25px)",
    fontWeight: 1000,
    lineHeight: 1.7,
  },

  reveal: {
    padding: "10px 14px",
    border: "3px solid #28a95b",
    borderRadius: 18,
    background: "#edfff3",
    color: "#16713e",
    direction: "rtl",
    textAlign: "center",
    fontSize: "clamp(17px,4.4vw,24px)",
    fontWeight: 1000,
    lineHeight: 1.65,
  },

  answer: {
    width: "100%",
    minHeight: 62,
    padding: "5px 7px",
    boxSizing: "border-box",
    display: "grid",
    placeItems: "center",
    color: "#17365f",
    direction: "rtl",
    textAlign: "center",
    fontSize: "clamp(14px,3.7vw,20px)",
    fontWeight: 900,
    lineHeight: 1.5,
  },
};
