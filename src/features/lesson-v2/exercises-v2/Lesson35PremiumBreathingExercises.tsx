import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";

type Option = {
  id: string;
  label: string;
  image: string;
};

type Question = {
  key: string;
  prompt: string;
  helper: string;
  options: Option[];
  correct: string;
  success: string;
};

type Mission = {
  title: string;
  subtitle: string;
  questions: Question[];
};

const IMAGE_BASE =
  "/lessons/v2/lesson35-amusement-breathing/premium-breathing";

const AUDIO_BASE =
  "/audio/teachers/taline/lesson_35_amusement_breathing/exercises";

const IMAGES = {
  inhale: `${IMAGE_BASE}/s1.webp`,
  clean: `${IMAGE_BASE}/s2.webp`,
  rest: `${IMAGE_BASE}/s3.webp`,
  exhale: `${IMAGE_BASE}/s4.webp`,
  hold: `${IMAGE_BASE}/s5.webp`,
  smoke: `${IMAGE_BASE}/s6.webp`,
  stand: `${IMAGE_BASE}/s7.webp`,
  water: `${IMAGE_BASE}/s8.webp`,
};

const C = {
  navy: "#123A66",
  navyDeep: "#0C294A",
  gold: "#E4A21B",
  green: "#20A667",
  greenSoft: "#DFF8EA",
  red: "#DF5B52",
  redSoft: "#FDE9E7",
};

const MISSIONS: Mission[] = [
  {
    title: "أَتَعَرَّفُ خُطُوَاتِ التَّنَفُّسِ",
    subtitle:
      "ألاحظ الصورة ثم أختار الخطوة المطلوبة.",
    questions: [
      {
        key: "ex1_q1",
        prompt: "أَيُّ صُورَةٍ تُمَثِّلُ الوُقُوفَ بِهُدُوءٍ؟",
        helper: "أبدأ التمرين بجسم مستقيم وهادئ.",
        options: [
          { id: "stand", label: "أَقِفُ بِهُدُوءٍ", image: IMAGES.stand },
          { id: "smoke", label: "أَبْتَعِدُ عَنِ الدُّخَانِ", image: IMAGES.smoke },
          { id: "rest", label: "أَرْتَاحُ بَعْدَ اللَّعِبِ", image: IMAGES.rest },
        ],
        correct: "stand",
        success: "أحسنت، أقف بهدوء أولًا.",
      },
      {
        key: "ex1_q2",
        prompt: "أَيُّ صُورَةٍ تُمَثِّلُ الشَّهِيقَ مِنَ الأَنْفِ؟",
        helper: "أبحث عن السهم الذي يدخل إلى الأنف.",
        options: [
          { id: "inhale", label: "شَهِيقٌ مِنَ الأَنْفِ", image: IMAGES.inhale },
          { id: "exhale", label: "زَفِيرٌ بِبُطْءٍ", image: IMAGES.exhale },
          { id: "hold", label: "أَحْبِسُ نَفَسِي قَلِيلًا", image: IMAGES.hold },
        ],
        correct: "inhale",
        success: "أحسنت، في الشهيق يدخل الهواء من الأنف.",
      },
      {
        key: "ex1_q3",
        prompt: "أَيُّ صُورَةٍ تُمَثِّلُ حَبْسَ النَّفَسِ قَلِيلًا؟",
        helper: "لا يدخل الهواء ولا يخرج مدة قصيرة.",
        options: [
          { id: "hold", label: "أَحْبِسُ نَفَسِي قَلِيلًا", image: IMAGES.hold },
          { id: "inhale", label: "شَهِيقٌ مِنَ الأَنْفِ", image: IMAGES.inhale },
          { id: "exhale", label: "زَفِيرٌ بِبُطْءٍ", image: IMAGES.exhale },
        ],
        correct: "hold",
        success: "أحسنت، أثبت قليلًا وأحبس نفسي مدة قصيرة.",
      },
      {
        key: "ex1_q4",
        prompt: "أَيُّ صُورَةٍ تُمَثِّلُ الزَّفِيرَ بِبُطْءٍ؟",
        helper: "أبحث عن السهم الذي يخرج من الفم.",
        options: [
          { id: "exhale", label: "زَفِيرٌ بِبُطْءٍ", image: IMAGES.exhale },
          { id: "hold", label: "أَحْبِسُ نَفَسِي قَلِيلًا", image: IMAGES.hold },
          { id: "inhale", label: "شَهِيقٌ مِنَ الأَنْفِ", image: IMAGES.inhale },
        ],
        correct: "exhale",
        success: "أحسنت، في الزفير أخرج الهواء ببطء.",
      },
    ],
  },
  {
    title: "أُرَتِّبُ خُطُوَاتِ التَّنَفُّسِ",
    subtitle:
      "أحدد الخطوة التي تأتي قبل الأخرى أو بعدها.",
    questions: [
      {
        key: "ex2_q1",
        prompt: "بَعْدَ أَنْ أَقِفَ بِهُدُوءٍ، مَاذَا أَفْعَلُ؟",
        helper: "أبدأ بإدخال الهواء.",
        options: [
          { id: "inhale", label: "أَسْتَنْشِقُ مِنَ الأَنْفِ", image: IMAGES.inhale },
          { id: "water", label: "أَشْرَبُ المَاءَ", image: IMAGES.water },
          { id: "smoke", label: "أَقْتَرِبُ مِنَ الدُّخَانِ", image: IMAGES.smoke },
        ],
        correct: "inhale",
        success: "أحسنت، بعد الوقوف أستنشق من الأنف.",
      },
      {
        key: "ex2_q2",
        prompt: "بَعْدَ الشَّهِيقِ، مَاذَا أَفْعَلُ؟",
        helper: "أثبت قليلًا قبل إخراج الهواء.",
        options: [
          { id: "hold", label: "أَحْبِسُ نَفَسِي قَلِيلًا", image: IMAGES.hold },
          { id: "exhale", label: "أَزْفِرُ مُبَاشَرَةً", image: IMAGES.exhale },
          { id: "rest", label: "أَجْلِسُ عَلَى المَقْعَدِ", image: IMAGES.rest },
        ],
        correct: "hold",
        success: "أحسنت، بعد الشهيق أحبس نفسي قليلًا.",
      },
      {
        key: "ex2_q3",
        prompt: "بَعْدَ حَبْسِ النَّفَسِ قَلِيلًا، مَاذَا أَفْعَلُ؟",
        helper: "أخرج الهواء بهدوء.",
        options: [
          { id: "exhale", label: "أَزْفِرُ بِبُطْءٍ", image: IMAGES.exhale },
          { id: "inhale", label: "أَسْتَنْشِقُ مَرَّةً أُخْرَى", image: IMAGES.inhale },
          { id: "smoke", label: "أَقِفُ قُرْبَ الدُّخَانِ", image: IMAGES.smoke },
        ],
        correct: "exhale",
        success: "أحسنت، بعد حبس النفس أزفر ببطء.",
      },
      {
        key: "ex2_q4",
        prompt: "مَا الخُطْوَةُ الأُولَى فِي التَّمْرِينِ؟",
        helper: "أهيئ جسمي قبل الشهيق.",
        options: [
          { id: "stand", label: "أَقِفُ بِهُدُوءٍ", image: IMAGES.stand },
          { id: "exhale", label: "أَزْفِرُ بِبُطْءٍ", image: IMAGES.exhale },
          { id: "water", label: "أَشْرَبُ المَاءَ", image: IMAGES.water },
        ],
        correct: "stand",
        success: "أحسنت، الخطوة الأولى هي الوقوف بهدوء.",
      },
    ],
  },
  {
    title: "أَخْتَارُ السُّلُوكَ الصِّحِّيَّ",
    subtitle:
      "أستعمل الصور لاختيار ما يحافظ على تنفسي.",
    questions: [
      {
        key: "ex3_q1",
        prompt: "أَيْنَ أَتَنَفَّسُ هَوَاءً نَقِيًّا؟",
        helper: "أختار مكانًا أخضر وهادئًا.",
        options: [
          { id: "clean", label: "فِي مَكَانٍ نَقِيٍّ", image: IMAGES.clean },
          { id: "smoke", label: "قُرْبَ الدُّخَانِ", image: IMAGES.smoke },
          { id: "hold", label: "أَحْبِسُ نَفَسِي", image: IMAGES.hold },
        ],
        correct: "clean",
        success: "أحسنت، أتنفس في مكان نقي.",
      },
      {
        key: "ex3_q2",
        prompt: "مَاذَا أَفْعَلُ عِنْدَمَا أَرَى دُخَانًا؟",
        helper: "أحمي أنفي ورئتيّ بالابتعاد.",
        options: [
          { id: "smoke", label: "أَبْتَعِدُ عَنِ الدُّخَانِ", image: IMAGES.smoke },
          { id: "clean", label: "أَبْقَى فِي المَكَانِ", image: IMAGES.clean },
          { id: "inhale", label: "أَسْتَنْشِقُ بِقُوَّةٍ", image: IMAGES.inhale },
        ],
        correct: "smoke",
        success: "أحسنت، أبتعد عن الدخان.",
      },
      {
        key: "ex3_q3",
        prompt: "مَاذَا أَفْعَلُ بَعْدَ اللَّعِبِ وَالتَّعَبِ؟",
        helper: "أهدأ حتى يعود تنفسي منتظمًا.",
        options: [
          { id: "rest", label: "أَرْتَاحُ بَعْدَ اللَّعِبِ", image: IMAGES.rest },
          { id: "smoke", label: "أَقْتَرِبُ مِنَ الدُّخَانِ", image: IMAGES.smoke },
          { id: "stand", label: "أَجْرِي مِنْ جَدِيدٍ", image: IMAGES.stand },
        ],
        correct: "rest",
        success: "أحسنت، أرتاح بعد اللعب.",
      },
      {
        key: "ex3_q4",
        prompt: "مَاذَا أَشْرَبُ بَعْدَ النَّشَاطِ؟",
        helper: "أختار ما يرطب جسمي.",
        options: [
          { id: "water", label: "أَشْرَبُ المَاءَ", image: IMAGES.water },
          { id: "smoke", label: "أَسْتَنْشِقُ الدُّخَانَ", image: IMAGES.smoke },
          { id: "hold", label: "أَحْبِسُ نَفَسِي طَوِيلًا", image: IMAGES.hold },
        ],
        correct: "water",
        success: "أحسنت، أشرب الماء بعد النشاط.",
      },
    ],
  },
  {
    title: "أُطَبِّقُ مَا تَعَلَّمْتُ",
    subtitle:
      "أحل مواقف بسيطة من عالم الألعاب.",
    questions: [
      {
        key: "ex4_q1",
        prompt: "أَرَادَ الطِّفْلُ بَدْءَ تَمْرِينِ التَّنَفُّسِ. مَاذَا يَفْعَلُ أَوَّلًا؟",
        helper: "أفكر في بداية التسلسل.",
        options: [
          { id: "stand", label: "يَقِفُ بِهُدُوءٍ", image: IMAGES.stand },
          { id: "exhale", label: "يَزْفِرُ أَوَّلًا", image: IMAGES.exhale },
          { id: "water", label: "يَشْرَبُ المَاءَ", image: IMAGES.water },
        ],
        correct: "stand",
        success: "أحسنت، يبدأ بالوقوف بهدوء.",
      },
      {
        key: "ex4_q2",
        prompt: "اسْتَنْشَقَ الطِّفْلُ مِنْ أَنْفِهِ. مَا الخُطْوَةُ التَّالِيَةُ؟",
        helper: "أتذكر ترتيب الخطوات.",
        options: [
          { id: "hold", label: "يَحْبِسُ نَفَسَهُ قَلِيلًا", image: IMAGES.hold },
          { id: "smoke", label: "يَقْتَرِبُ مِنَ الدُّخَانِ", image: IMAGES.smoke },
          { id: "water", label: "يَشْرَبُ المَاءَ", image: IMAGES.water },
        ],
        correct: "hold",
        success: "أحسنت، يحبس نفسه قليلًا.",
      },
      {
        key: "ex4_q3",
        prompt: "رَأَى الطِّفْلُ دُخَانًا فِي عَالَمِ المَرَحِ. مَاذَا يَفْعَلُ؟",
        helper: "أختار السلوك الآمن.",
        options: [
          { id: "smoke", label: "يَبْتَعِدُ عَنِ الدُّخَانِ", image: IMAGES.smoke },
          { id: "inhale", label: "يَسْتَنْشِقُ الدُّخَانَ", image: IMAGES.inhale },
          { id: "stand", label: "يَقِفُ فِي مَكَانِهِ", image: IMAGES.stand },
        ],
        correct: "smoke",
        success: "أحسنت، يبتعد عن الدخان.",
      },
      {
        key: "ex4_q4",
        prompt: "بَعْدَ الجَرْيِ وَاللَّعِبِ، مَا الخِيَارُ الأَفْضَلُ؟",
        helper: "أجمع بين الهدوء والعناية بالجسم.",
        options: [
          { id: "rest", label: "أَرْتَاحُ وَأَتَنَفَّسُ بِهُدُوءٍ", image: IMAGES.rest },
          { id: "smoke", label: "أَقْتَرِبُ مِنَ الدُّخَانِ", image: IMAGES.smoke },
          { id: "hold", label: "أَحْبِسُ نَفَسِي طَوِيلًا", image: IMAGES.hold },
        ],
        correct: "rest",
        success: "أحسنت، أرتاح وأتنفس بهدوء.",
      },
    ],
  },
];

function Progress({
  missionIndex,
  questionIndex,
}: {
  missionIndex: number;
  questionIndex: number;
}) {
  return (
    <div style={styles.progress}>
      {MISSIONS.map((_, index) => (
        <span
          key={index}
          style={{
            ...styles.progressDot,
            background:
              index < missionIndex
                ? C.green
                : index === missionIndex
                  ? C.gold
                  : "#FFFFFF",
          }}
        />
      ))}
      <strong style={styles.counter}>
        <span dir="ltr">{questionIndex + 1} / 4</span>
      </strong>
    </div>
  );
}

function Completed({
  restart,
}: {
  restart: () => void;
}) {
  return (
    <main dir="rtl" style={styles.page}>
      <div style={styles.completeCard}>
        <div style={styles.completeEmoji}>🌬️</div>
        <div style={styles.premiumBadge}>نسخة Premium</div>
        <h1 style={styles.completeTitle}>أَحْسَنْتَ يَا بَطَلُ!</h1>
        <p style={styles.completeText}>
          تعلمت خطوات التنفس الصحيح، واخترت السلوك الذي يحافظ على صحتك.
        </p>

        <div style={styles.summary}>
          <strong>التسلسل الذي تعلمته</strong>
          <span>أقف بهدوء ← أستنشق من الأنف ← أحبس نفسي قليلًا ← أزفر ببطء</span>
        </div>

        <button
          type="button"
          style={styles.primaryButton}
          onClick={restart}
        >
          إعادة التمارين
        </button>

        <button
          type="button"
          style={styles.secondaryButton}
          onClick={() => {
            window.location.href = "/world2-lesson/35";
          }}
        >
          العودة إلى الدرس
        </button>
      </div>
    </main>
  );
}

export default function Lesson35PremiumBreathingExercises() {
  const [missionIndex, setMissionIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [result, setResult] = useState<"idle" | "correct" | "wrong">("idle");
  const [locked, setLocked] = useState(false);
  const [completed, setCompleted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const mission = MISSIONS[missionIndex];
  const question = mission.questions[questionIndex];

  const audioUrl = useMemo(
    () => `${AUDIO_BASE}/${question.key}.mp3`,
    [question.key],
  );

  const playQuestion = () => {
    audioRef.current?.pause();

    const audio = new Audio(audioUrl);
    audioRef.current = audio;
    audio.play().catch(() => {});
  };

  useEffect(() => {
    setSelected(null);
    setResult("idle");
    setLocked(false);

    const timer = window.setTimeout(playQuestion, 420);

    return () => {
      window.clearTimeout(timer);
      audioRef.current?.pause();
    };
  }, [missionIndex, questionIndex]);

  const next = () => {
    if (questionIndex < mission.questions.length - 1) {
      setQuestionIndex((current) => current + 1);
      return;
    }

    if (missionIndex < MISSIONS.length - 1) {
      setMissionIndex((current) => current + 1);
      setQuestionIndex(0);
      return;
    }

    setCompleted(true);
  };

  const answer = (optionId: string) => {
    if (locked) return;

    audioRef.current?.pause();
    setSelected(optionId);

    if (optionId === question.correct) {
      setResult("correct");
      setLocked(true);

      new Audio("/audio/v2_feedback/correct.mp3")
        .play()
        .catch(() => {});

      window.setTimeout(next, 1500);
      return;
    }

    setResult("wrong");

    new Audio("/audio/v2_feedback/retry.mp3")
      .play()
      .catch(() => {});

    window.setTimeout(() => {
      setSelected(null);
      setResult("idle");
    }, 850);
  };

  const restart = () => {
    setMissionIndex(0);
    setQuestionIndex(0);
    setSelected(null);
    setResult("idle");
    setLocked(false);
    setCompleted(false);
  };

  if (completed) {
    return <Completed restart={restart} />;
  }

  return (
    <main dir="rtl" style={styles.page}>
      <div style={styles.background} />

      <section style={styles.content}>
        <header style={styles.topbar}>
          <button
            type="button"
            style={styles.audioButton}
            onClick={playQuestion}
            aria-label="إعادة السؤال"
          >
            🔊
          </button>

          <Progress
            missionIndex={missionIndex}
            questionIndex={questionIndex}
          />
        </header>

        <div style={styles.premiumBadge}>
          النسخة التفاعلية Premium
        </div>

        <div style={styles.missionNumber}>
          المهمة {missionIndex + 1}
        </div>

        <h1 style={styles.title}>{mission.title}</h1>
        <p style={styles.subtitle}>{mission.subtitle}</p>

        <section style={styles.questionBox}>
          {question.prompt}
        </section>

        <div style={styles.helper}>
          💡 {question.helper}
        </div>

        <section style={styles.options}>
          {question.options.map((option) => {
            const chosen = selected === option.id;
            const correct = chosen && result === "correct";
            const wrong = chosen && result === "wrong";

            return (
              <button
                type="button"
                key={option.id}
                disabled={locked}
                onClick={() => answer(option.id)}
                style={{
                  ...styles.optionCard,
                  borderColor:
                    correct
                      ? C.green
                      : wrong
                        ? C.red
                        : "#FFFFFF",
                  background:
                    correct
                      ? C.greenSoft
                      : wrong
                        ? C.redSoft
                        : "#FFFFFF",
                  transform:
                    correct
                      ? "scale(1.025)"
                      : wrong
                        ? "translateX(-5px)"
                        : "none",
                }}
              >
                <img
                  src={option.image}
                  alt={option.label}
                  style={styles.optionImage}
                />
                <strong style={styles.optionLabel}>
                  {option.label}
                </strong>
              </button>
            );
          })}
        </section>
      </section>

      {result !== "idle" && (
        <div
          style={{
            ...styles.feedback,
            background:
              result === "correct"
                ? C.green
                : C.red,
          }}
        >
          {result === "correct"
            ? `🌟 ${question.success}`
            : "حاول مرة أخرى، وانظر جيدًا إلى الصور."}
        </div>
      )}
    </main>
  );
}

const styles: Record<string, CSSProperties> = {
  page: {
    position: "relative",
    minHeight: "100dvh",
    overflowX: "hidden",
    padding: 0,
    background: "#EDF9FF",
    fontFamily: "Tajawal, system-ui, sans-serif",
  },
  background: {
    position: "fixed",
    inset: 0,
    background:
      "radial-gradient(circle at 15% 8%,rgba(98,203,255,.3),transparent 27%),radial-gradient(circle at 90% 25%,rgba(255,212,73,.24),transparent 25%),linear-gradient(180deg,#EAF9FF,#FFF5D7)",
  },
  content: {
    position: "relative",
    zIndex: 2,
    width: "min(900px,100%)",
    margin: "0 auto",
    padding: "14px 12px 130px",
  },
  topbar: {
    display: "grid",
    gridTemplateColumns: "58px 1fr",
    alignItems: "center",
    gap: 12,
  },
  audioButton: {
    width: 54,
    height: 54,
    border: "4px solid #FFFFFF",
    borderRadius: "50%",
    background: C.gold,
    fontSize: 21,
    boxShadow: "0 8px 18px rgba(60,68,89,.18)",
  },
  progress: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
  },
  progressDot: {
    width: 17,
    height: 17,
    border: "3px solid #FFFFFF",
    borderRadius: "50%",
    boxShadow: "0 4px 9px rgba(18,58,102,.12)",
  },
  counter: {
    marginRight: 10,
    padding: "8px 13px",
    borderRadius: 999,
    background: C.navy,
    color: "#FFFFFF",
    fontSize: 17,
  },
  premiumBadge: {
    width: "fit-content",
    margin: "11px auto 5px",
    padding: "7px 16px",
    borderRadius: 999,
    background: "linear-gradient(135deg,#173F70,#245C93)",
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: 950,
    boxShadow: "0 8px 18px rgba(18,58,102,.2)",
  },
  missionNumber: {
    width: "fit-content",
    margin: "8px auto 0",
    padding: "5px 12px",
    border: `2px solid ${C.gold}`,
    borderRadius: 999,
    background: "#FFFFFF",
    color: C.navy,
    fontWeight: 900,
  },
  title: {
    margin: "9px 0 3px",
    color: C.navyDeep,
    fontSize: "clamp(23px,6vw,35px)",
    textAlign: "center",
  },
  subtitle: {
    maxWidth: 700,
    margin: "0 auto 10px",
    color: "#54738F",
    fontSize: "clamp(14px,3.6vw,18px)",
    fontWeight: 800,
    lineHeight: 1.6,
    textAlign: "center",
  },
  questionBox: {
    padding: "13px 14px",
    border: `4px solid ${C.gold}`,
    borderRadius: 23,
    background: "#FFFFFF",
    color: C.navyDeep,
    fontSize: "clamp(19px,4.8vw,27px)",
    fontWeight: 950,
    lineHeight: 1.55,
    textAlign: "center",
    boxShadow: "0 10px 22px rgba(18,58,102,.11)",
  },
  helper: {
    width: "fit-content",
    maxWidth: "100%",
    margin: "9px auto",
    padding: "7px 13px",
    borderRadius: 999,
    background: "rgba(255,255,255,.93)",
    color: C.navy,
    fontSize: "clamp(13px,3.4vw,16px)",
    fontWeight: 850,
    textAlign: "center",
  },
  options: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))",
    gap: 12,
  },
  optionCard: {
    minWidth: 0,
    overflow: "hidden",
    padding: 7,
    border: "4px solid #FFFFFF",
    borderRadius: 25,
    color: C.navyDeep,
    fontFamily: "Tajawal, system-ui, sans-serif",
    boxShadow: "0 12px 25px rgba(18,58,102,.14)",
    transition: "transform .22s ease,border-color .22s ease",
  },
  optionImage: {
    width: "100%",
    aspectRatio: "4 / 5",
    display: "block",
    objectFit: "cover",
    borderRadius: 18,
  },
  optionLabel: {
    display: "block",
    padding: "10px 7px 7px",
    fontSize: "clamp(15px,3.8vw,20px)",
    lineHeight: 1.4,
    textAlign: "center",
  },
  feedback: {
    position: "fixed",
    zIndex: 1000,
    left: 14,
    right: 14,
    bottom: 25,
    maxWidth: 720,
    margin: "0 auto",
    padding: "14px 18px",
    border: "5px solid rgba(255,255,255,.95)",
    borderRadius: 22,
    color: "#FFFFFF",
    fontSize: "clamp(16px,4.2vw,22px)",
    fontWeight: 950,
    lineHeight: 1.5,
    textAlign: "center",
    boxShadow: "0 16px 35px rgba(0,0,0,.22)",
  },
  completeCard: {
    position: "relative",
    zIndex: 2,
    width: "min(650px,calc(100% - 28px))",
    margin: "28px auto",
    padding: "27px 20px",
    border: "5px solid #FFFFFF",
    borderRadius: 35,
    background: "rgba(255,255,255,.96)",
    textAlign: "center",
    boxShadow: "0 20px 48px rgba(18,58,102,.17)",
  },
  completeEmoji: {
    fontSize: 78,
  },
  completeTitle: {
    margin: "8px 0",
    color: C.navyDeep,
    fontSize: "clamp(29px,8vw,44px)",
  },
  completeText: {
    color: "#53718D",
    fontSize: "clamp(17px,4.5vw,22px)",
    fontWeight: 800,
    lineHeight: 1.7,
  },
  summary: {
    display: "grid",
    gap: 8,
    margin: "16px 0",
    padding: 15,
    border: `3px solid ${C.green}`,
    borderRadius: 22,
    background: "#F4FFF8",
    color: C.navyDeep,
    fontSize: "clamp(15px,4vw,19px)",
    lineHeight: 1.7,
  },
  primaryButton: {
    width: "100%",
    minHeight: 62,
    marginTop: 10,
    border: 0,
    borderRadius: 20,
    background: C.gold,
    color: "#FFFFFF",
    fontFamily: "Tajawal, system-ui, sans-serif",
    fontSize: "clamp(18px,4.8vw,24px)",
    fontWeight: 950,
  },
  secondaryButton: {
    width: "100%",
    minHeight: 62,
    marginTop: 10,
    border: 0,
    borderRadius: 20,
    background: C.navy,
    color: "#FFFFFF",
    fontFamily: "Tajawal, system-ui, sans-serif",
    fontSize: "clamp(18px,4.8vw,24px)",
    fontWeight: 950,
  },
};
