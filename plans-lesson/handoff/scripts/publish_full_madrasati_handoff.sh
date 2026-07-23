#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail

REPO="/data/data/com.termux/files/home/madrasati-dz"
STAMP="$(date +%Y%m%d_%H%M%S)"
HANDOFF_BRANCH="handoff-premium-${STAMP}"
HANDOFF_DIR="plans-lesson/handoff"
SCRIPTS_DIR="$HANDOFF_DIR/scripts"
SNAPSHOT_DIR="$HANDOFF_DIR/snapshots"
DOC_DIR="$HANDOFF_DIR/docs"
TMP_DIR="${TMPDIR:-$PREFIX/tmp}/madrasati_handoff_${STAMP}"

cd "$REPO"
[ -d .git ] || { echo "❌ $REPO ليس مستودع Git"; exit 1; }
git remote get-url origin >/dev/null 2>&1 || { echo "❌ لا يوجد remote origin"; exit 1; }

mkdir -p "$SCRIPTS_DIR" "$SNAPSHOT_DIR" "$DOC_DIR" "$TMP_DIR"
trap 'rm -rf "$TMP_DIR"' EXIT

echo "=== 1) إنشاء فرع تسليم مستقل ==="
CURRENT_BRANCH="$(git symbolic-ref --quiet --short HEAD || true)"
[ -n "$CURRENT_BRANCH" ] || { echo "❌ المستودع في detached HEAD"; exit 1; }

git fetch origin --prune
git switch -c "$HANDOFF_BRANCH"

echo "=== 2) حفظ حالة المشروع الحالية ==="
git status --short > "$SNAPSHOT_DIR/git-status-before-handoff.txt"
git diff -- . > "$SNAPSHOT_DIR/working-tree.patch" || true
git diff --cached -- . > "$SNAPSHOT_DIR/staged.patch" || true
git ls-files --others --exclude-standard \
  | grep -Ev '(^|/)(node_modules|dist|build|coverage|\.git|\.env|\.env\..*|.*\.pem|.*\.key|.*credentials.*|.*secret.*)(/|$)' \
  > "$SNAPSHOT_DIR/untracked-files.txt" || true

git log --oneline --decorate -n 30 > "$SNAPSHOT_DIR/recent-commits.txt"
git branch -vv > "$SNAPSHOT_DIR/branches.txt"
git remote -v > "$SNAPSHOT_DIR/remotes.txt"
git rev-parse HEAD > "$SNAPSHOT_DIR/base-head.txt"

echo "=== 3) نسخ سكربتات العمل من Termux إلى Git ==="
copy_script() {
  local source="$1"
  [ -f "$source" ] || return 0
  local name
  name="$(basename "$source")"
  cp -p "$source" "$SCRIPTS_DIR/$name"
}

for source in \
  "$HOME"/*.sh \
  "$HOME"/storage/downloads/*.sh
do
  [ -e "$source" ] || continue
  case "$(basename "$source")" in
    *lesson*|*premium*|*audit*|*build*|*preview*|*world*|*madrasati*|*publish*|*fix*)
      copy_script "$source"
      ;;
  esac
done

find . -maxdepth 3 -type f -name '*.sh' \
  ! -path './node_modules/*' \
  ! -path './.git/*' \
  -print > "$SNAPSHOT_DIR/repository-shell-scripts.txt"

echo "=== 4) اكتشاف محركات Premium وملفات الدروس ==="
EXERCISE_ENGINE="src/features/lesson-v2/exercises-v2/PremiumExerciseEngineV2.tsx"
LESSON_REFERENCE="src/features/exercises/templates/WorldIntroSceneV2.tsx"

{
  [ -f "$EXERCISE_ENGINE" ] && echo "$EXERCISE_ENGINE"
  [ -f "$LESSON_REFERENCE" ] && echo "$LESSON_REFERENCE"

  find src -type f \( \
    -iname '*Premium*Lesson*.tsx' -o \
    -iname '*Lesson*Premium*.tsx' -o \
    -iname '*Unified*Lesson*.tsx' -o \
    -iname '*Premium*Exercise*.tsx' -o \
    -iname '*Unified*Exercise*.tsx' -o \
    -iname '*Lesson*Engine*.tsx' -o \
    -iname '*Exercise*Engine*.tsx' \
  \) 2>/dev/null || true

  grep -RIlE \
    'PremiumLessonEngine|UnifiedLessonEngine|PremiumExerciseEngine|UnifiedExerciseEngine|PremiumExerciseFlow|WorldIntroSceneV2' \
    src 2>/dev/null || true
} | sort -u > "$SNAPSHOT_DIR/premium-engine-files.txt"

echo "=== 5) إنشاء توثيق التسليم ==="
cat > "$DOC_DIR/PROJECT_HANDOFF.md" <<EOF
# تسليم مشروع مدرستي DZ

تاريخ التسليم: $(date '+%Y-%m-%d %H:%M:%S %z')
الفرع الأصلي: \`$CURRENT_BRANCH\`
فرع التسليم: \`$HANDOFF_BRANCH\`
رأس المشروع قبل التسليم: \`$(git rev-parse HEAD)\`

## الهدف

هذا الفرع مخصص لنقل كل سياق العمل إلى حساب ChatGPT جديد، ويحتوي على:

- خطة المحرك Premium الموحّد للدروس والتمارين.
- حالة المحركات الحالية وملفاتها المصدرية.
- طريقة بناء الدروس والتمارين والانتقال بينها.
- سكربتات الفحص والبناء والمعاينة والإصلاح والرفع.
- لقطات Git وملفات patch لحالة العمل غير المرفوعة.
- تحديث شامل داخل \`resume.md\`.

## قاعدة العمل المعتمدة

- الدروس تعتمد محرك عرض موحد للصوت، الكاريوكي، المشاهد، التقدم والانتقال.
- التمارين تعتمد تدفق مراحل موحدًا عبر \`stage\` و\`onComplete\`.
- المحركات المتخصصة لا تُستبدل بمحرك ضخم واحد؛ بل تُنسق من خلال تدفق موحد.
- كل تمرين يملك بياناته وصوته وملفات WordBoundary.
- البناء قبل الرفع.
- نسخة احتياطية قبل أي تعديل.
- عدم استعمال \`git add .\` في العمل اليومي.
- لا يُحذف المسار القديم قبل نجاح الاختبار اليدوي.

## الملفات المرجعية

- \`$EXERCISE_ENGINE\`
- \`$LESSON_REFERENCE\`
- \`plans-lesson/PREMIUM_UNIFIED_ENGINE_PLAN.md\`
- \`resume.md\`
- \`$SNAPSHOT_DIR/premium-engine-files.txt\`
- \`$SCRIPTS_DIR/\`

## ملاحظة مهمة

قد تحتوي بعض المحركات أو تعديلات الدرس 36 على حالة عمل غير مكتملة. تم حفظها عمدًا لنقل السياق، وليس باعتبارها نسخة إنتاج نهائية.
EOF

cat > "$DOC_DIR/WORKFLOW.md" <<'EOF'
# طريقة العمل المعتمدة

## قبل التعديل

```bash
cd /data/data/com.termux/files/home/madrasati-dz
git status --short
mkdir -p backups/<task>_<timestamp>
cp -p <file> backups/<task>_<timestamp>/
```

## بعد التعديل

```bash
npm run build
```

## تشغيل المعاينة

```bash
npm run dev -- --host 0.0.0.0 --port 5173
```

## فحص Git

```bash
git diff --check
git status --short
git diff -- <relevant-files>
```

## الرفع الآمن

```bash
git add -- <explicit-files>
git diff --cached --check
git diff --cached --name-status
git commit -m "<message>"
git push -u origin <branch>
```

## التحقق من التطابق

```bash
git fetch origin <branch>
test "$(git rev-parse HEAD)" = "$(git rev-parse origin/<branch>)"
```
EOF

cat > "$DOC_DIR/PREMIUM_ARCHITECTURE.md" <<'EOF'
# معمارية Premium

## محرك الدروس

مسؤول عن:

- عرض المشاهد.
- تشغيل صوت الأستاذ.
- تحميل ملفات WordBoundary.
- مزامنة الكاريوكي.
- التقدم وإعادة التشغيل.
- نهاية الدرس.
- الانتقال إلى التمارين والاختبار والدرس التالي.

مرجع العرض الحالي هو `WorldIntroSceneV2`. عند إنشاء `PremiumLessonEngineV2` يجب تغليفه أو إعادة استخدام منطقه، لا نسخه عشوائيًا.

## محرك تدفق التمارين

مسؤول عن:

- المرحلة الحالية.
- اختيار المحرك المتخصص.
- تمرير `items` و`audio_base`.
- استقبال `onComplete`.
- الانتقال إلى المرحلة التالية مرة واحدة.
- شاشة الإكمال.

## المحركات المتخصصة

أمثلة:

- `TapSelectExerciseV2`
- `CountTapExerciseV2`
- `DragMatchExerciseV2`
- `SortSequenceExerciseV2`
- `TraceExerciseV2`
- `CompareExerciseV2`
- `RankOrderExerciseV2`
- `TapSelectImagesV2`

## المرجع الصحيح

الدرس 1 هو المرجع الحقيقي لتدفق التمارين:
`TapSelect → CountTap → DragMatch → SortSequence → Trace → LessonComplete`.
EOF

cat > "$DOC_DIR/BUILD_AND_AUDIT.md" <<'EOF'
# البناء والفحص

## فحص TypeScript والبناء

```bash
npm run build
```

## فحص الملفات الصوتية

- يجب أن يوجد لكل `question_audio_key` ملف MP3.
- يجب أن يوجد ملف JSON مطابق.
- يجب أن يكون JSON صالحًا وغير فارغ.

## فحص الانتقال

- الإجابة الصحيحة تستدعي الانتقال مرة واحدة.
- الإجابة الخاطئة تعيد فتح السؤال.
- نهاية أسئلة المحرك تستدعي `onComplete` مرة واحدة.
- نهاية المرحلة تنقل إلى المرحلة التالية.
- نهاية جميع المراحل تعرض شاشة الإكمال.

## فحص الهاتف

- ملء الشاشة.
- عدم قص العناصر.
- أزرار كبيرة.
- عدم تداخل الصوت.
- الكاريوكي متزامن.
EOF

echo "=== 6) تحديث resume.md بمعلومات التسليم ==="
python - "$HANDOFF_BRANCH" "$CURRENT_BRANCH" "$STAMP" <<'PY'
from pathlib import Path
import re
import sys

handoff_branch, source_branch, stamp = sys.argv[1:]
path = Path("resume.md")
text = path.read_text(encoding="utf-8") if path.exists() else "# Resume\n"

start = "<!-- MADRASATI_FULL_HANDOFF:START -->"
end = "<!-- MADRASATI_FULL_HANDOFF:END -->"

block = f"""{start}

## تسليم كامل لمشروع مدرستي DZ

تم إنشاء فرع تسليم مستقل: `{handoff_branch}` انطلاقًا من `{source_branch}`.

يشمل التسليم:

- `plans-lesson/PREMIUM_UNIFIED_ENGINE_PLAN.md`
- `plans-lesson/handoff/docs/PROJECT_HANDOFF.md`
- `plans-lesson/handoff/docs/PREMIUM_ARCHITECTURE.md`
- `plans-lesson/handoff/docs/WORKFLOW.md`
- `plans-lesson/handoff/docs/BUILD_AND_AUDIT.md`
- `plans-lesson/handoff/scripts/`
- `plans-lesson/handoff/snapshots/`
- ملفات محركات Premium المكتشفة والمسارات المرجعية.
- patch لحالة العمل الحالية وقائمة الملفات غير المتتبعة دون أسرار أو ملفات بيئة.

### القرار المعماري

- محرك Premium للدروس يوحّد المشاهد والصوت والكاريوكي والتقدم والتنقل.
- تدفق Premium للتمارين ينسق المحركات الأصلية عبر `stage` و`onComplete`.
- لا يُعاد تنفيذ كل أنواع التمارين داخل محرك واحد.
- الدرس 1 هو مرجع تدفق التمارين.
- `WorldIntroSceneV2` هو مرجع عرض الدروس الحالي.
- بعض ملفات الدرس 36 محفوظة كحالة عمل WIP لنقل السياق، وليست اعتمادًا نهائيًا.

### أوامر الاستئناف في الحساب الجديد

```bash
git fetch origin --prune
git switch {handoff_branch}
cat plans-lesson/handoff/docs/PROJECT_HANDOFF.md
cat plans-lesson/handoff/docs/PREMIUM_ARCHITECTURE.md
cat plans-lesson/handoff/docs/WORKFLOW.md
cat plans-lesson/handoff/docs/BUILD_AND_AUDIT.md
npm install
npm run build
```

{end}"""

pattern = re.compile(re.escape(start) + r".*?" + re.escape(end), re.S)
if pattern.search(text):
    text = pattern.sub(block, text, count=1)
else:
    text = text.rstrip() + "\n\n" + block + "\n"

lines = [line.rstrip() for line in text.splitlines()]
path.write_text("\n".join(lines).rstrip() + "\n", encoding="utf-8")
PY

echo "=== 7) إضافة ملفات المحركات والوثائق والسكريبتات ==="
git add -- \
  plans-lesson/PREMIUM_UNIFIED_ENGINE_PLAN.md \
  "$HANDOFF_DIR" \
  resume.md

while IFS= read -r path; do
  [ -f "$path" ] || continue
  case "$path" in
    *.env|*.env.*|*.pem|*.key|*credentials*|*secret*)
      echo "تخطي ملف حساس: $path"
      ;;
    *)
      git add -- "$path"
      ;;
  esac
done < "$SNAPSHOT_DIR/premium-engine-files.txt"

# إضافة ملفات الدرس 36 المرتبطة فقط إذا كانت موجودة.
for path in \
  src/features/lesson-v2/exercises-v2/Lesson36PremiumNumbersExercises.tsx \
  src/pages/LessonExercisesPage.tsx \
  src/pages/World2LessonPage.tsx
do
  [ -f "$path" ] && git add -- "$path"
done

echo "=== 8) تنظيف المسافات وفحص الملفات ==="
python - <<'PY'
from pathlib import Path
for root in [Path("plans-lesson/handoff"), Path("plans-lesson/PREMIUM_UNIFIED_ENGINE_PLAN.md"), Path("resume.md")]:
    files = [root] if root.is_file() else list(root.rglob("*"))
    for path in files:
        if not path.is_file():
            continue
        if path.suffix.lower() not in {".md", ".txt", ".sh", ".tsx", ".ts", ".json", ".css"}:
            continue
        try:
            text = path.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            continue
        lines = [line.rstrip() for line in text.splitlines()]
        path.write_text("\n".join(lines).rstrip() + "\n", encoding="utf-8")
PY

git add -- \
  plans-lesson/PREMIUM_UNIFIED_ENGINE_PLAN.md \
  "$HANDOFF_DIR" \
  resume.md

git diff --cached --check

echo "=== 9) بناء المشروع ==="
BUILD_LOG="$TMP_DIR/build.log"
if npm run build >"$BUILD_LOG" 2>&1; then
  tail -n 12 "$BUILD_LOG"
else
  echo "❌ فشل البناء. لن يتم الرفع."
  tail -n 80 "$BUILD_LOG"
  exit 1
fi

echo "=== 10) مراجعة الملفات المرفوعة ==="
git diff --cached --name-status
git diff --cached --stat

if git diff --cached --quiet; then
  echo "❌ لا توجد ملفات جديدة للرفع"
  exit 1
fi

echo "=== 11) commit و push ==="
git commit -m "docs: preserve full Madrasati premium handoff context"
git push -u origin "$HANDOFF_BRANCH"

git fetch origin "$HANDOFF_BRANCH" --quiet
LOCAL_HEAD="$(git rev-parse HEAD)"
REMOTE_HEAD="$(git rev-parse "origin/$HANDOFF_BRANCH")"

[ "$LOCAL_HEAD" = "$REMOTE_HEAD" ] || {
  echo "❌ HEAD المحلي لا يطابق الفرع البعيد"
  exit 1
}

echo
echo "✅ تم رفع تسليم مشروع مدرستي كاملًا."
echo "الفرع: $HANDOFF_BRANCH"
echo "HEAD: $LOCAL_HEAD"
echo "الوثائق: $DOC_DIR"
echo "السكريبتات: $SCRIPTS_DIR"
echo "اللقطات: $SNAPSHOT_DIR"
echo
echo "في الحساب الجديد:"
echo "git fetch origin --prune"
echo "git switch $HANDOFF_BRANCH"
echo "cat $DOC_DIR/PROJECT_HANDOFF.md"
