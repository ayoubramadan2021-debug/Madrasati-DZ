import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import WorldIntroSceneV2 from "../features/exercises/templates/WorldIntroSceneV2";
import { supabase } from "../lib/supabaseClient";

const WORLD2_ID =
  "5daed3bb-7e62-4a5a-93a1-f6dec60df810";

const LESSON_ALIASES: Record<
  string,
  {
    title: string;
    exercisePath: string;
    audioToken: string;
  }
> = {
  "33": {
    title: "أقارن أطوال أشياء عالم المرح",
    exercisePath: "/lesson-v2/33/exercises",
    audioToken: "lesson_33_amusement_lengths",
  },
  "34": {
    title: "مسالك عالم الألعاب والترفيه",
    exercisePath: "/lesson-v2/34/exercises",
    audioToken: "lesson_34_amusement_paths",
  },
  "35": {
    title: "أتنفس جيدًا في عالم المرح",
    exercisePath: "/lesson-v2/35/exercises",
    audioToken: "lesson_35_amusement_breathing",
  },
};

type UnknownRecord =
  Record<string, unknown>;

type LessonRow = {
  id: string;
  title?: string;
  world_id?: string;
  content?: unknown;
  scenes?: unknown;
};

function parseObject(
  value: unknown,
): UnknownRecord {
  if (
    value &&
    typeof value === "object" &&
    !Array.isArray(value)
  ) {
    return value as UnknownRecord;
  }

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);

      if (
        parsed &&
        typeof parsed === "object" &&
        !Array.isArray(parsed)
      ) {
        return parsed as UnknownRecord;
      }
    } catch {
      return {};
    }
  }

  return {};
}

function normalizeSlides(
  value: unknown,
): unknown[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map(
    (rawSlide, index) => {
      const slide =
        parseObject(rawSlide);

      const image = String(
        slide.scene_image ??
          slide.image ??
          slide.image_url ??
          slide.img ??
          "",
      );

      const audioKey = String(
        slide.audio_key ??
          slide.audioKey ??
          slide.audio ??
          slide.key ??
          "",
      );

      const text = String(
        slide.text ??
          slide.narration ??
          slide.caption ??
          "",
      );

      return {
        ...slide,
        id:
          slide.id ??
          `world2-scene-${index + 1}`,
        image,
        image_url: image,
        scene_image: image,
        audio_key: audioKey,
        audioKey,
        text,
        narration: text,
        is_closing:
          index === value.length - 1,
        cta_text:
          index === value.length - 1
            ? "هيا نتدرب ←"
            : slide.cta_text,
      };
    },
  );
}

export default function World2LessonPage() {
  const { lessonId } = useParams();
  const navigate = useNavigate();

  const [lesson, setLesson] =
    useState<LessonRow | null>(null);
  const [loading, setLoading] =
    useState(true);
  const [error, setError] =
    useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadLesson() {
      if (!lessonId) {
        setError("معرّف الدرس غير موجود.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");

      const alias =
        LESSON_ALIASES[lessonId];

      let query = supabase
        .from("lessons")
        .select(
          "id,title,world_id,content,scenes",
        )
        .eq("world_id", WORLD2_ID);

      query = alias
        ? query.eq("title", alias.title)
        : query.eq("id", lessonId);

      const {
        data,
        error: queryError,
      } = await query.single();

      if (cancelled) return;

      if (queryError || !data) {
        console.error(queryError);
        setError("تعذر تحميل الدرس.");
        setLoading(false);
        return;
      }

      setLesson(data as LessonRow);
      setLoading(false);
    }

    void loadLesson();

    return () => {
      cancelled = true;
    };
  }, [lessonId]);

  const preparedLesson =
    useMemo(() => {
      if (!lesson) return null;

      const content =
        parseObject(lesson.content);

      const contentSlides =
        content.slides ??
        content.scenes;

      const sourceSlides =
        Array.isArray(contentSlides)
          ? contentSlides
          : lesson.scenes;

      return {
        slides: normalizeSlides(sourceSlides),
        audioBase: String(
          content.audio_base ??
            content.audioBase ??
            "",
        ),
      };
    }, [lesson]);

  if (loading) {
    return (
      <main
        dir="rtl"
        style={{
          minHeight: "100dvh",
          display: "grid",
          placeItems: "center",
          background: "#FFF8EC",
          color: "#1B3A6B",
          fontFamily:
            "Tajawal, system-ui, sans-serif",
          fontSize: 18,
          fontWeight: 900,
        }}
      >
        جارٍ تحميل الدرس...
      </main>
    );
  }

  if (
    error ||
    !preparedLesson ||
    preparedLesson.slides.length === 0 ||
    !preparedLesson.audioBase
  ) {
    return (
      <main
        dir="rtl"
        style={{
          minHeight: "100dvh",
          display: "grid",
          placeItems: "center",
          padding: 24,
          background: "#FFF8EC",
          color: "#1B3A6B",
          fontFamily:
            "Tajawal, system-ui, sans-serif",
          textAlign: "center",
        }}
      >
        <div>
          <p>
            {error ||
              "بيانات الدرس غير مكتملة."}
          </p>
          <button
            type="button"
            onClick={() => navigate(-1)}
            style={{
              border: 0,
              borderRadius: 18,
              padding: "14px 28px",
              background: "#E8A020",
              color: "#0F2447",
              fontFamily: "inherit",
              fontSize: 18,
              fontWeight: 900,
            }}
          >
            رجوع
          </button>
        </div>
      </main>
    );
  }

  const alias =
    Object.values(LESSON_ALIASES).find(
      (entry) =>
        entry.title === lesson?.title?.trim() ||
        preparedLesson.audioBase.includes(
          entry.audioToken,
        ),
    );

  return (
    <WorldIntroSceneV2
      audio_base={preparedLesson.audioBase}
      slides={preparedLesson.slides as any}
      onDone={() => {
        if (alias) {
          navigate(alias.exercisePath);
          return;
        }

        navigate(-1);
      }}
    />
  );
}
