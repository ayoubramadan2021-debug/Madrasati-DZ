BEGIN;

-- يجب أن يكون الدرس 30 موجودًا لأنه المرجع الذي سننسخ منه
DO $$
DECLARE
  lesson30_count integer;
  lesson31_count integer;
BEGIN
  SELECT count(*)
  INTO lesson30_count
  FROM public.lessons
  WHERE sort_order = 30;

  IF lesson30_count <> 1 THEN
    RAISE EXCEPTION
      'يجب وجود سجل واحد فقط للدرس 30، العدد الحالي: %',
      lesson30_count;
  END IF;

  SELECT count(*)
  INTO lesson31_count
  FROM public.lessons
  WHERE sort_order = 31
     OR content = 'lesson31'
     OR lesson_key = 'lesson31'
     OR slug = 'lesson31';

  IF lesson31_count > 1 THEN
    RAISE EXCEPTION
      'توجد سجلات متكررة محتملة للدرس 31، العدد: %',
      lesson31_count;
  END IF;
END $$;

-- تحديث السجل إن كان الدرس 31 مسجلًا مسبقًا
UPDATE public.lessons
SET
  title = 'مراجعة متكاملة: الاستعداد لرحلة مدرسية',
  title_fr = 'Révision intégrée : préparation d''une sortie scolaire',
  sort_order = 31,
  content = 'lesson31',
  lesson_key = 'lesson31',
  slug = 'lesson31'
WHERE sort_order = 31
   OR content = 'lesson31'
   OR lesson_key = 'lesson31'
   OR slug = 'lesson31';

-- إنشاء الدرس 31 من خصائص الدرس 30 إن لم يكن موجودًا
INSERT INTO public.lessons
SELECT (
  jsonb_populate_record(
    NULL::public.lessons,
    to_jsonb(l) || jsonb_build_object(
      'id', gen_random_uuid(),
      'title', 'مراجعة متكاملة: الاستعداد لرحلة مدرسية',
      'title_fr', 'Révision intégrée : préparation d''une sortie scolaire',
      'sort_order', 31,
      'content', 'lesson31',
      'lesson_key', 'lesson31',
      'slug', 'lesson31'
    )
  )
).*
FROM public.lessons l
WHERE l.sort_order = 30
  AND NOT EXISTS (
    SELECT 1
    FROM public.lessons
    WHERE sort_order = 31
       OR content = 'lesson31'
       OR lesson_key = 'lesson31'
       OR slug = 'lesson31'
  )
LIMIT 1;

COMMIT;

-- التحقق من تسلسل الدرسين
SELECT
  title,
  title_fr,
  sort_order,
  world_id,
  content,
  lesson_key,
  slug
FROM public.lessons
WHERE sort_order IN (30, 31)
ORDER BY sort_order;
