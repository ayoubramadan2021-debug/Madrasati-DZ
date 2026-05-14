import { useState } from "react";

export default function AiTutorPage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setAnswer("");

    try {
      const response = await fetch("https://madrasati-ai-api.onrender.com/api/ai-tutor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: question
            }
          ]
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setAnswer("❌ خطأ: " + JSON.stringify(data));
        return;
      }

      setAnswer(data.choices?.[0]?.message?.content || data.reply || "لم يصل رد من الذكاء الاصطناعي");
    } catch (error) {
      setAnswer("❌ خطأ في الاتصال: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", color: "white", minHeight: "100vh", background: "#0f172a" }}>
      <h1>🤖 المعلّم الذكي</h1>

      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="اكتب سؤالك هنا..."
        style={{
          width: "100%",
          minHeight: "120px",
          borderRadius: "15px",
          padding: "15px",
          fontSize: "16px",
          background: "#13203a",
          color: "white",
          border: "1px solid #334155"
        }}
      />

      <button
        onClick={askAI}
        disabled={loading}
        style={{
          marginTop: "15px",
          width: "100%",
          padding: "14px",
          borderRadius: "14px",
          border: "none",
          background: loading ? "#64748b" : "#2563eb",
          color: "white",
          fontSize: "18px",
          fontWeight: "bold"
        }}
      >
        {loading ? "جاري التفكير..." : "اسأل الذكاء الاصطناعي"}
      </button>

      <div
        style={{
          marginTop: "25px",
          background: "#13203a",
          padding: "20px",
          borderRadius: "15px",
          whiteSpace: "pre-wrap",
          lineHeight: "1.8"
        }}
      >
        {answer}
      </div>
    </div>
  );
}
