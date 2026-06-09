## تحديث 2026-06-09 — جداول المشهد الافتتاحي

### جدول جديد: world_intro_views
يتتبّع من شاهد المشهد الافتتاحي لكل عالم.

- Columns: user_id (uuid, FK auth.users), world_id (uuid, FK worlds), viewed_at (timestamptz, default now())
- PRIMARY KEY: (user_id, world_id)
- RLS: enabled
- Policies:
  - users_read_own_intro_views: SELECT حيث user_id = auth.uid()
  - users_insert_own_intro_views: INSERT حيث user_id = auth.uid()

### عمود جديد: worlds.intro_content (jsonb)
يحفظ بنية المشهد الافتتاحي (slides + audio + options).

**بنية الـJSON:**
- audio_base: المسار الأساس للصوتيات
- slides: array من الشرائح، كل شريحة:
  - scene_image: مسار الصورة
  - audio_key: مفتاح الصوت
  - options (اختياري): قائمة بطاقات الإجابات لشريحة السؤال
  - audio_correct, audio_retry: للسؤال التفاعلي
  - is_closing, cta_text: للشريحة الأخيرة

### Lesson 1 المُدخَل
- ID: b5683a02-a878-4408-8e42-90ca32919aa4
- World: b0a43712-8b45-428d-bea2-55ff3de52d3a (العالم 1)
- Type: story_lesson
- Content: JSON كامل (intro + discover.steps + recap)

---

# مخطّط قاعدة البيانات — exercises

## enum: exercise_type
القيم الأصلية: link, count, color, sequence, arithmetic, order, mcq
المضافة هذه الجلسة: dragdrop, catch, trace, paint, balloon, connect, generate
معطّلة (غير مستخدمة): maze
ملاحظة: إضافة قيمة enum واستخدامها فورًا في نفس المعاملة ممنوع (خطأ 55P04) — نفّذ ALTER TYPE وحده، ثم الاستخدام في تشغيل منفصل.

## القيد: exercises_data_has_items
الأصل كان يفرض وجود مفتاح items في كل صف: CHECK (data ? 'items')
المحرّكات الجديدة تستعمل بنى مرنة (slots/tokens, glyphs, scenes...) بلا items، فعُدّل القيد ليستثنيها:
CHECK (type IN ('dragdrop','catch','trace','paint','balloon','connect','generate') OR (data ? 'items'))

## RLS
- exercises_public_read: SELECT حيث is_published = true (التمارين غير المنشورة لا يراها الزائر — سبب شائع لـ "التمرين غير موجود").
- exercises_admin_write: ALL للأدمن.

## التخزين ثنائي اللغة
القرار المعتمد ضمنيًا: jsonb موحّد {ar, fr} لكل حقول النصّ (title, instruction, rule, labels)، لا أعمدة منفصلة. مطبّق في كل المحرّكات عبر pickLang.
