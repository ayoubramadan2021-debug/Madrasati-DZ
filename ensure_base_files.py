import os

# التأكد من وجود المجلدات الأساسية
os.makedirs("src/pages", exist_ok=True)
os.makedirs("src/shared/components", exist_ok=True)

# 1. التأكد من وجود ملف صفحة Home.tsx كحد أدنى
if not os.path.exists("src/pages/Home.tsx"):
    with open("src/pages/Home.tsx", "w", encoding="utf-8") as f:
        f.write('''export default function Home() {
  return (
    <div style={{ padding: 20, textAlign: "center", fontFamily: "sans-serif" }}>
      <h1>مرحباً بك في تطبيق تعليم ديزاد 🎓</h1>
      <p>التطبيق يعمل بشكل مستقر الآن!</p>
    </div>
  );
}''')
    print("🆕 تم إنشاء صفحة Home.tsx احتياطية.")

# 2. التأكد من وجود ملف صفحة AiTutorPage.tsx كحد أدنى
if not os.path.exists("src/pages/AiTutorPage.tsx"):
    with open("src/pages/AiTutorPage.tsx", "w", encoding="utf-8") as f:
        f.write('''export default function AiTutorPage() {
  return <div style={{ padding: 20, textAlign: "center" }}>صفحة المعلم الذكي</div>;
}''')
    print("🆕 تم إنشاء صفحة AiTutorPage.tsx احتياطية.")

# 3. التأكد من وجود شريط التنقل السفلي BottomNav.tsx كحد أدنى
if not os.path.exists("src/shared/components/BottomNav.tsx"):
    with open("src/shared/components/BottomNav.tsx", "w", encoding="utf-8") as f:
        f.write('''export default function BottomNav() {
  return <div style={{ position:"fixed", bottom:0, width:"100%", background:"#eee", padding:10, textAlign:"center" }}>شريط التنقل</div>;
}''')
    print("🆕 تم إنشاء شريط BottomNav.tsx احتياطي.")

print("✅ فحص الملفات الأساسية اكتمل.")
