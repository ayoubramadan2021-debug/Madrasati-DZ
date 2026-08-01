#!/data/data/com.termux/files/usr/bin/bash
set -e
cd "$HOME/madrasati-dz"

echo "===== 1) إصلاح محرك الاختيار: يطبع الجواب + أيقونة صح/خطأ ====="

python - <<'PY'
from pathlib import Path

p = Path("src/features/lesson-v2/exercises-v2/NumberChoiceExerciseV2.tsx")
txt = p.read_text(encoding="utf-8")

txt = txt.replace(
'  const [locked, setLocked] = useState(false);',
'  const [locked, setLocked] = useState(false);\n  const [feedback, setFeedback] = useState<"idle" | "correct" | "wrong">("idle");\n  const [filled, setFilled] = useState<string | null>(null);'
)

txt = txt.replace(
'    setLocked(false);',
'    setLocked(false);\n    setFeedback("idle");\n    setFilled(null);'
)

txt = txt.replace(
'''    if (value === item.correct) {
      setLocked(true);
      new Audio("/audio/v2_feedback/correct.mp3").play().catch(() => {});
      setTimeout(() => {
        if (idx < items.length - 1) setIdx(idx + 1);
        else onComplete?.();
      }, 850);
    } else {
      new Audio("/audio/v2_feedback/retry.mp3").play().catch(() => {});
    }''',
'''    if (value === item.correct) {
      setLocked(true);
      setFeedback("correct");
      setFilled(value);
      new Audio("/audio/v2_feedback/correct.mp3").play().catch(() => {});
      setTimeout(() => {
        if (idx < items.length - 1) setIdx(idx + 1);
        else onComplete?.();
      }, 1200);
    } else {
      setFeedback("wrong");
      new Audio("/audio/v2_feedback/retry.mp3").play().catch(() => {});
      setTimeout(() => setFeedback("idle"), 900);
    }'''
)

txt = txt.replace(
'''                  {n}
                </div>''',
'''                  {n === "?" && filled ? filled : n}
                </div>'''
)

txt = txt.replace(
'''        <div style={styles.questionBox}>''',
'''        {feedback !== "idle" && (
          <div style={{
            ...styles.feedback,
            background: feedback === "correct" ? "#DDFBEA" : "#FFE1E1",
            color: feedback === "correct" ? "#16854F" : "#D62828",
            borderColor: feedback === "correct" ? "#20A567" : "#EF4444"
          }}>
            {feedback === "correct" ? "✅ أَحْسَنْتَ!" : "❌ حَاوِلْ مَرَّةً أُخْرَى"}
          </div>
        )}

        <div style={styles.questionBox}>'''
)

txt = txt.replace(
'};\n',
'  feedback: { border: "4px solid", borderRadius: 22, padding: "10px", marginTop: 10, textAlign: "center", fontSize: 24, fontWeight: 900 },\n};\n',
1
)

p.write_text(txt, encoding="utf-8")
print("✅ NumberChoiceExerciseV2")
PY

echo "===== 2) إصلاح محرك الترتيب: أيقونة صح/خطأ ====="

python - <<'PY'
from pathlib import Path

p = Path("src/features/lesson-v2/exercises-v2/NumberSortExerciseV2.tsx")
txt = p.read_text(encoding="utf-8")

txt = txt.replace(
'  const [shown, setShown] = useState<Set<number>>(new Set());',
'  const [shown, setShown] = useState<Set<number>>(new Set());\n  const [feedback, setFeedback] = useState<"idle" | "correct" | "wrong">("idle");'
)

txt = txt.replace(
'    setSelected([]);',
'    setSelected([]);\n    setFeedback("idle");'
)

txt = txt.replace(
'''      new Audio(ok ? "/audio/v2_feedback/correct.mp3" : "/audio/v2_feedback/retry.mp3").play().catch(() => {});
      setTimeout(() => {
        if (ok) {
          if (idx < items.length - 1) setIdx(idx + 1);
          else onComplete?.();
        } else {
          setSelected([]);
        }
      }, 850);''',
'''      setFeedback(ok ? "correct" : "wrong");
      new Audio(ok ? "/audio/v2_feedback/correct.mp3" : "/audio/v2_feedback/retry.mp3").play().catch(() => {});
      setTimeout(() => {
        if (ok) {
          if (idx < items.length - 1) setIdx(idx + 1);
          else onComplete?.();
        } else {
          setSelected([]);
          setFeedback("idle");
        }
      }, 1200);'''
)

txt = txt.replace(
'''        <div style={styles.questionBox}>''',
'''        {feedback !== "idle" && (
          <div style={{
            ...styles.feedback,
            background: feedback === "correct" ? "#DDFBEA" : "#FFE1E1",
            color: feedback === "correct" ? "#16854F" : "#D62828",
            borderColor: feedback === "correct" ? "#20A567" : "#EF4444"
          }}>
            {feedback === "correct" ? "✅ أَحْسَنْتَ!" : "❌ حَاوِلْ مَرَّةً أُخْرَى"}
          </div>
        )}

        <div style={styles.questionBox}>'''
)

txt = txt.replace(
'};\n',
'  feedback: { border: "4px solid", borderRadius: 22, padding: "10px", marginTop: 10, textAlign: "center", fontSize: 24, fontWeight: 900 },\n};\n',
1
)

p.write_text(txt, encoding="utf-8")
print("✅ NumberSortExerciseV2")
PY

echo "===== 3) إصلاح أسئلة تمرين الترتيب ====="

python - <<'PY'
from pathlib import Path

p = Path("src/features/lesson-v2/content/lesson20_exercise4.ts")
txt = p.read_text(encoding="utf-8")
import re
txt = re.sub(r'question: "رَتِّبُوا الأَعْدَادَ:[^"]+",', 'question: "رَتِّبُوا الأَعْدَادَ.",', txt)
p.write_text(txt, encoding="utf-8")
print("✅ lesson20_exercise4")
PY

echo "===== 4) إعادة توليد صوت تمرين 4 فقط ====="

python - <<'PY'
import asyncio, json, pathlib, subprocess, sys
VOICE="ar-DZ-IsmaelNeural"
RATE="+10%"
BASE=pathlib.Path("public/audio/lesson_20_exercise4")
texts={f"q{i}":"رَتِّبُوا الأَعْدَادَ." for i in range(1,6)}
try:
    import edge_tts
except Exception:
    subprocess.check_call([sys.executable,"-m","pip","install","edge-tts"])
    import edge_tts

async def one(key,text):
    mp3=BASE/f"{key}.mp3"
    js=BASE/f"{key}.json"
    com=edge_tts.Communicate(text,VOICE,rate=RATE)
    words=[]
    with open(mp3,"wb") as f:
        async for chunk in com.stream():
            if chunk["type"]=="audio":
                f.write(chunk["data"])
            elif chunk["type"]=="WordBoundary":
                words.append({"text":chunk.get("text",""),"offset":int(chunk["offset"]/10000)+60,"duration":int(chunk["duration"]/10000)})
    js.write_text(json.dumps(words,ensure_ascii=False,indent=2),encoding="utf-8")
    print("✅",key)

async def main():
    for k,t in texts.items():
        await one(k,t)
asyncio.run(main())
PY

echo "===== 5) تحقق ====="
grep -n "feedback\|filled\|أَحْسَنْتَ\|حَاوِل" src/features/lesson-v2/exercises-v2/NumberChoiceExerciseV2.tsx src/features/lesson-v2/exercises-v2/NumberSortExerciseV2.tsx
grep -n "question:" src/features/lesson-v2/content/lesson20_exercise4.ts

echo "===== 6) Build ====="
npm run build

echo "===== 7) Git status ====="
git status --short
