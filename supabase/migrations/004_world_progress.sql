-- ============================================
-- Migration 004: تتبّع تقدّم العوالم (نظام القفل)
-- status: locked / unlocked / completed
-- ============================================

create table if not exists world_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  world_id uuid not null references worlds(id) on delete cascade,
  status text not null default 'locked',
  best_score smallint not null default 0,
  unlocked_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  unique (user_id, world_id)
);

create index if not exists idx_world_progress_user
  on world_progress (user_id);

alter table world_progress enable row level security;

-- المستخدم يقرأ تقدّمه فقط
create policy wp_read on world_progress
  for select to authenticated
  using (auth.uid() = user_id);

-- المستخدم يكتب تقدّمه فقط
create policy wp_insert on world_progress
  for insert to authenticated
  with check (auth.uid() = user_id);

create policy wp_update on world_progress
  for update to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
