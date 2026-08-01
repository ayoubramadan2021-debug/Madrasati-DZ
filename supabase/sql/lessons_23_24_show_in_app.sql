-- Lessons 23 & 24 — show in app
-- شغّل هذا الملف داخل Supabase SQL Editor

insert into lessons (
  id,
  title_ar,
  title_fr,
  subject,
  grade,
  sort_order,
  v2_key,
  is_active
)
values
(
  23,
  'نُرَتِّبُ حَسَبَ الطُّولِ',
  'Je range selon la longueur',
  'math',
  1,
  23,
  'lesson23',
  true
),
(
  24,
  'أَرْسُمُ المَسَارَ',
  'Je trace le chemin',
  'math',
  1,
  24,
  'lesson24',
  true
)
on conflict (id) do update set
  title_ar = excluded.title_ar,
  title_fr = excluded.title_fr,
  subject = excluded.subject,
  grade = excluded.grade,
  sort_order = excluded.sort_order,
  v2_key = excluded.v2_key,
  is_active = true;
