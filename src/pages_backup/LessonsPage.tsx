import { useEffect, useState } from "react";
import { getLessons } from "../services/lessonService";
import AppCard from "../shared/components/AppCard";
import AppButton from "../shared/components/AppButton";

export default function LessonsPage({
  subjectId,
  onSelect,
}: any) {
  const [lessons, setLessons] = useState<any[]>([]);

  useEffect(() => {
    if (!subjectId) return;
    getLessons(subjectId).then(setLessons);
  }, [subjectId]);

  return (
    <div>
      <h2>Lessons</h2>

      {lessons.map((l) => (
        <AppCard key={l.id}>
          <h3>{l.title}</h3>
          <p>{l.content}</p>

          <AppButton onClick={() => onSelect(l.id)}>
            Start Exercises
          </AppButton>
        </AppCard>
      ))}
    </div>
  );
}
