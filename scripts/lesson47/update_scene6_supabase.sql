update public.lessons
set
  scenes = jsonb_set(
    scenes,
    '{5,text}',
    to_jsonb(
      'أَحْسَنْتُمْ! نَسْتَطِيعُ الآنَ قِرَاءَةَ مَسْلَكٍ بِالأَسْهُمِ، وَتَمْثِيلَ مَسْلَكٍ آخَرَ، وَالوُصُولَ إِلَى الهَدَفِ بِدِقَّةٍ.'::text
    ),
    false
  ),
  content = replace(content, 'قِرَاءَ مَسْلَكٍ', 'قِرَاءَةَ مَسْلَكٍ')
where world_id = '5daed3bb-7e62-4a5a-93a1-f6dec60df810'
  and sort_order = 15;
