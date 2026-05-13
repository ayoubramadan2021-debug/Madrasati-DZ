import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Layout from "../components/Layout";
import { common } from "../theme";

import { getCurrentUser } from "../services/authService";
import { getProfile } from "../services/profileService";
import { getUserProgress } from "../services/progressService";
import { getFavorites } from "../services/favoriteService";

function ProfilePage({ theme, setThemeName }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [progress, setProgress] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    setLoading(true);

    const currentUser = await getCurrentUser();
    setUser(currentUser);

    if (currentUser) {
      setProfile(await getProfile(currentUser.id));
      setProgress(await getUserProgress(currentUser.id));
      setFavorites(await getFavorites(currentUser.id));
    }

    setLoading(false);
  }

  const totalPoints = progress.reduce(
    (sum, item) => sum + Number(item.points || 0),
    0
  );

  const exercises = progress.filter((item) =>
    String(item.lesson_id || "").includes("exercise")
  ).length;

  const quizzes = progress.filter((item) =>
    String(item.lesson_id || "").includes("quiz")
  ).length;

  return (
    <Layout theme={theme} setThemeName={setThemeName}>
      <section style={heroStyle(theme)}>
        <div style={avatarStyle(theme)}>
          {(profile?.full_name || user?.email || "ت").slice(0, 1)}
        </div>

        <h1 style={{ color: theme.text }}>
          الملف الشخصي
        </h1>

        <p style={{ color: theme.muted }}>
          بطاقة التلميذ داخل منصة مدرستي DZ
        </p>
      </section>

      {loading ? (
        <div style={cardStyle(theme)}>جاري تحميل الملف الشخصي...</div>
      ) : !user ? (
        <div style={cardStyle(theme)}>
          🔐 سجّل الدخول لعرض ملفك الشخصي.
        </div>
      ) : (
        <>
          <div style={cardStyle(theme)}>
            <h2 style={{ color: theme.text }}>
              👤 {profile?.full_name || "تلميذ بدون اسم"}
            </h2>

            <p style={{ color: theme.muted }}>
              البريد: {user.email}
            </p>

            <p style={{ color: theme.muted }}>
              السنة الدراسية: {profile?.grade || 1}
            </p>

            {profile?.age && (
              <p style={{ color: theme.muted }}>
                العمر: {profile.age}
              </p>
            )}

            {profile?.birth_place && (
              <p style={{ color: theme.muted }}>
                مكان الميلاد: {profile.birth_place}
              </p>
            )}

            <Link to="/profile/edit" style={{ textDecoration: "none" }}>
              <button style={buttonStyle(theme)}>
                تعديل بياناتي
              </button>
            </Link>
          </div>

          <div style={gridStyle}>
            <div style={statCard(theme)}>
              <div style={{ fontSize: "38px" }}>⭐</div>
              <strong>{totalPoints}</strong>
              <p>النقاط</p>
            </div>

            <div style={statCard(theme)}>
              <div style={{ fontSize: "38px" }}>✍️</div>
              <strong>{exercises}</strong>
              <p>تمارين</p>
            </div>

            <div style={statCard(theme)}>
              <div style={{ fontSize: "38px" }}>📝</div>
              <strong>{quizzes}</strong>
              <p>اختبارات</p>
            </div>

            <div style={statCard(theme)}>
              <div style={{ fontSize: "38px" }}>💛</div>
              <strong>{favorites.length}</strong>
              <p>مفضلة</p>
            </div>
          </div>

          <div style={cardStyle(theme)}>
            <h2 style={{ color: theme.text }}>🏅 ملخص الإنجاز</h2>

            <p style={{ color: theme.muted, lineHeight: "1.8" }}>
              {totalPoints >= 100
                ? "👑 تلميذ مميز جدًا، وصلت إلى 100 نقطة أو أكثر."
                : totalPoints >= 30
                ? "🏅 تقدم جيد، واصل التعلم."
                : totalPoints >= 10
                ? "⭐ بداية موفقة، أكمل المزيد من التمارين."
                : "🚀 ابدأ بحل التمارين لجمع النقاط."}
            </p>

            <Link to="/achievements" style={{ textDecoration: "none" }}>
              <button style={buttonStyle(theme)}>
                عرض الإنجازات
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

const avatarStyle = (theme) => ({
  width: "90px",
  height: "90px",
  margin: "0 auto 16px",
  borderRadius: "50%",
  background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
  display: "grid",
  placeItems: "center",
  color: "white",
  fontSize: "42px",
  fontWeight: "bold",
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
  padding: "18px",
  textAlign: "center",
  color: theme.text,
  boxShadow: common.shadow.card,
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

export default ProfilePage;
