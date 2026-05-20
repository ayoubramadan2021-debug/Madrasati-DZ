import { Routes, Route, Navigate } from "react-router-dom";
import Home              from "../pages/Home";
import AuthPage          from "../pages/AuthPage";
import GradePage         from "../pages/GradePage";
import SubjectPage       from "../pages/SubjectPage";
import SectionPage       from "../pages/SectionPage";
import LessonPage        from "../pages/LessonPage";
import ExercisePage      from "../pages/ExercisePage";
import AiTutorPage       from "../pages/AiTutorPage";
import ProgressPage      from "../pages/ProgressPage";
import LeaderboardPage   from "../pages/LeaderboardPage";
import FavoritesPage     from "../pages/FavoritesPage";
import NotificationsPage from "../pages/NotificationsPage";
import SupportPage       from "../pages/SupportPage";
import ProfilePage       from "../pages/ProfilePage";
import AdminPage         from "../pages/AdminPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/"                                                              element={<Home />} />
      <Route path="/auth"                                                          element={<AuthPage />} />
      <Route path="/grade/:gradeId"                                                element={<GradePage />} />
      <Route path="/grade/:gradeId/subject/:subject"                               element={<SubjectPage />} />
      <Route path="/grade/:gradeId/subject/:subject/section/:section"              element={<SectionPage />} />
      <Route path="/grade/:gradeId/subject/:subject/lesson/:lessonId"              element={<LessonPage />} />
      <Route path="/grade/:gradeId/subject/:subject/exercise/:exerciseId"          element={<ExercisePage />} />
      <Route path="/lesson/:lessonId"                                              element={<LessonPage />} />
      <Route path="/exercise/:lessonId"                                            element={<ExercisePage />} />
      <Route path="/ai-tutor"                                                      element={<AiTutorPage />} />
      <Route path="/progress"                                                      element={<ProgressPage />} />
      <Route path="/leaderboard"                                                   element={<LeaderboardPage />} />
      <Route path="/favorites"                                                     element={<FavoritesPage />} />
      <Route path="/notifications"                                                 element={<NotificationsPage />} />
      <Route path="/support"                                                       element={<SupportPage />} />
      <Route path="/profile"                                                       element={<ProfilePage />} />
      <Route path="/admin"                                                         element={<AdminPage />} />
      <Route path="*"                                                              element={<Navigate to="/" replace />} />
    </Routes>
  );
}
