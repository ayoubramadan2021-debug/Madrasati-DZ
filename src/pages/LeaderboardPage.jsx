import { useEffect, useState } from "react";

import Layout from "../components/Layout";
import { common } from "../theme";

import { supabase } from "../lib/supabaseClient";

function LeaderboardPage({ theme, setThemeName }) {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  async function loadLeaderboard() {
    setLoading(true);

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("total_points", {
        ascending: false,
      });

    if (error) {
      console.log(error);
    } else {
      setProfiles(data || []);
    }

    setLoading(false);
  }

  return (
    <Layout theme={theme} setThemeName={setThemeName}>
      <section style={heroStyle(theme)}>
        <div style={{ fontSize: "60px" }}>🏆</div>

        <h1 style={{ color: theme.text }}>ترتيب التلاميذ</h1>

        <p style={{ color: theme.muted }}>
          أفضل التلاميذ حسب النقاط
        </p>
      </section>

      {loading ? (
        <div style={cardStyle(theme)}>جاري تحميل الترتيب...</div>
      ) : profiles.length === 0 ? (
        <div style={cardStyle(theme)}>لا يوجد مستخدمون بعد.</div>
      ) : (
        <div style={{ marginTop: "22px" }}>
          {profiles.map((profile, index) => (
            <div
              key={profile.id}
              style={{
                background: theme.surface,
                border: `1px solid ${theme.border}`,
                borderRight: `8px solid ${
                  index === 0
                    ? "#f59e0b"
                    : index === 1
                    ? "#9ca3af"
                    : index === 2
                    ? "#b45309"
                    : theme.primary
                }`,
                padding: "20px",
                borderRadius: common.radius.medium,
                marginBottom: "14px",
                boxShadow: common.shadow.card,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: "22px",
                    fontWeight: "bold",
                    color: theme.text,
                  }}
                >
                  #{index + 1}
                </div>

                <div
                  style={{
                    color: theme.text,
                    marginTop: "6px",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  {profile.full_name || "تلميذ بدون اسم"}
                </div>

                <div
                  style={{
                    color: theme.muted,
                    marginTop: "6px",
                    fontSize: "14px",
                  }}
                >
                  🎒 السنة {profile.grade || 1}
                </div>
              </div>

              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "30px" }}>⭐</div>

                <strong
                  style={{
                    fontSize: "28px",
                    color: theme.text,
                  }}
                >
                  {profile.total_points || profile.points || 0}
                </strong>

                <div
                  style={{
                    color: theme.muted,
                    fontSize: "14px",
                  }}
                >
                  نقطة
                </div>
              </div>
            </div>
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
});

export default LeaderboardPage;
