# خطة تكامل دروس v2

**الحالة:** محضَّر — جاهز للتنفيذ في جلسة جديدة
**التقدير:** 45-60 دقيقة

## الهدف
ربط الدرسَين v2 (lesson1, lesson2) بـnavigation الرئيسي.
حالياً المستخدم يصل لهما فقط بكتابة URL يدوياً.

## ما ينقص في DB
عمود template_version في جدول lessons.

## ما موجود مسبقاً (مؤكد)
- Routes في App.tsx: /lesson-v2/:lessonId? + /lesson-v2/:lessonId/exercises
- LessonV2Page ديناميكية (تقرأ lessonId من URL)
- Migration 002 يحوي world_id, title_fr, sort_order
