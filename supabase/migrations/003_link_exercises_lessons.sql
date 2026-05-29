-- ============================================
-- Migration 003: ربط التمارين بالدروس
-- يضيف lesson_id (FK) لجدول exercises
-- (يحل محل lesson_number المعطوب الذي يبقى null)
-- ============================================

alter table exercises
  add column if not exists lesson_id uuid references lessons(id) on delete set null;

create index if not exists idx_exercises_lesson
  on exercises (lesson_id);
