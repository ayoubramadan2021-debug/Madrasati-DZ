import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { common } from "../theme";
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

  useEffect(() => { checkAdmin(); }, []);

  async function checkAdmin() {
    const user = await getCurrentUser();
    if (!user) { setShowAdmin(false); return; }
    const admin = await isAdmin(user.id);
    setShowAdmin(admin);
  }

  const navLinks = [
    { to: "/", icon: "🏠", label: t.home },
    { to: "/ai-tutor", icon: "🤖", label: t.aiTutor },
    { to: "/progress", icon: "📈", label: t.progress },
    { to: "/leaderboard", icon: "🏆", label: t.leaderboard },
    { to: "/favorites", icon: "💚", label: t.favorites },
    { to: "/auth", icon: "👤", label: t.account },
  ];

  if (showAdmin) navLinks.push({ to: "/admin", icon: "🧑‍🏫", label: "الإدارة" });

  const menuItems = [
    { to: "/", icon: "🏠", label: t.home },
    { to: "/ai-tutor", icon: "🤖", label: t.aiTutor },
    { to: "/progress", icon: "📈", label: t.progress },
    { to: "/leaderboard", icon: "🏆", label: t.leaderboard },
    { to: "/favorites", icon: "💚", label: t.favorites },
    { to: "/auth", icon: "👤", label: t.account },
    { to: "/support", icon: "💬", label: t.support },
  ];

  const themeOptions = [
    { key: "light", icon: "☀️", label: "أبيض" },
    { key: "blue", icon: "🌙", label: "أزرق ليلي" },
    { key: "dark", icon: "⚫", label: "أسود" },
  ];

  const languageOptions = [
    { key: "ar", icon: "🇩🇿", label: "العربية" },
    { key: "fr", icon: "🇫🇷", label: "Français" },
    { key: "en", icon: "🇺🇸", label: "English" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: theme.bg, color: theme.text, direction: "rtl", paddingBottom: showBottomNav ? "85px" : "20px" }}>
      <Toast message={toast} theme={theme} />

      {/* Sidebar Menu */}
      {menuOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex" }}>
          <div style={{
            width: "75%", maxWidth: "300px",
            background: theme.surface,
            height: "100%", overflowY: "auto",
            boxShadow: "4px 0 24px rgba(0,0,0,0.3)",
            display: "flex", flexDirection: "column",
          }}>
            {/* Menu Header */}
            <div style={{
              background: theme.primary,
              padding: "30px 20px 20px",
              textAlign: "center",
            }}>
              <div style={{
                width: "80px", height: "80px", borderRadius: "50%",
                background: "rgba(255,255,255,0.3)",
                margin: "0 auto 12px",
                display: "grid", placeItems: "center", fontSize: "40px",
              }}>🏫</div>
              <div style={{ color: "white", fontWeight: "bold", fontSize: "18px" }}>{t.appName}</div>
              <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "13px" }}>{t.subtitle}</div>
            </div>

            {/* Menu Items */}
            <div style={{ padding: "12px 0", flex: 1 }}>
              <div style={{ padding: "8px 16px", color: theme.muted, fontSize: "12px", fontWeight: "bold" }}>القائمة الرئيسية</div>
              {menuItems.map((item) => (
                <Link key={item.to} to={item.to}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: "flex", alignItems: "center", gap: "14px",
                    padding: "14px 20px", textDecoration: "none",
                    color: location.pathname === item.to ? theme.primary : theme.text,
                    background: location.pathname === item.to ? `${theme.primary}15` : "transparent",
                    borderRight: location.pathname === item.to ? `4px solid ${theme.primary}` : "4px solid transparent",
                    fontSize: "16px",
                  }}>
                  <div style={{
                    width: "40px", height: "40px", borderRadius: "12px",
                    background: `${theme.primary}20`,
                    display: "grid", placeItems: "center", fontSize: "20px",
                  }}>{item.icon}</div>
                  <span style={{ fontWeight: location.pathname === item.to ? "bold" : "normal" }}>{item.label}</span>
                  <span style={{ marginRight: "auto", color: theme.muted }}>‹</span>
                </Link>
              ))}

              
              {/* Language Selector */}
              <div style={{ padding: "16px 20px", borderTop: `1px solid ${theme.border}`, marginTop: "8px" }}>
                <div style={{ color: theme.muted, fontSize: "12px", fontWeight: "bold", marginBottom: "12px" }}>
                  {t.chooseLanguage}
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  {languageOptions.map((lang) => (
                    <button
                      key={lang.key}
                      onClick={() => setLanguage(lang.key)}
                      style={{
                        flex: 1,
                        padding: "10px 4px",
                        borderRadius: "12px",
                        border: language === lang.key ? `2px solid ${theme.primary}` : `1px solid ${theme.border}`,
                        background: language === lang.key ? `${theme.primary}25` : theme.surface2,
                        color: theme.text,
                        cursor: "pointer",
                        fontSize: "11px",
                        textAlign: "center",
                      }}
                    >
                      <div style={{ fontSize: "20px" }}>{lang.icon}</div>
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Theme Selector */}
              <div style={{ padding: "16px 20px", borderTop: `1px solid ${theme.border}`, marginTop: "8px" }}>
                <div style={{ color: theme.muted, fontSize: "12px", fontWeight: "bold", marginBottom: "12px" }}>الثيم</div>
                <div style={{ display: "flex", gap: "8px" }}>
                  {themeOptions.map((t) => (
                    <button key={t.key} onClick={() => setThemeName(t.key)}
                      style={{
                        flex: 1, padding: "10px 4px",
                        borderRadius: "12px",
                        border: `2px solid ${theme.primary}`,
                        background: theme.surface2,
                        color: theme.text, cursor: "pointer",
                        fontSize: "11px", textAlign: "center",
                      }}>
                      <div style={{ fontSize: "20px" }}>{t.icon}</div>
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ padding: "12px 20px", color: theme.muted, fontSize: "12px", textAlign: "center" }}>
                الإصدار 1.0.0
              </div>
            </div>
          </div>

          {/* Overlay */}
          <div style={{ flex: 1, background: "rgba(0,0,0,0.5)" }} onClick={() => setMenuOpen(false)} />
        </div>
      )}

      {/* Header */}
      <header style={{
        position: "sticky", top: 0, zIndex: 10,
        background: theme.headerBg,
        padding: "14px 16px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
      }}>
        <button onClick={() => setMenuOpen(true)} style={{
          background: "rgba(255,255,255,0.2)", border: "none",
          borderRadius: "10px", width: "40px", height: "40px",
          color: theme.headerText, fontSize: "20px", cursor: "pointer",
          display: "grid", placeItems: "center",
        }}>☰</button>

        <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{
            width: "40px", height: "40px", borderRadius: "12px",
            background: "rgba(255,255,255,0.2)",
            display: "grid", placeItems: "center", fontSize: "22px",
          }}>🏫</div>
          <strong style={{ color: theme.headerText, fontSize: "18px" }}>{t.appName}</strong>
        </Link>

        <Link to="/notifications" style={{
          background: "rgba(255,255,255,0.2)", border: "none",
          borderRadius: "10px", width: "40px", height: "40px",
          color: theme.headerText, fontSize: "20px",
          display: "grid", placeItems: "center", textDecoration: "none",
        }}>🔔</Link>
      </header>

      <main style={{ padding: "16px", maxWidth: "980px", margin: "0 auto", width: "100%", boxSizing: "border-box" }}>
        {children}
      </main>

      {/* Bottom Nav */}
      {showBottomNav && (
        <nav style={{
          position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 20,
          background: theme.navBg,
          borderTop: `1px solid ${theme.border}`,
          display: "grid",
          gridTemplateColumns: `repeat(${navLinks.length}, 1fr)`,
          padding: "8px 0 12px",
          boxShadow: "0 -4px 20px rgba(0,0,0,0.1)",
        }}>
          {navLinks.map((nav) => {
            const active = location.pathname === nav.to;
            return (
              <Link key={nav.to} to={nav.to} style={{
                textDecoration: "none",
                display: "flex", flexDirection: "column",
                alignItems: "center", gap: "3px",
              }}>
                <div style={{
                  width: "42px", height: "42px", borderRadius: "14px",
                  background: active ? theme.primary : "transparent",
                  display: "grid", placeItems: "center",
                  fontSize: "22px",
                  transition: "all 0.2s",
                }}>{nav.icon}</div>
                <span style={{
                  fontSize: "0px",
                  color: active ? theme.primary : theme.muted,
                  fontWeight: active ? "bold" : "normal",
                }}>{nav.label}</span>
              </Link>
            );
          })}
        </nav>
      )}
    </div>
  );
}

export default Layout;
