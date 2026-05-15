import { useEffect, useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

import { themes } from "./theme";

import Home from "./pages/Home";
import GradePage from "./pages/GradePage";
import SubjectPage from "./pages/SubjectPage";
import SectionPage from "./pages/SectionPage";
import LessonPage from "./pages/LessonPage";
import ExercisePage from "./pages/ExercisePage";
import AuthPage from "./pages/AuthPage";
import AdminPage from "./pages/AdminPage";
import ProgressPage from "./pages/ProgressPage";
import ProtectedRoute from "./components/ProtectedRoute";
import LeaderboardPage from "./pages/LeaderboardPage";
import SearchPage from "./pages/SearchPage";
import FavoritesPage from "./pages/FavoritesPage";
import AchievementsPage from "./pages/AchievementsPage";
import ProfilePage from "./pages/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import ParentPage from "./pages/ParentPage";
import ParentDashboardPage from "./pages/ParentDashboardPage";
import NotificationsPage from "./pages/NotificationsPage";
import SupportPage from "./pages/SupportPage";
import AiTutorPage from "./pages/AiTutorPage";

function App() {
  const savedTheme = localStorage.getItem("madrasati-theme") || "dark";
  const [themeName, setThemeName] = useState(savedTheme);

  useEffect(() => {
    localStorage.setItem("madrasati-theme", themeName);
  }, [themeName]);

  const theme = themes[themeName] || themes.dark;

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home theme={theme} setThemeName={setThemeName} />} />
        <Route path="/search" element={<SearchPage theme={theme} setThemeName={setThemeName} />} />
        <Route path="/favorites" element={<FavoritesPage theme={theme} setThemeName={setThemeName} />} />
        <Route path="/achievements" element={<AchievementsPage theme={theme} setThemeName={setThemeName} />} />
        <Route path="/profile" element={<ProfilePage theme={theme} setThemeName={setThemeName} />} />
        <Route path="/profile/edit" element={<EditProfilePage theme={theme} setThemeName={setThemeName} />} />
        <Route path="/parent" element={<ParentPage theme={theme} setThemeName={setThemeName} />} />
        <Route path="/parent-dashboard" element={<ParentDashboardPage theme={theme} setThemeName={setThemeName} />} />
        <Route path="/notifications" element={<NotificationsPage theme={theme} setThemeName={setThemeName} />} />
        <Route path="/support" element={<SupportPage theme={theme} setThemeName={setThemeName} />} />
        <Route path="/ai-tutor" element={<AiTutorPage theme={theme} setThemeName={setThemeName} />} />
        <Route path="/auth" element={<AuthPage theme={theme} setThemeName={setThemeName} />} />
        <Route path="/admin" element={<AdminPage theme={theme} setThemeName={setThemeName} />} />
        <Route path="/progress" element={<ProgressPage theme={theme} setThemeName={setThemeName} />} />
        <Route path="/leaderboard" element={<LeaderboardPage theme={theme} setThemeName={setThemeName} />} />
        <Route path="/grade/:id" element={<GradePage theme={theme} setThemeName={setThemeName} />} />
        <Route path="/grade/:gradeId/subject/:subject" element={<SubjectPage theme={theme} setThemeName={setThemeName} />} />
        <Route path="/grade/:gradeId/subject/:subject/section/:section" element={<SectionPage theme={theme} setThemeName={setThemeName} />} />
        <Route path="/grade/:gradeId/subject/:subject/lesson/:lessonId" element={<LessonPage theme={theme} setThemeName={setThemeName} />} />
        <Route path="/grade/:gradeId/subject/:subject/exercise/:exerciseId" element={<ExercisePage theme={theme} setThemeName={setThemeName} />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
