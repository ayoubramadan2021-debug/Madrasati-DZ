export type ProgressDifficulty = "basic" | "application" | "transfer";

export type ProgressSkillId =
  | "numbers-quantity"
  | "comparison-order"
  | "spatial"
  | "senses"
  | "movement-health"
  | "numbers-0-10"
  | "ordinal-spatial"
  | "food-sequence"
  | "length-measurement"
  | "paths-spatial"
  | "add-subtract"
  | "health-food-mastery"
  | "number-compose";

export interface ProgressSkillDefinition {
  id: ProgressSkillId;
  label: string;
}

interface ProgressActivityBase {
  id: string;
  lessonRefs: number[];
  skillId: ProgressSkillId;
  difficulty: ProgressDifficulty;
  prompt: string;
  audioKey: string;
  visual?: string;
}

export interface ChoiceOption {
  id: string;
  label: string;
  visual?: string;
}

export interface ChoiceActivity extends ProgressActivityBase {
  type: "choice";
  options: ChoiceOption[];
  correctOptionId: string;
}

export interface TapCountActivity extends ProgressActivityBase {
  type: "tap-count";
  items: string[];
  correctCount: number;
}

export interface OrderActivity extends ProgressActivityBase {
  type: "order";
  tokens: string[];
  correctOrder: string[];
}

export type ProgressActivity =
  | ChoiceActivity
  | TapCountActivity
  | OrderActivity;

export interface ProgressTestDefinition {
  id: string;
  title: string;
  subtitle: string;
  coveredLessons: number[];
  passingScore: number;
  skills: ProgressSkillDefinition[];
  activities: ProgressActivity[];
}

export interface ProgressTestResult {
  testId: string;
  score: number;
  correct: number;
  total: number;
  passed: boolean;
  stars: 0 | 1 | 2 | 3;
  skillScores: Record<ProgressSkillId, number>;
}

export type ProgressAnswer = string | number[] | string[];
