import { useEffect, useState } from "react";

import Layout from "../components/Layout";
import { common } from "../theme";

import { getCurrentUser } from "../services/authService";
import { supabase } from "../lib/supabaseClient";

function ParentDashboardPage({ theme, setThemeName }) {
  const [loading, setLoading] = useState(true);
  const [parent, setParent] = useState(null);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    loadParentDashboard();
  }, []);

  async function loadParentDashboard() {
    setLoading(true);

    const currentUser = await getCurrentUser();
    setParent(currentUser);

    if (!currentUser) {
      setLoading(false);
      return;
    }

    const { data: links } = await supabase
      .from("parent_links")
      .select("*")
      .eq("parent_email", currentUser.email);

    const results = [];

    for (const link of links || []) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", link.student_id)
        .single();

      const { data: progress } = await supabase
        .from("progress")
        .select("*")
        .eq("user_id", link.student_id);

      const totalPoints = (progress || []).reduce(
        (sum, item) => sum + Number(item.points || 0),
        0
      );

      const exercises = (progress || []).filter((item) =>
        String(item.lesson_id || "").includes("exercise")
      ).length;

      const quizzes = (progress || []).filter((item) =>
        String(item.lesson_id || "").includes("quiz")
      ).length;

      results.push({
        profile,
        progress: progress || [],
        totalPoints,
        exercises,
        quizzes,
      });
    }

    setStudents(results);
    setLoading(false);
  }

  return (
    <Layout theme={theme} setThemeName={setThemeName}>
      <section style={heroStyle(theme)}>
        <div style={{ fontSize: "60px" }}>👨‍👩‍👧</div>
        <h1 style={{ color: theme.text }}>لوحة وليّ الأمر</h1>
        <p style={{ color: theme.muted }}>
          متابعة تقدم الأبناء داخل منصة مدرستي DZ
        </p>
      </section>

      {loading ? (
        <div style={cardStyle(theme)}>جاري تحميل لوحة المتابعة...</div>
      ) : !parent ? (
        <div style={cardStyle(theme)}>
          🔐 سجّل الدخول بحساب وليّ الأمر.
        </div>
      ) : students.length === 0 ? (
        <div style={cardStyle(theme)}>
          لا يوجد أبناء مرتبطون بهذا البريد بعد.
        </div>
      ) : (
        students.map((student, index) => (
          <div key={index} style={cardStyle(theme)}>
            <h2 style={{ color: theme.text }}>
              👤 {student.profile?.full_name || "تلميذ بدون اسم"}
            </h2>

            <p style={{ color: theme.muted }}>
              السنة الدراسية: {student.profile?.grade || 1}
            </p>

            <div style={gridStyle}>
              <div style={statCard(theme)}>
                <div style={{ fontSize: "36px" }}>⭐</div>
                <strong>{student.totalPoints}</strong>
                <p>النقاط</p>
              </div>

              <div style={statCard(theme)}>
                <div style={{ fontSize: "36px" }}>✍️</div>
                <strong>{student.exercises}</strong>
                <p>تمارين</p>
              </div>

              <div style={statCard(theme)}>
                <div style={{ fontSize: "36px" }}>📝</div>
                <strong>{student.quizzes}</strong>
                <p>اختبارات</p>
              </div>
            </div>

            <h3 style={{ color: theme.text, marginTop: "24px" }}>
              🕒 آخر النشاطات
            </h3>

            {student.progress.length === 0 ? (
              <p style={{ color: theme.muted }}>لا يوجد نشاط بعد.</p>
            ) : (
              student.progress.slice(0, 5).map((item) => (
                <div key={item.id} style={activityItem(theme)}>
                  <strong>{item.lesson_id}</strong>
                  <p style={{ color: theme.muted }}>
                    +{item.points} نقطة
                  </p>
                </div>
              ))
            )}
          </div>
        ))
      )}
    </Layout>
  );
}

const heroStyle = (theme) => ({
  background: theme.surface,
  border: `1px solid ${theme.border}`,
  borderRadius: common.radius.large,
  padding: "28px",
  textAlign: "center",
  boxShadow: common.shadow.hero,
});

const cardStyle = (theme) => ({
  marginTop: "22px",
  background: theme.surface,
  border: `1px solid ${theme.border}`,
  padding: "22px",
  borderRadius: common.radius.large,
  boxShadow: common.shadow.card,
  color: theme.text,
});

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "10px",
  marginTop: "20px",
};

const statCard = (theme) => ({
  background: theme.surface2,
  border: `1px solid ${theme.border}`,
  padding: "14px",
  borderRadius: common.radius.medium,
  textAlign: "center",
  color: theme.text,
});

const activityItem = (theme) => ({
  marginTop: "12px",
  background: theme.surface2,
  border: `1px solid ${theme.border}`,
  padding: "14px",
  borderRadius: common.radius.medium,
});

export default ParentDashboardPage;
