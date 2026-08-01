import { useState, useEffect, useRef, useCallback } from "react";
import { isKeyword } from "../keywords";
import UnifiedCountDisplayV2 from "../components/UnifiedCountDisplayV2";
import UnifiedExerciseAnswersV2 from "../components/UnifiedExerciseAnswersV2";
import UnifiedExerciseScreenV2 from "../components/UnifiedExerciseScreenV2";

// ═══════════════════════════════════════════════════════════════
// TapSelectExerciseV2 — انقر الرقم الصحيح
// ═══════════════════════════════════════════════════════════════

export type TapSelectItem = {
  items_count: number;
  items_emoji?: string;
  question: string;
  question_audio_key: string;
  options: number[];
  correct: number;
};

export interface TapSelectExerciseV2Props {
  items: TapSelectItem[];
  audio_base: string;
  background_image?: string;
  onComplete?: (score: number, total: number) => void;
}

const C = {
  navy: "#1B3A6B",
  navyDeep: "#0F2447",
  gold: "#E8A020",
  cream: "#FFF8EC",
  green: "#1FA463",
  greenSoft: "#5BCB8E",
  red: "#D45447",
  redSoft: "#F4C4BE",
};

type WordTiming = { text: string; offset: number; duration: number };

function useKaraoke(audioBase: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timersRef = useRef<number[]>([]);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [currentIdx, setCurrentIdx] = useState(-1);
  const [shown, setShown] = useState<Set<number>>(new Set());

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.muted = true;
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    setActiveKey(null);
    setCurrentIdx(-1);
  }, []);

  const play = useCallback(async (key: string, words: WordTiming[]) => {
    stop();
    setShown(new Set());
    setActiveKey(key);
    const audio = new Audio(`${audioBase}/${key}.mp3`);
    audioRef.current = audio;
    audio.addEventListener("ended", () => setCurrentIdx(-1));
    try {
      await audio.play();
    } catch {
      const all = new Set<number>();
      words.forEach((_, i) => all.add(i));
      setShown(all);
      return;
    }
    words.forEach((w, i) => {
      const t1 = window.setTimeout(() => {
        setShown((prev) => new Set(prev).add(i));
        setCurrentIdx(i);
      }, w.offset);
      const t2 = window.setTimeout(() => {
        setCurrentIdx((cur) => (cur === i ? -1 : cur));
      }, w.offset + w.duration);
      timersRef.current.push(t1, t2);
    });
  }, [audioBase, stop]);

  useEffect(() => () => stop(), [stop]);
  return { play, stop, activeKey, currentIdx, shown };
}

async function loadTimings(audioBase: string, key: string): Promise<WordTiming[] | null> {
  try {
    const r = await fetch(`${audioBase}/${key}.json`);
    if (!r.ok) return null;
    return await r.json();
  } catch {
    return null;
  }
}

const FEEDBACK_CORRECT = "/audio/v2_feedback/correct.mp3";
const FEEDBACK_RETRY = "/audio/v2_feedback/retry.mp3";

export default function TapSelectExerciseV2({
  items,
  audio_base,
  background_image = "/lessons/v2/lesson1-numbers-1-5/scene-1-intro.webp",
  onComplete,
}: TapSelectExerciseV2Props) {
  const [itemIdx, setItemIdx] = useState(0);
  const [timings, setTimings] = useState<Record<string, WordTiming[]>>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [feedbackState, setFeedbackState] = useState<"idle" | "correct" | "wrong">("idle");
  const [attempts, setAttempts] = useState(0);
  const [locked, setLocked] = useState(false);

  const karaoke = useKaraoke(audio_base);
  const item = items[itemIdx];

  useEffect(() => {
    items.forEach(async (it) => {
      const t = await loadTimings(audio_base, it.question_audio_key);
      if (t) setTimings((p) => ({ ...p, [it.question_audio_key]: t }));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audio_base]);

  useEffect(() => {
    karaoke.stop();
    setSelectedOption(null);
    setFeedbackState("idle");
    setAttempts(0);
    setLocked(false);
    if (!item) return;
    const t = timings[item.question_audio_key];
    if (!t) return;
    // بعد انتهاء تغذية «أحسنت» والانتقال للسؤال التالي،
    // يبدأ صوت السؤال والكاريوكي مباشرة.
    const delay = 250;
    const timer = setTimeout(
      () => karaoke.play(item.question_audio_key, t),
      delay,
    );
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemIdx, timings]);

  const replayQuestion = () => {
    const t = timings[item.question_audio_key];
    if (t) karaoke.play(item.question_audio_key, t);
  };

  const playFeedback = (correct: boolean) => {
    const a = new Audio(correct ? FEEDBACK_CORRECT : FEEDBACK_RETRY);
    a.play().catch(() => {});
  };

  const handleSelect = (option: number) => {
    if (locked || feedbackState === "correct") return;
    karaoke.stop();
    setSelectedOption(option);
    const isCorrect = option === item.correct;
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (isCorrect) {
      setFeedbackState("correct");
      setLocked(true);
      playFeedback(true);
      setTimeout(() => {
        if (itemIdx < items.length - 1) {
          setItemIdx(itemIdx + 1);
        } else {
          onComplete?.(items.length, items.length);
        }
      }, 1800);
    } else {
      setFeedbackState("wrong");
      playFeedback(false);
      if (newAttempts >= 3) {
        // بعد 3 محاولات: نُظهر الإجابة الصحيحة ثم نمرّر
        setLocked(true);
        setTimeout(() => {
          if (itemIdx < items.length - 1) {
            setItemIdx(itemIdx + 1);
          } else {
            onComplete?.(items.length, items.length);
          }
        }, 2200);
      } else {
        setTimeout(() => {
          setFeedbackState("idle");
          setSelectedOption(null);
        }, 1500);
      }
    }
  };

  if (!item) return null;
  const words = timings[item.question_audio_key];
  const isActive = karaoke.activeKey === item.question_audio_key;

  const questionWords =
    words?.map((word) => word.text) ??
    item.question
      .trim()
      .split(/\s+/)
      .filter(Boolean);

  const missionText = "أَعُدُّ وَأَخْتَارُ الْعَدَدَ الصَّحِيحَ";

  return (
    <UnifiedExerciseScreenV2
      index={itemIdx}
      total={items.length}
      missionTitle={missionText}
      questionWords={questionWords}
      activeWordIndex={
        isActive
          ? karaoke.currentIdx
          : -1
      }
      onReplay={replayQuestion}
      isPlaying={isActive}
      backgroundImage={background_image}
      activity={
        <UnifiedCountDisplayV2
          count={item.items_count}
          emoji={item.items_emoji || "🍎"}
          itemLabel="عناصر للعد"
        />
      }
      answers={
        <UnifiedExerciseAnswersV2
          options={item.options.map((option) => ({
            id: String(option),
            content: String(option),
            ariaLabel: `اختيار العدد ${option}`,
          }))}
          selectedId={
            selectedOption === null
              ? null
              : String(selectedOption)
          }
          feedback={feedbackState}
          onSelect={(id) => {
            const option = Number(id);

            if (Number.isFinite(option)) {
              handleSelect(option);
            }
          }}
          variant="number"
          columns="auto"
          disabled={locked}
          direction="ltr"
        />
      }
      feedback={feedbackState}
      successText="🌟 أَحْسَنْتَ!"
      retryText="حَاوِلْ مَرَّةً أُخْرَى ✨"
      activityLabel="مجموعة عناصر للعد"
      answersLabel="الأعداد المقترحة"
    />
  );
}
