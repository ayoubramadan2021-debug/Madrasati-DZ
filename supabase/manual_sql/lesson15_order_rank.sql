DO $$
DECLARE
  data jsonb;
BEGIN
  SELECT to_jsonb(l)
  INTO data
  FROM public.lessons l
  WHERE l.id = '11111111-1111-1111-1111-000000000014';

  IF data IS NULL THEN
    RAISE EXCEPTION 'Lesson 14 row not found. Cannot clone lesson 15.';
  END IF;

  data := jsonb_set(data, '{id}', to_jsonb('11111111-1111-1111-1111-000000000015'::text), true);

  IF data ? 'title_ar' THEN
    data := jsonb_set(data, '{title_ar}', to_jsonb('أُعَيِّنُ الرُّتْبَةَ بِالعَدَدِ'::text), true);
  END IF;

  IF data ? 'title_fr' THEN
    data := jsonb_set(data, '{title_fr}', to_jsonb('J’indique le rang avec le nombre'::text), true);
  END IF;

  IF data ? 'title' THEN
    data := jsonb_set(data, '{title}', to_jsonb('أُعَيِّنُ الرُّتْبَةَ بِالعَدَدِ'::text), true);
  END IF;

  IF data ? 'name' THEN
    data := jsonb_set(data, '{name}', to_jsonb('أُعَيِّنُ الرُّتْبَةَ بِالعَدَدِ'::text), true);
  END IF;

  IF data ? 'slug' THEN
    data := jsonb_set(data, '{slug}', to_jsonb('lesson15-order-rank'::text), true);
  END IF;

  IF data ? 'sort_order' THEN
    data := jsonb_set(data, '{sort_order}', to_jsonb(15), true);
  END IF;

  IF data ? 'order' THEN
    data := jsonb_set(data, '{order}', to_jsonb(15), true);
  END IF;

  IF data ? 'lesson_key' THEN
    data := jsonb_set(data, '{lesson_key}', to_jsonb('lesson15'::text), true);
  END IF;

  IF data ? 'template_version' THEN
    data := jsonb_set(data, '{template_version}', to_jsonb(2), true);
  END IF;

  IF data ? 'updated_at' THEN
    data := jsonb_set(data, '{updated_at}', to_jsonb(now()::text), true);
  END IF;

  IF data ? 'created_at' THEN
    data := jsonb_set(data, '{created_at}', to_jsonb(now()::text), true);
  END IF;

  DELETE FROM public.lessons
  WHERE id = '11111111-1111-1111-1111-000000000015';

  INSERT INTO public.lessons
  SELECT (jsonb_populate_record(NULL::public.lessons, data)).*;

  RAISE NOTICE 'Lesson 15 inserted/updated successfully.';
END $$;
