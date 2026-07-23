BEGIN;

-- الدروس الثلاثة الأولى في عالم الألعاب والترفيه.
-- تبقى غير منشورة إلى غاية إنهاء الاختبار.

DELETE FROM public.lessons
WHERE "lesson_number" IN (33, 34, 35)
  AND "world_id" = '5daed3bb-7e62-4a5a-93a1-f6dec60df810';

INSERT INTO public.lessons (
  "title",
  "subject",
  "grade",
  "content",
  "world_id",
  "title_fr",
  "sort_order",
  "lesson_type",
  "scenes",
  "template_version",
  "objectives",
  "estimated_duration_seconds",
  "lesson_number",
  "is_published"
)
VALUES (
  'أقارن أطوال أشياء عالم المرح',
  'math',
  1,
  '{"audio_base":"/audio/teachers/taline/lesson_33_amusement_lengths","slides":[{"scene_image":"/lessons/v2/lesson33-amusement-lengths/s1.webp","audio_key":"lesson33_s1","text":"دَخَلْنَا رُكْنَ الأَطْوَالِ. أَمَامَنَا أَشْرِطَةٌ قَصِيرَةٌ وَطَوِيلَةٌ. لِنُلَاحِظْهَا جَيِّدًا."},{"scene_image":"/lessons/v2/lesson33-amusement-lengths/s2.webp","audio_key":"lesson33_s2","text":"هَذَا الشَّرِيطُ قَصِيرٌ، وَهَذَا الشَّرِيطُ أَطْوَلُ مِنْهُ. نُقَارِنُ بَيْنَهُمَا بِدِقَّةٍ."},{"scene_image":"/lessons/v2/lesson33-amusement-lengths/s3.webp","audio_key":"lesson33_s3","text":"لِنَقِسِ الطُّولَ بِوَحَدَاتٍ مُتَسَاوِيَةٍ. نَضَعُهَا مُتَجَاوِرَةً مِنَ الْبِدَايَةِ إِلَى النِّهَايَةِ."},{"scene_image":"/lessons/v2/lesson33-amusement-lengths/s4.webp","audio_key":"lesson33_s4","text":"يَقِيسُ كُلُّ طِفْلٍ شَرِيطًا بِالْوَحْدَةِ نَفْسِهَا، ثُمَّ نَعُدُّ الْوَحَدَاتِ."},{"scene_image":"/lessons/v2/lesson33-amusement-lengths/s5.webp","audio_key":"lesson33_s5","text":"نُرَتِّبُ الأَشْرِطَةَ مِنَ الأَقْصَرِ إِلَى الأَطْوَلِ: الأَخْضَرُ، ثُمَّ الأَصْفَرُ، ثُمَّ الْبَنَفْسَجِيُّ."},{"scene_image":"/lessons/v2/lesson33-amusement-lengths/s6.webp","audio_key":"lesson33_s6","text":"أَحْسَنْتُمْ! قَارَنَّا الأَطْوَالَ، وَقِسْنَاهَا بِوَحَدَاتٍ مُتَسَاوِيَةٍ، وَرَتَّبْنَاهَا بِشَكْلٍ صَحِيحٍ."}]}'::jsonb,
  '5daed3bb-7e62-4a5a-93a1-f6dec60df810',
  'Je compare les longueurs du monde des jeux',
  1,
  'lesson_v2',
  '[]'::jsonb,
  2,
  '[]'::jsonb,
  360,
  33,
  FALSE
);

INSERT INTO public.lessons (
  "title",
  "subject",
  "grade",
  "content",
  "world_id",
  "title_fr",
  "sort_order",
  "lesson_type",
  "scenes",
  "template_version",
  "objectives",
  "estimated_duration_seconds",
  "lesson_number",
  "is_published"
)
VALUES (
  'مسالك عالم الألعاب والترفيه',
  'math',
  1,
  '{"audio_base":"/audio/teachers/khalil/lesson_34_amusement_paths","slides":[{"scene_image":"/lessons/v2/lesson34-amusement-paths/s7.webp","audio_key":"lesson34_s7","text":"وَصَلْنَا إِلَى مَنْطِقَةِ الْمَسَالِكِ. سَنَتَعَلَّمُ كَيْفَ نَتَحَرَّكُ فِي الطَّرِيقِ بِتَرْتِيبٍ وَأَمَانٍ."},{"scene_image":"/lessons/v2/lesson34-amusement-paths/s8.webp","audio_key":"lesson34_s8","text":"نَمُرُّ بَيْنَ الْمَخْرُوطَيْنِ، وَدَاخِلَ الْحَلْقَةِ، وَتَحْتَ الْقَوْسِ، وَفَوْقَ الْجِسْرِ."},{"scene_image":"/lessons/v2/lesson34-amusement-paths/s9.webp","audio_key":"lesson34_s9","text":"يُطَبِّقُ الأَطْفَالُ الْمَسْلَكَ بِهُدُوءٍ: بَيْنَ الْحَوَاجِزِ، وَدَاخِلَ الْحَلْقَةِ، وَتَحْتَ الْقَوْسِ."},{"scene_image":"/lessons/v2/lesson34-amusement-paths/s10.webp","audio_key":"lesson34_s10","text":"نَبْدَأُ مِنَ النُّقْطَةِ الأُولَى، ثُمَّ نَتَّبِعُ أَجْزَاءَ الْمَسَارِ وَاحِدًا بَعْدَ الآخَرِ."},{"scene_image":"/lessons/v2/lesson34-amusement-paths/s11.webp","audio_key":"lesson34_s11","text":"نُوَجِّهُ الْفَأْرَ فَوْقَ الْكُرْسِيِّ، وَعَبْرَ الطَّاوِلَةِ، وَبَيْنَ الأَدَوَاتِ، ثُمَّ تَحْتَ الْمَقْعَدِ."},{"scene_image":"/lessons/v2/lesson34-amusement-paths/s12.webp","audio_key":"lesson34_s12","text":"أَحْسَنْتُمْ! فَهِمْنَا الْمَسَارَ، وَاتَّبَعْنَا التَّرْتِيبَ، وَاسْتَعْمَلْنَا: بَيْنَ، وَدَاخِلَ، وَتَحْتَ، وَفَوْقَ."}]}'::jsonb,
  '5daed3bb-7e62-4a5a-93a1-f6dec60df810',
  'Les parcours du monde des jeux',
  2,
  'lesson_v2',
  '[]'::jsonb,
  2,
  '[]'::jsonb,
  360,
  34,
  FALSE
);

INSERT INTO public.lessons (
  "title",
  "subject",
  "grade",
  "content",
  "world_id",
  "title_fr",
  "sort_order",
  "lesson_type",
  "scenes",
  "template_version",
  "objectives",
  "estimated_duration_seconds",
  "lesson_number",
  "is_published"
)
VALUES (
  'أتنفس جيدًا في عالم المرح',
  'math',
  1,
  '{"audio_base":"/audio/teachers/taline/lesson_35_amusement_breathing","slides":[{"scene_image":"/lessons/v2/lesson35-amusement-breathing/s13.webp","audio_key":"lesson35_s13","text":"بَعْدَ اللَّعِبِ نَسْتَرِيحُ فِي مَكَانٍ هَادِئٍ، وَنَتَنَفَّسُ هَوَاءً نَقِيًّا بِهُدُوءٍ."},{"scene_image":"/lessons/v2/lesson35-amusement-breathing/s14.webp","audio_key":"lesson35_s14","text":"نَضَعُ يَدًا عَلَى الصَّدْرِ، وَيَدًا عَلَى الْبَطْنِ، وَنَتَنَفَّسُ بِبُطْءٍ وَانْتِظَامٍ."},{"scene_image":"/lessons/v2/lesson35-amusement-breathing/s15.webp","audio_key":"lesson35_s15","text":"نَخْتَارُ الْهَوَاءَ النَّقِيَّ، وَنَبْتَعِدُ عَنِ الدُّخَانِ وَالْغُبَارِ وَمَصَادِرِ التَّلَوُّثِ."},{"scene_image":"/lessons/v2/lesson35-amusement-breathing/s16.webp","audio_key":"lesson35_s16","text":"نُفَكِّرُ فِي الصُّوَرِ: أَيُّ الْمَوَاقِفِ آمِنٌ لِلتَّنَفُّسِ، وَأَيُّهَا يَجِبُ أَنْ نَبْتَعِدَ عَنْهُ؟"},{"scene_image":"/lessons/v2/lesson35-amusement-breathing/s17.webp","audio_key":"lesson35_s17","text":"نَتَنَفَّسُ فِي الْهَوَاءِ الطَّلْقِ، وَنَسْتَرِيحُ عِنْدَ الْحَاجَةِ، وَنَشْرَبُ الْمَاءَ."},{"scene_image":"/lessons/v2/lesson35-amusement-breathing/s18.webp","audio_key":"lesson35_s18","text":"أَحْسَنْتُمْ! التَّنَفُّسُ ضَرُورِيٌّ لِلْجِسْمِ، وَالْهَوَاءُ النَّقِيُّ يُسَاعِدُنَا عَلَى الصِّحَّةِ وَالنَّشَاطِ."}]}'::jsonb,
  '5daed3bb-7e62-4a5a-93a1-f6dec60df810',
  'Je respire bien dans le monde des jeux',
  3,
  'lesson_v2',
  '[]'::jsonb,
  2,
  '[]'::jsonb,
  360,
  35,
  FALSE
);

COMMIT;

SELECT *
FROM public.lessons
WHERE "world_id" = '5daed3bb-7e62-4a5a-93a1-f6dec60df810'
ORDER BY "sort_order";
