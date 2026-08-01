export type Lesson49AnswerOption = {
  id: string;
  content: string;
  ariaLabel: string;
};

export type Lesson49Question = {
  id: string;
  question: string;
  question_audio_key: string;

  focusEmoji: string;
  focusLabel: string;

  options: readonly Lesson49AnswerOption[];
  correctId: string;

  backgroundImage: string;
};
