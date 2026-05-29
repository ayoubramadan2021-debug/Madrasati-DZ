-- ============================================
-- Migration 001: جدول العوالم (worlds)
-- البنية الهرمية: المادة → العالم → الدرس → المحتوى
-- الأدوار: admin (كل شيء) / moderator (المحتوى فقط) / student (قراءة)
-- ============================================

create table if not exists worlds (
  id uuid primary key default gen_random_uuid(),
  subject text not null,
  grade smallint not null,
  title_ar text not null,
  title_fr text,
  icon text,
  sort_order smallint not null default 0,
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists idx_worlds_subject_grade
  on worlds (subject, grade, sort_order);

alter table worlds enable row level security;

-- قراءة عامة
create policy worlds_public_read on worlds
  for select to public
  using (true);

-- الكتابة (إضافة/تعديل/حذف) للأدمن والمشرف
create policy worlds_staff_write on worlds
  for all to authenticated
  using (
    exists (select 1 from profiles where id = auth.uid() and role in ('admin','moderator'))
  )
  with check (
    exists (select 1 from profiles where id = auth.uid() and role in ('admin','moderator'))
  );
