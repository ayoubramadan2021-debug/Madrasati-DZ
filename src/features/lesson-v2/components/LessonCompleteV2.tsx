import { useNavigate } from "react-router-dom";

const C = { navy: "#1B3A6B", gold: "#E8A020", green: "#1FA463", purple: "#7C3AED" };
const WORLD_ID = "b0a43712-8b45-428d-bea2-55ff3de52d3a";

interface LessonCompleteV2Props {
  message: string;              // رسالة التهنئة
  onReplay: () => void;         // إعادة التمارين
  nextLessonKey?: string;       // مثل "lesson11" → يظهر زرّ الدرس التالي
}

export default function LessonCompleteV2({ message, onReplay, nextLessonKey }: LessonCompleteV2Props) {
  const navigate = useNavigate();

  const btn = (bg: string, fontSize = 17, pad = "15px 20px") => ({
    background: bg, color: "#fff", border: "none", borderRadius: 16,
    padding: pad, fontSize, fontWeight: 800 as const, fontFamily: "Tajawal,sans-serif",
    cursor: "pointer", boxShadow: `0 4px 12px ${bg}40`,
  });

  return (
    <div style={{
      minHeight: "100dvh", background: "linear-gradient(180deg,#FFF8EC 0%,#F5E3B0 100%)",
      fontFamily: "Tajawal,sans-serif", direction: "rtl", display: "flex",
      flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: "32px 20px", gap: 14, maxWidth: 480, margin: "0 auto",
    }}>
      {/* النجمة */}
      <div style={{ fontSize: 88, lineHeight: 1 }}>🌟</div>

      {/* زرّ الإعادة الصغير أعلى — ثانوي */}
      <button onClick={onReplay} style={{
        background: "#fff", color: C.gold, border: `2px solid ${C.gold}`,
        borderRadius: 999, padding: "8px 20px", fontSize: 14, fontWeight: 700,
        fontFamily: "Tajawal,sans-serif", cursor: "pointer",
        boxShadow: "0 2px 8px rgba(232,160,32,.25)",
      }}>إِعَادَة 🔁</button>

      <h1 style={{ fontSize: 30, color: C.navy, fontWeight: 900, margin: "6px 0 0", textAlign: "center" }}>أَحْسَنْتَ يَا بَطَل!</h1>
      <p style={{ fontSize: 17, color: C.navy, margin: 0, textAlign: "center", maxWidth: 320, lineHeight: 1.6 }}>{message}</p>

      {/* الأزرار الرئيسية متقاربة للتنقّل */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%", maxWidth: 340, marginTop: 14 }}>
        {nextLessonKey && (
          <button onClick={() => navigate(`/lesson-v2/${nextLessonKey}`)} style={btn(C.green, 18, "16px 24px")}>
            الدَّرْسُ التَّالي ←
          </button>
        )}
        <button onClick={() => navigate(`/world/${WORLD_ID}/quiz`)} style={btn(C.purple, 18, "16px 24px")}>
          اِخْتِبَارُ العَالَم 🎯
        </button>
        <button onClick={() => navigate("/")} style={btn(C.navy, 16, "14px 20px")}>
          الرَّئِيسِيَّة 🏠
        </button>
      </div>
    </div>
  );
}
