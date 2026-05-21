import os
import re

print("\n🔍 === بدء الفحص البرمجي الذكي لمشروعك === 🔍\n")

# 1. فحص ملف App.tsx عن قرب لمعرفة ما يستورده
app_path = "src/App.tsx"
if os.path.exists(app_path):
    print(f"✅ ملف {app_path} موجود. جاري فحص الاستيرادات...")
    with open(app_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # البحث عن كل الأسطر التي تحتوي على import ومن أين
    imports = re.findall(r'import\s+.*\s+from\s+[\'"](.*)[\'"]', content)
    for imp in imports:
        if imp.startswith("."):
            # تحويل المسار النسبي إلى مسار حقيقي محتمل
            base_dir = "src"
            exts = [".tsx", ".ts", ".jsx", ".js", "/index.tsx", "/index.ts"]
            resolved = False
            
            # محاولة تخمين المسار
            clean_imp = imp.replace("../", "").replace("./", "")
            if imp.startswith("./pages") or imp.startswith("../pages"):
                test_path = os.path.join("src", "pages", clean_imp.split("/")[-1])
            elif "components" in imp:
                test_path = os.path.join("src", "shared", "components", clean_imp.split("/")[-1])
            else:
                test_path = os.path.join("src", clean_imp)
                
            for ext in exts:
                if os.path.exists(test_path + ext) or os.path.isdir(test_path):
                    resolved = True
                    break
            
            # إذا لم يجد الملف المستورد سيعطيك تحذيراً فورياً
            if not resolved:
                print(f"❌ خطأ فادح: الملف المستورد '{imp}' داخل App.tsx غير موجود في المجلدات!")
else:
    print(f"❌ خطأ فادح: ملف {app_path} غير موجود بالكامل!")

# 2. فحص الأخطاء داخل مجلد المكونات
pages_dir = "src/pages"
if os.path.exists(pages_dir):
    print(f"\n📂 المكونات الموجودة في {pages_dir}: {os.listdir(pages_dir)}")
else:
    print(f"❌ تحذير: مجلد {pages_dir} غير موجود!")

print("\n🏁 === انتهاء الفحص الذاتي === 🏁\n")
