# نقطة الاستئناف — Taalim-DZ
> آخر تحديث: 2026-06-14
> الحالة: الدروس 1، 2، 3 كاملة بتمارينها ✅ — منشورة

## نسق العمل: رفع مباشر (push dev → merge main → نشر Netlify).

## الدروس المكتملة
- الدرس 1: الأعداد 1-5 — 6 scenes + 5 تمارين
- الدرس 2: بيت تالين (المواقع) — 6 scenes + 3 تمارين
- الدرس 3: رحلة الحواس (حظيرة القالة) — 6 scenes + 3 تمارين ✅
  * المشاهد: خليل + 3 أطفال في القالة، 5 حواس بصيغة المفرد
  * التمارين: TapSelectWords (مشهد→حاسة) + DragMatch (حاسة→عضو) + TapSelectWords (جملة→حاسة)
  * صورة أعضاء موحّدة (senses-organs.webp) كخلفية لتمرينَي 2 و3 (تمنع التخمين)

## إصلاحات تقنية هذه الجلسة
- **سباق الصوت (race) في الكاريوكي**: hook مشترك `useKaraoke.ts` بـ"رمز جيل" (genRef)
  يمنع play المعلّق من إحياء الصوت بعد stop. طُبّق على TapSelectWords + DragMatch.
  + karaoke.stop() عند المطابقة الصحيحة في DragMatch.
  ⚠️ متبقّي: تعميم useKaraoke المشترك على الـ5 محرّكات الأخرى (CountTap, SortSequence,
     TapSelectExercise, TapSelectImages, Trace) — ما زالت بنسخ محلّية.

## ما تبقى
- الدرس 2: تمرين 4 + 5 (إن أردت إكماله لـ5)
- تعميم useKaraoke على المحرّكات الخمسة الباقية
- bug مؤجّل: عدّاد الشرائح مقلوب ("6/2")
- الدرس 4 (المنهاج: الأعداد 6-9 أو تعيين موقع 2)

## دروس تقنية
- Pollinations مدفوع (402) → صور ChatGPT يدوياً ثم ضغط (cwebp -q 84 -resize 800 0، أو Pillow)
- edge-tts: boundary="WordBoundary" إلزامي
- DragMatch: background_image يُمرَّر كـprop (لا في المحتوى)؛ يدعم word→word
- sed: تجنّب فاصل # و| عند وجودهما بالنص

## كيف تبدأ الجلسة القادمة
> أيوب من Taalim-DZ. [اختر: الدرس 4 / تعميم useKaraoke / إكمال تمارين الدرس 2]
> اقرأ docs/00_RESUME_HERE.md.
