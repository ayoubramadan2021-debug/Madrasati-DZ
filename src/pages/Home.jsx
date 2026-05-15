import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { common } from "../theme";
import appData from "../data/appData";
import { supabase } from "../lib/supabaseClient";
import { getCurrentUser } from "../services/sessionService";
import { getUserProgress } from "../services/progressService";
import { useLanguage } from "../i18n/LanguageContext";

function Home({ theme, setThemeName }) {
  const { t } = useLanguage();
  const [user, setUser] = useState(null);
  const [fullName, setFullName] = useState("");
  const [onlineProgress, setOnlineProgress] = useState([]);

  useEffect(() => {
    loadUserAndProgress();
  }, []);

  async function loadUserAndProgress() {
    const currentUser = await getCurrentUser();
    setUser(currentUser);

    if (currentUser) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", currentUser.id)
        .single();

      if (profile?.full_name) setFullName(profile.full_name);

      const progressData = await getUserProgress(currentUser.id);
      setOnlineProgress(progressData);
    }
  }

  const displayName = fullName || (user ? user.email.split("@")[0] : "تلميذ");
  const points = onlineProgress.reduce((sum, item) => sum + Number(item.points || 0), 0);
  const completed = onlineProgress.filter((item) => item.completed).length;

  const quickMenu = [
    { to: "/grade/1", icon: "📘", label: t.lessons || "الدروس" },
    { to: "/ai-tutor", icon: "🤖", label: t.aiTutor || "المعلّم الذكي" },
    { to: "/progress", icon: "📊", label: t.progress || "التقدم" },
    { to: "/leaderboard", icon: "🏆", label: t.leaderboard || "الترتيب" },
    { to: "/favorites", icon: "⭐", label: t.favorites || "المفضلة" },
    { to: "/support", icon: "💬", label: t.support || "الدعم" },
  ];

  return (
    <Layout theme={theme} setThemeName={setThemeName}>
      <section style={heroCard(theme)}>
        <div style={avatarBox(theme)}>👦</div>

        <div style={{ flex: 1 }}>
          <div style={{ color: theme.muted, fontWeight: "bold" }}>
            {t.welcome || "مرحبًا"}
          </div>

          <h1 style={{ margin: "4px 0", color: theme.text, fontSize: "28px" }}>
            {displayName}
          </h1>

          <p style={{ margin: 0, color: theme.muted, lineHeight: "1.6" }}>
            {t.pocketSchool || "كل يومك الدراسي في جيبك"}
          </p>
        </div>
      </section>

      <section style={unitCard(theme)}>
        <div style={unitIcon(theme)}>📋</div>

        <div style={{ flex: 1 }}>
          <strong style={{ fontSize: "14px", opacity: 0.85 }}>
            {t.unit1 || "الوحدة 1"}
          </strong>

          <h2 style={{ margin: "6px 0 0", fontSize: "22px" }}>
            {t.startLearning || "ابدأ رحلتك التعليمية"}
          </h2>
        </div>
      </section>

      <section style={statsRow}>
        <div style={statCard(theme)}>
          <strong>{points}</strong>
          <span>{t.points || "النقاط"}</span>
        </div>

        <div style={statCard(theme)}>
          <strong>{completed}</strong>
          <span>{t.completed || "مكتمل"}</span>
        </div>
      </section>

      <h2 style={sectionTitle(theme)}>{t.quickMenu || "القائمة"}</h2>

      <div style={menuList}>
        {quickMenu.map((item) => (
          <Link key={item.to} to={item.to} style={{ textDecoration: "none" }}>
            <div style={menuItem(theme)}>
              <div style={iconBox(theme)}>{item.icon}</div>

              <strong style={{ color: theme.text, fontSize: "18px" }}>
                {item.label}
              </strong>

              <div style={arrowCircle(theme)}>→</div>
            </div>
          </Link>
        ))}
      </div>

      <h2 style={sectionTitle(theme)}>{t.schoolYears || "السنوات الدراسية"}</h2>

      <div style={lessonPath}>
        {appData.grades.map((grade, index) => (
          <Link key={grade.id} to={"/grade/" + grade.id} style={{ textDecoration: "none" }}>
            <div style={pathNode(theme)}>
              <div style={nodeCircle(theme)}>{index + 1}</div>

              <div>
                <strong style={{ color: theme.text, fontSize: "18px" }}>
                  {grade.name}
                </strong>

                <p style={{ margin: "4px 0 0", color: theme.muted }}>
                  {t.gradeDescription || "دروس وتمارين هذه السنة"}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
}

const heroCard = (theme) => ({
  background: theme.surface,
  border: `1px solid ${theme.border}`,
  borderRadius: common.radius.large,
  padding: "18px",
  display: "flex",
  gap: "16px",
  alignItems: "center",
  boxShadow: theme.cardShadow,
  marginBottom: "18px",
});

const avatarBox = (theme) => ({
  width: "76px",
  height: "76px",
  borderRadius: "50%",
  background: theme.surface2,
  display: "grid",
  placeItems: "center",
  fontSize: "42px",
});

const unitCard = (theme) => ({
  background: theme.primary,
  color: "white",
  borderRadius: "22px",
  padding: "20px",
  display: "flex",
  alignItems: "center",
  gap: "16px",
  boxShadow: theme.cardShadow,
  marginBottom: "18px",
});

const unitIcon = () => ({
  width: "58px",
  height: "58px",
  borderRadius: "18px",
  background: "rgba(255,255,255,0.22)",
  display: "grid",
  placeItems: "center",
  fontSize: "28px",
});

const statsRow = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "10px",
  marginBottom: "22px",
};

const statCard = (theme) => ({
  background: theme.surface,
  border: `1px solid ${theme.border}`,
  borderRadius: common.radius.medium,
  padding: "16px 8px",
  textAlign: "center",
  boxShadow: theme.cardShadow,
  color: theme.text,
  display: "flex",
  flexDirection: "column",
  gap: "5px",
});

const sectionTitle = (theme) => ({
  color: theme.text,
  fontSize: "23px",
  margin: "22px 0 12px",
});

const menuList = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

const menuItem = (theme) => ({
  background: theme.surface,
  border: `1px solid ${theme.border}`,
  borderRadius: "22px",
  minHeight: "68px",
  padding: "12px 14px",
  display: "flex",
  alignItems: "center",
  gap: "14px",
  boxShadow: theme.cardShadow,
});

const iconBox = (theme) => ({
  width: "54px",
  height: "54px",
  borderRadius: "16px",
  background: theme.surface2,
  display: "grid",
  placeItems: "center",
  fontSize: "25px",
});

const arrowCircle = (theme) => ({
  marginInlineStart: "auto",
  width: "38px",
  height: "38px",
  borderRadius: "50%",
  background: theme.primary,
  color: "white",
  display: "grid",
  placeItems: "center",
  fontWeight: "bold",
});

const lessonPath = {
  display: "flex",
  flexDirection: "column",
  gap: "14px",
  paddingBottom: "20px",
};

const pathNode = (theme) => ({
  background: theme.surface,
  border: `1px solid ${theme.border}`,
  borderRadius: "22px",
  padding: "16px",
  display: "flex",
  alignItems: "center",
  gap: "16px",
  boxShadow: theme.cardShadow,
});

const nodeCircle = (theme) => ({
  width: "56px",
  height: "56px",
  borderRadius: "50%",
  background: theme.primary,
  color: "white",
  display: "grid",
  placeItems: "center",
  fontSize: "22px",
  fontWeight: "bold",
});

export default Home;
