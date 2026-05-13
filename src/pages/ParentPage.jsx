import { useEffect, useState } from "react";

import Layout from "../components/Layout";
import { common } from "../theme";

import { getCurrentUser } from "../services/authService";
import { getProfile } from "../services/profileService";
import { getUserProgress } from "../services/progressService";
import { supabase } from "../lib/supabaseClient";

function ParentPage({ theme, setThemeName }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [progress, setProgress] = useState([]);
  const [parentEmail, setParentEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);

    const currentUser = await getCurrentUser();
    setUser(currentUser);

    if (currentUser) {
      setProfile(await getProfile(currentUser.id));
      setProgress(await getUserProgress(currentUser.id));
    }

    setLoading(false);
  }

  async function saveParentLink() {
    if (!user || !parentEmail) return;

    const { error } = await supabase
      .from("parent_links")
      .insert([
        {
          parent_email: parentEmail,
          student_id: user.id,
        },
      ]);

    if (error) {
      setMessage("❌ حدث خطأ أثناء ربط ولي الأمر");
      return;
    }

    setMessage("✅ تم ربط ولي الأمر بنجاح");
    setParentEmail("");
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
        <div style={{ fontSize: "60px" }}>👨‍👩‍👧</div>
        <h1 style={{ color: theme.text }}>متابعة وليّ الأمر</h1>
        <p style={{ color: theme.muted }}>
          متابعة تقدم التلميذ ونشاطه داخل المنصة
        </p>
      </section>

      {loading ? (
        <div style={cardStyle(theme)}>جاري تحميل البيانات...</div>
      ) : !user ? (
        <div style={cardStyle(theme)}>
          🔐 سجّل الدخول أولًا لربط وليّ الأمر.
        </div>
      ) : (
        <>
          <div style={cardStyle(theme)}>
            <h2 style={{ color: theme.text }}>👤 بيانات التلميذ</h2>
            <p style={{ color: theme.muted }}>
              الاسم: {profile?.full_name || "تلميذ بدون اسم"}
            </p>
            <p style={{ color: theme.muted }}>
              البريد: {user.email}
            </p>
            <p style={{ color: theme.muted }}>
              السنة: {profile?.grade || 1}
            </p>
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
          </div>

          <div style={cardStyle(theme)}>
            <h2 style={{ color: theme.text }}>🔗 ربط وليّ الأمر</h2>

            <label style={labelStyle(theme)}>بريد وليّ الأمر</label>

            <input
              type="email"
              value={parentEmail}
              onChange={(e) => setParentEmail(e.target.value)}
              placeholder="parent@email.com"
              style={inputStyle(theme)}
            />

            <button onClick={saveParentLink} style={buttonStyle(theme)}>
              حفظ وليّ الأمر
            </button>

            {message && (
              <div style={messageStyle(theme)}>
                {message}
              </div>
            )}
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
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "10px",
  marginTop: "22px",
};

const statCard = (theme) => ({
  background: theme.surface,
  border: `1px solid ${theme.border}`,
  borderRadius: common.radius.medium,
  padding: "16px",
  textAlign: "center",
  color: theme.text,
  boxShadow: common.shadow.card,
});

const labelStyle = (theme) => ({
  display: "block",
  marginTop: "14px",
  marginBottom: "8px",
  color: theme.text,
  fontWeight: "bold",
});

const inputStyle = (theme) => ({
  width: "100%",
  padding: "15px",
  borderRadius: common.radius.medium,
  border: `1px solid ${theme.border}`,
  background: theme.surface2,
  color: theme.text,
  fontSize: "17px",
  outline: "none",
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

const messageStyle = (theme) => ({
  marginTop: "16px",
  padding: "14px",
  borderRadius: common.radius.medium,
  background: theme.surface2,
  border: `1px solid ${theme.border}`,
  color: theme.text,
});

export default ParentPage;
