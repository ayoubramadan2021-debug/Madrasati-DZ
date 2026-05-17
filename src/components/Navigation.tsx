import { useState } from "react";
import DashboardPage from "../pages/DashboardPage";
import SubjectsPage from "../pages/SubjectsPage";
import LessonsPage from "../pages/LessonsPage";
import LessonFlowPage from "../pages/LessonFlowPage";

export default function Navigation() {
  const [page, setPage] = useState("dashboard");

  const [subject, setSubject] = useState<string | null>(null);
  const [lesson, setLesson] = useState<string | null>(null);

  if (page === "dashboard") {
    return (
      <div>
        <h1>Taalim DZ</h1>

        <button onClick={() => setPage("subjects")}>
          Start Learning
        </button>
      </div>
    );
  }

  if (page === "subjects") {
    return (
      <SubjectsPage
        onSelect={(id: string) => {
          setSubject(id);
          setPage("lessons");
        }}
      />
    );
  }

  if (page === "lessons") {
    return (
      <LessonsPage
        subjectId={subject}
        onSelect={(id: string) => {
          setLesson(id);
          setPage("flow");
        }}
      />
    );
  }

  if (page === "flow") {
    return <LessonFlowPage lessonId={lesson} />;
  }

  return null;
}
