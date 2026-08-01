export type Lesson48Mode =
  | "tens-ones"
  | "number-to-word"
  | "complete-sequence"
  | "number-decomposition";

export type Lesson48Option = {
  id: string;
  label: string;
  tens?: number;
  ones?: number;
};

export type Lesson48Item = {
  id: string;
  title: string;
  question: string;
  question_audio_key: string;
  mode: Lesson48Mode;

  number?: number;
  tens?: number;
  ones?: number;
  sequence?: Array<number | null>;

  options: Lesson48Option[];
  answer: string;
};
