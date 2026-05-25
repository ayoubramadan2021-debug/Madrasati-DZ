import type { Handler, HandlerEvent } from "@netlify/functions";

const MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash-lite";
const API_BASE = "https://generativelanguage.googleapis.com/v1beta/models";

type Grade = 1 | 2 | 3 | 4 | 5;

interface AiRequest {
  question: string;
  grade: Grade;
  subject?: string;
  mode?: "explain" | "answer" | "exercise";
}

const GRADE_PROFILES: Record<Grade, string> = {
  1: "السنة الأولى ابتدائي (6-7 سنوات). الطفل بدأ للتو تعلّم القراءة. استعمل جملاً قصيرة جداً، كلمات بسيطة مألوفة، وأمثلة من حياته اليومية (ألعاب، حيوانات، فواكه). تجنّب أي مصطلح مجرّد.",
  2: "السنة الثانية ابتدائي (7-8 سنوات). الطفل يقرأ جملاً بسيطة. استعمل جملاً قصيرة، وأمثلة ملموسة، وكرّر الفكرة بطريقتين إن لزم.",
  3: "السنة الثالثة ابتدائي (8-9 سنوات). الطفل يفهم تفسيرات أطول قليلاً. يمكنك إدخال مصطلحات بسيطة مع شرحها فوراً بمثال.",
  4: "السنة الرابعة ابتدائي (9-10 سنوات). الطفل يستوعب الخطوات المتسلسلة. اشرح بترتيب منطقي، واربط بالمعرفة السابقة.",
  5: "السنة الخامسة ابتدائي (10-11 سنة). الطفل يستعدّ للمتوسط. يمكنك استعمال مصطلحات دقيقة وتفسيرات أعمق قليلاً، مع الحفاظ على الوضوح.",
};

function buildSystemPrompt(req: AiRequest): string {
  const profile = GRADE_PROFILES[req.grade];
  const subjectLine = req.subject ? `المادة: ${req.subject}.` : "";
  const modeLine =
    req.mode === "exercise"
      ? "اطلب منك توليد تمرين أو سؤال للطفل ليحلّه، بمستواه تماماً."
      : req.mode === "explain"
      ? "اطلب منك شرح فكرة أو درس بأبسط طريقة."
      : "اطلب منك الإجابة على سؤال الطفل.";
  return `أنت "المعلّم" — مساعد تعليمي ذكي لأطفال المدرسة الابتدائية في الجزائر.

المستوى: ${profile}
${subjectLine}
${modeLine}

قواعد صارمة لإجابتك:
- اكتب بالعربية الفصحى المبسّطة حصراً، الصحيحة لغوياً ونحوياً.
- ممنوع منعاً باتاً استعمال أي حرف أو كلمة من أي لغة أخرى (صينية، إنجليزية، فرنسية، روسية، أو أي لغة). كل حرف في إجابتك يجب أن يكون عربياً. الأرقام تُكتب بالعربية (واحد، اثنان) أو بالأرقام العادية (1، 2) فقط.
- الإجابة قصيرة جداً وهادفة: من جملة إلى أربع جمل كحدّ أقصى. لا مقدمات ولا حشو.
- ادخل في صلب الإجابة مباشرة. لا تبدأ بعبارات مثل "بالطبع" أو "سؤال رائع".
- استعمل مثالاً واحداً ملموساً من عالم الطفل عند الحاجة.
- شجّع الطفل بكلمة لطيفة قصيرة في النهاية فقط إن كان السياق مناسباً.
- لا تخرج عن الموضوع التعليمي إطلاقاً. إن سُئلت عن شيء غير مناسب لطفل، اعتذر بلطف ووجّه لسؤال يخصّ الدراسة.
- لا تطلب من الطفل معلومات شخصية ولا توجّهه خارج التطبيق.`;
}

const handler: Handler = async (event: HandlerEvent) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "الطريقة غير مدعومة" }) };
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: "المفتاح غير مُعدّ على الخادم" }) };
  }

  let req: AiRequest;
  try {
    req = JSON.parse(event.body || "{}");
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "صيغة الطلب غير صحيحة" }) };
  }

  if (!req.question || typeof req.question !== "string") {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "السؤال مفقود" }) };
  }
  if (req.question.length > 1000) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "السؤال طويل جداً" }) };
  }
  if (![1, 2, 3, 4, 5].includes(req.grade)) {
    req.grade = 3;
  }

  const url = `${API_BASE}/${MODEL}:generateContent`;
  const payload = {
    system_instruction: { parts: [{ text: buildSystemPrompt(req) }] },
    contents: [{ role: "user", parts: [{ text: req.question }] }],
    generationConfig: {
      thinkingConfig: { thinkingBudget: 0 },
      maxOutputTokens: 300,
      temperature: 0.4,
      topP: 0.9,
    },
    safetySettings: [
      { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_LOW_AND_ABOVE" },
      { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_LOW_AND_ABOVE" },
      { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_LOW_AND_ABOVE" },
      { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_LOW_AND_ABOVE" },
    ],
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
      body: JSON.stringify(payload),
    });

    if (res.status === 429) {
      return { statusCode: 429, headers, body: JSON.stringify({ error: "rate_limit", message: "المعلّم مشغول قليلاً الآن، حاول بعد دقيقة من فضلك." }) };
    }
    if (!res.ok) {
      const detail = await res.text();
      console.error("Gemini error:", res.status, detail);
      return { statusCode: 502, headers, body: JSON.stringify({ error: "ai_error", message: "تعذّر الوصول للمعلّم الآن. حاول مرة أخرى." }) };
    }

    const data = await res.json();
    const blocked = data?.promptFeedback?.blockReason;
    if (blocked) {
      return { statusCode: 200, headers, body: JSON.stringify({ answer: "لنبقَ في موضوع الدرس. اسألني سؤالاً عن دروسك وسأساعدك بكل سرور." }) };
    }

    let answer =
      data?.candidates?.[0]?.content?.parts
        ?.map((p: { text?: string }) => p.text || "")
        .join("")
        .trim() || "لم أفهم السؤال جيداً، هل يمكنك إعادة صياغته؟";

    // طبقة حماية إضافية: إزالة أي حروف صينية/يابانية/كورية تسرّبت
    answer = answer.replace(/[\u3000-\u9fff\uac00-\ud7af]/g, "").replace(/\s{2,}/g, " ").trim();

    return { statusCode: 200, headers, body: JSON.stringify({ answer }) };
  } catch (err) {
    console.error("Function error:", err);
    return { statusCode: 500, headers, body: JSON.stringify({ error: "server_error", message: "حدث خطأ غير متوقّع. حاول مجدداً." }) };
  }
};

export { handler };
