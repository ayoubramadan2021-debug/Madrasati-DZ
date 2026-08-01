begin;

insert into public.lessons (
  id, title, subject, grade, content, created_at,
  world_id, title_fr, sort_order, lesson_type,
  scenes, template_version, objectives,
  estimated_duration_seconds
)
select
  gen_random_uuid(),
  'الرَّمْزَانِ + وَ =',
  'math',
  1,
  'lesson27',
  now(),
  world_id,
  'Les symboles + et =',
  27,
  lesson_type,
  '[]'::jsonb,
  2,
  '[]'::jsonb,
  estimated_duration_seconds
from public.lessons
where sort_order = 26
  and not exists (
    select 1
    from public.lessons
    where sort_order = 27
  )
limit 1;

insert into public.lessons (
  id, title, subject, grade, content, created_at,
  world_id, title_fr, sort_order, lesson_type,
  scenes, template_version, objectives,
  estimated_duration_seconds
)
select
  gen_random_uuid(),
  'الرَّمْزَانِ - وَ =',
  'math',
  1,
  'lesson28',
  now(),
  world_id,
  'Les symboles - et =',
  28,
  lesson_type,
  '[]'::jsonb,
  2,
  '[]'::jsonb,
  estimated_duration_seconds
from public.lessons
where sort_order = 26
  and not exists (
    select 1
    from public.lessons
    where sort_order = 28
  )
limit 1;

select
  id,
  title,
  sort_order,
  content
from public.lessons
where sort_order between 26 and 28
order by sort_order;

commit;
