import { useState } from "react";

export default function AiTutorPage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [grade, setGrade] = useState(1);
  const [subject, setSubject] = useState("رياضيات");
  const [aiExercise, setAiExercise] = useState(null);
  const [selectedChoice, setSelectedChoice] = useState("");
  const [exerciseResult, setExerciseResult] = useState("");

  const askBackend = async (finalQuestion) => {
    const response = await fetch("https://madrasati-ai-api.onrender.com/api/ai-tutor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        grade,
        subject,
        messages: [
          {
            role: "user",
            content: finalQuestion
          }
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(JSON.stringify(data));
    }

    return data.choices?.[0]?.message?.content || data.reply || "";
  };

  const sendToAI = async (finalQuestion) => {
    setLoading(true);
    setAnswer("");
    setAiExercise(null);
    setExerciseResult("");

    try {
      const text = await askBackend(finalQuestion);
      setAnswer(text || "لم يصل رد من الذكاء الاصطناعي");
    } catch (error) {
      setAnswer("❌ خطأ في الاتصال: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const askAI = async () => {
    if (!question.trim()) return;
    await sendToAI(question);
  };

  const generateExercise = async () => {
    const prompt = `
ولّد تمرينًا نصيًا فقط مناسبًا لتلميذ في السنة ${grade} ابتدائي في مادة ${subject}.

ممنوع استعمال الصور أو الرسومات أو عبارات مثل:
- انظر إلى الصورة
- في هذه الصورة
- الشكل التالي
- الرسم

أرجع JSON فقط بدون أي شرح خارجه وبدون markdown.
استعمل هذا الشكل بالضبط:

{
  "question": "سؤال نصي واضح",
  "choices": ["اختيار 1", "اختيار 2", "اختيار 3"],
  "correctAnswer": "نفس نص الاختيار الصحيح",
  "explanation": "شرح بسيط خطوة بخطوة"
}
`;

    setLoading(true);
    setAnswer("");
    setAiExercise(null);
    setSelectedChoice("");
    setExerciseResult("");

    try {
      const text = await askBackend(prompt);
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);

      if (!parsed.question || !parsed.choices || !parsed.correctAnswer) {
        throw new Error("صيغة التمرين غير مكتملة");
      }

      setAiExercise(parsed);
    } catch (error) {
      setAnswer("❌ تعذر إنشاء تمرين تفاعلي. جرّب مرة أخرى.\n\n" + error.message);
    } finally {
      setLoading(false);
    }
  };

  const normalizeAnswer = (value) => {
    return String(value || "")
      .replace(/[أإآ]/g, "ا")
      .replace(/[()]/g, "")
      .replace(/[أبجabcABC][\)\-\.]/g, "")
      .trim();
  };

  const checkExerciseAnswer = () => {
    if (!aiExercise) return;

    if (!selectedChoice) {
      setExerciseResult("⚠️ اختر إجابة أولًا.");
      return;
    }

    const selected = normalizeAnswer(selectedChoice);
    const correct = normalizeAnswer(aiExercise.correctAnswer);

    if (selected === correct || selectedChoice.includes(aiExercise.correctAnswer) || aiExercise.correctAnswer.includes(selectedChoice)) {
      setExerciseResult("✅ إجابة صحيحة! أحسنت.");
    } else {
      setExerciseResult(`❌ إجابة غير صحيحة. الجواب الصحيح هو: ${aiExercise.correctAnswer}`);
    }
  };

  return (
    <div style={{ padding: "20px", color: "white", minHeight: "100vh", background: "#0f172a" }}>
      <h1>🤖 المعلّم الذكي</h1>

      <label>السنة الدراسية</label>
      <select value={grade} onChange={(e) => setGrade(Number(e.target.value))} style={selectStyle}>
        <option value={1}>السنة الأولى</option>
        <option value={2}>السنة الثانية</option>
        <option value={3}>السنة الثالثة</option>
        <option value={4}>السنة الرابعة</option>
        <option value={5}>السنة الخامسة</option>
      </select>

      <label>المادة</label>
      <select value={subject} onChange={(e) => setSubject(e.target.value)} style={selectStyle}>
        <option value="رياضيات">رياضيات</option>
        <option value="لغة عربية">لغة عربية</option>
        <option value="تربية إسلامية">تربية إسلامية</option>
        <option value="تربية علمية">تربية علمية</option>
        <option value="تاريخ وجغرافيا">تاريخ وجغرافيا</option>
        <option value="فرنسية">فرنسية</option>
        <option value="عام">عام</option>
      </select>

      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="اكتب سؤالك هنا..."
        style={textareaStyle}
      />

      <button onClick={askAI} disabled={loading} style={mainButtonStyle(loading)}>
        {loading ? "جاري التفكير..." : "اسأل الذكاء الاصطناعي"}
      </button>

      <button onClick={generateExercise} disabled={loading} style={exerciseButtonStyle(loading)}>
        🎲 ولّد تمرينًا تفاعليًا
      </button>

      {aiExercise ? (
        <div style={exerciseCardStyle}>
          <h2>📘 تمرين تفاعلي</h2>
          <p style={{ fontSize: "20px", lineHeight: "1.8" }}>{aiExercise.question}</p>

          {aiExercise.choices.map((choice, index) => (
            <button
              key={index}
              onClick={() => setSelectedChoice(choice)}
              style={{
                ...choiceButtonStyle,
                background: selectedChoice === choice ? "#2563eb" : "#13203a"
              }}
            >
              {choice}
            </button>
          ))}

          <button onClick={checkExerciseAnswer} style={mainButtonStyle(false)}>
            تحقق من الإجابة
          </button>

          {exerciseResult && (
            <div style={answerStyle}>
              {exerciseResult}

              <hr style={{ borderColor: "#334155", margin: "15px 0" }} />

              🧠 الشرح:
              {"\n"}
              {aiExercise.explanation}
            </div>
          )}
        </div>
      ) : (
        <div style={answerStyle}>
          {answer || "سيظهر جواب المعلّم الذكي هنا..."}
        </div>
      )}
    </div>
  );
}

const selectStyle = {
  width: "100%",
  padding: "13px",
  margin: "8px 0 15px",
  borderRadius: "12px",
  background: "#13203a",
  color: "white",
  border: "1px solid #334155",
  fontSize: "16px"
};

const textareaStyle = {
  width: "100%",
  minHeight: "120px",
  borderRadius: "15px",
  padding: "15px",
  fontSize: "16px",
  background: "#13203a",
  color: "white",
  border: "1px solid #334155",
  marginTop: "10px"
};

const mainButtonStyle = (loading) => ({
  marginTop: "15px",
  width: "100%",
  padding: "14px",
  borderRadius: "14px",
  border: "none",
  background: loading ? "#64748b" : "#2563eb",
  color: "white",
  fontSize: "18px",
  fontWeight: "bold"
});

const exerciseButtonStyle = (loading) => ({
  marginTop: "12px",
  width: "100%",
  padding: "14px",
  borderRadius: "14px",
  border: "none",
  background: loading ? "#64748b" : "#16a34a",
  color: "white",
  fontSize: "18px",
  fontWeight: "bold"
});

const answerStyle = {
  marginTop: "25px",
  background: "#13203a",
  padding: "20px",
  borderRadius: "15px",
  whiteSpace: "pre-wrap",
  lineHeight: "1.8"
};

const exerciseCardStyle = {
  marginTop: "25px",
  background: "#13203a",
  padding: "20px",
  borderRadius: "15px",
  lineHeight: "1.8"
};

const choiceButtonStyle = {
  width: "100%",
  padding: "13px",
  marginTop: "10px",
  borderRadius: "12px",
  border: "1px solid #334155",
  color: "white",
  fontSize: "16px",
  textAlign: "right"
};
