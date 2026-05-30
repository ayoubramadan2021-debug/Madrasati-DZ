fb353ac feat: زر اختبار العالم في WorldPage (اكتمال حلقة الوصول)
924cfc2 feat: منطق الفتح الكامل (نجاح الاختبار يفتح العالم التالي)
73e3192 feat: واجهة اختبار العالم WorldQuizPage (أسئلة + نتيجة + صياغة مهذبة)
2baa04e feat: أداة إدخال اختبارات العوالم (world_id + data jsonb)
c1cae48 feat: توحيد quizzes (world_id + data jsonb + شروط النجاح)
1d096df feat: modal أنيق للعوالم المقفلة بدل alert
9a09cdb feat: جدول world_progress + سياسات RLS (نظام القفل)
957f4ae feat: صفحة الدرس LessonDetailPage تعرض تمارينه الحقيقية (اكتمال سلسلة التصفّح الهرمي)
fadca59 feat: صفحة العالم WorldPage تعرض دروسه من Supabase
a007240 feat: عرض العوالم من Supabase في صفحة المادة (المرحلة ج)
c18687e feat: ربط exercises بـ lesson_id (اكتمال الهرم الأساسي)
2e25058 feat: ربط lessons بـ world_id + title_fr + sort_order
8c7a369 feat: جدول worlds + سياسات RLS (نظام الأدوار admin/moderator)
59c5246 fix: إصلاح addLesson بحذف عمود is_published غير الموجود
97cfccb chore: إزالة AdminPage.tsx.bak2 وتوسيع gitignore
699adee feat: أداة إدخال arithmetic ثنائية اللغة + AdminRoute + استثناء admin من الترتيب + إصلاحات RLS
53969f5 feat: حماية مسار /admin بحارس AdminRoute + إصلاحات أمنية
c80a67f feat: دعم ثنائية اللغة في قوالب التمارين عبر pickLang
7642d8d chore: إزالة ملفات النسخ الاحتياطية المؤقتة
cd62fef feat: نجوم التقدّم + شخصية ديزاد (ترحيب/تفكير/احتفال) + سلّم حواف مركزي
1a2bcc3 feat(i18n): add full Arabic/French translation system
0dc50c8 سلسلة الدروس والتمارين والاختبارات من Supabase + تنظيف البنية
3af1e94 أداة إضافة الاختبارات في لوحة الأدمن
4ed4718 ربط صفحة المعلّم بدالة Gemini
8584d05 إضافة دالة Gemini وإعداد Netlify
7f00c3b إضافة مهلة زمنية للجلب في الصفحات الحرجة
a68b90a إضافة مهلة زمنية للجلب في كل الصفحات الحرجة
1708f19 توافق الشاشات الكبيرة + حالات فارغة ودودة + شاشة بداية
4e0c46a تحصين الصفحات ضد النت الضعيفة + تمرين تفاعلي + تنظيف المسارات
38b2122 ربط التمرين التفاعلي ببطاقة التمارين في الرياضيات
f3a796f إصلاح التوجيه: حل مشكلة Page not found عند التحديث
ea99b89 إضافة تمرين تفاعلي: سحب الأعداد للمجموعات
75d1d4f إصلاح الثيم الأبيض: نصوص وعناوين البطاقات
c06c37d تحديث: تصميم Dark+Gold، ثيم فاتح/غامق، قائمة جانبية، حماية الأدوار
66c4fa5 feat: تطبيق الهوية البصرية الكاملة لتطبيق تعليم
e42290a Apply Taleem visual identity
cf1e365 Add Android APK workflow
02fffd2 Fix Vitest global types
7b91776 Initial Taalim DZ Android Build
bb8b2f9 remove auth redirect from progress route
fbdce19 fix progress page auth redirect
3aadd94 simplify app ui and remove unnecessary elements
979ca54 expand app translations
49d461b apply duolingo style home screen
98e92a4 apply duolingo style theme and navigation
2e466b3 redesign global app layout to clean school style
cd77ea9 redesign home with clean school menu layout
7c2ca99 update app themes to clean red and night blue
3ea98ba add lesson edit support in admin panel
3463433 add chat history to ai tutor
1036cf3 fix broken admin arabic translation object
0c44be1 localize admin select options
05d7799 fix arabic admin translations
d0267fb localize admin panel labels
99522ea fix interactive exercise answer check
dd07f38 add interactive ai exercise generator
4df192c replace auth ui with custom auth page
6c3c2aa remove test deploy message
2a7035a fix missing language provider
01d74d4 test render deploy output
c6a70f1 add error boundary to debug blank screen
e39c109 remove broken deploy configs
fc0eaeb fix refresh white screen with hash router
d49b257 fix render spa routing
ee2d977 fix spa refresh routing
89a4e83 prevent image based ai exercises
6a930fb add ai exercise generator button
860802e add grade and subject controls to ai tutor
62fa09c connect ai tutor page to render backend
b656366 fix ai tutor with supabase function
6030fc7 fix multilingual version label
460425b restore version text
54e2396 fix version translation
76d70d3 fix render routes
87f8b9c clean deploy
