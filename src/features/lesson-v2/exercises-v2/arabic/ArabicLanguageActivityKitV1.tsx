import React from "react";

export type ArabicCharacterV1 = {
  id: string;
  label: string;
  image: string;
};

export type ArabicExerciseQuestionV1 = {
  id: string;
  mission: number;
  prompt: string;
  audioKey?: string;
  answer: string;
  activityData: {
    kind: string;
    options?: ArabicCharacterV1[];
  };
  successText?: string;
  retryText?: string;
};

type Props = {
  question: ArabicExerciseQuestionV1;
  feedback: any;
  selectedId: string | null;
  locked: boolean;
  showResult: boolean;
  submitAnswer: (id: string) => void;
  submitResult: (correct: boolean) => void;
};

export default function ArabicLanguageActivityKitV1({
  question,
  selectedId,
  locked,
  submitAnswer,
}: Props) {

  const options = question.activityData?.options || [];

  return (
    <div dir="rtl" className="space-y-6">
      <h2 className="text-xl font-bold text-center">
        {question.prompt}
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {options.map((item) => (
          <button
            key={item.id}
            disabled={locked}
            onClick={() => submitAnswer(item.id)}
            className={`
              rounded-2xl p-4 border
              ${selectedId === item.id
                ? "ring-4 ring-blue-400"
                : ""}
            `}
          >
            <img
              src={item.image}
              alt={item.label}
              className="w-32 h-32 mx-auto object-contain"
            />

            <div className="mt-2 font-bold">
              {item.label}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
