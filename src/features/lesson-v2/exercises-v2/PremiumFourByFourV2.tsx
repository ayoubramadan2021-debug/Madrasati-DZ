import { useState } from "react";
import { Link } from "react-router-dom";

export type PremiumFourByFourOption = {
  id: string;
  label: string;
  emoji?: string;
};

export type PremiumFourByFourVisual =
  | {
      kind: "equation";
      expression: string;
    }
  | {
      kind: "emoji";
      emoji: string;
      label?: string;
    }
  | {
      kind: "ten-frame";
      filled: number;
      total?: number;
    };

export type PremiumFourByFourVariant = {
  id: string;
  prompt: string;
  instruction?: string;
  visual: PremiumFourByFourVisual;
  options: PremiumFourByFourOption[];
  correctId: string;
};

export type PremiumFourByFourGroup = {
  id: string;
  title: string;
  variants: PremiumFourByFourVariant[];
};

type Props = {
  lessonTitle: string;
  groups: PremiumFourByFourGroup[];
  lessonPath: string;
  nextPath: string;
  nextLabel?: string;
};

type Feedback = "idle" | "correct" | "wrong";

const CORRECT_AUDIO =
  "/audio/v2_feedback/correct.mp3";

const RETRY_AUDIO =
  "/audio/v2_feedback/retry.mp3";

function playFeedback(correct: boolean) {
  try {
    const audio = new Audio(
      correct ? CORRECT_AUDIO : RETRY_AUDIO,
    );

    audio.volume = 0.8;
    void audio.play();
  } catch {
    // التغذية البصرية تبقى فعالة.
  }
}

export default function PremiumFourByFourV2({
  lessonTitle,
  groups,
  lessonPath,
  nextPath,
  nextLabel = "الدرس التالي",
}: Props) {
  const [groupIndex, setGroupIndex] = useState(0);
  const [variantIndex, setVariantIndex] = useState(0);
  const [selected, setSelected] =
    useState<string | null>(null);
  const [feedback, setFeedback] =
    useState<Feedback>("idle");
  const [finished, setFinished] = useState(false);

  const group = groups[groupIndex];
  const variant = group.variants[variantIndex];

  function speak() {
    if (!("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(
      `${group.title}. ${variant.prompt}. ${
        variant.instruction ?? ""
      }`,
    );

    speech.lang = "ar-DZ";
    speech.rate = 0.82;

    window.speechSynthesis.speak(speech);
  }

  function moveNext() {
    if (variantIndex < group.variants.length - 1) {
      setVariantIndex((value) => value + 1);
      setSelected(null);
      setFeedback("idle");
      return;
    }

    if (groupIndex < groups.length - 1) {
      setGroupIndex((value) => value + 1);
      setVariantIndex(0);
      setSelected(null);
      setFeedback("idle");
      return;
    }

    setFinished(true);
  }

  function choose(optionId: string) {
    if (feedback !== "idle") return;

    setSelected(optionId);

    if (optionId === variant.correctId) {
      setFeedback("correct");
      playFeedback(true);

      window.setTimeout(moveNext, 850);
      return;
    }

    setFeedback("wrong");
    playFeedback(false);

    window.setTimeout(() => {
      setSelected(null);
      setFeedback("idle");
    }, 650);
  }

  if (finished) {
    return (
      <main className="f44-page" dir="rtl">
        <section className="f44-complete">
          <div className="f44-trophy">🏆</div>

          <h1>أَحْسَنْتَ!</h1>

          <p>
            أَتْقَنْتَ تَمَارِينَ {lessonTitle}
          </p>

          <div className="f44-complete-actions">
            <Link to={lessonPath}>
              العودة إلى الدرس
            </Link>

            <Link to={nextPath}>
              {nextLabel}
            </Link>
          </div>
        </section>

        <PremiumFourByFourStyles />
      </main>
    );
  }

  return (
    <main className="f44-page" dir="rtl">
      <section className="f44-shell">
        <header className="f44-header">
          <div className="f44-counter">
            {variantIndex + 1} / 4
          </div>

          <div className="f44-stars">
            {group.variants.map((_, index) => (
              <span
                key={index}
                className={
                  index <= variantIndex
                    ? "active"
                    : ""
                }
              >
                ★
              </span>
            ))}
          </div>

          <button
            type="button"
            className="f44-audio"
            onClick={speak}
            aria-label="تشغيل التعليمة"
          >
            🔊
          </button>
        </header>

        <div className="f44-group-progress">
          {groups.map((_, index) => (
            <span
              key={index}
              className={
                index < groupIndex
                  ? "done"
                  : index === groupIndex
                    ? "current"
                    : ""
              }
            />
          ))}
        </div>

        <div className="f44-group-label">
          التمرين {groupIndex + 1} من 4
        </div>

        <div className="f44-mission">
          ⭐ {group.title}
        </div>

        <section className="f44-card">
          <h1>{variant.prompt}</h1>

          {variant.instruction && (
            <p className="f44-instruction">
              {variant.instruction}
            </p>
          )}

          {variant.visual.kind === "equation" && (
            <div className="f44-equation">
              {variant.visual.expression}
            </div>
          )}

          {variant.visual.kind === "emoji" && (
            <div className="f44-emoji-card">
              <span>{variant.visual.emoji}</span>

              {variant.visual.label && (
                <strong>
                  {variant.visual.label}
                </strong>
              )}
            </div>
          )}

          {variant.visual.kind === "ten-frame" && (
            <div className="f44-ten-frame">
              {Array.from(
                {
                  length:
                    variant.visual.total ?? 10,
                },
                (_, index) => (
                  <span
                    key={index}
                    className={
                      index < variant.visual.filled
                        ? "filled"
                        : ""
                    }
                  >
                    {index <
                    variant.visual.filled
                      ? "●"
                      : ""}
                  </span>
                ),
              )}
            </div>
          )}
        </section>

        <section className="f44-options">
          {variant.options.map((option) => (
            <button
              key={option.id}
              type="button"
              className={
                selected === option.id
                  ? feedback
                  : ""
              }
              onClick={() => choose(option.id)}
            >
              {option.emoji && (
                <span>{option.emoji}</span>
              )}

              <strong>{option.label}</strong>
            </button>
          ))}
        </section>

        <div
          className={`f44-feedback ${feedback}`}
          aria-live="polite"
        >
          {feedback === "correct" &&
            "مُمْتَازٌ! إِجَابَةٌ صَحِيحَةٌ 🎉"}

          {feedback === "wrong" &&
            "حَاوِلْ مَرَّةً أُخْرَى"}
        </div>
      </section>

      <PremiumFourByFourStyles />
    </main>
  );
}

function PremiumFourByFourStyles() {
  return (
    <style>{`
      .f44-page {
        min-height: 100vh;
        box-sizing: border-box;
        padding: 16px 12px 105px;
        color: #17375e;
        background:
          radial-gradient(circle at top,#fffef8,#fff4d7);
      }

      .f44-shell {
        width: min(640px,100%);
        margin: 0 auto;
      }

      .f44-header {
        display: grid;
        grid-template-columns: 68px 1fr 52px;
        align-items: center;
        gap: 9px;
      }

      .f44-counter,
      .f44-stars,
      .f44-audio {
        background: #fff;
        box-shadow: 0 5px 15px rgba(30,52,78,.11);
      }

      .f44-counter {
        direction: ltr;
        padding: 8px 4px;
        border: 3px solid #e8a918;
        border-radius: 17px;
        text-align: center;
        font-size: 18px;
        font-weight: 900;
      }

      .f44-stars {
        padding: 8px;
        border-radius: 18px;
        text-align: center;
        letter-spacing: 4px;
      }

      .f44-stars span {
        color: #e5e1d8;
        font-size: 20px;
      }

      .f44-stars span.active {
        color: #ffd026;
      }

      .f44-audio {
        width: 49px;
        height: 49px;
        border: 3px solid #fff;
        border-radius: 50%;
        background: #efa91b;
        font-size: 19px;
      }

      .f44-group-progress {
        display: flex;
        justify-content: center;
        gap: 7px;
        margin: 14px 0 8px;
      }

      .f44-group-progress span {
        width: 17px;
        height: 10px;
        border-radius: 10px;
        background: #e4d8b9;
      }

      .f44-group-progress span.current {
        width: 48px;
        background: #e9ac1c;
      }

      .f44-group-progress span.done {
        background: #27a86e;
      }

      .f44-group-label {
        text-align: center;
        color: #65758b;
        font-size: 14px;
        font-weight: 800;
      }

      .f44-mission {
        width: fit-content;
        margin: 10px auto 13px;
        padding: 8px 16px;
        border: 3px solid #e9ac1c;
        border-radius: 20px;
        background: #fff;
        font-size: 17px;
        font-weight: 900;
      }

      .f44-card {
        padding: 17px 14px;
        border: 4px solid #e5a715;
        border-radius: 28px;
        background: #fff;
        box-shadow: 0 7px 20px rgba(31,50,73,.08);
        text-align: center;
      }

      .f44-card h1 {
        margin: 0;
        font-size: clamp(20px,5vw,26px);
        line-height: 1.6;
      }

      .f44-instruction {
        margin: 7px 0 0;
        font-size: 17px;
        font-weight: 800;
      }

      .f44-equation {
        direction: ltr;
        margin: 17px auto 2px;
        padding: 15px 10px;
        border-radius: 20px;
        background: #fff3c8;
        font-size: clamp(27px,7vw,43px);
        font-weight: 900;
        white-space: pre-wrap;
      }

      .f44-emoji-card {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 13px;
        margin: 17px auto 2px;
        padding: 14px;
        border-radius: 22px;
        background: #eef8ff;
        font-size: 23px;
      }

      .f44-emoji-card span {
        font-size: 62px;
      }

      .f44-ten-frame {
        direction: ltr;
        display: grid;
        grid-template-columns: repeat(5,42px);
        justify-content: center;
        gap: 7px;
        margin: 20px auto 3px;
      }

      .f44-ten-frame span {
        display: grid;
        place-items: center;
        width: 38px;
        height: 38px;
        border: 3px solid #ccd6e2;
        border-radius: 12px;
        background: #f8fafc;
        color: #2176d2;
        font-size: 26px;
      }

      .f44-ten-frame span.filled {
        border-color: #4b91dc;
        background: #e8f3ff;
      }

      .f44-options {
        display: grid;
        grid-template-columns: repeat(2,minmax(0,1fr));
        gap: 11px;
        margin-top: 14px;
      }

      .f44-options button {
        min-height: 68px;
        padding: 10px 8px;
        border: 4px solid #e4a715;
        border-radius: 21px;
        background: #fff;
        color: #17375e;
        font-size: 19px;
        font-weight: 900;
        box-shadow: 0 5px 12px rgba(25,48,72,.08);
      }

      .f44-options button span {
        display: block;
        margin-bottom: 3px;
        font-size: 32px;
      }

      .f44-options button.correct {
        border-color: #22a66c;
        background: #dff7e9;
        color: #137647;
      }

      .f44-options button.wrong {
        border-color: #e54b4b;
        background: #ffe5e5;
        color: #b92323;
        animation: f44Shake .3s ease;
      }

      .f44-feedback {
        min-height: 31px;
        margin-top: 12px;
        text-align: center;
        font-size: 18px;
        font-weight: 900;
      }

      .f44-feedback.correct {
        color: #198754;
      }

      .f44-feedback.wrong {
        color: #cf3030;
      }

      .f44-complete {
        width: min(520px,100%);
        margin: 55px auto;
        padding: 30px 20px;
        border: 5px solid #e5aa1a;
        border-radius: 32px;
        background: #fff;
        box-shadow: 0 12px 30px rgba(30,50,70,.12);
        text-align: center;
      }

      .f44-trophy {
        font-size: 70px;
      }

      .f44-complete h1 {
        font-size: 33px;
      }

      .f44-complete p {
        font-size: 20px;
        font-weight: 800;
      }

      .f44-complete-actions {
        display: flex;
        justify-content: center;
        gap: 10px;
        flex-wrap: wrap;
      }

      .f44-complete a {
        padding: 11px 18px;
        border-radius: 17px;
        background: #1d7357;
        color: #fff;
        text-decoration: none;
        font-weight: 900;
      }

      @keyframes f44Shake {
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
      }

      @media (max-width: 420px) {
        .f44-options button {
          min-height: 61px;
          font-size: 17px;
        }

        .f44-ten-frame {
          grid-template-columns: repeat(5,38px);
          gap: 5px;
        }

        .f44-ten-frame span {
          width: 34px;
          height: 34px;
          font-size: 22px;
        }
      }
    `}</style>
  );
}
