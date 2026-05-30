-- ============================================
-- Migration 006: نظام XP التحفيزي
-- عمود xp في profiles (منفصل عن points التقدّم)
-- ============================================

alter table profiles
  add column if not exists xp integer not null default 0;
