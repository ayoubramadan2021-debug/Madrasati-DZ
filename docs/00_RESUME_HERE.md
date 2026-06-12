# نقطة الاستئناف — Taalim-DZ
> **آخر تحديث:** 2026-06-11
> **الحالة:** الدرس 1 كامل ✅ — الدرس 2 (3 من 5 تمارين) ⏳

---

## 📍 أين توقّفنا

### الدرس 1: "الأعداد من 1 إلى 5" ✅ كامل 100%
- 6 scenes DALL-E + TTS karaoke + كاريوكي عددي على التفاحات
- 5 تمارين × 5 أسئلة = 25 سؤال
- 5 مهارات مختلفة: TapSelect, CountTap, DragMatch, SortSequence, Trace

### الدرس 2: "بَيْتُ تَالِينْ" (المواقع في الفضاء) — جاري
**المحتوى المنجز:**
- ✅ 6 scenes (Gemini Imagen 3) — Scenes 2-5 **مُعاد توليدها بمبالغة بصرية** لتعليم أوضح للأطفال 6 سنوات
- ✅ 6 TTS files (l2_intro, l2_amam, l2_waraa, l2_bijanib, l2_muqabil, l2_outro)
- ✅ النصوص بإعراب دقيق: "أَمَامَ الْأَرِيكَةِ"، "بِجَانِبْ الْفُرْنِ" (سكون)، "مُقَابِلَ النَّافِذَةِ"
- ✅ Twemoji integration كاملة (component + 12 SVG في public/twemoji/)
- ✅ EmojiIcon component يستخرج codepoint ديناميكياً (يتجاوز variation selectors)

**التمارين المنجزة:**
1. ✅ **TapSelectWordsV2** (تمرين 1) — صورة scene + 4 كلمات (أمام/وراء/بجانب/مقابل)
2. ✅ **TapSelectImagesV2** (تمرين 2) — كلمة + 4 صور للاختيار
3. ✅ **DragMatchExerciseV2** (تمرين 3) — اسحب كلمة → صورة (`kind: "image"` أُضيف للـItemRepresentation)

**التمارين المتبقية للدرس 2:**
- ⏳ **التمرين 4** — يحتاج بناء (اقتراح: MatchPair أو نوع جديد للمواقع)
- ⏳ **التمرين 5** — يحتاج بناء (لا Trace هنا — كلمات لا أرقام)

---

## 🛠️ Tech Stack الإضافي
- `@twemoji/svg` (1500+ SVG emojis) — جودة موحدة عبر كل الأجهزة
- نفس بنية الدرس 1 + 3 components جديدة:
  - `TapSelectWordsV2.tsx` (صورة scene + كلمات)
  - `TapSelectImagesV2.tsx` (كلمة + 4 صور)
  - `EmojiIcon.tsx` (مساعد Twemoji)

## 🎨 درس مكتسب مهم
**الـemojis ليست لكل درس:**
- ✅ **استخدمها** عند تعليم العدد/الكمية (الأعداد، الجمع، الطرح، الفواكه)
- ❌ **لا تستخدمها** عند تعليم العلاقات/المفاهيم (المواقع، الأشكال، الألوان) — الصورة الكاملة كافية

في الدرس 2، أزلنا `items_emoji_list` من scenes لأن DALL-E scenes تُجسّد المواقع بصرياً والـemojis كانت مشوّشة (🛋️ بجانب 📺 لا يُظهر "أمام").

## 🎨 درس مكتسب آخر
**المبالغة البصرية ضرورية للأطفال 6 سنوات:**
- "أمام" → الجسمان متقاربان جداً (50 سم)، زاوية جانبية
- "وراء" → جزء من الجسم الخلفي مُختفي بفعل الأمامي
- "بجانب" → الأجسام متلاصقة، صفر فجوة
- "مقابل" → زاوية جانبية، الأجسام تواجه بعضها

---

## 🎯 الجلسة القادمة

### المهام الأولوية
1. **بناء تمرين 4 للدرس 2** — اقتراحات:
   - **MatchPair:** عرض 4 أزواج (صورة + كلمة) مختلطة، الطفل يصنّف
   - **TapSelectWordsV2 معكوس:** صورة scene 1 (بدون توضيح) + اختر العلاقة
   - **GroupSort:** صنّف عناصر إلى 4 مجموعات حسب موقعها
2. **بناء تمرين 5 للدرس 2** (الأخير)
3. **Commit + push** للـGitHub
4. **اختبار شامل** للدرس 2 كاملاً

### القرارات المعلّقة
- **Image generation:** سنواصل مع Gemini (مجاني، Imagen 3، جودة Pixar 3D)
- **بدائل للمستقبل:** Leonardo.AI free tier (150 صورة/يوم + Character Reference)

---

## 📚 الملفات المرجعية المهمة
- `docs/00_LESSON_BLUEPRINT.md` ← المرجع المعماري
- `src/features/lesson-v2/exercises-v2/` ← 6 components للتمارين (5 من الدرس 1 + 2 جديدة للدرس 2)
- `src/features/lesson-v2/content/lesson{1,2}*.ts` ← بيانات الدروس
- `gen_audio_lesson*.py` و `gen_audio_lesson2_exercise*.py` ← سكريبتات TTS
- `public/twemoji/` ← 12 SVG ألوان Twemoji
- `public/lessons/v2/lesson2-house/` ← 6 صور بيت تالين

---

## 🎙️ كيف تبدأ الجلسة القادمة

> أيوب من Taalim-DZ. أنهيت الدرس 1 كاملاً + 3 من 5 تمارين للدرس 2.
> اقرأ `docs/00_RESUME_HERE.md` ثم `docs/00_LESSON_BLUEPRINT.md`.
> نُكمل بناء تمارين 4 و 5 للدرس 2: "بَيْتُ تَالِينْ" (المواقع في الفضاء).
> الـcomponents الـ3 الجديدة جاهزة (TapSelectWordsV2, TapSelectImagesV2, DragMatchExerciseV2 بـimage support).
