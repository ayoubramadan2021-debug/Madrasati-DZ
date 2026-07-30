export type Lesson51AnswerOption = {
  id: string;
  content: string;
  ariaLabel: string;
};

export type Lesson51Question = {
  id: string;
  question: string;
  question_audio_key: string;

  focusEmoji: string;
  focusLabel: string;

  options: readonly Lesson51AnswerOption[];
  correctId: string;

  backgroundImage: string;
};
