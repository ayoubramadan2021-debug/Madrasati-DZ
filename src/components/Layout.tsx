import { OfflineStatus, InstallAppButton } from "../features/pwa";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Toast from "./Toast";
import { getCurrentUser } from "../services/sessionService";
import { isAdmin } from "../services/adminService";
import { useLanguage } from "../i18n/LanguageContext";

function Layout({ children, theme, setThemeName, toast = "" }) {
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();
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

  const navItems = [
    { to: "/", icon: "🏠", label: t.home || "الرئيسية" },
    { to: "/grade/1", icon: "📘", label: t.lessons || "الدروس" },
    { to: "/ai-tutor", icon: "🤖", label: t.aiTutor || "المعلّم" },
    { to: "/progress", icon: "📊", label: t.progress || "التقدم" },
    { to: "/auth", icon: "👤", label: t.account || "الحساب" },
  ];

  const menuItems = [
    { to: "/", icon: "🏠", label: t.home || "الرئيسية" },
    { to: "/grade/1", icon: "📘", label: t.lessons || "الدروس" },
    { to: "/ai-tutor", icon: "🤖", label: t.aiTutor || "المعلّم الذكي" },
    { to: "/progress", icon: "📊", label: t.progress || "التقدم" },
    { to: "/leaderboard", icon: "🏆", label: t.leaderboard || "الترتيب" },
    { to: "/favorites", icon: "⭐", label: t.favorites || "المفضلة" },
    { to: "/notifications", icon: "🔔", label: t.notifications || "الإشعارات" },
    { to: "/support", icon: "💬", label: t.support || "الدعم" },
    { to: "/parent-dashboard", icon: "👨‍👩‍👧", label: t.parentDashboard || "متابعة الأولياء" },
    { to: "/auth", icon: "👤", label: t.account || "الحساب" },
  ];

  if (showAdmin) {
    menuItems.push({ to: "/admin", icon: "🧑‍🏫", label: t.admin || "الإدارة" });
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: theme.bg,
        color: theme.text,
        direction: language === "ar" ? "rtl" : "ltr",
        paddingBottom: "92px",
      }}
    >
      <Toast message={toast} theme={theme} />

      {menuOpen && (
        <div style={overlayStyle}>
          <div style={{ ...drawerStyle, background: theme.surface }}>
            <h2 style={{ margin: "0 0 20px", color: theme.text }}>
              {t.menu || "القائمة"}
            </h2>

            {menuItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                style={{ textDecoration: "none" }}
              >
                <div style={drawerItem(theme)}>
                  <span style={{ fontSize: "22px" }}>{item.icon}</span>
                  <strong>{item.label}</strong>
                  <span style={{ marginInlineStart: "auto" }}>›</span>
                </div>
              </Link>
            ))}

            <div style={{ marginTop: "22px" }}>
              <strong>{t.language || "اللغة"}</strong>

              <div style={smallButtonsGrid}>
                <button onClick={() => setLanguage("ar")} style={smallButton(theme)}>
                  AR
                </button>
                <button onClick={() => setLanguage("fr")} style={smallButton(theme)}>
                  FR
                </button>
                <button onClick={() => setLanguage("en")} style={smallButton(theme)}>
                  EN
                </button>
              </div>
            </div>

            <div style={{ marginTop: "16px" }}>
              <strong>{t.theme || "الثيم"}</strong>

              <div style={smallButtonsGrid}>
                <button onClick={() => setThemeName("light")} style={smallButton(theme)}>
                  Light
                </button>
                <button onClick={() => setThemeName("blue")} style={smallButton(theme)}>
                  Night
                </button>
              </div>
            </div>
          </div>

          <div style={overlayCloseStyle} onClick={() => setMenuOpen(false)} />
        </div>
      )}

      <header style={topBar(theme)}>
        <button onClick={() => setMenuOpen(true)} style={topIconButton(theme)}>
          ☰
        </button>

        <strong style={{ color: theme.headerText, fontSize: "20px" }}>
          {t.appName || "Madrasati DZ"}
        </strong>

        <Link to="/notifications" style={topIconButton(theme)}>
          🔔
        </Link>
      </header>

      <main style={mainStyle}>{children}</main>

      <nav style={bottomNav(theme)}>
        {navItems.map((item) => {
          const active = location.pathname === item.to;

          return (
            <Link key={item.to} to={item.to} style={{ textDecoration: "none" }}>
              <div
                style={{
                  ...bottomItemStyle(theme),
                  border: active ? `2px solid ${theme.primary}` : "2px solid transparent",
                  background: active ? theme.surface2 : "transparent",
                }}
              >
                <span style={{ fontSize: "22px" }}>{item.icon}</span>
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

const topBar = (theme) => ({
  height: "70px",
  padding: "0 18px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  background: theme.headerBg,
  borderBottom: `1px solid ${theme.border}`,
  position: "sticky",
  top: 0,
  zIndex: 50,
});

const topIconButton = (theme) => ({
  width: "48px",
  height: "48px",
  borderRadius: "16px",
  border: `1px solid ${theme.border}`,
  background: theme.surface,
  color: theme.text,
  fontSize: "22px",
  fontWeight: "bold",
  display: "grid",
  placeItems: "center",
  textDecoration: "none",
});

const mainStyle = {
  padding: "18px",
  maxWidth: "900px",
  margin: "0 auto",
};

const bottomNav = (theme) => ({
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 60,
  height: "78px",
  background: theme.navBg,
  borderTop: `1px solid ${theme.border}`,
  display: "grid",
  gridTemplateColumns: "repeat(5, 1fr)",
  alignItems: "center",
  padding: "0 10px",
});

const bottomItemStyle = () => ({
  width: "54px",
  height: "54px",
  borderRadius: "18px",
  display: "grid",
  placeItems: "center",
  margin: "0 auto",
});

const overlayStyle = {
  position: "fixed",
  inset: 0,
  zIndex: 200,
  display: "flex",
};

const drawerStyle = {
  width: "82%",
  maxWidth: "340px",
  height: "100%",
  padding: "24px",
  boxSizing: "border-box",
  overflowY: "auto",
};

const overlayCloseStyle = {
  flex: 1,
  background: "rgba(0,0,0,0.45)",
};

const drawerItem = (theme) => ({
  minHeight: "58px",
  borderBottom: `1px solid ${theme.border}`,
  display: "flex",
  alignItems: "center",
  gap: "14px",
  color: theme.text,
  fontSize: "17px",
});

const smallButtonsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "8px",
  marginTop: "10px",
};

const smallButton = (theme) => ({
  padding: "10px",
  borderRadius: "12px",
  border: `1px solid ${theme.border}`,
  background: theme.surface2,
  color: theme.text,
  fontWeight: "bold",
});

export default Layout;
