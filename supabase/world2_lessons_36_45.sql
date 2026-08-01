BEGIN;

-- دروس عالم الألعاب والترفيه من 36 إلى 45.
-- تبقى غير منشورة إلى غاية إنهاء الاختبار.

DELETE FROM public.lessons
WHERE "lesson_number" BETWEEN 36 AND 45
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
  'أُصَنِّفُ أَلْعَابَ الْمِهْرَجَانِ',
  'math',
  1,
  '{"audio_base":"/audio/teachers/khalil/lesson_36_amusement_sorting","slides":[{"scene_image":"/lessons/v2/lesson36/s1.webp","audio_key":"lesson36_s1","text":"وَصَلْنَا إِلَى رُكْنِ التَّصْنِيفِ، وَأَمَامَنَا أَلْعَابٌ وَأَشْكَالٌ مُلَوَّنَةٌ كَثِيرَةٌ."},{"scene_image":"/lessons/v2/lesson36/s2.webp","audio_key":"lesson36_s2","text":"نَجْمَعُ النُّجُومَ الَّتِي لَهَا اللَّوْنُ نَفْسُهُ، وَنَضَعُهَا فِي مَجْمُوعَةٍ وَاحِدَةٍ."},{"scene_image":"/lessons/v2/lesson36/s3.webp","audio_key":"lesson36_s3","text":"نُصَنِّفُ الْبَالُونَاتِ حَسَبَ أَلْوَانِهَا، وَنَعُدُّ عَنَاصِرَ كُلِّ مَجْمُوعَةٍ."},{"scene_image":"/lessons/v2/lesson36/s4.webp","audio_key":"lesson36_s4","text":"نَجْمَعُ الْأَشْيَاءَ الْمُتَشَابِهَةَ فِي الشَّكْلِ، وَنُبْعِدُ الْأَشْيَاءَ الْمُخْتَلِفَةَ."},{"scene_image":"/lessons/v2/lesson36/s5.webp","audio_key":"lesson36_s5","text":"نُرَتِّبُ الْقِطَعَ الْمُلَوَّنَةَ فِي صُفُوفٍ وَمَجْمُوعَاتٍ مُنَظَّمَةٍ."},{"scene_image":"/lessons/v2/lesson36/s6.webp","audio_key":"lesson36_s6","text":"أَحْسَنْتُمْ! التَّصْنِيفُ هُوَ جَمْعُ الْأَشْيَاءِ الْمُتَشَابِهَةِ حَسَبَ صِفَةٍ مُحَدَّدَةٍ."}]}'::jsonb,
  '5daed3bb-7e62-4a5a-93a1-f6dec60df810',
  'World 2 lesson 36',
  4,
  'lesson_v2',
  '[]'::jsonb,
  2,
  '[]'::jsonb,
  360,
  36,
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
  'أَقْرَأُ لَوْحَةَ الْأَلْعَابِ',
  'math',
  1,
  '{"audio_base":"/audio/teachers/taline/lesson_37_amusement_picture_table","slides":[{"scene_image":"/lessons/v2/lesson37/s1.webp","audio_key":"lesson37_s1","text":"أَمَامَنَا لَوْحَةٌ تَحْتَوِي عَلَى صُوَرٍ وَمَجْمُوعَاتٍ مُخْتَلِفَةٍ مِنَ الْأَلْعَابِ."},{"scene_image":"/lessons/v2/lesson37/s2.webp","audio_key":"lesson37_s2","text":"نَنْظُرُ إِلَى كُلِّ سَطْرٍ، وَنَتَعَرَّفُ إِلَى نَوْعِ الْأَشْيَاءِ الْمَوْجُودَةِ فِيهِ."},{"scene_image":"/lessons/v2/lesson37/s3.webp","audio_key":"lesson37_s3","text":"نَعُدُّ عَنَاصِرَ الْمَجْمُوعَةِ الْأُولَى، ثُمَّ نَخْتَارُ الْعَدَدَ الْمُنَاسِبَ."},{"scene_image":"/lessons/v2/lesson37/s4.webp","audio_key":"lesson37_s4","text":"نَقْرَأُ مَجْمُوعَةً جَدِيدَةً، وَنُقَارِنُ عَدَدَ عَنَاصِرِهَا بِالْمَجْمُوعَةِ السَّابِقَةِ."},{"scene_image":"/lessons/v2/lesson37/s5.webp","audio_key":"lesson37_s5","text":"نُكْمِلُ الْخَانَةَ النَّاقِصَةَ بِالصُّورَةِ أَوِ الْعَدَدِ الْمُنَاسِبِ."},{"scene_image":"/lessons/v2/lesson37/s6.webp","audio_key":"lesson37_s6","text":"أَحْسَنْتُمْ! نَقْرَأُ اللَّوْحَةَ بِمُلَاحَظَةِ الصُّوَرِ وَالسُّطُورِ وَالْخَانَاتِ."}]}'::jsonb,
  '5daed3bb-7e62-4a5a-93a1-f6dec60df810',
  'World 2 lesson 37',
  5,
  'lesson_v2',
  '[]'::jsonb,
  2,
  '[]'::jsonb,
  360,
  37,
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
  'أُحَدِّدُ مَكَانِي بَيْنَ أَصْدِقَائِي',
  'math',
  1,
  '{"audio_base":"/audio/teachers/khalil/lesson_38_amusement_positions","slides":[{"scene_image":"/lessons/v2/lesson38/s1.webp","audio_key":"lesson38_s1","text":"يَقِفُ الْأَطْفَالُ مَعًا فِي سَاحَةِ الْأَلْعَابِ، وَلِكُلِّ طِفْلٍ مَكَانٌ مُحَدَّدٌ."},{"scene_image":"/lessons/v2/lesson38/s2.webp","audio_key":"lesson38_s2","text":"نُحَدِّدُ الطِّفْلَ الَّذِي يَقِفُ أَمَامَ أَصْدِقَائِهِ، وَنَلْفِظُ كَلِمَةَ أَمَامَ."},{"scene_image":"/lessons/v2/lesson38/s3.webp","audio_key":"lesson38_s3","text":"نَبْحَثُ عَنِ الطِّفْلِ الَّذِي يَقِفُ خَلْفَ صَدِيقِهِ، وَنَلْفِظُ كَلِمَةَ خَلْفَ."},{"scene_image":"/lessons/v2/lesson38/s4.webp","audio_key":"lesson38_s4","text":"يَقِفُ طِفْلٌ بَيْنَ صَدِيقَيْنِ، فَنَسْتَعْمِلُ كَلِمَةَ بَيْنَ لِتَحْدِيدِ مَكَانِهِ."},{"scene_image":"/lessons/v2/lesson38/s5.webp","audio_key":"lesson38_s5","text":"نُحَدِّدُ مَنْ يَقِفُ بِجَانِبِ صَدِيقِهِ، ثُمَّ نُغَيِّرُ الْأَمَاكِنَ وَنُعِيدُ الْمُلَاحَظَةَ."},{"scene_image":"/lessons/v2/lesson38/s6.webp","audio_key":"lesson38_s6","text":"أَحْسَنْتُمْ! نَسْتَعْمِلُ أَمَامَ وَخَلْفَ وَبَيْنَ وَبِجَانِبِ لِتَحْدِيدِ الْمَكَانِ."}]}'::jsonb,
  '5daed3bb-7e62-4a5a-93a1-f6dec60df810',
  'World 2 lesson 38',
  6,
  'lesson_v2',
  '[]'::jsonb,
  2,
  '[]'::jsonb,
  360,
  38,
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
  'رِحْلَةُ الْقِطَارِ الْمُرَتَّبِ',
  'math',
  1,
  '{"audio_base":"/audio/teachers/taline/lesson_39_amusement_order","slides":[{"scene_image":"/lessons/v2/lesson39/s1.webp","audio_key":"lesson39_s1","text":"وَصَلَ قِطَارُ الْأَلْعَابِ، وَعَرَبَاتُهُ مُرَتَّبَةٌ وَاحِدَةً بَعْدَ الْأُخْرَى."},{"scene_image":"/lessons/v2/lesson39/s2.webp","audio_key":"lesson39_s2","text":"نَبْدَأُ مِنَ الْقَاطِرَةِ، وَنُحَدِّدُ الْعَرَبَةَ الْأُولَى فِي التَّرْتِيبِ."},{"scene_image":"/lessons/v2/lesson39/s3.webp","audio_key":"lesson39_s3","text":"نَنْتَقِلُ إِلَى الْعَرَبَةِ الثَّانِيَةِ، ثُمَّ إِلَى الْعَرَبَةِ الثَّالِثَةِ."},{"scene_image":"/lessons/v2/lesson39/s4.webp","audio_key":"lesson39_s4","text":"نُرَتِّبُ بَطَاقَاتِ الْأَطْفَالِ حَسَبَ دَوْرِ كُلِّ وَاحِدٍ مِنْهُمْ."},{"scene_image":"/lessons/v2/lesson39/s5.webp","audio_key":"lesson39_s5","text":"نُشَاهِدُ سِبَاقًا صَغِيرًا، وَنُحَدِّدُ الْأَوَّلَ وَالثَّانِيَ وَالثَّالِثَ."},{"scene_image":"/lessons/v2/lesson39/s6.webp","audio_key":"lesson39_s6","text":"أَحْسَنْتُمْ! نَسْتَعْمِلُ الْأَوَّلَ وَالثَّانِيَ وَالثَّالِثَ لِلتَّعْبِيرِ عَنِ التَّرْتِيبِ."}]}'::jsonb,
  '5daed3bb-7e62-4a5a-93a1-f6dec60df810',
  'World 2 lesson 39',
  7,
  'lesson_v2',
  '[]'::jsonb,
  2,
  '[]'::jsonb,
  360,
  39,
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
  'أَكْتَشِفُ النَّمَطَ السِّرِّيَّ',
  'math',
  1,
  '{"audio_base":"/audio/teachers/khalil/lesson_40_amusement_patterns","slides":[{"scene_image":"/lessons/v2/lesson40/s1.webp","audio_key":"lesson40_s1","text":"أَمَامَنَا سِلْسِلَةٌ مِنَ الْأَلْوَانِ وَالْأَشْكَالِ، وَفِيهَا تَرْتِيبٌ يَتَكَرَّرُ."},{"scene_image":"/lessons/v2/lesson40/s2.webp","audio_key":"lesson40_s2","text":"نُلَاحِظُ الْعُنْصُرَ الْأَوَّلَ، ثُمَّ الْعُنْصُرَ الثَّانِيَ، وَنَبْحَثُ عَنْ طَرِيقَةِ التَّكْرَارِ."},{"scene_image":"/lessons/v2/lesson40/s3.webp","audio_key":"lesson40_s3","text":"نَخْتَارُ اللَّوْنَ الَّذِي يَأْتِي بَعْدَ آخِرِ لَوْنٍ لِنُكْمِلَ النَّمَطَ."},{"scene_image":"/lessons/v2/lesson40/s4.webp","audio_key":"lesson40_s4","text":"نُكْمِلُ نَمَطًا جَدِيدًا يَتَكَوَّنُ مِنْ شَكْلَيْنِ مُخْتَلِفَيْنِ."},{"scene_image":"/lessons/v2/lesson40/s5.webp","audio_key":"lesson40_s5","text":"نَتَابِعُ النَّمَطَ الْأَطْوَلَ، وَنَضَعُ كُلَّ عُنْصُرٍ فِي مَكَانِهِ الصَّحِيحِ."},{"scene_image":"/lessons/v2/lesson40/s6.webp","audio_key":"lesson40_s6","text":"أَحْسَنْتُمْ! النَّمَطُ هُوَ تَرْتِيبٌ يَتَكَرَّرُ بِالطَّرِيقَةِ نَفْسِهَا."}]}'::jsonb,
  '5daed3bb-7e62-4a5a-93a1-f6dec60df810',
  'World 2 lesson 40',
  8,
  'lesson_v2',
  '[]'::jsonb,
  2,
  '[]'::jsonb,
  360,
  40,
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
  'صُفُوفٌ وَأَعْمِدَةٌ فِي لَوْحَةِ اللَّعِبِ',
  'math',
  1,
  '{"audio_base":"/audio/teachers/taline/lesson_41_amusement_rows_columns","slides":[{"scene_image":"/lessons/v2/lesson41/s1.webp","audio_key":"lesson41_s1","text":"أَمَامَنَا لَوْحَةٌ مُقَسَّمَةٌ إِلَى خَانَاتٍ مُرَتَّبَةٍ فِي شَبَكَةٍ."},{"scene_image":"/lessons/v2/lesson41/s2.webp","audio_key":"lesson41_s2","text":"الْخَانَاتُ الَّتِي تَمْتَدُّ أُفُقِيًّا تُكَوِّنُ صَفًّا، فَلْنُشِرْ إِلَى أَحَدِ الصُّفُوفِ."},{"scene_image":"/lessons/v2/lesson41/s3.webp","audio_key":"lesson41_s3","text":"الْخَانَاتُ الَّتِي تَمْتَدُّ عَمُودِيًّا تُكَوِّنُ عَمُودًا، فَلْنُحَدِّدْ أَحَدَ الْأَعْمِدَةِ."},{"scene_image":"/lessons/v2/lesson41/s4.webp","audio_key":"lesson41_s4","text":"نُلَوِّنُ صَفًّا كَامِلًا بِلَوْنٍ وَاحِدٍ، وَنُرَاقِبُ اتِّجَاهَهُ."},{"scene_image":"/lessons/v2/lesson41/s5.webp","audio_key":"lesson41_s5","text":"نُلَوِّنُ عَمُودًا كَامِلًا بِلَوْنٍ آخَرَ، وَنُلَاحِظُ نُقْطَةَ التَّقَاطُعِ."},{"scene_image":"/lessons/v2/lesson41/s6.webp","audio_key":"lesson41_s6","text":"أَحْسَنْتُمْ! نُحَدِّدُ مَكَانَ الْخَانَةِ بِاسْتِعْمَالِ الصَّفِّ وَالْعَمُودِ."}]}'::jsonb,
  '5daed3bb-7e62-4a5a-93a1-f6dec60df810',
  'World 2 lesson 41',
  9,
  'lesson_v2',
  '[]'::jsonb,
  2,
  '[]'::jsonb,
  360,
  41,
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
  'أَتَحَرَّكُ دَاخِلَ الشَّبَكَةِ',
  'math',
  1,
  '{"audio_base":"/audio/teachers/khalil/lesson_42_amusement_grid_paths","slides":[{"scene_image":"/lessons/v2/lesson42/s1.webp","audio_key":"lesson42_s1","text":"نَبْدَأُ مِنَ الْخَانَةِ الْمُحَدَّدَةِ، وَنَسْتَعِدُّ لِلسَّيْرِ دَاخِلَ الشَّبَكَةِ."},{"scene_image":"/lessons/v2/lesson42/s2.webp","audio_key":"lesson42_s2","text":"نَتَحَرَّكُ خَانَةً بَعْدَ خَانَةٍ نَحْوَ الْيَمِينِ، وَنَعُدُّ خُطُوَاتِنَا."},{"scene_image":"/lessons/v2/lesson42/s3.webp","audio_key":"lesson42_s3","text":"نَصْعَدُ إِلَى الْأَعْلَى، ثُمَّ نَتَوَقَّفُ عِنْدَ الْخَانَةِ الْمَطْلُوبَةِ."},{"scene_image":"/lessons/v2/lesson42/s4.webp","audio_key":"lesson42_s4","text":"نَتَّبِعُ الْمَسَارَ الْمُلَوَّنَ بِتَرْتِيبٍ، وَلَا نَخْرُجُ عَنْ حُدُودِ الشَّبَكَةِ."},{"scene_image":"/lessons/v2/lesson42/s5.webp","audio_key":"lesson42_s5","text":"نُقَارِنُ بَيْنَ مَسَارَيْنِ، وَنَخْتَارُ الطَّرِيقَ الَّذِي يُوصِلُنَا إِلَى الْهَدَفِ."},{"scene_image":"/lessons/v2/lesson42/s6.webp","audio_key":"lesson42_s6","text":"أَحْسَنْتُمْ! نَتَحَرَّكُ دَاخِلَ الشَّبَكَةِ خُطْوَةً خُطْوَةً حَتَّى نَصِلَ."}]}'::jsonb,
  '5daed3bb-7e62-4a5a-93a1-f6dec60df810',
  'World 2 lesson 42',
  10,
  'lesson_v2',
  '[]'::jsonb,
  2,
  '[]'::jsonb,
  360,
  42,
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
  'أَتَعَرَّفُ إِلَى الْأَعْدَادِ مِنْ عِشْرِينَ إِلَى تِسْعَةٍ وَثَلَاثِينَ',
  'math',
  1,
  '{"audio_base":"/audio/teachers/taline/lesson_43_amusement_numbers_20_39","slides":[{"scene_image":"/lessons/v2/lesson43/s1.webp","audio_key":"lesson43_s1","text":"نَبْدَأُ بِالْعَدَدِ عِشْرِينَ، وَنُمَثِّلُهُ بِعَشْرَتَيْنِ كَامِلَتَيْنِ."},{"scene_image":"/lessons/v2/lesson43/s2.webp","audio_key":"lesson43_s2","text":"نَقْرَأُ الْعَدَدَ أَرْبَعَةً وَعِشْرِينَ، وَنَرَى فِيهِ عَشْرَتَيْنِ وَأَرْبَعَ وَحَدَاتٍ."},{"scene_image":"/lessons/v2/lesson43/s3.webp","audio_key":"lesson43_s3","text":"نَنْتَقِلُ مِنَ الْعَدَدِ تِسْعَةٍ وَعِشْرِينَ إِلَى الْعَدَدِ ثَلَاثِينَ."},{"scene_image":"/lessons/v2/lesson43/s4.webp","audio_key":"lesson43_s4","text":"نُمَثِّلُ الْعَدَدَ خَمْسَةً وَثَلَاثِينَ بِثَلَاثِ عَشَرَاتٍ وَخَمْسِ وَحَدَاتٍ."},{"scene_image":"/lessons/v2/lesson43/s5.webp","audio_key":"lesson43_s5","text":"نَقْرَأُ أَعْدَادًا مُخْتَلِفَةً مِنْ عِشْرِينَ إِلَى تِسْعَةٍ وَثَلَاثِينَ."},{"scene_image":"/lessons/v2/lesson43/s6.webp","audio_key":"lesson43_s6","text":"أَحْسَنْتُمْ! نَقْرَأُ الْعَدَدَ بِمُلَاحَظَةِ عَشَرَاتِهِ وَوَحَدَاتِهِ."}]}'::jsonb,
  '5daed3bb-7e62-4a5a-93a1-f6dec60df810',
  'World 2 lesson 43',
  11,
  'lesson_v2',
  '[]'::jsonb,
  2,
  '[]'::jsonb,
  360,
  43,
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
  'أُرَتِّبُ الْأَعْدَادَ فِي قِطَارِ الْأَرْقَامِ',
  'math',
  1,
  '{"audio_base":"/audio/teachers/khalil/lesson_44_amusement_number_order","slides":[{"scene_image":"/lessons/v2/lesson44/s1.webp","audio_key":"lesson44_s1","text":"أَمَامَنَا بَطَاقَاتُ أَعْدَادٍ مِنْ عِشْرِينَ إِلَى تِسْعَةٍ وَثَلَاثِينَ."},{"scene_image":"/lessons/v2/lesson44/s2.webp","audio_key":"lesson44_s2","text":"نَبْحَثُ عَنِ الْعَدَدِ الْأَصْغَرِ، وَنَضَعُهُ فِي بِدَايَةِ التَّرْتِيبِ."},{"scene_image":"/lessons/v2/lesson44/s3.webp","audio_key":"lesson44_s3","text":"نُكْمِلُ سِلْسِلَةَ الْأَعْدَادِ، وَنَكْتَشِفُ الْعَدَدَ النَّاقِصَ بَيْنَ عَدَدَيْنِ."},{"scene_image":"/lessons/v2/lesson44/s4.webp","audio_key":"lesson44_s4","text":"نُقَارِنُ بَيْنَ ثَلَاثَةِ أَعْدَادٍ، ثُمَّ نُرَتِّبُهَا مِنَ الْأَصْغَرِ إِلَى الْأَكْبَرِ."},{"scene_image":"/lessons/v2/lesson44/s5.webp","audio_key":"lesson44_s5","text":"نُغَيِّرُ اتِّجَاهَ التَّرْتِيبِ، وَنَبْدَأُ مِنَ الْعَدَدِ الْأَكْبَرِ."},{"scene_image":"/lessons/v2/lesson44/s6.webp","audio_key":"lesson44_s6","text":"أَحْسَنْتُمْ! نُقَارِنُ الْأَعْدَادَ ثُمَّ نُرَتِّبُهَا حَسَبَ قِيَمَتِهَا."}]}'::jsonb,
  '5daed3bb-7e62-4a5a-93a1-f6dec60df810',
  'World 2 lesson 44',
  12,
  'lesson_v2',
  '[]'::jsonb,
  2,
  '[]'::jsonb,
  360,
  44,
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
  'أَبْنِي الْعَدَدَ بِالْعَشَرَاتِ وَالْوَحَدَاتِ',
  'math',
  1,
  '{"audio_base":"/audio/teachers/taline/lesson_45_amusement_tens_units","slides":[{"scene_image":"/lessons/v2/lesson45/s1.webp","audio_key":"lesson45_s1","text":"أَمَامَنَا الْعَدَدُ أَرْبَعَةٌ وَثَلَاثُونَ، وَهُوَ يَتَكَوَّنُ مِنْ عَشَرَاتٍ وَوَحَدَاتٍ."},{"scene_image":"/lessons/v2/lesson45/s2.webp","audio_key":"lesson45_s2","text":"نُحَدِّدُ ثَلَاثَ عَشَرَاتٍ فِي الْعَدَدِ أَرْبَعَةٍ وَثَلَاثِينَ."},{"scene_image":"/lessons/v2/lesson45/s3.webp","audio_key":"lesson45_s3","text":"نُحَدِّدُ أَرْبَعَ وَحَدَاتٍ، ثُمَّ نَقُولُ: أَرْبَعَةٌ وَثَلَاثُونَ تُسَاوِي ثَلَاثِينَ زَائِدَ أَرْبَعَةٍ."},{"scene_image":"/lessons/v2/lesson45/s4.webp","audio_key":"lesson45_s4","text":"نُرَكِّبُ الْعَدَدَ اثْنَيْنِ وَثَلَاثِينَ مِنْ ثَلَاثِ عَشَرَاتٍ وَوَحْدَتَيْنِ."},{"scene_image":"/lessons/v2/lesson45/s5.webp","audio_key":"lesson45_s5","text":"نُفَكِّكُ أَعْدَادًا جَدِيدَةً، وَنَكْتُبُ عَدَدَ الْعَشَرَاتِ وَعَدَدَ الْوَحَدَاتِ."},{"scene_image":"/lessons/v2/lesson45/s6.webp","audio_key":"lesson45_s6","text":"أَحْسَنْتُمْ! كُلُّ عَدَدٍ مِنْ رَقْمَيْنِ يَتَكَوَّنُ مِنْ عَشَرَاتٍ وَوَحَدَاتٍ."}]}'::jsonb,
  '5daed3bb-7e62-4a5a-93a1-f6dec60df810',
  'World 2 lesson 45',
  13,
  'lesson_v2',
  '[]'::jsonb,
  2,
  '[]'::jsonb,
  360,
  45,
  FALSE
);

COMMIT;

SELECT
  "id",
  "title",
  "lesson_number",
  "sort_order",
  "is_published"
FROM public.lessons
WHERE "world_id" = '5daed3bb-7e62-4a5a-93a1-f6dec60df810'
  AND "lesson_number" BETWEEN 36 AND 45
ORDER BY "sort_order";
