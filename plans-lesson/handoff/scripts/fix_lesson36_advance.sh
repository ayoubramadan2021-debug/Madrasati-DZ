#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail

cd /data/data/com.termux/files/home/madrasati-dz

ENGINE="src/features/lesson-v2/exercises-v2/PremiumExerciseEngineV2.tsx"
BACKUP="backups/lesson36_fix_advance_$(date +%Y%m%d_%H%M%S)"

mkdir -p "$BACKUP"
cp -p "$ENGINE" "$BACKUP/"

python - <<'PY'
from pathlib import Path
import re

path = Path(
    "src/features/lesson-v2/exercises-v2/PremiumExerciseEngineV2.tsx"
)
text = path.read_text(encoding="utf-8")

# مؤقت الانتقال الصحيح: لا يُلغى بسبب إعادة التصيير.
old_correct = re.compile(
    r'''advanceTimerRef\.current\s*=\s*
\s*window\.setTimeout\(\(\)\s*=>\s*\{
\s*setFeedback\("idle"\);
\s*setSelectedChoiceId\(null\);
\s*setLocked\(false\);
\s*advance\(\);
\s*\},\s*config\.autoAdvanceDelayMs\s*\?\?\s*1500\);''',
    re.MULTILINE,
)

new_correct = '''window.setTimeout(() => {
          advance();
        }, config.autoAdvanceDelayMs ?? 1100);'''

text, count = old_correct.subn(new_correct, text, count=1)

if count != 1:
    raise SystemExit("تعذر إيجاد مؤقت الإجابة الصحيحة")

# مؤقت الخطأ: صوت ثم السماح بالمحاولة من جديد.
old_wrong = re.compile(
    r'''resetTimerRef\.current\s*=\s*
\s*window\.setTimeout\(\(\)\s*=>\s*\{
\s*setFeedback\("idle"\);
\s*setSelectedChoiceId\(null\);
\s*\},\s*config\.retryResetDelayMs\s*\?\?\s*1000\);''',
    re.MULTILINE,
)

new_wrong = '''window.setTimeout(() => {
        setFeedback("idle");
        setSelectedChoiceId(null);
      }, config.retryResetDelayMs ?? 900);'''

text, count = old_wrong.subn(new_wrong, text, count=1)

if count != 1:
    raise SystemExit("تعذر إيجاد مؤقت الإجابة الخاطئة")

# حذف نافذة وأيقونات التغذية الراجعة الكبيرة إن كانت قد أضيفت.
text = re.sub(
    r'''\s*\{config\.minimalLayout\s*&&\s*feedback\s*!==\s*"idle"\s*&&\s*\(
\s*<div
.*?
\s*</div>
\s*\)\}''',
    "",
    text,
    count=1,
    flags=re.DOTALL,
)

# عرض التقدم بصيغة 4 / 1 ثم 4 / 2 مع اتجاه ثابت.
text = text.replace(
    '''              <div style={styles.minimalProgress}>
                {config.missions.length}
                {" / "}
                {missionIndex + 1}
              </div>''',
    '''              <div
                dir="ltr"
                style={styles.minimalProgress}
              >
                {config.missions.length}
                {" / "}
                {missionIndex + 1}
              </div>''',
    1,
)

path.write_text(text, encoding="utf-8")
PY

npm run build

echo
echo "✅ تم إصلاح الانتقال بعد الإجابة الصحيحة."
echo "✅ التغذية الراجعة أصبحت صوتية فقط دون أيقونات."
echo "✅ التقدم سيظهر 4 / 1 ثم 4 / 2."
echo "النسخة الاحتياطية: $BACKUP"
