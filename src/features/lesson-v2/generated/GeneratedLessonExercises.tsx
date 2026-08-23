import {
  useEffect,
  useState,
} from "react";

import ExerciseFullscreenShellV2 from "../components/ExerciseFullscreenShellV2";

import RankOrderExerciseV2, {
  type RankOrderItem,
} from "../exercises-v2/RankOrderExerciseV2";

import TapSelectImagesV2, {
  type TapSelectImageItem,
} from "../exercises-v2/TapSelectImagesV2";

type GeneratedQuestion = {
  lesson_id: number;
  exercise_no: number;
  question_no: number;
  question_audio_key: string;
  question_text: string;
  mission_title?: string;
  scene_image?: string;
  background_image?: string;
  option_1_text?: string;
  option_1_image?: string;
  option_2_text?: string;
  option_2_image?: string;
  option_3_text?: string;
  option_3_image?: string;
  option_4_text?: string;
  option_4_image?: string;
  correct_index: number;
};

type GeneratedExercise = {
  definition: {
    lesson_id: number;
    exercise_no: number;
    exercise_type: string;
    title_ar: string;
    component: string;
    audio_base: string;
  };
  questions: GeneratedQuestion[];
};

type GeneratedManifest = {
  lesson: {
    lesson_id: number;
    title_ar: string;
    teacher: string;
    lesson_slug: string;
  };
  exercises: GeneratedExercise[];
};

type Props = {
  manifestPath: string;
};

function browserPath(value?: string) {
  const path = String(value ?? "").trim();

  if (!path) {
    return "";
  }

  if (path.startsWith("public/")) {
    return `/${path.slice("public/".length)}`;
  }

  if (!path.startsWith("/")) {
    return `/${path}`;
  }

  return path;
}

function zeroBasedCorrectIndex(value: number) {
  const converted = Number(value) - 1;

  return Math.max(
    0,
    Math.min(3, converted),
  );
}

function toTapItem(
  question: GeneratedQuestion,
): TapSelectImageItem {
  return {
    question: question.question_text,
    question_audio_key:
      question.question_audio_key,

    options: [
      browserPath(question.option_1_image),
      browserPath(question.option_2_image),
      browserPath(question.option_3_image),
      browserPath(question.option_4_image),
    ],

    correct_index:
      zeroBasedCorrectIndex(
        question.correct_index,
      ),

    image_fit: "contain",
  };
}

function toRankItem(
  exercise: GeneratedExercise,
  question: GeneratedQuestion,
): RankOrderItem {
  const options = [
    question.option_1_text,
    question.option_2_text,
    question.option_3_text,
    question.option_4_text,
  ]
    .map((value) => String(value ?? "").trim())
    .filter(Boolean);

  const correctIndex =
    zeroBasedCorrectIndex(
      question.correct_index,
    );

  return {
    scene_image: browserPath(
      question.scene_image
      || question.option_1_image,
    ),

    title:
      question.mission_title
      || exercise.definition.title_ar,

    instruction:
      exercise.definition.title_ar
      || "اختر الترتيب الصحيح.",

    question:
      question.question_text,

    question_audio_key:
      question.question_audio_key,

    mode: "pickRank",

    options,

    correct:
      options[correctIndex]
      ?? options[0]
      ?? "",
  };
}

export default function GeneratedLessonExercises({
  manifestPath,
}: Props) {
  const [manifest, setManifest] =
    useState<GeneratedManifest | null>(null);

  const [exerciseIndex, setExerciseIndex] =
    useState(0);

  const [error, setError] =
    useState("");

  useEffect(() => {
    let active = true;

    setManifest(null);
    setExerciseIndex(0);
    setError("");

    fetch(manifestPath, {
      cache: "no-store",
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(
            `HTTP ${response.status}`,
          );
        }

        return await response.json();
      })
      .then((data: GeneratedManifest) => {
        if (!active) {
          return;
        }

        if (
          !Array.isArray(data.exercises)
          || data.exercises.length === 0
        ) {
          throw new Error(
            "لا توجد تمارين داخل Manifest.",
          );
        }

        setManifest(data);
      })
      .catch((reason: unknown) => {
        if (!active) {
          return;
        }

        setError(
          reason instanceof Error
            ? reason.message
            : "تعذر تحميل الدرس.",
        );
      });

    return () => {
      active = false;
    };
  }, [manifestPath]);

  if (error) {
    return (
      <ExerciseFullscreenShellV2>
        <div style={messageStyle}>
          <h2>تعذر تحميل الدرس المولّد</h2>
          <p>{error}</p>
          <code>{manifestPath}</code>
        </div>
      </ExerciseFullscreenShellV2>
    );
  }

  if (!manifest) {
    return (
      <ExerciseFullscreenShellV2>
        <div style={messageStyle}>
          <h2>جارٍ تحميل الدرس…</h2>
        </div>
      </ExerciseFullscreenShellV2>
    );
  }

  if (
    exerciseIndex >=
    manifest.exercises.length
  ) {
    return (
      <ExerciseFullscreenShellV2>
        <div style={completeStyle}>
          <div style={{ fontSize: 76 }}>
            🏆
          </div>

          <h1>أَحْسَنْتَ يَا بَطَلُ!</h1>

          <p>
            أكملت تمارين:
            {" "}
            <strong>
              {manifest.lesson.title_ar}
            </strong>
          </p>

          <button
            type="button"
            style={primaryButtonStyle}
            onClick={() =>
              setExerciseIndex(0)
            }
          >
            إعادة التمارين
          </button>

          <button
            type="button"
            style={secondaryButtonStyle}
            onClick={() =>
              window.history.back()
            }
          >
            العودة
          </button>
        </div>
      </ExerciseFullscreenShellV2>
    );
  }

  const current =
    manifest.exercises[exerciseIndex];

  const nextExercise = () => {
    setExerciseIndex(
      (value) => value + 1,
    );
  };

  if (
    current.definition.exercise_type
    === "tap_select_images"
  ) {
    const items =
      current.questions.map(toTapItem);

    return (
      <ExerciseFullscreenShellV2>
        <TapSelectImagesV2
          key={
            `${manifest.lesson.lesson_id}`
            + `-ex${current.definition.exercise_no}`
          }
          items={items}
          audio_base={
            current.definition.audio_base
          }
          onComplete={nextExercise}
        />
      </ExerciseFullscreenShellV2>
    );
  }

  if (
    current.definition.exercise_type
    === "rank_order"
  ) {
    const items =
      current.questions.map(
        (question) =>
          toRankItem(
            current,
            question,
          ),
      );

    return (
      <ExerciseFullscreenShellV2>
        <RankOrderExerciseV2
          key={
            `${manifest.lesson.lesson_id}`
            + `-ex${current.definition.exercise_no}`
          }
          items={items}
          audio_base={
            current.definition.audio_base
          }
          onComplete={nextExercise}
        />
      </ExerciseFullscreenShellV2>
    );
  }

  return (
    <ExerciseFullscreenShellV2>
      <div style={messageStyle}>
        <h2>نوع تمرين غير مدعوم بعد</h2>

        <p>
          {
            current.definition
              .exercise_type
          }
        </p>
      </div>
    </ExerciseFullscreenShellV2>
  );
}

const messageStyle = {
  minHeight: "80vh",
  display: "grid",
  placeContent: "center",
  padding: 28,
  textAlign: "center" as const,
  color: "#173f70",
};

const completeStyle = {
  ...messageStyle,
  gap: 18,
};

const primaryButtonStyle = {
  border: 0,
  borderRadius: 22,
  padding: "18px 24px",
  background: "#20a667",
  color: "#ffffff",
  fontSize: 22,
  fontWeight: 900,
};

const secondaryButtonStyle = {
  ...primaryButtonStyle,
  background: "#173f70",
};
