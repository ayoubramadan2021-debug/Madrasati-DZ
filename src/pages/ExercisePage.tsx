import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import appData from "../data/appData";

const C = {
  primary: "#1B3A6B", primaryLight: "#2D5BA3",
  accent: "#E8A020", success: "#2E7D5E",
  error: "#C0392B", surface: "#FFFFFF",
  surface2: "#F7F9FC", text: "#1A2540",
  textMuted: "#8A97AA", border: "#D8E2F0",
  shadow: "0 2px 12px rgba(27,58,107,0.09)",
};

const SUBJECT_COLORS: Record<string, string> = {
  math: "#2E7D5E", arabic: "#C0392B", french: "#1565C0",
  islamic: "#6A1B9A", civic: "#E65100", science: "#00838F",
};

export default function ExercisePage() {
  const { gradeId, subject, exerciseId } = useParams();
  const navigate = useNavigate();
  const subjectColor = SUBJECT_COLORS[subject || ""] || C.primary;

  const currentSubject = (appData.subjects || []).find((s: any) => s.slug === subject);
  const exercise = (currentSubject?.exercises || []).find((e: any) => String(e.id) === String(exerciseId));
  const questions = exercise?.questions || [];

  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [results, setResults] = useState<Record<number, boolean>>({});
  const [score, setScore] = useState<number | null>(null);

  function checkAnswer(idx: number, q: any) {
    const correct = answers[idx] === q.correctAnswer;
    setResults(prev => ({ ...prev, [idx]: correct }));
  }

  function handleFinish() {
    const correct = Object.values(results).filter(Boolean).length;
    setScore(Math.round((correct / questions.length) * 100));
  }

  const allAnswered = questions.length > 0 && questions.every((_: any, i: number) => answers[i]);

  return (
    <div style={{ fontFamily:"'Cairo',sans-serif", minHeight:"100vh", background:C.surface2, paddingBottom:32 }}>

      {/* Header */}
      <div style={{ background:`linear-gradient(135deg,${subjectColor},${subjectColor}bb)`, padding:"20px 16px 24px", borderRadius:"0 0 28px 28px", marginBottom:16 }}>
        <button
          onClick={() => navigate(`/grade/${gradeId}/subject/${subject}/section/exercises`)}
          style={{ color:"white", background:"rgba(255,255,255,0.15)", border:"none", borderRadius:10, padding:"6px 12px", fontSize:13, fontWeight:600, cursor:"pointer", marginBottom:12, fontFamily:"'Cairo',sans-serif" }}
        >
          ← رجوع
        </button>
        <div style={{ textAlign:"center" }}>
          <div style={{ fontSize:40, marginBottom:6 }}>✏️</div>
          <h1 style={{ margin:"0 0 4px", color:"white", fontSize:22, fontWeight:800 }}>
            {exercise?.title || "التمرين"}
          </h1>
          <div style={{ color:"rgba(255,255,255,0.75)", fontSize:13 }}>{questions.length} سؤال</div>
        </div>
      </div>

      <div style={{ padding:"0 16px" }}>

        {/* النتيجة */}
        {score !== null && (
          <div style={{ background: score >= 60 ? C.success : C.error, borderRadius:18, padding:24, textAlign:"center", color:"white", marginBottom:16, boxShadow:`0 4px 20px ${score >= 60 ? C.success : C.error}44` }}>
            <div style={{ fontSize:48 }}>{score >= 60 ? "🏆" : "💪"}</div>
            <div style={{ fontSize:32, fontWeight:900, marginTop:8 }}>{score}%</div>
            <div style={{ fontSize:16, marginTop:4, opacity:0.9 }}>{score >= 60 ? "أحسنت! نتيجة ممتازة" : "حاول مرة أخرى"}</div>
            <button
              onClick={() => { setAnswers({}); setResults({}); setScore(null); }}
              style={{ marginTop:14, padding:"10px 24px", border:"none", borderRadius:12, background:"rgba(255,255,255,0.2)", color:"white", fontFamily:"'Cairo',sans-serif", fontSize:14, fontWeight:700, cursor:"pointer" }}
            >
              🔄 إعادة المحاولة
            </button>
          </div>
        )}

        {/* الأسئلة */}
        {questions.map((q: any, idx: number) => (
          <div key={idx} style={{ background:C.surface, border:`1.5px solid ${results[idx] !== undefined ? (results[idx] ? C.success : C.error) : C.border}`, borderRadius:18, padding:20, marginBottom:14, boxShadow:C.shadow }}>
            <div style={{ display:"flex", alignItems:"flex-start", gap:10, marginBottom:14 }}>
              <div style={{ width:32, height:32, borderRadius:"50%", background:C.primary, color:"white", display:"grid", placeItems:"center", fontWeight:700, flexShrink:0, fontSize:14 }}>{idx+1}</div>
              <div style={{ fontWeight:700, color:C.text, fontSize:15, paddingTop:4 }}>{q.question}</div>
            </div>

            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {(q.options || []).map((opt: string) => {
                const selected = answers[idx] === opt;
                const answered = results[idx] !== undefined;
                const isCorrect = opt === q.correctAnswer;
                let bg = C.surface2, border = C.border, color = C.text;
                if (answered && isCorrect) { bg = "#E8F5EF"; border = C.success; color = C.success; }
                else if (answered && selected && !isCorrect) { bg = "#FDECEA"; border = C.error; color = C.error; }
                else if (selected) { bg = "#EBF1FA"; border = C.primary; color = C.primary; }

                return (
                  <div
                    key={opt}
                    onClick={() => !answered && setAnswers(prev => ({ ...prev, [idx]: opt }))}
                    style={{ padding:"12px 16px", borderRadius:12, border:`1.5px solid ${border}`, background:bg, color, fontWeight: selected || answered ? 700 : 400, cursor: answered ? "default" : "pointer", fontSize:14 }}
                  >
                    {answered && isCorrect ? "✅ " : answered && selected && !isCorrect ? "❌ " : ""}{opt}
                  </div>
                );
              })}
            </div>

            {answers[idx] && results[idx] === undefined && (
              <button
                onClick={() => checkAnswer(idx, q)}
                style={{ marginTop:12, width:"100%", padding:"11px", border:"none", borderRadius:12, background:C.primary, color:"white", fontFamily:"'Cairo',sans-serif", fontSize:14, fontWeight:700, cursor:"pointer" }}
              >
                تصحيح ✓
              </button>
            )}

            {results[idx] !== undefined && (
              <div style={{ marginTop:10, padding:"10px 14px", borderRadius:12, background: results[idx] ? "#E8F5EF" : "#FDECEA", color: results[idx] ? C.success : C.error, fontWeight:700, fontSize:14, textAlign:"center" }}>
                {results[idx] ? "✅ إجابة صحيحة!" : `❌ الإجابة الصحيحة: ${q.correctAnswer}`}
              </div>
            )}
          </div>
        ))}

        {allAnswered && score === null && (
          <button
            onClick={handleFinish}
            style={{ width:"100%", padding:"14px", border:"none", borderRadius:16, background:`linear-gradient(135deg,${C.accent},#F5B942)`, color:"white", fontFamily:"'Cairo',sans-serif", fontSize:16, fontWeight:700, cursor:"pointer", boxShadow:`0 4px 14px ${C.accent}44` }}
          >
            🏆 عرض النتيجة النهائية
          </button>
        )}
      </div>
    </div>
  );
}
