import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getCurrentUser } from "../services/sessionService";
import { getUserProgress } from "../services/progressService";

export default function ProgressPage({ theme, setThemeName }) {
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProgress();
  }, []);

  async function loadProgress() {
    const currentUser = await getCurrentUser();

    // لا ترسل المستخدم لصفحة Auth
    // فقط اعرض رسالة بسيطة
    if (!currentUser) {
      setLoading(false);
      return;
    }

    setUser(currentUser);

    const data = await getUserProgress(currentUser.id);
    setProgress(data || []);

    setLoading(false);
  }

  const totalPoints = progress.reduce(
    (sum, item) => sum + Number(item.points || 0),
    0
  );

  const completedLessons = progress.filter(
    (item) => item.completed
  ).length;

  return (
    <Layout theme={theme} setThemeName={setThemeName}>
      <div
        style={{
          minHeight: "100vh",
          color: theme.text,
        }}
      >
        <h1
          style={{
            fontSize: "34px",
            marginBottom: "20px",
            fontWeight: "bold",
          }}
        >
          📊 التقدم
        </h1>

        {!user && (
          <div
            style={{
              background: theme.surface,
              borderRadius: "24px",
              padding: "30px",
              textAlign: "center",
              border: `1px solid ${theme.border}`,
            }}
          >
            <h2>قم بتسجيل الدخول لمتابعة تقدمك</h2>
          </div>
        )}

        {user && (
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2,1fr)",
                gap: "15px",
                marginBottom: "25px",
              }}
            >
              <div
                style={{
                  background: theme.surface,
                  padding: "25px",
                  borderRadius: "24px",
                  textAlign: "center",
                  border: `1px solid ${theme.border}`,
                }}
              >
                <div style={{ fontSize: "40px" }}>💎</div>

                <h2>{totalPoints}</h2>

                <p>النقاط</p>
              </div>

              <div
                style={{
                  background: theme.surface,
                  padding: "25px",
                  borderRadius: "24px",
                  textAlign: "center",
                  border: `1px solid ${theme.border}`,
                }}
              >
                <div style={{ fontSize: "40px" }}>✅</div>

                <h2>{completedLessons}</h2>

                <p>المكتمل</p>
              </div>
            </div>

            <div
              style={{
                background: theme.surface,
                borderRadius: "24px",
                padding: "20px",
                border: `1px solid ${theme.border}`,
              }}
            >
              <h2 style={{ marginBottom: "15px" }}>
                نشاطك الأخير
              </h2>

              {loading && <p>جاري التحميل...</p>}

              {!loading && progress.length === 0 && (
                <p>لا يوجد تقدم بعد.</p>
              )}

              {progress.map((item, index) => (
                <div
                  key={index}
                  style={{
                    padding: "15px",
                    borderBottom: `1px solid ${theme.border}`,
                  }}
                >
                  <strong>
                    {item.lesson_title || "درس"}
                  </strong>

                  <p>
                    النقاط: {item.points || 0}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
