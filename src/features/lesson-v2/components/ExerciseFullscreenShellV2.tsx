import {
  useEffect,
  type ReactNode,
} from "react";

type Props = {
  children: ReactNode;
};

export default function ExerciseFullscreenShellV2({
  children,
}: Props) {
  useEffect(() => {
    const bodyOverflow = document.body.style.overflow;
    const bodyOverscroll = document.body.style.overscrollBehavior;
    const htmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = bodyOverflow;
      document.body.style.overscrollBehavior = bodyOverscroll;
      document.documentElement.style.overflow = htmlOverflow;
    };
  }, []);

  return (
    <div
      className="lesson-exercise-fullscreen"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100dvh",
        minHeight: "100dvh",
        zIndex: 2147483000,
        overflowX: "hidden",
        overflowY: "auto",
        overscrollBehavior: "contain",
        WebkitOverflowScrolling: "touch",
        background:
          "linear-gradient(180deg, #fff9df 0%, #fff3be 52%, #ffedaa 100%)",
        boxSizing: "border-box",
        paddingTop: "env(safe-area-inset-top)",
        paddingRight: "env(safe-area-inset-right)",
        paddingBottom: "env(safe-area-inset-bottom)",
        paddingLeft: "env(safe-area-inset-left)",
      }}
    >
      <style>
        {`
          .lesson-exercise-fullscreen,
          .lesson-exercise-fullscreen * {
            box-sizing: border-box;
          }

          .lesson-exercise-fullscreen > * {
            width: 100% !important;
            max-width: none !important;
            min-height: 100dvh !important;
            margin: 0 !important;
            border-radius: 0 !important;
          }

          .lesson-exercise-fullscreen
          [data-legacy-feedback="true"] {
            display: none !important;
          }

          @media (max-width: 600px) {
            .lesson-exercise-fullscreen > * {
              padding: 8px 10px 12px !important;
            }
          }

          @media (display-mode: standalone) {
            .lesson-exercise-fullscreen {
              height: 100dvh;
              min-height: 100dvh;
            }
          }
        `}
      </style>

      {children}
    </div>
  );
}
