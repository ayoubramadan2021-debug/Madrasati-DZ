import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Layout from "../components/Layout";
import { common } from "../theme";

import { getCurrentUser } from "../services/sessionService";
import { getFavorites, removeFavorite } from "../services/favoriteService";

function FavoritesPage({ theme, setThemeName }) {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  async function loadFavorites() {
    setLoading(true);

    const currentUser = await getCurrentUser();
    setUser(currentUser);

    if (currentUser) {
      const data = await getFavorites(currentUser.id);
      setFavorites(data);
    }

    setLoading(false);
  }

  return (
    <Layout theme={theme} setThemeName={setThemeName}>
      <section style={heroStyle(theme)}>
        <div style={{ fontSize: "56px" }}>⭐</div>
        <h1 style={{ color: theme.text }}>المفضلة</h1>
        <p style={{ color: theme.muted }}>
          الدروس والتمارين المحفوظة للمراجعة لاحقًا
        </p>
      </section>

      {loading ? (
        <div style={cardStyle(theme)}>جاري تحميل المفضلة...</div>
      ) : !user ? (
        <div style={cardStyle(theme)}>
          🔐 سجّل الدخول لعرض المفضلة.
        </div>
      ) : favorites.length === 0 ? (
        <div style={cardStyle(theme)}>
          لا توجد عناصر محفوظة بعد.
        </div>
      ) : (
        <div style={{ marginTop: "22px" }}>
          {favorites.map((item) => {
            const link =
              item.item_type === "lesson"
                ? `/grade/${item.grade}/subject/${item.subject}/lesson/${item.item_id}`
                : `/grade/${item.grade}/subject/${item.subject}/exercise/${item.item_id}`;

            return (
              <div key={item.id} style={itemStyle(theme)}>
                <Link
                  to={link}
                  style={{
                    textDecoration: "none",
                    color: theme.text,
                    flex: 1,
                  }}
                >
                  <strong>
                    {item.item_type === "lesson" ? "📖" : "✍️"} {item.title}
                  </strong>

                  <p style={{ color: theme.muted }}>
                    المادة: {item.subject} | السنة: {item.grade}
                  </p>
                </Link>

                <button
                  onClick={async () => {
                    await removeFavorite(item.id);
                    await loadFavorites();
                  }}
                  style={deleteButton}
                >
                  حذف
                </button>
              </div>
            );
          })}
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
  color: theme.text,
});

const itemStyle = (theme) => ({
  background: theme.surface,
  border: `1px solid ${theme.border}`,
  borderRight: `8px solid ${theme.primary}`,
  padding: "16px",
  borderRadius: common.radius.medium,
  marginBottom: "14px",
  boxShadow: common.shadow.card,
  display: "flex",
  alignItems: "center",
  gap: "10px",
});

const deleteButton = {
  border: "none",
  borderRadius: "12px",
  background: "linear-gradient(135deg, #ef4444, #f97316)",
  color: "white",
  padding: "10px 14px",
  fontWeight: "bold",
};

export default FavoritesPage;
