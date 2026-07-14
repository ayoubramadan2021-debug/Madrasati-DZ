BEGIN;

WITH d(n,k,t,f) AS (
  VALUES
  (
    31,
    'lesson31',
    'أُجَنِّدُ مَعَارِفِي: مُرَاجَعَةٌ مُتَكَامِلَةٌ',
    'Je mobilise mes acquis : révision intégrée'
  ),
  (
    32,
    'lesson32',
    'أُجَنِّدُ مَعَارِفِي: أَسْتَعِدُّ لِرِحْلَةٍ مَدْرَسِيَّةٍ',
    'Je mobilise mes acquis : je prépare une sortie scolaire'
  )
)
UPDATE public.lessons l
SET
  title = d.t,
  title_fr = d.f,
  sort_order = d.n,
  content = d.k
FROM d
WHERE l.sort_order = d.n
   OR l.content = d.k;

WITH d(n,k,t,f) AS (
  VALUES
  (
    31,
    'lesson31',
    'أُجَنِّدُ مَعَارِفِي: مُرَاجَعَةٌ مُتَكَامِلَةٌ',
    'Je mobilise mes acquis : révision intégrée'
  ),
  (
    32,
    'lesson32',
    'أُجَنِّدُ مَعَارِفِي: أَسْتَعِدُّ لِرِحْلَةٍ مَدْرَسِيَّةٍ',
    'Je mobilise mes acquis : je prépare une sortie scolaire'
  )
),
model AS (
  SELECT *
  FROM public.lessons
  WHERE sort_order = 30
  LIMIT 1
)
INSERT INTO public.lessons
SELECT (
  jsonb_populate_record(
    NULL::public.lessons,
    to_jsonb(model) ||
    jsonb_build_object(
      'id', gen_random_uuid(),
      'title', d.t,
      'title_fr', d.f,
      'sort_order', d.n,
      'content', d.k,
      'created_at', now()
    )
  )
).*
FROM model
CROSS JOIN d
WHERE NOT EXISTS (
  SELECT 1
  FROM public.lessons l
  WHERE l.sort_order = d.n
     OR l.content = d.k
);

COMMIT;

SELECT title, title_fr, sort_order, content
FROM public.lessons
WHERE sort_order IN (31,32)
ORDER BY sort_order;
