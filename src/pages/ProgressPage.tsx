import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import { useProgress } from "../features/progress/hooks/useProgress";
import { AppCard, EmptyState, LoadingState } from "../shared/components/ui";

type ProgressPageProps = {
  theme: any;
  setThemeName: (themeName: string) => void;
};

type ProgressItem = {
  id?: string;
  lesson_title?: string;
  points?: number;
  completed?: boolean;
};

export default function ProgressPage({ theme, setThemeName }: ProgressPageProps) {
  const { user } = useAuth();

  const {
    data: progress = [],
    isLoading,
  } = useProgress(user?.id);

  const progressItems = progress as ProgressItem[];

  const totalPoints = progressItems.reduce(
    (sum, item) => sum + Number(item.points || 0),
    0
  );

  const completedLessons = progressItems.filter((item) => item.completed).length;

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

        {!user ? (
          <EmptyState
            theme={theme}
            title="تسجيل الدخول مطلوب"
            message="قم بتسجيل الدخول لمتابعة تقدمك."
          />
        ) : (
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2,1fr)",
                gap: "15px",
                marginBottom: "25px",
              }}
            >
              <AppCard theme={theme} style={{ textAlign: "center", padding: "25px" }}>
                <div style={{ fontSize: "40px" }}>💎</div>
                <h2>{totalPoints}</h2>
                <p>النقاط</p>
              </AppCard>

              <AppCard theme={theme} style={{ textAlign: "center", padding: "25px" }}>
                <div style={{ fontSize: "40px" }}>✅</div>
                <h2>{completedLessons}</h2>
                <p>المكتمل</p>
              </AppCard>
            </div>

            <AppCard theme={theme}>
              <h2 style={{ marginBottom: "15px" }}>نشاطك الأخير</h2>

              {isLoading ? (
                <LoadingState theme={theme} message="جاري تحميل التقدم..." />
              ) : progressItems.length === 0 ? (
                <EmptyState
                  theme={theme}
                  title="لا يوجد تقدم بعد"
                  message="ابدأ بحل التمارين حتى يظهر تقدمك هنا."
                />
              ) : (
                progressItems.map((item, index) => (
                  <div
                    key={item.id || index}
                    style={{
                      padding: "15px",
                      borderBottom: `1px solid ${theme.border}`,
                    }}
                  >
                    <strong>{item.lesson_title || "درس"}</strong>
                    <p>النقاط: {item.points || 0}</p>
                  </div>
                ))
              )}
            </AppCard>
          </>
        )}
      </div>
    </Layout>
  );
}
