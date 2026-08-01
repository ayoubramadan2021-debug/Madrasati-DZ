# خطة المحرك Premium الموحّد للدروس والتمارين

آخر تحديث: 2026-07-23 09:52:38 +0100
الفرع: `batch-lessons-14-18`
المرجع البعيد: `origin/batch-lessons-14-18`

## 1. القرار المعماري

لا نبني محركًا ضخمًا يعيد تنفيذ كل تمرين. البنية الصحيحة تكون بطبقتين:

1. **PremiumLessonEngineV2** للدروس: يدير المشاهد، الصوت، الكاريوكي، التقدم، إعادة التشغيل، نهاية الدرس والانتقال إلى التدريب.
2. **PremiumExerciseFlowV2** للتمارين: يدير مراحل التمرين عبر `stage` و`onComplete`، ويستعمل المحركات الأصلية المتخصصة مثل:
   - `TapSelectExerciseV2`
   - `CountTapExerciseV2`
   - `DragMatchExerciseV2`
   - `SortSequenceExerciseV2`
   - `TraceExerciseV2`
   - بقية المحركات المتخصصة الموجودة بالمشروع.

المحرك الموحّد مسؤول عن الغلاف والتدفق والحالة المشتركة، وليس عن استبدال منطق كل نشاط متخصص.

## 2. العقد الموحّد للدروس

يجب أن يقبل محرك الدروس إعدادًا بياناتيًا يحتوي على:

- `lessonKey` ورقم الدرس والعالم.
- `audioBase`.
- قائمة المشاهد: الصورة، النص، مفتاح الصوت وملف WordBoundary.
- إعداد التشغيل التلقائي وإعادة التشغيل.
- مسار التمارين ومسار الدرس التالي والاختبار.
- شاشة نهاية موحدة.

يُعاد استخدام `WorldIntroSceneV2` كمرجع حقيقي لواجهة الدرس، أو يُغلف داخل `PremiumLessonEngineV2` بدل نسخ منطقه.

## 3. العقد الموحّد للتمارين

يحتوي كل درس على تعريف تدفق مثل:

`exerciseId → engine → items → audioBase → onComplete nextStage`

ويجب أن يضمن:

- انتقالًا واحدًا موثوقًا بعد نجاح السؤال.
- إعادة المحاولة بعد الخطأ دون فقدان حالة السؤال.
- صوت «أحسنت» و«حاول مرة أخرى» من مصدر موحد.
- كاريوكي موحد باستعمال `question_audio_key` وملفات JSON.
- عداد السؤال داخل المحرك المتخصص، وعداد المرحلة داخل التدفق الموحّد.
- شاشة نهاية موحدة للدرس.

## 4. الملفات المقترحة

- `src/features/lesson-v2/premium/PremiumLessonEngineV2.tsx`
- `src/features/lesson-v2/premium/PremiumExerciseFlowV2.tsx`
- `src/features/lesson-v2/premium/types.ts`
- `src/features/lesson-v2/premium/registry.ts`
- `src/features/lesson-v2/premium/audio.ts`
- `src/features/lesson-v2/premium/README.md`

تبقى بيانات كل درس في ملفات المحتوى، وتبقى المحركات المتخصصة مستقلة وقابلة لإعادة الاستخدام.

## 5. مراحل التنفيذ

### المرحلة 1 — التثبيت

- تثبيت العقود TypeScript.
- فصل تدفق المراحل عن مكونات العرض.
- توحيد الصوت والكاريوكي والتغذية الراجعة.
- إضافة اختبارات انتقال الحالة.

### المرحلة 2 — درس مرجعي

- تحويل الدرس 1 دون تغيير تصميمه أو محتواه.
- مطابقة سلوكه الحالي حرفيًا.
- اختبار جميع المراحل حتى شاشة النهاية.

### المرحلة 3 — عالم الألعاب

- تحويل درس واحد فقط كمرجع من الدروس 33–36.
- عدم ترحيل بقية الدروس قبل نجاح الاختبار اليدوي والبناء.

### المرحلة 4 — الترحيل التدريجي

- ترحيل درس واحد في كل commit.
- عدم تعديل المحركات الأصلية إلا لإصلاح عام مثبت.
- الاحتفاظ بإمكانية الرجوع إلى التدفق القديم أثناء الترحيل.

## 6. معايير القبول

- البناء ينجح دون أخطاء TypeScript.
- السؤال الصحيح ينتقل مرة واحدة فقط.
- السؤال الخاطئ يسمح بإعادة المحاولة.
- لا تتداخل أصوات سؤالين.
- الكاريوكي يطابق الصوت.
- كل مرحلة تستدعي `onComplete` مرة واحدة.
- نهاية المرحلة تنقل إلى المحرك التالي.
- نهاية جميع المراحل تعرض شاشة الإكمال.
- يعمل على الهاتف وبوضع ملء الشاشة.

## 7. سياسة Git

- فرع مستقل لكل دفعة ترحيل.
- commit منفصل للخطة، وآخر للعقود، ثم commit لكل درس.
- منع إضافة تغييرات غير مرتبطة عبر `git add .`.
- تشغيل البناء قبل رفع أي كود تنفيذي.
- عدم حذف التدفق القديم قبل اعتماد المرجع الجديد يدويًا.

## 8. نتيجة التحقق الحالية

| العنصر | موجود محليًا | متتبع في Git | موجود على `origin/batch-lessons-14-18` |
|---|---:|---:|---:|
| `src/features/lesson-v2/exercises-v2/PremiumExerciseEngineV2.tsx` | نعم | لا | لا |
| `src/features/exercises/templates/WorldIntroSceneV2.tsx` | نعم | نعم | نعم |

**محرك Premium الموحّد الصريح للدروس:** وُجد محرك/ملفات Premium موحدة للدروس على origin/batch-lessons-14-18.

### ملفات الدروس المرشحة التي عثر عليها الفحص

| الملف | موجود محليًا | متتبع | على الفرع البعيد |
|---|---:|---:|---:|
| `src/features/lesson-v2/exercises-v2/Lesson35FullscreenPremiumV3.tsx` | نعم | نعم | نعم |
| `src/features/lesson-v2/exercises-v2/Lesson35PremiumBreathingExercises.tsx` | نعم | نعم | نعم |
| `src/features/lesson-v2/exercises-v2/lesson30/Lesson30CompositionBuilderEngineV2.tsx` | نعم | نعم | نعم |
| `src/features/lesson-v2/exercises-v2/lesson30/Lesson30CompositionChoiceEngineV2.tsx` | نعم | نعم | نعم |
| `src/features/lesson-v2/exercises-v2/lesson30/Lesson30CompositionCountEngineV2.tsx` | نعم | نعم | نعم |
| `src/features/lesson-v2/exercises-v2/lesson31/Lesson31CompareEngineV2.tsx` | نعم | نعم | نعم |
| `src/features/lesson-v2/exercises-v2/lesson31/Lesson31SubtractionEngineV2.tsx` | نعم | نعم | نعم |
| `src/features/lesson-v2/exercises-v2/lesson31/Lesson31VisualChoiceEngineV2.tsx` | نعم | نعم | نعم |
| `src/features/lesson-v2/exercises-v2/lesson32/Lesson32CompareEngineV2.tsx` | نعم | نعم | نعم |
| `src/features/lesson-v2/exercises-v2/lesson32/Lesson32SubtractionEngineV2.tsx` | نعم | نعم | نعم |
| `src/features/lesson-v2/exercises-v2/lesson32/Lesson32VisualChoiceEngineV2.tsx` | نعم | نعم | نعم |
