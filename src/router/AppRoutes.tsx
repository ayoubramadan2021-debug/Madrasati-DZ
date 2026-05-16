import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import ProtectedRoutes from "./ProtectedRoutes";
import AdminRoute from "./AdminRoute";

import Home from "../pages/Home";
import GradePage from "../pages/GradePage";
import SubjectPage from "../pages/SubjectPage";
import SectionPage from "../pages/SectionPage";
import LessonPage from "../pages/LessonPage";
import ExercisePage from "../pages/ExercisePage";
import AuthPage from "../pages/AuthPage";
import ProgressPage from "../pages/ProgressPage";
import LeaderboardPage from "../pages/LeaderboardPage";
import SearchPage from "../pages/SearchPage";
import FavoritesPage from "../pages/FavoritesPage";
import AchievementsPage from "../pages/AchievementsPage";
import ProfilePage from "../pages/ProfilePage";
import EditProfilePage from "../pages/EditProfilePage";
import ParentPage from "../pages/ParentPage";
import ParentDashboardPage from "../pages/ParentDashboardPage";
import NotificationsPage from "../pages/NotificationsPage";
import SupportPage from "../pages/SupportPage";
const AiTutorPage = lazy(() => import("../pages/AiTutorPage"));

const AdminPage = lazy(() => import("../pages/AdminPage"));

type AppRoutesProps = {
  theme: any;
  setThemeName: (themeName: string) => void;
};

function AppRoutes({ theme, setThemeName }: AppRoutesProps) {
  const pageProps = { theme, setThemeName };

  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#0f172a",
            color: "white",
            fontSize: "22px",
          }}
        >
          ⏳ جاري تحميل الصفحة...
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Home {...pageProps} />} />
        <Route path="/search" element={<SearchPage {...pageProps} />} />

        <Route
          path="/favorites"
          element={
            <ProtectedRoutes>
              <FavoritesPage {...pageProps} />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/progress"
          element={
            <ProtectedRoutes>
              <ProgressPage {...pageProps} />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/notifications"
          element={
            <ProtectedRoutes>
              <NotificationsPage {...pageProps} />
            </ProtectedRoutes>
          }
        />

        <Route path="/achievements" element={<AchievementsPage {...pageProps} />} />
        <Route path="/profile" element={<ProfilePage {...pageProps} />} />
        <Route path="/profile/edit" element={<EditProfilePage {...pageProps} />} />
        <Route path="/parent" element={<ParentPage {...pageProps} />} />
        <Route path="/parent-dashboard" element={<ParentDashboardPage {...pageProps} />} />
        <Route path="/support" element={<SupportPage {...pageProps} />} />
        <Route path="/ai-tutor" element={<AiTutorPage {...pageProps} />} />
        <Route path="/auth" element={<AuthPage {...pageProps} />} />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminPage {...pageProps} />
            </AdminRoute>
          }
        />

        <Route path="/leaderboard" element={<LeaderboardPage {...pageProps} />} />
        <Route path="/grade/:id" element={<GradePage {...pageProps} />} />
        <Route
          path="/grade/:gradeId/subject/:subject"
          element={<SubjectPage {...pageProps} />}
        />
        <Route
          path="/grade/:gradeId/subject/:subject/section/:section"
          element={<SectionPage {...pageProps} />}
        />
        <Route
          path="/grade/:gradeId/subject/:subject/lesson/:lessonId"
          element={<LessonPage />}
        />
        <Route
          path="/grade/:gradeId/subject/:subject/exercise/:exerciseId"
          element={<ExercisePage {...pageProps} />}
        />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
