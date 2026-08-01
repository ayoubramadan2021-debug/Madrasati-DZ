#!/usr/bin/env bash
set -euo pipefail

PROJECT_ROOT="${1:-$PWD}"
cd "$PROJECT_ROOT"

STAMP="$(date +%Y%m%d_%H%M%S)"
BACKUP_DIR=".lesson47_question_wording_backup_$STAMP"

mkdir -p "$BACKUP_DIR"

FILES=(
  "src/features/lesson-v2/content/lesson47_exercise1.ts"
  "src/features/lesson-v2/content/lesson47_exercise2.ts"
  "src/features/lesson-v2/content/lesson47_exercise3.ts"
  "src/features/lesson-v2/exercises-v2/GridNavigationExerciseV2.tsx"
  "tools/gen_audio_lesson47_exercises.py"
)

echo "📦 إنشاء نسخة احتياطية..."

for file in "${FILES[@]}"; do
  if [[ ! -f "$file" ]]; then
    echo "❌ الملف غير موجود: $file"
    exit 1
  fi

  mkdir -p "$BACKUP_DIR/$(dirname "$file")"
  cp -p "$file" "$BACKUP_DIR/$file"
done

cat > "$PROJECT_ROOT/.fix_lesson47_question_wording.py" <<'PY'
from pathlib import Path


def replace_text(
    path: str,
    old: str,
    new: str,
    label: str,
) -> None:
    file_path = Path(path)
    content = file_path.read_text(encoding="utf-8")

    if new in content:
        print(f"ℹ️ مطبق مسبقًا: {label}")
        return

    if old not in content:
        raise SystemExit(
            f"❌ لم أجد النص المطلوب لتعديل: {label}\n"
            f"الملف: {path}"
        )

    file_path.write_text(
        content.replace(old, new),
        encoding="utf-8",
    )

    print(f"✅ {label}")


# ─────────────────────────────────────────
# السؤال الأول
# الخيارات: أعلى، أسفل، يمين، يسار
# ─────────────────────────────────────────

replace_text(
    "src/features/lesson-v2/content/lesson47_exercise1.ts",
    '''const question =
  "اِتْبَعِ السَّهْمَ 1. فِي أَيِّ جِهَةٍ سَتَصِلُ؟";''',
    '''const question =
  "فِي أَيِّ اتِّجَاهٍ يَسِيرُ الطِّفْلُ؟";''',
    "تعديل سؤال المهمة الأولى",
)


# ─────────────────────────────────────────
# السؤال الثاني
# الخيارات: الشجرة، النجمة، الهدية...
# ─────────────────────────────────────────

replace_text(
    "src/features/lesson-v2/content/lesson47_exercise2.ts",
    '''const question =
  "اِتْبَعِ السَّهْمَ 1 ثُمَّ السَّهْمَ 2. تَحَرَّكْ خَانَةً وَاحِدَةً مَعَ كُلِّ سَهْمٍ. أَيْنَ سَتَصِلُ؟";''',
    '''const question =
  "إِلَى أَيْنَ تَأْخُذُكَ الأَسْهُمُ؟";''',
    "تعديل سؤال المهمة الثانية",
)


# ─────────────────────────────────────────
# السؤال الثالث
# الخيارات: أعلى، أسفل، يمين، يسار
# ─────────────────────────────────────────

replace_text(
    "src/features/lesson-v2/content/lesson47_exercise3.ts",
    '''const question =
  "اُنْظُرْ إِلَى المَسْلَكِ. مَا السَّهْمُ النَّاقِصُ فِي الفَرَاغِ؟";''',
    '''const question =
  "فِي أَيِّ اتِّجَاهٍ يُتَابِعُ الطِّفْلُ مَسَارَهُ؟";''',
    "تعديل سؤال المهمة الثالثة",
)


# ─────────────────────────────────────────
# التعليمات الظاهرة فوق المرصوفة
# ─────────────────────────────────────────

component = (
    "src/features/lesson-v2/exercises-v2/"
    "GridNavigationExerciseV2.tsx"
)

replace_text(
    component,
    '''          <strong style={styles.childInstruction}>
            اِتْبَعِ السَّهْمَ 1، ثُمَّ اخْتَرِ
            الجِهَةَ الصَّحِيحَةَ.
          </strong>''',
    '''          <strong style={styles.childInstruction}>
            اُنْظُرْ إِلَى السَّهْمِ. فِي أَيِّ
            اتِّجَاهٍ يَسِيرُ الطِّفْلُ؟
          </strong>''',
    "تعديل تعليمات المهمة الأولى",
)

replace_text(
    component,
    '''          <strong style={styles.childInstruction}>
            اِتْبَعِ السَّهْمَ 1 ثُمَّ السَّهْمَ 2،
            وَتَحَرَّكْ خَانَةً وَاحِدَةً مَعَ
            كُلِّ سَهْمٍ.
          </strong>''',
    '''          <strong style={styles.childInstruction}>
            اُنْظُرْ إِلَى الأَسْهُمِ
            بِالتَّرْتِيبِ. إِلَى أَيْنَ
            تَأْخُذُكَ؟
          </strong>''',
    "تعديل تعليمات المهمة الثانية",
)

replace_text(
    component,
    '''          <strong style={styles.childInstruction}>
            اُنْظُرْ إِلَى المَسْلَكِ. فِي
            الفَرَاغِ سَهْمٌ نَاقِصٌ. مَا هُوَ؟
          </strong>''',
    '''          <strong style={styles.childInstruction}>
            اُنْظُرْ إِلَى مَسَارِ الطِّفْلِ.
            فِي أَيِّ اتِّجَاهٍ يُتَابِعُ
            طَرِيقَهُ؟
          </strong>''',
    "تعديل تعليمات المهمة الثالثة",
)


# ─────────────────────────────────────────
# تحديث نصوص مولد الصوت
# ─────────────────────────────────────────

audio_generator = "tools/gen_audio_lesson47_exercises.py"

replace_text(
    audio_generator,
    '''    "ex1_direction":
        "اِتْبَعِ السَّهْمَ 1. فِي أَيِّ جِهَةٍ سَتَصِلُ؟",''',
    '''    "ex1_direction":
        "فِي أَيِّ اتِّجَاهٍ يَسِيرُ الطِّفْلُ؟",''',
    "تحديث صوت المهمة الأولى",
)

replace_text(
    audio_generator,
    '''    "ex2_destination":
        "اِتْبَعِ السَّهْمَ 1 ثُمَّ السَّهْمَ 2. تَحَرَّكْ خَانَةً وَاحِدَةً مَعَ كُلِّ سَهْمٍ. أَيْنَ سَتَصِلُ؟",''',
    '''    "ex2_destination":
        "إِلَى أَيْنَ تَأْخُذُكَ الأَسْهُمُ؟",''',
    "تحديث صوت المهمة الثانية",
)

replace_text(
    audio_generator,
    '''    "ex3_missing_arrow":
        "اُنْظُرْ إِلَى المَسْلَكِ. مَا السَّهْمُ النَّاقِصُ فِي الفَرَاغِ؟",''',
    '''    "ex3_missing_arrow":
        "فِي أَيِّ اتِّجَاهٍ يُتَابِعُ الطِّفْلُ مَسَارَهُ؟",''',
    "تحديث صوت المهمة الثالثة",
)

print("\n✅ اكتملت تعديلات النصوص.")
PY

python "$PROJECT_ROOT/.fix_lesson47_question_wording.py"
rm -f "$PROJECT_ROOT/.fix_lesson47_question_wording.py"

echo
echo "🔊 إعادة إنشاء الصوت وملفات WordBoundary..."

if python -c "import edge_tts" >/dev/null 2>&1; then
  python tools/gen_audio_lesson47_exercises.py
else
  echo "❌ مكتبة edge_tts غير مثبتة."
  echo "نفّذ:"
  echo "pip install edge-tts"
  exit 1
fi

echo
echo "🔎 التحقق من النصوص الجديدة..."

grep -n \
  "فِي أَيِّ اتِّجَاهٍ يَسِيرُ الطِّفْلُ" \
  src/features/lesson-v2/content/lesson47_exercise1.ts

grep -n \
  "إِلَى أَيْنَ تَأْخُذُكَ الأَسْهُمُ" \
  src/features/lesson-v2/content/lesson47_exercise2.ts

grep -n \
  "فِي أَيِّ اتِّجَاهٍ يُتَابِعُ الطِّفْلُ مَسَارَهُ" \
  src/features/lesson-v2/content/lesson47_exercise3.ts

echo
echo "🏗️ تشغيل البناء..."
npm run build

echo
echo "✅ تم التعديل بنجاح."
echo "✅ المهمة 1: فِي أَيِّ اتِّجَاهٍ يَسِيرُ الطِّفْلُ؟"
echo "✅ المهمة 2: إِلَى أَيْنَ تَأْخُذُكَ الأَسْهُمُ؟"
echo "✅ المهمة 3: فِي أَيِّ اتِّجَاهٍ يُتَابِعُ الطِّفْلُ مَسَارَهُ؟"
echo "✅ تم تحديث الصوت والكاريوكي."
echo "📁 النسخة الاحتياطية: $BACKUP_DIR"
