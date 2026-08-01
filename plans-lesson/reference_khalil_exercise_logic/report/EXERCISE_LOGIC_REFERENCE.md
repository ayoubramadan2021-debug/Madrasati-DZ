# مرجع منطق التمارين الموجودة

## 1) قاعدة الصوت والكاريـوكي

- كل تمرين يستعمل:
  - audio_base
  - question_audio_key
  - ملف mp3 للسؤال
  - ملف json للكاريـوكي

plans-lesson/reference_khalil_exercise_logic/engines/TapSelectImagesV2.tsx:11:  question_audio_key: string;
plans-lesson/reference_khalil_exercise_logic/engines/TapSelectImagesV2.tsx:19:  audio_base: string;
plans-lesson/reference_khalil_exercise_logic/engines/TapSelectImagesV2.tsx:37:function useKaraoke(audioBase: string) {
plans-lesson/reference_khalil_exercise_logic/engines/TapSelectImagesV2.tsx:88:async function loadTimings(audioBase: string, key: string): Promise<WordTiming[] | null> {
plans-lesson/reference_khalil_exercise_logic/engines/TapSelectImagesV2.tsx:103:  audio_base,
plans-lesson/reference_khalil_exercise_logic/engines/TapSelectImagesV2.tsx:114:  const karaoke = useKaraoke(audio_base);
plans-lesson/reference_khalil_exercise_logic/engines/TapSelectImagesV2.tsx:119:      const t = await loadTimings(audio_base, it.question_audio_key);
plans-lesson/reference_khalil_exercise_logic/engines/TapSelectImagesV2.tsx:120:      if (t) setTimings((p) => ({ ...p, [it.question_audio_key]: t }));
plans-lesson/reference_khalil_exercise_logic/engines/TapSelectImagesV2.tsx:123:  }, [audio_base]);
plans-lesson/reference_khalil_exercise_logic/engines/TapSelectImagesV2.tsx:126:    karaoke.stop();
plans-lesson/reference_khalil_exercise_logic/engines/TapSelectImagesV2.tsx:132:    const t = timings[item.question_audio_key];
plans-lesson/reference_khalil_exercise_logic/engines/TapSelectImagesV2.tsx:134:    const timer = setTimeout(() => karaoke.play(item.question_audio_key, t), 600);
plans-lesson/reference_khalil_exercise_logic/engines/TapSelectImagesV2.tsx:140:    const t = timings[item.question_audio_key];
plans-lesson/reference_khalil_exercise_logic/engines/TapSelectImagesV2.tsx:141:    if (t) karaoke.play(item.question_audio_key, t);
plans-lesson/reference_khalil_exercise_logic/engines/TapSelectImagesV2.tsx:151:    karaoke.stop();
plans-lesson/reference_khalil_exercise_logic/engines/TapSelectImagesV2.tsx:184:  const words = timings[item.question_audio_key];
plans-lesson/reference_khalil_exercise_logic/engines/TapSelectImagesV2.tsx:185:  const isActive = karaoke.activeKey === item.question_audio_key;
plans-lesson/reference_khalil_exercise_logic/engines/TapSelectWordsV2.tsx:12:  question_audio_key: string;
plans-lesson/reference_khalil_exercise_logic/engines/TapSelectWordsV2.tsx:19:  audio_base: string;
plans-lesson/reference_khalil_exercise_logic/engines/TapSelectWordsV2.tsx:36:function useKaraoke(audioBase: string) {
plans-lesson/reference_khalil_exercise_logic/engines/TapSelectWordsV2.tsx:91:async function loadTimings(audioBase: string, key: string): Promise<WordTiming[] | null> {
plans-lesson/reference_khalil_exercise_logic/engines/TapSelectWordsV2.tsx:106:  audio_base,
plans-lesson/reference_khalil_exercise_logic/engines/TapSelectWordsV2.tsx:116:  const karaoke = useKaraoke(audio_base);
plans-lesson/reference_khalil_exercise_logic/engines/TapSelectWordsV2.tsx:121:      const t = await loadTimings(audio_base, it.question_audio_key);
plans-lesson/reference_khalil_exercise_logic/engines/TapSelectWordsV2.tsx:122:      if (t) setTimings((p) => ({ ...p, [it.question_audio_key]: t }));
plans-lesson/reference_khalil_exercise_logic/engines/TapSelectWordsV2.tsx:125:  }, [audio_base]);
plans-lesson/reference_khalil_exercise_logic/engines/TapSelectWordsV2.tsx:128:    karaoke.stop();
plans-lesson/reference_khalil_exercise_logic/engines/TapSelectWordsV2.tsx:134:    const t = timings[item.question_audio_key];
plans-lesson/reference_khalil_exercise_logic/engines/TapSelectWordsV2.tsx:136:    const timer = setTimeout(() => karaoke.play(item.question_audio_key, t), 600);
plans-lesson/reference_khalil_exercise_logic/engines/TapSelectWordsV2.tsx:142:    const t = timings[item.question_audio_key];
plans-lesson/reference_khalil_exercise_logic/engines/TapSelectWordsV2.tsx:143:    if (t) karaoke.play(item.question_audio_key, t);
plans-lesson/reference_khalil_exercise_logic/engines/TapSelectWordsV2.tsx:153:    karaoke.stop();
plans-lesson/reference_khalil_exercise_logic/engines/TapSelectWordsV2.tsx:186:  const words = timings[item.question_audio_key];
plans-lesson/reference_khalil_exercise_logic/engines/TapSelectWordsV2.tsx:187:  const isActive = karaoke.activeKey === item.question_audio_key;
plans-lesson/reference_khalil_exercise_logic/engines/RankOrderExerciseV2.tsx:13:  question_audio_key: string;
plans-lesson/reference_khalil_exercise_logic/engines/RankOrderExerciseV2.tsx:25:  audio_base: string;
plans-lesson/reference_khalil_exercise_logic/engines/RankOrderExerciseV2.tsx:34:async function loadTimings(audioBase: string, key: string): Promise<WordTiming[] | null> {
plans-lesson/reference_khalil_exercise_logic/engines/RankOrderExerciseV2.tsx:113:  audio_base,
plans-lesson/reference_khalil_exercise_logic/engines/RankOrderExerciseV2.tsx:123:  const audio = useExerciseAudio(audio_base);
plans-lesson/reference_khalil_exercise_logic/engines/RankOrderExerciseV2.tsx:128:      const t = await loadTimings(audio_base, it.question_audio_key);
plans-lesson/reference_khalil_exercise_logic/engines/RankOrderExerciseV2.tsx:130:        setTimings((p) => ({ ...p, [it.question_audio_key]: t }));
plans-lesson/reference_khalil_exercise_logic/engines/RankOrderExerciseV2.tsx:133:  }, [audio_base, items]);
plans-lesson/reference_khalil_exercise_logic/engines/RankOrderExerciseV2.tsx:136:    audio.stop();
plans-lesson/reference_khalil_exercise_logic/engines/RankOrderExerciseV2.tsx:141:    const t = timings[item.question_audio_key];
plans-lesson/reference_khalil_exercise_logic/engines/RankOrderExerciseV2.tsx:145:      audio.play(item.question_audio_key, t);
plans-lesson/reference_khalil_exercise_logic/engines/RankOrderExerciseV2.tsx:153:    const t = timings[item.question_audio_key];
plans-lesson/reference_khalil_exercise_logic/engines/RankOrderExerciseV2.tsx:154:    if (t) audio.play(item.question_audio_key, t);
plans-lesson/reference_khalil_exercise_logic/engines/RankOrderExerciseV2.tsx:173:    audio.stop();
plans-lesson/reference_khalil_exercise_logic/engines/DragMatchExerciseV2.tsx:28:  question_audio_key: string;
plans-lesson/reference_khalil_exercise_logic/engines/DragMatchExerciseV2.tsx:34:  audio_base: string;
plans-lesson/reference_khalil_exercise_logic/engines/DragMatchExerciseV2.tsx:50:import { useKaraoke, loadTimings, type WordTiming } from "../useKaraoke";
plans-lesson/reference_khalil_exercise_logic/engines/DragMatchExerciseV2.tsx:241:  audio_base,
plans-lesson/reference_khalil_exercise_logic/engines/DragMatchExerciseV2.tsx:253:  const karaoke = useKaraoke(audio_base);
plans-lesson/reference_khalil_exercise_logic/engines/DragMatchExerciseV2.tsx:263:      const t = await loadTimings(audio_base, it.question_audio_key);
plans-lesson/reference_khalil_exercise_logic/engines/DragMatchExerciseV2.tsx:264:      if (t) setTimings((p) => ({ ...p, [it.question_audio_key]: t }));
plans-lesson/reference_khalil_exercise_logic/engines/DragMatchExerciseV2.tsx:267:  }, [audio_base]);
plans-lesson/reference_khalil_exercise_logic/engines/DragMatchExerciseV2.tsx:270:    karaoke.stop();
plans-lesson/reference_khalil_exercise_logic/engines/DragMatchExerciseV2.tsx:277:    const t = timings[item.question_audio_key];
plans-lesson/reference_khalil_exercise_logic/engines/DragMatchExerciseV2.tsx:279:    const timer = setTimeout(() => karaoke.play(item.question_audio_key, t), 500);
plans-lesson/reference_khalil_exercise_logic/engines/DragMatchExerciseV2.tsx:285:    const t = timings[item.question_audio_key];
plans-lesson/reference_khalil_exercise_logic/engines/DragMatchExerciseV2.tsx:286:    if (t) karaoke.play(item.question_audio_key, t);
plans-lesson/reference_khalil_exercise_logic/engines/DragMatchExerciseV2.tsx:315:      karaoke.stop();
plans-lesson/reference_khalil_exercise_logic/engines/DragMatchExerciseV2.tsx:333:  const words = timings[item.question_audio_key];
plans-lesson/reference_khalil_exercise_logic/engines/DragMatchExerciseV2.tsx:334:  const isActive = karaoke.activeKey === item.question_audio_key;
plans-lesson/reference_khalil_exercise_logic/engines/LengthLabExerciseV2.tsx:3:import { useKaraoke, loadTimings, type WordTiming } from "../useKaraoke";
plans-lesson/reference_khalil_exercise_logic/engines/LengthLabExerciseV2.tsx:16:  question_audio_key: string;
plans-lesson/reference_khalil_exercise_logic/engines/LengthLabExerciseV2.tsx:27:  audio_base: string;
plans-lesson/reference_khalil_exercise_logic/engines/LengthLabExerciseV2.tsx:51:  audio_base,
plans-lesson/reference_khalil_exercise_logic/engines/LengthLabExerciseV2.tsx:61:  const karaoke = useKaraoke(audio_base);
plans-lesson/reference_khalil_exercise_logic/engines/LengthLabExerciseV2.tsx:65:      const t = await loadTimings(audio_base, it.question_audio_key);
plans-lesson/reference_khalil_exercise_logic/engines/LengthLabExerciseV2.tsx:66:      if (t) setTimings((p) => ({ ...p, [it.question_audio_key]: t }));
plans-lesson/reference_khalil_exercise_logic/engines/LengthLabExerciseV2.tsx:68:  }, [audio_base, items]);
plans-lesson/reference_khalil_exercise_logic/engines/LengthLabExerciseV2.tsx:71:    karaoke.stop();
plans-lesson/reference_khalil_exercise_logic/engines/LengthLabExerciseV2.tsx:75:    const t = timings[item.question_audio_key];
plans-lesson/reference_khalil_exercise_logic/engines/LengthLabExerciseV2.tsx:78:    const timer = setTimeout(() => karaoke.play(item.question_audio_key, t), 420);
plans-lesson/reference_khalil_exercise_logic/engines/LengthLabExerciseV2.tsx:83:    const t = timings[item.question_audio_key];
plans-lesson/reference_khalil_exercise_logic/engines/LengthLabExerciseV2.tsx:84:    if (t) karaoke.play(item.question_audio_key, t);
plans-lesson/reference_khalil_exercise_logic/engines/LengthLabExerciseV2.tsx:91:    karaoke.stop();
plans-lesson/reference_khalil_exercise_logic/engines/LengthLabExerciseV2.tsx:137:    const isActive = karaoke.activeKey === item.question_audio_key;
plans-lesson/reference_khalil_exercise_logic/pages/Lesson20ExercisesPage.tsx:6:import { LESSON_20_EXERCISE_1, LESSON_20_EXERCISE_1_AUDIO_BASE } from "../features/lesson-v2/content/lesson20_exercise1";
plans-lesson/reference_khalil_exercise_logic/pages/Lesson20ExercisesPage.tsx:7:import { LESSON_20_EXERCISE_2, LESSON_20_EXERCISE_2_AUDIO_BASE } from "../features/lesson-v2/content/lesson20_exercise2";
plans-lesson/reference_khalil_exercise_logic/pages/Lesson20ExercisesPage.tsx:8:import { LESSON_20_EXERCISE_3, LESSON_20_EXERCISE_3_AUDIO_BASE } from "../features/lesson-v2/content/lesson20_exercise3";
plans-lesson/reference_khalil_exercise_logic/pages/Lesson20ExercisesPage.tsx:9:import { LESSON_20_EXERCISE_4, LESSON_20_EXERCISE_4_AUDIO_BASE } from "../features/lesson-v2/content/lesson20_exercise4";
plans-lesson/reference_khalil_exercise_logic/pages/Lesson20ExercisesPage.tsx:17:    return <NumberChoiceExerciseV2 key="ex1" items={LESSON_20_EXERCISE_1} audio_base={LESSON_20_EXERCISE_1_AUDIO_BASE} onComplete={() => setStage("ex2")} />;
plans-lesson/reference_khalil_exercise_logic/pages/Lesson20ExercisesPage.tsx:20:    return <NumberChoiceExerciseV2 key="ex2" items={LESSON_20_EXERCISE_2} audio_base={LESSON_20_EXERCISE_2_AUDIO_BASE} onComplete={() => setStage("ex3")} />;
plans-lesson/reference_khalil_exercise_logic/pages/Lesson20ExercisesPage.tsx:23:    return <NumberChoiceExerciseV2 key="ex3" items={LESSON_20_EXERCISE_3} audio_base={LESSON_20_EXERCISE_3_AUDIO_BASE} onComplete={() => setStage("ex4")} />;
plans-lesson/reference_khalil_exercise_logic/pages/Lesson20ExercisesPage.tsx:26:    return <NumberSortExerciseV2 key="ex4" items={LESSON_20_EXERCISE_4} audio_base={LESSON_20_EXERCISE_4_AUDIO_BASE} onComplete={() => setStage("done")} />;
plans-lesson/reference_khalil_exercise_logic/pages/Lesson21ExercisesPage.tsx:5:import { LESSON_21_EXERCISE_1, LESSON_21_EXERCISE_1_AUDIO_BASE } from "../features/lesson-v2/content/lesson21_exercise1";
plans-lesson/reference_khalil_exercise_logic/pages/Lesson21ExercisesPage.tsx:6:import { LESSON_21_EXERCISE_2, LESSON_21_EXERCISE_2_AUDIO_BASE } from "../features/lesson-v2/content/lesson21_exercise2";
plans-lesson/reference_khalil_exercise_logic/pages/Lesson21ExercisesPage.tsx:7:import { LESSON_21_EXERCISE_3, LESSON_21_EXERCISE_3_AUDIO_BASE } from "../features/lesson-v2/content/lesson21_exercise3";
plans-lesson/reference_khalil_exercise_logic/pages/Lesson21ExercisesPage.tsx:21:        audio_base={LESSON_21_EXERCISE_1_AUDIO_BASE}
plans-lesson/reference_khalil_exercise_logic/pages/Lesson21ExercisesPage.tsx:34:        audio_base={LESSON_21_EXERCISE_2_AUDIO_BASE}
plans-lesson/reference_khalil_exercise_logic/pages/Lesson21ExercisesPage.tsx:47:        audio_base={LESSON_21_EXERCISE_3_AUDIO_BASE}
plans-lesson/reference_khalil_exercise_logic/pages/Lesson22ExercisesPage.tsx:6:  LESSON_22_EXERCISE_1_AUDIO_BASE,
plans-lesson/reference_khalil_exercise_logic/pages/Lesson22ExercisesPage.tsx:11:  LESSON_22_EXERCISE_2_AUDIO_BASE,
plans-lesson/reference_khalil_exercise_logic/pages/Lesson22ExercisesPage.tsx:16:  LESSON_22_EXERCISE_3_AUDIO_BASE,
plans-lesson/reference_khalil_exercise_logic/pages/Lesson22ExercisesPage.tsx:29:        audio_base={LESSON_22_EXERCISE_1_AUDIO_BASE}
plans-lesson/reference_khalil_exercise_logic/pages/Lesson22ExercisesPage.tsx:42:        audio_base={LESSON_22_EXERCISE_2_AUDIO_BASE}
plans-lesson/reference_khalil_exercise_logic/pages/Lesson22ExercisesPage.tsx:55:        audio_base={LESSON_22_EXERCISE_3_AUDIO_BASE}
plans-lesson/reference_khalil_exercise_logic/content/lesson21_exercise1.ts:3:export const LESSON_21_EXERCISE_1_AUDIO_BASE = "/audio/teachers/taline/lesson_21_exercises";
plans-lesson/reference_khalil_exercise_logic/content/lesson21_exercise1.ts:20:    question_audio_key: "l21_scene_q1",
plans-lesson/reference_khalil_exercise_logic/content/lesson21_exercise1.ts:32:    question_audio_key: "l21_scene_q2",
plans-lesson/reference_khalil_exercise_logic/content/lesson21_exercise1.ts:44:    question_audio_key: "l21_scene_q3",
plans-lesson/reference_khalil_exercise_logic/content/lesson21_exercise1.ts:56:    question_audio_key: "l21_scene_q4",
plans-lesson/reference_khalil_exercise_logic/content/lesson21_exercise1.ts:68:    question_audio_key: "l21_scene_q5",
plans-lesson/reference_khalil_exercise_logic/content/lesson21_exercise2.ts:3:export const LESSON_21_EXERCISE_2_AUDIO_BASE = "/audio/teachers/taline/lesson_21_exercises";
plans-lesson/reference_khalil_exercise_logic/content/lesson21_exercise2.ts:16:    question_audio_key: "l21_abc_q1",
plans-lesson/reference_khalil_exercise_logic/content/lesson21_exercise2.ts:31:    question_audio_key: "l21_abc_q2",
plans-lesson/reference_khalil_exercise_logic/content/lesson21_exercise2.ts:46:    question_audio_key: "l21_abc_q3",
plans-lesson/reference_khalil_exercise_logic/content/lesson21_exercise2.ts:61:    question_audio_key: "l21_abc_q4",
plans-lesson/reference_khalil_exercise_logic/content/lesson21_exercise2.ts:76:    question_audio_key: "l21_abc_q5",
plans-lesson/reference_khalil_exercise_logic/content/lesson21_exercise3.ts:3:export const LESSON_21_EXERCISE_3_AUDIO_BASE = "/audio/teachers/taline/lesson_21_exercises";
plans-lesson/reference_khalil_exercise_logic/content/lesson21_exercise3.ts:10:    question_audio_key: "l21_tf_q1",
plans-lesson/reference_khalil_exercise_logic/content/lesson21_exercise3.ts:24:    question_audio_key: "l21_tf_q2",
plans-lesson/reference_khalil_exercise_logic/content/lesson21_exercise3.ts:38:    question_audio_key: "l21_tf_q3",
plans-lesson/reference_khalil_exercise_logic/content/lesson21_exercise3.ts:52:    question_audio_key: "l21_tf_q4",
plans-lesson/reference_khalil_exercise_logic/content/lesson21_exercise3.ts:66:    question_audio_key: "l21_tf_q5",
plans-lesson/reference_khalil_exercise_logic/content/lesson21_exercise4.ts:3:export const LESSON_21_EXERCISE_4_AUDIO_BASE = "/audio/teachers/taline/lesson_21_exercises";
plans-lesson/reference_khalil_exercise_logic/content/lesson21_exercise4.ts:10:    question_audio_key: "l21_ex4_q1",
plans-lesson/reference_khalil_exercise_logic/content/lesson21_exercise4.ts:24:    question_audio_key: "l21_ex4_q2",
plans-lesson/reference_khalil_exercise_logic/content/lesson21_exercise4.ts:38:    question_audio_key: "l21_ex4_q3",
plans-lesson/reference_khalil_exercise_logic/content/lesson21_exercise4.ts:52:    question_audio_key: "l21_ex4_q4",
plans-lesson/reference_khalil_exercise_logic/content/lesson21_exercise4.ts:66:    question_audio_key: "l21_ex4_q5",
plans-lesson/reference_khalil_exercise_logic/content/lesson22_exercise1.ts:3:export const LESSON_22_EXERCISE_1_AUDIO_BASE = "/audio/teachers/taline/lesson_22_exercises";
plans-lesson/reference_khalil_exercise_logic/content/lesson22_exercise1.ts:10:    question_audio_key: "l22_ex1_q1",
plans-lesson/reference_khalil_exercise_logic/content/lesson22_exercise1.ts:25:    question_audio_key: "l22_ex1_q2",
plans-lesson/reference_khalil_exercise_logic/content/lesson22_exercise1.ts:40:    question_audio_key: "l22_ex1_q3",
plans-lesson/reference_khalil_exercise_logic/content/lesson22_exercise1.ts:55:    question_audio_key: "l22_ex1_q4",
plans-lesson/reference_khalil_exercise_logic/content/lesson22_exercise1.ts:70:    question_audio_key: "l22_ex1_q5",
plans-lesson/reference_khalil_exercise_logic/content/lesson22_exercise2.ts:3:export const LESSON_22_EXERCISE_2_AUDIO_BASE = "/audio/teachers/taline/lesson_22_exercises";
plans-lesson/reference_khalil_exercise_logic/content/lesson22_exercise2.ts:10:    question_audio_key: "l22_ex2_q1",
plans-lesson/reference_khalil_exercise_logic/content/lesson22_exercise2.ts:25:    question_audio_key: "l22_ex2_q2",
plans-lesson/reference_khalil_exercise_logic/content/lesson22_exercise2.ts:40:    question_audio_key: "l22_ex2_q3",
plans-lesson/reference_khalil_exercise_logic/content/lesson22_exercise2.ts:55:    question_audio_key: "l22_ex2_q4",
plans-lesson/reference_khalil_exercise_logic/content/lesson22_exercise2.ts:70:    question_audio_key: "l22_ex2_q5",
plans-lesson/reference_khalil_exercise_logic/content/lesson22_exercise3.ts:3:export const LESSON_22_EXERCISE_3_AUDIO_BASE = "/audio/teachers/taline/lesson_22_exercises";
plans-lesson/reference_khalil_exercise_logic/content/lesson22_exercise3.ts:10:    question_audio_key: "l22_ex3_q1",
plans-lesson/reference_khalil_exercise_logic/content/lesson22_exercise3.ts:26:    question_audio_key: "l22_ex3_q2",
plans-lesson/reference_khalil_exercise_logic/content/lesson22_exercise3.ts:42:    question_audio_key: "l22_ex3_q3",
plans-lesson/reference_khalil_exercise_logic/content/lesson22_exercise3.ts:58:    question_audio_key: "l22_ex3_q4",
plans-lesson/reference_khalil_exercise_logic/content/lesson22_exercise3.ts:74:    question_audio_key: "l22_ex3_q5",


## 2) قاعدة شارة الإجابة الصحيحة والخاطئة

- الصحيح:
  - setFeedback('correct') أو setFeedbackState('correct')
  - تشغيل /audio/v2_feedback/correct.mp3
  - ظهور ✅ أَحْسَنْتَ

- الخطأ:
  - setFeedback('wrong') أو setFeedbackState('wrong')
  - تشغيل /audio/v2_feedback/retry.mp3
  - ظهور حَاوِلْ مَرَّةً أُخْرَى ✨

plans-lesson/reference_khalil_exercise_logic/engines/TapSelectImagesV2.tsx:98:const FEEDBACK_CORRECT = "/audio/v2_feedback/correct.mp3";
plans-lesson/reference_khalil_exercise_logic/engines/TapSelectImagesV2.tsx:99:const FEEDBACK_RETRY = "/audio/v2_feedback/retry.mp3";
plans-lesson/reference_khalil_exercise_logic/engines/TapSelectImagesV2.tsx:110:  const [feedbackState, setFeedbackState] = useState<"idle" | "correct" | "wrong">("idle");
plans-lesson/reference_khalil_exercise_logic/engines/TapSelectImagesV2.tsx:128:    setFeedbackState("idle");
plans-lesson/reference_khalil_exercise_logic/engines/TapSelectImagesV2.tsx:145:    const a = new Audio(correct ? FEEDBACK_CORRECT : FEEDBACK_RETRY);
plans-lesson/reference_khalil_exercise_logic/engines/TapSelectImagesV2.tsx:158:      setFeedbackState("correct");
plans-lesson/reference_khalil_exercise_logic/engines/TapSelectImagesV2.tsx:166:      setFeedbackState("wrong");
plans-lesson/reference_khalil_exercise_logic/engines/TapSelectImagesV2.tsx:176:          setFeedbackState("idle");
plans-lesson/reference_khalil_exercise_logic/engines/TapSelectImagesV2.tsx:199:      ? "✅ أَحْسَنْتَ"
plans-lesson/reference_khalil_exercise_logic/engines/TapSelectImagesV2.tsx:200:      : "حَاوِلْ مَرَّةً أُخْرَى ✨";
plans-lesson/reference_khalil_exercise_logic/engines/TapSelectImagesV2.tsx:449:          animation: "feedbackPop .35s cubic-bezier(0.34, 1.56, 0.64, 1)",
plans-lesson/reference_khalil_exercise_logic/engines/TapSelectImagesV2.tsx:465:          animation: "feedbackPop .45s cubic-bezier(0.34, 1.56, 0.64, 1)",
plans-lesson/reference_khalil_exercise_logic/engines/TapSelectImagesV2.tsx:485:          animation: "feedbackPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
plans-lesson/reference_khalil_exercise_logic/engines/TapSelectImagesV2.tsx:502:        @keyframes feedbackPop {
plans-lesson/reference_khalil_exercise_logic/engines/TapSelectWordsV2.tsx:101:const FEEDBACK_CORRECT = "/audio/v2_feedback/correct.mp3";
plans-lesson/reference_khalil_exercise_logic/engines/TapSelectWordsV2.tsx:102:const FEEDBACK_RETRY = "/audio/v2_feedback/retry.mp3";
plans-lesson/reference_khalil_exercise_logic/engines/TapSelectWordsV2.tsx:112:  const [feedbackState, setFeedbackState] = useState<"idle" | "correct" | "wrong">("idle");
plans-lesson/reference_khalil_exercise_logic/engines/TapSelectWordsV2.tsx:130:    setFeedbackState("idle");
plans-lesson/reference_khalil_exercise_logic/engines/TapSelectWordsV2.tsx:147:    const a = new Audio(correct ? FEEDBACK_CORRECT : FEEDBACK_RETRY);
plans-lesson/reference_khalil_exercise_logic/engines/TapSelectWordsV2.tsx:160:      setFeedbackState("correct");
plans-lesson/reference_khalil_exercise_logic/engines/TapSelectWordsV2.tsx:168:      setFeedbackState("wrong");
plans-lesson/reference_khalil_exercise_logic/engines/TapSelectWordsV2.tsx:178:          setFeedbackState("idle");
plans-lesson/reference_khalil_exercise_logic/engines/TapSelectWordsV2.tsx:201:      ? "✅ أَحْسَنْتَ"
plans-lesson/reference_khalil_exercise_logic/engines/TapSelectWordsV2.tsx:202:      : "حَاوِلْ مَرَّةً أُخْرَى ✨";
plans-lesson/reference_khalil_exercise_logic/engines/TapSelectWordsV2.tsx:465:          animation: "feedbackPop .35s cubic-bezier(0.34, 1.56, 0.64, 1)",
plans-lesson/reference_khalil_exercise_logic/engines/TapSelectWordsV2.tsx:481:          animation: "feedbackPop .45s cubic-bezier(0.34, 1.56, 0.64, 1)",
plans-lesson/reference_khalil_exercise_logic/engines/TapSelectWordsV2.tsx:501:          animation: "feedbackPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
plans-lesson/reference_khalil_exercise_logic/engines/TapSelectWordsV2.tsx:518:        @keyframes feedbackPop {
plans-lesson/reference_khalil_exercise_logic/engines/RankOrderExerciseV2.tsx:31:const FEEDBACK_CORRECT = "/audio/v2_feedback/correct.mp3";
plans-lesson/reference_khalil_exercise_logic/engines/RankOrderExerciseV2.tsx:32:const FEEDBACK_RETRY = "/audio/v2_feedback/retry.mp3";
plans-lesson/reference_khalil_exercise_logic/engines/RankOrderExerciseV2.tsx:119:  const [feedback, setFeedback] = useState<"idle" | "correct" | "wrong">("idle");
plans-lesson/reference_khalil_exercise_logic/engines/RankOrderExerciseV2.tsx:138:    setFeedback("idle");
plans-lesson/reference_khalil_exercise_logic/engines/RankOrderExerciseV2.tsx:158:    const a = new Audio(correct ? FEEDBACK_CORRECT : FEEDBACK_RETRY);
plans-lesson/reference_khalil_exercise_logic/engines/RankOrderExerciseV2.tsx:179:      setFeedback("correct");
plans-lesson/reference_khalil_exercise_logic/engines/RankOrderExerciseV2.tsx:186:      setFeedback("wrong");
plans-lesson/reference_khalil_exercise_logic/engines/RankOrderExerciseV2.tsx:189:        setFeedback("idle");
plans-lesson/reference_khalil_exercise_logic/engines/RankOrderExerciseV2.tsx:209:      ? "✅ أَحْسَنْتَ"
plans-lesson/reference_khalil_exercise_logic/engines/RankOrderExerciseV2.tsx:210:      : "حَاوِلْ مَرَّةً أُخْرَى ✨";
plans-lesson/reference_khalil_exercise_logic/engines/RankOrderExerciseV2.tsx:222:          @keyframes feedbackPop {
plans-lesson/reference_khalil_exercise_logic/engines/RankOrderExerciseV2.tsx:419:            animation: "feedbackPop .35s cubic-bezier(0.34, 1.56, 0.64, 1)",
plans-lesson/reference_khalil_exercise_logic/engines/RankOrderExerciseV2.tsx:435:            animation: "feedbackPop .45s cubic-bezier(0.34, 1.56, 0.64, 1)",
plans-lesson/reference_khalil_exercise_logic/engines/DragMatchExerciseV2.tsx:52:const FEEDBACK_CORRECT = "/audio/v2_feedback/correct.mp3";
plans-lesson/reference_khalil_exercise_logic/engines/DragMatchExerciseV2.tsx:53:const FEEDBACK_RETRY = "/audio/v2_feedback/retry.mp3";
plans-lesson/reference_khalil_exercise_logic/engines/DragMatchExerciseV2.tsx:251:  const [feedbackState, setFeedbackState] = useState<"idle" | "complete">("idle");
plans-lesson/reference_khalil_exercise_logic/engines/DragMatchExerciseV2.tsx:272:    setFeedbackState("idle");
plans-lesson/reference_khalil_exercise_logic/engines/DragMatchExerciseV2.tsx:290:    const a = new Audio(correct ? FEEDBACK_CORRECT : FEEDBACK_RETRY);
plans-lesson/reference_khalil_exercise_logic/engines/DragMatchExerciseV2.tsx:319:        setFeedbackState("complete");
plans-lesson/reference_khalil_exercise_logic/engines/DragMatchExerciseV2.tsx:571:          animation: "feedbackPop .35s cubic-bezier(0.34, 1.56, 0.64, 1)",
plans-lesson/reference_khalil_exercise_logic/engines/DragMatchExerciseV2.tsx:587:          animation: "feedbackPop .45s cubic-bezier(0.34, 1.56, 0.64, 1)",
plans-lesson/reference_khalil_exercise_logic/engines/DragMatchExerciseV2.tsx:607:          animation: "feedbackPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
plans-lesson/reference_khalil_exercise_logic/engines/DragMatchExerciseV2.tsx:612:        }}>✅ أَحْسَنْتَ</div>
plans-lesson/reference_khalil_exercise_logic/engines/DragMatchExerciseV2.tsx:627:        @keyframes feedbackPop {
plans-lesson/reference_khalil_exercise_logic/engines/LengthLabExerciseV2.tsx:58:  const [feedback, setFeedback] = useState<"idle" | "correct" | "wrong">("idle");
plans-lesson/reference_khalil_exercise_logic/engines/LengthLabExerciseV2.tsx:73:    setFeedback("idle");
plans-lesson/reference_khalil_exercise_logic/engines/LengthLabExerciseV2.tsx:94:      setFeedback("correct");
plans-lesson/reference_khalil_exercise_logic/engines/LengthLabExerciseV2.tsx:95:      new Audio("/audio/v2_feedback/correct.mp3").play().catch(() => {});
plans-lesson/reference_khalil_exercise_logic/engines/LengthLabExerciseV2.tsx:101:      setFeedback("wrong");
plans-lesson/reference_khalil_exercise_logic/engines/LengthLabExerciseV2.tsx:102:      new Audio("/audio/v2_feedback/retry.mp3").play().catch(() => {});
plans-lesson/reference_khalil_exercise_logic/engines/LengthLabExerciseV2.tsx:105:        setFeedback("idle");
plans-lesson/reference_khalil_exercise_logic/engines/LengthLabExerciseV2.tsx:174:          @keyframes feedbackPop {
plans-lesson/reference_khalil_exercise_logic/engines/LengthLabExerciseV2.tsx:270:                {feedback === "correct" ? "أَحْسَنْتَ" : "حَاوِلْ مَرَّةً أُخْرَى"}
plans-lesson/reference_khalil_exercise_logic/engines/LengthLabExerciseV2.tsx:496:    animation: "feedbackPop .30s ease",
plans-lesson/reference_khalil_exercise_logic/engines/LengthLabExerciseV2.tsx:515:    animation: "feedbackPop .32s cubic-bezier(0.34, 1.56, 0.64, 1)",
plans-lesson/reference_khalil_exercise_logic/engines/LengthLabExerciseV2.tsx:538:    animation: "feedbackPop .30s ease",


## 3) قاعدة إيقاف صوت السؤال عند الإجابة

plans-lesson/reference_khalil_exercise_logic/engines/TapSelectImagesV2.tsx:47:      audioRef.current.pause();
plans-lesson/reference_khalil_exercise_logic/engines/TapSelectImagesV2.tsx:48:      audioRef.current.currentTime = 0;
plans-lesson/reference_khalil_exercise_logic/engines/TapSelectImagesV2.tsx:126:    karaoke.stop();
plans-lesson/reference_khalil_exercise_logic/engines/TapSelectImagesV2.tsx:151:    karaoke.stop();
plans-lesson/reference_khalil_exercise_logic/engines/TapSelectWordsV2.tsx:47:      audioRef.current.pause();
plans-lesson/reference_khalil_exercise_logic/engines/TapSelectWordsV2.tsx:48:      audioRef.current.currentTime = 0;
plans-lesson/reference_khalil_exercise_logic/engines/TapSelectWordsV2.tsx:74:    if (myGen !== genRef.current) { audio.pause(); return; }
plans-lesson/reference_khalil_exercise_logic/engines/TapSelectWordsV2.tsx:128:    karaoke.stop();
plans-lesson/reference_khalil_exercise_logic/engines/TapSelectWordsV2.tsx:153:    karaoke.stop();
plans-lesson/reference_khalil_exercise_logic/engines/RankOrderExerciseV2.tsx:54:      audioRef.current.pause();
plans-lesson/reference_khalil_exercise_logic/engines/RankOrderExerciseV2.tsx:55:      audioRef.current.currentTime = 0;
plans-lesson/reference_khalil_exercise_logic/engines/RankOrderExerciseV2.tsx:86:        audio.pause();
plans-lesson/reference_khalil_exercise_logic/engines/RankOrderExerciseV2.tsx:136:    audio.stop();
plans-lesson/reference_khalil_exercise_logic/engines/RankOrderExerciseV2.tsx:173:    audio.stop();
plans-lesson/reference_khalil_exercise_logic/engines/DragMatchExerciseV2.tsx:270:    karaoke.stop();
plans-lesson/reference_khalil_exercise_logic/engines/DragMatchExerciseV2.tsx:315:      karaoke.stop();
plans-lesson/reference_khalil_exercise_logic/engines/LengthLabExerciseV2.tsx:71:    karaoke.stop();
plans-lesson/reference_khalil_exercise_logic/engines/LengthLabExerciseV2.tsx:91:    karaoke.stop();


## 4) صوت خليل

- صوت خليل المستعمل في السكربتات السابقة:
  - ar-DZ-IsmaelNeural
  - pitch غالبًا +8Hz
  - rate غالبًا -3%

plans-lesson/reference_khalil_exercise_logic/audio_scripts/gen_lesson3.py:11:    "khalil": {"voice": "ar-DZ-IsmaelNeural", "pitch": "+8Hz", "rate": "-3%"},
plans-lesson/reference_khalil_exercise_logic/audio_scripts/gen_lesson3.py:12:    "taline": {"voice": "ar-DZ-AminaNeural",  "pitch": "+10Hz", "rate": "-3%"},
plans-lesson/reference_khalil_exercise_logic/audio_scripts/gen_lesson3.py:17:    ("l3_intro",   "khalil", "اليَوْمَ نَكْتَشِفُ حَوَاسَّنَا الخَمْسَ فِي حَظِيرَةِ القَالَة"),
plans-lesson/reference_khalil_exercise_logic/audio_scripts/gen_lesson3.py:18:    ("l3_sight",   "khalil", "أَرَى البُحَيْرَةَ بِعَيْنِي، هَذِهِ حَاسَّةُ الرُّؤْيَةِ"),
plans-lesson/reference_khalil_exercise_logic/audio_scripts/gen_lesson3.py:21:    ("l3_taste",   "khalil", "أَتَذَوَّقُ الثِّمَارَ بِلِسَانِي، هَذِهِ حَاسَّةُ الذَّوْق"),
plans-lesson/reference_khalil_exercise_logic/audio_scripts/gen_lesson3.py:22:    ("l3_touch",   "khalil", "أَلْمَسُ لِحَاءَ الأَشْجَارِ بِيَدِي، هَذِهِ حَاسَّةُ اللَّمْس"),
plans-lesson/reference_khalil_exercise_logic/audio_scripts/gen_lesson3.py:27:    comm = edge_tts.Communicate(text, v["voice"], rate=v["rate"], pitch=v["pitch"], boundary="WordBoundary")
plans-lesson/reference_khalil_exercise_logic/audio_scripts/gen_lesson4.py:7:    "khalil": {"voice": "ar-DZ-IsmaelNeural", "pitch": "+8Hz", "rate": "-3%"},
plans-lesson/reference_khalil_exercise_logic/audio_scripts/gen_lesson4.py:8:    "taline": {"voice": "ar-DZ-AminaNeural", "pitch": "+10Hz", "rate": "-3%"},
plans-lesson/reference_khalil_exercise_logic/audio_scripts/gen_lesson4.py:11:    ("l4_intro", "khalil", "مَرْحَباً يَا أَعِزَّائِي، اليَوْمَ سَنَتَعَلَّمُ الفَرْقَ بَيْنَ أَكْثَر وَأَقَلّ وَيُسَاوِي"),
plans-lesson/reference_khalil_exercise_logic/audio_scripts/gen_lesson4.py:12:    ("l4_more",  "khalil", "التُّفَّاحُ أَكْثَرُ مِنَ المَوْز"),
plans-lesson/reference_khalil_exercise_logic/audio_scripts/gen_lesson4.py:14:    ("l4_equal", "khalil", "العِنَبُ يُسَاوِي الكَرَز، هُمَا مُتَسَاوِيَانِ"),
plans-lesson/reference_khalil_exercise_logic/audio_scripts/gen_lesson4.py:16:    ("l4_outro", "khalil", "أَحْسَنْتَ! هَيَّا نَتَدَرَّبُ عَلَى المُقَارَنَة"),
plans-lesson/reference_khalil_exercise_logic/audio_scripts/gen_lesson4.py:20:    comm = edge_tts.Communicate(text, v["voice"], rate=v["rate"], pitch=v["pitch"], boundary="WordBoundary")
plans-lesson/reference_khalil_exercise_logic/audio_scripts/gen_lesson5.py:11:    "khalil": {"voice": "ar-DZ-IsmaelNeural", "pitch": "+8Hz", "rate": "-3%"},
plans-lesson/reference_khalil_exercise_logic/audio_scripts/gen_lesson5.py:12:    "taline": {"voice": "ar-DZ-AminaNeural", "pitch": "+10Hz", "rate": "-3%"},
plans-lesson/reference_khalil_exercise_logic/audio_scripts/gen_lesson5.py:44:    comm = edge_tts.Communicate(text, v["voice"], rate=v["rate"], pitch=v["pitch"], boundary="WordBoundary")
plans-lesson/reference_khalil_exercise_logic/audio_scripts/gen_lesson7.py:11:    "khalil": {"voice": "ar-DZ-IsmaelNeural", "pitch": "+8Hz", "rate": "-3%"},
plans-lesson/reference_khalil_exercise_logic/audio_scripts/gen_lesson7.py:12:    "taline": {"voice": "ar-DZ-AminaNeural", "pitch": "+10Hz", "rate": "-3%"},
plans-lesson/reference_khalil_exercise_logic/audio_scripts/gen_lesson7.py:16:    ("s1_intro",   "khalil", "أَهْلاً بِكُمْ! أَنَا خَلِيل، حَوَاسُّنَا الخَمْسُ كُنُوزٌ ثَمِينَةٌ، تَعَالَوْا نَتَعَلَّمُ كَيْفَ نُحَافِظُ عَلَيْهَا"),
plans-lesson/reference_khalil_exercise_logic/audio_scripts/gen_lesson7.py:17:    ("s2_sight",   "khalil", "بِعَيْنَيَّ أَرَى الأَلْوَانَ وَالطَّرِيق، أَحْمِي عَيْنَيَّ مِنَ الضَّوْءِ القَوِيِّ وَلَا أَفْرُكُهُمَا"),
plans-lesson/reference_khalil_exercise_logic/audio_scripts/gen_lesson7.py:18:    ("s3_hearing", "khalil", "بِأُذُنَيَّ أَسْمَعُ الأَصْوَاتَ الجَمِيلَة، الصَّوْتُ العَالِي جِدّاً يُؤْذِي سَمْعِي"),
plans-lesson/reference_khalil_exercise_logic/audio_scripts/gen_lesson7.py:19:    ("s4_protect", "khalil", "هَذَا النَّجَّارُ يَضَعُ نَظَّارَةً عَلَى عَيْنَيْهِ وَوَاقِياً عَلَى أُذُنَيْهِ، إِنَّهُ يَحْمِي حَوَاسَّهُ"),
plans-lesson/reference_khalil_exercise_logic/audio_scripts/gen_lesson7.py:20:    ("s5_clean",   "khalil", "أَغْسِلُ يَدَيَّ وَأُنَظِّفُ جِسْمِي كُلَّ يَوْم، النَّظَافَةُ تَحْمِي حَوَاسِّي"),
plans-lesson/reference_khalil_exercise_logic/audio_scripts/gen_lesson7.py:21:    ("s6_closing", "khalil", "أَحْسَنْتُمْ! أَنَا أَعْتَنِي بِأَعْضَاءِ الحِسِّ لِأُحَافِظَ عَلَى حَوَاسِّي لِأَنَّهَا تُسَهِّلُ لِي العَيْش"),
plans-lesson/reference_khalil_exercise_logic/audio_scripts/gen_lesson7.py:25:    ("l7_ex1_q1", "khalil", "غَسْلُ اليَدَيْنِ بِالمَاءِ وَالصَّابُونِ، تَصَرُّفٌ مُفِيدٌ أَمْ ضَارٌّ؟"),
plans-lesson/reference_khalil_exercise_logic/audio_scripts/gen_lesson7.py:26:    ("l7_ex1_q2", "khalil", "تَنْظِيفُ الأَسْنَانِ بِالفُرْشَاةِ، تَصَرُّفٌ مُفِيدٌ أَمْ ضَارٌّ؟"),
plans-lesson/reference_khalil_exercise_logic/audio_scripts/gen_lesson7.py:27:    ("l7_ex1_q3", "khalil", "وَضْعُ نَظَّارَةِ الوِقَايَةِ أَثْنَاءَ العَمَلِ، تَصَرُّفٌ مُفِيدٌ أَمْ ضَارٌّ؟"),
plans-lesson/reference_khalil_exercise_logic/audio_scripts/gen_lesson7.py:28:    ("l7_ex1_q4", "khalil", "فَرْكُ العَيْنَيْنِ بِقُوَّةٍ بِاليَدَيْنِ، تَصَرُّفٌ مُفِيدٌ أَمْ ضَارٌّ؟"),
plans-lesson/reference_khalil_exercise_logic/audio_scripts/gen_lesson7.py:29:    ("l7_ex1_q5", "khalil", "الاِسْتِمَاعُ لِصَوْتٍ عَالٍ جِدّاً قُرْبَ الأُذُنِ، تَصَرُّفٌ مُفِيدٌ أَمْ ضَارٌّ؟"),
plans-lesson/reference_khalil_exercise_logic/audio_scripts/gen_lesson7.py:30:    ("l7_ex2_q1", "khalil", "القِرَاءَةُ فِي إِضَاءَةٍ جَيِّدَةٍ، تَصَرُّفٌ مُفِيدٌ أَمْ ضَارٌّ؟"),
plans-lesson/reference_khalil_exercise_logic/audio_scripts/gen_lesson7.py:31:    ("l7_ex2_q2", "khalil", "تَقْرِيبُ الوَجْهِ كَثِيراً مِنَ الشَّاشَةِ، تَصَرُّفٌ مُفِيدٌ أَمْ ضَارٌّ؟"),
plans-lesson/reference_khalil_exercise_logic/audio_scripts/gen_lesson7.py:32:    ("l7_ex2_q3", "khalil", "تَنْظِيفُ الأُذُنِ بِلُطْفٍ بَعْدَ الاِسْتِحْمَامِ، تَصَرُّفٌ مُفِيدٌ أَمْ ضَارٌّ؟"),
plans-lesson/reference_khalil_exercise_logic/audio_scripts/gen_lesson7.py:33:    ("l7_ex2_q4", "khalil", "أَكْلُ طَعَامٍ فَاسِدٍ مُتَعَفِّنٍ، تَصَرُّفٌ مُفِيدٌ أَمْ ضَارٌّ؟"),
plans-lesson/reference_khalil_exercise_logic/audio_scripts/gen_lesson7.py:34:    ("l7_ex2_q5", "khalil", "أَكْلُ الفَوَاكِهِ وَالخُضَرِ الطَّازَجَةِ، تَصَرُّفٌ مُفِيدٌ أَمْ ضَارٌّ؟"),
plans-lesson/reference_khalil_exercise_logic/audio_scripts/gen_lesson7.py:35:    ("l7_ex3_q1", "khalil", "غَسْلُ الفَاكِهَةِ قَبْلَ أَكْلِهَا، تَصَرُّفٌ مُفِيدٌ أَمْ ضَارٌّ؟"),
plans-lesson/reference_khalil_exercise_logic/audio_scripts/gen_lesson7.py:36:    ("l7_ex3_q2", "khalil", "الصُّرَاخُ بِصَوْتٍ عَالٍ قُرْبَ أُذُنِ الآخَرِ، تَصَرُّفٌ مُفِيدٌ أَمْ ضَارٌّ؟"),
plans-lesson/reference_khalil_exercise_logic/audio_scripts/gen_lesson7.py:37:    ("l7_ex3_q3", "khalil", "وَضْعُ النَّظَّارَةِ الشَّمْسِيَّةِ فِي الشَّمْسِ، تَصَرُّفٌ مُفِيدٌ أَمْ ضَارٌّ؟"),
plans-lesson/reference_khalil_exercise_logic/audio_scripts/gen_lesson7.py:38:    ("l7_ex3_q4", "khalil", "حَمْلُ قِدْرٍ سَاخِنٍ بِيَدَيْنِ عَارِيَتَيْنِ، تَصَرُّفٌ مُفِيدٌ أَمْ ضَارٌّ؟"),
plans-lesson/reference_khalil_exercise_logic/audio_scripts/gen_lesson7.py:39:    ("l7_ex3_q5", "khalil", "تَغْطِيَةُ الفَمِ بِالمِرْفَقِ عِنْدَ السُّعَالِ، تَصَرُّفٌ مُفِيدٌ أَمْ ضَارٌّ؟"),
plans-lesson/reference_khalil_exercise_logic/audio_scripts/gen_lesson7.py:44:    comm = edge_tts.Communicate(text, v["voice"], rate=v["rate"], pitch=v["pitch"], boundary="WordBoundary")
plans-lesson/reference_khalil_exercise_logic/audio_scripts/gen_audio_world1_intro.py:19:    "khalil": {"voice": "ar-DZ-IsmaelNeural", "rate": "-5%", "pitch": "+20Hz"},
plans-lesson/reference_khalil_exercise_logic/audio_scripts/gen_audio_world1_intro.py:20:    "taline": {"voice": "ar-DZ-AminaNeural",  "rate": "-5%", "pitch": "+10Hz"},
plans-lesson/reference_khalil_exercise_logic/audio_scripts/gen_audio_world1_intro.py:30:     "khalil"),
plans-lesson/reference_khalil_exercise_logic/audio_scripts/gen_audio_world1_intro.py:38:     "khalil"),
plans-lesson/reference_khalil_exercise_logic/audio_scripts/gen_audio_world1_intro.py:50:     "khalil"),
plans-lesson/reference_khalil_exercise_logic/audio_scripts/gen_audio_world1_intro.py:54:     "khalil"),
plans-lesson/reference_khalil_exercise_logic/audio_scripts/gen_audio_world1_intro.py:68:        text, cfg["voice"], rate=cfg["rate"], pitch=cfg["pitch"],
plans-lesson/reference_khalil_exercise_logic/audio_scripts/gen_audio_world1_intro.py:94:    for i, (filename, text, voice_key) in enumerate(ITEMS, 1):


## 5) الخلاصة التي يجب اتباعها في الدرس 23

1. لا ننشئ شارة جديدة من الصفر.
2. ننسخ منطق TapSelectImagesV2 أو TapSelectWordsV2 في:
   - feedbackState
   - playFeedback
   - karaoke.stop عند الإجابة
   - feedbackPop
3. ننسخ منطق الصوت من:
   - audio_base
   - question_audio_key
   - loadTimings
   - karaoke.play
4. صوت خليل يولد بنفس إعدادات ar-DZ-IsmaelNeural.
5. لا تظهر أَحْسَنْتَ إلا بعد تحقق منطقي صحيح.
