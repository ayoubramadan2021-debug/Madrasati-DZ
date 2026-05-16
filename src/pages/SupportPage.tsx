import { useEffect, useState } from "react";

import Layout from "../components/Layout";
import { common } from "../theme";

import { getCurrentUser } from "../services/authService";
import {
  createSupportMessage,
  getMySupportMessages,
} from "../services/supportService";

function SupportPage({ theme, setThemeName }) {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    loadMessages();
  }, []);

  async function loadMessages() {
    const currentUser = await getCurrentUser();
    setUser(currentUser);

    if (currentUser) {
      const data = await getMySupportMessages(currentUser.id);
      setMessages(data);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!user) {
      setStatus("🔐 سجّل الدخول أولًا لإرسال رسالة.");
      return;
    }

    const result = await createSupportMessage({
      userId: user.id,
      email: user.email,
      message,
    });

    if (result.error) {
      setStatus("❌ حدث خطأ أثناء إرسال الرسالة.");
      return;
    }

    setStatus("✅ تم إرسال رسالتك بنجاح.");
    setMessage("");
    await loadMessages();
  }

  return (
    <Layout theme={theme} setThemeName={setThemeName}>
      <section style={heroStyle(theme)}>
        <div style={{ fontSize: "60px" }}>💬</div>
        <h1 style={{ color: theme.text }}>الدعم والأسئلة</h1>
        <p style={{ color: theme.muted }}>
          أرسل سؤالًا أو مشكلة لإدارة المنصة
        </p>
      </section>

      <form onSubmit={handleSubmit} style={cardStyle(theme)}>
        <h2 style={{ color: theme.text }}>✉️ أرسل رسالة</h2>

        <textarea
          required
          rows="6"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="اكتب سؤالك أو مشكلتك هنا..."
          style={{
            ...inputStyle(theme),
            lineHeight: "1.8",
          }}
        />

        <button style={buttonStyle(theme)}>
          إرسال
        </button>

        {status && (
          <div style={messageStyle(theme)}>
            {status}
          </div>
        )}
      </form>

      <div style={cardStyle(theme)}>
        <h2 style={{ color: theme.text }}>📨 رسائلي السابقة</h2>

        {messages.length === 0 ? (
          <p style={{ color: theme.muted }}>
            لا توجد رسائل بعد.
          </p>
        ) : (
          messages.map((item) => (
            <div key={item.id} style={itemStyle(theme)}>
              <strong>رسالتك:</strong>
              <p style={{ color: theme.muted }}>
                {item.message}
              </p>

              {item.reply ? (
                <>
                  <strong>رد الإدارة:</strong>
                  <p style={{ color: theme.muted }}>
                    {item.reply}
                  </p>
                </>
              ) : (
                <p style={{ color: theme.muted }}>
                  ⏳ لم يتم الرد بعد.
                </p>
              )}
            </div>
          ))
        )}
      </div>
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
  marginTop: "14px",
  padding: "14px",
  borderRadius: common.radius.medium,
  background: theme.surface2,
  border: `1px solid ${theme.border}`,
  color: theme.text,
});

const itemStyle = (theme) => ({
  marginTop: "14px",
  background: theme.surface2,
  border: `1px solid ${theme.border}`,
  padding: "16px",
  borderRadius: common.radius.medium,
});

export default SupportPage;
