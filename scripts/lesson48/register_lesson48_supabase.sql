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
    content = v_content,
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
