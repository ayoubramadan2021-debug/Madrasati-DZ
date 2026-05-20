import { useState } from "react";
import { useNavigate } from "react-router-dom";

const C = {
  primary: "#1B3A6B", primaryLight: "#2D5BA3",
  accent: "#E8A020", success: "#2E7D5E",
  surface: "#FFFFFF", surface2: "#F7F9FC",
  text: "#1A2540", textMuted: "#8A97AA",
  border: "#D8E2F0", shadow: "0 2px 12px rgba(27,58,107,0.09)",
};

const GRADES = ["السنة الأولى","السنة الثانية","السنة الثالثة","السنة الرابعة","السنة الخامسة"];
const SUBJECTS = ["رياضيات","اللغة العربية","اللغة الفرنسية","التربية الإسلامية","التربية المدنية","العلوم"];

export default function AiTutorPage() {
  const navigate = useNavigate();
  const [question, setQuestion]       = useState("");
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [loading, setLoading]         = useState(false);
  const [grade, setGrade]             = useState(1);
  const [subject, setSubject]         = useState("رياضيات");
  const [aiExercise, setAiExercise]   = useState<any>(null);
  const [selectedChoice, setSelectedChoice] = useState("");
  const [exerciseResult, setExerciseResult] = useState("");

  const askBackend = async (messages: any[]) => {
    const response = await fetch("https://madrasati-ai-api.onrender.com/api/ai-tutor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ grade, subject, messages }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(JSON.stringify(data));
    return data.choices?.[0]?.message?.content || data.reply || "";
  };

  const askAI = async () => {
    if (!question.trim()) return;
    const userMsg = { role: "user", content: question };
    const newMessages = [...chatMessages, userMsg];
    setChatMessages(newMessages);
    setQuestion("");
    setLoading(true);
    try {
      const reply = await askBackend(newMessages);
      setChatMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch(e) {
      setChatMessages([...newMessages, { role: "assistant", content: "❌ حدث خطأ، تحقق من الاتصال بالإنترنت." }]);
    }
    setLoading(false);
  };

  const generateExercise = async () => {
    setLoading(true);
    setAiExercise(null);
    setSelectedChoice("");
    setExerciseResult("");
    try {
      const prompt = `أنشئ تمريناً تفاعلياً بسيطاً لتلميذ ${GRADES[grade-1]} في مادة ${subject}. أجب بصيغة JSON فقط: {"question":"...","choices":["...","...","...","..."],"answer":"...","explanation":"..."}`;
      const reply = await askBackend([{ role:"user", content: prompt }]);
      const clean = reply.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setAiExercise(parsed);
    } catch(e) {
      setAiExercise({ question:"تعذر توليد التمرين، حاول مجدداً.", choices:[], answer:"", explanation:"" });
    }
    setLoading(false);
  };

  const checkAnswer = () => {
    if (!selectedChoice || !aiExercise) return;
    setExerciseResult(selectedChoice === aiExercise.answer ? "correct" : "wrong");
  };

  return (
    <div style={{ fontFamily:"'Cairo',sans-serif", minHeight:"100vh", background:C.surface2, paddingBottom:100 }}>

      {/* Header */}
      <div style={{ background:`linear-gradient(135deg,${C.primary},${C.primaryLight})`, padding:"20px 16px 24px", borderRadius:"0 0 28px 28px", marginBottom:16 }}>
        <button onClick={() => navigate("/")} style={{ color:"white", background:"rgba(255,255,255,0.15)", border:"none", borderRadius:10, padding:"6px 12px", fontSize:13, fontWeight:600, cursor:"pointer", marginBottom:12, fontFamily:"'Cairo',sans-serif" }}>← رجوع</button>
        <div style={{ textAlign:"center" }}>
          <div style={{ fontSize:48, marginBottom:8 }}>🤖</div>
          <h1 style={{ margin:"0 0 4px", color:"white", fontSize:22, fontWeight:800 }}>المعلّم الذكي</h1>
          <div style={{ color:"rgba(255,255,255,0.75)", fontSize:13 }}>اسألني أي سؤال دراسي</div>
        </div>
      </div>

      <div style={{ padding:"0 16px" }}>

        {/* إعدادات */}
        <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:18, padding:16, marginBottom:14, boxShadow:C.shadow }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            <div>
              <label style={{ fontSize:12, fontWeight:600, color:C.textMuted, display:"block", marginBottom:6 }}>السنة الدراسية</label>
              <select value={grade} onChange={e => setGrade(Number(e.target.value))} style={{ width:"100%", padding:"10px 12px", borderRadius:10, border:`1.5px solid ${C.border}`, fontFamily:"'Cairo',sans-serif", fontSize:13, outline:"none", background:C.surface2, direction:"rtl" }}>
                {GRADES.map((g,i) => <option key={i} value={i+1}>{g}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize:12, fontWeight:600, color:C.textMuted, display:"block", marginBottom:6 }}>المادة</label>
              <select value={subject} onChange={e => setSubject(e.target.value)} style={{ width:"100%", padding:"10px 12px", borderRadius:10, border:`1.5px solid ${C.border}`, fontFamily:"'Cairo',sans-serif", fontSize:13, outline:"none", background:C.surface2, direction:"rtl" }}>
                {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* المحادثة */}
        <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:18, padding:16, marginBottom:14, minHeight:200, maxHeight:350, overflowY:"auto", boxShadow:C.shadow }}>
          {chatMessages.length === 0 && (
            <div style={{ textAlign:"center", color:C.textMuted, padding:40 }}>
              <div style={{ fontSize:32, marginBottom:8 }}>💬</div>
              ابدأ بطرح سؤال، وسيظهر سجل المحادثة هنا.
            </div>
          )}
          {chatMessages.map((msg, i) => (
            <div key={i} style={{ display:"flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start", marginBottom:10 }}>
              <div style={{ maxWidth:"80%", padding:"10px 14px", borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px", background: msg.role === "user" ? C.primary : C.surface2, color: msg.role === "user" ? "white" : C.text, fontSize:14, lineHeight:1.6 }}>
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ display:"flex", justifyContent:"flex-start", marginBottom:10 }}>
              <div style={{ padding:"10px 14px", borderRadius:"18px 18px 18px 4px", background:C.surface2, color:C.textMuted, fontSize:14 }}>⏳ جاري التفكير...</div>
            </div>
          )}
        </div>

        {/* إدخال السؤال */}
        <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:18, padding:14, marginBottom:14, boxShadow:C.shadow }}>
          <textarea
            value={question}
            onChange={e => setQuestion(e.target.value)}
            onKeyDown={e => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), askAI())}
            placeholder="اكتب سؤالك هنا..."
            rows={3}
            style={{ width:"100%", padding:"10px", borderRadius:10, border:`1.5px solid ${C.border}`, fontFamily:"'Cairo',sans-serif", fontSize:14, resize:"none", outline:"none", boxSizing:"border-box" as any, direction:"rtl", marginBottom:10 }}
          />
          <button
            onClick={askAI}
            disabled={!question.trim() || loading}
            style={{ width:"100%", padding:"13px", border:"none", borderRadius:12, background: question.trim() ? C.primary : C.border, color:"white", fontFamily:"'Cairo',sans-serif", fontSize:15, fontWeight:700, cursor: question.trim() ? "pointer" : "default" }}
          >
            إرسال السؤال 📤
          </button>
        </div>

        {/* توليد تمرين */}
        <button
          onClick={generateExercise}
          disabled={loading}
          style={{ width:"100%", padding:"14px", border:"none", borderRadius:16, background:`linear-gradient(135deg,${C.success},#3da37a)`, color:"white", fontFamily:"'Cairo',sans-serif", fontSize:15, fontWeight:700, cursor:"pointer", marginBottom:14, boxShadow:`0 4px 14px ${C.success}44` }}
        >
          🎲 ولّد تمريناً تفاعلياً
        </button>

        {/* التمرين */}
        {aiExercise && (
          <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:18, padding:20, boxShadow:C.shadow }}>
            <div style={{ fontWeight:700, color:C.text, fontSize:16, marginBottom:16 }}>🧩 {aiExercise.question}</div>
            <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:14 }}>
              {(aiExercise.choices || []).map((choice: string) => {
                const isSelected = selectedChoice === choice;
                const answered = exerciseResult !== "";
                const isCorrect = choice === aiExercise.answer;
                let bg = C.surface2, border = C.border, color = C.text;
                if (answered && isCorrect) { bg="#E8F5EF"; border=C.success; color=C.success; }
                else if (answered && isSelected && !isCorrect) { bg="#FDECEA"; border="#C0392B"; color="#C0392B"; }
                else if (isSelected) { bg="#EBF1FA"; border=C.primary; color=C.primary; }
                return (
                  <div key={choice} onClick={() => !answered && setSelectedChoice(choice)} style={{ padding:"12px 16px", borderRadius:12, border:`1.5px solid ${border}`, background:bg, color, fontWeight:isSelected||answered?700:400, cursor:answered?"default":"pointer", fontSize:14 }}>
                    {answered && isCorrect ? "✅ " : answered && isSelected && !isCorrect ? "❌ " : ""}{choice}
                  </div>
                );
              })}
            </div>
            {selectedChoice && exerciseResult === "" && (
              <button onClick={checkAnswer} style={{ width:"100%", padding:"12px", border:"none", borderRadius:12, background:C.primary, color:"white", fontFamily:"'Cairo',sans-serif", fontSize:14, fontWeight:700, cursor:"pointer" }}>
                تصحيح ✓
              </button>
            )}
            {exerciseResult && (
              <div style={{ padding:"12px 16px", borderRadius:12, background: exerciseResult==="correct" ? "#E8F5EF" : "#FDECEA", color: exerciseResult==="correct" ? C.success : "#C0392B", fontWeight:700, fontSize:14, textAlign:"center" }}>
                {exerciseResult === "correct" ? "✅ إجابة صحيحة!" : `❌ الإجابة الصحيحة: ${aiExercise.answer}`}
                {aiExercise.explanation && <div style={{ fontSize:12, marginTop:6, opacity:0.8, fontWeight:400 }}>{aiExercise.explanation}</div>}
              </div>
            )}
          </div>
        )}

        {/* مسح المحادثة */}
        {chatMessages.length > 0 && (
          <button
            onClick={() => { setChatMessages([]); setAiExercise(null); }}
            style={{ width:"100%", padding:"13px", border:`1.5px solid ${C.border}`, borderRadius:16, background:"transparent", color:C.textMuted, fontFamily:"'Cairo',sans-serif", fontSize:14, cursor:"pointer", marginTop:14 }}
          >
            🗑️ مسح المحادثة
          </button>
        )}

      </div>
    </div>
  );
}
