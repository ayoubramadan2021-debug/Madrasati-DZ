#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail

PROJECT="$HOME/madrasati-dz"
RESUME="$PROJECT/resume.md"
REPORT="/sdcard/Download/world2_lessons_36_45_git_report.txt"
BUILD_LOG="/sdcard/Download/world2_lessons_36_45_build.log"

WORLD_ID="5daed3bb-7e62-4a5a-93a1-f6dec60df810"

cd "$PROJECT"

echo "============================================================"
echo "WORLD 2 — PUBLISH LESSONS 36 TO 45"
echo "============================================================"

if [ ! -d "$PROJECT/.git" ]; then
  echo "❌ هذا المجلد ليس مستودع Git:"
  echo "$PROJECT"
  exit 1
fi

CURRENT_BRANCH="$(git branch --show-current)"

if [ -z "$CURRENT_BRANCH" ]; then
  echo "❌ تعذر تحديد فرع Git الحالي."
  exit 1
fi

if ! git remote get-url origin >/dev/null 2>&1; then
  echo "❌ لا يوجد remote باسم origin."
  exit 1
fi

echo "✅ الفرع الحالي: $CURRENT_BRANCH"
echo "✅ Git remote: $(git remote get-url origin)"

echo "============================================================"
echo "المرحلة 1: التحقق من ملفات الدروس العشرة"
echo "============================================================"

python - "$PROJECT" <<'PY'
from pathlib import Path
import json
import sys

project = Path(sys.argv[1])

lessons = [
    (36, 4, "الأعداد إلى 19 (1)"),
    (37, 5, "قراءة جدول"),
    (38, 6, "أنا أتنفس (2)"),
    (39, 7, "الأعداد إلى 19 (2) — رحلة القطار المرتب"),
    (40, 8, "الأعداد إلى 19 (3) — اكتشف النمط السري"),
    (41, 9, "التعليم على مرصوفة — صفوف وأعمدة في لوحة اللعب"),
    (42, 10, "قلبي ينبض (1)"),
    (43, 11, "أكتشف ضعف عدد أصغر من عشرة"),
    (44, 12, "أكتشف نصف عدد أصغر من عشرين"),
    (45, 13, "إتمام الجدول"),
]

errors = []

for lesson_number, sort_order, title in lessons:
    lesson_dir = project / "public" / "lessons" / "v2" / f"lesson{lesson_number}"

    if not lesson_dir.is_dir():
        errors.append(
            f"lesson{lesson_number}: مجلد الدرس غير موجود"
        )
        continue

    for scene in range(1, 7):
        image = lesson_dir / f"s{scene}.webp"

        if not image.is_file() or image.stat().st_size == 0:
            errors.append(
                f"lesson{lesson_number}: الصورة s{scene}.webp مفقودة"
            )

    print(
        f"✅ lesson{lesson_number} | "
        f"sort_order={sort_order} | {title}"
    )

if errors:
    print("------------------------------------------------------------")

    for error in errors:
        print("❌", error)

    raise SystemExit(1)

print("✅ صور الدروس العشرة مكتملة: 60 / 60")
PY

echo "============================================================"
echo "المرحلة 2: تحديث resume.md"
echo "============================================================"

python - "$RESUME" "$WORLD_ID" <<'PY'
from pathlib import Path
from datetime import datetime
import re
import sys

resume_path = Path(sys.argv[1])
world_id = sys.argv[2]

start_marker = "<!-- WORLD2_LESSONS_36_45_START -->"
end_marker = "<!-- WORLD2_LESSONS_36_45_END -->"

section = f"""\
{start_marker}

## عالم الألعاب والترفيه — الدروس 36 إلى 45

**الحالة:** مكتملة وجاهزة للانتقال إلى التمارين والأنشطة
**World ID:** `{world_id}`
**المستوى:** السنة الأولى ابتدائي
**عدد الدروس:** 10
**عدد المشاهد:** 60
**نموذج العرض:** Lesson V2
**آخر تحديث:** {datetime.now().strftime("%Y-%m-%d %H:%M")}

| lesson | sort_order | العنوان | المتحدث |
|---:|---:|---|---|
| 36 | 4 | الأعداد إلى 19 (1) | الأستاذ خليل |
| 37 | 5 | قراءة جدول | الأستاذة تالين |
| 38 | 6 | أنا أتنفس (2) | الأستاذ خليل |
| 39 | 7 | رحلة القطار المرتب — الأعداد إلى 19 (2) | الأستاذة تالين |
| 40 | 8 | اكتشف النمط السري — الأعداد إلى 19 (3) | الأستاذ خليل |
| 41 | 9 | صفوف وأعمدة في لوحة اللعب | الأستاذة تالين |
| 42 | 10 | قلبي ينبض (1) | الأستاذ خليل |
| 43 | 11 | أكتشف ضعف عدد أصغر من عشرة | الأستاذة تالين |
| 44 | 12 | أكتشف نصف عدد أصغر من عشرين | الأستاذ خليل |
| 45 | 13 | إتمام الجدول | الأستاذة تالين |

### ما تم إنجازه

- تثبيت ست صور WebP لكل درس.
- إنشاء الصوت والكاريـوكي لكل مشهد.
- توحيد الشخصيات والبيئة البصرية.
- تحديث عناوين ومسارات الدروس.
- تحديث محتوى الدروس في Supabase.
- نجاح بناء المشروع بعد إتمام الدرس 45.
- حفظ نسخ احتياطية قبل الاستبدالات المهمة.

### المرحلة التالية

إنشاء التمارين والأنشطة التفاعلية للدروس العشرة، مع الحفاظ على:

- نفس ترتيب الدروس.
- نفس شخصيات عالم الألعاب والترفيه.
- تمارين مناسبة للسنة الأولى ابتدائي.
- تغذية راجعة صحيحة وخاطئة.
- عرض كلمة الكاريوكي بتوهج ذهبي.
- تقييم مبسط لكل نشاط.
- عدم تغيير محتوى الدروس المكتملة.

{end_marker}
"""

old = resume_path.read_text(encoding="utf-8") if resume_path.exists() else ""

pattern = re.compile(
    re.escape(start_marker)
    + r".*?"
    + re.escape(end_marker),
    re.DOTALL,
)

if pattern.search(old):
    updated = pattern.sub(section.strip(), old)
else:
    separator = "\n\n" if old.strip() else ""
    updated = old.rstrip() + separator + section.strip() + "\n"

resume_path.write_text(updated, encoding="utf-8")

print(f"✅ تم تحديث: {resume_path}")
PY

echo "============================================================"
echo "المرحلة 3: فحص البناء"
echo "============================================================"

rm -rf dist
rm -rf node_modules/.vite 2>/dev/null || true

if npm run build > "$BUILD_LOG" 2>&1; then
  echo "✅ npm build ناجح"
else
  echo "❌ npm build فشل"
  tail -n 80 "$BUILD_LOG"
  exit 1
fi

echo "============================================================"
echo "المرحلة 4: إنشاء Git commit"
echo "============================================================"

git add \
  resume.md \
  src \
  public/lessons/v2/lesson36 \
  public/lessons/v2/lesson37 \
  public/lessons/v2/lesson38 \
  public/lessons/v2/lesson39 \
  public/lessons/v2/lesson40 \
  public/lessons/v2/lesson41 \
  public/lessons/v2/lesson42 \
  public/lessons/v2/lesson43 \
  public/lessons/v2/lesson44 \
  public/lessons/v2/lesson45 \
  public/audio/teachers

if git diff --cached --quiet; then
  echo "ℹ️ لا توجد تغييرات جديدة لإنشاء commit."
  COMMIT_HASH="$(git rev-parse --short HEAD)"
else
  git commit -m "feat: complete World 2 lessons 36-45"
  COMMIT_HASH="$(git rev-parse --short HEAD)"
  echo "✅ تم إنشاء commit: $COMMIT_HASH"
fi

echo "============================================================"
echo "المرحلة 5: الرفع إلى Git"
echo "============================================================"

git push -u origin "$CURRENT_BRANCH"

{
  echo "============================================================"
  echo "WORLD 2 — GIT PUBLISH REPORT"
  echo "============================================================"
  echo "المشروع: $PROJECT"
  echo "الفرع: $CURRENT_BRANCH"
  echo "commit: $COMMIT_HASH"
  echo "remote: $(git remote get-url origin)"
  echo "الدروس: 36 إلى 45"
  echo "عدد الدروس: 10"
  echo "عدد الصور: 60"
  echo "البناء: ناجح"
  echo "resume.md: محدث"
  echo "Git push: ناجح"
  echo "المرحلة التالية: تمارين وأنشطة الدروس العشرة"
  echo "============================================================"
} | tee "$REPORT"
