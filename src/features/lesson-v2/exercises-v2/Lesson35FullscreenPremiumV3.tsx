import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type Choice = {
  id: string;
  label: string;
  correct: boolean;
};

type Question = {
  id: string;
  mission: string;
  image: string;
  prompt: string;
  helper: string;
  choices: Choice[];
  success: string;
};

const IMAGE_BASE =
  "/lessons/v2/lesson35-amusement-breathing/premium-breathing";

const QUESTIONS: Question[] = [
  {
    id: "stand",
    mission: "مَهَمَّةُ الِاخْتِيَارِ ١",
    image: `${IMAGE_BASE}/s7.webp`,
    prompt: "كَيْفَ أَبْدَأُ تَمْرِينَ التَّنَفُّسِ؟",
    helper: "ألاحظ وضعية الطفل في الصورة.",
    choices: [
      {
        id: "a",
        label: "أَقِفُ بِهُدُوءٍ",
        correct: true,
      },
      {
        id: "b",
        label: "أَجْرِي بِسُرْعَةٍ",
        correct: false,
      },
      {
        id: "c",
        label: "أَقْفِزُ عَالِيًا",
        correct: false,
      },
      {
        id: "d",
        label: "أَصْرُخُ",
        correct: false,
      },
    ],
    success:
      "أَحْسَنْتَ! أَبْدَأُ بِالوُقُوفِ بِهُدُوءٍ.",
  },
  {
    id: "inhale",
    mission: "مَهَمَّةُ الِاخْتِيَارِ ٢",
    image: `${IMAGE_BASE}/s1.webp`,
    prompt:
      "مِنْ أَيْنَ يَدْخُلُ الهَوَاءُ عِنْدَ الشَّهِيقِ؟",
    helper: "أتتبع اتجاه السهم في الصورة.",
    choices: [
      {
        id: "a",
        label: "مِنَ الأَنْفِ",
        correct: true,
      },
      {
        id: "b",
        label: "مِنَ الأُذُنِ",
        correct: false,
      },
      {
        id: "c",
        label: "مِنَ اليَدِ",
        correct: false,
      },
      {
        id: "d",
        label: "مِنَ العَيْنِ",
        correct: false,
      },
    ],
    success:
      "رَائِعٌ! يَدْخُلُ الهَوَاءُ مِنَ الأَنْفِ.",
  },
  {
    id: "hold",
    mission: "مَهَمَّةُ الِاخْتِيَارِ ٣",
    image: `${IMAGE_BASE}/s5.webp`,
    prompt: "مَاذَا أَفْعَلُ بَعْدَ الشَّهِيقِ؟",
    helper: "ألاحظ رمز التوقف القصير.",
    choices: [
      {
        id: "a",
        label: "أَحْبِسُ نَفَسِي قَلِيلًا",
        correct: true,
      },
      {
        id: "b",
        label: "أَحْبِسُ نَفَسِي طَوِيلًا",
        correct: false,
      },
      {
        id: "c",
        label: "أَجْرِي مُبَاشَرَةً",
        correct: false,
      },
      {
        id: "d",
        label: "أَصْرُخُ",
        correct: false,
      },
    ],
    success:
      "مُمْتَازٌ! أَحْبِسُ نَفَسِي قَلِيلًا.",
  },
  {
    id: "exhale",
    mission: "مَهَمَّةُ الِاخْتِيَارِ ٤",
    image: `${IMAGE_BASE}/s4.webp`,
    prompt: "كَيْفَ أُخْرِجُ الهَوَاءَ؟",
    helper: "أتتبع السهم الخارج من الفم.",
    choices: [
      {
        id: "a",
        label: "أَزْفِرُ بِبُطْءٍ",
        correct: true,
      },
      {
        id: "b",
        label: "أَسْتَنْشِقُ مِنَ الأُذُنِ",
        correct: false,
      },
      {
        id: "c",
        label: "أَحْبِسُ نَفَسِي طَوِيلًا",
        correct: false,
      },
      {
        id: "d",
        label: "أَجْرِي",
        correct: false,
      },
    ],
    success:
      "أَحْسَنْتَ! أُخْرِجُ الهَوَاءَ بِبُطْءٍ.",
  },
  {
    id: "clean",
    mission: "مَهَمَّةُ السُّلُوكِ الصِّحِّيِّ ٥",
    image: `${IMAGE_BASE}/s2.webp`,
    prompt: "أَيْنَ أَتَنَفَّسُ هَوَاءً أَفْضَلَ؟",
    helper: "أبحث عن المكان الأخضر والنقي.",
    choices: [
      {
        id: "a",
        label: "فِي مَكَانٍ نَقِيٍّ",
        correct: true,
      },
      {
        id: "b",
        label: "قُرْبَ الدُّخَانِ",
        correct: false,
      },
      {
        id: "c",
        label: "قُرْبَ القُمَامَةِ",
        correct: false,
      },
      {
        id: "d",
        label: "فِي مَكَانٍ مُغْبَرٍّ",
        correct: false,
      },
    ],
    success:
      "أَحْسَنْتَ! أَتَنَفَّسُ فِي مَكَانٍ نَقِيٍّ.",
  },
  {
    id: "smoke",
    mission: "مَهَمَّةُ السُّلُوكِ الصِّحِّيِّ ٦",
    image: `${IMAGE_BASE}/s6.webp`,
    prompt:
      "مَاذَا أَفْعَلُ عِنْدَمَا أَرَى الدُّخَانَ؟",
    helper: "أختار السلوك الذي يحمي تنفسي.",
    choices: [
      {
        id: "a",
        label: "أَبْتَعِدُ عَنْهُ",
        correct: true,
      },
      {
        id: "b",
        label: "أَقْتَرِبُ مِنْهُ",
        correct: false,
      },
      {
        id: "c",
        label: "أَسْتَنْشِقُهُ",
        correct: false,
      },
      {
        id: "d",
        label: "أَبْقَى فِي مَكَانِي",
        correct: false,
      },
    ],
    success:
      "أَحْسَنْتَ! أَبْتَعِدُ عَنِ الدُّخَانِ.",
  },
  {
    id: "water",
    mission: "مَهَمَّةُ السُّلُوكِ الصِّحِّيِّ ٧",
    image: `${IMAGE_BASE}/s8.webp`,
    prompt: "مَاذَا أَشْرَبُ بَعْدَ اللَّعِبِ؟",
    helper: "ألاحظ ما يحمله الطفل.",
    choices: [
      {
        id: "a",
        label: "المَاءَ",
        correct: true,
      },
      {
        id: "b",
        label: "الدُّخَانَ",
        correct: false,
      },
      {
        id: "c",
        label: "الهَوَاءَ",
        correct: false,
      },
      {
        id: "d",
        label: "التُّرَابَ",
        correct: false,
      },
    ],
    success:
      "رَائِعٌ! أَشْرَبُ المَاءَ بَعْدَ اللَّعِبِ.",
  },
  {
    id: "rest",
    mission: "مَهَمَّةُ السُّلُوكِ الصِّحِّيِّ ٨",
    image: `${IMAGE_BASE}/s3.webp`,
    prompt:
      "مَاذَا أَفْعَلُ بَعْدَ النَّشَاطِ وَالتَّعَبِ؟",
    helper: "ألاحظ وضعية الطفل الهادئة.",
    choices: [
      {
        id: "a",
        label: "أَرْتَاحُ قَلِيلًا",
        correct: true,
      },
      {
        id: "b",
        label: "أُوَاصِلُ الجَرْيَ",
        correct: false,
      },
      {
        id: "c",
        label: "أَقْتَرِبُ مِنَ الدُّخَانِ",
        correct: false,
      },
      {
        id: "d",
        label: "أَحْبِسُ نَفَسِي طَوِيلًا",
        correct: false,
      },
    ],
    success:
      "أَحْسَنْتَ! أَرْتَاحُ قَلِيلًا بَعْدَ النَّشَاطِ.",
  },
];

type Result =
  | "idle"
  | "correct"
  | "wrong";

export default function Lesson35FullscreenPremiumV3() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] =
    useState<string | null>(null);
  const [result, setResult] =
    useState<Result>("idle");
  const [completed, setCompleted] =
    useState(false);

  const timerRef =
    useRef<number | null>(null);

  const current = QUESTIONS[index];

  const progress = useMemo(
    () => `${index + 1} / ${QUESTIONS.length}`,
    [index],
  );

  const stopSpeech = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  };

  const speak = () => {
    stopSpeech();

    if (!("speechSynthesis" in window)) {
      return;
    }

    const text = [
      current.mission,
      current.prompt,
      ...current.choices.map(
        (choice) => choice.label,
      ),
    ].join(". ");

    const utterance =
      new SpeechSynthesisUtterance(text);

    utterance.lang = "ar-DZ";
    utterance.rate = 0.86;
    utterance.pitch = 1;

    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    const previousBodyOverflow =
      document.body.style.overflow;

    const previousOverscroll =
      document.body.style.overscrollBehavior;

    const previousHtmlOverflow =
      document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior =
      "none";

    document.documentElement.style.overflow =
      "hidden";

    return () => {
      document.body.style.overflow =
        previousBodyOverflow;

      document.body.style.overscrollBehavior =
        previousOverscroll;

      document.documentElement.style.overflow =
        previousHtmlOverflow;

      stopSpeech();

      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setSelected(null);
    setResult("idle");

    timerRef.current =
      window.setTimeout(() => {
        speak();
      }, 350);

    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }

      stopSpeech();
    };
  }, [index]);

  const choose = (choice: Choice) => {
    if (result !== "idle") {
      return;
    }

    setSelected(choice.id);

    if (!choice.correct) {
      setResult("wrong");

      timerRef.current =
        window.setTimeout(() => {
          setSelected(null);
          setResult("idle");
        }, 850);

      return;
    }

    setResult("correct");

    timerRef.current =
      window.setTimeout(() => {
        if (
          index ===
          QUESTIONS.length - 1
        ) {
          setCompleted(true);
          return;
        }

        setIndex(
          (value) => value + 1,
        );
      }, 1150);
  };

  const restart = () => {
    stopSpeech();
    setCompleted(false);
    setIndex(0);
    setSelected(null);
    setResult("idle");
  };

  if (completed) {
    return (
      <>
        <style>{CSS}</style>

        <div
          className="l35v3-overlay"
          data-build="L35_FULLSCREEN_PREMIUM_V3"
          dir="rtl"
        >
          <section className="l35v3-complete">
            <div className="l35v3-trophy">
              🏆
            </div>

            <div className="l35v3-complete-badge">
              أَتَنَفَّسُ جَيِّدًا
            </div>

            <h1>
              أَحْسَنْتَ يَا بَطَلُ!
            </h1>

            <p>
              أَتْمَمْتَ جَمِيعَ مَهَامِّ
              التَّنَفُّسِ وَالسُّلُوكِ
              الصِّحِّيِّ.
            </p>

            <button
              type="button"
              onClick={restart}
            >
              إِعَادَةُ التَّمَارِينِ
            </button>

            <button
              type="button"
              className="secondary"
              onClick={() =>
                window.history.back()
              }
            >
              العَوْدَةُ إِلَى الدَّرْسِ
            </button>
          </section>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{CSS}</style>

      <div
        className="l35v3-overlay"
        data-build="L35_FULLSCREEN_PREMIUM_V3"
        dir="rtl"
      >
        <div className="l35v3-scroll">
          <header className="l35v3-header">
            <button
              type="button"
              className="l35v3-audio"
              onClick={speak}
              aria-label="إعادة سماع السؤال"
            >
              🔊
            </button>

            <div className="l35v3-progress">
              {QUESTIONS.map(
                (_, questionIndex) => (
                  <span
                    key={questionIndex}
                    className={
                      questionIndex < index
                        ? "done"
                        : questionIndex === index
                          ? "active"
                          : ""
                    }
                  />
                ),
              )}
            </div>

            <div
              className="l35v3-count"
              dir="ltr"
            >
              {progress}
            </div>
          </header>

          <div className="l35v3-mission">
            <span>⭐</span>
            {current.mission}
          </div>

          <main className="l35v3-card">
            <div className="l35v3-image-frame">
              <img
                src={current.image}
                alt={current.prompt}
                className="l35v3-image"
              />
            </div>

            <section className="l35v3-question">
              <h1>
                {current.prompt}
              </h1>

              <p>
                💡 {current.helper}
              </p>
            </section>

            <section className="l35v3-options">
              {current.choices.map(
                (choice) => {
                  const chosen =
                    selected === choice.id;

                  const stateClass =
                    chosen &&
                    result === "correct"
                      ? "correct"
                      : chosen &&
                          result === "wrong"
                        ? "wrong"
                        : "";

                  return (
                    <button
                      type="button"
                      key={choice.id}
                      className={
                        `l35v3-option ${stateClass}`
                      }
                      onClick={() =>
                        choose(choice)
                      }
                    >
                      {choice.label}
                    </button>
                  );
                },
              )}
            </section>

            {result !== "idle" && (
              <div
                className={
                  `l35v3-feedback ${result}`
                }
                role="status"
              >
                {result === "correct"
                  ? `🌟 ${current.success}`
                  : "حَاوِلْ مَرَّةً أُخْرَى ✨"}
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}

const CSS = `
  .l35v3-overlay {
    position: fixed;
    inset: 0;
    z-index: 2147483000;
    width: 100vw;
    height: 100dvh;
    overflow: hidden;
    background:
      radial-gradient(
        circle at 14% 5%,
        rgba(112,207,255,.28),
        transparent 27%
      ),
      radial-gradient(
        circle at 90% 20%,
        rgba(255,211,85,.25),
        transparent 25%
      ),
      linear-gradient(
        180deg,
        #edf9ff 0%,
        #fff7de 72%,
        #fff0c3 100%
      );
    font-family:
      Tajawal,
      Arial,
      sans-serif;
    color: #102f52;
  }

  .l35v3-scroll {
    width: min(820px, 100%);
    height: 100%;
    margin: 0 auto;
    padding:
      max(12px, env(safe-area-inset-top))
      12px
      max(22px, env(safe-area-inset-bottom));
    overflow-y: auto;
    overscroll-behavior: contain;
    box-sizing: border-box;
  }

  .l35v3-header {
    position: sticky;
    top: 0;
    z-index: 5;
    display: grid;
    grid-template-columns:
      58px 1fr 74px;
    align-items: center;
    gap: 10px;
    padding: 4px 0 12px;
    background:
      linear-gradient(
        180deg,
        rgba(237,249,255,.98),
        rgba(237,249,255,.75),
        transparent
      );
  }

  .l35v3-audio {
    width: 54px;
    height: 54px;
    border: 4px solid #fff;
    border-radius: 50%;
    background: #f1b421;
    font-size: 22px;
    box-shadow:
      0 8px 18px
      rgba(16,47,82,.16);
  }

  .l35v3-progress {
    display: flex;
    justify-content: center;
    gap: 7px;
  }

  .l35v3-progress span {
    width: 13px;
    height: 13px;
    border: 3px solid #fff;
    border-radius: 50%;
    background: #dce8ef;
    box-shadow:
      0 3px 7px
      rgba(16,47,82,.10);
  }

  .l35v3-progress span.active {
    background: #efae18;
    transform: scale(1.18);
  }

  .l35v3-progress span.done {
    background: #22a767;
  }

  .l35v3-count {
    padding: 10px 11px;
    border-radius: 18px;
    background: #173f70;
    color: #fff;
    text-align: center;
    font-size: 18px;
    font-weight: 900;
    box-shadow:
      0 8px 18px
      rgba(16,47,82,.16);
  }

  .l35v3-mission {
    width: fit-content;
    max-width: calc(100% - 30px);
    margin: 2px auto 13px;
    padding: 10px 20px;
    border: 3px solid #dfa51f;
    border-radius: 999px;
    background: rgba(255,255,255,.96);
    color: #173f70;
    font-size:
      clamp(17px, 4.4vw, 23px);
    font-weight: 950;
    text-align: center;
    box-shadow:
      0 9px 20px
      rgba(16,47,82,.10);
  }

  .l35v3-mission span {
    margin-left: 8px;
  }

  .l35v3-card {
    padding: 10px 10px 20px;
    border:
      3px solid
      rgba(255,255,255,.85);
    border-radius: 30px;
    background:
      rgba(255,255,255,.42);
    box-shadow:
      0 18px 38px
      rgba(16,47,82,.11);
    backdrop-filter: blur(7px);
  }

  .l35v3-image-frame {
    overflow: hidden;
    border: 5px solid #dfa51f;
    border-radius: 26px;
    background: #fff;
    box-shadow:
      0 10px 24px
      rgba(16,47,82,.13);
  }

  .l35v3-image {
    display: block;
    width: 100%;
    height: auto;
    max-height:
      min(54dvh, 610px);
    object-fit: contain;
    background: #fff;
  }

  .l35v3-question {
    margin-top: 12px;
    padding: 15px 14px 12px;
    border: 3px solid #dfa51f;
    border-radius: 23px;
    background: #fff;
    text-align: center;
    box-shadow:
      0 8px 18px
      rgba(16,47,82,.08);
  }

  .l35v3-question h1 {
    margin: 0;
    color: #102f52;
    font-size:
      clamp(22px, 5.8vw, 34px);
    font-weight: 950;
    line-height: 1.55;
  }

  .l35v3-question p {
    margin: 7px 0 0;
    color: #56728b;
    font-size:
      clamp(14px, 3.6vw, 18px);
    font-weight: 800;
    line-height: 1.55;
  }

  .l35v3-options {
    display: grid;
    grid-template-columns:
      repeat(2, minmax(0, 1fr));
    gap: 12px;
    margin-top: 13px;
  }

  .l35v3-option {
    min-height: 90px;
    padding: 14px 10px;
    border: 4px solid #dfa51f;
    border-radius: 23px;
    background: #fff;
    color: #102f52;
    font-family:
      Tajawal,
      Arial,
      sans-serif;
    font-size:
      clamp(20px, 5vw, 29px);
    font-weight: 950;
    line-height: 1.45;
    box-shadow:
      0 8px 18px
      rgba(16,47,82,.08);
    transition:
      transform .18s ease,
      background .18s ease,
      border-color .18s ease;
  }

  .l35v3-option:active {
    transform: scale(.98);
  }

  .l35v3-option.correct {
    border-color: #20a667;
    background: #dff8ea;
    color: #0d6238;
    animation:
      l35v3-pop .38s ease;
  }

  .l35v3-option.wrong {
    border-color: #df5b52;
    background: #fde9e7;
    color: #9e3029;
    animation:
      l35v3-shake .35s ease;
  }

  .l35v3-feedback {
    margin-top: 13px;
    padding: 13px 14px;
    border: 4px solid #fff;
    border-radius: 20px;
    color: #fff;
    text-align: center;
    font-size:
      clamp(17px, 4.5vw, 23px);
    font-weight: 950;
    line-height: 1.5;
    box-shadow:
      0 12px 25px
      rgba(16,47,82,.15);
  }

  .l35v3-feedback.correct {
    background: #20a667;
  }

  .l35v3-feedback.wrong {
    background: #df5b52;
  }

  .l35v3-complete {
    position: absolute;
    inset:
      50% auto auto 50%;
    width:
      min(
        620px,
        calc(100% - 28px)
      );
    padding: 29px 20px;
    border: 5px solid #fff;
    border-radius: 34px;
    background:
      rgba(255,255,255,.96);
    transform:
      translate(-50%, -50%);
    text-align: center;
    box-shadow:
      0 22px 50px
      rgba(16,47,82,.17);
  }

  .l35v3-trophy {
    font-size: 78px;
  }

  .l35v3-complete-badge {
    width: fit-content;
    margin: 5px auto 10px;
    padding: 8px 16px;
    border-radius: 999px;
    background: #173f70;
    color: #fff;
    font-weight: 900;
  }

  .l35v3-complete h1 {
    margin: 8px 0;
    color: #102f52;
    font-size:
      clamp(29px, 8vw, 44px);
  }

  .l35v3-complete p {
    color: #56728b;
    font-size:
      clamp(17px, 4.5vw, 22px);
    font-weight: 800;
    line-height: 1.7;
  }

  .l35v3-complete button {
    width: 100%;
    min-height: 61px;
    margin-top: 11px;
    border: 0;
    border-radius: 20px;
    background: #efae18;
    color: #fff;
    font-family:
      Tajawal,
      Arial,
      sans-serif;
    font-size: 21px;
    font-weight: 950;
  }

  .l35v3-complete button.secondary {
    background: #173f70;
  }

  @keyframes l35v3-pop {
    0% {
      transform: scale(.96);
    }

    70% {
      transform: scale(1.025);
    }

    100% {
      transform: scale(1);
    }
  }

  @keyframes l35v3-shake {
    0%,
    100% {
      transform: translateX(0);
    }

    25% {
      transform: translateX(-6px);
    }

    50% {
      transform: translateX(6px);
    }

    75% {
      transform: translateX(-4px);
    }
  }

  @media (max-width: 560px) {
    .l35v3-scroll {
      padding-left: 8px;
      padding-right: 8px;
    }

    .l35v3-header {
      grid-template-columns:
        55px 1fr 68px;
    }

    .l35v3-progress {
      gap: 4px;
    }

    .l35v3-progress span {
      width: 10px;
      height: 10px;
      border-width: 2px;
    }

    .l35v3-card {
      padding: 8px 8px 17px;
      border-radius: 25px;
    }

    .l35v3-image-frame {
      border-radius: 22px;
    }

    .l35v3-image {
      max-height: 49dvh;
    }

    .l35v3-options {
      gap: 9px;
    }

    .l35v3-option {
      min-height: 80px;
      border-width: 3px;
      border-radius: 20px;
    }
  }
`;
