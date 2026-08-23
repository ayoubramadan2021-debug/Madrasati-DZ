import type { CSSProperties } from "react";

import UnifiedLessonExercisesV2 from "../features/lesson-v2/exercises-v2/UnifiedLessonExercisesV2";

import {
  LESSON_49_MISSION_TITLES,
  LESSON_49_UNIFIED_AUDIO_BASE,
  LESSON_49_UNIFIED_QUESTIONS,
} from "../features/lesson-v2/content/lesson49_exercises_unified";

export default function Lesson49ExercisesPage() {
  return (
    <UnifiedLessonExercisesV2
      lessonKey="lesson49"
      audioBase={LESSON_49_UNIFIED_AUDIO_BASE}
      questions={LESSON_49_UNIFIED_QUESTIONS}
      missionTitles={LESSON_49_MISSION_TITLES}
      missionCount={4}
      completionMessage="أَتْمَمْتَ تَمَارِينَ مَصَادِرِ الْأَغْذِيَةِ وَالْوَجْبَةِ الصِّحِّيَّةِ."
      nextPath="/world2-lesson/50"
      nextLabel="الدرس التالي"
      renderActivity={({ question }) => renderImageActivity({ question })}
    />
  );
}


function renderImageActivity({
  question,
}: {
  question: {
    backgroundImage?: string;
    activityLabel?: string;
    prompt: string;
  };
}) {
  return (
    <div style={styles.activityWrap}>
      {question.backgroundImage ? (
        <img
          src={question.backgroundImage}
          alt={question.activityLabel ?? question.prompt}
          style={styles.activityImage}
        />
      ) : (
        <div style={styles.activityFallback}>🖼️</div>
      )}

      {question.activityLabel ? (
        <div style={styles.activityBadge}>{question.activityLabel}</div>
      ) : null}
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  activityWrap: {
    width: "100%",
    height: "100%",
    display: "grid",
    placeItems: "center",
    gap: 12,
    padding: 14,
    boxSizing: "border-box",
  },
  activityImage: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    borderRadius: 22,
    display: "block",
  },
  activityBadge: {
    marginTop: -6,
    background: "rgba(255,248,236,.96)",
    color: "#1B3A6B",
    border: "2px solid #E8A020",
    borderRadius: 999,
    padding: "6px 14px",
    fontWeight: 800,
    fontSize: 14,
    lineHeight: 1.2,
    textAlign: "center",
    boxShadow: "0 6px 14px rgba(0,0,0,.08)",
  },
  activityFallback: {
    width: "100%",
    height: "100%",
    minHeight: 180,
    borderRadius: 22,
    display: "grid",
    placeItems: "center",
    background: "linear-gradient(135deg,#FFF8EC,#F8FBFF)",
    color: "#1B3A6B",
    fontSize: 42,
  },
};
