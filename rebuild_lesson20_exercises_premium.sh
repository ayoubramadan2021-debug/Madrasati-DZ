#!/data/data/com.termux/files/usr/bin/bash
set -e
cd "$HOME/madrasati-dz"

echo "===== 1) إنشاء محرك اختيار الأعداد ====="

cat > src/features/lesson-v2/exercises-v2/NumberChoiceExerciseV2.tsx <<'TSX'
import { useEffect, useRef, useState } from "react";

type WordTiming = { text: string; offset: number; duration: number };

export type NumberChoiceItem = {
  title: string;
  instruction: string;
  question: string;
  question_audio_key: string;
  promptNumbers?: string[];
  centerNumber?: string;
  correct: string;
  options: string[];
};

type Props = {
  items: NumberChoiceItem[];
  audio_base: string;
  onComplete?: () => void;
};

const correctAudio = "/audio/v2_feedback/correct.mp3";
const retryAudio = "/audio/v2_feedback/retry.mp3";

export default function NumberChoiceExerciseV2({ items, audio_base, onComplete }: Props) {
  const [idx, setIdx] = useState(0);
  const [timings, setTimings] = useState<Record<string, WordTiming[]>>({});
  const [active, setActive] = useState(-1);
  const [shown, setShown] = useState<Set<number>>(new Set());
  const [locked, setLocked] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timers = useRef<number[]>([]);

  const item = items[idx];

  const stopAudio = () => {
    audioRef.current?.pause();
    audioRef.current = null;
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setActive(-1);
  };

  const playQuestion = async () => {
    stopAudio();
    const words = timings[item.question_audio_key];
    if (!words) return;
    setShown(new Set());
    const a = new Audio(`${audio_base}/${item.question_audio_key}.mp3`);
    audioRef.current = a;
    await a.play().catch(() => {});
    words.forEach((w, i) => {
      timers.current.push(window.setTimeout(() => {
        setShown(p => new Set(p).add(i));
        setActive(i);
      }, w.offset));
      timers.current.push(window.setTimeout(() => setActive(x => x === i ? -1 : x), w.offset + w.duration));
    });
  };

  useEffect(() => {
    items.forEach(async it => {
      const r = await fetch(`${audio_base}/${it.question_audio_key}.json`);
      if (r.ok) setTimings(p => ({ ...p, [it.question_audio_key]: await r.json() }));
    });
  }, [audio_base, items]);

  useEffect(() => {
    const t = setTimeout(playQuestion, 500);
    setLocked(false);
    return () => {
      clearTimeout(t);
      stopAudio();
    };
  }, [idx, timings]);

  const answer = (value: string) => {
    if (locked) return;
    stopAudio();
    if (value === item.correct) {
      setLocked(true);
      new Audio(correctAudio).play().catch(() => {});
      setTimeout(() => {
        if (idx < items.length - 1) setIdx(idx + 1);
        else onComplete?.();
      }, 900);
    } else {
      new Audio(retryAudio).play().catch(() => {});
    }
  };

  const words = item.question.split(/\s+/);

  return (
    <main dir="rtl" style={styles.page}>
      <section style={styles.card}>
        <header style={styles.header}>
          <button onClick={playQuestion} style={styles.sound}>🔊</button>
          <div style={styles.counter}>{idx + 1} / {items.length}</div>
        </header>

        <h1 style={styles.title}>{item.title}</h1>

        <div style={styles.visualBox}>
          {item.promptNumbers ? (
            <div style={styles.sequence}>
              {item.promptNumbers.map((n, i) => (
                <div key={i} style={n === "?" ? styles.blankNum : styles.numCard}>{n}</div>
              ))}
            </div>
          ) : (
            <div style={styles.centerNumber}>{item.centerNumber}</div>
          )}
        </div>

        <div style={styles.questionBox}>
          <div style={styles.instruction}>{item.instruction}</div>
          <div style={styles.question}>
            {words.map((w, i) => (
              <span key={i} style={{
                ...styles.word,
                color: active === i ? "#E8A020" : "#1B3A6B",
                opacity: shown.has(i) ? 1 : 0.45,
                transform: active === i ? "scale(1.08)" : "scale(1)"
              }}>{w}</span>
            ))}
          </div>
        </div>

        <div style={styles.options}>
          {item.options.map(o => (
            <button key={o} onClick={() => answer(o)} style={styles.option}>{o}</button>
          ))}
        </div>
      </section>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: { minHeight: "100dvh", background: "linear-gradient(180deg,#FFF8EC,#F6E3AE)", fontFamily: "Tajawal,sans-serif", padding: 18, boxSizing: "border-box" },
  card: { maxWidth: 520, margin: "0 auto", paddingTop: 12 },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  sound: { width: 74, height: 74, borderRadius: "50%", border: "6px solid white", background: "#E8A020", fontSize: 32, boxShadow: "0 10px 24px #0002" },
  counter: { border: "5px solid #E8A020", borderRadius: 28, padding: "12px 30px", fontSize: 30, fontWeight: 900, color: "#7A3B13", background: "#fff" },
  title: { textAlign: "center", color: "#7A3B13", fontSize: 34, margin: "28px 0 18px", fontWeight: 900 },
  visualBox: { background: "#fff", border: "5px solid #E8A020", borderRadius: 28, minHeight: 230, display: "flex", justifyContent: "center", alignItems: "center", padding: 18 },
  sequence: { display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", alignItems: "center" },
  numCard: { width: 76, height: 76, borderRadius: 18, background: "#1B3A6B", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 38, fontWeight: 900 },
  blankNum: { width: 76, height: 76, borderRadius: 18, background: "#fff", color: "#E8A020", border: "5px dashed #E8A020", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, fontWeight: 900 },
  centerNumber: { width: 150, height: 150, borderRadius: 30, background: "#1B3A6B", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 78, fontWeight: 900 },
  questionBox: { background: "#fff", border: "5px solid #E8A020", borderRadius: 26, padding: 16, marginTop: 16, textAlign: "center" },
  instruction: { color: "#7A3B13", fontSize: 22, fontWeight: 800, marginBottom: 8 },
  question: { fontSize: 28, fontWeight: 900, lineHeight: 1.8 },
  word: { display: "inline-block", margin: "0 4px", transition: "all .15s" },
  options: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 18 },
  option: { minHeight: 78, borderRadius: 24, border: "5px solid #E8A020", background: "#fff", color: "#1B3A6B", fontSize: 34, fontWeight: 900, fontFamily: "Tajawal,sans-serif" },
};
TSX

echo "===== 2) إنشاء محرك ترتيب الأعداد ====="

cat > src/features/lesson-v2/exercises-v2/NumberSortExerciseV2.tsx <<'TSX'
import { useEffect, useRef, useState } from "react";

type WordTiming = { text: string; offset: number; duration: number };

export type NumberSortItem = {
  title: string;
  instruction: string;
  question: string;
  question_audio_key: string;
  numbers: string[];
  correct: string[];
};

type Props = {
  items: NumberSortItem[];
  audio_base: string;
  onComplete?: () => void;
};

const correctAudio = "/audio/v2_feedback/correct.mp3";
const retryAudio = "/audio/v2_feedback/retry.mp3";

export default function NumberSortExerciseV2({ items, audio_base, onComplete }: Props) {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [timings, setTimings] = useState<Record<string, WordTiming[]>>({});
  const [active, setActive] = useState(-1);
  const [shown, setShown] = useState<Set<number>>(new Set());
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timers = useRef<number[]>([]);
  const item = items[idx];

  const stopAudio = () => {
    audioRef.current?.pause();
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setActive(-1);
  };

  const playQuestion = async () => {
    stopAudio();
    const words = timings[item.question_audio_key];
    if (!words) return;
    setShown(new Set());
    const a = new Audio(`${audio_base}/${item.question_audio_key}.mp3`);
    audioRef.current = a;
    await a.play().catch(() => {});
    words.forEach((w, i) => {
      timers.current.push(window.setTimeout(() => {
        setShown(p => new Set(p).add(i));
        setActive(i);
      }, w.offset));
      timers.current.push(window.setTimeout(() => setActive(x => x === i ? -1 : x), w.offset + w.duration));
    });
  };

  useEffect(() => {
    items.forEach(async it => {
      const r = await fetch(`${audio_base}/${it.question_audio_key}.json`);
      if (r.ok) setTimings(p => ({ ...p, [it.question_audio_key]: await r.json() }));
    });
  }, [audio_base, items]);

  useEffect(() => {
    setSelected([]);
    const t = setTimeout(playQuestion, 500);
    return () => {
      clearTimeout(t);
      stopAudio();
    };
  }, [idx, timings]);

  const pick = (n: string) => {
    if (selected.includes(n)) return;
    const next = [...selected, n];
    setSelected(next);

    if (next.length === item.correct.length) {
      const ok = next.join(",") === item.correct.join(",");
      new Audio(ok ? correctAudio : retryAudio).play().catch(() => {});
      setTimeout(() => {
        if (ok) {
          if (idx < items.length - 1) setIdx(idx + 1);
          else onComplete?.();
        } else {
          setSelected([]);
        }
      }, 900);
    }
  };

  const words = item.question.split(/\s+/);

  return (
    <main dir="rtl" style={styles.page}>
      <section style={styles.card}>
        <header style={styles.header}>
          <button onClick={playQuestion} style={styles.sound}>🔊</button>
          <div style={styles.counter}>{idx + 1} / {items.length}</div>
        </header>

        <h1 style={styles.title}>{item.title}</h1>

        <div style={styles.dropZone}>
          {item.correct.map((_, i) => (
            <div key={i} style={styles.slot}>{selected[i] ?? ""}</div>
          ))}
        </div>

        <div style={styles.questionBox}>
          <div style={styles.instruction}>{item.instruction}</div>
          <div style={styles.question}>
            {words.map((w, i) => (
              <span key={i} style={{
                ...styles.word,
                color: active === i ? "#E8A020" : "#1B3A6B",
                opacity: shown.has(i) ? 1 : 0.45,
                transform: active === i ? "scale(1.08)" : "scale(1)"
              }}>{w}</span>
            ))}
          </div>
        </div>

        <div style={styles.options}>
          {item.numbers.map(n => (
            <button disabled={selected.includes(n)} key={n} onClick={() => pick(n)} style={{
              ...styles.option,
              opacity: selected.includes(n) ? 0.35 : 1
            }}>{n}</button>
          ))}
        </div>
      </section>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: { minHeight: "100dvh", background: "linear-gradient(180deg,#FFF8EC,#F6E3AE)", fontFamily: "Tajawal,sans-serif", padding: 18, boxSizing: "border-box" },
  card: { maxWidth: 520, margin: "0 auto", paddingTop: 12 },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  sound: { width: 74, height: 74, borderRadius: "50%", border: "6px solid white", background: "#E8A020", fontSize: 32, boxShadow: "0 10px 24px #0002" },
  counter: { border: "5px solid #E8A020", borderRadius: 28, padding: "12px 30px", fontSize: 30, fontWeight: 900, color: "#7A3B13", background: "#fff" },
  title: { textAlign: "center", color: "#7A3B13", fontSize: 34, margin: "28px 0 18px", fontWeight: 900 },
  dropZone: { background: "#fff", border: "5px solid #E8A020", borderRadius: 28, minHeight: 150, display: "flex", justifyContent: "center", alignItems: "center", gap: 12, padding: 18 },
  slot: { width: 72, height: 72, borderRadius: 18, border: "5px dashed #E8A020", color: "#1B3A6B", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34, fontWeight: 900 },
  questionBox: { background: "#fff", border: "5px solid #E8A020", borderRadius: 26, padding: 16, marginTop: 16, textAlign: "center" },
  instruction: { color: "#7A3B13", fontSize: 22, fontWeight: 800, marginBottom: 8 },
  question: { fontSize: 28, fontWeight: 900, lineHeight: 1.8 },
  word: { display: "inline-block", margin: "0 4px", transition: "all .15s" },
  options: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginTop: 18 },
  option: { minHeight: 78, borderRadius: 24, border: "5px solid #E8A020", background: "#fff", color: "#1B3A6B", fontSize: 34, fontWeight: 900, fontFamily: "Tajawal,sans-serif" },
};
TSX

echo "===== 3) محتوى التمارين الجديد ====="

cat > src/features/lesson-v2/content/lesson20_exercise1.ts <<'TS'
import type { NumberChoiceItem } from "../exercises-v2/NumberChoiceExerciseV2";

export const LESSON_20_EXERCISE_1_AUDIO_BASE = "/audio/lesson_20_exercise1";

export const LESSON_20_EXERCISE_1: NumberChoiceItem[] = [
  {
    title: "أَكْمِلُوا المُتَتَالِيَةَ",
    instruction: "اِخْتَارُوا العَدَدَ النَّاقِصَ.",
    question: "أَكْمِلُوا: 1، 2، 3، ؟",
    question_audio_key: "q1",
    promptNumbers: ["1", "2", "3", "?"],
    correct: "4",
    options: ["2", "4", "5", "1"],
  },
  {
    title: "أَكْمِلُوا المُتَتَالِيَةَ",
    instruction: "اِخْتَارُوا العَدَدَ النَّاقِصَ.",
    question: "أَكْمِلُوا: 4، 5، ؟، 7",
    question_audio_key: "q2",
    promptNumbers: ["4", "5", "?", "7"],
    correct: "6",
    options: ["6", "4", "7", "3"],
  },
  {
    title: "أَكْمِلُوا المُتَتَالِيَةَ",
    instruction: "اِخْتَارُوا العَدَدَ النَّاقِصَ.",
    question: "أَكْمِلُوا: ؟، 8، 9، 10",
    question_audio_key: "q3",
    promptNumbers: ["?", "8", "9", "10"],
    correct: "7",
    options: ["6", "10", "7", "9"],
  },
  {
    title: "أَكْمِلُوا المُتَتَالِيَةَ",
    instruction: "اِخْتَارُوا العَدَدَ النَّاقِصَ.",
    question: "أَكْمِلُوا: 6، 7، ؟، 9",
    question_audio_key: "q4",
    promptNumbers: ["6", "7", "?", "9"],
    correct: "8",
    options: ["9", "8", "7", "10"],
  },
  {
    title: "أَكْمِلُوا المُتَتَالِيَةَ",
    instruction: "اِخْتَارُوا العَدَدَ النَّاقِصَ.",
    question: "أَكْمِلُوا: 7، 8، 9، ؟",
    question_audio_key: "q5",
    promptNumbers: ["7", "8", "9", "?"],
    correct: "10",
    options: ["10", "8", "6", "9"],
  },
];
TS

cat > src/features/lesson-v2/content/lesson20_exercise2.ts <<'TS'
import type { NumberChoiceItem } from "../exercises-v2/NumberChoiceExerciseV2";

export const LESSON_20_EXERCISE_2_AUDIO_BASE = "/audio/lesson_20_exercise2";

export const LESSON_20_EXERCISE_2: NumberChoiceItem[] = [
  {
    title: "مَا العَدَدُ الَّذِي يَسْبِقُ؟",
    instruction: "اِخْتَارُوا العَدَدَ الَّذِي يَأْتِي قَبْلَهُ.",
    question: "مَا العَدَدُ الَّذِي يَسْبِقُ العَدَدَ 4؟",
    question_audio_key: "q1",
    centerNumber: "4",
    correct: "3",
    options: ["2", "5", "3", "4"],
  },
  {
    title: "مَا العَدَدُ الَّذِي يَسْبِقُ؟",
    instruction: "اِخْتَارُوا العَدَدَ الَّذِي يَأْتِي قَبْلَهُ.",
    question: "مَا العَدَدُ الَّذِي يَسْبِقُ العَدَدَ 6؟",
    question_audio_key: "q2",
    centerNumber: "6",
    correct: "5",
    options: ["5", "7", "4", "6"],
  },
  {
    title: "مَا العَدَدُ الَّذِي يَسْبِقُ؟",
    instruction: "اِخْتَارُوا العَدَدَ الَّذِي يَأْتِي قَبْلَهُ.",
    question: "مَا العَدَدُ الَّذِي يَسْبِقُ العَدَدَ 9؟",
    question_audio_key: "q3",
    centerNumber: "9",
    correct: "8",
    options: ["10", "7", "9", "8"],
  },
  {
    title: "مَا العَدَدُ الَّذِي يَسْبِقُ؟",
    instruction: "اِخْتَارُوا العَدَدَ النَّاقِصَ.",
    question: "مَاذَا يَأْتِي قَبْلَ العَدَدَيْنِ 5 وَ6؟",
    question_audio_key: "q4",
    promptNumbers: ["?", "5", "6"],
    correct: "4",
    options: ["3", "4", "7", "5"],
  },
  {
    title: "مَا العَدَدُ الَّذِي يَسْبِقُ؟",
    instruction: "اِخْتَارُوا العَدَدَ النَّاقِصَ.",
    question: "مَاذَا يَأْتِي قَبْلَ العَدَدَيْنِ 9 وَ10؟",
    question_audio_key: "q5",
    promptNumbers: ["?", "9", "10"],
    correct: "8",
    options: ["8", "9", "7", "10"],
  },
];
TS

cat > src/features/lesson-v2/content/lesson20_exercise3.ts <<'TS'
import type { NumberChoiceItem } from "../exercises-v2/NumberChoiceExerciseV2";

export const LESSON_20_EXERCISE_3_AUDIO_BASE = "/audio/lesson_20_exercise3";

export const LESSON_20_EXERCISE_3: NumberChoiceItem[] = [
  {
    title: "مَا العَدَدُ الَّذِي يَلِي؟",
    instruction: "اِخْتَارُوا العَدَدَ الَّذِي يَأْتِي بَعْدَهُ.",
    question: "مَا العَدَدُ الَّذِي يَلِي العَدَدَ 3؟",
    question_audio_key: "q1",
    centerNumber: "3",
    correct: "4",
    options: ["2", "4", "5", "1"],
  },
  {
    title: "مَا العَدَدُ الَّذِي يَلِي؟",
    instruction: "اِخْتَارُوا العَدَدَ الَّذِي يَأْتِي بَعْدَهُ.",
    question: "مَا العَدَدُ الَّذِي يَلِي العَدَدَ 5؟",
    question_audio_key: "q2",
    centerNumber: "5",
    correct: "6",
    options: ["6", "4", "7", "3"],
  },
  {
    title: "مَا العَدَدُ الَّذِي يَلِي؟",
    instruction: "اِخْتَارُوا العَدَدَ الَّذِي يَأْتِي بَعْدَهُ.",
    question: "مَا العَدَدُ الَّذِي يَلِي العَدَدَ 8؟",
    question_audio_key: "q3",
    centerNumber: "8",
    correct: "9",
    options: ["7", "10", "9", "6"],
  },
  {
    title: "مَا العَدَدُ الَّذِي يَلِي؟",
    instruction: "اِخْتَارُوا العَدَدَ الَّذِي يَأْتِي بَعْدَهُ.",
    question: "مَا العَدَدُ الَّذِي يَلِي العَدَدَ 9؟",
    question_audio_key: "q4",
    centerNumber: "9",
    correct: "10",
    options: ["8", "10", "7", "9"],
  },
  {
    title: "مَا العَدَدُ الَّذِي يَلِي؟",
    instruction: "اِخْتَارُوا العَدَدَ النَّاقِصَ.",
    question: "أَكْمِلُوا: 8، 9، ؟",
    question_audio_key: "q5",
    promptNumbers: ["8", "9", "?"],
    correct: "10",
    options: ["10", "7", "8", "6"],
  },
];
TS

cat > src/features/lesson-v2/content/lesson20_exercise4.ts <<'TS'
import type { NumberSortItem } from "../exercises-v2/NumberSortExerciseV2";

export const LESSON_20_EXERCISE_4_AUDIO_BASE = "/audio/lesson_20_exercise4";

export const LESSON_20_EXERCISE_4: NumberSortItem[] = [
  {
    title: "أُرَتِّبُ الأَعْدَادَ",
    instruction: "اِضْغَطُوا الأَعْدَادَ بِالتَّرْتِيبِ مِنَ الأَصْغَرِ إِلَى الأَكْبَرِ.",
    question: "رَتِّبُوا الأَعْدَادَ: 3، 1، 2",
    question_audio_key: "q1",
    numbers: ["3", "1", "2"],
    correct: ["1", "2", "3"],
  },
  {
    title: "أُرَتِّبُ الأَعْدَادَ",
    instruction: "اِضْغَطُوا الأَعْدَادَ بِالتَّرْتِيبِ.",
    question: "رَتِّبُوا الأَعْدَادَ: 6، 4، 5",
    question_audio_key: "q2",
    numbers: ["6", "4", "5"],
    correct: ["4", "5", "6"],
  },
  {
    title: "أُرَتِّبُ الأَعْدَادَ",
    instruction: "اِضْغَطُوا الأَعْدَادَ بِالتَّرْتِيبِ.",
    question: "رَتِّبُوا الأَعْدَادَ: 10، 8، 9",
    question_audio_key: "q3",
    numbers: ["10", "8", "9"],
    correct: ["8", "9", "10"],
  },
  {
    title: "أُرَتِّبُ الأَعْدَادَ",
    instruction: "اِضْغَطُوا الأَعْدَادَ بِالتَّرْتِيبِ.",
    question: "رَتِّبُوا الأَعْدَادَ: 7، 5، 6",
    question_audio_key: "q4",
    numbers: ["7", "5", "6"],
    correct: ["5", "6", "7"],
  },
  {
    title: "أُرَتِّبُ الأَعْدَادَ",
    instruction: "اِضْغَطُوا الأَعْدَادَ بِالتَّرْتِيبِ مِنَ الأَصْغَرِ إِلَى الأَكْبَرِ.",
    question: "رَتِّبُوا الأَعْدَادَ: 10، 6، 8، 7، 9",
    question_audio_key: "q5",
    numbers: ["10", "6", "8", "7", "9"],
    correct: ["6", "7", "8", "9", "10"],
  },
];
TS

echo "===== 4) صفحة التمارين الجديدة ====="

cat > src/pages/Lesson20ExercisesPage.tsx <<'TSX'
import { useState } from "react";
import LessonCompleteV2 from "../features/lesson-v2/components/LessonCompleteV2";
import NumberChoiceExerciseV2 from "../features/lesson-v2/exercises-v2/NumberChoiceExerciseV2";
import NumberSortExerciseV2 from "../features/lesson-v2/exercises-v2/NumberSortExerciseV2";

import { LESSON_20_EXERCISE_1, LESSON_20_EXERCISE_1_AUDIO_BASE } from "../features/lesson-v2/content/lesson20_exercise1";
import { LESSON_20_EXERCISE_2, LESSON_20_EXERCISE_2_AUDIO_BASE } from "../features/lesson-v2/content/lesson20_exercise2";
import { LESSON_20_EXERCISE_3, LESSON_20_EXERCISE_3_AUDIO_BASE } from "../features/lesson-v2/content/lesson20_exercise3";
import { LESSON_20_EXERCISE_4, LESSON_20_EXERCISE_4_AUDIO_BASE } from "../features/lesson-v2/content/lesson20_exercise4";

type Stage = "ex1" | "ex2" | "ex3" | "ex4" | "done";

export default function Lesson20ExercisesPage() {
  const [stage, setStage] = useState<Stage>("ex1");

  if (stage === "ex1")
    return <NumberChoiceExerciseV2 key="ex1" items={LESSON_20_EXERCISE_1} audio_base={LESSON_20_EXERCISE_1_AUDIO_BASE} onComplete={() => setStage("ex2")} />;

  if (stage === "ex2")
    return <NumberChoiceExerciseV2 key="ex2" items={LESSON_20_EXERCISE_2} audio_base={LESSON_20_EXERCISE_2_AUDIO_BASE} onComplete={() => setStage("ex3")} />;

  if (stage === "ex3")
    return <NumberChoiceExerciseV2 key="ex3" items={LESSON_20_EXERCISE_3} audio_base={LESSON_20_EXERCISE_3_AUDIO_BASE} onComplete={() => setStage("ex4")} />;

  if (stage === "ex4")
    return <NumberSortExerciseV2 key="ex4" items={LESSON_20_EXERCISE_4} audio_base={LESSON_20_EXERCISE_4_AUDIO_BASE} onComplete={() => setStage("done")} />;

  return (
    <LessonCompleteV2
      message="أَحْسَنْتَ! أَصْبَحْتَ تَعْرِفُ مُتَتَالِيَةَ الأَعْدَادِ إِلَى عَشَرَةٍ. 🎉"
      onReplay={() => setStage("ex1")}
    />
  );
}
TSX

echo "===== 5) توليد صوت خليل من جديد ====="

python - <<'PY'
import asyncio, json, pathlib, subprocess, sys
VOICE="ar-DZ-IsmaelNeural"
RATE="+10%"
BASE=pathlib.Path("public/audio")
texts={
"lesson_20_exercise1":{
"q1":"أَكْمِلُوا: وَاحِد، اِثْنَان، ثَلَاثَة، مَاذَا بَعْدَهَا؟",
"q2":"أَكْمِلُوا: أَرْبَعَة، خَمْسَة، مَاذَا بَعْدَهَا؟",
"q3":"أَكْمِلُوا: مَاذَا يَأْتِي قَبْلَ ثَمَانِيَة، تِسْعَة، عَشَرَة؟",
"q4":"أَكْمِلُوا: سِتَّة، سَبْعَة، مَاذَا بَعْدَهَا؟",
"q5":"أَكْمِلُوا: سَبْعَة، ثَمَانِيَة، تِسْعَة، مَاذَا بَعْدَهَا؟",
},
"lesson_20_exercise2":{
"q1":"مَا العَدَدُ الَّذِي يَسْبِقُ العَدَدَ أَرْبَعَة؟",
"q2":"مَا العَدَدُ الَّذِي يَسْبِقُ العَدَدَ سِتَّة؟",
"q3":"مَا العَدَدُ الَّذِي يَسْبِقُ العَدَدَ تِسْعَة؟",
"q4":"مَاذَا يَأْتِي قَبْلَ العَدَدَيْنِ خَمْسَة وَسِتَّة؟",
"q5":"مَاذَا يَأْتِي قَبْلَ العَدَدَيْنِ تِسْعَة وَعَشَرَة؟",
},
"lesson_20_exercise3":{
"q1":"مَا العَدَدُ الَّذِي يَلِي العَدَدَ ثَلَاثَة؟",
"q2":"مَا العَدَدُ الَّذِي يَلِي العَدَدَ خَمْسَة؟",
"q3":"مَا العَدَدُ الَّذِي يَلِي العَدَدَ ثَمَانِيَة؟",
"q4":"مَا العَدَدُ الَّذِي يَلِي العَدَدَ تِسْعَة؟",
"q5":"أَكْمِلُوا: ثَمَانِيَة، تِسْعَة، مَاذَا بَعْدَهَا؟",
},
"lesson_20_exercise4":{
"q1":"رَتِّبُوا الأَعْدَادَ: ثَلَاثَة، وَاحِد، اِثْنَان.",
"q2":"رَتِّبُوا الأَعْدَادَ: سِتَّة، أَرْبَعَة، خَمْسَة.",
"q3":"رَتِّبُوا الأَعْدَادَ: عَشَرَة، ثَمَانِيَة، تِسْعَة.",
"q4":"رَتِّبُوا الأَعْدَادَ: سَبْعَة، خَمْسَة، سِتَّة.",
"q5":"رَتِّبُوا الأَعْدَادَ: عَشَرَة، سِتَّة، ثَمَانِيَة، سَبْعَة، تِسْعَة.",
},
}
try:
    import edge_tts
except Exception:
    subprocess.check_call([sys.executable,"-m","pip","install","edge-tts"])
    import edge_tts

async def one(folder,key,text):
    out=BASE/folder
    out.mkdir(parents=True,exist_ok=True)
    mp3=out/f"{key}.mp3"
    js=out/f"{key}.json"
    com=edge_tts.Communicate(text,VOICE,rate=RATE)
    words=[]
    with open(mp3,"wb") as f:
        async for chunk in com.stream():
            if chunk["type"]=="audio":
                f.write(chunk["data"])
            elif chunk["type"]=="WordBoundary":
                words.append({"text":chunk.get("text",""),"offset":int(chunk["offset"]/10000)+60,"duration":int(chunk["duration"]/10000)})
    js.write_text(json.dumps(words,ensure_ascii=False,indent=2),encoding="utf-8")
    print("✅",folder,key)

async def main():
    for folder,qs in texts.items():
        for key,text in qs.items():
            await one(folder,key,text)
asyncio.run(main())
PY

echo "===== 6) Build ====="
npm run build

echo "===== 7) Git status ====="
git status --short
