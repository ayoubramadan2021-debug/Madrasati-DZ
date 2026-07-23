# تحقق محرك التتبع للدرس 24

## الهدف
نبحث عن محرك سابق يرسم أو يتتبع الأرقام أو المسارات بالإصبع لاستعماله في تمرين: أرسم المسار.

## الملفات المرشحة
src/features/exercises/templates/TraceExercise.tsx
src/features/lesson-v2/content/lesson1.ts
src/features/lesson-v2/content/lesson12_exercise4.ts
src/features/lesson-v2/content/lesson13_exercise4.ts
src/features/lesson-v2/content/lesson14_exercise4.ts
src/features/lesson-v2/content/lesson1_exercise2.ts
src/features/lesson-v2/content/lesson1_exercise3.ts
src/features/lesson-v2/content/lesson1_exercise5.ts
src/features/lesson-v2/content/lesson2.ts
src/features/lesson-v2/content/lesson24.ts
src/features/lesson-v2/content/lesson3.ts
src/features/lesson-v2/content/lesson3_exercise1.ts
src/features/lesson-v2/content/lesson6_exercise1.ts
src/features/lesson-v2/content/lesson6_exercise4.ts
src/features/lesson-v2/content/lesson7_exercise3.ts
src/features/lesson-v2/content/lesson8_exercise1.ts
src/features/lesson-v2/exercises-v2/CountTapExerciseV2.tsx
src/features/lesson-v2/exercises-v2/DragMatchExerciseV2.tsx
src/features/lesson-v2/exercises-v2/LengthVarietyExerciseV2.tsx
src/features/lesson-v2/exercises-v2/NumberChoiceExerciseV2.tsx
src/features/lesson-v2/exercises-v2/PathJourneyExerciseV2.tsx
src/features/lesson-v2/exercises-v2/SortSequenceExerciseV2.tsx
src/features/lesson-v2/exercises-v2/TapSelectExerciseV2.tsx
src/features/lesson-v2/exercises-v2/TouchOrderLengthExerciseV2.tsx
src/features/lesson-v2/exercises-v2/TraceExerciseV2.tsx
src/i18n/ar.ts
src/pages/AdminPage.tsx
src/pages/ExerciseDemoPage.tsx
src/pages/Lesson12ExercisesPage.tsx
src/pages/Lesson13ExercisesPage.tsx
src/pages/Lesson23ExercisePrototypePage.tsx
src/pages/Lesson6ExercisesPage.tsx
src/pages/LessonExercisesPage.tsx
src/pages/SearchPage.tsx
src/pages/WorldPage.tsx
src/shared/components/JourneyMap.tsx

## مؤشرات محرك تتبع قوي
- يستعمل pointerdown / pointermove / pointerup
- أو يستعمل canvas
- أو يستعمل SVG path مع getTotalLength / pathLength
- فيه tolerance أو تحقق من بقاء الإصبع داخل المسار
- فيه progress أو نسبة إكمال
- فيه صوت وكاريوكي أو يمكن ربطه بهما

================ src/features/exercises/templates/TraceExercise.tsx ================
7:export interface TraceExerciseProps {
21:export default function TraceExercise({
48:    const len = p.getTotalLength();
234:          stroke="#C9CFDB"
235:          strokeWidth={9}
236:          strokeLinecap="round"
237:          strokeLinejoin="round"
238:          strokeDasharray="1 12"
================ src/features/lesson-v2/content/lesson1.ts ================
14:  audio_base: "/audio/lesson_1_numbers_1_5",
================ src/features/lesson-v2/content/lesson12_exercise4.ts ================
5:  { number: 0, question: "تَتَبَّعِ الخَطَّ المُنَقَّطَ وَاُكْتُبِ الصِّفْر", question_audio_key: "l12_ex4_q1" },
6:  { number: 0, question: "أَحْسَنْتَ! هَيَّا نُكَرِّرُ مَرَّةً أُخْرى", question_audio_key: "l12_ex4_q2" },
7:  { number: 0, question: "اُكْتُبِ الصِّفْر", question_audio_key: "l12_ex4_q3" },
================ src/features/lesson-v2/content/lesson13_exercise4.ts ================
4:  { number: 1, question: "اُكْتُبِ الرَّقْمَ وَاحِدًا.", question_audio_key: "l13_ex4_q1" },
5:  { number: 2, question: "اُكْتُبِ الرَّقْمَ اِثْنَيْنِ.", question_audio_key: "l13_ex4_q2" },
6:  { number: 3, question: "اُكْتُبِ الرَّقْمَ ثَلَاثَةً.", question_audio_key: "l13_ex4_q3" },
7:  { number: 4, question: "اُكْتُبِ الرَّقْمَ أَرْبَعَةً.", question_audio_key: "l13_ex4_q4" },
8:  { number: 5, question: "اُكْتُبِ الرَّقْمَ خَمْسَةً.", question_audio_key: "l13_ex4_q5" },
9:  { number: 6, question: "اُكْتُبِ الرَّقْمَ سِتَّةً.", question_audio_key: "l13_ex4_q6" },
10:  { number: 7, question: "اُكْتُبِ الرَّقْمَ سَبْعَةً.", question_audio_key: "l13_ex4_q7" },
11:  { number: 8, question: "اُكْتُبِ الرَّقْمَ ثَمَانِيَةً.", question_audio_key: "l13_ex4_q8" },
12:  { number: 9, question: "اُكْتُبِ الرَّقْمَ تِسْعَةً.", question_audio_key: "l13_ex4_q9" },
13:  { number: 10, question: "اُكْتُبِ الرَّقْمَ عَشَرَةً.", question_audio_key: "l13_ex4_q10" },
================ src/features/lesson-v2/content/lesson14_exercise4.ts ================
4:  { number: 6, question: "اُكْتُبِ الرَّقْمَ سِتَّةً.", question_audio_key: "l14_ex4_q1" },
5:  { number: 7, question: "اُكْتُبِ الرَّقْمَ سَبْعَةً.", question_audio_key: "l14_ex4_q2" },
================ src/features/lesson-v2/content/lesson1_exercise2.ts ================
13:    question_audio_key: "ex2_q1",
23:    question_audio_key: "ex2_q2",
33:    question_audio_key: "ex2_q3",
43:    question_audio_key: "ex2_q4",
53:    question_audio_key: "ex2_q5",
================ src/features/lesson-v2/content/lesson1_exercise3.ts ================
16:    question_audio_key: "ex3_q1",
38:    question_audio_key: "ex3_q2",
60:    question_audio_key: "ex3_q3",
82:    question_audio_key: "ex3_q4",
104:    question_audio_key: "ex3_q5",
================ src/features/lesson-v2/content/lesson1_exercise5.ts ================
7:    question_audio_key: "ex5_q1",
12:    question_audio_key: "ex5_q2",
17:    question_audio_key: "ex5_q3",
22:    question_audio_key: "ex5_q4",
27:    question_audio_key: "ex5_q5",
================ src/features/lesson-v2/content/lesson2.ts ================
18:  audio_base: "/audio/lesson_2_house",
================ src/features/lesson-v2/content/lesson24.ts ================
11:  audio_base: "/audio/teachers/khalil/lesson_24_draw_path",
================ src/features/lesson-v2/content/lesson3.ts ================
18:  audio_base: "/audio/lesson_3_senses",
================ src/features/lesson-v2/content/lesson3_exercise1.ts ================
10:    question_audio_key: "l3_ex1_q1",
17:    question_audio_key: "l3_ex1_q2",
24:    question_audio_key: "l3_ex1_q3",
31:    question_audio_key: "l3_ex1_q4",
38:    question_audio_key: "l3_ex1_q5",
================ src/features/lesson-v2/content/lesson6_exercise1.ts ================
8:  { items: ["⚽","⚽","⚽","⚽","⚽","⚽"], question: Q, question_audio_key: "l6_ex_q", options: ["5","6","7"], correct: "6" },
9:  { items: ["🏀","🏀","🏀","🏀","🏀","🏀","🏀"], question: Q, question_audio_key: "l6_ex_q", options: ["7","8","9"], correct: "7" },
10:  { items: ["🎈","🎈","🎈","🎈","🎈","🎈","🎈","🎈"], question: Q, question_audio_key: "l6_ex_q", options: ["6","8","9"], correct: "8" },
11:  { items: ["🪁","🪁","🪁","🪁","🪁","🪁","🪁","🪁","🪁"], question: Q, question_audio_key: "l6_ex_q", options: ["7","8","9"], correct: "9" },
12:  { items: ["🎾","🎾","🎾","🎾","🎾","🎾"], question: Q, question_audio_key: "l6_ex_q", options: ["6","7","8"], correct: "6" },
================ src/features/lesson-v2/content/lesson6_exercise4.ts ================
5:  { number: 6, question: "أُكْتُبِ الرَّقَمَ سِتَّة، تَتَبَّعِ الخَطَّ المُنَقَّط", question_audio_key: "l6_ex4_q1" },
6:  { number: 7, question: "أُكْتُبِ الرَّقَمَ سَبْعَة، تَتَبَّعِ الخَطَّ المُنَقَّط", question_audio_key: "l6_ex4_q2" },
7:  { number: 8, question: "أُكْتُبِ الرَّقَمَ ثَمَانِيَة، تَتَبَّعِ الخَطَّ المُنَقَّط", question_audio_key: "l6_ex4_q3" },
8:  { number: 9, question: "أُكْتُبِ الرَّقَمَ تِسْعَة، تَتَبَّعِ الخَطَّ المُنَقَّط", question_audio_key: "l6_ex4_q4" },
================ src/features/lesson-v2/content/lesson7_exercise3.ts ================
9:    question_audio_key: "l7_ex3_q1",
16:    question_audio_key: "l7_ex3_q2",
23:    question_audio_key: "l7_ex3_q3",
30:    question_audio_key: "l7_ex3_q4",
37:    question_audio_key: "l7_ex3_q5",
================ src/features/lesson-v2/content/lesson8_exercise1.ts ================
7:  { items: ["🐠","🐠","🐠"], question: Q, question_audio_key: "l8_ex_q", options: ["2","3","4"], correct: "3" },
8:  { items: ["🐚","🐚","🐚","🐚","🐚"], question: Q, question_audio_key: "l8_ex_q", options: ["4","5","6"], correct: "5" },
9:  { items: ["🦀","🦀","🦀","🦀","🦀","🦀","🦀"], question: Q, question_audio_key: "l8_ex_q", options: ["6","7","8"], correct: "7" },
10:  { items: ["🐟","🐟"], question: Q, question_audio_key: "l8_ex_q", options: ["1","2","3"], correct: "2" },
11:  { items: ["🐙","🐙","🐙","🐙","🐙","🐙","🐙","🐙","🐙"], question: Q, question_audio_key: "l8_ex_q", options: ["7","8","9"], correct: "9" },
================ src/features/lesson-v2/exercises-v2/CountTapExerciseV2.tsx ================
13:  question_audio_key: string;
20:export interface CountTapExerciseV2Props {
22:  audio_base: string;
40:function useKaraoke(audioBase: string) {
91:async function loadTimings(audioBase: string, key: string): Promise<WordTiming[] | null> {
101:const FEEDBACK_CORRECT = "/audio/v2_feedback/correct.mp3";
102:const FEEDBACK_RETRY = "/audio/v2_feedback/retry.mp3";
104:export default function CountTapExerciseV2({
106:  audio_base,
113:  const [feedbackState, setFeedbackState] = useState<"idle" | "correct" | "wrong">("idle");
117:  const karaoke = useKaraoke(audio_base);
122:      const t = await loadTimings(audio_base, it.question_audio_key);
123:      if (t) setTimings((p) => ({ ...p, [it.question_audio_key]: t }));
126:  }, [audio_base]);
131:    setFeedbackState("idle");
135:    const t = timings[item.question_audio_key];
137:    const timer = setTimeout(() => karaoke.play(item.question_audio_key, t), 600);
143:    const t = timings[item.question_audio_key];
144:    if (t) karaoke.play(item.question_audio_key, t);
148:    const a = new Audio(correct ? FEEDBACK_CORRECT : FEEDBACK_RETRY);
161:      setFeedbackState("correct");
169:      setFeedbackState("wrong");
179:          setFeedbackState("idle");
187:  const words = timings[item.question_audio_key];
188:  const isActive = karaoke.activeKey === item.question_audio_key;
190:  const progressEmoji = item.items_emoji || "🍌";
285:                {progressEmoji}
352:          {progressEmoji} {missionText}
================ src/features/lesson-v2/exercises-v2/DragMatchExerciseV2.tsx ================
28:  question_audio_key: string;
32:export interface DragMatchExerciseV2Props {
34:  audio_base: string;
50:import { useKaraoke, loadTimings, type WordTiming } from "../useKaraoke";
52:const FEEDBACK_CORRECT = "/audio/v2_feedback/correct.mp3";
53:const FEEDBACK_RETRY = "/audio/v2_feedback/retry.mp3";
239:export default function DragMatchExerciseV2({
241:  audio_base,
251:  const [feedbackState, setFeedbackState] = useState<"idle" | "complete">("idle");
253:  const karaoke = useKaraoke(audio_base);
258:    useSensor(TouchSensor, { activationConstraint: { delay: 80, tolerance: 6 } })
263:      const t = await loadTimings(audio_base, it.question_audio_key);
264:      if (t) setTimings((p) => ({ ...p, [it.question_audio_key]: t }));
267:  }, [audio_base]);
272:    setFeedbackState("idle");
277:    const t = timings[item.question_audio_key];
279:    const timer = setTimeout(() => karaoke.play(item.question_audio_key, t), 500);
285:    const t = timings[item.question_audio_key];
286:    if (t) karaoke.play(item.question_audio_key, t);
290:    const a = new Audio(correct ? FEEDBACK_CORRECT : FEEDBACK_RETRY);
319:        setFeedbackState("complete");
333:  const words = timings[item.question_audio_key];
334:  const isActive = karaoke.activeKey === item.question_audio_key;
336:  const progressEmoji = "🍊";
419:                {progressEmoji}
453:          {progressEmoji} {missionText}
================ src/features/lesson-v2/exercises-v2/LengthVarietyExerciseV2.tsx ================
3:import { useKaraoke, loadTimings, type WordTiming } from "../useKaraoke";
19:  question_audio_key: string;
25:export interface LengthVarietyExerciseV2Props {
27:  audio_base: string;
43:const FEEDBACK_CORRECT = "/audio/v2_feedback/correct.mp3";
44:const FEEDBACK_RETRY = "/audio/v2_feedback/retry.mp3";
47:  const a = new Audio(correct ? FEEDBACK_CORRECT : FEEDBACK_RETRY);
81:export default function LengthVarietyExerciseV2({
83:  audio_base,
89:  const [feedbackState, setFeedbackState] = useState<"idle" | "correct" | "wrong">("idle");
91:  const karaoke = useKaraoke(audio_base);
100:      const t = await loadTimings(audio_base, it.question_audio_key);
101:      if (t) setTimings((p) => ({ ...p, [it.question_audio_key]: t }));
103:  }, [audio_base, items]);
108:    setFeedbackState("idle");
112:    const t = timings[question.question_audio_key];
116:      karaoke.play(question.question_audio_key, t);
125:    const t = timings[question.question_audio_key];
126:    if (t) karaoke.play(question.question_audio_key, t);
141:    setFeedbackState("correct");
148:    setFeedbackState("wrong");
153:      setFeedbackState("idle");
191:  const words = timings[question.question_audio_key] || wordsFromQuestion(question.question);
192:  const isActive = karaoke.activeKey === question.question_audio_key;
374:      <rect x="4" y="13" width="18" height="20" rx="6" fill="#f472b6" stroke="#8b315c" strokeWidth="2" />
375:      <rect x="22" y="13" width="9" height="20" fill="#cbd5e1" stroke="#64748b" strokeWidth="2" />
376:      <rect x="31" y="11" width={length} height="24" rx="8" fill={`url(#${gradientId})`} stroke="#1f2937" strokeOpacity="0.35" strokeWidth="2" />
377:      <line x1="43" y1="16" x2={length + 18} y2="16" stroke="white" strokeOpacity="0.45" strokeWidth="4" strokeLinecap="round" />
378:      <polygon points={`${length + 31},11 ${length + 52},23 ${length + 31},35`} fill="#e9bd78" stroke="#8a5a25" strokeWidth="1.5" />
393:        stroke={item.color}
394:        strokeWidth="15"
395:        strokeLinecap="round"
400:        stroke="white"
401:        strokeOpacity="0.45"
402:        strokeWidth="4"
403:        strokeLinecap="round"
416:      <rect x="10" y="10" width={length} height="28" rx="7" fill={item.color} stroke="#8a5a25" strokeWidth="2" />
419:        return <line key={i} x1={x} y1="11" x2={x} y2={i % 2 === 0 ? 31 : 24} stroke="#1f2937" strokeWidth="2" />;
421:      <line x1="18" y1="16" x2={length - 8} y2="16" stroke="white" strokeOpacity="0.45" strokeWidth="4" strokeLinecap="round" />
================ src/features/lesson-v2/exercises-v2/NumberChoiceExerciseV2.tsx ================
9:  question_audio_key: string;
16:type Props = {
18:  audio_base: string;
40:export default function NumberChoiceExerciseV2({ items, audio_base, onComplete }: Props) {
46:  const [feedback, setFeedback] = useState<"idle" | "correct" | "wrong">("idle");
62:    const words = timings[item.question_audio_key];
65:    const a = new Audio(`${audio_base}/${item.question_audio_key}.mp3`);
79:      const r = await fetch(`${audio_base}/${it.question_audio_key}.json`);
82:        setTimings(p => ({ ...p, [it.question_audio_key]: data }));
85:  }, [audio_base, items]);
89:    setFeedback("idle");
103:      setFeedback("correct");
111:      setFeedback("wrong");
113:      setTimeout(() => setFeedback("idle"), 1500);
119:  const progressEmoji = "🔢";
190:                {progressEmoji}
215:            {progressEmoji} {missionText}
================ src/features/lesson-v2/exercises-v2/PathJourneyExerciseV2.tsx ================
3:import { useKaraoke, loadTimings, type WordTiming } from "../useKaraoke";
30:  question_audio_key: string;
37:export interface PathJourneyExerciseV2Props {
39:  audio_base: string;
53:const FEEDBACK_CORRECT = "/audio/v2_feedback/correct.mp3";
54:const FEEDBACK_RETRY = "/audio/v2_feedback/retry.mp3";
57:  const a = new Audio(correct ? FEEDBACK_CORRECT : FEEDBACK_RETRY);
93:export default function PathJourneyExerciseV2({
95:  audio_base,
101:  const [feedbackState, setFeedbackState] = useState<"idle" | "correct" | "wrong">("idle");
103:  const karaoke = useKaraoke(audio_base);
106:  const currentKey = question?.question_audio_key || "";
119:        const t = await loadTimings(audio_base, it.question_audio_key);
121:          setTimings((p) => ({ ...p, [it.question_audio_key]: t }));
131:  }, [audio_base, items]);
136:    setFeedbackState("idle");
141:      karaoke.play(question.question_audio_key, currentTiming);
151:    const t = timings[question.question_audio_key];
152:    if (t) karaoke.play(question.question_audio_key, t);
167:    setFeedbackState("correct");
174:    setFeedbackState("wrong");
179:      setFeedbackState("idle");
219:  const words = timings[question.question_audio_key] || fallbackWords(question.question);
220:  const isActive = karaoke.activeKey === question.question_audio_key;
429:        stroke="#ffffff"
430:        strokeWidth="24"
431:        strokeLinecap="round"
432:        strokeLinejoin="round"
438:        stroke={visual.color}
439:        strokeWidth="15"
440:        strokeLinecap="round"
441:        strokeLinejoin="round"
448:        stroke="rgba(255,255,255,.55)"
449:        strokeWidth="5"
450:        strokeLinecap="round"
451:        strokeLinejoin="round"
454:      <circle cx={visual.points?.[0]?.x || 42} cy={visual.points?.[0]?.y || 82} r="13" fill={C.green} stroke="white" strokeWidth="5" />
460:        stroke="white"
461:        strokeWidth="5"
================ src/features/lesson-v2/exercises-v2/SortSequenceExerciseV2.tsx ================
22:  question_audio_key: string;
27:export interface SortSequenceExerciseV2Props {
29:  audio_base: string;
46:function useKaraoke(audioBase: string) {
97:async function loadTimings(audioBase: string, key: string): Promise<WordTiming[] | null> {
107:const FEEDBACK_CORRECT = "/audio/v2_feedback/correct.mp3";
108:const FEEDBACK_RETRY = "/audio/v2_feedback/retry.mp3";
239:export default function SortSequenceExerciseV2({
241:  audio_base,
251:  const [feedbackState, setFeedbackState] = useState<"idle" | "complete">("idle");
253:  const karaoke = useKaraoke(audio_base);
258:    useSensor(TouchSensor, { activationConstraint: { delay: 80, tolerance: 6 } })
272:      const t = await loadTimings(audio_base, it.question_audio_key);
273:      if (t) setTimings((p) => ({ ...p, [it.question_audio_key]: t }));
276:  }, [audio_base]);
281:    setFeedbackState("idle");
286:    const t = timings[question.question_audio_key];
288:    const timer = setTimeout(() => karaoke.play(question.question_audio_key, t), 500);
294:    const t = timings[question.question_audio_key];
295:    if (t) karaoke.play(question.question_audio_key, t);
299:    const a = new Audio(correct ? FEEDBACK_CORRECT : FEEDBACK_RETRY);
327:        setFeedbackState("complete");
341:  const words = timings[question.question_audio_key];
342:  const isActive = karaoke.activeKey === question.question_audio_key;
344:  const progressEmoji = "🔢";
429:                {progressEmoji}
463:          {progressEmoji} {missionText}
================ src/features/lesson-v2/exercises-v2/TapSelectExerciseV2.tsx ================
12:  question_audio_key: string;
17:export interface TapSelectExerciseV2Props {
19:  audio_base: string;
37:function useKaraoke(audioBase: string) {
88:async function loadTimings(audioBase: string, key: string): Promise<WordTiming[] | null> {
98:const FEEDBACK_CORRECT = "/audio/v2_feedback/correct.mp3";
99:const FEEDBACK_RETRY = "/audio/v2_feedback/retry.mp3";
101:export default function TapSelectExerciseV2({
103:  audio_base,
110:  const [feedbackState, setFeedbackState] = useState<"idle" | "correct" | "wrong">("idle");
114:  const karaoke = useKaraoke(audio_base);
119:      const t = await loadTimings(audio_base, it.question_audio_key);
120:      if (t) setTimings((p) => ({ ...p, [it.question_audio_key]: t }));
123:  }, [audio_base]);
128:    setFeedbackState("idle");
132:    const t = timings[item.question_audio_key];
135:    const timer = setTimeout(() => karaoke.play(item.question_audio_key, t), delay);
141:    const t = timings[item.question_audio_key];
142:    if (t) karaoke.play(item.question_audio_key, t);
146:    const a = new Audio(correct ? FEEDBACK_CORRECT : FEEDBACK_RETRY);
159:      setFeedbackState("correct");
170:      setFeedbackState("wrong");
184:          setFeedbackState("idle");
192:  const words = timings[item.question_audio_key];
193:  const isActive = karaoke.activeKey === item.question_audio_key;
================ src/features/lesson-v2/exercises-v2/TouchOrderLengthExerciseV2.tsx ================
3:import { useKaraoke, loadTimings, type WordTiming } from "../useKaraoke";
17:  question_audio_key: string;
22:export interface TouchOrderLengthExerciseV2Props {
24:  audio_base: string;
37:const FEEDBACK_CORRECT = "/audio/v2_feedback/correct.mp3";
38:const FEEDBACK_RETRY = "/audio/v2_feedback/retry.mp3";
41:  const a = new Audio(correct ? FEEDBACK_CORRECT : FEEDBACK_RETRY);
61:export default function TouchOrderLengthExerciseV2({
63:  audio_base,
69:  const [feedbackState, setFeedbackState] = useState<"idle" | "correct" | "wrong">("idle");
71:  const karaoke = useKaraoke(audio_base);
79:      const t = await loadTimings(audio_base, it.question_audio_key);
80:      if (t) setTimings((p) => ({ ...p, [it.question_audio_key]: t }));
82:  }, [audio_base, items]);
87:    setFeedbackState("idle");
91:    const t = timings[question.question_audio_key];
95:      karaoke.play(question.question_audio_key, t);
104:    const t = timings[question.question_audio_key];
105:    if (t) karaoke.play(question.question_audio_key, t);
110:    setFeedbackState("wrong");
115:      setFeedbackState("idle");
135:      setFeedbackState("correct");
155:  const words = timings[question.question_audio_key] || wordsFromQuestion(question.question);
156:  const isActive = karaoke.activeKey === question.question_audio_key;
292:      <rect x="4" y="11" width="18" height="20" rx="6" fill="#f472b6" stroke="#8b315c" strokeWidth="2" />
293:      <rect x="22" y="11" width="9" height="20" fill="#cbd5e1" stroke="#64748b" strokeWidth="2" />
294:      <rect x="31" y="9" width={length} height="24" rx="8" fill={`url(#${gradientId})`} stroke="#1f2937" strokeOpacity="0.35" strokeWidth="2" />
295:      <line x1="43" y1="14" x2={length + 18} y2="14" stroke="white" strokeOpacity="0.45" strokeWidth="4" strokeLinecap="round" />
296:      <polygon points={`${length + 31},9 ${length + 52},21 ${length + 31},33`} fill="#e9bd78" stroke="#8a5a25" strokeWidth="1.5" />
311:        stroke={item.color}
312:        strokeWidth="14"
313:        strokeLinecap="round"
318:        stroke="white"
319:        strokeOpacity="0.45"
320:        strokeWidth="4"
321:        strokeLinecap="round"
334:      <rect x="10" y="8" width={length} height="26" rx="7" fill={item.color} stroke="#8a5a25" strokeWidth="2" />
337:        return <line key={i} x1={x} y1="9" x2={x} y2={i % 2 === 0 ? 27 : 21} stroke="#1f2937" strokeWidth="2" />;
339:      <line x1="18" y1="14" x2={length - 8} y2="14" stroke="white" strokeOpacity="0.45" strokeWidth="4" strokeLinecap="round" />
================ src/features/lesson-v2/exercises-v2/TraceExerciseV2.tsx ================
3:import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
7:// يستخدم react-sketch-canvas + SVG inline للرقم المنقّط
14:  question_audio_key: string;
17:export interface TraceExerciseV2Props {
19:  audio_base: string;
35:function useKaraoke(audioBase: string) {
86:async function loadTimings(audioBase: string, key: string): Promise<WordTiming[] | null> {
96:const FEEDBACK_CORRECT = "/audio/v2_feedback/correct.mp3";
131:        stroke={drawn ? C.green : "#B8AB8E"}
132:        strokeWidth="6"
133:        strokeLinecap="round"
134:        strokeLinejoin="round"
135:        strokeDasharray="8 6"
150:export default function TraceExerciseV2({
152:  audio_base,
160:  const canvasRef = useRef<ReactSketchCanvasRef>(null);
162:  const karaoke = useKaraoke(audio_base);
167:      const t = await loadTimings(audio_base, it.question_audio_key);
168:      if (t) setTimings((p) => ({ ...p, [it.question_audio_key]: t }));
171:  }, [audio_base]);
177:    canvasRef.current?.clearCanvas();
179:    const t = timings[item.question_audio_key];
181:    const timer = setTimeout(() => karaoke.play(item.question_audio_key, t), 500);
187:    const t = timings[item.question_audio_key];
188:    if (t) karaoke.play(item.question_audio_key, t);
196:    canvasRef.current?.clearCanvas();
204:    const a = new Audio(FEEDBACK_CORRECT);
216:  const words = timings[item.question_audio_key];
217:  const isActive = karaoke.activeKey === item.question_audio_key;
219:  const progressEmoji = "✏️";
301:                {progressEmoji}
336:          {progressEmoji} {missionText}
394:            ref={canvasRef}
397:            strokeWidth={14}
398:            strokeColor={C.gold}
399:            canvasColor="transparent"
================ src/i18n/ar.ts ================
4:  nav_progress: "التقدم",
12:  menu_my_progress: "تقدّمي",
73:  pg_progress_label: "التقدم",
74:  pg_total_progress: "التقدم الإجمالي",
78:  pg_in_progress: "قيد التقدم",
89:  section_progress: "النقاط والتقدم",
90:  section_progress_desc: "متابعة مستوى التلميذ",
114:  sc_view_full_progress: "عرض تقدمي الكامل",
================ src/pages/AdminPage.tsx ================
66:export default function AdminPage() {
73:  const [stats, setStats] = useState({ lessons: 0, students: 0, progress: 0 });
110:      supabase.from("progress").select("id", { count: "exact" }),
116:    setStats({ lessons: l.data?.length || 0, students: s.data?.length || 0, progress: (p as any).count || 0 });
230:    { label: "النشاط", value: stats.progress, icon: "📊", color: "var(--gold)" },
412:                    { label: "إجمالي النشاط", value: stats.progress, color: "var(--gold)" },
413:                    { label: "متوسط النشاط", value: stats.students ? Math.round(stats.progress / stats.students) : 0, color: "#a855f7" },
================ src/pages/ExerciseDemoPage.tsx ================
47:export default function ExerciseDemoPage() {
================ src/pages/Lesson12ExercisesPage.tsx ================
30:export default function Lesson12ExercisesPage() {
38:        audio_base={LESSON_12_EXERCISE_1_AUDIO_BASE}
49:        audio_base={LESSON_12_EXERCISE_2_AUDIO_BASE}
60:        audio_base={LESSON_12_EXERCISE_3_AUDIO_BASE}
71:        audio_base={LESSON_12_EXERCISE_4_AUDIO_BASE}
================ src/pages/Lesson13ExercisesPage.tsx ================
31:export default function Lesson13ExercisesPage() {
39:        audio_base={LESSON_13_EXERCISE_1_AUDIO_BASE}
49:        audio_base={LESSON_13_EXERCISE_2_AUDIO_BASE}
59:        audio_base={LESSON_13_EXERCISE_3_AUDIO_BASE}
69:        audio_base={LESSON_13_EXERCISE_4_AUDIO_BASE}
================ src/pages/Lesson23ExercisePrototypePage.tsx ================
39:const FEEDBACK_CORRECT = "/audio/v2_feedback/correct.mp3";
40:const FEEDBACK_RETRY = "/audio/v2_feedback/retry.mp3";
64:export default function Lesson23ExercisePrototypePage() {
68:  const [feedback, setFeedback] = useState<"idle" | "correct" | "wrong">("idle");
134:    setFeedback("wrong");
135:    playAudio(FEEDBACK_RETRY);
139:      setFeedback("idle");
159:      setFeedback("correct");
160:      playAudio(FEEDBACK_CORRECT);
164:        setFeedback("idle");
268:      <rect x="4" y="11" width="18" height="20" rx="6" fill="#f472b6" stroke="#8b315c" strokeWidth="2" />
269:      <rect x="22" y="11" width="9" height="20" fill="#cbd5e1" stroke="#64748b" strokeWidth="2" />
270:      <rect x="31" y="9" width={length} height="24" rx="8" fill={`url(#${gradientId})`} stroke="#1f2937" strokeOpacity="0.35" strokeWidth="2" />
271:      <line x1="43" y1="14" x2={length + 18} y2="14" stroke="white" strokeOpacity="0.45" strokeWidth="4" strokeLinecap="round" />
272:      <polygon points={`${length + 31},9 ${length + 52},21 ${length + 31},33`} fill="#e9bd78" stroke="#8a5a25" strokeWidth="1.5" />
================ src/pages/Lesson6ExercisesPage.tsx ================
14:export default function Lesson6ExercisesPage() {
17:  if (stage === "ex1") return <CountSelectV2 key="ex1" items={LESSON_6_EXERCISE_1} audio_base={LESSON_6_EXERCISE_1_AUDIO_BASE} onComplete={() => setStage("ex2")} />;
18:  if (stage === "ex2") return <CountTapExerciseV2 key="ex2" items={LESSON_6_EXERCISE_2} audio_base={LESSON_6_EXERCISE_2_AUDIO_BASE} onComplete={() => setStage("ex3")} />;
19:  if (stage === "ex3") return <DragMatchExerciseV2 key="ex3" items={LESSON_6_EXERCISE_3} audio_base={LESSON_6_EXERCISE_3_AUDIO_BASE} onComplete={() => setStage("ex4")} />;
20:  if (stage === "ex4") return <TraceExerciseV2 key="ex4" items={LESSON_6_EXERCISE_4} audio_base={LESSON_6_EXERCISE_4_AUDIO_BASE} onComplete={() => setStage("done")} />;
================ src/pages/LessonExercisesPage.tsx ================
38:export default function LessonExercisesPage() {
45:        audio_base={LESSON_1_EXERCISE_1_AUDIO_BASE}
54:        audio_base={LESSON_1_EXERCISE_2_AUDIO_BASE}
63:        audio_base={LESSON_1_EXERCISE_3_AUDIO_BASE}
72:        audio_base={LESSON_1_EXERCISE_4_AUDIO_BASE}
81:        audio_base={LESSON_1_EXERCISE_5_AUDIO_BASE}
================ src/pages/SearchPage.tsx ================
================ src/pages/WorldPage.tsx ================
18:export default function WorldPage() {
87:        audio_base={world.intro_content.audio_base}
================ src/shared/components/JourneyMap.tsx ================
4:type Props = { worlds: World[]; progress: any[]; lang: string; onOpen: (worldId: string) => void; onLocked: () => void; };
10:export default function JourneyMap({ worlds, progress, lang, onOpen, onLocked }: Props) {
41:        <path d={d} fill="none" stroke="rgba(255,255,255,.06)" strokeWidth={26} strokeLinecap="round" />
42:        <path d={d} fill="none" stroke="rgba(232,160,32,.22)" strokeWidth={14} strokeLinecap="round" />
43:        <path d={d} fill="none" stroke="var(--gold)" strokeWidth={3} strokeLinecap="round" strokeDasharray="2 14" opacity={0.8} />
46:        const prog = progress.find((p: any) => p.world_id === w.id);

## استعمال محركات التتبع في الصفحات والمحتوى
src/pages/AdminPage.tsx:132:      setExMsg("❌ اختر الدرس واكتب المسائل");
src/pages/AdminPage.tsx:179:      setQzMsg("❌ اختر العالم واكتب الأسئلة");
src/pages/LessonExercisesPage.tsx:7:import TraceExerciseV2 from "../features/lesson-v2/exercises-v2/TraceExerciseV2";
src/pages/LessonExercisesPage.tsx:79:      <TraceExerciseV2
src/pages/SearchPage.tsx:89:              placeholder="اكتب كلمة البحث..."
src/pages/SearchPage.tsx:97:              <div className="se-state">اكتب في مربع البحث لعرض النتائج 🔍</div>
src/pages/Lesson6ExercisesPage.tsx:6:import TraceExerciseV2 from "../features/lesson-v2/exercises-v2/TraceExerciseV2";
src/pages/Lesson6ExercisesPage.tsx:20:  if (stage === "ex4") return <TraceExerciseV2 key="ex4" items={LESSON_6_EXERCISE_4} audio_base={LESSON_6_EXERCISE_4_AUDIO_BASE} onComplete={() => setStage("done")} />;
src/pages/Lesson12ExercisesPage.tsx:6:import TraceExerciseV2 from "../features/lesson-v2/exercises-v2/TraceExerciseV2";
src/pages/Lesson12ExercisesPage.tsx:68:      <TraceExerciseV2
src/pages/Lesson13ExercisesPage.tsx:7:import TraceExerciseV2 from "../features/lesson-v2/exercises-v2/TraceExerciseV2";
src/pages/Lesson13ExercisesPage.tsx:66:      <TraceExerciseV2
src/features/lesson-v2/content/lesson1_exercise5.ts:1:import type { TraceItem } from "../exercises-v2/TraceExerciseV2";
src/features/lesson-v2/content/lesson1_exercise5.ts:3:export const LESSON_1_EXERCISE_5: TraceItem[] = [
src/features/lesson-v2/content/lesson6_exercise4.ts:1:// الدرس 6 - التمرين 4: كتابة الأرقام 6-9 بالتتبّع (TraceExerciseV2)
src/features/lesson-v2/content/lesson6_exercise4.ts:2:import type { TraceItem } from "../exercises-v2/TraceExerciseV2";
src/features/lesson-v2/content/lesson6_exercise4.ts:4:export const LESSON_6_EXERCISE_4: TraceItem[] = [
src/features/lesson-v2/content/lesson12_exercise4.ts:1:// الدرس 12 - التمرين 4: كتابة الرقم 0 بالتتبّع (TraceExerciseV2)
src/features/lesson-v2/content/lesson12_exercise4.ts:2:import type { TraceItem } from "../exercises-v2/TraceExerciseV2";
src/features/lesson-v2/content/lesson12_exercise4.ts:4:export const LESSON_12_EXERCISE_4: TraceItem[] = [
src/features/lesson-v2/content/lesson14_exercise4.ts:1:import type { TraceItem } from "../exercises-v2/TraceExerciseV2";
src/features/lesson-v2/content/lesson14_exercise4.ts:3:export const LESSON_14_EXERCISE_4: TraceItem[] = [
src/features/lesson-v2/content/lesson13_exercise4.ts:1:import type { TraceItem } from "../exercises-v2/TraceExerciseV2";
src/features/lesson-v2/content/lesson13_exercise4.ts:3:export const LESSON_13_EXERCISE_4: TraceItem[] = [
src/features/lesson-v2/content/lesson24.ts:4:    title_fr: "Je trace le chemin",
src/features/exercises/templates/TraceExercise.tsx:7:export interface TraceExerciseProps {
src/features/exercises/templates/TraceExercise.tsx:21:export default function TraceExercise({
src/features/exercises/templates/TraceExercise.tsx:27:}: TraceExerciseProps) {
src/features/exercises/templates/TraceExercise.tsx:250:          : "Trace les pointillés avec ton doigt"}
src/features/lesson-v2/content/lesson1_exercise5.ts:1:import type { TraceItem } from "../exercises-v2/TraceExerciseV2";
src/features/lesson-v2/content/lesson1_exercise5.ts:3:export const LESSON_1_EXERCISE_5: TraceItem[] = [
src/features/lesson-v2/content/lesson6_exercise4.ts:1:// الدرس 6 - التمرين 4: كتابة الأرقام 6-9 بالتتبّع (TraceExerciseV2)
src/features/lesson-v2/content/lesson6_exercise4.ts:2:import type { TraceItem } from "../exercises-v2/TraceExerciseV2";
src/features/lesson-v2/content/lesson6_exercise4.ts:4:export const LESSON_6_EXERCISE_4: TraceItem[] = [
src/features/lesson-v2/content/lesson12_exercise4.ts:1:// الدرس 12 - التمرين 4: كتابة الرقم 0 بالتتبّع (TraceExerciseV2)
src/features/lesson-v2/content/lesson12_exercise4.ts:2:import type { TraceItem } from "../exercises-v2/TraceExerciseV2";
src/features/lesson-v2/content/lesson12_exercise4.ts:4:export const LESSON_12_EXERCISE_4: TraceItem[] = [
src/features/lesson-v2/content/lesson14_exercise4.ts:1:import type { TraceItem } from "../exercises-v2/TraceExerciseV2";
src/features/lesson-v2/content/lesson14_exercise4.ts:3:export const LESSON_14_EXERCISE_4: TraceItem[] = [
src/features/lesson-v2/content/lesson13_exercise4.ts:1:import type { TraceItem } from "../exercises-v2/TraceExerciseV2";
src/features/lesson-v2/content/lesson13_exercise4.ts:3:export const LESSON_13_EXERCISE_4: TraceItem[] = [
src/features/lesson-v2/content/lesson24.ts:4:    title_fr: "Je trace le chemin",
src/features/lesson-v2/exercises-v2/TraceExerciseV2.tsx:3:import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
src/features/lesson-v2/exercises-v2/TraceExerciseV2.tsx:6:// TraceExerciseV2 — اكتب الرقم بإصبعك
src/features/lesson-v2/exercises-v2/TraceExerciseV2.tsx:7:// يستخدم react-sketch-canvas + SVG inline للرقم المنقّط
src/features/lesson-v2/exercises-v2/TraceExerciseV2.tsx:8:// المستوى (أ): نقبل أي رسم كإتمام (لا قياس دقة الآن)
src/features/lesson-v2/exercises-v2/TraceExerciseV2.tsx:11:export type TraceItem = {
src/features/lesson-v2/exercises-v2/TraceExerciseV2.tsx:17:export interface TraceExerciseV2Props {
src/features/lesson-v2/exercises-v2/TraceExerciseV2.tsx:18:  items: TraceItem[];
src/features/lesson-v2/exercises-v2/TraceExerciseV2.tsx:150:export default function TraceExerciseV2({
src/features/lesson-v2/exercises-v2/TraceExerciseV2.tsx:155:}: TraceExerciseV2Props) {
src/features/lesson-v2/exercises-v2/TraceExerciseV2.tsx:160:  const canvasRef = useRef<ReactSketchCanvasRef>(null);
src/features/lesson-v2/exercises-v2/TraceExerciseV2.tsx:177:    canvasRef.current?.clearCanvas();
src/features/lesson-v2/exercises-v2/TraceExerciseV2.tsx:196:    canvasRef.current?.clearCanvas();
src/features/lesson-v2/exercises-v2/TraceExerciseV2.tsx:371:      {/* Canvas + Guide */}
src/features/lesson-v2/exercises-v2/TraceExerciseV2.tsx:386:          animation: "traceBoxEnter .45s ease forwards",
src/features/lesson-v2/exercises-v2/TraceExerciseV2.tsx:393:          <ReactSketchCanvas
src/features/lesson-v2/exercises-v2/TraceExerciseV2.tsx:394:            ref={canvasRef}
src/features/lesson-v2/exercises-v2/TraceExerciseV2.tsx:399:            canvasColor="transparent"
src/features/lesson-v2/exercises-v2/TraceExerciseV2.tsx:475:        @keyframes traceBoxEnter {

## القرار المبدئي

- Pointer/touch engine: غير ظاهر
- Canvas engine: src/features/lesson-v2/exercises-v2/TraceExerciseV2.tsx
- SVG path length engine: src/features/exercises/templates/TraceExercise.tsx
- Karaoke base exists: src/features/lesson-v2/exercises-v2/CountTapExerciseV2.tsx

## الخطة إذا وجدنا محركًا جيدًا
1. ننسخ منطق التتبع منه.
2. نربطه بصوت خليل والكاريـوكي مثل الدروس السابقة.
3. نجعل تمرين الدرس 24 الثالث: ارسم المسار بإصبعك.

## الخطة إذا لم نجد محركًا جيدًا
نصنع محرك TracePath جديد، لكن لا نخترع الصوت والشارات؛ نأخذها من المحركات السابقة.
