#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail

cd /data/data/com.termux/files/home/madrasati-dz

ENGINE="src/features/lesson-v2/exercises-v2/PremiumExerciseEngineV2.tsx"
LESSON="src/features/lesson-v2/exercises-v2/Lesson36PremiumNumbersExercises.tsx"
BACKUP="backups/lesson36_simplify_ui_$(date +%Y%m%d_%H%M%S)"

mkdir -p "$BACKUP"
cp -p "$ENGINE" "$LESSON" "$BACKUP/"

python - <<'PY'
from pathlib import Path
import re

engine = Path("src/features/lesson-v2/exercises-v2/PremiumExerciseEngineV2.tsx")
text = engine.read_text(encoding="utf-8")

# 1) إضافة خيار minimalLayout في config
if "minimalLayout?: boolean;" not in text:
    text = text.replace(
        "  returnUrl?: string;\n};",
        "  returnUrl?: string;\n  minimalLayout?: boolean;\n};",
        1,
    )

# 2) استبدال أعلى الصفحة بواجهة مبسطة خاصة بهذا النمط
old_block = """          <UnifiedExerciseHeaderV2
            index={questionIndex}
            total={totalQuestions}
            missionTitle={mission.title}
            missionIcon={mission.icon}
            onReplay={replayQuestion}
            isPlaying={isPlaying}
          />

          <div style={styles.premiumBadge}>
            {config.badgeText ||
              "النشاط التفاعلي Premium"}
          </div>

          <div style={styles.missionNumber}>
            المهمة {missionIndex + 1}
            {" / "}
            {config.missions.length}
          </div>

          <h1 style={styles.title}>
            {config.title}
          </h1>

          {mission.subtitle && (
            <p style={styles.subtitle}>
              {mission.subtitle}
            </p>
          )}"""

new_block = """          {config.minimalLayout ? (
            <section style={styles.minimalTopBar}>
              <div style={styles.minimalProgress}>
                {config.missions.length}
                {" / "}
                {missionIndex + 1}
              </div>

              <button
                type="button"
                onClick={replayQuestion}
                style={styles.minimalSoundButton}
                aria-label="إعادة الصوت"
              >
                🔊
              </button>
            </section>
          ) : (
            <>
              <UnifiedExerciseHeaderV2
                index={questionIndex}
                total={totalQuestions}
                missionTitle={mission.title}
                missionIcon={mission.icon}
                onReplay={replayQuestion}
                isPlaying={isPlaying}
              />

              <div style={styles.premiumBadge}>
                {config.badgeText ||
                  "النشاط التفاعلي Premium"}
              </div>

              <div style={styles.missionNumber}>
                المهمة {missionIndex + 1}
                {" / "}
                {config.missions.length}
              </div>

              <h1 style={styles.title}>
                {config.title}
              </h1>

              {mission.subtitle && (
                <p style={styles.subtitle}>
                  {mission.subtitle}
                </p>
              )}
            </>
          )}"""

if old_block not in text:
    raise SystemExit("تعذر إيجاد كتلة أعلى الصفحة في PremiumExerciseEngineV2.tsx")

text = text.replace(old_block, new_block, 1)

# 3) إخفاء صندوق السؤال المرئي عند تفعيل minimalLayout
old_prompt = """          <section style={styles.questionBox}>
            {question.prompt}
          </section>"""

new_prompt = """          {!config.minimalLayout && (
            <section style={styles.questionBox}>
              {question.prompt}
            </section>
          )}"""

if old_prompt in text:
    text = text.replace(old_prompt, new_prompt, 1)

# 4) تحسين وضوح سطر التوجيه
text = text.replace(
    """  helper: {
    width: "fit-content",
    maxWidth: "100%",
    margin: "8px auto",
    padding: "7px 13px",
    borderRadius: 999,
    background: "rgba(255,255,255,.94)",
    color: COLORS.navy,
    fontSize: "clamp(13px,3.4vw,16px)",
    fontWeight: 850,
    lineHeight: 1.45,
    textAlign: "center",
  },""",
    """  helper: {
    width: "fit-content",
    maxWidth: "100%",
    margin: "10px auto 12px",
    padding: "11px 18px",
    borderRadius: 999,
    background: "rgba(255,255,255,.98)",
    color: COLORS.navyDeep,
    fontSize: "clamp(16px,4.2vw,20px)",
    fontWeight: 950,
    lineHeight: 1.7,
    textAlign: "center",
    boxShadow: "0 8px 18px rgba(18,58,102,.10)",
  },""",
    1,
)

# 5) إضافة أنماط الواجهة المبسطة
if "minimalTopBar:" not in text:
    marker = """  premiumBadge: {"""
    styles = """  minimalTopBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 10,
  },

  minimalProgress: {
    minWidth: 112,
    padding: "10px 20px",
    border: `4px solid ${COLORS.gold}`,
    borderRadius: 22,
    background: COLORS.white,
    color: COLORS.navyDeep,
    fontSize: "clamp(24px,6vw,34px)",
    fontWeight: 950,
    textAlign: "center",
    lineHeight: 1.1,
    boxShadow: "0 10px 22px rgba(18,58,102,.10)",
  },

  minimalSoundButton: {
    width: 72,
    height: 72,
    border: `6px solid ${COLORS.white}`,
    borderRadius: "50%",
    background: COLORS.gold,
    fontSize: 30,
    display: "grid",
    placeItems: "center",
    boxShadow: "0 10px 22px rgba(18,58,102,.12)",
    cursor: "pointer",
  },

"""
    if marker not in text:
        raise SystemExit("تعذر إيجاد موضع إضافة styles الجديدة")
    text = text.replace(marker, styles + marker, 1)

engine.write_text(text, encoding="utf-8")

lesson = Path("src/features/lesson-v2/exercises-v2/Lesson36PremiumNumbersExercises.tsx")
lt = lesson.read_text(encoding="utf-8")

# 6) تفعيل minimalLayout في هذا النشاط فقط
if "minimalLayout: true," not in lt:
    lt = lt.replace(
        "  title:",
        "  minimalLayout: true,\n  title:",
        1,
    )

# 7) تحويل الأرقام العربية الشرقية إلى غربية في هذا الملف فقط
trans = str.maketrans("٠١٢٣٤٥٦٧٨٩", "0123456789")
lt = lt.translate(trans)

# 8) جعل سطر التوجيه واضحًا كما طلبت
lt = lt.replace(
    'helper: "أَلْمِسُ كُلَّ بَالُونٍ وَأَعُدُّهُ بِهُدُوءٍ.",',
    'helper: "ألمس كل بالون وأعده بهدوء.",'
)
lt = lt.replace(
    'helper: "أَلْمِسُ كُلَّ نَجْمَةٍ وَأَعُدُّهَا بِهُدُوءٍ.",',
    'helper: "ألمس كل نجمة وأعدها بهدوء.",'
)

# 9) جعل كل الاختيارات نصية فقط (بدون صور/إيموجي) في lesson36
def add_hide_visual(match):
    chunk = match.group(0)
    if "hideVisual:" in chunk:
        return chunk
    return chunk[:-1] + ', hideVisual: true }'

lt = re.sub(
    r'\{\s*id:\s*"[^"]+"\s*,\s*label:\s*"[^"]+"[^}]*\}',
    add_hide_visual,
    lt
)

lesson.write_text(lt, encoding="utf-8")
PY

npm run build

echo
echo "✅ تم تبسيط واجهة lesson36 ونجح البناء."
echo "النسخة الاحتياطية: $BACKUP"
