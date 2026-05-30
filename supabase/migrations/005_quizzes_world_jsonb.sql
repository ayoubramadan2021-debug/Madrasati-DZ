-- ============================================
-- Migration 005: توحيد الاختبارات (quizzes)
-- ربطها بالعالم + data jsonb ثنائي اللغة + شروط النجاح
-- (الأعمدة القديمة question/options تبقى مؤقتاً للتوافق)
-- ============================================

-- ربط الاختبار بالعالم (بوّابة العالم)
alter table quizzes
  add column if not exists world_id uuid references worlds(id) on delete cascade;

-- بنية مرنة ثنائية اللغة (title + أسئلة)
alter table quizzes
  add column if not exists data jsonb;

-- نسبة النجاح المطلوبة (افتراضي 70%)
alter table quizzes
  add column if not exists pass_threshold smallint not null default 70;

-- المدة بالدقائق (اختياري، null = بلا مؤقّت)
alter table quizzes
  add column if not exists time_limit smallint;

-- نشر الاختبار
alter table quizzes
  add column if not exists is_published boolean not null default false;

-- فهرس لجلب اختبار عالم معيّن
create index if not exists idx_quizzes_world
  on quizzes (world_id);
