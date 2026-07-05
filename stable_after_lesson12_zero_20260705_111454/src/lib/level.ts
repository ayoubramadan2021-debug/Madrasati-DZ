// نظام المستويات: كل 100 XP = مستوى
// المستوى 1: 0-99، المستوى 2: 100-199، ...

const XP_PER_LEVEL = 100;

export function getLevel(xp: number) {
  const safeXp = Math.max(0, xp || 0);
  const level = Math.floor(safeXp / XP_PER_LEVEL) + 1;
  const current = safeXp % XP_PER_LEVEL;       // التقدّم داخل المستوى الحالي
  const needed = XP_PER_LEVEL;                  // المطلوب لإكمال المستوى
  const percent = Math.round((current / needed) * 100);
  return { level, current, needed, percent };
}
