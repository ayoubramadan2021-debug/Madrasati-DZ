## جلسة 2026-06-09 — POC الدرس 1 + المشهد الافتتاحي للعالم 1

**الإنجاز الرئيسي:** أكبر جلسة منذ بداية المشروع (15+ ساعة، 6 commits). POC كامل للدرس 1 يعمل live، ومشهد افتتاحي سينمائي للعالم 1 مدمج في الـapp.

### الصباح — POC الدرس 1 (الأعداد 1-5)
- بناء `StoryLessonScene.tsx` (792 سطر) كقالب موحّد لكل الـ60 درساً
- 3 مشاهد: Intro (تالين ترحّب) → Discover (5 شرائح: 1→5) → Recap (3 نجوم + 50 XP)
- محرّك Karaoke متزامن مع `edge-tts WordBoundary` (per-word timings)
- 17 ملف صوتي + 17 JSON timings (intro + 5 story steps + 10 numbers ar/fr + recap)
- 4 أفاتار محدّثة بشفافية (Khalil + Taline عبر remove.bg)
- صورة قسم جزائري بـDALL-E (62KB webp)
- Supabase: lesson ID = `b5683a02-a878-4408-8e42-90ca32919aa4`
- إصلاحات UX: padding-bottom + textShadow + ground shadow
- commit: `8cf0529` (43 ملف، 1938 سطر)

### اكتشافات تقنية (Tashkeel + edge-tts)
- `edge-tts 7.2.8` يتطلّب `boundary="WordBoundary"` صراحةً (الـdefault = SentenceBoundary)
- التشكيل: تنوين (لا سكون) على تاء مربوطة لإجبار النطق
- سكون على الأسماء قبل الوقفة («خَلِيلْ»)
- إعدادات الأصوات النهائية:
  - Khalil: `ar-DZ-IsmaelNeural`، rate=-5%، pitch=+20Hz
  - Taline: `ar-DZ-AminaNeural`، rate=-5%، pitch=+10Hz
  - French: `fr-FR-HenriNeural`، rate=-5%، pitch=+0Hz

### المساء — المشهد الافتتاحي للعالم 1
**المحاولة الأولى (الفشل):**
- بُني `WorldIntroScene.tsx` (767 سطر) بمقاربة composite (PNG sprites فوق خلفية)
- النتيجة: شخصيات «طافية»، أحجام عشوائية → غضب الـuser المبرّر
- تم تقييم البدائل: Pixi.js (يحتاج sprites + Spine)، Three.js (يحتاج Blender)، Lottie (يحتاج Rive)
- **قرار جذري:** صور DALL-E كاملة (شخصيات داخل الصورة) + Lottie للتأثيرات لاحقاً

**المحاولة V2 (النجاح):**
- 6 صور DALL-E سينمائية احترافية (محادثة واحدة لـconsistency):
  - `scene_1_arrival.webp` — دخول البوّابة
  - `scene_2_courtyard.webp` — الساحة
  - `scene_3_meet_teachers.webp` — لقاء المعلّمين
  - `scene_4_sitting.webp` — الجلوس
  - `scene_5_question.webp` — السؤال
  - `scene_6_celebration.webp` — الختام
- 3 أفاتار أطفال جديدة (فاضل، سيرين، رحمة)
- 9 ملفات صوتية + JSON
- `WorldIntroSceneV2.tsx` (398 سطر، أبسط بكثير)
- 3 إجابات صحيحة كلّها في السؤال (تعلّم أن «الأدب» متعدّد الأشكال)
- DB integration:
  - `world_intro_views` table (user_id, world_id, viewed_at) + RLS
  - `worlds.intro_content` jsonb column
  - منطق "عُرض مرّة واحدة" في `WorldPage.tsx`
- commits: `a97ae0b`, `a78dbf3`, `e2e94b0`, `60e9eb3`

### تحضير لـPaintExercise
- تثبيت `@dnd-kit/core@6.3.1` + `@dnd-kit/utilities`
- توليد صورة التفّاحة (نسختين: outline + colored)
- commit: `619d1d2`

### القرارات المعمارية المحوريّة
| القرار | الأساس |
|---|---|
| story-driven Discover (5 شرائح + karaoke) | نموذج قابل للتطبيق على 60 درس |
| صور DALL-E كاملة (لا composite) | المقاربة الوحيدة العملية لمطوّر فردي |
| الأطفال صامتون (سرد تالين/خليل) | edge-tts لا يدعم أصوات أطفال مقبولة |
| "عُرض مرّة واحدة" بـDB | `world_intro_views` بـRLS |
| `@dnd-kit` للـdrag&drop | touch-friendly، 30KB، يستعمله Lingokids |

### القرارات المعلّقة للجلسة القادمة
- **PaintExercise:** 4 صور باقية (بالون، نجوم، زهور، أوراق) + بناء component + integration
- **الدرس 2:** تعيين موقع في الفضاء (صفحة 15)
- **توثيق:** تحديث `09_LESSON_SCENARIO.md` لـv1.4

---


---
## جلسة 2026-06-07 — تنظيف شامل

- حُذف الدرس 1 (number_intro) + الدرس 2 (position_intro) كاملاً من DB والكود والأصول
- أُبقيت المحرّكات الـ14 + بنية المشروع (subject → world → lesson → exercise)
- أُضيفت أفاتار خليل/تالين (4 ملفات webp، Pixar-style، 25 سنة، قابلة لإعادة الاستعمال)
- commits محلية: aaa204d (gitignore) + ed73ab2 (avatars)

**القرارات المعلّقة للجلسة القادمة:**
- تحديد مصدر المنهج العلمي (PDF رسمي / كتاب مدرسي)
- تصميم سيناريو موحّد لإعداد الدرس
- اختيار حل احترافي للأصوات (ElevenLabs مرشّح قوي)
