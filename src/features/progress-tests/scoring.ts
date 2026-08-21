import type {
  ProgressActivity,
  ProgressAnswer,
  ProgressSkillId,
  ProgressTestDefinition,
  ProgressTestResult,
} from "./types";

function isCorrect(activity: ProgressActivity, answer: ProgressAnswer | undefined): boolean {
  if (answer === undefined) return false;
  if (activity.type === "choice") return answer === activity.correctOptionId;
  if (activity.type === "tap-count") {
    return Array.isArray(answer) && answer.length === activity.correctCount;
  }
  if (activity.type === "order") {
    return (
      Array.isArray(answer) &&
      answer.length === activity.correctOrder.length &&
      answer.every((value, index) => value === activity.correctOrder[index])
    );
  }
  return false;
}

export function scoreProgressTest(
  test: ProgressTestDefinition,
  answers: Record<string, ProgressAnswer>,
): ProgressTestResult {
  const totals = new Map<ProgressSkillId, number>();
  const corrects = new Map<ProgressSkillId, number>();
  let correct = 0;

  for (const activity of test.activities) {
    totals.set(activity.skillId, (totals.get(activity.skillId) ?? 0) + 1);
    if (isCorrect(activity, answers[activity.id])) {
      correct += 1;
      corrects.set(activity.skillId, (corrects.get(activity.skillId) ?? 0) + 1);
    }
  }

  const total = test.activities.length;
  const score = total === 0 ? 0 : Math.round((correct / total) * 100);
  const skillScores = Object.fromEntries(
    test.skills.map((skill) => {
      const n = totals.get(skill.id) ?? 0;
      const c = corrects.get(skill.id) ?? 0;
      return [skill.id, n === 0 ? 0 : Math.round((c / n) * 100)];
    }),
  ) as Record<ProgressSkillId, number>;

  const stars: 0 | 1 | 2 | 3 = score >= 90 ? 3 : score >= 70 ? 2 : score >= 50 ? 1 : 0;

  return {
    testId: test.id,
    score,
    correct,
    total,
    passed: score >= test.passingScore,
    stars,
    skillScores,
  };
}
