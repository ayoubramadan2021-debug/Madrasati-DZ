import UnifiedExerciseKaraokeV2 from "../components/UnifiedExerciseKaraokeV2";
import {
  useEffect,
  useRef,
  useState,
} from "react";
import { Link } from "react-router-dom";

export type PremiumKaraokeOption = {
  id: string;
  label: string;
  emoji?: string;
};

export type PremiumKaraokeVisual =
  | {
      kind: "base10";
      tens: number;
      ones: number;
      label?: string;
    }
  | {
      kind: "stars";
      count: number;
      label?: string;
    }
  | {
      kind: "exchange";
      units: number;
      tens: number;
    }
  | {
      kind: "bridge";
      filled: number;
      target: number;
      expression: string;
    }
  | {
      kind: "equation";
      expression: string;
    }
  | {
      kind: "emoji";
      emoji: string;
      label: string;
    };

export type PremiumKaraokeVariant = {
  id: string;
  audioKey: string;
  prompt: string;
  voiceText: string;
  visual: PremiumKaraokeVisual;
  options: PremiumKaraokeOption[];
  correctId: string;
};

export type PremiumKaraokeGroup = {
  id: string;
  title: string;
  variants: PremiumKaraokeVariant[];
};

export type PremiumKaraokeLesson = {
  title: string;
  teacher: string;
  audioBase: string;
  groups: PremiumKaraokeGroup[];
};

type WordTiming = {
  text: string;
  offset: number;
  duration: number;
};

type Props = {
  lesson: PremiumKaraokeLesson;
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

    audio.volume = 0.82;
    void audio.play();
  } catch {
    // تبقى التغذية البصرية فعالة.
  }
}

export default function PremiumFourByFourKaraokeV2({
  lesson,
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

  const [finished, setFinished] =
    useState(false);

  const [timings, setTimings] =
    useState<WordTiming[]>([]);

  const [activeWord, setActiveWord] =
    useState(-1);

  const [shownWordCount, setShownWordCount] =
    useState(0);

  const audioRef =
    useRef<HTMLAudioElement | null>(null);

  const group = lesson.groups[groupIndex];
  const variant = group.variants[variantIndex];

  function stopNarration() {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }

    setActiveWord(-1);
    setShownWordCount(0);
  }

  useEffect(() => {
    stopNarration();
    setTimings([]);

    const timer = window.setTimeout(() => {
      void playNarration();
    }, 600);

    return () => {
      window.clearTimeout(timer);
      stopNarration();
    };
  }, [groupIndex, variantIndex]);

  async function playNarration() {
    stopNarration();

    try {
      const response = await fetch(
        `${lesson.audioBase}/${variant.audioKey}.json`,
      );

      const data = (
        await response.json()
      ) as WordTiming[];

      setTimings(data);

      const audio = new Audio(
        `${lesson.audioBase}/${variant.audioKey}.mp3`,
      );

      audioRef.current = audio;

      audio.ontimeupdate = () => {
        const current = audio.currentTime * 1000;

        const index = data.findIndex(
          (word) =>
            current >= word.offset &&
            current <
              word.offset + word.duration,
        );

        setActiveWord(index);

        let revealedCount = 0;

        for (
          let wordIndex = 0;
          wordIndex < data.length;
          wordIndex += 1
        ) {
          if (
            current >=
            Number(
              data[wordIndex].offset,
            )
          ) {
            revealedCount =
              wordIndex + 1;
          }
        }

        setShownWordCount(
          revealedCount,
        );
      };

      audio.onended = () => {
        setActiveWord(-1);
        setShownWordCount(
          data.length,
        );
      };

      await audio.play();
    } catch {
      setActiveWord(-1);

      setShownWordCount(
        variant.prompt
          .trim()
          .split(/\s+/)
          .filter(Boolean)
          .length,
      );
    }
  }

  function moveNext() {
    if (
      variantIndex <
      group.variants.length - 1
    ) {
      setVariantIndex((value) => value + 1);
      setSelected(null);
      setFeedback("idle");
      return;
    }

    if (
      groupIndex <
      lesson.groups.length - 1
    ) {
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
      window.setTimeout(moveNext, 900);
      return;
    }

    setFeedback("wrong");
    playFeedback(false);

    window.setTimeout(() => {
      setSelected(null);
      setFeedback("idle");
    }, 700);
  }

  const karaokeWords =
    timings.length > 0
      ? timings.map(
          word => word.text,
        )
      : variant.prompt
          .trim()
          .split(/\s+/)
          .filter(Boolean);

  if (finished) {
    return (
      <main className="premium44-page" dir="rtl">
        <section className="premium44-complete">
          <div className="premium44-trophy">
            🏆
          </div>

          <h1>أَحْسَنْتَ!</h1>

          <p>
            أَتْقَنْتَ تَمَارِينَ {lesson.title}
          </p>

          <div className="premium44-complete-actions">
            <Link to={lessonPath}>
              العودة إلى الدرس
            </Link>

            <Link to={nextPath}>
              {nextLabel}
            </Link>
          </div>
        </section>

        <PremiumStyles />
      </main>
    );
  }

  return (
    <main className="premium44-page" dir="rtl">
      <section className="premium44-shell">
        <header className="premium44-header">
          <div className="premium44-counter">
            {variantIndex + 1} / 4
          </div>

          <div className="premium44-stars">
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
            className="premium44-audio"
            onClick={playNarration}
            aria-label="تشغيل صوت الأستاذ"
          >
            🔊
          </button>
        </header>

        <div className="premium44-progress">
          {lesson.groups.map((_, index) => (
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

        <div className="premium44-teacher">
          {lesson.teacher}
        </div>

        <div className="premium44-mission">
          ⭐ التمرين {groupIndex + 1}:{" "}
          {group.title}
        </div>

        <section className="premium44-card">
          <div className="premium44-karaoke">
              <UnifiedExerciseKaraokeV2
                words={karaokeWords}
                activeIndex={
                  activeWord
                }
                shownWordCount={
                  shownWordCount
                }
              />
            </div>

          <Visual visual={variant.visual} />
        </section>

        <section
          className={`premium44-options options-${
            variant.options.length
          }`}
        >
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
          className={`premium44-feedback ${feedback}`}
          aria-live="polite"
        >
          {feedback === "correct" &&
            "مُمْتَازٌ! إِجَابَةٌ صَحِيحَةٌ 🎉"}

          {feedback === "wrong" &&
            "حَاوِلْ مَرَّةً أُخْرَى"}
        </div>
      </section>

      <PremiumStyles />
    </main>
  );
}

function Visual({
  visual,
}: {
  visual: PremiumKaraokeVisual;
}) {
  if (visual.kind === "equation") {
    return (
      <div className="premium44-equation">
        {visual.expression}
      </div>
    );
  }

  if (visual.kind === "emoji") {
    return (
      <div className="premium44-emoji">
        <span>{visual.emoji}</span>
        <strong>{visual.label}</strong>
      </div>
    );
  }

  if (visual.kind === "stars") {
    return (
      <div className="premium44-star-grid">
        {Array.from(
          { length: visual.count },
          (_, index) => (
            <span key={index}>★</span>
          ),
        )}
      </div>
    );
  }

  if (visual.kind === "base10") {
    return (
      <div className="premium44-base10">
        <div className="premium44-tens">
          {Array.from(
            { length: visual.tens },
            (_, index) => (
              <div
                className="premium44-ten-bar"
                key={index}
              >
                {Array.from(
                  { length: 10 },
                  (_, cell) => (
                    <span key={cell} />
                  ),
                )}
              </div>
            ),
          )}
        </div>

        <div className="premium44-ones">
          {Array.from(
            { length: visual.ones },
            (_, index) => (
              <span key={index} />
            ),
          )}
        </div>
      </div>
    );
  }

  if (visual.kind === "exchange") {
    return (
      <div className="premium44-exchange">
        <div>
          {visual.units}
          <small>وَحْدَةً</small>
        </div>

        <span>⇄</span>

        <div>
          {visual.tens}
          <small>عَشَرَةً</small>
        </div>
      </div>
    );
  }

  return (
    <div className="premium44-bridge">
      <div className="premium44-equation">
        {visual.expression}
      </div>

      <div className="premium44-ten-frame">
        {Array.from(
          { length: visual.target },
          (_, index) => (
            <span
              key={index}
              className={
                index < visual.filled
                  ? "filled"
                  : ""
              }
            >
              {index < visual.filled ? "●" : ""}
            </span>
          ),
        )}
      </div>
    </div>
  );
}

function PremiumStyles() {
  return (
    <style>{`
      .premium44-page {
        min-height: 100vh;
        box-sizing: border-box;
        padding: 15px 11px 105px;
        color: #17375e;
        background:
          radial-gradient(circle at top,#fffef8,#fff4d7);
      }

      .premium44-shell {
        width: min(640px,100%);
        margin: 0 auto;
      }

      .premium44-header {
        display: grid;
        grid-template-columns: 66px 1fr 50px;
        align-items: center;
        gap: 8px;
      }

      .premium44-counter,
      .premium44-stars,
      .premium44-audio {
        background: #fff;
        box-shadow: 0 5px 14px rgba(30,52,78,.11);
      }

      .premium44-counter {
        direction: ltr;
        padding: 8px 4px;
        border: 3px solid #e8a918;
        border-radius: 17px;
        text-align: center;
        font-size: 17px;
        font-weight: 900;
      }

      .premium44-stars {
        padding: 8px;
        border-radius: 18px;
        text-align: center;
        letter-spacing: 4px;
      }

      .premium44-stars span {
        color: #e5e1d8;
        font-size: 19px;
      }

      .premium44-stars span.active {
        color: #ffd026;
      }

      .premium44-audio {
        width: 47px;
        height: 47px;
        border: 3px solid #fff;
        border-radius: 50%;
        background: #efa91b;
        font-size: 18px;
      }

      .premium44-progress {
        display: flex;
        justify-content: center;
        gap: 7px;
        margin: 13px 0 6px;
      }

      .premium44-progress span {
        width: 16px;
        height: 9px;
        border-radius: 10px;
        background: #e4d8b9;
      }

      .premium44-progress span.current {
        width: 46px;
        background: #e9ac1c;
      }

      .premium44-progress span.done {
        background: #27a86e;
      }

      .premium44-teacher {
        text-align: center;
        color: #65758b;
        font-size: 13px;
        font-weight: 800;
      }

      .premium44-mission {
        width: fit-content;
        margin: 8px auto 12px;
        padding: 8px 15px;
        border: 3px solid #e9ac1c;
        border-radius: 20px;
        background: #fff;
        font-size: 16px;
        font-weight: 900;
      }

      .premium44-card {
        padding: 16px 13px;
        border: 4px solid #e5a715;
        border-radius: 28px;
        background: #fff;
        box-shadow: 0 7px 20px rgba(31,50,73,.08);
        text-align: center;
      }

      .premium44-karaoke {
        min-height: 62px;
        font-size: clamp(20px,5vw,26px);
        font-weight: 900;
        line-height: 1.75;
      }

      .premium44-karaoke span {
        display: inline;
        padding: 2px 3px;
        border-radius: 7px;
        transition: .12s;
      }

      .premium44-karaoke span.active {
        background: #ffe072;
        color: #145b98;
        transform: scale(1.06);
      }

      .premium44-equation {
        direction: ltr;
        white-space: pre-line;
        margin: 15px auto 1px;
        padding: 14px 9px;
        border-radius: 20px;
        background: #fff3c8;
        font-size: clamp(27px,7vw,42px);
        font-weight: 900;
      }

      .premium44-emoji {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 13px;
        margin: 15px auto 1px;
        padding: 13px;
        border-radius: 22px;
        background: #eef8ff;
        font-size: 23px;
      }

      .premium44-emoji span {
        font-size: 62px;
      }

      .premium44-star-grid {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 7px;
        margin-top: 15px;
        padding: 12px;
        border-radius: 21px;
        background: #f2fbf8;
      }

      .premium44-star-grid span {
        color: #15977b;
        font-size: 23px;
      }

      .premium44-base10 {
        direction: ltr;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        gap: 17px;
        margin-top: 15px;
      }

      .premium44-tens {
        display: flex;
        gap: 6px;
      }

      .premium44-ten-bar {
        display: grid;
        grid-template-columns: repeat(2,15px);
        gap: 2px;
        padding: 5px;
        border-radius: 10px;
        background: #f6c548;
      }

      .premium44-ten-bar span {
        width: 13px;
        height: 13px;
        border-radius: 4px;
        background: #fff4bd;
      }

      .premium44-ones {
        display: grid;
        grid-template-columns: repeat(4,20px);
        gap: 6px;
      }

      .premium44-ones span {
        width: 19px;
        height: 19px;
        border-radius: 50%;
        background: #ef8d37;
        box-shadow: inset 0 -2px 0 rgba(0,0,0,.12);
      }

      .premium44-exchange {
        direction: ltr;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 18px;
        margin-top: 15px;
      }

      .premium44-exchange div {
        display: grid;
        place-items: center;
        width: 95px;
        min-height: 82px;
        border-radius: 22px;
        background: #eef8ff;
        font-size: 32px;
        font-weight: 900;
      }

      .premium44-exchange small {
        font-size: 14px;
      }

      .premium44-exchange > span {
        font-size: 34px;
        color: #e6a416;
      }

      .premium44-ten-frame {
        direction: ltr;
        display: grid;
        grid-template-columns: repeat(5,39px);
        justify-content: center;
        gap: 6px;
        margin: 17px auto 1px;
      }

      .premium44-ten-frame span {
        display: grid;
        place-items: center;
        width: 35px;
        height: 35px;
        border: 3px solid #ccd6e2;
        border-radius: 11px;
        background: #f8fafc;
        color: #2176d2;
        font-size: 23px;
      }

      .premium44-ten-frame span.filled {
        border-color: #4b91dc;
        background: #e8f3ff;
      }

      .premium44-options {
        display: grid;
        grid-template-columns: repeat(2,minmax(0,1fr));
        gap: 10px;
        margin-top: 13px;
      }

      .premium44-options.options-3
      button:last-child {
        grid-column: 1 / -1;
        width: calc(50% - 5px);
        justify-self: center;
      }

      .premium44-options button {
        min-height: 62px;
        padding: 9px 7px;
        border: 4px solid #e4a715;
        border-radius: 20px;
        background: #fff;
        color: #17375e;
        font-size: 17px;
        font-weight: 900;
        box-shadow: 0 5px 12px rgba(25,48,72,.08);
      }

      .premium44-options button span {
        display: block;
        margin-bottom: 2px;
        font-size: 29px;
      }

      .premium44-options button.correct {
        border-color: #22a66c;
        background: #dff7e9;
        color: #137647;
      }

      .premium44-options button.wrong {
        border-color: #e54b4b;
        background: #ffe5e5;
        color: #b92323;
        animation: premium44Shake .3s ease;
      }

      .premium44-feedback {
        min-height: 29px;
        margin-top: 11px;
        text-align: center;
        font-size: 17px;
        font-weight: 900;
      }

      .premium44-feedback.correct {
        color: #198754;
      }

      .premium44-feedback.wrong {
        color: #cf3030;
      }

      .premium44-complete {
        width: min(520px,100%);
        margin: 55px auto;
        padding: 29px 19px;
        border: 5px solid #e5aa1a;
        border-radius: 31px;
        background: #fff;
        text-align: center;
      }

      .premium44-trophy {
        font-size: 68px;
      }

      .premium44-complete-actions {
        display: flex;
        justify-content: center;
        gap: 9px;
        flex-wrap: wrap;
      }

      .premium44-complete a {
        padding: 10px 17px;
        border-radius: 17px;
        background: #1d7357;
        color: #fff;
        text-decoration: none;
        font-weight: 900;
      }

      @keyframes premium44Shake {
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
      }
    `}</style>
  );
}
