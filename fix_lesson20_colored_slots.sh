#!/data/data/com.termux/files/usr/bin/bash
set -e
cd "$HOME/madrasati-dz"

echo "===== تلوين الأرقام المختارة داخل الخانات الفارغة ====="

python - <<'PY'
from pathlib import Path

# 1) NumberChoice: الخانة ? تأخذ لون الاختيار الصحيح
p = Path("src/features/lesson-v2/exercises-v2/NumberChoiceExerciseV2.tsx")
txt = p.read_text(encoding="utf-8")

txt = txt.replace(
'''                  background: n === "?" ? "#fff" : palette[i % palette.length],
                  color: n === "?" ? C.gold : "#fff",
                  border: n === "?" ? `4px dashed ${C.gold}` : "4px solid white",''',
'''                  background: n === "?" && filled ? optionColor(item.correct, item.options) : n === "?" ? "#fff" : palette[i % palette.length],
                  color: n === "?" && filled ? "#fff" : n === "?" ? C.gold : "#fff",
                  border: n === "?" && filled ? "4px solid white" : n === "?" ? `4px dashed ${C.gold}` : "4px solid white",'''
)

if "function optionColor" not in txt:
    txt = txt.replace(
'''const palette = [C.red, C.gold, C.green, C.blue, C.purple, C.pink];''',
'''const palette = [C.red, C.gold, C.green, C.blue, C.purple, C.pink];

function optionColor(value: string, options: string[]) {
  const index = options.indexOf(value);
  return palette[(index < 0 ? 0 : index) % palette.length];
}'''
    )

p.write_text(txt, encoding="utf-8")
print("✅ NumberChoiceExerciseV2")

# 2) NumberSort: كل رقم مختار داخل الخانة يأخذ نفس لون بطاقته
p = Path("src/features/lesson-v2/exercises-v2/NumberSortExerciseV2.tsx")
txt = p.read_text(encoding="utf-8")

if "function numberColor" not in txt:
    txt = txt.replace(
'''const palette = [C.red, C.gold, C.green, C.blue, C.purple, C.pink];''',
'''const palette = [C.red, C.gold, C.green, C.blue, C.purple, C.pink];

function numberColor(value: string, numbers: string[]) {
  const index = numbers.indexOf(value);
  return palette[(index < 0 ? 0 : index) % palette.length];
}'''
    )

txt = txt.replace(
'''<div key={i} style={styles.slot}>{selected[i] ?? ""}</div>''',
'''<div
                key={i}
                style={{
                  ...styles.slot,
                  background: selected[i] ? numberColor(selected[i], item.numbers) : "#FFF9E8",
                  color: selected[i] ? "#fff" : C.navy,
                  border: selected[i] ? "4px solid white" : `4px dashed ${C.gold}`,
                  boxShadow: selected[i] ? "0 8px 14px #0002" : "none",
                }}
              >
                {selected[i] ?? ""}
              </div>'''
)

p.write_text(txt, encoding="utf-8")
print("✅ NumberSortExerciseV2")
PY

echo ""
echo "===== تحقق ====="
grep -n "optionColor\|numberColor\|selected\\[i\\]" \
src/features/lesson-v2/exercises-v2/NumberChoiceExerciseV2.tsx \
src/features/lesson-v2/exercises-v2/NumberSortExerciseV2.tsx

echo ""
echo "===== Build ====="
npm run build

echo ""
echo "===== Git status ====="
git status --short
