#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail

cd /data/data/com.termux/files/home/madrasati-dz

FILE="src/features/lesson-v2/exercises-v2/Lesson36PremiumNumbersExercises.tsx"
AUDIO_DIR="public/audio/teachers/khalil/lesson_36_amusement_sorting/exercises"

python - <<'PY'
from pathlib import Path
import json
import re
import sys

file = Path(
    "src/features/lesson-v2/exercises-v2/"
    "Lesson36PremiumNumbersExercises.tsx"
)
text = file.read_text(encoding="utf-8")

keys = re.findall(r'key:\s*"(m[1-4]_q[1-4])"', text)
audio_keys = re.findall(r'audio\("([^"]+)"\)', text)
karaoke_keys = re.findall(r'karaoke\("([^"]+)"\)', text)

errors = []

print("=== بنية التمارين ===")
for mission in range(1, 5):
    mission_keys = [k for k in keys if k.startswith(f"m{mission}_")]
    print(f"التمرين {mission}: {len(mission_keys)} أسئلة")
    if len(mission_keys) != 4:
        errors.append(f"التمرين {mission} لا يحتوي على 4 أسئلة")

if len(keys) != 16:
    errors.append(f"عدد الأسئلة هو {len(keys)} بدل 16")

if len(keys) != len(set(keys)):
    errors.append("توجد مفاتيح أسئلة مكررة")

print()
print("=== فحص الإجابات الصحيحة ===")

blocks = re.findall(
    r'\{\s*key:\s*"(m[1-4]_q[1-4])"(.*?)(?=\n\s*\},|\Z)',
    text,
    flags=re.DOTALL,
)

for key, block in blocks:
    correct = re.search(
        r'correctChoiceId:\s*"([^"]+)"',
        block,
    )
    choice_ids = re.findall(
        r'(?:numberChoice\(|id:\s*)"([^"]+)"',
        block,
    )

    if not correct:
        errors.append(f"{key}: لا توجد إجابة صحيحة")
        print(f"❌ {key}: correctChoiceId غير موجود")
        continue

    answer = correct.group(1)

    if answer not in choice_ids:
        errors.append(
            f"{key}: الإجابة {answer} غير موجودة بين الخيارات"
        )
        print(f"❌ {key}: {answer} غير موجودة بين الخيارات")
    else:
        print(f"✅ {key}: الإجابة {answer}")

print()
print("=== فحص الصوت والكاريـوكي ===")

audio_dir = Path(
    "public/audio/teachers/khalil/"
    "lesson_36_amusement_sorting/exercises"
)

required = sorted(set(audio_keys + karaoke_keys))

for key in required:
    mp3 = audio_dir / f"{key}.mp3"
    js = audio_dir / f"{key}.json"

    valid = True

    if not mp3.exists() or mp3.stat().st_size == 0:
        errors.append(f"{key}: MP3 ناقص")
        valid = False

    if not js.exists() or js.stat().st_size == 0:
        errors.append(f"{key}: JSON ناقص")
        valid = False
    else:
        try:
            data = json.loads(js.read_text(encoding="utf-8"))
            if not isinstance(data, list) or not data:
                raise ValueError("WordBoundary فارغ")
        except Exception as exc:
            errors.append(f"{key}: JSON غير صالح: {exc}")
            valid = False

    print(
        f"{'✅' if valid else '❌'} {key}"
    )

print()
print("=== النتيجة ===")

if errors:
    print(f"❌ عدد الأخطاء: {len(errors)}")
    for error in errors:
        print(f"- {error}")
    sys.exit(1)

print("✅ التمارين الأربعة تحتوي على 16 سؤالًا سليمًا.")
print("✅ كل إجابة صحيحة موجودة ضمن خياراتها.")
print("✅ كل ملفات MP3 وWordBoundary JSON المطلوبة صالحة.")
PY

echo
echo "=== فحص البناء ==="
npm run build >/tmp/lesson36_build.log 2>&1 || {
  tail -n 40 /tmp/lesson36_build.log
  exit 1
}

tail -n 3 /tmp/lesson36_build.log
rm -f /tmp/lesson36_build.log

echo
echo "لم يتم تعديل أي ملف."
