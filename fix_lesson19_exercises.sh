#!/data/data/com.termux/files/usr/bin/bash
set -e
cd "$HOME/madrasati-dz"

echo "===== 1) إصلاح صفحة تمارين الدرس 19 مثل الدرس 18 ====="

cat > src/pages/Lesson19ExercisesPage.tsx <<'TSX'
import { useState } from "react";
import LessonCompleteV2 from "../features/lesson-v2/components/LessonCompleteV2";
import RankOrderExerciseV2 from "../features/lesson-v2/exercises-v2/RankOrderExerciseV2";

import {
  LESSON_19_EXERCISE_1,
  LESSON_19_EXERCISE_1_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson19_exercise1";

import {
  LESSON_19_EXERCISE_2,
  LESSON_19_EXERCISE_2_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson19_exercise2";

import {
  LESSON_19_EXERCISE_3,
  LESSON_19_EXERCISE_3_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson19_exercise3";

import {
  LESSON_19_EXERCISE_4,
  LESSON_19_EXERCISE_4_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson19_exercise4";

type Stage = "ex1" | "ex2" | "ex3" | "ex4" | "done";

export default function Lesson19ExercisesPage() {
  const [stage, setStage] = useState<Stage>("ex1");

  if (stage === "ex1")
    return (
      <RankOrderExerciseV2
        key="ex1"
        items={LESSON_19_EXERCISE_1}
        audio_base={LESSON_19_EXERCISE_1_AUDIO_BASE}
        onComplete={() => setStage("ex2")}
      />
    );

  if (stage === "ex2")
    return (
      <RankOrderExerciseV2
        key="ex2"
        items={LESSON_19_EXERCISE_2}
        audio_base={LESSON_19_EXERCISE_2_AUDIO_BASE}
        onComplete={() => setStage("ex3")}
      />
    );

  if (stage === "ex3")
    return (
      <RankOrderExerciseV2
        key="ex3"
        items={LESSON_19_EXERCISE_3}
        audio_base={LESSON_19_EXERCISE_3_AUDIO_BASE}
        onComplete={() => setStage("ex4")}
      />
    );

  if (stage === "ex4")
    return (
      <RankOrderExerciseV2
        key="ex4"
        items={LESSON_19_EXERCISE_4}
        audio_base={LESSON_19_EXERCISE_4_AUDIO_BASE}
        onComplete={() => setStage("done")}
      />
    );

  return (
    <LessonCompleteV2
      message="أَحْسَنْتَ! أَصْبَحْتَ تَعْرِفُ كَيْفَ تُصَنِّفُ أَغْذِيَتَكَ إِلَى مَجْمُوعَاتٍ. 🎉"
      onReplay={() => setStage("ex1")}
    />
  );
}
TSX

echo "===== 2) تعديل الصياغة في ملفات التمارين ====="

python - <<'PY'
from pathlib import Path

repls = {
"مَا مَجْمُوعَةُ التُّفَّاحِ؟": "مَا صِنْفُ التُّفَّاحِ؟",
"مَا مَجْمُوعَةُ الجَزَرِ؟": "مَا صِنْفُ الجَزَرِ؟",
"مَا مَجْمُوعَةُ السَّمَكِ؟": "مَا صِنْفُ السَّمَكِ؟",
"مَا مَجْمُوعَةُ الدَّجَاجِ؟": "مَا صِنْفُ الدَّجَاجِ؟",
"مَا مَجْمُوعَةُ الحَلِيبِ؟": "مَا صِنْفُ الحَلِيبِ؟",
"مَا مَجْمُوعَةُ الجُبْنِ؟": "مَا صِنْفُ الجُبْنِ؟",
"مَا مَجْمُوعَةُ الخُبْزِ؟": "مَا صِنْفُ الخُبْزِ؟",
"مَا مَجْمُوعَةُ الأَرُزِّ؟": "مَا صِنْفُ الأَرُزِّ؟",

'correct: "الفَوَاكِهُ"': 'correct: "مِنْ صِنْفِ الفَوَاكِهِ"',
'correct: "الخُضَرُ"': 'correct: "مِنْ صِنْفِ الخُضَرِ"',
'correct: "الأَسْمَاكُ"': 'correct: "مِنْ صِنْفِ الأَسْمَاكِ"',
'correct: "اللُّحُومُ"': 'correct: "مِنْ صِنْفِ اللُّحُومِ"',
'correct: "الحَلِيبُ وَمُشْتَقَّاتُهُ"': 'correct: "مِنْ صِنْفِ الحَلِيبِ وَمُشْتَقَّاتِهِ"',
'correct: "الحُبُوبُ وَمُشْتَقَّاتُهَا"': 'correct: "مِنْ صِنْفِ الحُبُوبِ وَمُشْتَقَّاتِهَا"',
}

for p in Path("src/features/lesson-v2/content").glob("lesson19_exercise*.ts"):
    txt = p.read_text(encoding="utf-8")
    for a,b in repls.items():
        txt = txt.replace(a,b)

    txt = txt.replace('"الفَوَاكِهُ"', '"مِنْ صِنْفِ الفَوَاكِهِ"')
    txt = txt.replace('"الخُضَرُ"', '"مِنْ صِنْفِ الخُضَرِ"')
    txt = txt.replace('"الأَسْمَاكُ"', '"مِنْ صِنْفِ الأَسْمَاكِ"')
    txt = txt.replace('"اللُّحُومُ"', '"مِنْ صِنْفِ اللُّحُومِ"')
    txt = txt.replace('"الحَلِيبُ وَمُشْتَقَّاتُهُ"', '"مِنْ صِنْفِ الحَلِيبِ وَمُشْتَقَّاتِهِ"')
    txt = txt.replace('"الحُبُوبُ وَمُشْتَقَّاتُهَا"', '"مِنْ صِنْفِ الحُبُوبِ وَمُشْتَقَّاتِهَا"')

    p.write_text(txt, encoding="utf-8")
    print("✅", p)
PY

echo "===== 3) إعادة توليد صوت أسئلة الصنف فقط ====="

python - <<'PY'
import asyncio, json, pathlib, subprocess, sys

VOICE="ar-DZ-AminaNeural"
RATE="+10%"
BASE=pathlib.Path("public/audio")

texts={
"lesson_19_exercise1":{"q1":"مَا صِنْفُ التُّفَّاحِ؟","q2":"مَا صِنْفُ الجَزَرِ؟"},
"lesson_19_exercise2":{"q1":"مَا صِنْفُ السَّمَكِ؟","q2":"مَا صِنْفُ الدَّجَاجِ؟"},
"lesson_19_exercise3":{"q1":"مَا صِنْفُ الحَلِيبِ؟","q2":"مَا صِنْفُ الجُبْنِ؟"},
"lesson_19_exercise4":{"q1":"مَا صِنْفُ الخُبْزِ؟","q2":"مَا صِنْفُ الأَرُزِّ؟"},
}

try:
    import edge_tts
except Exception:
    subprocess.check_call([sys.executable,"-m","pip","install","edge-tts"])
    import edge_tts

async def one(folder,key,text):
    out=BASE/folder
    mp3=out/f"{key}.mp3"
    js=out/f"{key}.json"
    com=edge_tts.Communicate(text,VOICE,rate=RATE)
    words=[]
    with open(mp3,"wb") as f:
        async for chunk in com.stream():
            if chunk["type"]=="audio":
                f.write(chunk["data"])
            elif chunk["type"]=="WordBoundary":
                words.append({
                    "text":chunk.get("text",""),
                    "offset":int(chunk["offset"]/10000)+60,
                    "duration":int(chunk["duration"]/10000),
                })
    js.write_text(json.dumps(words,ensure_ascii=False,indent=2),encoding="utf-8")
    print("✅",folder,key,text)

async def main():
    for folder,qs in texts.items():
        for key,text in qs.items():
            await one(folder,key,text)

asyncio.run(main())
PY

echo "===== 4) تحقق ====="
grep -n "key=\"ex\|مَا صِنْفُ\|مِنْ صِنْفِ" src/pages/Lesson19ExercisesPage.tsx src/features/lesson-v2/content/lesson19_exercise*.ts | head -80

echo "===== 5) Build ====="
npm run build

echo "===== Git status ====="
git status --short
