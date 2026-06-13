# خطة تكامل دروس v2 — مكتملة ✅
> نُفّذت 2026-06-13

## كيف يعمل
1. DB: صفّان في `lessons` بـUUIDs ثابتة، world_id `b0a43712-…`, template_version 2.
2. Registry: `src/features/lesson-v2/v2Registry.ts` — UUID → مفتاح v2 (lesson1/lesson2).
3. WorldPage onClick: getV2Key(l.id) → `/lesson-v2/<key>` إن وُجد، وإلا `/lesson/<id>`.

## لإضافة درس v2 جديد
1. INSERT صف في `lessons` (UUID ثابت، world_id، sort_order، template_version=2).
2. سطر في `v2Registry.ts`: `"<uuid>": "<v2 key>"`.
3. تأكد أن المفتاح في LESSONS_MAP بـLessonV2Page.tsx.

## ملاحظة
`template_version` كان موجوداً أصلاً — لم نحتج migration كما افترضت الخطة الأولى.
