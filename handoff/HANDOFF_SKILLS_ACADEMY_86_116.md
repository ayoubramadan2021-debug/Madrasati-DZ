# MADRASATI-DZ — HANDOFF

# عالم أكاديمية المهارات

## STATUS

COMPLETED PROTECTED BASELINE

## WORLD ID

`b3187e1b-58da-441d-ae43-d4be486e7c12`

## LESSON RANGE

Lesson 86 → Lesson 116

عدد الدروس: 31

sort_order = 1 → 31

## FIXED CHARACTERS

- الأستاذ خليل
- الأستاذة تالين
- فاضل
- رحمة
- سيرين

## VOICES

- khalil = ar-DZ-IsmaelNeural
- taline = ar-DZ-AminaNeural

## LESSON STRUCTURE

- id
- lessonKey
- num
- world_id
- sort_order
- title
- title_fr
- teacher
- voice
- audio_base
- exercisePath
- nextLessonKey
- objectives
- slides

## SCENES

كل درس يحتوي s1 إلى s6.

كل Scene يحتوي:

- key
- audio_key
- title
- image
- scene_image
- text

المشهد السادس فقط:

- is_closing: true
- cta_text: هَيَّا نَتَدَرَّبُ

## IMAGE STANDARD

- 1024×1536
- Vertical 2:3
- Premium semi-realistic educational 3D
- WebP quality 95
- method 6

## AUDIO STANDARD

- REAL WordBoundary
- MP3
- JSON
- karaoke.json
- JSON == Karaoke

## CANONICAL TEXT RULE

lessonXXXCanonicalText هو المصدر المرجعي للنص.

عند تغيير نص مشهد واحد يعاد فقط:

- MP3
- JSON
- karaoke.json

لنفس المشهد.

## LAST LESSONS

- Lesson 114 — sort_order 29 — khalil
- Lesson 115 — sort_order 30 — taline
- Lesson 116 — sort_order 31 — khalil

Lesson 116 title:

أُصَنِّفُ الْمَوَادَّ فِي الْمَتْجَرِ

nextLessonKey = lesson117

## SUPABASE

Lessons 86 → 116 uploaded.

## BUILD

BUILD SUCCESS

## NEXT DEVELOPMENT POINT

lesson117
