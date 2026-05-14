import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function AiTutorPage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setAnswer("");

    try {
      const { data, error } = await supabase.functions.invoke(
        "hyper-processor",
        {
          body: { message: question },
        }
      );

      if (error) {
        setAnswer("❌ Error: " + error.message);
      } else {
        setAnswer(data.reply || "No response");
      }
    } catch (err) {
      setAnswer("❌ " + err.message);
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#081229",
        padding: "20px",
        color: "white",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        🤖 AI Tutor
      </h1>

      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask anything..."
        style={{
          width: "100%",
          minHeight: "120px",
          borderRadius: "15px",
          padding: "15px",
          fontSize: "16px",
          background: "#13203a",
          color: "white",
          border: "none",
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
          background: "#2563eb",
          color: "white",
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        {loading ? "Thinking..." : "Ask AI"}
      </button>

      <div
        style={{
          marginTop: "25px",
          background: "#13203a",
          padding: "20px",
          borderRadius: "15px",
          whiteSpace: "pre-wrap",
        }}
      >
        {answer}
      </div>
    </div>
  );
}
