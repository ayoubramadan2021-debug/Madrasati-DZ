-- Lesson 22 — صِحَّتِي فِي غِذَائِي
-- شغّل هذا الكود في Supabase SQL Editor
-- الهدف: إظهار الدرس 22 داخل التطبيق وربطه بمفتاح lesson22

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
values (
  22,
  'صِحَّتِي فِي غِذَائِي',
  'Ma santé dans mon alimentation',
  'science',
  1,
  22,
  'lesson22',
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
