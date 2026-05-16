import { useEffect, useState } from "react";

import Layout from "../components/Layout";
import { common } from "../theme";

import { getCurrentUser } from "../services/sessionService";
import { getProfile } from "../services/profileService";
import { getUserProgress } from "../services/progressService";

function AchievementsPage({ theme, setThemeName }) {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    loadAchievements();
  }, []);

  async function loadAchievements() {
    setLoading(true);

    const user = await getCurrentUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const userProfile = await getProfile(user.id);
    const userProgress = await getUserProgress(user.id);

    setProfile(userProfile);
    setProgress(userProgress || []);

    setLoading(false);
  }

  const totalPoints = progress.reduce(
    (sum, item) => sum + Number(item.points || 0),
    0
  );

  const completedExercises = progress.filter((item) =>
    String(item.lesson_id || "").includes("exercise")
  ).length;

  const completedQuizzes = progress.filter((item) =>
    String(item.lesson_id || "").includes("quiz")
  ).length;

  const badges = [
    {
      icon: "🎯",
      title: "البداية القوية",
      desc: "أكمل أول نشاط داخل التطبيق.",
      unlocked: progress.length >= 1,
    },
    {
      icon: "⭐",
      title: "أول 10 نقاط",
      desc: "احصل على 10 نقاط على الأقل.",
      unlocked: totalPoints >= 10,
    },
    {
      icon: "🏅",
      title: "متعلم نشيط",
      desc: "أكمل 3 أنشطة تعليمية.",
      unlocked: progress.length >= 3,
    },
    {
      icon: "🧮",
      title: "بطل التمارين",
      desc: "أكمل 3 تمارين.",
      unlocked: completedExercises >= 3,
    },
    {
      icon: "📝",
      title: "محب الاختبارات",
      desc: "أكمل اختبارًا واحدًا على الأقل.",
      unlocked: completedQuizzes >= 1,
    },
    {
      icon: "👑",
      title: "نجم مدرستي",
      desc: "احصل على 100 نقطة.",
      unlocked: totalPoints >= 100,
    },
  ];

  const unlockedCount = badges.filter((badge) => badge.unlocked).length;

  return (
    <Layout theme={theme} setThemeName={setThemeName}>
      <section style={heroStyle(theme)}>
        <div style={{ fontSize: "60px" }}>🏅</div>

        <h1 style={{ color: theme.text }}>الإنجازات والشارات</h1>

        <p style={{ color: theme.muted }}>
          شارات تحفيزية حسب تقدمك داخل المنصة
        </p>
      </section>

      {loading ? (
        <div style={cardStyle(theme)}>جاري تحميل الإنجازات...</div>
      ) : !profile ? (
        <div style={cardStyle(theme)}>
          🔐 سجّل الدخول لعرض إنجازاتك.
        </div>
      ) : (
        <>
          <div style={cardStyle(theme)}>
            <h2 style={{ color: theme.text }}>
              👋 {profile.full_name || "تلميذ"}
            </h2>

            <p style={{ color: theme.muted }}>
              حصلت على {unlockedCount} من {badges.length} شارات
            </p>

            <div style={progressContainer(theme)}>
              <div
                style={{
                  ...progressBar(theme),
                  width: `${Math.round((unlockedCount / badges.length) * 100)}%`,
                }}
              />
            </div>
          </div>

          <div style={{ marginTop: "22px" }}>
            {badges.map((badge) => (
              <div
                key={badge.title}
                style={badgeCard(theme, badge.unlocked)}
              >
                <div style={{ fontSize: "46px" }}>{badge.icon}</div>

                <div style={{ flex: 1 }}>
                  <h2 style={{ color: theme.text, margin: 0 }}>
                    {badge.title}
                  </h2>

                  <p style={{ color: theme.muted, lineHeight: "1.7" }}>
                    {badge.desc}
                  </p>

                  <strong
                    style={{
                      color: badge.unlocked ? "#10b981" : theme.muted,
                    }}
                  >
                    {badge.unlocked ? "✅ تم فتح الشارة" : "🔒 لم تُفتح بعد"}
                  </strong>
                </div>
              </div>
            ))}
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

const badgeCard = (theme, unlocked) => ({
  background: theme.surface,
  border: `1px solid ${theme.border}`,
  borderRight: `8px solid ${unlocked ? "#10b981" : "#64748b"}`,
  padding: "18px",
  borderRadius: common.radius.large,
  marginBottom: "14px",
  boxShadow: common.shadow.card,
  display: "flex",
  alignItems: "center",
  gap: "14px",
  opacity: unlocked ? 1 : 0.55,
});

const progressContainer = (theme) => ({
  width: "100%",
  height: "18px",
  borderRadius: "999px",
  background: theme.surface2,
  overflow: "hidden",
  marginTop: "18px",
});

const progressBar = (theme) => ({
  height: "100%",
  background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
  borderRadius: "999px",
});

export default AchievementsPage;
