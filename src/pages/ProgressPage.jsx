import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Layout from "../components/Layout";
import { common } from "../theme";

import { getCurrentUser } from "../services/authService";
import { getFavorites } from "../services/favoriteService";

import { supabase } from "../lib/supabaseClient";

function ProgressPage({ theme, setThemeName }) {
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const [stats, setStats] = useState({
    totalPoints: 0,
    lessons: 0,
    exercises: 0,
    quizzes: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    setLoading(true);

    const currentUser = await getCurrentUser();

    if (!currentUser) {
      setLoading(false);
      return;
    }

    setUser(currentUser);

    const favs = await getFavorites(currentUser.id);
    setFavorites(favs);

    const { data } = await supabase
      .from("progress")
      .select("*")
      .eq("profile_id", currentUser.id);

    const progressData = data || [];

    setProgress(progressData);

    const lessons = progressData.filter((p) =>
      String(p.lesson_id || "").includes("lesson")
    ).length;

    const exercises = progressData.filter((p) =>
      String(p.lesson_id || "").includes("exercise")
    ).length;

    const quizzes = progressData.filter((p) =>
      String(p.lesson_id || "").includes("quiz")
    ).length;

    const totalPoints = progressData.reduce(
      (sum, item) => sum + Number(item.points || 0),
      0
    );

    setStats({
      totalPoints,
      lessons,
      exercises,
      quizzes,
    });

    setLoading(false);
  }

  const progressPercent = Math.min(100, stats.totalPoints);

  return (
    <Layout theme={theme} setThemeName={setThemeName}>
      <section style={heroStyle(theme)}>
        <div style={{ fontSize: "60px" }}>📊</div>

        <h1 style={{ color: theme.text }}>
          لوحة تقدم التلميذ
        </h1>

        <p style={{ color: theme.muted }}>
          تتبع تقدمك داخل المنصة
        </p>
      </section>

      {loading ? (
        <div style={cardStyle(theme)}>
          جاري تحميل لوحة التقدم...
        </div>
      ) : !user ? (
        <div style={cardStyle(theme)}>
          🔐 سجّل الدخول لعرض لوحة التقدم.
        </div>
      ) : (
        <>
          <div style={cardStyle(theme)}>
            <h2 style={{ color: theme.text }}>
              👋 مرحبًا
            </h2>

            <p style={{ color: theme.muted }}>
              {user.email}
            </p>

            <div style={progressContainer(theme)}>
              <div
                style={{
                  ...progressBar(theme),
                  width: `${progressPercent}%`,
                }}
              />
            </div>

            <p
              style={{
                textAlign: "center",
                marginTop: "10px",
                color: theme.text,
                fontWeight: "bold",
              }}
            >
              مستوى التقدم: {progressPercent}%
            </p>
          </div>

          <div style={gridStyle}>
            <div style={statCard(theme)}>
              <div style={{ fontSize: "42px" }}>⭐</div>
              <strong>{stats.totalPoints}</strong>
              <p>النقاط</p>
            </div>

            <div style={statCard(theme)}>
              <div style={{ fontSize: "42px" }}>📖</div>
              <strong>{stats.lessons}</strong>
              <p>الدروس</p>
            </div>

            <div style={statCard(theme)}>
              <div style={{ fontSize: "42px" }}>✍️</div>
              <strong>{stats.exercises}</strong>
              <p>التمارين</p>
            </div>

            <div style={statCard(theme)}>
              <div style={{ fontSize: "42px" }}>📝</div>
              <strong>{stats.quizzes}</strong>
              <p>الاختبارات</p>
            </div>
          </div>

          <div style={cardStyle(theme)}>
            <h2 style={{ color: theme.text }}>
              ⭐ المفضلة الأخيرة
            </h2>

            {favorites.length === 0 ? (
              <p style={{ color: theme.muted }}>
                لا توجد عناصر محفوظة.
              </p>
            ) : (
              favorites.slice(0, 5).map((item) => (
                <div key={item.id} style={favoriteItem(theme)}>
                  <strong>
                    {item.title}
                  </strong>

                  <p style={{ color: theme.muted }}>
                    {item.subject} - السنة {item.grade}
                  </p>
                </div>
              ))
            )}

            <Link to="/favorites">
              <button style={buttonStyle(theme)}>
                عرض كل المفضلة
              </button>
            </Link>
          </div>
        </>
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
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "14px",
  marginTop: "22px",
};

const statCard = (theme) => ({
  background: theme.surface,
  border: `1px solid ${theme.border}`,
  borderRadius: common.radius.large,
  padding: "20px",
  textAlign: "center",
  boxShadow: common.shadow.card,
  color: theme.text,
});

const progressContainer = (theme) => ({
  width: "100%",
  height: "18px",
  borderRadius: "999px",
  background: theme.surface2,
  overflow: "hidden",
  marginTop: "20px",
});

const progressBar = (theme) => ({
  height: "100%",
  background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
});

const favoriteItem = (theme) => ({
  marginTop: "14px",
  background: theme.surface2,
  border: `1px solid ${theme.border}`,
  padding: "14px",
  borderRadius: common.radius.medium,
});

const buttonStyle = (theme) => ({
  width: "100%",
  marginTop: "18px",
  padding: "15px",
  border: "none",
  borderRadius: common.radius.medium,
  background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
  color: "white",
  fontSize: "18px",
  fontWeight: "bold",
});

export default ProgressPage;
