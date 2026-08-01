#!/data/data/com.termux/files/usr/bin/bash
set -e
cd "$HOME/madrasati-dz"

echo "===== 1) إصلاح أيقونات أحسنت / حاول مرة أخرى ====="

python - <<'PY'
from pathlib import Path

files = [
  Path("src/features/lesson-v2/exercises-v2/NumberChoiceExerciseV2.tsx"),
  Path("src/features/lesson-v2/exercises-v2/NumberSortExerciseV2.tsx"),
]

for p in files:
    txt = p.read_text(encoding="utf-8")

    txt = txt.replace(
'''              <div style={styles.feedbackIcon}>
                {feedback === "correct" ? "🎉" : "🔁"}
              </div>
              <div style={styles.feedbackText}>
                {feedback === "correct" ? "أَحْسَنْتَ" : "حَاوِلْ مَرَّةً أُخْرَى"}
              </div>''',
'''              <div style={styles.feedbackText}>
                {feedback === "correct" ? "✅ أَحْسَنْتَ" : "حَاوِلْ مَرَّةً أُخْرَى ✨"}
              </div>'''
    )

    txt = txt.replace(
'''  feedbackCard: {
    minWidth: 230,
    borderRadius: 28,
    padding: "20px 28px",
    color: "#fff",
    fontSize: 30,
    fontWeight: 900,
    textAlign: "center",
    boxShadow: "0 16px 35px rgba(0,0,0,.22)",
    border: "6px solid rgba(255,255,255,.85)",
    transform: "scale(1.02)",
  },
  feedbackIcon: {
    fontSize: 38,
    lineHeight: 1,
    marginBottom: 8,
  },
  feedbackText: {
    fontSize: 30,
    fontWeight: 900,
  },''',
'''  feedbackCard: {
    minWidth: 240,
    borderRadius: 999,
    padding: "22px 34px",
    color: "#fff",
    fontWeight: 900,
    textAlign: "center",
    boxShadow: "0 18px 35px rgba(0,0,0,.22)",
    border: "0",
    transform: "scale(1.02)",
  },
  feedbackText: {
    fontSize: 31,
    fontWeight: 900,
    lineHeight: 1.2,
  },'''
    )

    p.write_text(txt, encoding="utf-8")
    print("✅", p)
PY

echo ""
echo "===== 2) إصلاح ظهور تمارين الدرس 20 في التطبيق ====="

python - <<'PY'
from pathlib import Path

# App route
app = Path("src/App.tsx")
txt = app.read_text(encoding="utf-8")

route20 = '        <Route path="/lesson20-exercises" element={lazy(() => import("./pages/Lesson20ExercisesPage"), "تمارين الدرس 20")} />'

if "/lesson20-exercises" not in txt:
    txt = txt.replace(
        '        <Route path="/lesson19-exercises" element={lazy(() => import("./pages/Lesson19ExercisesPage"), "تمارين الدرس 19")} />',
        '        <Route path="/lesson19-exercises" element={lazy(() => import("./pages/Lesson19ExercisesPage"), "تمارين الدرس 19")} />\n' + route20
    )

app.write_text(txt, encoding="utf-8")

# LessonV2Page import/map/handleDone
p = Path("src/pages/LessonV2Page.tsx")
lt = p.read_text(encoding="utf-8")

if 'LESSON_20_CONTENT' not in lt:
    lt = lt.replace(
        'import { LESSON_19_CONTENT } from "../features/lesson-v2/content/lesson19";',
        'import { LESSON_19_CONTENT } from "../features/lesson-v2/content/lesson19";\nimport { LESSON_20_CONTENT } from "../features/lesson-v2/content/lesson20";'
    )

if 'lesson20: LESSON_20_CONTENT' not in lt:
    lt = lt.replace(
        '  lesson19: LESSON_19_CONTENT,',
        '  lesson19: LESSON_19_CONTENT,\n  lesson20: LESSON_20_CONTENT,'
    )

if 'lessonId === "lesson20"' not in lt:
    lt = lt.replace(
        ': lessonId === "lesson19"\n        ? navigate("/lesson19-exercises")',
        ': lessonId === "lesson19"\n        ? navigate("/lesson19-exercises")\n        : lessonId === "lesson20"\n        ? navigate("/lesson20-exercises")'
    )

p.write_text(lt, encoding="utf-8")

# Registry
r = Path("src/features/lesson-v2/v2Registry.ts")
rt = r.read_text(encoding="utf-8")

if '"11111111-1111-1111-1111-000000000020": "lesson20"' not in rt:
    rt = rt.replace(
        '"11111111-1111-1111-1111-000000000019": "lesson19",',
        '"11111111-1111-1111-1111-000000000019": "lesson19",\n  "11111111-1111-1111-1111-000000000020": "lesson20",'
    )

r.write_text(rt, encoding="utf-8")

# Link 19 -> 20
lp = Path("src/pages/Lesson19ExercisesPage.tsx")
if lp.exists():
    ltxt = lp.read_text(encoding="utf-8")
    if 'nextLessonKey="lesson20"' not in ltxt:
        ltxt = ltxt.replace(
            '      onReplay={() => setStage("ex1")}',
            '      nextLessonKey="lesson20"\n      onReplay={() => setStage("ex1")}'
        )
    lp.write_text(ltxt, encoding="utf-8")

print("✅ routes and links fixed")
PY

echo ""
echo "===== 3) تحقق الملفات والروابط ====="
ls -lh src/pages/Lesson20ExercisesPage.tsx
ls -lh src/features/lesson-v2/content/lesson20_exercise*.ts
grep -n "lesson20-exercises\|Lesson20ExercisesPage" src/App.tsx
grep -n "LESSON_20_CONTENT\|lesson20\|lesson20-exercises" src/pages/LessonV2Page.tsx src/features/lesson-v2/v2Registry.ts
grep -n "nextLessonKey=\"lesson20\"" src/pages/Lesson19ExercisesPage.tsx || true
grep -n "feedbackCard\|أَحْسَنْتَ\|حَاوِل" src/features/lesson-v2/exercises-v2/NumberChoiceExerciseV2.tsx src/features/lesson-v2/exercises-v2/NumberSortExerciseV2.tsx

echo ""
echo "===== 4) Build ====="
npm run build

echo ""
echo "===== 5) تحديث resume.md ====="
cat >> resume.md <<'MD'

---

## Lesson 20 completed — مُتَتَالِيَةُ الأَعْدَادِ إِلَى 10

Status: completed locally and pushed to GitHub.  
Netlify deployment is postponed. We deploy only after collecting 5 new lessons.

### Main idea
Lesson 20 teaches first-grade learners the number sequence from 1 to 10.

### Teacher and environment
- Teacher: Khalil.
- Students: Fadel, Sirine, Rahma.
- Environment: Algerian school playground.

### Lesson scenes
Created 6 scenes:
1. Introduction to the number sequence.
2. Reading numbers from 1 to 10.
3. The next number.
4. The number that comes before.
5. Connecting number 9 with a set of balls.
6. Summary board with numbers 1 to 10.

### Assets
Images:
- `public/lessons/v2/lesson20-numbers/s1.webp`
- `public/lessons/v2/lesson20-numbers/s2.webp`
- `public/lessons/v2/lesson20-numbers/s3.webp`
- `public/lessons/v2/lesson20-numbers/s4.webp`
- `public/lessons/v2/lesson20-numbers/s5.webp`
- `public/lessons/v2/lesson20-numbers/s6.webp`

Audio:
- `public/audio/lesson_20_numbers`

Voice:
- Khalil voice: `ar-DZ-IsmaelNeural`

### Lesson file
Created:
- `src/features/lesson-v2/content/lesson20.ts`

### Exercises
The first exercise version used old image-based exercises and was rejected because it was repetitive and not premium enough.

Final exercise system:
- Created new premium engines:
  - `NumberChoiceExerciseV2`
  - `NumberSortExerciseV2`

Final exercises:
1. Complete the sequence.
2. Find the number that comes before.
3. Find the number that comes after.
4. Sort numbers from smallest to largest.

Exercise page:
- `src/pages/Lesson20ExercisesPage.tsx`

Exercise content:
- `lesson20_exercise1.ts`
- `lesson20_exercise2.ts`
- `lesson20_exercise3.ts`
- `lesson20_exercise4.ts`

Exercise audio:
- `public/audio/lesson_20_exercise1`
- `public/audio/lesson_20_exercise2`
- `public/audio/lesson_20_exercise3`
- `public/audio/lesson_20_exercise4`

### Premium UX fixes
- Removed repetitive large image layout.
- Added colorful number cards.
- Added compact mobile-friendly layout that does not cover the bottom navigation bar.
- Added colored selected numbers inside empty slots.
- Added feedback overlay similar to previous premium exercises:
  - Green pill: `✅ أَحْسَنْتَ`
  - Red pill: `حَاوِلْ مَرَّةً أُخْرَى ✨`
- Fixed Exercise 4 so it asks only: `رَتِّبُوا الأَعْدَادَ.`

### Integration
Updated:
- `src/App.tsx`
  - Added `/lesson20-exercises`.

- `src/pages/LessonV2Page.tsx`
  - Imported and mapped `LESSON_20_CONTENT`.
  - Added route from lesson 20 to `/lesson20-exercises`.

- `src/features/lesson-v2/v2Registry.ts`
  - Added:
    - `11111111-1111-1111-1111-000000000020` → `lesson20`

- `src/pages/Lesson19ExercisesPage.tsx`
  - Linked lesson 19 completion to lesson 20.

### Supabase
Lesson 20 should be present in Supabase with:
- id: `11111111-1111-1111-1111-000000000020`
- title: `مُتَتَالِيَةُ الأَعْدَادِ إِلَى 10`
- subject: `math`
- grade: `1`
- sort_order: `20`
- template_version: `2`

### Testing
Verified:
- Lesson 20 displays locally.
- Lesson audio works.
- Karaoke works.
- Exercises open locally.
- New exercise engines build successfully.

### Deployment note
Do not deploy to Netlify now.  
Current post-Netlify batch:
- Lesson 19 completed.
- Lesson 20 completed.
- Continue with lessons 21, 22, and 23 before Netlify deployment.

MD

echo ""
echo "===== 6) Git add / commit / push ====="
git add \
  resume.md \
  lesson-plans/lesson-20-scenario-and-engines.md \
  compress_lesson20_images.sh \
  build_lesson20_audio_link.sh \
  build_lesson20_exercises.sh \
  rebuild_lesson20_exercises_premium.sh \
  fix_number_engines_await.sh \
  upgrade_lesson20_fun_exercises.sh \
  fix_lesson20_premium_feedback.sh \
  fix_lesson20_feedback_overlay.sh \
  fix_lesson20_colored_slots.sh \
  fix_sort_feedback_and_link_19_20.sh \
  final_lesson20_fix_git.sh \
  public/lessons/v2/lesson20-numbers \
  public/audio/lesson_20_numbers \
  public/audio/lesson_20_exercise1 \
  public/audio/lesson_20_exercise2 \
  public/audio/lesson_20_exercise3 \
  public/audio/lesson_20_exercise4 \
  src/features/lesson-v2/content/lesson20.ts \
  src/features/lesson-v2/content/lesson20_exercise1.ts \
  src/features/lesson-v2/content/lesson20_exercise2.ts \
  src/features/lesson-v2/content/lesson20_exercise3.ts \
  src/features/lesson-v2/content/lesson20_exercise4.ts \
  src/features/lesson-v2/exercises-v2/NumberChoiceExerciseV2.tsx \
  src/features/lesson-v2/exercises-v2/NumberSortExerciseV2.tsx \
  src/pages/Lesson20ExercisesPage.tsx \
  src/pages/Lesson19ExercisesPage.tsx \
  src/pages/LessonV2Page.tsx \
  src/features/lesson-v2/v2Registry.ts \
  src/App.tsx

git diff --cached --name-only

git commit -m "Complete lesson 20 number sequence"
git push origin batch-lessons-14-18

echo ""
echo "===== 7) الحالة النهائية ====="
git status -sb
git log --oneline -6
