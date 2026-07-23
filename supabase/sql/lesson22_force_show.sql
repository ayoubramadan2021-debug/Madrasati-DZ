-- =========================================================
-- Lesson 22 — Force show in Supabase
-- صِحَّتِي فِي غِذَائِي
-- شغّل هذا الكود داخل Supabase SQL Editor
-- =========================================================

-- 1) تحقق من وجود جدول lessons
select
  table_schema,
  table_name
from information_schema.tables
where table_schema = 'public'
  and table_name = 'lessons';

-- 2) تحقق من أعمدة جدول lessons
select
  column_name,
  data_type,
  is_nullable,
  column_default
from information_schema.columns
where table_schema = 'public'
  and table_name = 'lessons'
order by ordinal_position;

-- 3) حذف نسخة lesson22 القديمة إن وجدت بمفتاح v2_key أو id = 22
do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public'
      and table_name = 'lessons'
      and column_name = 'v2_key'
  ) then
    execute 'delete from public.lessons where v2_key = ''lesson22''';
  end if;

  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public'
      and table_name = 'lessons'
      and column_name = 'id'
  ) then
    execute 'delete from public.lessons where id::text = ''22''';
  end if;
end $$;

-- 4) إدخال الدرس 22 بالأعمدة الأساسية الموجودة فعلا في جدولك
do $$
declare
  cols text[] := array[]::text[];
  vals text[] := array[]::text[];
  sql text;
begin
  if not exists (
    select 1 from information_schema.tables
    where table_schema = 'public'
      and table_name = 'lessons'
  ) then
    raise exception 'Table public.lessons does not exist';
  end if;

  if exists (select 1 from information_schema.columns where table_schema='public' and table_name='lessons' and column_name='id') then
    cols := cols || 'id';
    vals := vals || '22';
  end if;

  if exists (select 1 from information_schema.columns where table_schema='public' and table_name='lessons' and column_name='title') then
    cols := cols || 'title';
    vals := vals || quote_literal('صِحَّتِي فِي غِذَائِي');
  end if;

  if exists (select 1 from information_schema.columns where table_schema='public' and table_name='lessons' and column_name='title_ar') then
    cols := cols || 'title_ar';
    vals := vals || quote_literal('صِحَّتِي فِي غِذَائِي');
  end if;

  if exists (select 1 from information_schema.columns where table_schema='public' and table_name='lessons' and column_name='title_fr') then
    cols := cols || 'title_fr';
    vals := vals || quote_literal('Ma santé dans mon alimentation');
  end if;

  if exists (select 1 from information_schema.columns where table_schema='public' and table_name='lessons' and column_name='description') then
    cols := cols || 'description';
    vals := vals || quote_literal('درس تفاعلي حول تنويع الغذاء وتقليل السكر للمحافظة على الصحة');
  end if;

  if exists (select 1 from information_schema.columns where table_schema='public' and table_name='lessons' and column_name='subject') then
    cols := cols || 'subject';
    vals := vals || quote_literal('science');
  end if;

  if exists (select 1 from information_schema.columns where table_schema='public' and table_name='lessons' and column_name='grade') then
    cols := cols || 'grade';
    vals := vals || '1';
  end if;

  if exists (select 1 from information_schema.columns where table_schema='public' and table_name='lessons' and column_name='sort_order') then
    cols := cols || 'sort_order';
    vals := vals || '22';
  end if;

  if exists (select 1 from information_schema.columns where table_schema='public' and table_name='lessons' and column_name='order_index') then
    cols := cols || 'order_index';
    vals := vals || '22';
  end if;

  if exists (select 1 from information_schema.columns where table_schema='public' and table_name='lessons' and column_name='v2_key') then
    cols := cols || 'v2_key';
    vals := vals || quote_literal('lesson22');
  end if;

  if exists (select 1 from information_schema.columns where table_schema='public' and table_name='lessons' and column_name='lesson_key') then
    cols := cols || 'lesson_key';
    vals := vals || quote_literal('lesson22');
  end if;

  if exists (select 1 from information_schema.columns where table_schema='public' and table_name='lessons' and column_name='route') then
    cols := cols || 'route';
    vals := vals || quote_literal('/lesson-v2/lesson22');
  end if;

  if exists (select 1 from information_schema.columns where table_schema='public' and table_name='lessons' and column_name='path') then
    cols := cols || 'path';
    vals := vals || quote_literal('/lesson-v2/lesson22');
  end if;

  if exists (select 1 from information_schema.columns where table_schema='public' and table_name='lessons' and column_name='thumbnail') then
    cols := cols || 'thumbnail';
    vals := vals || quote_literal('/lessons/v2/lesson22-food/s1.webp');
  end if;

  if exists (select 1 from information_schema.columns where table_schema='public' and table_name='lessons' and column_name='image') then
    cols := cols || 'image';
    vals := vals || quote_literal('/lessons/v2/lesson22-food/s1.webp');
  end if;

  if exists (select 1 from information_schema.columns where table_schema='public' and table_name='lessons' and column_name='image_url') then
    cols := cols || 'image_url';
    vals := vals || quote_literal('/lessons/v2/lesson22-food/s1.webp');
  end if;

  if exists (select 1 from information_schema.columns where table_schema='public' and table_name='lessons' and column_name='is_active') then
    cols := cols || 'is_active';
    vals := vals || 'true';
  end if;

  if exists (select 1 from information_schema.columns where table_schema='public' and table_name='lessons' and column_name='active') then
    cols := cols || 'active';
    vals := vals || 'true';
  end if;

  if exists (select 1 from information_schema.columns where table_schema='public' and table_name='lessons' and column_name='published') then
    cols := cols || 'published';
    vals := vals || 'true';
  end if;

  if exists (select 1 from information_schema.columns where table_schema='public' and table_name='lessons' and column_name='created_at') then
    cols := cols || 'created_at';
    vals := vals || 'now()';
  end if;

  if exists (select 1 from information_schema.columns where table_schema='public' and table_name='lessons' and column_name='updated_at') then
    cols := cols || 'updated_at';
    vals := vals || 'now()';
  end if;

  sql := 'insert into public.lessons (' || array_to_string(cols, ', ') || ') values (' || array_to_string(vals, ', ') || ')';
  raise notice 'Executing: %', sql;
  execute sql;
end $$;

-- 5) التحقق النهائي
select *
from public.lessons
where
  id::text = '22'
  or title_ar = 'صِحَّتِي فِي غِذَائِي'
  or title = 'صِحَّتِي فِي غِذَائِي'
  or v2_key = 'lesson22'
  or lesson_key = 'lesson22'
order by 1 desc;
