import { useState } from "react";
import { Link } from "react-router-dom";

export type BridgeToTenItem = {
  id: string;
  first: number;
  options: number[];
  correct: number;
  instruction: string;
};

type Props = {
  items: BridgeToTenItem[];
  onComplete?: () => void;
};

type Feedback = "idle" | "correct" | "wrong";

function playTone(correct: boolean) {
  try {
    const AudioContextClass =
      window.AudioContext ||
      (
        window as typeof window & {
          webkitAudioContext?: typeof AudioContext;
        }
      ).webkitAudioContext;

    if (!AudioContextClass) return;

    const context = new AudioContextClass();
    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.frequency.value = correct ? 720 : 210;
    gain.gain.value = 0.06;

    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.16);
  } catch {
    // التغذية البصرية تبقى فعالة عند غياب الصوت.
  }
}

export default function BridgeToTenPremiumV2({
  items,
  onComplete,
}: Props) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<Feedback>("idle");
  const [finished, setFinished] = useState(false);

  const item = items[index];

  function speak() {
    if (!("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(
      `${item.instruction}. ${item.first} زائد كم يساوي عشرة؟`,
    );

    utterance.lang = "ar-DZ";
    utterance.rate = 0.82;
    window.speechSynthesis.speak(utterance);
  }

  function answer(value: number) {
    if (feedback === "correct") return;

    setSelected(value);

    if (value !== item.correct) {
      setFeedback("wrong");
      playTone(false);

      window.setTimeout(() => {
        setSelected(null);
        setFeedback("idle");
      }, 650);

      return;
    }

    setFeedback("correct");
    playTone(true);

    window.setTimeout(() => {
      if (index === items.length - 1) {
        setFinished(true);
        onComplete?.();
        return;
      }

      setIndex((current) => current + 1);
      setSelected(null);
      setFeedback("idle");
    }, 850);
  }

  if (finished) {
    return (
      <main className="bridge-page" dir="rtl">
        <section className="bridge-complete">
          <div className="bridge-trophy">🏆</div>
          <h1>أَحْسَنْتَ!</h1>
          <p>أَتْقَنْتَ الْمُرُورَ إِلَى الْعَشَرَةِ</p>

          <Link to="/lesson-v2/55">
            الدرس التالي
          </Link>
        </section>

        <BridgeStyles />
      </main>
    );
  }

  return (
    <main className="bridge-page" dir="rtl">
      <section className="bridge-shell">
        <header className="bridge-header">
          <div className="bridge-counter">
            {index + 1} / {items.length}
          </div>

          <div className="bridge-stars">
            {items.map((_, starIndex) => (
              <span
                key={starIndex}
                className={starIndex <= index ? "active" : ""}
              >
                ★
              </span>
            ))}
          </div>

          <button
            className="bridge-audio"
            type="button"
            aria-label="تشغيل التعليمة"
            onClick={speak}
          >
            🔊
          </button>
        </header>

        <div className="bridge-progress">
          {items.map((_, progressIndex) => (
            <span
              key={progressIndex}
              className={
                progressIndex < index
                  ? "done"
                  : progressIndex === index
                    ? "current"
                    : ""
              }
            />
          ))}
        </div>

        <div className="bridge-mission">
          ⭐ مهمة بناء العشرة
        </div>

        <section className="bridge-card">
          <h1>{item.instruction}</h1>

          <div className="bridge-equation">
            <strong>{item.first}</strong>
            <span>+</span>
            <strong className="bridge-question">؟</strong>
            <span>=</span>
            <strong>10</strong>
          </div>

          <div className="ten-frame" aria-label="إطار العشرة">
            {Array.from({ length: 10 }, (_, dotIndex) => {
              const filled = dotIndex < item.first;
              const completed =
                feedback === "correct" && !filled;

              return (
                <span
                  key={dotIndex}
                  className={
                    filled
                      ? "filled"
                      : completed
                        ? "completed"
                        : ""
                  }
                >
                  {filled || completed ? "●" : ""}
                </span>
              );
            })}
          </div>

          <p className="bridge-hint">
            كَمْ نُضِيفُ لِنُكَوِّنَ عَشَرَةً؟
          </p>
        </section>

        <section className="bridge-options">
          {item.options.map((value) => {
            const isSelected = selected === value;
            const stateClass = isSelected
              ? feedback
              : "";

            return (
              <button
                key={value}
                type="button"
                className={stateClass}
                onClick={() => answer(value)}
              >
                {value}
              </button>
            );
          })}
        </section>

        <div
          className={`bridge-feedback ${feedback}`}
          aria-live="polite"
        >
          {feedback === "correct" && "مُمْتَازٌ! أَكْمَلْتَ الْعَشَرَةَ 🎉"}
          {feedback === "wrong" && "حَاوِلْ مَرَّةً أُخْرَى"}
        </div>
      </section>

      <BridgeStyles />
    </main>
  );
}

function BridgeStyles() {
  return (
    <style>{`
      .bridge-page {
        min-height: 100vh;
        padding: 18px 14px 100px;
        background:
          radial-gradient(circle at top, #fffef8, #fff4d7);
        color: #17375e;
        box-sizing: border-box;
      }

      .bridge-shell {
        width: min(620px, 100%);
        margin: 0 auto;
      }

      .bridge-header {
        display: grid;
        grid-template-columns: 72px 1fr 58px;
        align-items: center;
        gap: 10px;
      }

      .bridge-counter,
      .bridge-stars,
      .bridge-audio {
        background: #fff;
        box-shadow: 0 6px 18px rgba(30, 52, 78, .11);
      }

      .bridge-counter {
        direction: ltr;
        padding: 9px 5px;
        border: 3px solid #e8a918;
        border-radius: 18px;
        text-align: center;
        font-size: 20px;
        font-weight: 900;
      }

      .bridge-stars {
        padding: 9px 8px;
        border-radius: 20px;
        text-align: center;
        letter-spacing: 4px;
      }

      .bridge-stars span {
        color: #e5e1d8;
        font-size: 22px;
      }

      .bridge-stars span.active {
        color: #ffd026;
      }

      .bridge-audio {
        width: 54px;
        height: 54px;
        border: 3px solid #fff;
        border-radius: 50%;
        background: #efa91b;
        font-size: 23px;
      }

      .bridge-progress {
        display: flex;
        justify-content: center;
        gap: 7px;
        margin: 16px 0;
      }

      .bridge-progress span {
        width: 15px;
        height: 11px;
        border-radius: 10px;
        background: #e4d8b9;
        transition: .25s;
      }

      .bridge-progress span.current {
        width: 45px;
        background: #e9ac1c;
      }

      .bridge-progress span.done {
        background: #27a86e;
      }

      .bridge-mission {
        width: fit-content;
        margin: 0 auto 14px;
        padding: 9px 18px;
        border: 3px solid #e9ac1c;
        border-radius: 22px;
        background: #fff;
        font-size: 18px;
        font-weight: 900;
      }

      .bridge-card {
        padding: 20px 16px;
        border: 4px solid #e5a715;
        border-radius: 30px;
        background: #fff;
        box-shadow: 0 8px 22px rgba(31, 50, 73, .08);
        text-align: center;
      }

      .bridge-card h1 {
        margin: 0 0 18px;
        font-size: clamp(21px, 5vw, 27px);
      }

      .bridge-equation {
        direction: ltr;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 13px;
        font-size: clamp(30px, 8vw, 46px);
      }

      .bridge-question {
        display: grid;
        place-items: center;
        width: 55px;
        height: 55px;
        border-radius: 16px;
        background: #fff3cd;
        color: #dd8f00;
      }

      .ten-frame {
        direction: ltr;
        display: grid;
        grid-template-columns: repeat(5, 48px);
        justify-content: center;
        gap: 8px;
        margin: 24px auto 16px;
      }

      .ten-frame span {
        display: grid;
        place-items: center;
        width: 44px;
        height: 44px;
        border: 3px solid #cdd7e3;
        border-radius: 13px;
        background: #f8fafc;
        color: #2176d2;
        font-size: 30px;
      }

      .ten-frame span.filled {
        border-color: #4b91dc;
        background: #e8f3ff;
      }

      .ten-frame span.completed {
        border-color: #25a66c;
        background: #e7f8ef;
        color: #25a66c;
        animation: bridgePop .35s ease;
      }

      .bridge-hint {
        margin: 12px 0 0;
        font-size: 20px;
        font-weight: 800;
      }

      .bridge-options {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 12px;
        margin-top: 15px;
      }

      .bridge-options button {
        min-height: 70px;
        border: 4px solid #e4a715;
        border-radius: 22px;
        background: #fff;
        color: #17375e;
        font-size: 28px;
        font-weight: 900;
        box-shadow: 0 5px 13px rgba(25, 48, 72, .08);
        transition: transform .15s, background .15s;
      }

      .bridge-options button:active {
        transform: scale(.96);
      }

      .bridge-options button.correct {
        border-color: #22a66c;
        background: #dff7e9;
        color: #137647;
      }

      .bridge-options button.wrong {
        border-color: #e54b4b;
        background: #ffe5e5;
        color: #b92323;
        animation: bridgeShake .3s ease;
      }

      .bridge-feedback {
        min-height: 32px;
        margin-top: 13px;
        text-align: center;
        font-size: 19px;
        font-weight: 900;
      }

      .bridge-feedback.correct { color: #198754; }
      .bridge-feedback.wrong { color: #cf3030; }

      .bridge-complete {
        width: min(520px, 100%);
        margin: 60px auto;
        padding: 34px 22px;
        border: 5px solid #e5aa1a;
        border-radius: 34px;
        background: #fff;
        box-shadow: 0 12px 30px rgba(30, 50, 70, .12);
        text-align: center;
      }

      .bridge-trophy { font-size: 75px; }
      .bridge-complete h1 { font-size: 35px; }
      .bridge-complete p {
        font-size: 21px;
        font-weight: 800;
      }

      .bridge-complete a {
        display: inline-block;
        margin-top: 12px;
        padding: 12px 22px;
        border-radius: 18px;
        background: #1d7357;
        color: #fff;
        text-decoration: none;
        font-weight: 900;
      }

      @keyframes bridgePop {
        50% { transform: scale(1.15); }
      }

      @keyframes bridgeShake {
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
      }

      @media (max-width: 420px) {
        .bridge-page { padding-inline: 10px; }

        .bridge-header {
          grid-template-columns: 65px 1fr 52px;
        }

        .bridge-counter { font-size: 17px; }
        .bridge-audio {
          width: 48px;
          height: 48px;
          font-size: 20px;
        }

        .ten-frame {
          grid-template-columns: repeat(5, 41px);
          gap: 6px;
        }

        .ten-frame span {
          width: 37px;
          height: 37px;
          font-size: 25px;
        }

        .bridge-options button {
          min-height: 60px;
          font-size: 24px;
        }
      }
    `}</style>
  );
}
