# تسليم مشروع مدرستي DZ

تاريخ التسليم: 2026-07-23 10:33:26 +0100
الفرع الأصلي: `handoff-premium-20260723_100341`
فرع التسليم: `handoff-premium-secure-20260723_103324`

## ما تم حفظه

- الشفرة الحالية المتتبعة في Git.
- ملفات المشروع غير المتتبعة داخل المسارات الآمنة.
- خطة المحرك Premium الموحّد.
- ملفات محرك الدروس ومحرك التمارين Premium المكتشفة.
- سكربتات الفحص والبناء والإصلاح والرفع المعروفة.
- طريقة العمل والبناء والتحقق.
- تحديث شامل في `resume.md`.

## معمارية العمل

- محرك الدروس Premium مسؤول عن المشاهد والصوت والكاريوكي والتقدم والتنقل.
- تدفق التمارين Premium ينسق المحركات المتخصصة عبر `stage` و`onComplete`.
- لا يتم استبدال كل أنواع التمارين بمحرك ضخم واحد.
- الدرس 1 هو مرجع تدفق التمارين.
- `WorldIntroSceneV2` هو مرجع واجهة الدروس الحالي.
- الدرس 36 محفوظ كعمل قيد التطوير إلى أن ينجح الاختبار اليدوي.

## بداية العمل من حساب جديد

```bash
git clone https://github.com/ayoubramadan2021-debug/Madrasati-DZ.git
cd Madrasati-DZ
git fetch origin --prune
git switch handoff-premium-secure-20260723_103324
cat plans-lesson/handoff/docs/PROJECT_HANDOFF.md
cat plans-lesson/handoff/docs/PREMIUM_ARCHITECTURE.md
cat plans-lesson/handoff/docs/WORKFLOW.md
npm install
npm run build
```
