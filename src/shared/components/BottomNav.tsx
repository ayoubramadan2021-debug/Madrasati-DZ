import { Link, useLocation } from "react-router-dom";

const C = {
  primary: "#1B3A6B", surface: "#FFFFFF",
  border: "#D8E2F0", textMuted: "#8A97AA",
  primarySoft: "#EBF1FA",
};

const NAV = [
  { to:"/",         icon:"🏠", label:"الرئيسية" },
  { to:"/progress", icon:"📊", label:"التقدم"   },
  { to:"/ai-tutor", icon:"🤖", label:"المعلم"   },
  { to:"/grade/1",  icon:"📖", label:"الدروس"   },
  { to:"/profile",  icon:"👤", label:"حسابي"    },
];

export default function BottomNav() {
  const { pathname } = useLocation();
  return (
    <nav style={{ position:"fixed", bottom:0, left:0, right:0, zIndex:60, height:72, background:C.surface, borderTop:`1px solid ${C.border}`, display:"grid", gridTemplateColumns:"repeat(5,1fr)", alignItems:"center", padding:"0 4px", boxShadow:"0 -4px 20px rgba(27,58,107,0.08)" }}>
      {NAV.map(item => {
        const active = pathname === item.to || (item.to !== "/" && pathname.startsWith(item.to));
        return (
          <Link key={item.to} to={item.to} style={{ textDecoration:"none", display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}>
            <div style={{ width:44, height:44, borderRadius:14, background:active ? C.primarySoft : "transparent", display:"grid", placeItems:"center", fontSize:22, border:`2px solid ${active ? C.primary : "transparent"}`, transition:"all 0.2s" }}>
              {item.icon}
            </div>
            <span style={{ fontSize:10, color:active ? C.primary : C.textMuted, fontWeight:active ? 700 : 400, fontFamily:"'Cairo',sans-serif" }}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
