#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail

cd /data/data/com.termux/files/home/madrasati-dz

ENGINE="src/features/lesson-v2/exercises-v2/PremiumExerciseEngineV2.tsx"
BACKUP="backups/lesson36_transition_v2_$(date +%Y%m%d_%H%M%S)"

mkdir -p "$BACKUP"
cp -p "$ENGINE" "$BACKUP/"

python - <<'PY'
from pathlib import Path
import re

path = Path(
    "src/features/lesson-v2/exercises-v2/PremiumExerciseEngineV2.tsx"
)
text = path.read_text(encoding="utf-8")

# حذف أي انتقال مؤقت موجود داخل حالة الإجابة الصحيحة.
text, count = re.subn(
    r'''
\s*window\.setTimeout\(\(\)\s*=>\s*\{
\s*advance\(\);
\s*\},\s*config\.autoAdvanceDelayMs\s*\?\?\s*\d+\);
''',
    "\n",
    text,
    count=1,
    flags=re.VERBOSE,
)

if count != 1:
    raise SystemExit("تعذر إيجاد مؤقت advance القديم")

# إضافة انتقال مستقل ومضمون بعد دالة answer.
marker = '''  const restart = useCallback(() => {'''

effect = '''  useEffect(() => {
    if (feedback !== "correct") {
      return;
    }

    const timer = window.setTimeout(() => {
      setSelectedChoiceId(null);
      setFeedback("idle");
      setLocked(false);
      setTappedVisualItems([]);

      const currentMission =
        config.missions[missionIndex];

      if (
        questionIndex <
        currentMission.questions.length - 1
      ) {
        setQuestionIndex(
          (current) => current + 1,
        );
        return;
      }

      if (
        missionIndex <
        config.missions.length - 1
      ) {
        setMissionIndex(
          (current) => current + 1,
        );
        setQuestionIndex(0);
        return;
      }

      setCompleted(true);
    }, config.autoAdvanceDelayMs ?? 1100);

    return () => {
      window.clearTimeout(timer);
    };
  }, [
    feedback,
    questionIndex,
    missionIndex,
    config.autoAdvanceDelayMs,
    config.missions,
  ]);

'''

if marker not in text:
    raise SystemExit("تعذر إيجاد موضع إضافة منطق الانتقال")

text = text.replace(marker, effect + marker, 1)
path.write_text(text, encoding="utf-8")
PY

npm run build

echo
echo "✅ تم تثبيت الانتقال بين الأسئلة والتمارين."
echo "النسخة الاحتياطية: $BACKUP"
