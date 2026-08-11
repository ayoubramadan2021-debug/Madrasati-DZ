import { useState, type ReactNode } from "react";

import UnifiedExerciseFeedbackV2 from "./UnifiedExerciseFeedbackV2";
import UnifiedExerciseHeaderV2 from "./UnifiedExerciseHeaderV2";
import UnifiedExerciseKaraokeV2 from "./UnifiedExerciseKaraokeV2";

export type UnifiedExerciseFeedbackState =
  | "idle"
  | "correct"
  | "wrong";

export type UnifiedExerciseScreenV2Props = {
  index: number;
  total: number;

  missionTitle: string;

  questionWords: string[];
  activeWordIndex?: number;
  activeWord?: string;

  shownWordCount?: number;
  onReplay: () => void;
  isPlaying?: boolean;

  backgroundImage?: string;

  activity: ReactNode;
  answers: ReactNode;

  feedback: UnifiedExerciseFeedbackState;
  successText?: string;
  retryText?: string;

  activityLabel?: string;
  answersLabel?: string;
};

export default function UnifiedExerciseScreenV2({
  index,
  total,
  missionTitle,

  questionWords,
  activeWordIndex = -1,
  activeWord = "",

  shownWordCount,
  onReplay,
  isPlaying = false,

  backgroundImage,

  activity,
  answers,

  feedback,
  successText = "🌟 أَحْسَنْتَ!",
  retryText = "حَاوِلْ مَرَّةً أُخْرَى ✨",

  activityLabel = "محتوى التمرين",
  answersLabel = "خيارات الإجابة",
}: UnifiedExerciseScreenV2Props) {
  const [
    karaokeReplayKey,
    setKaraokeReplayKey,
  ] = useState(0);

  const handleReplay = () => {
    setKaraokeReplayKey(
      value => value + 1,
    );

    onReplay();
  };

  return (
    <main className="unified-exercise-screen-v2" dir="rtl">
      <style>{`

        /* ===== UNIFIED GOLD ANSWER OPTIONS ===== */

        /*
         * توحيد كل أزرار وخيارات الإجابة باللون الذهبي.
         * يشمل الوضع العادي، المحدد، المعطل، والصور والأيقونات.
         */
        .unified-exercise-screen-v2__answers button,
        .unified-exercise-screen-v2__answers [role="button"],
        .unified-exercise-answers-v2 button,
        .unified-exercise-answers-v2 [role="button"] {
          border-color: var(--ue-gold) !important;
          outline-color: var(--ue-gold) !important;
          opacity: 1 !important;
          filter: none !important;
        }

        .unified-exercise-screen-v2__answers button:focus,
        .unified-exercise-screen-v2__answers button:focus-visible,
        .unified-exercise-screen-v2__answers button:active,
        .unified-exercise-screen-v2__answers button:disabled,
        .unified-exercise-screen-v2__answers [aria-pressed="true"],
        .unified-exercise-screen-v2__answers [data-selected="true"],
        .unified-exercise-answers-v2 button:focus,
        .unified-exercise-answers-v2 button:focus-visible,
        .unified-exercise-answers-v2 button:active,
        .unified-exercise-answers-v2 button:disabled,
        .unified-exercise-answers-v2 [aria-pressed="true"],
        .unified-exercise-answers-v2 [data-selected="true"] {
          border-color: var(--ue-gold) !important;
          outline-color: var(--ue-gold) !important;
          opacity: 1 !important;
          filter: none !important;
        }

        /*
         * أيقونات SVG الموجودة داخل الخيارات.
         */
        .unified-exercise-screen-v2__answers button svg,
        .unified-exercise-screen-v2__answers [role="button"] svg,
        .unified-exercise-answers-v2 button svg,
        .unified-exercise-answers-v2 [role="button"] svg {
          color: var(--ue-gold) !important;
          fill: var(--ue-gold) !important;
          stroke: var(--ue-gold) !important;
        }

        /*
         * الأيقونات النصية أو العناصر التي تحمل اسم icon.
         */
        .unified-exercise-screen-v2__answers [class*="icon"],
        .unified-exercise-screen-v2__answers [class*="Icon"],
        .unified-exercise-answers-v2 [class*="icon"],
        .unified-exercise-answers-v2 [class*="Icon"] {
          color: var(--ue-gold) !important;
          border-color: var(--ue-gold) !important;
        }

        /*
         * صور الأيقونات أحادية اللون.
         */
        .unified-exercise-screen-v2__answers [class*="icon"] img,
        .unified-exercise-screen-v2__answers [class*="Icon"] img,
        .unified-exercise-answers-v2 [class*="icon"] img,
        .unified-exercise-answers-v2 [class*="Icon"] img {
          filter:
            sepia(1)
            saturate(7)
            hue-rotate(345deg)
            brightness(1.04) !important;
          opacity: 1 !important;
        }

        /* ===== END UNIFIED GOLD ANSWER OPTIONS ===== */

        /* ===== GOLD ICONS PATCH ===== */
        .unified-exercise-screen-v2 svg,
        .unified-exercise-screen-v2 [class*="icon"] svg,
        .unified-exercise-screen-v2 [class*="Icon"] svg,
        .unified-exercise-screen-v2 button svg,
        .unified-exercise-screen-v2 [role="button"] svg {
          color: var(--ue-gold) !important;
          fill: var(--ue-gold) !important;
          stroke: var(--ue-gold) !important;
        }

        .unified-exercise-screen-v2 [class*="icon"] {
          color: var(--ue-gold) !important;
        }

        .unified-exercise-screen-v2 [class*="icon"] img,
        .unified-exercise-screen-v2 [class*="Icon"] img {
          filter: sepia(1) saturate(7) hue-rotate(345deg) brightness(1.04);
        }
        /* ===== END GOLD ICONS PATCH ===== */


        .unified-exercise-screen-v2 {
          --ue-navy: #17365f;
          --ue-gold: #edb21f;
          --ue-cream: #fff8ec;

          position: relative;
          isolation: isolate;

          width: 100%;
          min-height: 100dvh;

          box-sizing: border-box;
          overflow-x: hidden;
          overflow-y: auto;

          padding:
            max(12px, env(safe-area-inset-top))
            12px
            calc(128px + env(safe-area-inset-bottom));

          background: var(--ue-cream);
          color: var(--ue-navy);

          font-family:
            "Tajawal",
            "Noto Kufi Arabic",
            Arial,
            sans-serif;
        }

        .unified-exercise-screen-v2__background {
          position: fixed;
          inset: 0;
          z-index: -3;

          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;

          filter: blur(2px) brightness(0.88);
          transform: scale(1.025);
        }

        .unified-exercise-screen-v2__overlay {
          position: fixed;
          inset: 0;
          z-index: -2;

          background:
            linear-gradient(
              180deg,
              rgba(255, 248, 236, 0.2) 0%,
              rgba(255, 248, 236, 0.72) 48%,
              rgba(247, 219, 160, 0.96) 100%
            );
        }

        .unified-exercise-screen-v2__shell {
          width: min(100%, 720px);
          margin: 0 auto;

          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        /*
         * الترتيب الموحد:
         * 1. الرأس
         * 2. النشاط
         * 3. السؤال والكاريوكي
         * 4. الإجابات
         */

        .unified-exercise-screen-v2__activity {
          width: 100%;
          min-height: 250px;

          box-sizing: border-box;

          display: flex;
          align-items: center;
          justify-content: center;

          overflow: hidden;

          border: 4px solid var(--ue-gold);
          border-radius: 26px;

          background: rgba(255, 255, 255, 0.96);

          box-shadow:
            0 8px 24px rgba(0, 0, 0, 0.14);
        }

        .unified-exercise-screen-v2__question {
          width: 100%;
        }

        .unified-exercise-screen-v2__answers {
          width: 100%;
          box-sizing: border-box;

          display: flex;
          align-items: stretch;
          justify-content: center;

          padding: 0 2px;
        }

        @media (max-width: 520px) {
          .unified-exercise-screen-v2 {
            padding:
              max(8px, env(safe-area-inset-top))
              8px
              calc(122px + env(safe-area-inset-bottom));
          }

          .unified-exercise-screen-v2__shell {
            gap: 8px;
          }

          .unified-exercise-screen-v2__activity {
            min-height: 230px;
            border-radius: 23px;
          }
        }

        @media (max-height: 720px) {
          .unified-exercise-screen-v2 {
            padding-bottom:
              calc(116px + env(safe-area-inset-bottom));
          }

          .unified-exercise-screen-v2__activity {
            min-height: 205px;
          }
        }
      `}</style>

      {backgroundImage && (
        <div
          className="unified-exercise-screen-v2__background"
          style={{
            backgroundImage: `url("${backgroundImage}")`,
          }}
          aria-hidden="true"
        />
      )}

      <div
        className="unified-exercise-screen-v2__overlay"
        aria-hidden="true"
      />

      <section className="unified-exercise-screen-v2__shell">
        <UnifiedExerciseHeaderV2
          index={index}
          total={total}
          missionTitle={missionTitle}
          onReplay={handleReplay}
          isPlaying={isPlaying}
        />

        <section
          className="unified-exercise-screen-v2__activity"
          aria-label={activityLabel}
        >
          {activity}
        </section>

        <section className="unified-exercise-screen-v2__question">
          <UnifiedExerciseKaraokeV2
            key={karaokeReplayKey}
            words={questionWords}
            activeIndex={activeWordIndex}
            activeWord={activeWord}
            shownWordCount={shownWordCount}
          />
        </section>

        <section
          className="unified-exercise-screen-v2__answers"
          aria-label={answersLabel}
        >
          {answers}
        </section>
      </section>

      <UnifiedExerciseFeedbackV2
        feedback={feedback}
        successText={successText}
        retryText={retryText}
      />
    </main>
  );
}
