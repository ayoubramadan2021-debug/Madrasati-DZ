#!/data/data/com.termux/files/usr/bin/bash
set -Eeuo pipefail

# ============================================================
# MADRASATI-DZ
# SMALL CITY LESSON ENGINE
# Lessons 71 → 85
#
# Reference implementation:
# Lesson 70
#
# PRINCIPLE:
# DATA CHANGES
# ENGINE DOES NOT
# ============================================================

ROOT="$HOME/madrasati-dz"
cd "$ROOT"

PAGE="src/pages/LessonV2Page.tsx"
WORLD_FILE="src/features/world-intro/smallCityWorldIntro.ts"

CONTENT_DIR="src/features/lesson-v2/content"
DATA_DIR="src/features/lesson-v2/data/small-city"
DATA_FILE="$DATA_DIR/lessons_71_85.json"

SYNC_REFERENCE="rebuild_lesson70_natural_sync.sh"

MIN_LESSON=71
MAX_LESSON=85

MODE=""
ONE_LESSON=""

STAMP="$(date +%Y%m%d_%H%M%S)"
WORK="$HOME/.madrasati_small_city_71_85_$STAMP"
BACKUP="$ROOT/backups/small_city_71_85_$STAMP"

SUCCESS=0
BACKUP_READY=0

mkdir -p "$WORK"

# ============================================================
# UI
# ============================================================

line() {
  echo "============================================================"
}

die() {
  echo
  echo "❌ $*"
  exit 1
}

usage() {
  cat <<'TXT'

MADRASATI-DZ — Small City Lesson Engine

الاستعمال:

  bash build_small_city_lessons_71_85.sh --init-data

      ينشئ ملف بيانات أولي للدروس 71 → 85.
      لا يولد دروسًا ولا أصواتًا.


  bash build_small_city_lessons_71_85.sh --lesson 71

      يبني درسًا واحدًا فقط.
      ثم ينفذ npm run build.


  bash build_small_city_lessons_71_85.sh --all

      يبني جميع الدروس 71 → 85.
      ثم ينفذ npm run build مرة واحدة.


  bash build_small_city_lessons_71_85.sh --verify

      يدقق الدروس 71 → 85 بدون تعديل الملفات.


ملف البيانات:

  src/features/lesson-v2/data/small-city/lessons_71_85.json

TXT
}

# ============================================================
# ARGUMENTS
# ============================================================

case "${1:-}" in

  --init-data)
    MODE="init"
    ;;

  --all)
    MODE="all"
    ;;

  --verify)
    MODE="verify"
    ;;

  --lesson)

    [ -n "${2:-}" ] || die \
      "يجب تحديد رقم الدرس بعد --lesson"

    ONE_LESSON="$2"

    [[ "$ONE_LESSON" =~ ^[0-9]+$ ]] || die \
      "رقم الدرس غير صالح: $ONE_LESSON"

    if [ "$ONE_LESSON" -lt "$MIN_LESSON" ] || \
       [ "$ONE_LESSON" -gt "$MAX_LESSON" ]; then

      die \
        "المسموح من $MIN_LESSON إلى $MAX_LESSON"
    fi

    MODE="one"
    ;;

  -h|--help|"")
    usage
    exit 0
    ;;

  *)
    usage
    die "خيار غير معروف: ${1:-}"
    ;;

esac

# ============================================================
# إنشاء Dataset Template
# ============================================================

if [ "$MODE" = "init" ]; then

  mkdir -p "$DATA_DIR"

  if [ -f "$DATA_FILE" ]; then

    echo "⚠️ ملف البيانات موجود أصلًا:"
    echo "$DATA_FILE"
    echo
    echo "لن يتم استبداله."

    exit 0
  fi

  python3 - "$ROOT" "$DATA_FILE" <<'PY'
from pathlib import Path
import json
import sys

root = Path(sys.argv[1])
destination = Path(sys.argv[2])

lessons = []

for n in range(71, 86):

    base = root / "public/lessons/v2"

    candidates = sorted(
        p
        for p in base.glob(f"lesson{n}*")
        if p.is_dir()
    )

    valid = []

    for p in candidates:
        if all(
            (p / f"s{i}.webp").is_file()
            for i in range(1, 7)
        ):
            valid.append(p)

    image_dir = ""

    if len(valid) == 1:
        rel = valid[0].relative_to(
            root / "public"
        )
        image_dir = "/" + rel.as_posix()

    lessons.append({
        "number": n,

        "title": "",
        "title_fr": "",

        "teacher": "",
        "voice": "",

        "rate": "-6%",

        "audio_slug": "",

        "image_dir": image_dir,

        "sort_order": n - 69,

        "objectives": [
            "",
            "",
            "",
            ""
        ],

        "scene_titles": [
            "",
            "",
            "",
            "",
            "",
            ""
        ],

        "scene_texts": [
            "",
            "",
            "",
            "",
            "",
            ""
        ],

        "cta_text": "هَيَّا نَتَدَرَّبُ"
    })

payload = {
    "schema_version": 1,
    "reference_lesson": 70,
    "world": "small-city",
    "lessons": lessons
}

destination.parent.mkdir(
    parents=True,
    exist_ok=True
)

destination.write_text(
    json.dumps(
        payload,
        ensure_ascii=False,
        indent=2
    ) + "\n",
    encoding="utf-8"
)

print("✅ تم إنشاء:")
print(destination)
print()
print(
    "⚠️ يجب ملء العناوين والنصوص والأستاذ "
    "والـaudio_slug قبل --lesson أو --all."
)
PY

  exit 0
fi

# ============================================================
# LIVE REFERENCE IMPLEMENTATION — LESSON 70
# ============================================================

REFERENCE_AUDIT="$ROOT/verify_lesson70_reference.sh"

[ -f "$REFERENCE_AUDIT" ] || {
  echo "❌ مرجع Lesson 70 غير موجود:"
  echo "$REFERENCE_AUDIT"
  exit 1
}

echo
echo "============================================================"
echo " PRE-FLIGHT — VERIFY LESSON 70 REFERENCE"
echo "============================================================"

bash "$REFERENCE_AUDIT"

echo
echo "✅ Lesson 70 reference contract passed."
echo

# ============================================================
# BASIC REQUIREMENTS
# ============================================================

line
echo " MADRASATI-DZ — SMALL CITY LESSON ENGINE"
echo " Lessons 71 → 85"
echo " Reference: Lesson 70"
line

[ -f "$PAGE" ] || die \
  "غير موجود: $PAGE"

[ -f "$WORLD_FILE" ] || die \
  "غير موجود: $WORLD_FILE"

[ -f "$SYNC_REFERENCE" ] || die \
  "المرجع الصوتي غير موجود: $SYNC_REFERENCE"

[ -f "$DATA_FILE" ] || {
  echo
  echo "❌ ملف بيانات الدروس غير موجود:"
  echo "$DATA_FILE"
  echo
  echo "أنشئه أولًا بواسطة:"
  echo
  echo "bash build_small_city_lessons_71_85.sh --init-data"
  echo
  exit 1
}

command -v python3 >/dev/null 2>&1 || die \
  "python3 غير موجود"

command -v ffmpeg >/dev/null 2>&1 || die \
  "ffmpeg غير موجود"

command -v ffprobe >/dev/null 2>&1 || die \
  "ffprobe غير موجود"

python3 -c 'import edge_tts' >/dev/null 2>&1 || die \
  "edge-tts غير موجود"

echo
echo "✅ الأدوات الأساسية موجودة."

# ============================================================
# WORLD ID
# ============================================================

WORLD_ID="$(
  python3 - "$WORLD_FILE" <<'PY'
from pathlib import Path
import re
import sys

s = Path(sys.argv[1]).read_text(
    encoding="utf-8"
)

m = re.search(
    r'SMALL_CITY_WORLD_ID'
    r'\s*=\s*"([^"]+)"',
    s
)

if not m:
    raise SystemExit(1)

print(m.group(1))
PY
)" || die \
  "تعذر استخراج SMALL_CITY_WORLD_ID"

[ -n "$WORLD_ID" ] || die \
  "WORLD_ID فارغ"

echo "✅ WORLD_ID=$WORLD_ID"

# ============================================================
# SELECT LESSONS
# ============================================================

if [ "$MODE" = "one" ]; then

  LESSONS="$ONE_LESSON"

else

  LESSONS="$(seq 71 85)"

fi

# ============================================================
# DATA VALIDATION + NORMALIZATION
# ============================================================

line
echo " 1. التحقق من بيانات الدروس"
line

mkdir -p "$WORK/data"

python3 - \
  "$DATA_FILE" \
  "$ROOT" \
  "$WORK/data" \
  "$MODE" \
  "${ONE_LESSON:-0}" <<'PY'

from pathlib import Path
import json
import sys


data_file = Path(sys.argv[1])
root = Path(sys.argv[2])
output = Path(sys.argv[3])

mode = sys.argv[4]
one = int(sys.argv[5])


data = json.loads(
    data_file.read_text(
        encoding="utf-8"
    )
)


if not isinstance(data, dict):
    raise SystemExit(
        "❌ جذر ملف البيانات يجب أن يكون Object."
    )


lessons = data.get("lessons")


if not isinstance(lessons, list):
    raise SystemExit(
        "❌ lessons يجب أن تكون Array."
    )


by_number = {}

for item in lessons:

    if not isinstance(item, dict):
        continue

    try:
        n = int(item.get("number"))
    except Exception:
        continue

    by_number[n] = item


targets = (
    [one]
    if mode == "one"
    else list(range(71, 86))
)


def fail(n, message):
    raise SystemExit(
        f"❌ Lesson {n}: {message}"
    )


def clean_string(value):
    return (
        value.strip()
        if isinstance(value, str)
        else ""
    )


for n in targets:

    if n not in by_number:
        fail(
            n,
            "غير موجود في ملف البيانات."
        )

    item = dict(by_number[n])


    title = clean_string(
        item.get("title")
    )

    title_fr = clean_string(
        item.get("title_fr")
    )

    teacher = clean_string(
        item.get("teacher")
    ).lower()

    voice = clean_string(
        item.get("voice")
    )

    rate = clean_string(
        item.get("rate")
    ) or "-6%"

    audio_slug = clean_string(
        item.get("audio_slug")
    )

    image_dir = clean_string(
        item.get("image_dir")
    )

    cta_text = clean_string(
        item.get("cta_text")
    ) or "هَيَّا نَتَدَرَّبُ"


    if not title:
        fail(
            n,
            "title فارغ."
        )

    if not title_fr:
        fail(
            n,
            "title_fr فارغ."
        )


    if teacher not in {
        "khalil",
        "taline",
    }:
        fail(
            n,
            "teacher يجب أن يكون khalil أو taline."
        )


    if not voice:

        voice = (
            "ar-DZ-IsmaelNeural"
            if teacher == "khalil"
            else "ar-DZ-AminaNeural"
        )


    if not audio_slug:
        fail(
            n,
            "audio_slug فارغ."
        )


    # ----------------------------------------
    # image_dir auto discovery
    # ----------------------------------------

    if not image_dir:

        base = (
            root
            / "public"
            / "lessons"
            / "v2"
        )

        candidates = sorted(
            p
            for p in base.glob(
                f"lesson{n}*"
            )
            if p.is_dir()
        )

        valid = []

        for p in candidates:

            if all(
                (
                    p
                    / f"s{i}.webp"
                ).is_file()
                for i in range(1, 7)
            ):
                valid.append(p)


        if len(valid) != 1:

            fail(
                n,
                "تعذر تحديد image_dir تلقائيًا؛ "
                f"وجدت {len(valid)} مجلدات صالحة."
            )


        rel = valid[0].relative_to(
            root / "public"
        )

        image_dir = (
            "/"
            + rel.as_posix()
        )


    if not image_dir.startswith("/"):
        fail(
            n,
            "image_dir يجب أن يبدأ بـ /"
        )


    image_fs = (
        root
        / "public"
        / image_dir.lstrip("/")
    )


    if not image_fs.is_dir():
        fail(
            n,
            f"مجلد الصور غير موجود: {image_fs}"
        )


    for i in range(1, 7):

        image = (
            image_fs
            / f"s{i}.webp"
        )

        if (
            not image.is_file()
            or image.stat().st_size <= 0
        ):
            fail(
                n,
                f"الصورة مفقودة أو فارغة: {image}"
            )


    objectives = item.get(
        "objectives"
    )

    scene_titles = item.get(
        "scene_titles"
    )

    scene_texts = item.get(
        "scene_texts"
    )


    if not isinstance(
        objectives,
        list,
    ) or not objectives:

        fail(
            n,
            "objectives غير صالحة."
        )


    objectives = [
        clean_string(x)
        for x in objectives
    ]


    if any(
        not x
        for x in objectives
    ):
        fail(
            n,
            "يوجد هدف فارغ."
        )


    if (
        not isinstance(
            scene_titles,
            list,
        )
        or len(scene_titles) != 6
    ):
        fail(
            n,
            "scene_titles يجب أن تحتوي 6 عناصر."
        )


    scene_titles = [
        clean_string(x)
        for x in scene_titles
    ]


    if any(
        not x
        for x in scene_titles
    ):
        fail(
            n,
            "يوجد عنوان مشهد فارغ."
        )


    if (
        not isinstance(
            scene_texts,
            list,
        )
        or len(scene_texts) != 6
    ):
        fail(
            n,
            "scene_texts يجب أن تحتوي 6 نصوص."
        )


    scene_texts = [
        clean_string(x)
        for x in scene_texts
    ]


    if any(
        not x
        for x in scene_texts
    ):
        fail(
            n,
            "يوجد نص مشهد فارغ."
        )


    sort_order = item.get(
        "sort_order",
        n - 69,
    )


    try:
        sort_order = int(
            sort_order
        )
    except Exception:
        fail(
            n,
            "sort_order غير صالح."
        )


    normalized = {
        "number": n,

        "title": title,
        "title_fr": title_fr,

        "teacher": teacher,
        "voice": voice,
        "rate": rate,

        "audio_slug": audio_slug,

        "image_dir": image_dir,
        "image_fs": str(image_fs),

        "sort_order": sort_order,

        "objectives": objectives,

        "scene_titles": scene_titles,
        "scene_texts": scene_texts,

        "cta_text": cta_text,
    }


    destination = (
        output
        / f"lesson{n}.json"
    )

    destination.write_text(
        json.dumps(
            normalized,
            ensure_ascii=False,
            indent=2
        )
        + "\n",
        encoding="utf-8"
    )


    print(
        f"✅ Lesson {n}: "
        f"data + 6 images"
    )

PY

echo
echo "✅ جميع بيانات الدروس المطلوبة سليمة."

# ============================================================
# HELPER: GET JSON FIELD
# ============================================================

json_field() {

  local file="$1"
  local field="$2"

  python3 - \
    "$file" \
    "$field" <<'PY'

import json
import sys

data = json.load(
    open(
        sys.argv[1],
        encoding="utf-8"
    )
)

value = data[
    sys.argv[2]
]

if isinstance(
    value,
    (dict, list)
):
    print(
        json.dumps(
            value,
            ensure_ascii=False
        )
    )
else:
    print(value)

PY
}

# ============================================================
# VERIFY EXISTING MODE
# ============================================================

verify_lesson() {

  local N="$1"

  local D="$WORK/data/lesson${N}.json"

  local TEACHER
  local AUDIO_SLUG
  local IMAGE_DIR

  TEACHER="$(json_field "$D" teacher)"
  AUDIO_SLUG="$(json_field "$D" audio_slug)"
  IMAGE_DIR="$(json_field "$D" image_dir)"

  local CONTENT="$CONTENT_DIR/lesson${N}.ts"

  local AUDIO_DIR
  AUDIO_DIR="public/audio/teachers/${TEACHER}/${AUDIO_SLUG}"

  [ -s "$CONTENT" ] || {
    echo "❌ Lesson $N: content"
    return 1
  }


  for I in {1..6}; do

    local IMAGE
    IMAGE="public${IMAGE_DIR}/s${I}.webp"

    [ -s "$IMAGE" ] || {
      echo "❌ Lesson $N: image s$I"
      return 1
    }


    local BASE
    BASE="$AUDIO_DIR/lesson${N}_s${I}"

    [ -s "$BASE.mp3" ] || {
      echo "❌ Lesson $N: mp3 s$I"
      return 1
    }

    [ -s "$BASE.json" ] || {
      echo "❌ Lesson $N: json s$I"
      return 1
    }

    [ -s "$BASE.karaoke.json" ] || {
      echo "❌ Lesson $N: karaoke s$I"
      return 1
    }

  done


  python3 - \
    "$N" \
    "$CONTENT" \
    "$AUDIO_DIR" <<'PY'

from pathlib import Path
import json
import re
import sys


n = int(sys.argv[1])

content = Path(sys.argv[2])

audio = Path(sys.argv[3])


source = content.read_text(
    encoding="utf-8"
)


canonical_name = (
    f"lesson{n}CanonicalText"
)


for i in range(1, 7):

    key = f"lesson{n}_s{i}"


    if source.count(
        f'audio_key: "{key}"'
    ) != 1:

        raise SystemExit(
            f"❌ {key}: audio_key"
        )


    expected_text_ref = (
        f"text: "
        f"{canonical_name}.{key}"
    )

    if source.count(
        expected_text_ref
    ) != 1:

        raise SystemExit(
            f"❌ {key}: CanonicalText ref"
        )


    normal = json.loads(
        (
            audio
            / f"{key}.json"
        ).read_text(
            encoding="utf-8"
        )
    )


    karaoke = json.loads(
        (
            audio
            / f"{key}.karaoke.json"
        ).read_text(
            encoding="utf-8"
        )
    )


    if normal != karaoke:
        raise SystemExit(
            f"❌ {key}: JSON mismatch"
        )


    if not normal:
        raise SystemExit(
            f"❌ {key}: empty timings"
        )


    previous = -1

    for word in normal:

        if not str(
            word.get(
                "text",
                ""
            )
        ).strip():

            raise SystemExit(
                f"❌ {key}: empty word"
            )


        offset = word.get(
            "offset"
        )

        duration = word.get(
            "duration"
        )


        if (
            not isinstance(
                offset,
                (int, float)
            )
            or offset < 0
        ):
            raise SystemExit(
                f"❌ {key}: invalid offset"
            )


        if (
            not isinstance(
                duration,
                (int, float)
            )
            or duration <= 0
        ):
            raise SystemExit(
                f"❌ {key}: invalid duration"
            )


        if offset < previous:
            raise SystemExit(
                f"❌ {key}: timing order"
            )


        previous = offset


print(
    f"✅ Lesson {n}: "
    "content + audio + karaoke"
)

PY

}


if [ "$MODE" = "verify" ]; then

  line
  echo " 2. VERIFY 71 → 85"
  line

  FAILED=0

  for N in $LESSONS; do

    if ! verify_lesson "$N"; then
      FAILED=1
    fi

  done

  echo

  if [ "$FAILED" -ne 0 ]; then

    echo "❌ توجد دروس غير مكتملة."
    exit 1

  fi


  python3 - "$PAGE" <<'PY'

from pathlib import Path
import sys

s = Path(
    sys.argv[1]
).read_text(
    encoding="utf-8"
)

failed = []

for n in range(71, 86):

    imp = (
        f"lesson{n} as "
        f"LESSON_{n}_CONTENT"
    )

    mapping = (
        f"lesson{n}: "
        f"LESSON_{n}_CONTENT"
    )

    if imp not in s:
        failed.append(
            f"import {n}"
        )

    if mapping not in s:
        failed.append(
            f"map {n}"
        )

if failed:
    raise SystemExit(
        "❌ LessonV2Page:\n- "
        + "\n- ".join(failed)
    )

print(
    "✅ LessonV2Page: 71 → 85"
)

PY

  echo
  line
  echo " ✅ VERIFY SUCCESS"
  line

  exit 0
fi

# ============================================================
# BACKUP / ROLLBACK
# ============================================================

line
echo " 2. إنشاء النسخة الاحتياطية"
line

mkdir -p \
  "$BACKUP/content" \
  "$BACKUP/audio"

cp -a \
  "$PAGE" \
  "$BACKUP/LessonV2Page.tsx"

: > "$BACKUP/existing_content.txt"
: > "$BACKUP/audio_manifest.tsv"

for N in $LESSONS; do

  CONTENT="$CONTENT_DIR/lesson${N}.ts"

  if [ -f "$CONTENT" ]; then

    cp -a \
      "$CONTENT" \
      "$BACKUP/content/lesson${N}.ts"

    echo "$N" \
      >> "$BACKUP/existing_content.txt"

  fi


  D="$WORK/data/lesson${N}.json"

  TEACHER="$(json_field "$D" teacher)"
  AUDIO_SLUG="$(json_field "$D" audio_slug)"

  AUDIO_DIR="public/audio/teachers/${TEACHER}/${AUDIO_SLUG}"

  SAFE_NAME="lesson${N}_${TEACHER}_audio"

  if [ -d "$AUDIO_DIR" ]; then

    cp -a \
      "$AUDIO_DIR" \
      "$BACKUP/audio/$SAFE_NAME"

    printf \
      "%s\t%s\t%s\n" \
      "$N" \
      "$AUDIO_DIR" \
      "$SAFE_NAME" \
      >> "$BACKUP/audio_manifest.tsv"

  else

    printf \
      "%s\t%s\t%s\n" \
      "$N" \
      "$AUDIO_DIR" \
      "-" \
      >> "$BACKUP/audio_manifest.tsv"

  fi

done

BACKUP_READY=1

echo "✅ Backup:"
echo "$BACKUP"

restore() {

  local EXIT_CODE=$?

  if [ "$SUCCESS" -eq 1 ]; then
    return
  fi

  echo
  line
  echo " ⚠️ ROLLBACK"
  line


  if [ "$BACKUP_READY" -eq 1 ]; then

    cp -f \
      "$BACKUP/LessonV2Page.tsx" \
      "$PAGE"


    for N in $LESSONS; do

      CONTENT="$CONTENT_DIR/lesson${N}.ts"

      rm -f "$CONTENT"

      if grep -qx \
        "$N" \
        "$BACKUP/existing_content.txt"; then

        cp -a \
          "$BACKUP/content/lesson${N}.ts" \
          "$CONTENT"

      fi

    done


    while IFS=$'\t' read -r \
      N AUDIO_DIR SAFE_NAME
    do

      [ -n "$N" ] || continue

      rm -rf "$AUDIO_DIR"

      if [ "$SAFE_NAME" != "-" ]; then

        mkdir -p \
          "$(dirname "$AUDIO_DIR")"

        cp -a \
          "$BACKUP/audio/$SAFE_NAME" \
          "$AUDIO_DIR"

      fi

    done < "$BACKUP/audio_manifest.tsv"

  fi


  rm -rf "$WORK"

  echo "✅ تمت استعادة الحالة السابقة."

  exit "$EXIT_CODE"
}

trap restore ERR INT TERM

# ============================================================
# CONTENT GENERATOR
# ============================================================

create_content() {

  local N="$1"
  local D="$WORK/data/lesson${N}.json"

  local DEST="$CONTENT_DIR/lesson${N}.ts"

  python3 - \
    "$D" \
    "$DEST" \
    "$WORLD_ID" <<'PY'

from pathlib import Path
import json
import sys


data = json.load(
    open(
        sys.argv[1],
        encoding="utf-8"
    )
)

destination = Path(
    sys.argv[2]
)

world_id = sys.argv[3]


n = int(
    data["number"]
)

teacher = data[
    "teacher"
]

voice = data[
    "voice"
]

audio_slug = data[
    "audio_slug"
]

image_dir = data[
    "image_dir"
].rstrip("/")


def js(value):
    return json.dumps(
        value,
        ensure_ascii=False
    )


canonical_name = (
    f"lesson{n}CanonicalText"
)


lines = []


lines.append(
    f"export const "
    f"{canonical_name} = {{"
)


for i, text in enumerate(
    data["scene_texts"],
    start=1
):

    lines.append(
        f"  lesson{n}_s{i}: "
        f"{js(text)},"
    )


lines.append(
    "} as const;"
)

lines.append("")


lines.append(
    f"export const lesson{n} = {{"
)

lines.append(
    f'  id: "lesson{n}",'
)

lines.append(
    f'  lessonKey: "lesson{n}",'
)

lines.append(
    f"  num: {n},"
)

lines.append(
    f'  world_id: "{world_id}",'
)

lines.append(
    f'  sort_order: '
    f'{int(data["sort_order"])},'
)

lines.append(
    f"  title: "
    f'{js(data["title"])},'
)

lines.append(
    f"  title_fr: "
    f'{js(data["title_fr"])},'
)

lines.append(
    f'  teacher: "{teacher}",'
)

lines.append(
    f'  voice: "{voice}",'
)

lines.append(
    "  audio_base: "
    f'"/audio/teachers/'
    f'{teacher}/'
    f'{audio_slug}",'
)

lines.append(
    f'  exercisePath: '
    f'"/lesson-v2/{n}/exercises",'
)


lines.append(
    "  objectives: ["
)

for objective in data[
    "objectives"
]:

    lines.append(
        f"    {js(objective)},"
    )

lines.append(
    "  ],"
)


lines.append(
    "  slides: ["
)


for i in range(1, 7):

    lines.append(
        "    {"
    )

    lines.append(
        f'      key: '
        f'"lesson{n}_s{i}",'
    )

    lines.append(
        f'      audio_key: '
        f'"lesson{n}_s{i}",'
    )

    lines.append(
        f"      title: "
        f'{js(data["scene_titles"][i-1])},'
    )

    lines.append(
        f'      image: '
        f'"{image_dir}/s{i}.webp",'
    )

    lines.append(
        f'      scene_image: '
        f'"{image_dir}/s{i}.webp",'
    )

    lines.append(
        f"      text: "
        f"{canonical_name}."
        f"lesson{n}_s{i},"
    )


    if i == 6:

        lines.append(
            "      is_closing: true,"
        )

        lines.append(
            "      cta_text: "
            f'{js(data["cta_text"])},'
        )


    lines.append(
        "    },"
    )


lines.append(
    "  ],"
)

lines.append(
    "} as const;"
)

lines.append("")

lines.append(
    f"export default lesson{n};"
)

lines.append("")


destination.parent.mkdir(
    parents=True,
    exist_ok=True
)

destination.write_text(
    "\n".join(lines),
    encoding="utf-8"
)


print(
    f"✅ lesson{n}.ts"
)

PY
}

# ============================================================
# AUDIO ENGINE
# ============================================================

build_audio() {

  local N="$1"

  local D="$WORK/data/lesson${N}.json"

  local TEACHER
  local VOICE
  local RATE
  local AUDIO_SLUG

  TEACHER="$(json_field "$D" teacher)"
  VOICE="$(json_field "$D" voice)"
  RATE="$(json_field "$D" rate)"
  AUDIO_SLUG="$(json_field "$D" audio_slug)"


  local AUDIO_DIR
  AUDIO_DIR="public/audio/teachers/${TEACHER}/${AUDIO_SLUG}"


  local SYNC
  SYNC="$WORK/rebuild_lesson${N}_natural_sync.sh"


  cp -f \
    "$SYNC_REFERENCE" \
    "$SYNC"


  python3 - \
    "$SYNC" \
    "$N" \
    "$VOICE" \
    "$RATE" \
    "$AUDIO_DIR" <<'PY'

from pathlib import Path
import re
import sys


path = Path(
    sys.argv[1]
)

n = int(
    sys.argv[2]
)

voice = sys.argv[3]
rate = sys.argv[4]
audio_dir = sys.argv[5]


s = path.read_text(
    encoding="utf-8"
)


# ------------------------------------------------------------
# Reference Lesson 70 → target lesson
# ------------------------------------------------------------

s = s.replace(
    "lesson70",
    f"lesson{n}"
)


# ------------------------------------------------------------
# Force content path
# ------------------------------------------------------------

s = re.sub(
    r'^INTRO_FILE=.*$',
    (
        f'INTRO_FILE='
        f'"src/features/lesson-v2/content/'
        f'lesson{n}.ts"'
    ),
    s,
    count=1,
    flags=re.MULTILINE,
)


# ------------------------------------------------------------
# Force audio directory
# ------------------------------------------------------------

s = re.sub(
    r'^AUDIO_DIR=.*$',
    f'AUDIO_DIR="{audio_dir}"',
    s,
    count=1,
    flags=re.MULTILINE,
)


# ------------------------------------------------------------
# Voice
# ------------------------------------------------------------

s = re.sub(
    r'^VOICE\s*=\s*"[^"]+"',
    f'VOICE = "{voice}"',
    s,
    count=1,
    flags=re.MULTILINE,
)


# ------------------------------------------------------------
# Rate
# ------------------------------------------------------------

s = re.sub(
    r'^RATE\s*=\s*"[^"]+"',
    f'RATE = "{rate}"',
    s,
    count=1,
    flags=re.MULTILINE,
)


# ------------------------------------------------------------
# Unique internal backup/work names
# ------------------------------------------------------------

s = re.sub(
    r'^BACKUP="backups/[^"]+"$',
    (
        f'BACKUP="backups/'
        f'lesson{n}_natural_sync_$STAMP"'
    ),
    s,
    count=1,
    flags=re.MULTILINE,
)


s = re.sub(
    r'^WORK="\$HOME/[^"]+"$',
    (
        f'WORK="$HOME/'
        f'.lesson{n}_natural_sync_$STAMP"'
    ),
    s,
    count=1,
    flags=re.MULTILINE,
)


# ------------------------------------------------------------
# Safety: no Small City intro audio keys allowed
# ------------------------------------------------------------

if (
    "small_city_intro_natural_v1_"
    in s
):
    raise SystemExit(
        "❌ بقي مفتاح "
        "small_city_intro_natural_v1_ "
        "في المحرك المشتق."
    )


expected_key = (
    f'key = f"lesson{n}_s'
    '{index}"'
)


if expected_key not in s:

    raise SystemExit(
        "❌ Final verifier "
        "لم يتحول إلى مفتاح الدرس."
    )


canonical = (
    f"lesson{n}CanonicalText"
)


if canonical not in s:

    raise SystemExit(
        "❌ CanonicalText parser "
        "لم يتحول للدرس."
    )



# ------------------------------------------------------------
# BATCH CHILD: DISABLE NPM BUILD AND DEV
# ------------------------------------------------------------
#
# rebuild_lesson70_natural_sync.sh هو Reference Implementation
# ويحتوي في نهايته على build/dev لاختبار درس منفرد.
#
# عند تشغيل 71→85 جماعيًا:
#
# - الصوت والتحقق يبقيان داخل child script.
# - npm run build ينفذ مرة واحدة فقط في المحرك الأب.
# - npm run dev ممنوع داخل child script لأنه يحجز العملية.
# ------------------------------------------------------------

s, child_build_count = re.subn(
    r'(?m)^[ \t]*npm[ \t]+run[ \t]+build[^\n]*$',
    'echo "ℹ️ Child build skipped — final build is handled by batch engine."',
    s,
)

s, child_dev_count = re.subn(
    r'(?m)^[ \t]*npm[ \t]+run[ \t]+dev[^\n]*$',
    'echo "ℹ️ Child dev server skipped in batch mode."',
    s,
)

if child_build_count < 1:
    raise SystemExit(
        "❌ لم أجد npm run build داخل Reference audio script."
    )

if child_dev_count < 1:
    raise SystemExit(
        "❌ لم أجد npm run dev داخل Reference audio script."
    )

print(
    f"✅ Lesson {n}: "
    f"disabled child build={child_build_count}, "
    f"child dev={child_dev_count}"
)

path.write_text(
    s,
    encoding="utf-8"
)


print(
    f"✅ Audio engine lesson {n}"
)

PY


  chmod +x "$SYNC"

  bash -n "$SYNC"


  echo
  echo "🎙️ Lesson $N"
  echo "Teacher : $TEACHER"
  echo "Voice   : $VOICE"
  echo "Rate    : $RATE"
  echo "Audio   : $AUDIO_DIR"
  echo


  bash "$SYNC"
}

# ============================================================
# BUILD EACH LESSON
# ============================================================

line
echo " 3. إنشاء الدروس"
line

for N in $LESSONS; do

  echo
  line
  echo " LESSON $N"
  line

  create_content "$N"

  build_audio "$N"

  verify_lesson "$N"

done

# ============================================================
# PATCH LessonV2Page ONCE
# ============================================================

line
echo " 4. ربط الدروس في LessonV2Page"
line

python3 - \
  "$PAGE" \
  "$MODE" \
  "${ONE_LESSON:-0}" <<'PY'

from pathlib import Path
import re
import sys


path = Path(
    sys.argv[1]
)

mode = sys.argv[2]
one = int(sys.argv[3])


targets = (
    [one]
    if mode == "one"
    else list(range(71, 86))
)


s = path.read_text(
    encoding="utf-8"
)


# ============================================================
# IMPORTS
# ============================================================

missing_imports = []


for n in targets:

    statement = (
        f'import {{ lesson{n} '
        f'as LESSON_{n}_CONTENT }} '
        f'from '
        f'"../features/lesson-v2/content/'
        f'lesson{n}";'
    )

    if statement not in s:
        missing_imports.append(
            statement
        )


if missing_imports:

    lines = s.splitlines()

    lesson_import_indexes = []

    pattern = re.compile(
        r'import\s+\{\s*lesson\d+\s+'
        r'as\s+LESSON_\d+_CONTENT'
    )


    for index, line in enumerate(lines):

        if pattern.search(line):
            lesson_import_indexes.append(
                index
            )


    if not lesson_import_indexes:
        raise SystemExit(
            "❌ لم أجد imports الدروس."
        )


    insert_at = (
        max(
            lesson_import_indexes
        )
        + 1
    )


    lines[
        insert_at:insert_at
    ] = missing_imports


    s = "\n".join(lines) + (
        "\n"
        if s.endswith("\n")
        else ""
    )


# ============================================================
# MAP
# ============================================================

missing_maps = []


for n in targets:

    mapping = (
        f"  lesson{n}: "
        f"LESSON_{n}_CONTENT,"
    )

    if mapping not in s:
        missing_maps.append(
            mapping
        )


if missing_maps:

    lines = s.splitlines()

    map_indexes = []

    pattern = re.compile(
        r'^\s*lesson\d+\s*:\s*'
        r'LESSON_\d+_CONTENT\s*,'
    )


    for index, line in enumerate(lines):

        if pattern.search(line):
            map_indexes.append(
                index
            )


    if not map_indexes:
        raise SystemExit(
            "❌ لم أجد LESSONS_MAP."
        )


    insert_at = (
        max(
            map_indexes
        )
        + 1
    )


    lines[
        insert_at:insert_at
    ] = missing_maps


    s = "\n".join(lines) + (
        "\n"
        if s.endswith("\n")
        else ""
    )


path.write_text(
    s,
    encoding="utf-8"
)


for n in targets:

    imp = (
        f"lesson{n} as "
        f"LESSON_{n}_CONTENT"
    )

    mapping = (
        f"lesson{n}: "
        f"LESSON_{n}_CONTENT"
    )


    if imp not in s:
        raise SystemExit(
            f"❌ import lesson{n}"
        )


    if mapping not in s:
        raise SystemExit(
            f"❌ map lesson{n}"
        )


print(
    "✅ LessonV2Page updated."
)

PY

# ============================================================
# FINAL VERIFY SELECTED
# ============================================================

line
echo " 5. التحقق النهائي"
line

LESSON_COUNT=0
SCENE_COUNT=0

for N in $LESSONS; do

  verify_lesson "$N"

  LESSON_COUNT=$((LESSON_COUNT + 1))

  SCENE_COUNT=$((SCENE_COUNT + 6))

done

# ============================================================
# BUILD ONCE
# ============================================================

line
echo " 6. npm run build"
line

npm run build

# ============================================================
# SUCCESS
# ============================================================

SUCCESS=1

trap - ERR INT TERM

rm -rf "$WORK"

echo
line
echo " SMALL CITY WORLD — FINAL REPORT"
line
echo
echo "Lessons          : $LESSON_COUNT"
echo "Scenes           : $SCENE_COUNT"
echo "Images           : $SCENE_COUNT"
echo "MP3              : $SCENE_COUNT"
echo "JSON             : $SCENE_COUNT"
echo "Karaoke JSON     : $SCENE_COUNT"
echo "Canonical Sync   : $SCENE_COUNT"
echo
echo "LessonV2Page     : ✅"
echo "npm run build    : ✅"
echo
echo "Backup:"
echo "$BACKUP"
echo
echo "Git push         : ❌ NO"
echo "Supabase         : ❌ NO"
echo
line
echo " ✅ ALL REQUESTED LESSONS READY"
line
