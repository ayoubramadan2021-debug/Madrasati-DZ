export type Grade = 1 | 2 | 3 | 4 | 5;

export interface AskParams {
  question: string;
  grade: Grade;
  subject?: string;
  mode?: "explain" | "answer" | "exercise";
}

const AI_ENDPOINT = "/api/ai";

export async function askTeacher(params: AskParams): Promise<string> {
  const res = await fetch(AI_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "تعذّر الحصول على إجابة");
  }
  return data.answer as string;
}
