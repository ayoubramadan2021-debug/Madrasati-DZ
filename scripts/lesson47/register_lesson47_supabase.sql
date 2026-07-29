begin;

with lesson47_data as (
  select jsonb_build_array(
    jsonb_build_object(
      'scene', 1,
      'key', 's1_intro',
      'speaker', 'taline',
      'image', '/lessons/v2/lesson47-grid-navigation/s1.webp',
      'text', 'مَرْحَبًا أَحِبَّائِي! اليَوْمَ سَنَتَعَلَّمُ كَيْفَ نَتَنَقَّلُ عَلَى مَرْصُوفَةٍ، خَانَةً بَعْدَ خَانَةٍ، حَتَّى نَصِلَ إِلَى الهَدَفِ.'
    ),
    jsonb_build_object(
      'scene', 2,
      'key', 's2_right_left',
      'speaker', 'taline',
      'image', '/lessons/v2/lesson47-grid-navigation/s2.webp',
      'text', 'عِنْدَمَا نَتَحَرَّكُ فِي السَّطْرِ، نَذْهَبُ يَمِينًا أَوْ يَسَارًا. كُلُّ سَهْمٍ يَنْقُلُنَا خَانَةً وَاحِدَةً.'
    ),
    jsonb_build_object(
      'scene', 3,
      'key', 's3_up_down',
      'speaker', 'taline',
      'image', '/lessons/v2/lesson47-grid-navigation/s3.webp',
      'text', 'عِنْدَمَا نَتَحَرَّكُ فِي العَمُودِ، نَصْعَدُ إِلَى الأَعْلَى أَوْ نَنْزِلُ إِلَى الأَسْفَلِ، خَانَةً وَاحِدَةً فِي كُلِّ مَرَّةٍ.'
    ),
    jsonb_build_object(
      'scene', 4,
      'key', 's4_follow_arrows',
      'speaker', 'taline',
      'image', '/lessons/v2/lesson47-grid-navigation/s4.webp',
      'text', 'نَبْدَأُ مِنَ النُّقْطَةِ الحَمْرَاءِ، وَنَتَّبِعُ الأَسْهُمَ بِالتَّرْتِيبِ. لَا نَقْفِزُ خَانَةً، وَلَا نَتَحَرَّكُ بِشَكْلٍ مَائِلٍ.'
    ),
    jsonb_build_object(
      'scene', 5,
      'key', 's5_encode_route',
      'speaker', 'taline',
      'image', '/lessons/v2/lesson47-grid-navigation/s5.webp',
      'text', 'لِنُمَثِّلَ المَسْلَكَ، نَنْظُرُ إِلَى كُلِّ خُطْوَةٍ، ثُمَّ نَضَعُ سَهْمًا يُبَيِّنُ اتِّجَاهَهَا: يَمِينًا، يَسَارًا، إِلَى الأَعْلَى، أَوْ إِلَى الأَسْفَلِ.'
    ),
    jsonb_build_object(
      'scene', 6,
      'key', 's6_closing',
      'speaker', 'taline',
      'image', '/lessons/v2/lesson47-grid-navigation/s6.webp',
      'text', 'أَحْسَنْتُمْ! نَسْتَطِيعُ الآنَ قِرَاءَةَ مَسْلَكٍ بِالأَسْهُمِ، وَتَمْثِيلَ مَسْلَكٍ آخَرَ، وَالوُصُولَ إِلَى الهَدَفِ بِدِقَّةٍ.'
    )
  ) as scenes
)
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
select
  gen_random_uuid(),
  'التَّنَقُّلُ عَلَى مَرْصُوفَةٍ',
  'Se déplacer sur un quadrillage',
  'math',
  1,
  jsonb_build_object(
    'slides', scenes,
    'audio_base', '/audio/teachers/taline/lesson_47_grid_navigation'
  )::text,
  now(),
  '5daed3bb-7e62-4a5a-93a1-f6dec60df810',
  15,
  'lesson_v2',
  scenes,
  2,
  jsonb_build_array(
    'تحديد نقطة الانطلاق ونقطة الوصول على المرصوفة.',
    'التنقل يمينًا ويسارًا داخل السطر.',
    'التنقل إلى الأعلى والأسفل داخل العمود.',
    'تنفيذ سلسلة أسهم بالترتيب.',
    'تمثيل مسلك مرسوم باستعمال الأسهم.',
    'الوصول إلى الهدف بدقة.'
  ),
  180
from lesson47_data
where not exists (
  select 1
  from public.lessons
  where world_id = '5daed3bb-7e62-4a5a-93a1-f6dec60df810'
    and sort_order = 15
);

commit;

select
  id,
  title,
  title_fr,
  world_id,
  sort_order,
  lesson_type,
  jsonb_array_length(scenes) as scenes_count,
  jsonb_array_length(objectives) as objectives_count,
  estimated_duration_seconds
from public.lessons
where world_id = '5daed3bb-7e62-4a5a-93a1-f6dec60df810'
  and sort_order = 15;
