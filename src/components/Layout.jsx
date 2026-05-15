import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Toast from "./Toast";
import { getCurrentUser } from "../services/sessionService";
import { isAdmin } from "../services/adminService";
import { useLanguage } from "../i18n/LanguageContext";

function Layout({ children, theme, setThemeName, toast }) {
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
    { to: "/", icon: "🏠", label: t.home || "Home", color: theme.red },
    { to: "/grade/1", icon: "📚", label: "Lessons", color: theme.blue },
    { to: "/ai-tutor", icon: "🎥", label: "AI", color: theme.purple },
    { to: "/progress", icon: "❤️", label: "Progress", color: theme.pink },
    { to: "/leaderboard", icon: "🏆", label: "Rank", color: theme.yellow },
    { to: "/auth", icon: "👤", label: "Profile", color: theme.blue },
  ];

  const menuItems = [
    { to: "/profile", label: "Profile", icon: "👤" },
    { to: "/progress", label: "Progress", icon: "📊" },
    { to: "/favorites", label: "Favorites", icon: "⭐" },
    { to: "/notifications", label: "Notifications", icon: "🔔" },
    { to: "/support", label: "Support", icon: "💬" },
    { to: "/parent-dashboard", label: "Parent Dashboard", icon: "👨‍👩‍👧" },
  ];

  if (showAdmin) {
    menuItems.push({ to: "/admin", label: "Admin Panel", icon: "🧑‍🏫" });
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
            <h2 style={{ margin: "0 0 20px", color: theme.text }}>Menu</h2>

            {menuItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                style={{ textDecoration: "none" }}
              >
                <div style={{ ...drawerItem(theme) }}>
                  <span style={{ fontSize: "28px" }}>{item.icon}</span>
                  <strong>{item.label}</strong>
                  <span style={{ marginInlineStart: "auto" }}>›</span>
                </div>
              </Link>
            ))}

            <div style={{ marginTop: "22px" }}>
              <strong>Language</strong>
              <div style={smallButtonsGrid}>
                <button onClick={() => setLanguage("ar")} style={smallButton(theme)}>AR</button>
                <button onClick={() => setLanguage("fr")} style={smallButton(theme)}>FR</button>
                <button onClick={() => setLanguage("en")} style={smallButton(theme)}>EN</button>
              </div>
            </div>

            <div style={{ marginTop: "16px" }}>
              <strong>Theme</strong>
              <div style={smallButtonsGrid}>
                <button onClick={() => setThemeName("light")} style={smallButton(theme)}>Light</button>
                <button onClick={() => setThemeName("blue")} style={smallButton(theme)}>Night</button>
                <button onClick={() => setThemeName("dark")} style={smallButton(theme)}>Dark</button>
              </div>
            </div>
          </div>

          <div style={overlayCloseStyle} onClick={() => setMenuOpen(false)} />
        </div>
      )}

      <header style={{ ...topBar(theme) }}>
        <button onClick={() => setMenuOpen(true)} style={topIconButton(theme)}>
          ☰
        </button>

        <div style={topStatsStyle}>
          <strong style={{ color: theme.blue }}>695 💎</strong>
          <strong style={{ color: theme.muted }}>0 🔥</strong>
          <strong style={{ color: theme.text }}>8 🇺🇸</strong>
        </div>
      </header>

      <main style={mainStyle}>
        {children}
      </main>

      <nav style={{ ...bottomNav(theme) }}>
        {navItems.map((item) => {
          const active = location.pathname === item.to;

          return (
            <Link key={item.to} to={item.to} style={{ textDecoration: "none" }}>
              <div
                style={{
                  ...bottomItemStyle(theme),
                  border: active ? `3px solid ${theme.blue}` : "3px solid transparent",
                  background: active ? theme.accent : "transparent",
                }}
              >
                <span style={{ fontSize: "30px" }}>{item.icon}</span>
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

const topBar = (theme) => ({
  height: "76px",
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
  width: "52px",
  height: "52px",
  borderRadius: "16px",
  border: `2px solid ${theme.border}`,
  background: theme.surface,
  color: theme.text,
  fontSize: "28px",
  fontWeight: "bold",
});

const topStatsStyle = {
  display: "flex",
  gap: "18px",
  alignItems: "center",
  fontSize: "18px",
};

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
  height: "82px",
  background: theme.navBg,
  borderTop: `2px solid ${theme.border}`,
  display: "grid",
  gridTemplateColumns: "repeat(6, 1fr)",
  alignItems: "center",
  padding: "0 10px",
});

const bottomItemStyle = (theme) => ({
  width: "58px",
  height: "58px",
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
  minHeight: "62px",
  borderBottom: `2px solid ${theme.border}`,
  display: "flex",
  alignItems: "center",
  gap: "16px",
  color: theme.text,
  fontSize: "20px",
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
  border: `2px solid ${theme.border}`,
  background: theme.surface2,
  color: theme.text,
  fontWeight: "bold",
});

export default Layout;
