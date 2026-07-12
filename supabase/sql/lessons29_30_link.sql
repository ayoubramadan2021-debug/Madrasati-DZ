INSERT INTO public.lessons
SELECT (
  jsonb_populate_record(
    NULL::public.lessons,
    to_jsonb(l) || jsonb_build_object(
      'id', gen_random_uuid(),
      'title', 'الكتابات المختلفة للعدد',
      'title_fr', 'Les différentes écritures du nombre',
      'sort_order', 29,
      'content', 'lesson29',
      'lesson_key', 'lesson29',
      'slug', 'lesson29'
    )
  )
).*
FROM public.lessons l
WHERE l.sort_order = 28
  AND NOT EXISTS (
    SELECT 1
    FROM public.lessons
    WHERE sort_order = 29
  )
LIMIT 1;

INSERT INTO public.lessons
SELECT (
  jsonb_populate_record(
    NULL::public.lessons,
    to_jsonb(l) || jsonb_build_object(
      'id', gen_random_uuid(),
      'title', 'تفكيك العدد وتركيبه',
      'title_fr', 'Décomposition et composition du nombre',
      'sort_order', 30,
      'content', 'lesson30',
      'lesson_key', 'lesson30',
      'slug', 'lesson30'
    )
  )
).*
FROM public.lessons l
WHERE l.sort_order = 28
  AND NOT EXISTS (
    SELECT 1
    FROM public.lessons
    WHERE sort_order = 30
  )
LIMIT 1;

SELECT
  title,
  sort_order,
  world_id,
  content
FROM public.lessons
WHERE sort_order IN (28, 29, 30)
ORDER BY sort_order;
