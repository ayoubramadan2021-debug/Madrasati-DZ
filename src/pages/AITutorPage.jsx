import { useState } from "react";


export default function AiTutorPage({ theme }) {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
    { role: "ai", text: "مرحباً! أنا مساعدك التعليمي الذكي\nاسألني عن أي درس أو تمرين وسأساعدك." }
  ]);
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!question.trim()) return;
    const q = question;
    setMessages((prev) => [...prev, { role: "user", text: q }]);
    setQuestion("");
    setLoading(true);
    try {
      const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + GROQ_KEY,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: "You are an Arabic tutor for Algerian primary school students. You MUST respond ONLY in Arabic. Never use any other language or script. Keep answers simple and child-friendly." },
            { role: "user", content: q },
          ],
        }),
      });
      const d = await r.json();
      const reply = d.choices?.[0]?.message?.content || "لا يوجد رد";
      setMessages((prev) => [...prev, { role: "ai", text: reply }]);
    } catch (e) {
      setMessages((prev) => [...prev, { role: "ai", text: "خطأ في الاتصال، حاول مجدداً." }]);
    }
    setLoading(false);
  }

  const bg = theme?.bg || "#0f172a";
  const surface = theme?.surface || "#1e293b";
  const border = theme?.border || "#334155";
  const text = theme?.text || "#ffffff";
  const muted = theme?.muted || "#94a3b8";
  const primary = theme?.primary || "#38bdf8";

  return (
    <div style={{ minHeight: "100vh", background: bg, direction: "rtl", display: "flex", flexDirection: "column" }}>
      <div style={{
        background: "linear-gradient(135deg, #7c3aed, #3b82f6)",
        padding: "20px 16px 30px",
        textAlign: "center", color: "white",
      }}>
        <div style={{
          width: "80px", height: "80px", borderRadius: "50%",
          background: "rgba(255,255,255,0.2)",
          margin: "0 auto 12px",
          display: "grid", placeItems: "center", fontSize: "40px",
          border: "3px solid rgba(255,255,255,0.4)",
        }}>🤖</div>
        <div style={{ fontSize: "22px", fontWeight: "bold" }}>المساعد الذكي</div>
        <div style={{ fontSize: "13px", opacity: 0.85, marginTop: "4px" }}>اسألني عن أي درس أو تمرين</div>
      </div>

      <div style={{ flex: 1, padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            display: "flex",
            justifyContent: msg.role === "user" ? "flex-start" : "flex-end",
            gap: "10px", alignItems: "flex-end",
          }}>
            {msg.role === "ai" && (
              <div style={{
                width: "36px", height: "36px", borderRadius: "50%",
                background: "linear-gradient(135deg, #7c3aed, #3b82f6)",
                display: "grid", placeItems: "center", fontSize: "18px", flexShrink: 0,
              }}>🤖</div>
            )}
            <div style={{
              maxWidth: "80%",
              background: msg.role === "user" ? "linear-gradient(135deg, #7c3aed, #3b82f6)" : surface,
              color: msg.role === "user" ? "white" : text,
              padding: "12px 16px",
              borderRadius: msg.role === "user" ? "18px 18px 18px 4px" : "18px 18px 4px 18px",
              fontSize: "15px", lineHeight: "1.7",
              border: msg.role === "ai" ? `1px solid ${border}` : "none",
              whiteSpace: "pre-wrap",
            }}>{msg.text}</div>
            {msg.role === "user" && (
              <div style={{
                width: "36px", height: "36px", borderRadius: "50%",
                background: "#7c3aed",
                display: "grid", placeItems: "center", fontSize: "18px", flexShrink: 0,
              }}>👤</div>
            )}
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <div style={{
              width: "36px", height: "36px", borderRadius: "50%",
              background: "linear-gradient(135deg, #7c3aed, #3b82f6)",
              display: "grid", placeItems: "center", fontSize: "18px",
            }}>🤖</div>
            <div style={{
              background: surface, border: `1px solid ${border}`,
              padding: "14px 18px", borderRadius: "18px",
              color: muted, fontSize: "15px",
            }}>جاري الكتابة...</div>
          </div>
        )}
      </div>

      <div style={{
        padding: "12px 16px 24px",
        background: surface, borderTop: `1px solid ${border}`,
        display: "flex", gap: "10px", alignItems: "center",
      }}>
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="اكتب سؤالك هنا..."
          style={{
            flex: 1, padding: "14px 16px", borderRadius: "25px",
            border: `1px solid ${border}`,
            background: bg, color: text,
            fontSize: "15px", outline: "none", boxSizing: "border-box",
          }}
        />
        <button onClick={sendMessage} disabled={loading} style={{
          width: "50px", height: "50px", borderRadius: "50%",
          background: loading ? muted : "linear-gradient(135deg, #7c3aed, #3b82f6)",
          border: "none", color: "white", fontSize: "22px",
          cursor: loading ? "not-allowed" : "pointer",
          display: "grid", placeItems: "center", flexShrink: 0,
        }}>{loading ? "⏳" : "➤"}</button>
      </div>
    </div>
  );
}
