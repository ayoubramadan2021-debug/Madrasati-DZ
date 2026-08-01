begin;

insert into public.lessons (
  world_id,
  title,
  title_fr,
  sort_order,
  content,
  scenes
)
values (
  '5daed3bb-7e62-4a5a-93a1-f6dec60df810',
  'الْحَصِيلَةُ 2 — أَخْتَارُ مَكَانًا صِحِّيًّا وَأُرَاقِبُ جِسْمِي بَعْدَ الْجُهْدِ',
  'Bilan 2 — Je choisis un lieu sain et j’observe mon corps après l’effort',
  20,
  jsonb_build_object(
    'lessonKey', 'lesson52',
    'lessonNumber', 52,
    'teacher', 'khalil',
    'voice', 'ar-DZ-IsmaelNeural',
    'audio_base',
      '/audio/teachers/khalil/lesson_52_bilan_2',
    'exercisePath',
      '/lesson-v2/52/exercises',
    'isWorldFinalLesson', true
  )::text,
  jsonb_build_array(
    jsonb_build_object(
      'key', 'lesson52_s1',
      'image',
        '/lessons/v2/lesson52/s1.webp'
    ),
    jsonb_build_object(
      'key', 'lesson52_s2',
      'image',
        '/lessons/v2/lesson52/s2.webp'
    ),
    jsonb_build_object(
      'key', 'lesson52_s3',
      'image',
        '/lessons/v2/lesson52/s3.webp'
    ),
    jsonb_build_object(
      'key', 'lesson52_s4',
      'image',
        '/lessons/v2/lesson52/s4.webp'
    ),
    jsonb_build_object(
      'key', 'lesson52_s5',
      'image',
        '/lessons/v2/lesson52/s5.webp'
    ),
    jsonb_build_object(
      'key', 'lesson52_s6',
      'image',
        '/lessons/v2/lesson52/s6.webp'
    )
  )
)
on conflict do nothing;

commit;
