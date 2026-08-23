import type {
  UnifiedLessonExerciseQuestionV2,
} from "../exercises-v2/UnifiedLessonExercisesV2";

import { lesson51Exercise1 } from "./lesson51_exercise1";
import { lesson51Exercise2 } from "./lesson51_exercise2";
import { lesson51Exercise3 } from "./lesson51_exercise3";
import { lesson51Exercise4 } from "./lesson51_exercise4";

export type Lesson51UnifiedQuestion =
  UnifiedLessonExerciseQuestionV2 & {
    leftValue?: number;
    rightValue?: number;
    focusEmoji?: string;
    focusLabel?: string;
  };

type AnyItem = Record<string, any>;

function normalizeChoice(
  value: any,
  index: number,
) {
  if (
    value &&
    typeof value === "object"
  ) {
    const id = String(
      value.id ??
      value.value ??
      value.answer ??
      index,
    );

    const content = String(
      value.content ??
      value.label ??
      value.text ??
      value.value ??
      id,
    );

    return {
      id,
      content,
      ariaLabel: String(
        value.ariaLabel ??
        value.aria_label ??
        content,
      ),
    };
  }

  const content = String(value);

  return {
    id: content,
    content,
    ariaLabel: content,
  };
}

function parseAdditionPair(
  item: AnyItem,
): [number, number] | null {
  const haystack = [
    item.question_audio_key,
    item.audioKey,
    item.question,
    item.prompt,
  ]
    .filter(Boolean)
    .join(" ");

  const keyMatch = haystack.match(
    /add_(\d+)_(\d+)/,
  );

  if (keyMatch) {
    return [
      Number(keyMatch[1]),
      Number(keyMatch[2]),
    ];
  }

  const numbers = Array.from(
    haystack.matchAll(/\d+/g),
  ).map((match) => Number(match[0]));

  if (numbers.length >= 2) {
    return [numbers[0], numbers[1]];
  }

  return null;
}

function standardQuestions(
  items: readonly AnyItem[],
  mission: number,
): Lesson51UnifiedQuestion[] {
  return items.map((item) => ({
    id: `l51_m${mission}_${item.id}`,
    mission,
    prompt: String(
      item.question ?? item.prompt ?? "",
    ),
    audioKey: String(
      item.question_audio_key ??
      item.audioKey ??
      "",
    ),
    choices: Array.from(
      item.options ??
      item.choices ??
      [],
    ).map(normalizeChoice),
    answer: String(
      item.correctId ??
      item.answer ??
      item.correctAnswer ??
      "",
    ),
    variant: "text",
    columns: 2,
    backgroundImage:
      item.backgroundImage,
    focusEmoji:
      item.focusEmoji,
    focusLabel:
      item.focusLabel,
    activityLabel:
      [
        item.focusEmoji,
        item.focusLabel,
      ]
        .filter(Boolean)
        .join(" "),
  }));
}

function visualAdditionQuestions(
  items: readonly AnyItem[],
): Lesson51UnifiedQuestion[] {
  return items.map((item) => {
    const pair = parseAdditionPair(
      item,
    );

    if (!pair) {
      throw new Error(
        `Lesson51 visual addition pair missing: ${item.id}`,
      );
    }

    const [leftValue, rightValue] =
      pair;

    const sum =
      leftValue + rightValue;

    const rawChoices =
      item.options ??
      item.choices ??
      item.answers ??
      item.answerOptions ??
      item.answer_options ??
      [];

    let choices =
      Array.from(rawChoices)
        .map(normalizeChoice);

    if (choices.length === 0) {
      const fallbackValues =
        Array.from(
          new Set([
            Math.max(0, sum - 2),
            Math.max(0, sum - 1),
            sum,
            sum + 1,
          ]),
        );

      choices =
        fallbackValues.map(
          normalizeChoice,
        );
    }

    const rawAnswer =
      item.correctId ??
      item.answer ??
      item.correctAnswer ??
      item.correct_answer ??
      item.result ??
      item.sum ??
      sum;

    const answer =
      typeof rawAnswer === "object"
        ? String(
            rawAnswer.id ??
            rawAnswer.value ??
            sum,
          )
        : String(rawAnswer);

    return {
      id: `l51_m2_${item.id}`,
      mission: 2,
      prompt: String(
        item.question ??
        item.prompt ??
        "",
      ),
      audioKey: String(
        item.question_audio_key ??
        item.audioKey ??
        "",
      ),
      choices,
      answer,
      variant: "number",
      columns: 2,
      backgroundImage:
        item.backgroundImage,
      leftValue,
      rightValue,
    };
  });
}

export const LESSON_51_UNIFIED_AUDIO_BASE =
  "/audio/teachers/taline/lesson_51_bilan_1/exercises";

export const LESSON_51_MISSION_TITLES:
  Record<number, string> =
  {};

export const LESSON_51_UNIFIED_QUESTIONS:
  Lesson51UnifiedQuestion[] = [
    ...standardQuestions(
      lesson51Exercise1 as readonly AnyItem[],
      1,
    ),
    ...visualAdditionQuestions(
      lesson51Exercise2 as readonly AnyItem[],
    ),
    ...standardQuestions(
      lesson51Exercise3 as readonly AnyItem[],
      3,
    ),
    ...standardQuestions(
      lesson51Exercise4 as readonly AnyItem[],
      4,
    ),
  ];
