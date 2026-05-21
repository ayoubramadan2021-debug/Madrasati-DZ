import os

def check_file_exports(path):
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()
        print(f"--- فحص ملف {path} ---")
        if "export default" in content:
            print("💡 نوع التصدير: export default")
        elif "export function" in content or "export const" in content:
            print("💡 نوع التصدير: Named Export (تصدير مسمى)")
        else:
            print("⚠️ تحذير: لم يتم العثور على كلمة export واضحة للمكون!")
    else:
        print(f"❌ ملف {path} غير موجود!")

check_file_exports("src/pages/Home.tsx")
check_file_exports("src/pages/AiTutorPage.tsx")
