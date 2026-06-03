# البنية التقنية — محرّكات التمارين

## نظرة عامة
نظام التمارين يعتمد جدول `exercises` في Supabase بحقل `type` (enum) يحدّد المحرّك، وحقل `data` (jsonb) يحمل محتوى التمرين بشكل مرن. صفحة `src/pages/ExercisePage.tsx` تجلب الصف بالـ id وتختار المحرّك عبر `switch (type)`.

كل المحرّكات في `src/features/exercises/templates/`، ثنائية اللغة عبر `pickLang(value, lang)` من `src/lib/pickLang.ts`، وتستعمل `useLang()` من `src/i18n/LanguageContext`.

## عقد موحّد
- `title` و`instruction` يُمرّران ككائن `{ar, fr}` ويُعرضان عبر `pickLang`.
- التمارين القابلة للتصحيح تستدعي `onComplete(score, total)` → تطلق نافذة ديزاد في `ExercisePage`.
- الدروس (lesson) لا تُمرَّر `onComplete` (لا ديزاد — درس لا تمرين).
- الألوان: NAVY #1B3A6B، GOLD #E8A020، GREEN #1FA463، RED #E0413E.

## المحرّكات (8)

### 1. dragdrop — السحب والإفلات
تصنيف: عناصر (tokens) تُوضع في صناديق (slots) حسب accepts === group.
data: {instruction, slots:[{id,label,accepts}], tokens:[{id,emoji,group}]}
مساران: سحب HTML5 (حاسوب) + نقر (رمز ← صندوق) للجوال.

### 2. catch — التفاح المتساقط
عناصر تسقط، سلة بالإصبع تلتقط ما يطابق شرطًا.
data: {instruction, rule, items:[{label,correct}], target=5, duration=40, spawnEvery}
حركة عبر DOM مباشرة (ref+style) لا re-render. total = target.

### 3. trace — التتبّع
تتبّع تراكمي بالإصبع على مسار SVG؛ نجاح عند تغطية نسبة (افتراضي 0.8).
data: {instruction, threshold=0.8, glyphs:[{label,path}]}
أرقام 0–9: مسارات centerline يدوية (خط الكتابة لا outline) viewBox 100×100.

### 4. paint — فرشاة التلوين
لوحة تلوين حرّة (canvas) بلا تصحيح. ألوان + 3 فرش + ممحاة + مسح + تمّ.
data: {instruction, colors?[]}. معالجة DPR.

### 5. balloon — البالونات
بالونات تطفو، نقر ما يطابق شرطًا. هدف افتراضي 12 (تكرار كافٍ).
data: {instruction, rule, items:[{label,correct}], target=12, duration=50, spawnEvery}

### 6. connect — الخيط/المطابقة
عمودان، نقر يسار ثم يمين. صحيح يختفي، خطأ يومض أحمر. تصحيح فوري.
data: {instruction, left:[{id,label}], right:[{id,label}], pairs:[{left,right}]}

### 7. generate — التوليد اللانهائي
مولّد محلّي خوارزمي (offline) جمع/طرح، اختيار من متعدّد.
data: {instruction, mode:"add"|"sub", max=10, rounds=10}
النتيجة تحلّ محلّ ?. محلّي = فوري ومجاني وoffline.

### 8. lesson — الدرس المتحرّك (بديل الفيديو)
مشاهد متسلسلة برسوم emoji متحرّكة + سرد TTS متزامن. خفيف (كيلوبايتات) offline ثنائي اللغة.
data: {instruction, scenes:[{kind:"show"|"count", say, apples, group, equation?, ms?}]}
count ينطق كل رقم منفصلًا مع ظهور تفاحته. معاينة ثابتة قبل التشغيل. لا ديزاد.

## ملاحظات/مزالق
- التصدير ثنائي الخطوة (function X(){} export default X) يتطلب حقن useLang() يدويًا.
- maze: بُنيت ثم حُذفت بقرار المستخدم؛ قيمة enum تبقى معطّلة.
- إدراج SQL على الجوال: استعمل سطرًا واحدًا للـ jsonb، تجنّب أسطرًا بعد ).
