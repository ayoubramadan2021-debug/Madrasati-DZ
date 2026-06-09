# 🎯 نقطة الاستئناف — Taalim-DZ

> **آخر تحديث:** 2026-06-09
> **الحالة:** Lesson 1 + World 1 Intro live ومُختبَران ✅

---

## 📍 أين توقّفنا

### آخر إنجاز
- ✅ Lesson 1 (Numbers 1-5) كامل ومُختبَر
- ✅ World 1 Intro Scene كامل (6 DALL-E + karaoke + DB)
- ✅ @dnd-kit/core@6.3.1 مثبّت
- ✅ صورة التفّاحة جاهزة (نسختان: outline + colored) في Downloads

### آخر commits
- 5c3a408 docs: update for 2026-06-09 session
- 619d1d2 chore: install @dnd-kit/core
- 60e9eb3 integrate intro scene into WorldPage
- e2e94b0 complete intro scene with DALL-E + karaoke
- a78dbf3 6 DALL-E scenes for school intro
- a97ae0b add assets for upcoming intro scene
- 8cf0529 Lesson 1 POC complete

---

## ⏭️ الخطوة القادمة: PaintExercise (قسم «أَنْجِزُ» للدرس 1)

### المقاربة المعتمدة
- **التفاعل:** drag & drop (اسحب اللون للصورة)
- **Library:** @dnd-kit/core (مثبّت)
- **التصميم:** صور موضوعات كبيرة (تفاحة، بالون، نجوم، زهور، أوراق)
- **المنطق:** سائل بسيط (لا أخطاء، لون واستمر)
- **Integration:** بعد Discover تلقائياً، قبل Recap

### الـTODO

#### 1. توليد 4 صور باقية في ChatGPT
| # | الصورة | اللون | الحالة |
|---|---|---|---|
| 1 | تفّاحة واحدة | أحمر | ✅ جاهزة |
| 2 | بالونان (2) | أزرق | ⏳ ولّد |
| 3 | 3 نجوم | أصفر | ⏳ ولّد |
| 4 | 4 زهور | وردي | ⏳ ولّد |
| 5 | 5 أوراق شجر | أخضر | ⏳ ولّد |

كل صورة = نسختان (outline + colored) في صورة 1024×1024.

#### 2. تقسيم الصور
ImageMagick: convert image.png -crop 50%x100% ينتج نصفين.

#### 3. بناء PaintExercise.tsx
- 5 شرائح، كل واحدة:
  - صورة فارغة كبيرة في الوسط
  - 3 ألوان قابلة للسحب أسفلها
  - عند سحب اللون الصحيح فوق الصورة: تتلوّن
  - زرّ التالي يظهر بعد ~2 ثانية

#### 4. Integration في StoryLessonScene
- إضافة phase جديد "anjiz" بعد "discover"
- قبل phase "recap"

#### 5. Supabase content update
- Lesson 1 content يحوي قسم anjiz بـitems

---

## 📚 ملفّات مرجعية مهمّة

- docs/01_MASTER_CONTEXT.md — السياق العام
- docs/02_TECH_ARCHITECTURE.md — البنية التقنيّة
- docs/05_DATABASE_SCHEMA.md — جداول Supabase
- docs/06_DECISIONS_LOG.md — كل القرارات المعمارية
- docs/08_SESSION_LOG.md — سجلّ الجلسات
- docs/09_LESSON_SCENARIO.md — بنية الدرس الموحّدة
- src/features/exercises/templates/StoryLessonScene.tsx (792 سطر)
- src/features/exercises/templates/WorldIntroSceneV2.tsx (398 سطر)
- src/pages/WorldPage.tsx

---

## 🎙️ كيف تبدأ الجلسة القادمة مع Claude

افتح محادثة جديدة وقل:

> أيوب من Taalim-DZ. اقرأ docs/00_RESUME_HERE.md لمعرفة أين توقّفنا. نواصل PaintExercise.

ثم الصق محتوى الملف. Claude سيعرف كل شيء فوراً.

---

## 🔑 أوامر سريعة عند الحاجة

- npm run dev -- --host 0.0.0.0
- npm run build
- git log --oneline -5

---

## 📊 إحصائيات المشروع الحالية

- Components: StoryLessonScene + WorldIntroSceneV2 + 8 exercise engines
- ملفات صوتية: 35 (mp3 + JSON)
- صور: 6 مشاهد DALL-E + 5 أفاتار + خلفيات
- Supabase: worlds, lessons, exercises, world_intro_views
- npm: @dnd-kit/core للـPaintExercise القادم

---

**آخر تذكير:** كل العمل live في GitHub. الأساس متين.
