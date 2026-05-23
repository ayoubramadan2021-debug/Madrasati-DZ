import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";
import Home from "./pages/Home";
import AiTutorPage from "./pages/AiTutorPage";
import ExerciseDemoPage from "./pages/ExerciseDemoPage";
import BottomNav from "./shared/components/BottomNav";

const lazy = (importFn: () => Promise<any>, title: string) => {
  const LazyComponent = React.lazy(importFn);
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "#07101f", display: "grid", placeItems: "center", color: "#E8A020", fontFamily: "Tajawal,Cairo,sans-serif", fontSize: 15 }}>جاري تحميل {title}... ✨</div>}>
      <LazyComponent />
    </Suspense>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exercise-demo" element={<ExerciseDemoPage />} />
        <Route path="/ai-tutor" element={<AiTutorPage />} />

        {/* مسار المادة والأقسام - موحّد مع روابط الصفحات */}
        <Route path="/grade/:gradeId" element={lazy(() => import("./pages/GradePage"), "الأقسام")} />
        <Route path="/grade/:gradeId/subject/:subject" element={lazy(() => import("./pages/SubjectPage"), "المادة")} />
        <Route path="/grade/:gradeId/subject/:subject/section/:section" element={lazy(() => import("./pages/SectionPage"), "القسم")} />

        {/* مسارات الدروس والتمارين والاختبارات */}
        <Route path="/lesson/:lessonId" element={lazy(() => import("./pages/LessonPage"), "الدروس")} />
        <Route path="/exercise/:exerciseId" element={lazy(() => import("./pages/ExercisePage"), "التمارين")} />
        <Route path="/quiz/:lessonId" element={lazy(() => import("./pages/QuizPage"), "الاختبارات")} />
        <Route path="/quiz" element={lazy(() => import("./pages/QuizPage"), "الاختبارات")} />

        {/* بقية الصفحات */}
        <Route path="/leaderboard" element={lazy(() => import("./pages/LeaderboardPage"), "لوحة الصدارة")} />
        <Route path="/progress" element={lazy(() => import("./pages/ProgressPage"), "التقدم")} />
        <Route path="/profile" element={lazy(() => import("./pages/ProfilePage"), "الحساب")} />
        <Route path="/profile/edit" element={lazy(() => import("./pages/EditProfilePage"), "تعديل الحساب")} />
        <Route path="/auth" element={lazy(() => import("./pages/AuthPage"), "الدخول")} />
        <Route path="/parent" element={lazy(() => import("./pages/ParentPage"), "بوابة الأولياء")} />
        <Route path="/parent/dashboard" element={lazy(() => import("./pages/ParentDashboardPage"), "لوحة الأولياء")} />
        <Route path="/admin" element={lazy(() => import("./pages/AdminPage"), "لوحة الإدارة")} />
        <Route path="/search" element={lazy(() => import("./pages/SearchPage"), "البحث")} />
        <Route path="/achievements" element={lazy(() => import("./pages/AchievementsPage"), "الإنجازات")} />
        <Route path="/support" element={lazy(() => import("./pages/SupportPage"), "الدعم")} />
        <Route path="/dashboard" element={lazy(() => import("./pages/DashboardPage"), "اللوحة")} />
        <Route path="/favorites" element={lazy(() => import("./pages/FavoritesPage"), "المفضلة")} />
        <Route path="/notifications" element={lazy(() => import("./pages/NotificationsPage"), "الإشعارات")} />

        <Route path="*" element={<Home />} />
      </Routes>
      <BottomNav />
    </Router>
  );
}
