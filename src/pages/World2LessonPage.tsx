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
    exercisePath?: string;
    audioToken: string;

  "37": {
    title: "قراءة جدول",
    exercisePath: "/lesson-v2/37/exercises",
    audioToken: "lesson_37_amusement_picture_table",
  },
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
  "36": {
    title: "الْأَعْدَادُ إِلَى 19 (1)",
    exercisePath: "/lesson-v2/36/exercises",
    audioToken: "lesson_36_amusement_sorting",
  },
  "37": {
    title: "قِرَاءَةُ جَدْوَلٍ",
    audioToken: "lesson_37_amusement_picture_table",
  },
  "38": {
    title: "أَتَنَفَّسُ بِهُدُوءٍ فِي عَالَمِ الْمَرَحِ",
    audioToken: "lesson_38_amusement_positions",
  },
  "39": {
    title: "رِحْلَةُ الْقِطَارِ الْمُرَتَّبِ",
    audioToken: "lesson_39_ordered_train_journey",
  },
  "40": {
    title: "أُقَارِنُ وَأُرَتِّبُ",
    audioToken: "lesson_40_amusement_compare_order",
    exercisePath: "/lesson-v2/40/exercises",
  },
  "41": {
    title: "صفوف وأعمدة في لوحة اللعب",
    audioToken: "lesson_41_amusement_rows_columns",
    exercisePath: "/lesson-v2/41/exercises",
  },
  "42": {
    title: "قَلْبِي يَنْبِضُ (1)",
    audioToken: "lesson_42_my_heart_beats_1",
    exercisePath: "/lesson-v2/42/exercises",
  },
  "43": {
    title: "أَكْتَشِفُ ضِعْفَ عَدَدٍ أَصْغَرَ مِنْ عَشَرَةٍ",
    audioToken: "lesson_43_double_number_under_10",
    exercisePath: "/lesson-v2/43/exercises",
  },
  "44": {
    title: "أَكْتَشِفُ نِصْفَ عَدَدٍ أَصْغَرَ مِنْ عِشْرِينَ",
    audioToken: "lesson_44_half_number_under_20",
    exercisePath: "/lesson-v2/44/exercises",
  },

  "45": {
    title: "إِتْمَامُ جَدْوَلٍ",
    audioToken: "lesson_45_complete_table",
    exercisePath: "/lesson-v2/45/exercises",
  },

  "46": {
    title: "قَلْبِي يَنْبِضُ (2)",
    audioToken: "lesson_46_my_heart_beats_2",
    exercisePath: "/lesson-v2/46/exercises",
  },
  "48": {
    title: "الأَعْدَادُ إِلَى 39 (1)",
    exercisePath: "/lesson-v2/48/exercises",
    audioToken: "lesson_48_numbers_to_39",
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

      let data: LessonRow | null = null;
      let queryError: unknown = null;

      if (alias) {
        const result = await supabase
          .from("lessons")
          .select(
            "id,title,world_id,content,scenes",
          )
          .eq("world_id", WORLD2_ID);

        queryError = result.error;

        if (!result.error && result.data) {
          const matchingLesson =
            result.data.find((row) => {
              const rowContent =
                parseObject(row.content);

              const rowAudioBase =
                String(
                  rowContent.audio_base ??
                    rowContent.audioBase ??
                    "",
                );

              return (
                String(row.title ?? "").trim() ===
                  alias.title.trim() ||
                rowAudioBase.includes(
                  alias.audioToken,
                )
              );
            });

          data =
            (matchingLesson as LessonRow | undefined) ??
            null;
        }
      } else {
        const result = await supabase
          .from("lessons")
          .select(
            "id,title,world_id,content,scenes",
          )
          .eq("world_id", WORLD2_ID)
          .eq("id", lessonId)
          .single();

        queryError = result.error;

        data =
          (result.data as LessonRow | null) ??
          null;
      }

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

        // LESSON48_WORLD2_EXERCISE_ROUTE
        // مطابق لربط الدرس 36 داخل عالم الألعاب.
        const isLesson48 =
          lessonId === "48" ||
          preparedLesson.audioBase.includes(
            "lesson_48_numbers_to_39",
          );

        if (isLesson48) {
          navigate(
            "/lesson-v2/48/exercises",
          );

          return;
        }


        // LESSON47_WORLD2_EXERCISE_ROUTE
        // الدرس 47 يُفتح من مسار العالم الثاني، لذلك نربط زر «هيا نتدرب»
        // بصفحة تمارينه المخصصة قبل منطق الدروس الأخرى.
        const lesson47NormalizedTitle = (lesson?.title ?? "")
          .normalize("NFD")
          .replace(/[\u064B-\u065F\u0670]/g, "");

        if (lesson47NormalizedTitle.includes("التنقل على مرصوفة")) {
          navigate("/lesson-v2/lesson47/exercises");
          return;
        }


        const isLesson46 =
          lessonId === "46" ||
          preparedLesson.audioBase.includes(
            "lesson_46_my_heart_beats_2",
          );

        if (isLesson46) {
          navigate(
            "/lesson-v2/46/exercises",
          );

          return;
        }

        const isLesson45 =
          lessonId === "45" ||
          preparedLesson.audioBase.includes(
            "lesson_45_complete_table",
          );

        if (isLesson45) {
          navigate(
            "/lesson-v2/45/exercises",
          );

          return;
        }

        const isLesson44 =
          lessonId === "44" ||
          preparedLesson.audioBase.includes(
            "lesson_44_half_number_under_20",
          );

        if (isLesson44) {
          navigate(
            "/lesson-v2/44/exercises",
          );

          return;
        }

        const isLesson43 =
          lessonId === "43" ||
          preparedLesson.audioBase.includes(
            "lesson_43_double_number_under_10",
          );

        if (isLesson43) {
          navigate(
            "/lesson-v2/43/exercises",
          );

          return;
        }

        const isLesson42 =
          lessonId === "42" ||
          preparedLesson.audioBase.includes(
            "lesson_42_my_heart_beats_1",
          );

        if (isLesson42) {
          navigate(
            "/lesson-v2/42/exercises",
          );

          return;
        }

        const lesson41Title =
          String(lesson?.title ?? "")
            .normalize("NFKD")
            .replace(/[\u064B-\u065F\u0670]/g, "")
            .trim();

        const isLesson41 =
          lessonId === "41" ||
          preparedLesson.audioBase.includes(
            "lesson_41_amusement_rows_columns",
          ) ||
          lesson41Title.includes(
            "صفوف وأعمدة في لوحة اللعب",
          ) ||
          lesson41Title.includes(
            "صفوف واعمدة في لوحة اللعب",
          );

        if (isLesson41) {
          navigate(
            "/lesson-v2/41/exercises",
          );

          return;
        }

        const isLesson40 =
          lessonId === "40" ||
          preparedLesson.audioBase.includes(
            "lesson_40",
          );

        if (isLesson40) {
          navigate(
            "/lesson-v2/40/exercises",
          );

          return;
        }

        const lesson39Title =
          String(lesson?.title ?? "")
            .normalize("NFKD")
            .replace(/[\u064B-\u065F\u0670]/g, "")
            .trim();

        const isLesson39 =
          lessonId === "39" ||
          preparedLesson.audioBase.includes(
            "lesson_39",
          ) ||
          lesson39Title.includes(
            "رحلة القطار المرتب",
          ) ||
          lesson39Title.includes(
            "القطار المرتب",
          );

        if (isLesson39) {
          navigate(
            "/lesson-v2/39/exercises",
          );

          return;
        }

        const isLesson38 =
          lessonId === "38" ||
          preparedLesson.audioBase.includes(
            "lesson_38_amusement_positions",
          );

        if (isLesson38) {
          navigate(
            "/lesson-v2/38/exercises",
          );
          return;
        }
        const normalizedTitle =
          String(lesson?.title ?? "")
            .trim();

        const isLesson37 =
          lessonId === "37" ||
          preparedLesson.audioBase.includes(
            "lesson_37_amusement_picture_table",
          ) ||
          normalizedTitle.includes(
            "قراءة جدول",
          ) ||
          normalizedTitle.includes(
            "قِرَاءَةُ جَدْوَلٍ",
          ) ||
          normalizedTitle.includes(
            "لَوْحَةَ الْأَلْعَابِ",
          ) ||
          normalizedTitle.includes(
            "لوحة الألعاب",
          );

        if (isLesson37) {
          navigate(
            "/lesson-v2/37/exercises",
          );

          return;
        }

        if (alias) {
          navigate(alias.exercisePath);
          return;
        }

        console.error(
          "تعذر تحديد مسار التمارين.",
          {
            lessonId,
            title: lesson?.title,
            audioBase:
              preparedLesson.audioBase,
          },
        );

        navigate(-1);
      }}
    />
  );
}
