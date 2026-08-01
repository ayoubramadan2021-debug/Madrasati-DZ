select jsonb_pretty(
  jsonb_build_object(
    'total_lessons', (select count(*) from public.lessons),
    'lesson47', (
      select to_jsonb(l)
      from public.lessons l
      where world_id = '5daed3bb-7e62-4a5a-93a1-f6dec60df810'
        and sort_order = 15
      limit 1
    )
  )
) as diagnostics;
