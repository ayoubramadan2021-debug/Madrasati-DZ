from pathlib import Path
import re
import sys

path = Path(
    "src/features/lesson-v2/exercises-v2/"
    "Lesson46HeartBeats2Exercises.tsx"
)

source = path.read_text(encoding="utf-8")
errors = []

question_ids = re.findall(
    r'id:\s*"l46_ex[1-4]_q[1-4]"',
    source,
)

if len(question_ids) != 16:
    errors.append(
        f"عدد الأسئلة {len(question_ids)} بدل 16."
    )

if "choice.icon" in source:
    errors.append(
        "ما زال استدعاء choice.icon موجودًا."
    )

if re.search(
    r'^\s*icon\?:\s*string;',
    source,
    flags=re.M,
):
    errors.append(
        "خاصية icon ما زالت داخل النوع Choice."
    )

if re.search(
    r'^\s*icon:\s*"',
    source,
    flags=re.M,
):
    errors.append(
        "حقول icon ما زالت داخل بيانات الخيارات."
    )

start = source.find(
    "function PulseComparison() {"
)

end = source.find(
    "const LessonCompleteAny",
    start,
)

comparison = (
    source[start:end]
    if start >= 0 and end >= 0
    else ""
)

for forbidden in (
    "نَبْضٌ أَسْرَعُ",
    "نَبْضٌ أَهْدَأُ",
    "fastPulse",
    "calmPulse",
):
    if forbidden in comparison:
        errors.append(
            f"لوحة المقارنة تكشف النتيجة: {forbidden}"
        )

if "displayedChoices.map" not in source:
    errors.append(
        "الترتيب المتنوع للإجابات غير مفعل."
    )

if "showCorrect={false}" not in source:
    errors.append(
        "إظهار الإجابة الصحيحة بعد الخطأ غير معطل."
    )

if errors:
    for error in errors:
        print("❌", error)

    sys.exit(1)

print("✅ عدد الأسئلة: 16")
print("✅ لا توجد أيقونات داخل خيارات الإجابة")
print("✅ لوحة المقارنة لا تكشف النتيجة")
print("✅ ترتيب الإجابات متنوع")
print("✅ الإجابة الصحيحة لا تظهر بعد الخطأ")
