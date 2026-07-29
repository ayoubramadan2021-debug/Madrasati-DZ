-- تسجيل الدرسين 48 و49 في عالم الألعاب والترفيه
-- شغّل الملف كاملًا داخل Supabase SQL Editor.

begin;

do $lesson48$
declare
  v_world_id uuid :=
    '5daed3bb-7e62-4a5a-93a1-f6dec60df810';

  v_sort_order integer := 16;

  v_title text :=
    'الأَعْدَادُ إِلَى 39 (1)';

  v_scenes jsonb;
  v_objectives jsonb;
  v_content text;
  v_existing_title text;

begin
  v_scenes := jsonb_build_array(
    jsonb_build_object(
      'scene', 1,
      'key', 's1_intro',
      'audio_key', 's1_intro',
      'speaker', 'khalil',

      'image',
      '/lessons/v2/lesson48-numbers-to-39/s1.webp',

      'scene_image',
      '/lessons/v2/lesson48-numbers-to-39/s1.webp',

      'text',
      'مَرْحَبًا أَحِبَّائِي! سَنَكْتَشِفُ اليَوْمَ الأَعْدَادَ مِنْ عِشْرِينَ إِلَى تِسْعَةٍ وَثَلَاثِينَ، وَسَنَتَعَلَّمُ كَيْفَ نَقْرَؤُهَا وَنَكْتُبُهَا.'
    ),

    jsonb_build_object(
      'scene', 2,
      'key', 's2_tens_ones',
      'audio_key', 's2_tens_ones',
      'speaker', 'khalil',

      'image',
      '/lessons/v2/lesson48-numbers-to-39/s2.webp',

      'scene_image',
      '/lessons/v2/lesson48-numbers-to-39/s2.webp',

      'text',
      'يَتَكَوَّنُ العَدَدُ مِنْ عَشَرَاتٍ وَوَحَدَاتٍ. فَاثْنَانِ وَعِشْرُونَ فِيهِ عَشَرَتَانِ وَوَحْدَتَانِ، وَثَمَانِيَةٌ وَعِشْرُونَ فِيهِ عَشَرَتَانِ وَثَمَانِي وَحَدَاتٍ.'
    ),

    jsonb_build_object(
      'scene', 3,
      'key', 's3_read_numbers',
      'audio_key', 's3_read_numbers',
      'speaker', 'khalil',

      'image',
      '/lessons/v2/lesson48-numbers-to-39/s3.webp',

      'scene_image',
      '/lessons/v2/lesson48-numbers-to-39/s3.webp',

      'text',
      'نَقْرَأُ الأَعْدَادَ بِالنَّظَرِ إِلَى العَشَرَاتِ وَالوَحَدَاتِ: اثْنَانِ وَعِشْرُونَ، ثَمَانِيَةٌ وَعِشْرُونَ، ثَلَاثَةٌ وَثَلَاثُونَ، وَسَبْعَةٌ وَثَلَاثُونَ.'
    ),

    jsonb_build_object(
      'scene', 4,
      'key', 's4_match_number_name',
      'audio_key', 's4_match_number_name',
      'speaker', 'khalil',

      'image',
      '/lessons/v2/lesson48-numbers-to-39/s4.webp',

      'scene_image',
      '/lessons/v2/lesson48-numbers-to-39/s4.webp',

      'text',
      'نُطَابِقُ كُلَّ عَدَدٍ مَعَ كِتَابَتِهِ بِالحُرُوفِ. فَبِطَاقَةُ أَرْبَعَةٍ وَثَلَاثِينَ تُطَابِقُ العَدَدَ أَرْبَعَةً وَثَلَاثِينَ، وَبِطَاقَةُ ثَمَانِيَةٍ وَعِشْرِينَ تُطَابِقُ العَدَدَ ثَمَانِيَةً وَعِشْرِينَ.'
    ),

    jsonb_build_object(
      'scene', 5,
      'key', 's5_number_sequence',
      'audio_key', 's5_number_sequence',
      'speaker', 'khalil',

      'image',
      '/lessons/v2/lesson48-numbers-to-39/s5.webp',

      'scene_image',
      '/lessons/v2/lesson48-numbers-to-39/s5.webp',

      'text',
      'نُكْمِلُ الأَعْدَادَ بِالتَّرْتِيبِ. بَعْدَ سَبْعَةٍ وَعِشْرِينَ يَأْتِي ثَمَانِيَةٌ وَعِشْرُونَ، ثُمَّ تِسْعَةٌ وَعِشْرُونَ، ثُمَّ ثَلَاثُونَ، ثُمَّ وَاحِدٌ وَثَلَاثُونَ.'
    ),

    jsonb_build_object(
      'scene', 6,
      'key', 's6_closing',
      'audio_key', 's6_closing',
      'speaker', 'khalil',

      'image',
      '/lessons/v2/lesson48-numbers-to-39/s6.webp',

      'scene_image',
      '/lessons/v2/lesson48-numbers-to-39/s6.webp',

      'text',
      'أَحْسَنْتُمْ! نَسْتَطِيعُ الآنَ قِرَاءَةَ الأَعْدَادِ إِلَى تِسْعَةٍ وَثَلَاثِينَ، وَكِتَابَتَهَا، وَتَفْكِيكَهَا إِلَى عَشَرَاتٍ وَوَحَدَاتٍ، وَإِكْمَالَ تَرْتِيبِهَا.',

      'is_closing', true,
      'cta_text', 'هَيَّا نَتَدَرَّبْ'
    )
  );

  v_objectives := jsonb_build_array(
    'قراءة الأعداد من 20 إلى 39.',
    'التعرف على العشرات والوحدات.',
    'مطابقة العدد مع كتابته بالحروف.',
    'تفكيك العدد إلى عشرات ووحدات.',
    'إكمال متتالية عددية تصاعدية.'
  );

  v_content := jsonb_build_object(
    'slides', v_scenes,

    'audio_base',
    '/audio/teachers/khalil/lesson_48_numbers_to_39',

    'route',
    '/lesson-v2/lesson48',

    'exercisePath',
    '/lesson-v2/lesson48/exercises'
  )::text;

  select title
  into v_existing_title
  from public.lessons
  where world_id = v_world_id
    and sort_order = v_sort_order
  limit 1;

  if v_existing_title is not null
     and v_existing_title <> v_title
  then
    raise exception
      'sort_order 16 مستخدم من درس آخر: %',
      v_existing_title;
  end if;

  update public.lessons
  set
    title = v_title,
    title_fr = 'Les nombres jusqu’à 39 (1)',
    subject = 'math',
    grade = 1,
    content = v_content::text,
    world_id = v_world_id,
    sort_order = v_sort_order,
    lesson_type = 'lesson_v2',
    scenes = v_scenes,
    template_version = 2,
    objectives = v_objectives,
    estimated_duration_seconds = 180

  where world_id = v_world_id
    and sort_order = v_sort_order;

  if not found then
    insert into public.lessons (
      id,
      title,
      title_fr,
      subject,
      grade,
      content,
      created_at,
      world_id,
      sort_order,
      lesson_type,
      scenes,
      template_version,
      objectives,
      estimated_duration_seconds
    )
    values (
      gen_random_uuid(),
      v_title,
      'Les nombres jusqu’à 39 (1)',
      'math',
      1,
      v_content,
      now(),
      v_world_id,
      v_sort_order,
      'lesson_v2',
      v_scenes,
      2,
      v_objectives,
      180
    );
  end if;
end;
$lesson48$;

commit;

select
  id,
  title,
  title_fr,
  world_id,
  sort_order,
  lesson_type,
  template_version,

  jsonb_array_length(scenes)
    as scenes_count,

  scenes -> 5 ->> 'is_closing'
    as final_scene_is_closing,

  scenes -> 5 ->> 'cta_text'
    as final_scene_button,

  content::jsonb ->> 'audio_base'
    as audio_base,

  content::jsonb ->> 'route'
    as lesson_route,

  content::jsonb ->> 'exercisePath'
    as exercise_route

from public.lessons

where world_id =
  '5daed3bb-7e62-4a5a-93a1-f6dec60df810'

and sort_order = 16;

-- ============================================================
-- LESSON 49 — عالم الألعاب والترفيه
-- يتم تشغيل هذا القسم بعد تسجيل الدرس 48 أعلاه.
-- ============================================================

DO $lesson49$
DECLARE
  v_world_id uuid :=
    '5daed3bb-7e62-4a5a-93a1-f6dec60df810';

  v_title text :=
    'مَصَادِرُ الْأَغْذِيَةِ وَالْوَجْبَةُ الصِّحِّيَّةُ';

  v_title_fr text :=
    'L’origine des aliments et le repas équilibré';

  v_audio_base text :=
    '/audio/teachers/taline/lesson_49_food_sources';

  v_lesson48 public.lessons%ROWTYPE;
  v_existing49 public.lessons%ROWTYPE;
  v_lesson49 public.lessons%ROWTYPE;

  v_has_existing49 boolean := false;
  v_payload jsonb;

  v_scenes jsonb :=
    $slides$[
  {
    "scene": 1,
    "key": "s1_intro",
    "audio_key": "s1_intro",
    "speaker": "taline",
    "image": "/lessons/v2/lesson49-food-sources/s1.webp",
    "scene_image": "/lessons/v2/lesson49-food-sources/s1.webp",
    "text": "حَانَ وَقْتُ الْغَدَاءِ. شَاهَدَ الْأَطْفَالُ أَغْذِيَةً مُتَنَوِّعَةً. فَمِنْ أَيْنَ تَأْتِي؟"
  },
  {
    "scene": 2,
    "key": "s2_animal_origin",
    "audio_key": "s2_animal_origin",
    "speaker": "taline",
    "image": "/lessons/v2/lesson49-food-sources/s2.webp",
    "scene_image": "/lessons/v2/lesson49-food-sources/s2.webp",
    "text": "الْحَلِيبُ وَالْبَيْضُ وَالسَّمَكُ أَغْذِيَةٌ حَيَوَانِيَّةٌ. نَحْصُلُ عَلَيْهَا مِنَ الْحَيَوَانَاتِ."
  },
  {
    "scene": 3,
    "key": "s3_plant_origin",
    "audio_key": "s3_plant_origin",
    "speaker": "taline",
    "image": "/lessons/v2/lesson49-food-sources/s3.webp",
    "scene_image": "/lessons/v2/lesson49-food-sources/s3.webp",
    "text": "الْخُبْزُ وَالْفَوَاكِهُ وَالْخُضْرَوَاتُ أَغْذِيَةٌ نَبَاتِيَّةٌ. نَحْصُلُ عَلَيْهَا مِنَ النَّبَاتَاتِ."
  },
  {
    "scene": 4,
    "key": "s4_classify_foods",
    "audio_key": "s4_classify_foods",
    "speaker": "taline",
    "image": "/lessons/v2/lesson49-food-sources/s4.webp",
    "scene_image": "/lessons/v2/lesson49-food-sources/s4.webp",
    "text": "نُصَنِّفُ الْغِذَاءَ حَسَبَ مَصْدَرِهِ. التُّفَّاحُ نَبَاتِيٌّ، وَالْحَلِيبُ حَيَوَانِيٌّ."
  },
  {
    "scene": 5,
    "key": "s5_healthy_meal",
    "audio_key": "s5_healthy_meal",
    "speaker": "taline",
    "image": "/lessons/v2/lesson49-food-sources/s5.webp",
    "scene_image": "/lessons/v2/lesson49-food-sources/s5.webp",
    "text": "الْوَجْبَةُ الصِّحِّيَّةُ مُتَنَوِّعَةٌ. نَخْتَارُ خُضْرَوَاتٍ وَخُبْزًا وَسَمَكًا وَفَاكِهَةً وَمَاءً."
  },
  {
    "scene": 6,
    "key": "s6_closing",
    "audio_key": "s6_closing",
    "speaker": "taline",
    "image": "/lessons/v2/lesson49-food-sources/s6.webp",
    "scene_image": "/lessons/v2/lesson49-food-sources/s6.webp",
    "text": "أَحْسَنْتُمْ! عَرَفْنَا أَنَّ لِلْأَغْذِيَةِ مَصْدَرًا نَبَاتِيًّا أَوْ مَصْدَرًا حَيَوَانِيًّا، وَأَنَّ الْوَجْبَةَ الصِّحِّيَّةَ مُتَنَوِّعَةٌ وَمُتَوَازِنَةٌ.",
    "is_closing": true,
    "cta_text": "هَيَّا نَتَدَرَّبُ"
  }
]$slides$::jsonb;

  v_objectives jsonb :=
    $objectives$[
  "أَنْ يُمَيِّزَ الْمُتَعَلِّمُ بَيْنَ الْمَصْدَرِ النَّبَاتِيِّ وَالْمَصْدَرِ الْحَيَوَانِيِّ.",
  "أَنْ يُصَنِّفَ الْأَغْذِيَةَ حَسَبَ مَصْدَرِهَا.",
  "أَنْ يَتَعَرَّفَ مَكَوِّنَاتِ الْوَجْبَةِ الصِّحِّيَّةِ.",
  "أَنْ يَخْتَارَ وَجْبَةً مُتَنَوِّعَةً وَمُتَوَازِنَةً.",
  "أَنْ يُقَلِّلَ مِنَ الْحَلْوَيَاتِ وَالْمَشْرُوبَاتِ السُّكَّرِيَّةِ."
]$objectives$::jsonb;

  v_content jsonb;
BEGIN
  -- ربط الدرس 48 بالدرس 49 داخل بيانات Supabase.
  UPDATE public.lessons
  SET content =
    (COALESCE(NULLIF(content, ''), '{}')::jsonb
    || jsonb_build_object(
      'nextLessonKey', 'lesson49',
      'nextLessonPath', '/world2-lesson/49',
      'exercisePath', '/lesson-v2/48/exercises'
    ))::text
  WHERE world_id = v_world_id
    AND sort_order = 16;

  IF NOT FOUND THEN
    RAISE EXCEPTION
      'الدرس 48 غير موجود في عالم الألعاب والترفيه.';
  END IF;

  SELECT *
  INTO v_lesson48
  FROM public.lessons
  WHERE world_id = v_world_id
    AND sort_order = 16
  LIMIT 1;

  v_content := jsonb_build_object(
    'text',
      'التَّعَرُّفُ عَلَى مَصَادِرِ الْأَغْذِيَةِ وَاخْتِيَارُ وَجْبَةٍ صِحِّيَّةٍ مُتَوَازِنَةٍ.',

    'slides', v_scenes,
    'objectives', v_objectives,

    'audio_base', v_audio_base,
    'audioBase', v_audio_base,

    'route', '/world2-lesson/49',
    'exercisePath', '/lesson-v2/49/exercises',

    'nextLessonKey', 'lesson50',
    'nextLessonPath', '/world2-lesson/50'
  );

  -- نتحقق أولًا من المكان 17.
  SELECT *
  INTO v_existing49
  FROM public.lessons
  WHERE world_id = v_world_id
    AND sort_order = 17
  LIMIT 1;

  v_has_existing49 := FOUND;

  IF v_has_existing49 THEN
    IF
      v_existing49.title <> v_title
      AND COALESCE(
        v_existing49.(content::jsonb) ->> 'audio_base',
        ''
      ) <> v_audio_base
    THEN
      RAISE EXCEPTION
        'sort_order 17 مستعمل من درس آخر: %',
        v_existing49.title;
    END IF;
  ELSE
    -- البحث عن نسخة سابقة من الدرس 49 في ترتيب آخر.
    SELECT *
    INTO v_existing49
    FROM public.lessons
    WHERE world_id = v_world_id
      AND (
        title = v_title
        OR COALESCE(
          (content::jsonb) ->> 'audio_base',
          ''
        ) = v_audio_base
      )
    LIMIT 1;

    v_has_existing49 := FOUND;
  END IF;

  IF v_has_existing49 THEN
    UPDATE public.lessons
    SET
      title = v_title,
      sort_order = 17,
      content = v_content::text
    WHERE id = v_existing49.id;

    RAISE NOTICE
      'تم تحديث الدرس 49: %',
      v_existing49.id;
  ELSE
    -- نستعمل سجل الدرس 48 كقالب للحفاظ على
    -- جميع أعمدة الجدول الإلزامية الموجودة فعليًا.
    v_payload :=
      to_jsonb(v_lesson48)
      || jsonb_build_object(
        'id', gen_random_uuid(),

        'world_id', v_world_id,
        'sort_order', 17,
        'lesson_number', 49,

        'title', v_title,
        'title_ar', v_title,
        'title_fr', v_title_fr,
        'name', v_title,

        'subject', 'science',
        'teacher', 'taline',

        'audio_base', v_audio_base,
        'route', '/world2-lesson/49',
        'exercise_path', '/lesson-v2/49/exercises',

        'slug', 'lesson-49-food-sources',
        'key', 'lesson49',
        'lesson_key', 'lesson49',

        'lesson_type', 'lesson_v2',
        'template_version', 2,
        'duration', 180,

        'content', v_content::text,

        'created_at', now(),
        'updated_at', now()
      );

    v_lesson49 :=
      jsonb_populate_record(
        NULL::public.lessons,
        v_payload
      );

    INSERT INTO public.lessons
    SELECT (v_lesson49).*;

    RAISE NOTICE
      'تم إنشاء الدرس 49 في الترتيب 17.';
  END IF;
END
$lesson49$;

-- ============================================================
-- التحقق النهائي من الدرسين
-- ============================================================

SELECT
  id,
  world_id,
  sort_order,
  title,
  (content::jsonb) ->> 'route' AS route,
  (content::jsonb) ->> 'exercisePath' AS exercise_path,
  (content::jsonb) ->> 'nextLessonKey' AS next_lesson
FROM public.lessons
WHERE world_id =
  '5daed3bb-7e62-4a5a-93a1-f6dec60df810'
  AND sort_order IN (16, 17)
ORDER BY sort_order;
