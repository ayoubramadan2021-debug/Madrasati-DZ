#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail

REPO="/data/data/com.termux/files/home/madrasati-dz"
cd "$REPO"

[ -d .git ] || { echo "❌ هذا المسار ليس مستودع Git"; exit 1; }

git remote get-url origin >/dev/null 2>&1 || {
  echo "❌ لا يوجد remote باسم origin"
  exit 1
}

BRANCH="$(git symbolic-ref --quiet --short HEAD || true)"
[ -n "$BRANCH" ] || { echo "❌ المستودع في detached HEAD"; exit 1; }

mkdir -p plans-lesson
TMP_DIR="${TMPDIR:-$PREFIX/tmp}/premium_unified_audit_$$"
mkdir -p "$TMP_DIR"
trap 'rm -rf "$TMP_DIR"' EXIT

printf '=== تحديث معلومات Git ===\n'
git fetch origin --prune

REMOTE_REF="origin/$BRANCH"
if git show-ref --verify --quiet "refs/remotes/$REMOTE_REF"; then
  REMOTE_BRANCH_EXISTS="نعم"
else
  REMOTE_BRANCH_EXISTS="لا"
fi

is_tracked_local() {
  git ls-files --error-unmatch -- "$1" >/dev/null 2>&1
}

is_on_remote() {
  local path="$1"
  [ "$REMOTE_BRANCH_EXISTS" = "نعم" ] || return 1
  git cat-file -e "$REMOTE_REF:$path" >/dev/null 2>&1
}

status_for_path() {
  local path="$1"
  local exists="لا"
  local tracked="لا"
  local remote="لا"
  [ -f "$path" ] && exists="نعم"
  is_tracked_local "$path" && tracked="نعم" || true
  is_on_remote "$path" && remote="نعم" || true
  printf '%s|%s|%s|%s\n' "$path" "$exists" "$tracked" "$remote"
}

EXERCISE_ENGINE="src/features/lesson-v2/exercises-v2/PremiumExerciseEngineV2.tsx"
LESSON_REFERENCE="src/features/exercises/templates/WorldIntroSceneV2.tsx"

status_for_path "$EXERCISE_ENGINE" > "$TMP_DIR/exercise_status"
status_for_path "$LESSON_REFERENCE" > "$TMP_DIR/lesson_reference_status"

# البحث عن محرك Premium موحد صريح للدروس، بالاسم أو بالرموز المصدرة.
{
  find src -type f \( -iname '*Premium*Lesson*.tsx' -o -iname '*Lesson*Premium*.tsx' -o -iname '*Unified*Lesson*.tsx' -o -iname '*Lesson*Engine*.tsx' \) 2>/dev/null || true
  grep -RIlE 'PremiumLessonEngine|UnifiedLessonEngine|UnifiedPremiumLesson|PremiumLessonPlayer' src 2>/dev/null || true
} | sort -u | grep -v '/Lesson36PremiumNumbersExercises.tsx$' > "$TMP_DIR/lesson_candidates" || true

: > "$TMP_DIR/lesson_candidate_status"
while IFS= read -r path; do
  [ -n "$path" ] || continue
  status_for_path "$path" >> "$TMP_DIR/lesson_candidate_status"
done < "$TMP_DIR/lesson_candidates"

IFS='|' read -r _ EX_EXISTS EX_TRACKED EX_REMOTE < "$TMP_DIR/exercise_status"
IFS='|' read -r _ LR_EXISTS LR_TRACKED LR_REMOTE < "$TMP_DIR/lesson_reference_status"

LESSON_CANDIDATE_COUNT="$(wc -l < "$TMP_DIR/lesson_candidate_status" | tr -d ' ')"
LESSON_REMOTE_COUNT="$(awk -F'|' '$4=="نعم"{c++} END{print c+0}' "$TMP_DIR/lesson_candidate_status")"

if [ "$LESSON_CANDIDATE_COUNT" -eq 0 ]; then
  LESSON_PREMIUM_LOCAL_SUMMARY="لم يُعثر على ملف صريح باسم محرك Premium موحد للدروس."
elif [ "$LESSON_REMOTE_COUNT" -eq 0 ]; then
  LESSON_PREMIUM_LOCAL_SUMMARY="وُجدت ملفات مرشحة محليًا، لكن لم يُعثر عليها في $REMOTE_REF."
else
  LESSON_PREMIUM_LOCAL_SUMMARY="وُجد محرك/ملفات Premium موحدة للدروس على $REMOTE_REF."
fi

AUDIT_DATE="$(date '+%Y-%m-%d %H:%M:%S %z')"
PLAN="plans-lesson/PREMIUM_UNIFIED_ENGINE_PLAN.md"
RESUME="resume.md"

cat > "$PLAN" <<EOF_PLAN
# خطة المحرك Premium الموحّد للدروس والتمارين

آخر تحديث: $AUDIT_DATE
الفرع: \`$BRANCH\`
المرجع البعيد: \`$REMOTE_REF\`

## 1. القرار المعماري

لا نبني محركًا ضخمًا يعيد تنفيذ كل تمرين. البنية الصحيحة تكون بطبقتين:

1. **PremiumLessonEngineV2** للدروس: يدير المشاهد، الصوت، الكاريوكي، التقدم، إعادة التشغيل، نهاية الدرس والانتقال إلى التدريب.
2. **PremiumExerciseFlowV2** للتمارين: يدير مراحل التمرين عبر \`stage\` و\`onComplete\`، ويستعمل المحركات الأصلية المتخصصة مثل:
   - \`TapSelectExerciseV2\`
   - \`CountTapExerciseV2\`
   - \`DragMatchExerciseV2\`
   - \`SortSequenceExerciseV2\`
   - \`TraceExerciseV2\`
   - بقية المحركات المتخصصة الموجودة بالمشروع.

المحرك الموحّد مسؤول عن الغلاف والتدفق والحالة المشتركة، وليس عن استبدال منطق كل نشاط متخصص.

## 2. العقد الموحّد للدروس

يجب أن يقبل محرك الدروس إعدادًا بياناتيًا يحتوي على:

- \`lessonKey\` ورقم الدرس والعالم.
- \`audioBase\`.
- قائمة المشاهد: الصورة، النص، مفتاح الصوت وملف WordBoundary.
- إعداد التشغيل التلقائي وإعادة التشغيل.
- مسار التمارين ومسار الدرس التالي والاختبار.
- شاشة نهاية موحدة.

يُعاد استخدام \`WorldIntroSceneV2\` كمرجع حقيقي لواجهة الدرس، أو يُغلف داخل \`PremiumLessonEngineV2\` بدل نسخ منطقه.

## 3. العقد الموحّد للتمارين

يحتوي كل درس على تعريف تدفق مثل:

\`exerciseId → engine → items → audioBase → onComplete nextStage\`

ويجب أن يضمن:

- انتقالًا واحدًا موثوقًا بعد نجاح السؤال.
- إعادة المحاولة بعد الخطأ دون فقدان حالة السؤال.
- صوت «أحسنت» و«حاول مرة أخرى» من مصدر موحد.
- كاريوكي موحد باستعمال \`question_audio_key\` وملفات JSON.
- عداد السؤال داخل المحرك المتخصص، وعداد المرحلة داخل التدفق الموحّد.
- شاشة نهاية موحدة للدرس.

## 4. الملفات المقترحة

- \`src/features/lesson-v2/premium/PremiumLessonEngineV2.tsx\`
- \`src/features/lesson-v2/premium/PremiumExerciseFlowV2.tsx\`
- \`src/features/lesson-v2/premium/types.ts\`
- \`src/features/lesson-v2/premium/registry.ts\`
- \`src/features/lesson-v2/premium/audio.ts\`
- \`src/features/lesson-v2/premium/README.md\`

تبقى بيانات كل درس في ملفات المحتوى، وتبقى المحركات المتخصصة مستقلة وقابلة لإعادة الاستخدام.

## 5. مراحل التنفيذ

### المرحلة 1 — التثبيت

- تثبيت العقود TypeScript.
- فصل تدفق المراحل عن مكونات العرض.
- توحيد الصوت والكاريوكي والتغذية الراجعة.
- إضافة اختبارات انتقال الحالة.

### المرحلة 2 — درس مرجعي

- تحويل الدرس 1 دون تغيير تصميمه أو محتواه.
- مطابقة سلوكه الحالي حرفيًا.
- اختبار جميع المراحل حتى شاشة النهاية.

### المرحلة 3 — عالم الألعاب

- تحويل درس واحد فقط كمرجع من الدروس 33–36.
- عدم ترحيل بقية الدروس قبل نجاح الاختبار اليدوي والبناء.

### المرحلة 4 — الترحيل التدريجي

- ترحيل درس واحد في كل commit.
- عدم تعديل المحركات الأصلية إلا لإصلاح عام مثبت.
- الاحتفاظ بإمكانية الرجوع إلى التدفق القديم أثناء الترحيل.

## 6. معايير القبول

- البناء ينجح دون أخطاء TypeScript.
- السؤال الصحيح ينتقل مرة واحدة فقط.
- السؤال الخاطئ يسمح بإعادة المحاولة.
- لا تتداخل أصوات سؤالين.
- الكاريوكي يطابق الصوت.
- كل مرحلة تستدعي \`onComplete\` مرة واحدة.
- نهاية المرحلة تنقل إلى المحرك التالي.
- نهاية جميع المراحل تعرض شاشة الإكمال.
- يعمل على الهاتف وبوضع ملء الشاشة.

## 7. سياسة Git

- فرع مستقل لكل دفعة ترحيل.
- commit منفصل للخطة، وآخر للعقود، ثم commit لكل درس.
- منع إضافة تغييرات غير مرتبطة عبر \`git add .\`.
- تشغيل البناء قبل رفع أي كود تنفيذي.
- عدم حذف التدفق القديم قبل اعتماد المرجع الجديد يدويًا.

## 8. نتيجة التحقق الحالية

| العنصر | موجود محليًا | متتبع في Git | موجود على \`$REMOTE_REF\` |
|---|---:|---:|---:|
| \`$EXERCISE_ENGINE\` | $EX_EXISTS | $EX_TRACKED | $EX_REMOTE |
| \`$LESSON_REFERENCE\` | $LR_EXISTS | $LR_TRACKED | $LR_REMOTE |

**محرك Premium الموحّد الصريح للدروس:** $LESSON_PREMIUM_LOCAL_SUMMARY

EOF_PLAN

if [ "$LESSON_CANDIDATE_COUNT" -gt 0 ]; then
  {
    echo "### ملفات الدروس المرشحة التي عثر عليها الفحص"
    echo
    echo '| الملف | موجود محليًا | متتبع | على الفرع البعيد |'
    echo '|---|---:|---:|---:|'
    while IFS='|' read -r path exists tracked remote; do
      printf '| `%s` | %s | %s | %s |\n' "$path" "$exists" "$tracked" "$remote"
    done < "$TMP_DIR/lesson_candidate_status"
    echo
  } >> "$PLAN"
fi

python - "$RESUME" "$AUDIT_DATE" "$BRANCH" "$REMOTE_REF" "$EX_EXISTS" "$EX_TRACKED" "$EX_REMOTE" "$LR_EXISTS" "$LR_TRACKED" "$LR_REMOTE" "$LESSON_PREMIUM_LOCAL_SUMMARY" <<'PY'
from pathlib import Path
import re
import sys

(
    resume_path,
    audit_date,
    branch,
    remote_ref,
    ex_exists,
    ex_tracked,
    ex_remote,
    lr_exists,
    lr_tracked,
    lr_remote,
    lesson_summary,
) = sys.argv[1:]

path = Path(resume_path)
text = path.read_text(encoding="utf-8") if path.exists() else "# Resume\n"

start = "<!-- PREMIUM_UNIFIED_ENGINE_STATUS:START -->"
end = "<!-- PREMIUM_UNIFIED_ENGINE_STATUS:END -->"

block = f"""{start}

## محرك Premium الموحّد للدروس والتمارين

آخر تحقق: {audit_date}
الفرع: `{branch}` — المرجع: `{remote_ref}`

- خطة العمل: `plans-lesson/PREMIUM_UNIFIED_ENGINE_PLAN.md`
- محرك التمارين `PremiumExerciseEngineV2.tsx`: موجود محليًا **{ex_exists}**، متتبع **{ex_tracked}**، مرفوع على الفرع البعيد **{ex_remote}**.
- مرجع عرض الدروس `WorldIntroSceneV2.tsx`: موجود محليًا **{lr_exists}**، متتبع **{lr_tracked}**، مرفوع على الفرع البعيد **{lr_remote}**.
- حالة محرك Premium الموحّد الصريح للدروس: **{lesson_summary}**
- القرار: محرك الدروس يوحّد العرض والصوت والكاريوكي والتنقل، ومحرك تدفق التمارين ينسق المحركات الأصلية عبر `stage` و`onComplete` دون إعادة كتابة منطقها.

{end}"""

pattern = re.compile(re.escape(start) + r".*?" + re.escape(end), re.S)
if pattern.search(text):
    text = pattern.sub(block, text, count=1)
else:
    if not text.endswith("\n"):
        text += "\n"
    text += "\n" + block + "\n"

path.write_text(text, encoding="utf-8")
PY

# تنظيف المسافات الزائدة والأسطر الفارغة قبل فحص Git.
python - "$PLAN" "$RESUME" <<'PY_CLEAN'
from pathlib import Path
import sys

for filename in sys.argv[1:]:
    path = Path(filename)
    text = path.read_text(encoding="utf-8")
    lines = [line.rstrip() for line in text.splitlines()]
    path.write_text("\n".join(lines).rstrip() + "\n", encoding="utf-8")
PY_CLEAN

printf '\n=== الملفات التي ستُرفع فقط ===\n'
git add -- "$PLAN" "$RESUME"
git diff --cached --name-status

git diff --cached --check

if git diff --cached --quiet; then
  echo "لا توجد تغييرات جديدة في الخطة أو resume.md"
else
  git commit -m "docs: plan unified premium lesson and exercise engines"
fi

printf '\n=== الرفع إلى Git ===\n'
git push -u origin "$BRANCH"

git fetch origin "$BRANCH" --quiet
LOCAL_HEAD="$(git rev-parse HEAD)"
REMOTE_HEAD="$(git rev-parse "origin/$BRANCH")"

printf '\n=== التحقق النهائي ===\n'
echo "الفرع: $BRANCH"
echo "HEAD المحلي:  $LOCAL_HEAD"
echo "HEAD البعيد:  $REMOTE_HEAD"

[ "$LOCAL_HEAD" = "$REMOTE_HEAD" ] || {
  echo "❌ الفرع المحلي لا يطابق الفرع البعيد"
  exit 1
}

git cat-file -e "origin/$BRANCH:$PLAN"
git cat-file -e "origin/$BRANCH:$RESUME"

echo "✅ رُفعت خطة المحرك Premium الموحّد إلى Git."
echo "✅ تم تحديث ورفع resume.md."
echo "محرك التمارين Premium على الفرع البعيد: $EX_REMOTE"
echo "مرجع الدروس WorldIntroSceneV2 على الفرع البعيد: $LR_REMOTE"
echo "نتيجة محرك Premium الصريح للدروس: $LESSON_PREMIUM_LOCAL_SUMMARY"
echo "ملاحظة: الفحص لا يضيف أي ملف محرك تنفيذي إلى commit؛ يرفع الخطة وresume.md فقط."
