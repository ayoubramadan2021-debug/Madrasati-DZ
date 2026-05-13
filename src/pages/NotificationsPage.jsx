import { useEffect, useState } from "react";

import Layout from "../components/Layout";
import { common } from "../theme";

import { getCurrentUser } from "../services/authService";

import {
  getNotifications,
  markNotificationAsRead,
} from "../services/notificationService";

function NotificationsPage({ theme, setThemeName }) {
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  async function loadNotifications() {
    setLoading(true);

    const user = await getCurrentUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const data = await getNotifications(user.id);

    setNotifications(data || []);
    setLoading(false);
  }

  async function handleRead(id) {
    await markNotificationAsRead(id);

    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, is_read: true }
          : item
      )
    );
  }

  return (
    <Layout theme={theme} setThemeName={setThemeName}>
      <section style={heroStyle(theme)}>
        <div style={{ fontSize: "60px" }}>🔔</div>

        <h1 style={{ color: theme.text }}>
          الإشعارات
        </h1>

        <p style={{ color: theme.muted }}>
          آخر التنبيهات والنشاطات داخل المنصة
        </p>
      </section>

      {loading ? (
        <div style={cardStyle(theme)}>
          جاري تحميل الإشعارات...
        </div>
      ) : notifications.length === 0 ? (
        <div style={cardStyle(theme)}>
          لا توجد إشعارات بعد.
        </div>
      ) : (
        notifications.map((notification) => (
          <div
            key={notification.id}
            style={notificationCard(
              theme,
              notification.is_read
            )}
          >
            <div>
              <h2 style={{ color: theme.text }}>
                {notification.title}
              </h2>

              <p
                style={{
                  color: theme.muted,
                  lineHeight: "1.8",
                }}
              >
                {notification.body}
              </p>

              <small style={{ color: theme.muted }}>
                {new Date(
                  notification.created_at
                ).toLocaleString()}
              </small>
            </div>

            {!notification.is_read && (
              <button
                onClick={() =>
                  handleRead(notification.id)
                }
                style={buttonStyle(theme)}
              >
                تمّت القراءة
              </button>
            )}
          </div>
        ))
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

const notificationCard = (theme, isRead) => ({
  marginTop: "18px",
  background: isRead
    ? theme.surface2
    : theme.surface,
  border: `1px solid ${
    isRead ? theme.border : theme.primary
  }`,
  padding: "20px",
  borderRadius: common.radius.large,
  boxShadow: common.shadow.card,
  opacity: isRead ? 0.75 : 1,
});

const buttonStyle = (theme) => ({
  width: "100%",
  marginTop: "16px",
  padding: "14px",
  border: "none",
  borderRadius: common.radius.medium,
  background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
  color: "white",
  fontSize: "16px",
  fontWeight: "bold",
});

export default NotificationsPage;
