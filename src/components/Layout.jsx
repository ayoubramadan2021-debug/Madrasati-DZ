import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Toast from "./Toast";
import { getCurrentUser } from "../services/sessionService";
import { isAdmin } from "../services/adminService";
import { useLanguage } from "../i18n/LanguageContext";

function Layout({ children, theme, setThemeName, toast }) {
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const showBottomNav = location.pathname === "/";
  const [showAdmin, setShowAdmin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    checkAdmin();
  }, []);

  async function checkAdmin() {
    const user = await getCurrentUser();
    if (!user) {
      setShowAdmin(false);
      return;
    }
    const admin = await isAdmin(user.id);
    setShowAdmin(admin);
  }

  const mainItems = [
    { to: "/", icon: "🏠", label: t.home || "الرئيسية" },
    { to: "/grade/1", icon: "📚", label: "الدروس" },
    { to: "/ai-tutor", icon: "🤖", label: t.aiTutor || "المعلم الذكي" },
    { to: "/progress", icon: "📊", label: t.progress || "التقدم" },
    { to: "/leaderboard", icon: "🏆", label: t.leaderboard || "الترتيب" },
    { to: "/favorites", icon: "⭐", label: t.favorites || "المفضلة" },
    { to: "/notifications", icon: "🔔", label: "الإشعارات" },
    { to: "/auth", icon: "👤", label: t.account || "الحساب" },
    { to: "/support", icon: "💬", label: t.support || "الدعم" },
  ];

  if (showAdmin) {
    mainItems.push({ to: "/admin", icon: "🧑‍🏫", label: "الإدارة" });
  }

  const themeOptions = [
    { key: "light", label: "أبيض" },
    { key: "blue", label: "أزرق ليلي" },
    { key: "dark", label: "أسود" },
  ];

  const languageOptions = [
    { key: "ar", label: "العربية" },
    { key: "fr", label: "Français" },
    { key: "en", label: "English" },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: theme.bg,
        color: theme.text,
        direction: language === "ar" ? "rtl" : "ltr",
        paddingBottom: showBottomNav ? "86px" : "20px",
      }}
    >
      <Toast message={toast} theme={theme} />

      {menuOpen && (
        <div style={overlayStyle}>
          <div style={{ ...sideMenuStyle, background: theme.surface }}>
            <div style={{ padding: "24px 20px", borderBottom: `1px solid ${theme.border}` }}>
              <div style={{ fontSize: "34px" }}>🏫</div>
              <h2 style={{ margin: "8px 0 4px", color: theme.text }}>{t.appName || "Madrasati DZ"}</h2>
              <p style={{ margin: 0, color: theme.muted, fontSize: "14px" }}>
                كل يومك الدراسي في جيبك
              </p>
            </div>

            <div style={{ padding: "14px" }}>
              {mainItems.map((item) => {
                const active = location.pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMenuOpen(false)}
                    style={{ textDecoration: "none" }}
                  >
                    <div
                      style={{
                        ...menuRowStyle,
                        background: active ? theme.accent : theme.surface,
                        border: `1px solid ${theme.border}`,
                      }}
                    >
                      <div style={{ ...menuIconStyle, color: theme.icon || theme.primary }}>
                        {item.icon}
                      </div>

                      <strong style={{ color: theme.text, flex: 1 }}>{item.label}</strong>

                      <div style={{ ...roundArrowStyle(theme), width: 32, height: 32, fontSize: 20 }}>
                        ›
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div style={{ padding: "14px", borderTop: `1px solid ${theme.border}` }}>
              <small style={{ color: theme.muted }}>اللغة</small>
              <div style={smallGridStyle}>
                {languageOptions.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setLanguage(item.key)}
                    style={{
                      ...smallButtonStyle(theme),
                      background: language === item.key ? theme.primary : theme.surface2,
                      color: language === item.key ? theme.buttonText : theme.text,
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <small style={{ color: theme.muted }}>الثيم</small>
              <div style={smallGridStyle}>
                {themeOptions.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setThemeName(item.key)}
                    style={smallButtonStyle(theme)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div style={overlayCloseStyle} onClick={() => setMenuOpen(false)} />
        </div>
      )}

      <header
        style={{
          ...headerStyle,
          background: theme.headerBg,
          borderBottom: `1px solid ${theme.border}`,
        }}
      >
        <Link to="/notifications" style={headerIconButton(theme)}>
          🔔
        </Link>

        <Link to="/" style={logoStyle(theme)}>
          <strong>{t.appName || "Madrasati DZ"}</strong>
          <span style={{ fontSize: "24px" }}>🏫</span>
        </Link>

        <button onClick={() => setMenuOpen(true)} style={headerIconButton(theme)}>
          ☰
        </button>
      </header>

      <main style={mainStyle}>{children}</main>

      {showBottomNav && (
        <nav
          style={{
            ...bottomNavStyle,
            background: theme.navBg,
            borderTop: `1px solid ${theme.border}`,
          }}
        >
          {mainItems.slice(0, 5).map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link key={item.to} to={item.to} style={bottomNavItem(theme, active)}>
                <div style={{ fontSize: "21px" }}>{item.icon}</div>
                <span style={{ fontSize: "11px" }}>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      )}
    </div>
  );
}

const headerStyle = {
  position: "sticky",
  top: 0,
  zIndex: 50,
  height: "70px",
  padding: "0 18px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  boxShadow: "0 4px 18px rgba(0,0,0,0.08)",
};

const headerIconButton = (theme) => ({
  width: "46px",
  height: "46px",
  borderRadius: "15px",
  border: `1px solid ${theme.border}`,
  background: theme.surface,
  color: theme.icon || theme.primary,
  display: "grid",
  placeItems: "center",
  fontSize: "22px",
  textDecoration: "none",
});

const logoStyle = (theme) => ({
  color: theme.headerText,
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  fontSize: "22px",
});

const mainStyle = {
  padding: "18px",
  maxWidth: "980px",
  margin: "0 auto",
  boxSizing: "border-box",
};

const overlayStyle = {
  position: "fixed",
  inset: 0,
  zIndex: 200,
  display: "flex",
};

const sideMenuStyle = {
  width: "82%",
  maxWidth: "340px",
  height: "100%",
  overflowY: "auto",
  boxShadow: "6px 0 30px rgba(0,0,0,0.25)",
};

const overlayCloseStyle = {
  flex: 1,
  background: "rgba(0,0,0,0.45)",
};

const menuRowStyle = {
  minHeight: "62px",
  borderRadius: "18px",
  marginBottom: "11px",
  padding: "10px 12px",
  display: "flex",
  alignItems: "center",
  gap: "13px",
};

const menuIconStyle = {
  width: "46px",
  height: "46px",
  borderRadius: "15px",
  background: "rgba(255,255,255,0.10)",
  display: "grid",
  placeItems: "center",
  fontSize: "23px",
};

const roundArrowStyle = (theme) => ({
  width: "38px",
  height: "38px",
  borderRadius: "50%",
  background: theme.primary,
  color: theme.buttonText || "#fff",
  display: "grid",
  placeItems: "center",
  fontWeight: "bold",
  fontSize: "25px",
});

const smallGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "8px",
  margin: "8px 0 14px",
};

const smallButtonStyle = (theme) => ({
  border: `1px solid ${theme.border}`,
  borderRadius: "12px",
  padding: "10px 4px",
  background: theme.surface2,
  color: theme.text,
  fontWeight: "bold",
});

const bottomNavStyle = {
  position: "fixed",
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 80,
  display: "grid",
  gridTemplateColumns: "repeat(5, 1fr)",
  padding: "8px 6px 10px",
  boxShadow: "0 -6px 24px rgba(0,0,0,0.12)",
};

const bottomNavItem = (theme, active) => ({
  color: active ? theme.primary : theme.muted,
  textDecoration: "none",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "3px",
  fontWeight: active ? "bold" : "normal",
});

export default Layout;
