import {
  type CSSProperties,
  useState,
} from "react";

import NumbersTo39ExerciseV2 from
  "../features/lesson-v2/exercises-v2/NumbersTo39ExerciseV2";

import {
  lesson48Exercise1,
} from "../features/lesson-v2/content/lesson48_exercise1";
import {
  lesson48Exercise2,
} from "../features/lesson-v2/content/lesson48_exercise2";
import {
  lesson48Exercise3,
} from "../features/lesson-v2/content/lesson48_exercise3";
import {
  lesson48Exercise4,
} from "../features/lesson-v2/content/lesson48_exercise4";

const AUDIO_BASE =
  "/audio/teachers/khalil/lesson_48_numbers_to_39/exercises";

const WORLD_ID =
  "5daed3bb-7e62-4a5a-93a1-f6dec60df810";

const missions = [
  {
    title:
      "المَهَمَّةُ الأُولَى: أُرَكِّبُ العَدَدَ",
    missionTitle:
      "المَهَمَّةُ الأُولَى: أُرَكِّبُ العَدَدَ",
    label:
      "المَهَمَّةُ الأُولَى: أُرَكِّبُ العَدَدَ",
    items: lesson48Exercise1,
    questions: lesson48Exercise1,
  },
  {
    title:
      "المَهَمَّةُ الثَّانِيَةُ: أَقْرَأُ وَأَخْتَارُ",
    missionTitle:
      "المَهَمَّةُ الثَّانِيَةُ: أَقْرَأُ وَأَخْتَارُ",
    label:
      "المَهَمَّةُ الثَّانِيَةُ: أَقْرَأُ وَأَخْتَارُ",
    items: lesson48Exercise2,
    questions: lesson48Exercise2,
  },
  {
    title:
      "المَهَمَّةُ الثَّالِثَةُ: أُكْمِلُ القِطَارَ العَدَدِيَّ",
    missionTitle:
      "المَهَمَّةُ الثَّالِثَةُ: أُكْمِلُ القِطَارَ العَدَدِيَّ",
    label:
      "المَهَمَّةُ الثَّالِثَةُ: أُكْمِلُ القِطَارَ العَدَدِيَّ",
    items: lesson48Exercise3,
    questions: lesson48Exercise3,
  },
  {
    title:
      "المَهَمَّةُ الرَّابِعَةُ: أُفَكِّكُ العَدَدَ",
    missionTitle:
      "المَهَمَّةُ الرَّابِعَةُ: أُفَكِّكُ العَدَدَ",
    label:
      "المَهَمَّةُ الرَّابِعَةُ: أُفَكِّكُ العَدَدَ",
    items: lesson48Exercise4,
    questions: lesson48Exercise4,
  },
] as const;

export default function Lesson48ExercisesPage() {
  const [missionIndex, setMissionIndex] =
    useState(0);

  const mission = missions[missionIndex];

  if (!mission) {
    return (
      <main dir="rtl" style={styles.page}>
        <section style={styles.complete}>
          <div
            className="lesson48-celebration-motion"
            role="img"
            aria-label="كأس النجاح"
          >
            <span
              className="lesson48-celebration-star lesson48-star-left"
              aria-hidden="true"
            >
              ✦
            </span>

            <span
              className="lesson48-celebration-trophy"
              aria-hidden="true"
            >
              🏆
            </span>

            <span
              className="lesson48-celebration-star lesson48-star-right"
              aria-hidden="true"
            >
              ✦
            </span>
          </div>

          <h1 style={styles.title}>
            أَحْسَنْتَ يَا بَطَلُ!
          </h1>

          <button
            type="button"
            style={{
              ...styles.actionButton,
              ...styles.nextButton,
            }}
            onClick={() => {
              window.location.href =
                "/lesson-v2/lesson49";
            }}
          >
            الدَّرْسُ التَّالِي
          </button>

          <button
            type="button"
            style={{
              ...styles.actionButton,
              ...styles.replayButton,
            }}
            onClick={() => setMissionIndex(0)}
          >
            إِعَادَةُ التَّمَارِينِ
          </button>

          <button
            type="button"
            style={{
              ...styles.actionButton,
              ...styles.quizButton,
            }}
            onClick={() => {
              window.location.href =
                `/world/${WORLD_ID}/quiz`;
            }}
          >
            اخْتِبَارُ العَالَمِ
          </button>
        </section>
      </main>
    );
  }

  return (
    <NumbersTo39ExerciseV2
      key={missionIndex}
      items={mission.items}
      audio_base={AUDIO_BASE}
      missionTitle={mission.title}
      onComplete={() =>
        setMissionIndex(
          (current) => current + 1,
        )
      }
    />
  );
}

const styles: Record<string, CSSProperties> = {
  page: {
    minHeight: "100dvh",
    display: "grid",
    placeItems: "center",
    boxSizing: "border-box",
    padding:
      "max(28px, env(safe-area-inset-top)) 20px calc(132px + env(safe-area-inset-bottom))",
    background:
      "linear-gradient(180deg,#fff8e8 0%,#fffaf2 56%,#edf8ff 100%)",
    fontFamily:
      "'Tajawal','Noto Kufi Arabic',Arial,sans-serif",
  },

  complete: {
    width: "min(640px,100%)",
    boxSizing: "border-box",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
    gap: 18,
  },

  trophy: {
    fontSize: "clamp(62px,17vw,88px)",
    lineHeight: 1,
    marginBottom: 2,
    filter: "drop-shadow(0 12px 22px rgba(237,178,31,.28))",
  },

  title: {
    margin: "0 0 18px",
    color: "#17365f",
    fontSize: "clamp(28px,6.8vw,40px)",
    lineHeight: 1.45,
    fontWeight: 1000,
  },

  actionButton: {
    width: "100%",
    minHeight: 68,
    padding: "17px 20px",
    border: 0,
    borderRadius: 25,
    color: "#fff",
    fontSize: "clamp(20px,4.9vw,27px)",
    lineHeight: 1.35,
    fontWeight: 1000,
    cursor: "pointer",
    boxShadow: "0 12px 25px rgba(23,54,95,.13)",
  },

  nextButton: {
    background: "#20aa64",
  },

  replayButton: {
    background: "#efa91a",
  },

  quizButton: {
    background: "#7b35ee",
  },
};
