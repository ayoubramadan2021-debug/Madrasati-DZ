#!/data/data/com.termux/files/usr/bin/bash
set -e

PROJECT="$HOME/madrasati-dz"
cd "$PROJECT"

echo "===== تحقق أولي ====="
[ -f package.json ] || { echo "❌ لست داخل المشروع"; exit 1; }

SRC_DIR="/sdcard/Pictures"
OUT_IMG="public/lessons/v2/lesson18-position"
OUT_AUDIO="public/audio/lesson_18_positions"

mkdir -p "$OUT_IMG" "$OUT_AUDIO"

echo ""
echo "===== 1) تحقق من صور S1-S6 ====="
for n in 1 2 3 4 5 6; do
  if [ ! -f "$SRC_DIR/S$n.png" ]; then
    echo "❌ الصورة غير موجودة: $SRC_DIR/S$n.png"
    echo "إذا لم تظهر الصور، نفذ: termux-setup-storage"
    exit 1
  fi
  echo "✅ موجودة: S$n.png"
done

echo ""
echo "===== 2) ضغط الصور إلى webp ====="
for n in 1 2 3 4 5 6; do
  in="$SRC_DIR/S$n.png"
  out="$OUT_IMG/s$n.webp"

  if command -v cwebp >/dev/null 2>&1; then
    cwebp -q 82 "$in" -o "$out" >/dev/null
  elif command -v magick >/dev/null 2>&1; then
    magick "$in" -resize 1024x1536\> -quality 82 "$out"
  elif command -v convert >/dev/null 2>&1; then
    convert "$in" -resize 1024x1536\> -quality 82 "$out"
  else
    echo "❌ لا توجد أداة ضغط صور: cwebp أو magick أو convert"
    exit 1
  fi

  echo "✅ $out"
done

echo ""
echo "===== 3) إنشاء lesson18.ts ====="
cat > src/features/lesson-v2/content/lesson18.ts <<'TS'
export const LESSON_18_CONTENT = {
  metadata: {
    title_ar: "أُعَيِّنُ المَوْقِعَ فِي الفَضَاءِ",
    title_fr: "Je situe dans l’espace",
    subject: "math",
    grade: 1,
    sort_order: 18,
    template_version: 2,
  },

  audio_base: "/audio/lesson_18_positions",

  scenes: [
    {
      scene_image: "/lessons/v2/lesson18-position/s1.webp",
      audio_key: "s1_intro",
      text: "مَرْحَبًا أَطْفَالِي. اليَوْمَ سَنَتَعَلَّمُ كَيْفَ نُحَدِّدُ مَكَانَ الشَّيْءِ فِي الفَضَاءِ.",
    },
    {
      scene_image: "/lessons/v2/lesson18-position/s2.webp",
      audio_key: "s2_right_left",
      text: "أَنْظُرُ إِلَى الطِّفْلِ. القِطُّ عَنْ يَمِينِهِ، وَالكَلْبُ عَنْ يَسَارِهِ.",
    },
    {
      scene_image: "/lessons/v2/lesson18-position/s3.webp",
      audio_key: "s3_above_below",
      text: "أَنْظُرُ إِلَى الطَّاوِلَةِ. الكِتَابُ فَوْقَ الطَّاوِلَةِ، وَالكُرَةُ تَحْتَ الطَّاوِلَةِ.",
    },
    {
      scene_image: "/lessons/v2/lesson18-position/s4.webp",
      audio_key: "s4_front_behind",
      text: "أَنْظُرُ إِلَى الكُرْسِيِّ. الطِّفْلُ أَمَامَ الكُرْسِيِّ، وَالحَقِيبَةُ خَلْفَ الكُرْسِيِّ.",
    },
    {
      scene_image: "/lessons/v2/lesson18-position/s5.webp",
      audio_key: "s5_inside_outside",
      text: "أَنْظُرُ إِلَى الصُّنْدُوقِ. الكُرَةُ دَاخِلَ الصُّنْدُوقِ، وَالدُّمْيَةُ خَارِجَ الصُّنْدُوقِ.",
    },
    {
      scene_image: "/lessons/v2/lesson18-position/s6.webp",
      audio_key: "s6_closing",
      text: "أَحْسَنْتُمْ. تَعَلَّمْنَا كَلِمَاتِ المَوْقِعِ: يَمِين، يَسَار، فَوْق، تَحْت، أَمَام، خَلْف، دَاخِل، خَارِج.",
      is_closing: true,
      cta_text: "هَيَّا إِلَى التَّمَارِين ←",
    },
  ],
};
TS

echo "✅ تم إنشاء lesson18.ts"

echo ""
echo "===== 4) توليد صوت تالين والكاريـوكي ====="
python - <<'PY'
import asyncio, json, pathlib, shutil, subprocess, sys, re

OUT = pathlib.Path("public/audio/lesson_18_positions")
OUT.mkdir(parents=True, exist_ok=True)

VOICE = "ar-DZ-AminaNeural"

texts = {
    "s1_intro": "مَرْحَبًا أَطْفَالِي. اليَوْمَ سَنَتَعَلَّمُ كَيْفَ نُحَدِّدُ مَكَانَ الشَّيْءِ فِي الفَضَاءِ.",
    "s2_right_left": "أَنْظُرُ إِلَى الطِّفْلِ. القِطُّ عَنْ يَمِينِهِ، وَالكَلْبُ عَنْ يَسَارِهِ.",
    "s3_above_below": "أَنْظُرُ إِلَى الطَّاوِلَةِ. الكِتَابُ فَوْقَ الطَّاوِلَةِ، وَالكُرَةُ تَحْتَ الطَّاوِلَةِ.",
    "s4_front_behind": "أَنْظُرُ إِلَى الكُرْسِيِّ. الطِّفْلُ أَمَامَ الكُرْسِيِّ، وَالحَقِيبَةُ خَلْفَ الكُرْسِيِّ.",
    "s5_inside_outside": "أَنْظُرُ إِلَى الصُّنْدُوقِ. الكُرَةُ دَاخِلَ الصُّنْدُوقِ، وَالدُّمْيَةُ خَارِجَ الصُّنْدُوقِ.",
    "s6_closing": "أَحْسَنْتُمْ. تَعَلَّمْنَا كَلِمَاتِ المَوْقِعِ: يَمِين، يَسَار، فَوْق، تَحْت، أَمَام، خَلْف، دَاخِل، خَارِج.",
}

try:
    import edge_tts
except Exception:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "edge-tts"])
    import edge_tts

def fallback_words(text):
    words = re.findall(r"[\u0600-\u06FF]+", text)
    out, offset = [], 0
    for w in words:
        dur = max(320, min(900, len(w) * 115))
        out.append({"text": w, "offset": offset, "duration": dur})
        offset += dur + 25
    return out

async def make_one(key, text):
    mp3 = OUT / f"{key}.mp3"
    js = OUT / f"{key}.json"

    communicate = edge_tts.Communicate(text, VOICE)
    words = []

    with open(mp3, "wb") as f:
        async for chunk in communicate.stream():
            if chunk["type"] == "audio":
                f.write(chunk["data"])
            elif chunk["type"] == "WordBoundary":
                words.append({
                    "text": chunk.get("text", ""),
                    "offset": int(chunk["offset"] / 10000),
                    "duration": int(chunk["duration"] / 10000),
                })

    if not words:
        words = fallback_words(text)

    js.write_text(json.dumps(words, ensure_ascii=False, indent=2), encoding="utf-8")
    print("✅", mp3, js)

async def main():
    for k, t in texts.items():
        await make_one(k, t)

asyncio.run(main())
PY

echo ""
echo "===== تحقق نهائي ====="
ls -lh "$OUT_IMG"
echo ""
ls -lh "$OUT_AUDIO"
echo ""
grep -n "audio_base\|scene_image\|audio_key\|text" src/features/lesson-v2/content/lesson18.ts

echo ""
echo "===== Git status ====="
git status --short
