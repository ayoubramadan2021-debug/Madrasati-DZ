from pathlib import Path

# تحديث Layout.jsx
layout = Path("src/components/Layout.jsx")

text = layout.read_text()

text = text.replace(
'الإصدار 1.0.0',
'{t.versionLabel} 1.0.0'
)

layout.write_text(text)

# تحديث translations.js
translations = Path("src/i18n/translations.js")

txt = translations.read_text()

# العربية
txt = txt.replace(
'searchPlaceholder:',
'versionLabel: "الإصدار",\n    searchPlaceholder:',
1
)

# الإنجليزية
txt = txt.replace(
'searchPlaceholder:',
'versionLabel: "Version",\n    searchPlaceholder:',
1
)

# الفرنسية
txt = txt.replace(
'searchPlaceholder:',
'versionLabel: "Version",\n    searchPlaceholder:',
1
)

translations.write_text(txt)

print("✅ Version translation fixed.")
