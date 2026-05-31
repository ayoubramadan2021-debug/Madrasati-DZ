import { useRef, useState, useEffect } from "react";

type World = { id: string; title_ar: string; title_fr?: string; icon?: string; };
type Props = { worlds: World[]; progress: any[]; lang: string; onOpen: (worldId: string) => void; onLocked: () => void; };

const X_PATTERN = [50, 74, 32, 68, 28, 60, 38, 72];
const GAP = 150;
const TOP = 60;

export default function JourneyMap({ worlds, progress, lang, onOpen, onLocked }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(360);

  useEffect(() => {
    const update = () => { if (wrapRef.current) setWidth(Math.min(wrapRef.current.offsetWidth, 480)); };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const W = width;
  const H = TOP + worlds.length * GAP + 40;
  const pts = worlds.map((_, i) => ({ x: (X_PATTERN[i % X_PATTERN.length] / 100) * W, y: TOP + i * GAP }));

  function smoothPath(p: { x: number; y: number }[]) {
    if (p.length < 2) return p.length === 1 ? `M ${p[0].x} ${p[0].y}` : "";
    let d = `M ${p[0].x} ${p[0].y}`;
    for (let i = 0; i < p.length - 1; i++) {
      const p0 = p[i - 1] || p[i], p1 = p[i], p2 = p[i + 1], p3 = p[i + 2] || p2;
      const c1x = p1.x + (p2.x - p0.x) / 6, c1y = p1.y + (p2.y - p0.y) / 6;
      const c2x = p2.x - (p3.x - p1.x) / 6, c2y = p2.y - (p3.y - p1.y) / 6;
      d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`;
    }
    return d;
  }
  const d = smoothPath(pts);

  return (
    <div ref={wrapRef} style={{ position: "relative", width: "100%", height: H }}>
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1, pointerEvents: "none" }} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
        <path d={d} fill="none" stroke="rgba(255,255,255,.06)" strokeWidth={26} strokeLinecap="round" />
        <path d={d} fill="none" stroke="rgba(232,160,32,.22)" strokeWidth={14} strokeLinecap="round" />
        <path d={d} fill="none" stroke="var(--gold)" strokeWidth={3} strokeLinecap="round" strokeDasharray="2 14" opacity={0.8} />
      </svg>
      {worlds.map((w, i) => {
        const prog = progress.find((p: any) => p.world_id === w.id);
        const unlocked = i === 0 || prog?.status === "unlocked" || prog?.status === "completed";
        const completed = prog?.status === "completed";
        const locked = !unlocked;
        const current = unlocked && !completed;
        return (
          <div key={w.id} onClick={() => (locked ? onLocked() : onOpen(w.id))} style={{ position: "absolute", left: pts[i].x, top: pts[i].y, transform: "translate(-50%, -50%)", zIndex: 3, display: "flex", flexDirection: "column", alignItems: "center", width: 130, cursor: locked ? "not-allowed" : "pointer", opacity: 0, animation: `jm-pop .5s ease forwards ${i * 0.1}s` }}>
            <div style={{ width: 88, height: 88, borderRadius: "50%", display: "grid", placeItems: "center", position: "relative" }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "3px solid", borderColor: locked ? "var(--text-dim)" : "var(--gold)", background: locked ? "rgba(58,74,95,.18)" : "radial-gradient(circle,rgba(232,160,32,.28),rgba(232,160,32,.06))", boxShadow: locked ? "none" : "0 0 22px rgba(232,160,32,.4)", animation: current ? "jm-pulse 1.8s ease-in-out infinite" : "none" }} />
              <span style={{ fontSize: 38, position: "relative", zIndex: 2, filter: locked ? "grayscale(1) brightness(.55)" : "drop-shadow(0 3px 6px rgba(0,0,0,.45))" }}>{locked ? "🔒" : (w.icon || "🌟")}</span>
              {completed && (<div style={{ position: "absolute", bottom: 0, right: 0, zIndex: 4, width: 26, height: 26, borderRadius: "50%", background: "#22c55e", display: "grid", placeItems: "center", fontSize: 14, border: "2px solid var(--bg)" }}>✓</div>)}
              {current && (<div style={{ position: "absolute", top: -15, left: "50%", transform: "translateX(-50%)", background: "var(--gold)", color: "#000", fontSize: 10, fontWeight: 800, padding: "3px 9px", borderRadius: 99, whiteSpace: "nowrap", zIndex: 6, animation: "jm-bob 1.5s ease-in-out infinite" }}>ابدأ هنا!</div>)}
            </div>
            <div style={{ marginTop: 9, fontSize: 14, fontWeight: 800, textAlign: "center", lineHeight: 1.2, color: locked ? "var(--text-dim)" : "var(--text)" }}>{lang === "fr" && w.title_fr ? w.title_fr : w.title_ar}</div>
          </div>
        );
      })}
      <style>{`
        @keyframes jm-pop { from { opacity: 0; transform: translate(-50%,-50%) scale(.7); } to { opacity: 1; transform: translate(-50%,-50%) scale(1); } }
        @keyframes jm-pulse { 0%,100% { box-shadow: 0 0 22px rgba(232,160,32,.4); } 50% { box-shadow: 0 0 42px rgba(232,160,32,.75); } }
        @keyframes jm-bob { 0%,100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(-4px); } }
      `}</style>
    </div>
  );
}
