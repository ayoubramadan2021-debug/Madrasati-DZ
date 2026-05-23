import { Link, useLocation } from "react-router-dom";

const C = {
  primary: "#1B3A6B",
  accent: "#E8A020",
  bg: "#FFFFFF",
  border: "#D8E2F0",
  text: "#8A97AA",
  active: "#1A2540",
  shadow: "0 -2px 12px rgba(27,58,107,0.08)",
};

const items = [
  { to: "/", icon: "🏠", label: "الرئيسية" },
  { to: "/progress", icon: "📊", label: "التقدم" },
  { to: "/favorites", icon: "⭐", label: "المفضلة" },
  { to: "/auth", icon: "👤", label: "الحساب" },
];

export default function BottomNav() {
  const location = useLocation();

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        maxWidth: 480,
        background: C.bg,
        borderTop: `1px solid ${C.border}`,
        boxShadow: C.shadow,
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        zIndex: 999,
        padding: "10px 6px 16px",
      }}
    >
      {items.map((item) => {
        const active = location.pathname === item.to;

        return (
          <Link
            key={item.to}
            to={item.to}
            style={{
              textDecoration: "none",
              color: active ? C.primary : C.text,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
              }}
            >
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 14,
                  display: "grid",
                  placeItems: "center",
                  background: active
                    ? "rgba(27,58,107,0.10)"
                    : "transparent",
                  border: active
                    ? `1px solid ${C.border}`
                    : "1px solid transparent",
                  fontSize: 22,
                }}
              >
                {item.icon}
              </div>

              <span
                style={{
                  fontSize: 11,
                  fontWeight: active ? 700 : 500,
                  color: active ? C.active : C.text,
                }}
              >
                {item.label}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
