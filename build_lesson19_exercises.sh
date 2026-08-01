#!/data/data/com.termux/files/usr/bin/bash
set -e
cd "$HOME/madrasati-dz"

echo "===== تحقق ====="
[ -f src/features/lesson-v2/content/lesson19.ts ] || { echo "❌ lesson19.ts غير موجود"; exit 1; }
[ -d public/lessons/v2/lesson19-food ] || { echo "❌ صور الدرس 19 غير موجودة"; exit 1; }

echo "✅ نكمل إنشاء التمارين"

cat > src/features/lesson-v2/content/lesson19_exercise1.ts <<'TS'
import type { RankOrderItem } from "../exercises-v2/RankOrderExerciseV2";

export const LESSON_19_EXERCISE_1_AUDIO_BASE = "/audio/lesson_19_exercise1";

export const LESSON_19_EXERCISE_1: RankOrderItem[] = [
  {
    scene_image: "/lessons/v2/lesson19-food/s2.webp",
    question_audio_key: "q1",
    title: "أَتَعَرَّفُ الخُضَرَ وَالفَوَاكِهَ",
    instruction: "أُنْظُرُوا إِلَى الطَّعَامِ.",
    question: "مَا مَجْمُوعَةُ التُّفَّاحِ؟",
    mode: "pickRank",
    correct: "الفَوَاكِهُ",
    options: ["اللُّحُومُ", "الفَوَاكِهُ", "الحَلِيبُ", "الحُبُوبُ"],
  },
  {
    scene_image: "/lessons/v2/lesson19-food/s2.webp",
    question_audio_key: "q2",
    title: "أَتَعَرَّفُ الخُضَرَ وَالفَوَاكِهَ",
    instruction: "أُنْظُرُوا إِلَى الجَزَرِ.",
    question: "مَا مَجْمُوعَةُ الجَزَرِ؟",
    mode: "pickRank",
    correct: "الخُضَرُ",
    options: ["الخُضَرُ", "الأَسْمَاكُ", "الحُبُوبُ", "اللُّحُومُ"],
  },
  {
    scene_image: "/lessons/v2/lesson19-food/s2.webp",
    question_audio_key: "q3",
    title: "أَتَعَرَّفُ الخُضَرَ وَالفَوَاكِهَ",
    instruction: "اِخْتَرُوا غِذَاءً مِنَ الفَوَاكِهِ.",
    question: "أَيُّ غِذَاءٍ مِنَ الفَوَاكِهِ؟",
    mode: "pickRank",
    correct: "البُرْتُقَالُ",
    options: ["الجَزَرُ", "اللَّحْمُ", "البُرْتُقَالُ", "الخُبْزُ"],
  },
  {
    scene_image: "/lessons/v2/lesson19-food/s2.webp",
    question_audio_key: "q4",
    title: "أَتَعَرَّفُ الخُضَرَ وَالفَوَاكِهَ",
    instruction: "اِخْتَرُوا غِذَاءً مِنَ الخُضَرِ.",
    question: "أَيُّ غِذَاءٍ مِنَ الخُضَرِ؟",
    mode: "pickRank",
    correct: "الطَّمَاطِمُ",
    options: ["الحَلِيبُ", "السَّمَكُ", "الأَرُزُّ", "الطَّمَاطِمُ"],
  },
  {
    scene_image: "/lessons/v2/lesson19-food/s2.webp",
    question_audio_key: "q5",
    title: "أَتَعَرَّفُ الخُضَرَ وَالفَوَاكِهَ",
    instruction: "اِخْتَرُوا الجُمْلَةَ الصَّحِيحَةَ.",
    question: "أَيُّ جُمْلَةٍ صَحِيحَةٌ؟",
    mode: "pickRank",
    correct: "التُّفَّاحُ مِنَ الفَوَاكِهِ",
    options: ["التُّفَّاحُ مِنَ الفَوَاكِهِ", "الجَزَرُ مِنَ اللُّحُومِ", "الطَّمَاطِمُ مِنَ الحَلِيبِ", "البُرْتُقَالُ مِنَ الحُبُوبِ"],
  },
];
TS

cat > src/features/lesson-v2/content/lesson19_exercise2.ts <<'TS'
import type { RankOrderItem } from "../exercises-v2/RankOrderExerciseV2";

export const LESSON_19_EXERCISE_2_AUDIO_BASE = "/audio/lesson_19_exercise2";

export const LESSON_19_EXERCISE_2: RankOrderItem[] = [
  {
    scene_image: "/lessons/v2/lesson19-food/s3.webp",
    question_audio_key: "q1",
    title: "أَتَعَرَّفُ اللُّحُومَ وَالأَسْمَاكَ",
    instruction: "أُنْظُرُوا إِلَى السَّمَكِ.",
    question: "مَا مَجْمُوعَةُ السَّمَكِ؟",
    mode: "pickRank",
    correct: "الأَسْمَاكُ",
    options: ["الحُبُوبُ", "الحَلِيبُ", "الأَسْمَاكُ", "الفَوَاكِهُ"],
  },
  {
    scene_image: "/lessons/v2/lesson19-food/s3.webp",
    question_audio_key: "q2",
    title: "أَتَعَرَّفُ اللُّحُومَ وَالأَسْمَاكَ",
    instruction: "أُنْظُرُوا إِلَى الدَّجَاجِ.",
    question: "مَا مَجْمُوعَةُ الدَّجَاجِ؟",
    mode: "pickRank",
    correct: "اللُّحُومُ",
    options: ["اللُّحُومُ", "الخُضَرُ", "الحُبُوبُ", "الحَلِيبُ"],
  },
  {
    scene_image: "/lessons/v2/lesson19-food/s3.webp",
    question_audio_key: "q3",
    title: "أَتَعَرَّفُ اللُّحُومَ وَالأَسْمَاكَ",
    instruction: "اِخْتَرُوا غِذَاءً مِنَ اللُّحُومِ.",
    question: "أَيُّ غِذَاءٍ مِنَ اللُّحُومِ؟",
    mode: "pickRank",
    correct: "الدَّجَاجُ",
    options: ["الجُبْنُ", "الخُبْزُ", "التُّفَّاحُ", "الدَّجَاجُ"],
  },
  {
    scene_image: "/lessons/v2/lesson19-food/s3.webp",
    question_audio_key: "q4",
    title: "أَتَعَرَّفُ اللُّحُومَ وَالأَسْمَاكَ",
    instruction: "اِخْتَرُوا غِذَاءً مِنَ الأَسْمَاكِ.",
    question: "أَيُّ غِذَاءٍ مِنَ الأَسْمَاكِ؟",
    mode: "pickRank",
    correct: "السَّمَكُ",
    options: ["الجَزَرُ", "السَّمَكُ", "الحَلِيبُ", "الأَرُزُّ"],
  },
  {
    scene_image: "/lessons/v2/lesson19-food/s3.webp",
    question_audio_key: "q5",
    title: "أَتَعَرَّفُ اللُّحُومَ وَالأَسْمَاكَ",
    instruction: "اِخْتَرُوا الجُمْلَةَ الصَّحِيحَةَ.",
    question: "أَيُّ جُمْلَةٍ صَحِيحَةٌ؟",
    mode: "pickRank",
    correct: "السَّمَكُ مِنَ الأَسْمَاكِ",
    options: ["الخُبْزُ مِنَ الأَسْمَاكِ", "الحَلِيبُ مِنَ اللُّحُومِ", "السَّمَكُ مِنَ الأَسْمَاكِ", "التُّفَّاحُ مِنَ اللُّحُومِ"],
  },
];
TS

cat > src/features/lesson-v2/content/lesson19_exercise3.ts <<'TS'
import type { RankOrderItem } from "../exercises-v2/RankOrderExerciseV2";

export const LESSON_19_EXERCISE_3_AUDIO_BASE = "/audio/lesson_19_exercise3";

export const LESSON_19_EXERCISE_3: RankOrderItem[] = [
  {
    scene_image: "/lessons/v2/lesson19-food/s4.webp",
    question_audio_key: "q1",
    title: "أَتَعَرَّفُ الحَلِيبَ وَمُشْتَقَّاتِهِ",
    instruction: "أُنْظُرُوا إِلَى الحَلِيبِ.",
    question: "مَا مَجْمُوعَةُ الحَلِيبِ؟",
    mode: "pickRank",
    correct: "الحَلِيبُ وَمُشْتَقَّاتُهُ",
    options: ["الحُبُوبُ", "اللُّحُومُ", "الحَلِيبُ وَمُشْتَقَّاتُهُ", "الخُضَرُ"],
  },
  {
    scene_image: "/lessons/v2/lesson19-food/s4.webp",
    question_audio_key: "q2",
    title: "أَتَعَرَّفُ الحَلِيبَ وَمُشْتَقَّاتِهِ",
    instruction: "أُنْظُرُوا إِلَى الجُبْنِ.",
    question: "مَا مَجْمُوعَةُ الجُبْنِ؟",
    mode: "pickRank",
    correct: "الحَلِيبُ وَمُشْتَقَّاتُهُ",
    options: ["الحَلِيبُ وَمُشْتَقَّاتُهُ", "الفَوَاكِهُ", "الأَسْمَاكُ", "الحُبُوبُ"],
  },
  {
    scene_image: "/lessons/v2/lesson19-food/s4.webp",
    question_audio_key: "q3",
    title: "أَتَعَرَّفُ الحَلِيبَ وَمُشْتَقَّاتِهِ",
    instruction: "اِخْتَرُوا غِذَاءً مِنْ مُشْتَقَّاتِ الحَلِيبِ.",
    question: "أَيُّ غِذَاءٍ مِنْ مُشْتَقَّاتِ الحَلِيبِ؟",
    mode: "pickRank",
    correct: "الجُبْنُ",
    options: ["السَّمَكُ", "الخُبْزُ", "الجُبْنُ", "الجَزَرُ"],
  },
  {
    scene_image: "/lessons/v2/lesson19-food/s4.webp",
    question_audio_key: "q4",
    title: "أَتَعَرَّفُ الحَلِيبَ وَمُشْتَقَّاتِهِ",
    instruction: "اِخْتَرُوا غِذَاءً لَيْسَ مِنْ مَجْمُوعَةِ الحَلِيبِ.",
    question: "أَيُّ غِذَاءٍ لَيْسَ مِنْ مَجْمُوعَةِ الحَلِيبِ؟",
    mode: "pickRank",
    correct: "الخُبْزُ",
    options: ["الحَلِيبُ", "اليَاغُورْتُ", "الجُبْنُ", "الخُبْزُ"],
  },
  {
    scene_image: "/lessons/v2/lesson19-food/s4.webp",
    question_audio_key: "q5",
    title: "أَتَعَرَّفُ الحَلِيبَ وَمُشْتَقَّاتِهِ",
    instruction: "اِخْتَرُوا الجُمْلَةَ الصَّحِيحَةَ.",
    question: "أَيُّ جُمْلَةٍ صَحِيحَةٌ؟",
    mode: "pickRank",
    correct: "الجُبْنُ مِنْ مُشْتَقَّاتِ الحَلِيبِ",
    options: ["الجُبْنُ مِنْ مُشْتَقَّاتِ الحَلِيبِ", "الحَلِيبُ مِنَ الحُبُوبِ", "اليَاغُورْتُ مِنَ اللُّحُومِ", "الخُبْزُ مِنَ الحَلِيبِ"],
  },
];
TS

cat > src/features/lesson-v2/content/lesson19_exercise4.ts <<'TS'
import type { RankOrderItem } from "../exercises-v2/RankOrderExerciseV2";

export const LESSON_19_EXERCISE_4_AUDIO_BASE = "/audio/lesson_19_exercise4";

export const LESSON_19_EXERCISE_4: RankOrderItem[] = [
  {
    scene_image: "/lessons/v2/lesson19-food/s5.webp",
    question_audio_key: "q1",
    title: "أَتَعَرَّفُ الحُبُوبَ وَمُشْتَقَّاتِهَا",
    instruction: "أُنْظُرُوا إِلَى الخُبْزِ.",
    question: "مَا مَجْمُوعَةُ الخُبْزِ؟",
    mode: "pickRank",
    correct: "الحُبُوبُ وَمُشْتَقَّاتُهَا",
    options: ["اللُّحُومُ", "الحُبُوبُ وَمُشْتَقَّاتُهَا", "الفَوَاكِهُ", "الحَلِيبُ"],
  },
  {
    scene_image: "/lessons/v2/lesson19-food/s5.webp",
    question_audio_key: "q2",
    title: "أَتَعَرَّفُ الحُبُوبَ وَمُشْتَقَّاتِهَا",
    instruction: "أُنْظُرُوا إِلَى الأَرُزِّ.",
    question: "مَا مَجْمُوعَةُ الأَرُزِّ؟",
    mode: "pickRank",
    correct: "الحُبُوبُ وَمُشْتَقَّاتُهَا",
    options: ["الحَلِيبُ", "الخُضَرُ", "الأَسْمَاكُ", "الحُبُوبُ وَمُشْتَقَّاتُهَا"],
  },
  {
    scene_image: "/lessons/v2/lesson19-food/s5.webp",
    question_audio_key: "q3",
    title: "أَتَعَرَّفُ الحُبُوبَ وَمُشْتَقَّاتِهَا",
    instruction: "اِخْتَرُوا غِذَاءً مِنَ الحُبُوبِ.",
    question: "أَيُّ غِذَاءٍ مِنَ الحُبُوبِ؟",
    mode: "pickRank",
    correct: "المَعْكَرُونَةُ",
    options: ["الجُبْنُ", "المَعْكَرُونَةُ", "السَّمَكُ", "الطَّمَاطِمُ"],
  },
  {
    scene_image: "/lessons/v2/lesson19-food/s5.webp",
    question_audio_key: "q4",
    title: "أَتَعَرَّفُ الحُبُوبَ وَمُشْتَقَّاتِهَا",
    instruction: "اِخْتَرُوا غِذَاءً لَيْسَ مِنَ الحُبُوبِ.",
    question: "أَيُّ غِذَاءٍ لَيْسَ مِنَ الحُبُوبِ؟",
    mode: "pickRank",
    correct: "السَّمَكُ",
    options: ["الخُبْزُ", "الأَرُزُّ", "السَّمَكُ", "المَعْكَرُونَةُ"],
  },
  {
    scene_image: "/lessons/v2/lesson19-food/s5.webp",
    question_audio_key: "q5",
    title: "أَتَعَرَّفُ الحُبُوبَ وَمُشْتَقَّاتِهَا",
    instruction: "اِخْتَرُوا الجُمْلَةَ الصَّحِيحَةَ.",
    question: "أَيُّ جُمْلَةٍ صَحِيحَةٌ؟",
    mode: "pickRank",
    correct: "الخُبْزُ مِنَ الحُبُوبِ",
    options: ["الحَلِيبُ مِنَ الحُبُوبِ", "الخُبْزُ مِنَ الحُبُوبِ", "السَّمَكُ مِنَ الحُبُوبِ", "الجُبْنُ مِنَ الحُبُوبِ"],
  },
];
TS

cat > src/pages/Lesson19ExercisesPage.tsx <<'TSX'
import { useState } from "react";
import LessonCompleteV2 from "../features/lesson-v2/components/LessonCompleteV2";
import RankOrderExerciseV2 from "../features/lesson-v2/exercises-v2/RankOrderExerciseV2";

import { LESSON_19_EXERCISE_1, LESSON_19_EXERCISE_1_AUDIO_BASE } from "../features/lesson-v2/content/lesson19_exercise1";
import { LESSON_19_EXERCISE_2, LESSON_19_EXERCISE_2_AUDIO_BASE } from "../features/lesson-v2/content/lesson19_exercise2";
import { LESSON_19_EXERCISE_3, LESSON_19_EXERCISE_3_AUDIO_BASE } from "../features/lesson-v2/content/lesson19_exercise3";
import { LESSON_19_EXERCISE_4, LESSON_19_EXERCISE_4_AUDIO_BASE } from "../features/lesson-v2/content/lesson19_exercise4";

type Stage = "ex1" | "ex2" | "ex3" | "ex4" | "done";

export default function Lesson19ExercisesPage() {
  const [stage, setStage] = useState<Stage>("ex1");

  if (stage === "ex1") return <RankOrderExerciseV2 items={LESSON_19_EXERCISE_1} audio_base={LESSON_19_EXERCISE_1_AUDIO_BASE} onComplete={() => setStage("ex2")} />;
  if (stage === "ex2") return <RankOrderExerciseV2 items={LESSON_19_EXERCISE_2} audio_base={LESSON_19_EXERCISE_2_AUDIO_BASE} onComplete={() => setStage("ex3")} />;
  if (stage === "ex3") return <RankOrderExerciseV2 items={LESSON_19_EXERCISE_3} audio_base={LESSON_19_EXERCISE_3_AUDIO_BASE} onComplete={() => setStage("ex4")} />;
  if (stage === "ex4") return <RankOrderExerciseV2 items={LESSON_19_EXERCISE_4} audio_base={LESSON_19_EXERCISE_4_AUDIO_BASE} onComplete={() => setStage("done")} />;

  return (
    <LessonCompleteV2
      message="أَحْسَنْتَ! أَصْبَحْتَ تَعْرِفُ كَيْفَ تُصَنِّفُ أَغْذِيَتَكَ إِلَى مَجْمُوعَاتٍ. 🎉"
      onReplay={() => setStage("ex1")}
    />
  );
}
TSX

echo "===== توليد صوت التمارين ====="

python - <<'PY'
import asyncio, json, pathlib, subprocess, sys
VOICE="ar-DZ-AminaNeural"
RATE="+10%"
BASE=pathlib.Path("public/audio")
texts={
"lesson_19_exercise1":{"q1":"مَا مَجْمُوعَةُ التُّفَّاحِ؟","q2":"مَا مَجْمُوعَةُ الجَزَرِ؟","q3":"أَيُّ غِذَاءٍ مِنَ الفَوَاكِهِ؟","q4":"أَيُّ غِذَاءٍ مِنَ الخُضَرِ؟","q5":"أَيُّ جُمْلَةٍ صَحِيحَةٌ؟"},
"lesson_19_exercise2":{"q1":"مَا مَجْمُوعَةُ السَّمَكِ؟","q2":"مَا مَجْمُوعَةُ الدَّجَاجِ؟","q3":"أَيُّ غِذَاءٍ مِنَ اللُّحُومِ؟","q4":"أَيُّ غِذَاءٍ مِنَ الأَسْمَاكِ؟","q5":"أَيُّ جُمْلَةٍ صَحِيحَةٌ؟"},
"lesson_19_exercise3":{"q1":"مَا مَجْمُوعَةُ الحَلِيبِ؟","q2":"مَا مَجْمُوعَةُ الجُبْنِ؟","q3":"أَيُّ غِذَاءٍ مِنْ مُشْتَقَّاتِ الحَلِيبِ؟","q4":"أَيُّ غِذَاءٍ لَيْسَ مِنْ مَجْمُوعَةِ الحَلِيبِ؟","q5":"أَيُّ جُمْلَةٍ صَحِيحَةٌ؟"},
"lesson_19_exercise4":{"q1":"مَا مَجْمُوعَةُ الخُبْزِ؟","q2":"مَا مَجْمُوعَةُ الأَرُزِّ؟","q3":"أَيُّ غِذَاءٍ مِنَ الحُبُوبِ؟","q4":"أَيُّ غِذَاءٍ لَيْسَ مِنَ الحُبُوبِ؟","q5":"أَيُّ جُمْلَةٍ صَحِيحَةٌ؟"},
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

echo "===== ربط App ====="
python - <<'PY'
from pathlib import Path
p=Path("src/App.tsx")
txt=p.read_text(encoding="utf-8")
route='        <Route path="/lesson19-exercises" element={lazy(() => import("./pages/Lesson19ExercisesPage"), "تمارين الدرس 19")} />'
if "/lesson19-exercises" not in txt:
    txt=txt.replace(
        '        <Route path="/lesson18-exercises" element={lazy(() => import("./pages/Lesson18ExercisesPage"), "تمارين الدرس 18")} />',
        '        <Route path="/lesson18-exercises" element={lazy(() => import("./pages/Lesson18ExercisesPage"), "تمارين الدرس 18")} />\n'+route
    )
p.write_text(txt,encoding="utf-8")
PY

echo "===== تحقق ====="
ls -lh src/features/lesson-v2/content/lesson19_exercise*.ts
ls -lh src/pages/Lesson19ExercisesPage.tsx
ls -lh public/audio/lesson_19_exercise1
grep -n "lesson19-exercises" src/App.tsx src/pages/LessonV2Page.tsx || true

echo "===== Build ====="
npm run build

echo "===== Git status ====="
git status --short
