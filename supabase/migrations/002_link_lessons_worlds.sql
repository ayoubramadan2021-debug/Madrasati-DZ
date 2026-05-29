-- ============================================
-- Migration 002: ربط الدروس بالعوالم
-- يضيف world_id (FK) + title_fr + sort_order لجدول lessons
-- ============================================

-- ربط الدرس بعالمه (مفتاح أجنبي)
alter table lessons
  add column if not exists world_id uuid references worlds(id) on delete set null;

-- العنوان بالفرنسية (العربية موجودة في title)
alter table lessons
  add column if not exists title_fr text;

-- ترتيب الدرس داخل العالم
alter table lessons
  add column if not exists sort_order smallint not null default 0;

-- فهرس لتسريع جلب دروس عالم معيّن مرتّبة
create index if not exists idx_lessons_world
  on lessons (world_id, sort_order);
