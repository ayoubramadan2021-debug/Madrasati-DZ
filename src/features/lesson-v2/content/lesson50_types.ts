export type Lesson50AnswerOption = {
  id: string;
  content: string;
  ariaLabel: string;
};

export type Lesson50Question = {
  id: string;
  question: string;
  question_audio_key: string;

  focusEmoji: string;
  focusLabel: string;

  options: readonly Lesson50AnswerOption[];
  correctId: string;

  backgroundImage: string;
};
