import { Link, useLocation } from "react-router-dom";
import { useLang } from "../../i18n/LanguageContext";

const C = {
  primary: "#1B3A6B",
  textMuted: "#8A97AA",
  border: "#D8E2F0",
  shadow: "0 2px 12px rgba(27,58,107,0.09)"
};

export default function BottomNav() {
  const { pathname } = useLocation();
  const { t } = useLang();
  const NAV = [
    { to: "/", icon: "🏠", label: t("nav_home") },
    { to: "/progress", icon: "📊", label: t("nav_progress") },
    { to: "/ai-tutor", icon: "🤖", label: t("nav_tutor") },
    { to: "/leaderboard", icon: "🏆", label: t("nav_leaderboard") },
    { to: "/profile", icon: "👤", label: t("nav_account") }
  ];

  return (
    <nav style={{ 
      position: "fixed", bottom: 0, left: 0, right: 0, height: 65, 
      background: "#FFFFFF", display: "grid", gridTemplateColumns: "repeat(5, 1fr)", 
      alignItems: "center", borderTop: `1px solid ${C.border}`, 
      boxShadow: C.shadow, zIndex: 100 
    }}>
      {NAV.map((item) => {
        const active = pathname === item.to;
        return (
          <Link key={item.to} to={item.to} style={{ textDecoration: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <span style={{ fontSize: 20, filter: active ? "none" : "grayscale(100%)" }}>{item.icon}</span>
            <span style={{ 
              fontSize: 11, 
              color: active ? C.primary : C.textMuted, 
              fontWeight: active ? "bold" : "normal", 
              fontFamily: "'Cairo', sans-serif" 
            }}>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}