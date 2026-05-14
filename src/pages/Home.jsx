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
  const [search, setSearch] = useState("");
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

  const onlinePoints = onlineProgress.reduce((sum, i) => sum + Number(i.points || 0), 0);
  const completedOnline = onlineProgress.filter((i) => i.completed).length;
  const displayName = fullName || (user ? user.email.split("@")[0] : "");

  const menuItems = [
    { to: "/grade/1", label: t.schoolYears || "الدروس", icon: "📚" },
    { to: "/ai-tutor", label: t.aiTutor || "المعلم الذكي", icon: "🤖" },
    { to: "/progress", label: t.progress || "التقدم", icon: "📊" },
    { to: "/leaderboard", label: t.leaderboard || "الترتيب", icon: "🏆" },
    { to: "/favorites", label: t.favorites || "المفضلة", icon: "⭐" },
    { to: "/notifications", label: "الإشعارات", icon: "🔔" },
    { to: "/parent-dashboard", label: "متابعة الأولياء", icon: "👨‍👩‍👧" },
    { to: "/support", label: t.support || "الدعم", icon: "💬" },
  ];

  const filteredGrades = appData.grades.filter((g) => g.name.includes(search));
  const filteredSubjects = appData.subjects.filter((s) => s.name.includes(search));
  const filteredLessons = appData.subjects.flatMap((s) =>
    s.lessons
      .filter((l) => l.title.includes(search))
      .map((l) => ({ ...l, subjectName: s.name, subjectSlug: s.slug }))
  );

  return (
    <Layout theme={theme} setThemeName={setThemeName}>
      <section style={heroStyle(theme)}>
        <div>
          <div style={{ color: theme.muted, fontWeight: "bold" }}>
            {user ? "مرحبًا بك 👋" : "مرحبًا في مدرستي DZ"}
          </div>

          <h1 style={{ margin: "8px 0", color: theme.text, fontSize: "28px" }}>
            {user ? displayName : "كل يومك الدراسي في جيبك"}
          </h1>

          <p style={{ color: theme.muted, margin: 0, lineHeight: "1.7" }}>
            دروس، تمارين، ذكاء اصطناعي، تقدم، وإشعارات في مكان واحد.
          </p>
        </div>

        {!user && (
          <Link to="/auth" style={loginButton(theme)}>
            تسجيل الدخول
          </Link>
        )}
      </section>

      <div style={miniStatsStyle}>
        <div style={miniStatCard(theme)}>
          <strong>{onlinePoints}</strong>
          <span>النقاط</span>
        </div>

        <div style={miniStatCard(theme)}>
          <strong>{completedOnline}</strong>
          <span>المكتملة</span>
        </div>
      </div>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="ابحث عن درس أو مادة..."
        style={searchStyle(theme)}
      />

      {!search ? (
        <>
          <h2 style={sectionTitle(theme)}>القائمة</h2>

          <div style={menuListStyle}>
            {menuItems.map((item) => (
              <Link key={item.to} to={item.to} style={{ textDecoration: "none" }}>
                <div style={menuItemStyle(theme)}>
                  <div style={iconBoxStyle(theme)}>{item.icon}</div>

                  <span style={{ color: theme.text, fontWeight: "bold", fontSize: "17px" }}>
                    {item.label}
                  </span>

                  <div style={arrowButtonStyle(theme)}>›</div>
                </div>
              </Link>
            ))}
          </div>

          <h2 style={sectionTitle(theme)}>السنوات الدراسية</h2>

          <div style={menuListStyle}>
            {appData.grades.map((grade) => (
              <Link key={grade.id} to={"/grade/" + grade.id} style={{ textDecoration: "none" }}>
                <div style={menuItemStyle(theme)}>
                  <div style={iconBoxStyle(theme)}>🎒</div>
                  <span style={{ color: theme.text, fontWeight: "bold", fontSize: "17px" }}>
                    {grade.name}
                  </span>
                  <div style={arrowButtonStyle(theme)}>›</div>
                </div>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <div>
          <h2 style={sectionTitle(theme)}>نتائج البحث</h2>

          {filteredGrades.length === 0 &&
            filteredSubjects.length === 0 &&
            filteredLessons.length === 0 && (
              <div style={emptyStyle(theme)}>لا توجد نتائج مطابقة.</div>
            )}

          {filteredGrades.map((grade) => (
            <Link key={grade.id} to={"/grade/" + grade.id} style={{ textDecoration: "none" }}>
              <div style={menuItemStyle(theme)}>
                <div style={iconBoxStyle(theme)}>🎒</div>
                <span style={{ color: theme.text, fontWeight: "bold" }}>{grade.name}</span>
                <div style={arrowButtonStyle(theme)}>›</div>
              </div>
            </Link>
          ))}

          {filteredSubjects.map((subject) => (
            <Link
              key={subject.slug}
              to={"/grade/1/subject/" + subject.slug}
              style={{ textDecoration: "none" }}
            >
              <div style={menuItemStyle(theme)}>
                <div style={iconBoxStyle(theme)}>{subject.icon}</div>
                <span style={{ color: theme.text, fontWeight: "bold" }}>{subject.name}</span>
                <div style={arrowButtonStyle(theme)}>›</div>
              </div>
            </Link>
          ))}

          {filteredLessons.map((lesson) => (
            <Link
              key={lesson.subjectSlug + "-" + lesson.id}
              to={"/grade/1/subject/" + lesson.subjectSlug + "/lesson/" + lesson.id}
              style={{ textDecoration: "none" }}
            >
              <div style={menuItemStyle(theme)}>
                <div style={iconBoxStyle(theme)}>📖</div>
                <div style={{ flex: 1 }}>
                  <strong style={{ color: theme.text }}>{lesson.title}</strong>
                  <div style={{ color: theme.muted, fontSize: "13px", marginTop: "4px" }}>
                    {lesson.subjectName}
                  </div>
                </div>
                <div style={arrowButtonStyle(theme)}>›</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </Layout>
  );
}

const heroStyle = (theme) => ({
  background: theme.surface,
  border: `1px solid ${theme.border}`,
  borderRadius: common.radius.large,
  padding: "24px",
  marginBottom: "18px",
  boxShadow: theme.cardShadow,
});

const loginButton = (theme) => ({
  display: "block",
  marginTop: "18px",
  background: theme.primary,
  color: theme.buttonText || "white",
  padding: "13px 18px",
  borderRadius: common.radius.full,
  textDecoration: "none",
  textAlign: "center",
  fontWeight: "bold",
});

const miniStatsStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "12px",
  marginBottom: "18px",
};

const miniStatCard = (theme) => ({
  background: theme.surface,
  border: `1px solid ${theme.border}`,
  borderRadius: common.radius.medium,
  padding: "16px",
  boxShadow: theme.cardShadow,
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  textAlign: "center",
  color: theme.text,
});

const searchStyle = (theme) => ({
  width: "100%",
  padding: "15px 18px",
  borderRadius: common.radius.full,
  border: `1px solid ${theme.border}`,
  background: theme.surface,
  color: theme.text,
  fontSize: "16px",
  outline: "none",
  boxSizing: "border-box",
  marginBottom: "22px",
});

const sectionTitle = (theme) => ({
  color: theme.text,
  margin: "20px 0 12px",
  fontSize: "22px",
});

const menuListStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

const menuItemStyle = (theme) => ({
  background: theme.surface,
  border: `1px solid ${theme.border}`,
  borderRadius: common.radius.large,
  padding: "14px",
  minHeight: "62px",
  display: "flex",
  alignItems: "center",
  gap: "14px",
  boxShadow: theme.cardShadow,
});

const iconBoxStyle = (theme) => ({
  width: "52px",
  height: "52px",
  borderRadius: common.radius.medium,
  background: theme.accent,
  color: theme.icon || theme.primary,
  display: "grid",
  placeItems: "center",
  fontSize: "24px",
  flexShrink: 0,
});

const arrowButtonStyle = (theme) => ({
  marginInlineStart: "auto",
  width: "38px",
  height: "38px",
  borderRadius: "50%",
  background: theme.primary,
  color: theme.buttonText || "#fff",
  display: "grid",
  placeItems: "center",
  fontSize: "26px",
  fontWeight: "bold",
});

const emptyStyle = (theme) => ({
  background: theme.surface,
  color: theme.muted,
  border: `1px solid ${theme.border}`,
  borderRadius: common.radius.medium,
  padding: "18px",
});

export default Home;
