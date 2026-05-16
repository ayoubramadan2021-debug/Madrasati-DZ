import Layout from "../components/Layout";
import { common } from "../theme";
import { useAuth } from "../context/AuthContext";
import { useNotifications, useMarkNotificationAsRead } from "../features/notifications";
import { AppButton, LoadingState, EmptyState } from "../shared/components/ui";

type NotificationsPageProps = {
  theme: any;
  setThemeName: (themeName: string) => void;
};

type NotificationItem = {
  id: string;
  title: string;
  body: string;
  is_read?: boolean;
  created_at?: string;
};

function NotificationsPage({ theme, setThemeName }: NotificationsPageProps) {
  const { user } = useAuth();

  const {
    data: notifications = [],
    isLoading,
  } = useNotifications(user?.id);

  const markAsReadMutation = useMarkNotificationAsRead(user?.id);

  function handleRead(id: string) {
    markAsReadMutation.mutate(id);
  }

  return (
    <Layout theme={theme} setThemeName={setThemeName}>
      <section style={heroStyle(theme)}>
        <div style={{ fontSize: "60px" }}>🔔</div>

        <h1 style={{ color: theme.text }}>الإشعارات</h1>

        <p style={{ color: theme.muted }}>
          آخر التنبيهات والنشاطات داخل المنصة
        </p>
      </section>

      {isLoading ? (
        <LoadingState theme={theme} message="جاري تحميل الإشعارات..." />
      ) : !user ? (
        <EmptyState
          theme={theme}
          title="تسجيل الدخول مطلوب"
          message="سجّل الدخول لعرض الإشعارات."
        />
      ) : notifications.length === 0 ? (
        <EmptyState
          theme={theme}
          title="لا توجد إشعارات"
          message="لا توجد إشعارات بعد."
        />
      ) : (
        (notifications as NotificationItem[]).map((notification) => (
          <div
            key={notification.id}
            style={notificationCard(theme, Boolean(notification.is_read))}
          >
            <div>
              <h2 style={{ color: theme.text }}>{notification.title}</h2>

              <p
                style={{
                  color: theme.muted,
                  lineHeight: "1.8",
                }}
              >
                {notification.body}
              </p>

              {notification.created_at && (
                <small style={{ color: theme.muted }}>
                  {new Date(notification.created_at).toLocaleString()}
                </small>
              )}
            </div>

            {!notification.is_read && (
              <AppButton theme={theme} onClick={() => handleRead(notification.id)}>
                تمّت القراءة
              </AppButton>
            )}
          </div>
        ))
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

const notificationCard = (theme: any, isRead: boolean) => ({
  marginTop: "18px",
  background: isRead ? theme.surface2 : theme.surface,
  border: `1px solid ${isRead ? theme.border : theme.primary}`,
  padding: "20px",
  borderRadius: common.radius.large,
  boxShadow: common.shadow.card,
  opacity: isRead ? 0.75 : 1,
});

export default NotificationsPage;
