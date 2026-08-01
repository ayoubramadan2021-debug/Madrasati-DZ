-- Lesson 16: أتحرك وأحافظ على صحتي
-- انسخ هذا الملف كاملًا في Supabase SQL Editor ثم Run

insert into public.lessons (
  id,
  world_id,
  title,
  slug,
  sort_order,
  is_published,
  created_at,
  updated_at
)
select
  '11111111-1111-1111-1111-000000000016'::uuid,
  world_id,
  'أَتَحَرَّكُ وَأُحَافِظُ عَلَى صِحَّتِي',
  'lesson16-health-movement',
  16,
  true,
  now(),
  now()
from public.lessons
where id = '11111111-1111-1111-1111-000000000015'::uuid
on conflict (id) do update set
  title = excluded.title,
  slug = excluded.slug,
  sort_order = excluded.sort_order,
  is_published = true,
  updated_at = now();

select *
from public.lessons
where id = '11111111-1111-1111-1111-000000000016'::uuid;
