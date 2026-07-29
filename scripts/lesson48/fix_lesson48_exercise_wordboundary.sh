#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail

ROOT="${1:-$PWD}"
cd "$ROOT"

GENERATOR="tools/gen_audio_lesson48_exercises.py"
AUDIO_DIR="public/audio/teachers/khalil/lesson_48_numbers_to_39/exercises"

[[ -f "$GENERATOR" ]] || {
  echo "❌ المولد غير موجود: $GENERATOR"
  exit 1
}

STAMP="$(date +%Y%m%d_%H%M%S)"
BACKUP=".lesson48_wordboundary_backup_$STAMP"

mkdir -p "$BACKUP/tools"
cp -p "$GENERATOR" "$BACKUP/$GENERATOR"

if [[ -d "$AUDIO_DIR" ]]; then
  mkdir -p "$BACKUP/$AUDIO_DIR"
  cp -p "$AUDIO_DIR"/* \
    "$BACKUP/$AUDIO_DIR/" \
    2>/dev/null || true
fi

echo "📦 النسخة الاحتياطية: $BACKUP"

# ============================================================
# 1. فرض WordBoundary صراحة داخل edge_tts
# ============================================================

python - <<'PY'
from pathlib import Path
import re

path = Path(
    "tools/gen_audio_lesson48_exercises.py"
)

text = path.read_text(
    encoding="utf-8"
)

if 'boundary="WordBoundary"' in text:
    print(
        "ℹ️ WordBoundary مضاف مسبقًا."
    )
else:
    pattern = re.compile(
        r"(\s*communicate\s*=\s*"
        r"edge_tts\.Communicate\(\s*"
        r"text=text,\s*"
        r"voice=VOICE,\s*"
        r"rate=RATE,\s*"
        r"pitch=PITCH,\s*)"
        r"(\))",
        flags=re.DOTALL,
    )

    replacement = (
        r'\1'
        'boundary="WordBoundary",\n'
        '    '
        r'\2'
    )

    updated, count = pattern.subn(
        replacement,
        text,
        count=1,
    )

    if count != 1:
        raise SystemExit(
            "❌ تعذر العثور على كتلة "
            "edge_tts.Communicate."
        )

    path.write_text(
        updated,
        encoding="utf-8",
    )

    print(
        "✅ إضافة boundary=\"WordBoundary\""
    )
PY

grep -n -A10 -B2 \
  'edge_tts.Communicate' \
  "$GENERATOR"

# ============================================================
# 2. تنظيف الملفات المؤقتة الناتجة عن المحاولة الفاشلة
# ============================================================

mkdir -p "$AUDIO_DIR"

find "$AUDIO_DIR" \
  -maxdepth 1 \
  -type f \
  \( \
    -name '.*.tmp.mp3' \
    -o -name '.*.tmp.json' \
  \) \
  -delete

# ============================================================
# 3. توليد أصوات الأسئلة الأربعة وكاريوكي WordBoundary
# ============================================================

echo
echo "🔊 إعادة توليد أصوات تمارين الدرس 48..."

python "$GENERATOR"

# ============================================================
# 4. التحقق من MP3 وJSON والتطابق النصي
# ============================================================

python - <<'PY'
import json
import re
from pathlib import Path

pairs = {
    "ex1_build_number": Path(
        "src/features/lesson-v2/content/"
        "lesson48_exercise1.ts"
    ),
    "ex2_read_number": Path(
        "src/features/lesson-v2/content/"
        "lesson48_exercise2.ts"
    ),
    "ex3_missing_number": Path(
        "src/features/lesson-v2/content/"
        "lesson48_exercise3.ts"
    ),
    "ex4_decompose_number": Path(
        "src/features/lesson-v2/content/"
        "lesson48_exercise4.ts"
    ),
}

base = Path(
    "public/audio/teachers/khalil/"
    "lesson_48_numbers_to_39/exercises"
)

for key, source_path in pairs.items():
    source = source_path.read_text(
        encoding="utf-8"
    )

    match = re.search(
        r'const\s+question\s*=\s*'
        r'\n?\s*"([^"]+)"\s*;',
        source,
    )

    if not match:
        raise SystemExit(
            f"❌ تعذر قراءة نص السؤال: {key}"
        )

    expected = match.group(1).split()

    mp3_path = base / f"{key}.mp3"
    json_path = base / f"{key}.json"

    if (
        not mp3_path.exists()
        or mp3_path.stat().st_size == 0
    ):
        raise SystemExit(
            f"❌ ملف الصوت مفقود أو فارغ: "
            f"{mp3_path}"
        )

    if not json_path.exists():
        raise SystemExit(
            f"❌ ملف الكاريوكي مفقود: "
            f"{json_path}"
        )

    data = json.loads(
        json_path.read_text(
            encoding="utf-8"
        )
    )

    if not isinstance(data, list):
        raise SystemExit(
            f"❌ JSON ليس مصفوفة: {key}"
        )

    actual = [
        str(item.get("text", ""))
        for item in data
    ]

    if actual != expected:
        raise SystemExit(
            f"❌ كلمات JSON لا تطابق "
            f"السؤال: {key}\n"
            f"المتوقع: {expected}\n"
            f"الموجود: {actual}"
        )

    offsets = [
        int(item["offset"])
        for item in data
    ]

    durations = [
        int(item["duration"])
        for item in data
    ]

    if offsets != sorted(offsets):
        raise SystemExit(
            f"❌ offsets غير مرتبة: {key}"
        )

    if any(
        duration <= 0
        for duration in durations
    ):
        raise SystemExit(
            f"❌ duration غير صالح: {key}"
        )

    print(
        f"✅ {key}: "
        f"{len(data)} كلمة متزامنة"
    )

print(
    "✅ جميع أصوات وكاريوكي التمارين سليمة"
)
PY

# ============================================================
# 5. التأكد من وجود 16 سؤالًا
# ============================================================

python - <<'PY'
import re
from pathlib import Path

all_ids = []

for mission in range(1, 5):
    path = Path(
        "src/features/lesson-v2/content/"
        f"lesson48_exercise{mission}.ts"
    )

    source = path.read_text(
        encoding="utf-8"
    )

    ids = re.findall(
        rf'id:\s*"l48_e{mission}_q\d+"',
        source,
    )

    if len(ids) != 4:
        raise SystemExit(
            f"❌ المهمة {mission}: "
            f"{len(ids)} أسئلة بدل 4"
        )

    all_ids.extend(ids)

    print(
        f"✅ المهمة {mission}: 4 متغيرات"
    )

if len(all_ids) != 16:
    raise SystemExit(
        "❌ العدد الإجمالي ليس 16 سؤالًا"
    )

print(
    "✅ المجموع: 4 مهمات × 4 = 16 سؤالًا"
)
PY

# ============================================================
# 6. البناء
# ============================================================

echo
echo "🏗️ تشغيل البناء..."

npm run build

mkdir -p scripts/lesson48

cp -p \
  "$0" \
  scripts/lesson48/fix_lesson48_exercise_wordboundary.sh \
  2>/dev/null || true

cp -p \
  "$GENERATOR" \
  scripts/lesson48/gen_audio_lesson48_exercises.py

echo
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ تم إصلاح سبب الخطأ"
echo "✅ WordBoundary مفروض صراحة"
echo "✅ إنشاء 4 ملفات MP3"
echo "✅ إنشاء 4 ملفات JSON متزامنة"
echo "✅ التحقق من 16 سؤالًا"
echo "✅ البناء ناجح"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
