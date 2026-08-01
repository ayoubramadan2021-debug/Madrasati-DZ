export type Lesson52PulseSpotId =
  | "head"
  | "chest"
  | "wrist"
  | "knee";

export type Lesson52PulseHotspotItem = {
  question: string;
  question_audio_key: string;
  correct_spot: Lesson52PulseSpotId;
  hint: string;
};
