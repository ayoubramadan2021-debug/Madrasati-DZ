
---

## ✅ تحديث الدرس 13 — الأعداد من 1 إلى 10

تم إنجاز ودمج الدرس 13 وتمارينه داخل نظام Lesson V2.

### محتوى الدرس
- عنوان الدرس: **أَعُدُّ الأَشْيَاءَ (الأعداد 1-10)**.
- مشاهد تعليمية للأعداد من 1 إلى 10.
- إصلاح المشهد الختامي وإزالة أي عناصر عدّ غير مناسبة منه.
- ضبط النصوص العربية والتشكيل قدر الإمكان.
- تحديث الصور والأصوات وملفات الكاريوكي الخاصة بالدرس.

### تمارين الدرس 13
تم تجهيز وربط أربعة أنشطة:

1. **النشاط 1:** عدّ الأشياء واختيار العدد الصحيح.
2. **النشاط 2:** اختيار الصورة التي تحتوي على العدد المطلوب.
   - إصلاح عرض الصور باستعمال `image_fit: "contain"` حتى لا تُقصّ الصور، خصوصًا صورة البالونات.
3. **النشاط 3:** سحب الرقم إلى الكمية المناسبة.
4. **النشاط 4:** كتابة الأعداد من 1 إلى 10 باستعمال `TraceExerciseV2`.
   - إضافة دعم الرقم 10 داخل `TraceExerciseV2`.
   - تغيير العبارة من "تتبع الرقم" إلى "اكتب الرقم".
   - إصلاح ملفات الكاريوكي JSON الخاصة بالنشاط الرابع.

### إصلاحات إضافية
- تغيير مصطلح **دُمَى** إلى **لُعَب** لتفادي مشاكل نطق الصوت.
- توليد وإصلاح ملفات الصوت والكاريـوكي للتمارين.
- ربط نهاية الدرس 12 بزر **الدرس التالي** للانتقال إلى الدرس 13.
- إبقاء الدرس 13 كآخر درس مع أزرار اختبار العالم والرئيسية.

### ملفات مهمة
- `src/features/lesson-v2/content/lesson13.ts`
- `src/features/lesson-v2/content/lesson13_exercise1.ts`
- `src/features/lesson-v2/content/lesson13_exercise2.ts`
- `src/features/lesson-v2/content/lesson13_exercise3.ts`
- `src/features/lesson-v2/content/lesson13_exercise4.ts`
- `src/pages/Lesson13ExercisesPage.tsx`
- `src/pages/Lesson12ExercisesPage.tsx`
- `src/features/lesson-v2/exercises-v2/TapSelectImagesV2.tsx`
- `src/features/lesson-v2/exercises-v2/TraceExerciseV2.tsx`
- `public/audio/lesson_13_counting/`
- `public/audio/lesson_13_exercises/`

