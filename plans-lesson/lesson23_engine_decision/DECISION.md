# قرار محرك تمارين الدرس 23

## الهدف
نريد محركًا يخدم منطق: ترتيب أدوات حسب الطول، مع صوت خليل، كاريـوكي، وشارات التغذية الراجعة الموجودة.

## src/features/lesson-v2/exercises-v2/RankOrderExerciseV2.tsx
### الواجهات والأنواع
3:export type RankVisualItem = {
10:export type RankOrderItem = {
23:export interface RankOrderExerciseV2Props {
111:export default function RankOrderExerciseV2({

### الصوت والكاريـوكي
13:  question_audio_key: string;
25:  audio_base: string;
34:async function loadTimings(audioBase: string, key: string): Promise<WordTiming[] | null> {
113:  audio_base,
123:  const audio = useExerciseAudio(audio_base);
128:      const t = await loadTimings(audio_base, it.question_audio_key);
130:        setTimings((p) => ({ ...p, [it.question_audio_key]: t }));
133:  }, [audio_base, items]);
136:    audio.stop();
141:    const t = timings[item.question_audio_key];
145:      audio.play(item.question_audio_key, t);
153:    const t = timings[item.question_audio_key];
154:    if (t) audio.play(item.question_audio_key, t);
173:    audio.stop();

### التغذية الراجعة
31:const FEEDBACK_CORRECT = "/audio/v2_feedback/correct.mp3";
32:const FEEDBACK_RETRY = "/audio/v2_feedback/retry.mp3";
119:  const [feedback, setFeedback] = useState<"idle" | "correct" | "wrong">("idle");
138:    setFeedback("idle");
158:    const a = new Audio(correct ? FEEDBACK_CORRECT : FEEDBACK_RETRY);
179:      setFeedback("correct");
186:      setFeedback("wrong");
189:        setFeedback("idle");
209:      ? "✅ أَحْسَنْتَ"
210:      : "حَاوِلْ مَرَّةً أُخْرَى ✨";
222:          @keyframes feedbackPop {
419:            animation: "feedbackPop .35s cubic-bezier(0.34, 1.56, 0.64, 1)",
435:            animation: "feedbackPop .45s cubic-bezier(0.34, 1.56, 0.64, 1)",

## src/features/lesson-v2/exercises-v2/SortSequenceExerciseV2.tsx
### الواجهات والأنواع
15:export type SortItem =
20:export type SortQuestion = {
27:export interface SortSequenceExerciseV2Props {
239:export default function SortSequenceExerciseV2({

### الصوت والكاريـوكي
22:  question_audio_key: string;
29:  audio_base: string;
46:function useKaraoke(audioBase: string) {
97:async function loadTimings(audioBase: string, key: string): Promise<WordTiming[] | null> {
241:  audio_base,
253:  const karaoke = useKaraoke(audio_base);
272:      const t = await loadTimings(audio_base, it.question_audio_key);
273:      if (t) setTimings((p) => ({ ...p, [it.question_audio_key]: t }));
276:  }, [audio_base]);
279:    karaoke.stop();
286:    const t = timings[question.question_audio_key];
288:    const timer = setTimeout(() => karaoke.play(question.question_audio_key, t), 500);
294:    const t = timings[question.question_audio_key];
295:    if (t) karaoke.play(question.question_audio_key, t);
341:  const words = timings[question.question_audio_key];
342:  const isActive = karaoke.activeKey === question.question_audio_key;

### التغذية الراجعة
107:const FEEDBACK_CORRECT = "/audio/v2_feedback/correct.mp3";
108:const FEEDBACK_RETRY = "/audio/v2_feedback/retry.mp3";
251:  const [feedbackState, setFeedbackState] = useState<"idle" | "complete">("idle");
281:    setFeedbackState("idle");
299:    const a = new Audio(correct ? FEEDBACK_CORRECT : FEEDBACK_RETRY);
327:        setFeedbackState("complete");
593:          animation: "feedbackPop .35s cubic-bezier(0.34, 1.56, 0.64, 1)",
609:          animation: "feedbackPop .45s cubic-bezier(0.34, 1.56, 0.64, 1)",
629:          animation: "feedbackPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
634:        }}>✅ أَحْسَنْتَ</div>
649:        @keyframes feedbackPop {

## src/features/lesson-v2/exercises-v2/DragMatchExerciseV2.tsx
### الواجهات والأنواع
14:export type ItemRepresentation =
20:export type DragMatchPair = {
26:export type DragMatchItem = {
32:export interface DragMatchExerciseV2Props {
239:export default function DragMatchExerciseV2({

### الصوت والكاريـوكي
28:  question_audio_key: string;
34:  audio_base: string;
50:import { useKaraoke, loadTimings, type WordTiming } from "../useKaraoke";
241:  audio_base,
253:  const karaoke = useKaraoke(audio_base);
263:      const t = await loadTimings(audio_base, it.question_audio_key);
264:      if (t) setTimings((p) => ({ ...p, [it.question_audio_key]: t }));
267:  }, [audio_base]);
270:    karaoke.stop();
277:    const t = timings[item.question_audio_key];
279:    const timer = setTimeout(() => karaoke.play(item.question_audio_key, t), 500);
285:    const t = timings[item.question_audio_key];
286:    if (t) karaoke.play(item.question_audio_key, t);
315:      karaoke.stop();
333:  const words = timings[item.question_audio_key];
334:  const isActive = karaoke.activeKey === item.question_audio_key;

### التغذية الراجعة
52:const FEEDBACK_CORRECT = "/audio/v2_feedback/correct.mp3";
53:const FEEDBACK_RETRY = "/audio/v2_feedback/retry.mp3";
251:  const [feedbackState, setFeedbackState] = useState<"idle" | "complete">("idle");
272:    setFeedbackState("idle");
290:    const a = new Audio(correct ? FEEDBACK_CORRECT : FEEDBACK_RETRY);
319:        setFeedbackState("complete");
571:          animation: "feedbackPop .35s cubic-bezier(0.34, 1.56, 0.64, 1)",
587:          animation: "feedbackPop .45s cubic-bezier(0.34, 1.56, 0.64, 1)",
607:          animation: "feedbackPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
612:        }}>✅ أَحْسَنْتَ</div>
627:        @keyframes feedbackPop {

## src/features/lesson-v2/exercises-v2/TapSelectImagesV2.tsx
### الواجهات والأنواع
9:export type TapSelectImageItem = {
17:export interface TapSelectImagesV2Props {
101:export default function TapSelectImagesV2({

### الصوت والكاريـوكي
11:  question_audio_key: string;
19:  audio_base: string;
37:function useKaraoke(audioBase: string) {
88:async function loadTimings(audioBase: string, key: string): Promise<WordTiming[] | null> {
103:  audio_base,
114:  const karaoke = useKaraoke(audio_base);
119:      const t = await loadTimings(audio_base, it.question_audio_key);
120:      if (t) setTimings((p) => ({ ...p, [it.question_audio_key]: t }));
123:  }, [audio_base]);
126:    karaoke.stop();
132:    const t = timings[item.question_audio_key];
134:    const timer = setTimeout(() => karaoke.play(item.question_audio_key, t), 600);
140:    const t = timings[item.question_audio_key];
141:    if (t) karaoke.play(item.question_audio_key, t);
151:    karaoke.stop();
184:  const words = timings[item.question_audio_key];
185:  const isActive = karaoke.activeKey === item.question_audio_key;

### التغذية الراجعة
98:const FEEDBACK_CORRECT = "/audio/v2_feedback/correct.mp3";
99:const FEEDBACK_RETRY = "/audio/v2_feedback/retry.mp3";
110:  const [feedbackState, setFeedbackState] = useState<"idle" | "correct" | "wrong">("idle");
128:    setFeedbackState("idle");
145:    const a = new Audio(correct ? FEEDBACK_CORRECT : FEEDBACK_RETRY);
158:      setFeedbackState("correct");
166:      setFeedbackState("wrong");
176:          setFeedbackState("idle");
199:      ? "✅ أَحْسَنْتَ"
200:      : "حَاوِلْ مَرَّةً أُخْرَى ✨";
449:          animation: "feedbackPop .35s cubic-bezier(0.34, 1.56, 0.64, 1)",
465:          animation: "feedbackPop .45s cubic-bezier(0.34, 1.56, 0.64, 1)",
485:          animation: "feedbackPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
502:        @keyframes feedbackPop {


## استعمال المحركات في الصفحات السابقة
src/pages/Lesson2ExercisesPage.tsx:4:import TapSelectImagesV2 from "../features/lesson-v2/exercises-v2/TapSelectImagesV2";
src/pages/Lesson2ExercisesPage.tsx:5:import DragMatchExerciseV2 from "../features/lesson-v2/exercises-v2/DragMatchExerciseV2";
src/pages/Lesson2ExercisesPage.tsx:42:      <TapSelectImagesV2
src/pages/Lesson2ExercisesPage.tsx:51:      <DragMatchExerciseV2
src/pages/LessonExercisesPage.tsx:5:import DragMatchExerciseV2 from "../features/lesson-v2/exercises-v2/DragMatchExerciseV2";
src/pages/LessonExercisesPage.tsx:6:import SortSequenceExerciseV2 from "../features/lesson-v2/exercises-v2/SortSequenceExerciseV2";
src/pages/LessonExercisesPage.tsx:61:      <DragMatchExerciseV2
src/pages/LessonExercisesPage.tsx:70:      <SortSequenceExerciseV2
src/pages/Lesson3ExercisesPage.tsx:4:import DragMatchExerciseV2 from "../features/lesson-v2/exercises-v2/DragMatchExerciseV2";
src/pages/Lesson3ExercisesPage.tsx:42:      <DragMatchExerciseV2
src/pages/Lesson6ExercisesPage.tsx:5:import DragMatchExerciseV2 from "../features/lesson-v2/exercises-v2/DragMatchExerciseV2";
src/pages/Lesson6ExercisesPage.tsx:19:  if (stage === "ex3") return <DragMatchExerciseV2 key="ex3" items={LESSON_6_EXERCISE_3} audio_base={LESSON_6_EXERCISE_3_AUDIO_BASE} onComplete={() => setStage("ex4")} />;
src/pages/Lesson8ExercisesPage.tsx:5:import DragMatchExerciseV2 from "../features/lesson-v2/exercises-v2/DragMatchExerciseV2";
src/pages/Lesson8ExercisesPage.tsx:17:  if (stage === "ex3") return <DragMatchExerciseV2 key="ex3" items={LESSON_8_EXERCISE_3} audio_base={LESSON_8_EXERCISE_3_AUDIO_BASE} onComplete={() => setStage("done")} />;
src/pages/Lesson9ExercisesPage.tsx:4:import TapSelectImagesV2 from "../features/lesson-v2/exercises-v2/TapSelectImagesV2";
src/pages/Lesson9ExercisesPage.tsx:5:import DragMatchExerciseV2 from "../features/lesson-v2/exercises-v2/DragMatchExerciseV2";
src/pages/Lesson9ExercisesPage.tsx:16:  if (stage === "ex2") return <TapSelectImagesV2 key="ex2" items={LESSON_9_EXERCISE_2} audio_base={LESSON_9_EXERCISE_2_AUDIO_BASE} onComplete={() => setStage("ex3")} />;
src/pages/Lesson9ExercisesPage.tsx:17:  if (stage === "ex3") return <DragMatchExerciseV2 key="ex3" items={LESSON_9_EXERCISE_3} audio_base={LESSON_9_EXERCISE_3_AUDIO_BASE} onComplete={() => setStage("done")} />;
src/pages/Lesson10ExercisesPage.tsx:5:import DragMatchExerciseV2 from "../features/lesson-v2/exercises-v2/DragMatchExerciseV2";
src/pages/Lesson10ExercisesPage.tsx:17:  if (stage === "ex3") return <DragMatchExerciseV2 key="ex3" items={LESSON_10_EXERCISE_3} audio_base={LESSON_10_EXERCISE_3_AUDIO_BASE} onComplete={() => setStage("done")} />;
src/pages/Lesson11ExercisesPage.tsx:4:import TapSelectImagesV2 from "../features/lesson-v2/exercises-v2/TapSelectImagesV2";
src/pages/Lesson11ExercisesPage.tsx:5:import DragMatchExerciseV2 from "../features/lesson-v2/exercises-v2/DragMatchExerciseV2";
src/pages/Lesson11ExercisesPage.tsx:16:  if (stage === "ex2") return <TapSelectImagesV2 key="ex2" items={LESSON_11_EXERCISE_2} audio_base={LESSON_11_EXERCISE_2_AUDIO_BASE} onComplete={() => setStage("ex3")} />;
src/pages/Lesson11ExercisesPage.tsx:17:  if (stage === "ex3") return <DragMatchExerciseV2 key="ex3" items={LESSON_11_EXERCISE_3} audio_base={LESSON_11_EXERCISE_3_AUDIO_BASE} onComplete={() => setStage("done")} />;
src/pages/Lesson12ExercisesPage.tsx:4:import TapSelectImagesV2 from "../features/lesson-v2/exercises-v2/TapSelectImagesV2";
src/pages/Lesson12ExercisesPage.tsx:5:import DragMatchExerciseV2 from "../features/lesson-v2/exercises-v2/DragMatchExerciseV2";
src/pages/Lesson12ExercisesPage.tsx:46:      <TapSelectImagesV2
src/pages/Lesson12ExercisesPage.tsx:57:      <DragMatchExerciseV2
src/pages/Lesson13ExercisesPage.tsx:5:import TapSelectImagesV2 from "../features/lesson-v2/exercises-v2/TapSelectImagesV2";
src/pages/Lesson13ExercisesPage.tsx:6:import DragMatchExerciseV2 from "../features/lesson-v2/exercises-v2/DragMatchExerciseV2";
src/pages/Lesson13ExercisesPage.tsx:46:      <TapSelectImagesV2
src/pages/Lesson13ExercisesPage.tsx:56:      <DragMatchExerciseV2
src/pages/Lesson12ExercisesPage.tsx.bak_boxzero_094341:4:import TapSelectImagesV2 from "../features/lesson-v2/exercises-v2/TapSelectImagesV2";
src/pages/Lesson12ExercisesPage.tsx.bak_boxzero_094341:5:import DragMatchExerciseV2 from "../features/lesson-v2/exercises-v2/DragMatchExerciseV2";
src/pages/Lesson12ExercisesPage.tsx.bak_boxzero_094341:18:  if (stage === "ex2") return <TapSelectImagesV2 key="ex2" items={LESSON_12_EXERCISE_2} audio_base={LESSON_12_EXERCISE_2_AUDIO_BASE} onComplete={() => setStage("ex3")} />;
src/pages/Lesson12ExercisesPage.tsx.bak_boxzero_094341:19:  if (stage === "ex3") return <DragMatchExerciseV2 key="ex3" items={LESSON_12_EXERCISE_3} audio_base={LESSON_12_EXERCISE_3_AUDIO_BASE} onComplete={() => setStage("ex4")} />;
src/pages/Lesson12ExercisesPage.tsx.bak_force_cartoon2_page_101418:4:import TapSelectImagesV2 from "../features/lesson-v2/exercises-v2/TapSelectImagesV2";
src/pages/Lesson12ExercisesPage.tsx.bak_force_cartoon2_page_101418:5:import DragMatchExerciseV2 from "../features/lesson-v2/exercises-v2/DragMatchExerciseV2";
src/pages/Lesson12ExercisesPage.tsx.bak_force_cartoon2_page_101418:45:      <TapSelectImagesV2
src/pages/Lesson12ExercisesPage.tsx.bak_force_cartoon2_page_101418:55:      <DragMatchExerciseV2
src/pages/Lesson15ExercisesPage.tsx:3:import RankOrderExerciseV2 from "../features/lesson-v2/exercises-v2/RankOrderExerciseV2";
src/pages/Lesson15ExercisesPage.tsx:32:      <RankOrderExerciseV2
src/pages/Lesson15ExercisesPage.tsx:42:      <RankOrderExerciseV2
src/pages/Lesson15ExercisesPage.tsx:52:      <RankOrderExerciseV2
src/pages/Lesson15ExercisesPage.tsx:62:      <RankOrderExerciseV2
src/pages/Lesson16ExercisesPage.tsx:3:import RankOrderExerciseV2 from "../features/lesson-v2/exercises-v2/RankOrderExerciseV2";
src/pages/Lesson16ExercisesPage.tsx:32:      <RankOrderExerciseV2
src/pages/Lesson16ExercisesPage.tsx:42:      <RankOrderExerciseV2
src/pages/Lesson16ExercisesPage.tsx:52:      <RankOrderExerciseV2
src/pages/Lesson16ExercisesPage.tsx:62:      <RankOrderExerciseV2
src/pages/Lesson17ExercisesPage.tsx:3:import RankOrderExerciseV2 from "../features/lesson-v2/exercises-v2/RankOrderExerciseV2";
src/pages/Lesson17ExercisesPage.tsx:32:      <RankOrderExerciseV2
src/pages/Lesson17ExercisesPage.tsx:42:      <RankOrderExerciseV2
src/pages/Lesson17ExercisesPage.tsx:52:      <RankOrderExerciseV2
src/pages/Lesson17ExercisesPage.tsx:62:      <RankOrderExerciseV2
src/pages/Lesson18ExercisesPage.tsx:3:import RankOrderExerciseV2 from "../features/lesson-v2/exercises-v2/RankOrderExerciseV2";
src/pages/Lesson18ExercisesPage.tsx:32:      <RankOrderExerciseV2
src/pages/Lesson18ExercisesPage.tsx:42:      <RankOrderExerciseV2
src/pages/Lesson18ExercisesPage.tsx:52:      <RankOrderExerciseV2
src/pages/Lesson18ExercisesPage.tsx:62:      <RankOrderExerciseV2
src/pages/Lesson19ExercisesPage.tsx:3:import RankOrderExerciseV2 from "../features/lesson-v2/exercises-v2/RankOrderExerciseV2";
src/pages/Lesson19ExercisesPage.tsx:32:      <RankOrderExerciseV2
src/pages/Lesson19ExercisesPage.tsx:42:      <RankOrderExerciseV2
src/pages/Lesson19ExercisesPage.tsx:52:      <RankOrderExerciseV2
src/pages/Lesson19ExercisesPage.tsx:62:      <RankOrderExerciseV2
src/features/lesson-v2/content/lesson1_exercise3.ts:1:import type { DragMatchItem } from "../exercises-v2/DragMatchExerciseV2";
src/features/lesson-v2/content/lesson1_exercise4.ts:1:import type { SortQuestion } from "../exercises-v2/SortSequenceExerciseV2";
src/features/lesson-v2/content/lesson2_exercise2.ts:1:import type { TapSelectImageItem } from "../exercises-v2/TapSelectImagesV2";
src/features/lesson-v2/content/lesson2_exercise3.ts:1:import type { DragMatchItem } from "../exercises-v2/DragMatchExerciseV2";
src/features/lesson-v2/content/lesson3_exercise2.ts:1:import type { DragMatchItem } from "../exercises-v2/DragMatchExerciseV2";
src/features/lesson-v2/content/lesson6_exercise3.ts:1:// الدرس 6 - التمرين 3: ربط العدد بكتابته وصورته (DragMatchExerciseV2)
src/features/lesson-v2/content/lesson6_exercise3.ts:2:import type { DragMatchItem } from "../exercises-v2/DragMatchExerciseV2";
src/features/lesson-v2/content/lesson8_exercise3.ts:1:// الدرس 8 - التمرين 3: ربط العدد بكتابته وكميته (DragMatchExerciseV2) — 1→9
src/features/lesson-v2/content/lesson8_exercise3.ts:2:import type { DragMatchItem } from "../exercises-v2/DragMatchExerciseV2";
src/features/lesson-v2/content/lesson9_exercise2.ts:1:// الدرس 9 - التمرين 2: اختر الصورة المطابقة للوصف (TapSelectImagesV2)
src/features/lesson-v2/content/lesson9_exercise2.ts:2:import type { TapSelectImageItem } from "../exercises-v2/TapSelectImagesV2";
src/features/lesson-v2/content/lesson9_exercise3.ts:1:// الدرس 9 - التمرين 3: ربط الكلمة المكانية بالصورة (DragMatchExerciseV2)
src/features/lesson-v2/content/lesson9_exercise3.ts:2:import type { DragMatchItem } from "../exercises-v2/DragMatchExerciseV2";
src/features/lesson-v2/content/lesson10_exercise3.ts:1:// الدرس 10 - التمرين 3: اربط مجموعة الأدوات بالعدد (DragMatchExerciseV2)
src/features/lesson-v2/content/lesson10_exercise3.ts:2:import type { DragMatchItem } from "../exercises-v2/DragMatchExerciseV2";
src/features/lesson-v2/content/lesson11_exercise2.ts:1:// الدرس 11 - التمرين 2: اختر صورة الحركة (TapSelectImagesV2)
src/features/lesson-v2/content/lesson11_exercise2.ts:2:import type { TapSelectImageItem } from "../exercises-v2/TapSelectImagesV2";
src/features/lesson-v2/content/lesson11_exercise3.ts:1:// الدرس 11 - التمرين 3: اربط الحركة بصورتها (DragMatchExerciseV2)
src/features/lesson-v2/content/lesson11_exercise3.ts:2:import type { DragMatchItem } from "../exercises-v2/DragMatchExerciseV2";
src/features/lesson-v2/content/lesson12_exercise2.ts:3:import type { TapSelectImageItem } from "../exercises-v2/TapSelectImagesV2";
src/features/lesson-v2/content/lesson12_exercise3.ts:1:// الدرس 12 - التمرين 3: اربط كل مجموعة بعددها (يشمل 0) — DragMatchExerciseV2
src/features/lesson-v2/content/lesson12_exercise3.ts:2:import type { DragMatchItem } from "../exercises-v2/DragMatchExerciseV2";
src/features/lesson-v2/content/lesson13_exercise2.ts:1:import type { TapSelectImageItem } from "../exercises-v2/TapSelectImagesV2";
src/features/lesson-v2/content/lesson13_exercise3.ts:1:import type { DragMatchItem } from "../exercises-v2/DragMatchExerciseV2";
src/features/lesson-v2/content/lesson14_exercise2.ts:1:import type { TapSelectImageItem } from "../exercises-v2/TapSelectImagesV2";
src/features/lesson-v2/content/lesson14_exercise3.ts:1:import type { DragMatchItem } from "../exercises-v2/DragMatchExerciseV2";
src/features/lesson-v2/content/lesson15_exercise1.ts:1:import type { RankOrderItem } from "../exercises-v2/RankOrderExerciseV2";
src/features/lesson-v2/content/lesson15_exercise2.ts:1:import type { RankOrderItem } from "../exercises-v2/RankOrderExerciseV2";
src/features/lesson-v2/content/lesson15_exercise3.ts:1:import type { RankOrderItem } from "../exercises-v2/RankOrderExerciseV2";
src/features/lesson-v2/content/lesson15_exercise4.ts:1:import type { RankOrderItem } from "../exercises-v2/RankOrderExerciseV2";
src/features/lesson-v2/content/lesson15_exercise1.ts.bak_5q_044831:1:import type { RankOrderItem } from "../exercises-v2/RankOrderExerciseV2";
src/features/lesson-v2/content/lesson15_exercise2.ts.bak_5q_044831:1:import type { RankOrderItem } from "../exercises-v2/RankOrderExerciseV2";
src/features/lesson-v2/content/lesson15_exercise3.ts.bak_5q_044831:1:import type { RankOrderItem } from "../exercises-v2/RankOrderExerciseV2";
src/features/lesson-v2/content/lesson15_exercise4.ts.bak_5q_044831:1:import type { RankOrderItem } from "../exercises-v2/RankOrderExerciseV2";
src/features/lesson-v2/content/lesson16_exercise1.ts:1:import type { RankOrderItem } from "../exercises-v2/RankOrderExerciseV2";
src/features/lesson-v2/content/lesson16_exercise2.ts:1:import type { RankOrderItem } from "../exercises-v2/RankOrderExerciseV2";
src/features/lesson-v2/content/lesson16_exercise3.ts:1:import type { RankOrderItem } from "../exercises-v2/RankOrderExerciseV2";
src/features/lesson-v2/content/lesson16_exercise4.ts:1:import type { RankOrderItem } from "../exercises-v2/RankOrderExerciseV2";
src/features/lesson-v2/content/lesson17_exercise1.ts:1:import type { RankOrderItem } from "../exercises-v2/RankOrderExerciseV2";
src/features/lesson-v2/content/lesson17_exercise2.ts:1:import type { RankOrderItem } from "../exercises-v2/RankOrderExerciseV2";
src/features/lesson-v2/content/lesson17_exercise3.ts:1:import type { RankOrderItem } from "../exercises-v2/RankOrderExerciseV2";
src/features/lesson-v2/content/lesson17_exercise4.ts:1:import type { RankOrderItem } from "../exercises-v2/RankOrderExerciseV2";
src/features/lesson-v2/content/lesson18_exercise1.ts:1:import type { RankOrderItem } from "../exercises-v2/RankOrderExerciseV2";
src/features/lesson-v2/content/lesson18_exercise2.ts:1:import type { RankOrderItem } from "../exercises-v2/RankOrderExerciseV2";
src/features/lesson-v2/content/lesson18_exercise3.ts:1:import type { RankOrderItem } from "../exercises-v2/RankOrderExerciseV2";
src/features/lesson-v2/content/lesson18_exercise4.ts:1:import type { RankOrderItem } from "../exercises-v2/RankOrderExerciseV2";
src/features/lesson-v2/content/lesson19_exercise1.ts:1:import type { RankOrderItem } from "../exercises-v2/RankOrderExerciseV2";
src/features/lesson-v2/content/lesson19_exercise2.ts:1:import type { RankOrderItem } from "../exercises-v2/RankOrderExerciseV2";
src/features/lesson-v2/content/lesson19_exercise2.ts.bak_short_food_143828:1:import type { RankOrderItem } from "../exercises-v2/RankOrderExerciseV2";
src/features/lesson-v2/content/lesson19_exercise4.ts.bak_short_food_143828:1:import type { RankOrderItem } from "../exercises-v2/RankOrderExerciseV2";
src/features/lesson-v2/content/lesson12_exercise2.ts.bak_clear_zero_focus_110313:1:// الدرس 12 - التمرين 2: اختر الصندوق الفارغ = 0 (TapSelectImagesV2)
src/features/lesson-v2/content/lesson12_exercise2.ts.bak_clear_zero_focus_110313:2:import type { TapSelectImageItem } from "../exercises-v2/TapSelectImagesV2";
src/features/lesson-v2/content/lesson12_exercise2.ts.bak_restore_audio_sync_111051:3:import type { TapSelectImageItem } from "../exercises-v2/TapSelectImagesV2";
src/features/lesson-v2/content/lesson19_exercise3.ts:1:import type { RankOrderItem } from "../exercises-v2/RankOrderExerciseV2";
src/features/lesson-v2/content/lesson19_exercise4.ts:1:import type { RankOrderItem } from "../exercises-v2/RankOrderExerciseV2";
src/features/lesson-v2/content/lesson19_exercise1.ts.bak_short_food_143828:1:import type { RankOrderItem } from "../exercises-v2/RankOrderExerciseV2";
src/features/lesson-v2/content/lesson19_exercise3.ts.bak_short_food_143828:1:import type { RankOrderItem } from "../exercises-v2/RankOrderExerciseV2";

## واجهة RankOrderExerciseV2 من بداية الملف
import { useCallback, useEffect, useRef, useState } from "react";

export type RankVisualItem = {
  id: string;
  label: string;
  icon: string;
  color: string;
};

export type RankOrderItem = {
  scene_image: string;
  question: string;
  question_audio_key: string;
  title: string;
  instruction: string;
  mode: "pickObject" | "pickRank" | "nextRank" | "missingRank";
  correct: string;
  visuals?: RankVisualItem[];
  options?: string[];
  sequence?: string[];
};

export interface RankOrderExerciseV2Props {
  items: RankOrderItem[];
  audio_base: string;
  onComplete?: (score: number, total: number) => void;
}

type WordTiming = { text: string; offset: number; duration: number };

const FEEDBACK_CORRECT = "/audio/v2_feedback/correct.mp3";
const FEEDBACK_RETRY = "/audio/v2_feedback/retry.mp3";

async function loadTimings(audioBase: string, key: string): Promise<WordTiming[] | null> {
  try {
    const r = await fetch(`${audioBase}/${key}.json`);
    if (!r.ok) return null;
    return await r.json();
  } catch {
    return null;
  }
}

function useExerciseAudio(audioBase: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timersRef = useRef<number[]>([]);
  const genRef = useRef(0);

  const [currentIdx, setCurrentIdx] = useState(-1);
  const [shown, setShown] = useState<Set<number>>(new Set());

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    genRef.current++;
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    setCurrentIdx(-1);
  }, []);

  const play = useCallback(
    async (key: string, words: WordTiming[]) => {
      stop();

      const myGen = genRef.current;
      setShown(new Set());

      const audio = new Audio(`${audioBase}/${key}.mp3`);
      audio.preload = "auto";
      audio.volume = 1;
      audioRef.current = audio;

      try {
        await audio.play();
      } catch {
        const all = new Set<number>();
        words.forEach((_, i) => all.add(i));
        setShown(all);
        return;
      }

      if (myGen !== genRef.current) {
        audio.pause();
        return;
      }

      words.forEach((w, i) => {

## واجهة SortSequenceExerciseV2 من بداية الملف
import { useState, useEffect, useRef, useCallback } from "react";
import { isKeyword } from "../keywords";
import {
  DndContext, DragEndEvent, PointerSensor, TouchSensor,
  useSensor, useSensors, useDraggable, useDroppable,
  DragOverlay, DragStartEvent,
} from "@dnd-kit/core";

// ═══════════════════════════════════════════════════════════════
// SortSequenceExerciseV2 — رتّب العناصر
// كل عنصر يمكن أن يكون number أو count (تفاحات) أو word
// الفراغات أفقية (من اليمين لليسار للعربية)
// ═══════════════════════════════════════════════════════════════

export type SortItem =
  | { kind: "number"; value: number }
  | { kind: "count"; value: number; emoji?: string }
  | { kind: "word"; value: string; sort_value: number };

export type SortQuestion = {
  question: string;
  question_audio_key: string;
  items: SortItem[];          // المبعثرة
  direction: "asc" | "desc";  // تصاعدي / تنازلي
};

export interface SortSequenceExerciseV2Props {
  items: SortQuestion[];
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

## القرار الآلي

RankOrder:
- audio: 1
- feedback: 1
- order-like logic: 1

SortSequence:
- audio: 1
- feedback: 1
- order-like logic: 1


## القرار النهائي الأولي
استعمل SortSequenceExerciseV2 كأساس لأنه الأقرب لمنطق ترتيب الأدوات حسب الطول.

## قاعدة التنفيذ القادمة
لا نبني من الصفر.
إذا استعملنا محركًا موجودًا نأخذ واجهته كما هي.
إذا صنعنا محركًا جديدًا، ننسخ حرفيًا منطق:
- audio_base
- question_audio_key
- loadTimings
- useKaraoke
- karaoke.stop عند الإجابة
- FEEDBACK_CORRECT / FEEDBACK_RETRY
- feedbackPop ونصوص أَحْسَنْتَ / حَاوِلْ مَرَّةً أُخْرَى
