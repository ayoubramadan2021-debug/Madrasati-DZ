export type LessonProgressItem = {
  completed: boolean;
  stars: number;
  completedAt: string;
};

export type LessonProgressMap = Record<string, LessonProgressItem>;

const STORAGE_KEY = "madrasati_lesson_progress_v2";

function safeRead(): LessonProgressMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function safeWrite(progress: LessonProgressMap) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // ignore storage errors
  }
}

export function getLessonProgress(): LessonProgressMap {
  return safeRead();
}

export function getSingleLessonProgress(lessonKey: string): LessonProgressItem | null {
  const progress = safeRead();
  return progress[lessonKey] || null;
}

export function markLessonCompleted(lessonKey: string, stars = 3) {
  const progress = safeRead();

  progress[lessonKey] = {
    completed: true,
    stars: Math.max(1, Math.min(3, stars)),
    completedAt: new Date().toISOString(),
  };

  safeWrite(progress);
}

export function isLessonCompleted(lessonKey: string): boolean {
  return !!safeRead()[lessonKey]?.completed;
}

export function resetLessonProgress() {
  safeWrite({});
}
