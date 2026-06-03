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
