import { Link } from "react-router-dom";

import Layout from "../components/Layout";
import { common } from "../theme";
import { useAuth } from "../context/AuthContext";
import { useFavorites, useRemoveFavorite } from "../features/favorites";
import { LoadingState, EmptyState } from "../shared/components/ui";

type FavoritesPageProps = {
  theme: any;
  setThemeName: (themeName: string) => void;
};

type FavoriteItem = {
  id: string;
  item_id: string;
  item_type: "lesson" | "exercise";
  title: string;
  subject: string;
  grade: number;
};

function FavoritesPage({ theme, setThemeName }: FavoritesPageProps) {
  const { user } = useAuth();

  const {
    data: favorites = [],
    isLoading,
  } = useFavorites(user?.id);

  const removeFavoriteMutation = useRemoveFavorite(user?.id);

  return (
    <Layout theme={theme} setThemeName={setThemeName}>
      <section style={heroStyle(theme)}>
        <div style={{ fontSize: "56px" }}>⭐</div>
        <h1 style={{ color: theme.text }}>المفضلة</h1>
        <p style={{ color: theme.muted }}>
          الدروس والتمارين المحفوظة للمراجعة لاحقًا
        </p>
      </section>

      {isLoading ? (
        <LoadingState theme={theme} message="جاري تحميل المفضلة..." />
      ) : !user ? (
        <EmptyState
          theme={theme}
          title="تسجيل الدخول مطلوب"
          message="سجّل الدخول لعرض المفضلة."
        />
      ) : favorites.length === 0 ? (
        <EmptyState
          theme={theme}
          title="لا توجد عناصر محفوظة"
          message="لم تحفظ أي درس أو تمرين بعد."
        />
      ) : (
        <div style={{ marginTop: "22px" }}>
          {(favorites as FavoriteItem[]).map((item) => {
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
                  onClick={() => {
                    removeFavoriteMutation.mutate(item.id);
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

const heroStyle = (theme: any) => ({
  background: theme.surface,
  border: `1px solid ${theme.border}`,
  borderRadius: common.radius.large,
  padding: "28px",
  textAlign: "center" as const,
  boxShadow: common.shadow.hero,
});

const itemStyle = (theme: any) => ({
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
