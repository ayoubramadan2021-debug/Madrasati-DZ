import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../services/authService";
import { getProfile } from "../services/profileService";
import { supabase } from "../lib/supabaseClient";

const CSS = [
"@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800;900&display=swap');",
".pd-root *,.pd-root *::before,.pd-root *::after{box-sizing:border-box;margin:0;padding:0}",
".pd-root{min-height:100dvh;background:var(--bg);font-family:'Tajawal',sans-serif;direction:rtl;overflow-x:hidden;position:relative;padding-bottom:100px}",
".pd-orb{position:fixed;pointer-events:none;border-radius:50%;z-index:0}",
".pd-ob{width:480px;height:480px;top:-180px;left:-120px;background:radial-gradient(circle,rgba(27,58,107,.6) 0%,transparent 70%)}",
".pd-og{width:360px;height:360px;bottom:-100px;right:-80px;background:radial-gradient(circle,rgba(232,160,32,.13) 0%,transparent 70%)}",
".pd-grid{position:fixed;inset:0;pointer-events:none;z-index:0;background-image:linear-gradient(rgba(255,255,255,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px);background-size:44px 44px}",
".pd-content{position:relative;z-index:2}",
".pd-hero{position:relative;padding:24px 20px 24px;text-align:center}",
".pd-back{position:absolute;top:20px;right:16px;background:var(--border-faint);border:1px solid var(--border);color:var(--text);border-radius:12px;padding:8px 14px;font-size:13px;font-weight:700;cursor:pointer;font-family:'Tajawal',sans-serif}",
".pd-logo{position:relative;display:inline-flex;align-items:center;justify-content:center;width:80px;height:80px;margin:8px 0 10px}",
".pd-logo-bg{position:absolute;inset:0;border-radius:24px;background:linear-gradient(145deg,#1a3d73,#0c1e3a);border:1px solid rgba(232,160,32,.4);box-shadow:var(--shadow-strong)}",
".pd-logo-em{position:relative;font-size:40px}",
".pd-title{font-size:23px;font-weight:900;line-height:1;margin-bottom:6px;background:linear-gradient(135deg,#fff 25%,var(--gold) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}",
".pd-sub{font-size:13px;color:var(--text-faint)}",
".pd-body{padding:0 16px}",
".pd-state{text-align:center;padding:50px 20px;color:var(--text-faint);font-size:15px}",
".pd-card{background:var(--surface);border:1px solid var(--border);border-radius:18px;padding:20px;margin-bottom:16px;box-shadow:var(--shadow-hero)}",
".pd-name{font-size:18px;font-weight:800;color:var(--text);margin-bottom:4px}",
".pd-gradeline{font-size:13px;color:var(--text-muted);margin-bottom:16px}",
".pd-grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:18px}",
".pd-stat{background:var(--surface-softer);border:1px solid var(--border-soft);border-radius:14px;padding:14px 8px;text-align:center}",
".pd-stat-em{font-size:28px;margin-bottom:5px}",
".pd-stat-n{font-size:22px;font-weight:900;color:var(--gold);line-height:1}",
".pd-stat-l{font-size:11px;color:var(--text-muted);margin-top:4px}",
".pd-sec{font-size:15px;font-weight:800;color:var(--gold);margin-bottom:10px}",
".pd-empty{font-size:13px;color:var(--text-faint)}",
".pd-act{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:12px;padding:12px 14px;margin-bottom:8px;display:flex;justify-content:space-between;align-items:center}",
".pd-act-id{font-size:13px;font-weight:600;color:var(--text)}",
".pd-act-pts{font-size:13px;font-weight:700;color:#4ade80}",
".pd-deny{min-height:100dvh;background:var(--bg);color:var(--text);display:grid;place-items:center;text-align:center;padding:30px;font-family:'Tajawal',sans-serif;direction:rtl}",
].join("\n");

function ParentDashboardPage() {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const u = await getCurrentUser();
      if (!u) { setAuthorized(false); return; }
      const prof = await getProfile(u.id);
      if (prof?.role === "parent" || prof?.role === "admin") {
        setAuthorized(true);
        await loadDashboard(u);
      } else {
        setAuthorized(false);
      }
    })();
  }, []);

  async function loadDashboard(currentUser: any) {
    setLoading(true);
    const { data: links } = await supabase
      .from("parent_links")
      .select("*")
      .eq("parent_email", currentUser.email);

    const results: any[] = [];
    for (const link of links || []) {
      const { data: profile } = await supabase.from("profiles").select("*").eq("id", link.student_id).single();
      const { data: progress } = await supabase.from("progress").select("*").eq("user_id", link.student_id);
      const totalPoints = (progress || []).reduce((s, i) => s + Number(i.points || 0), 0);
      const exercises = (progress || []).filter((i) => String(i.lesson_id || "").includes("exercise")).length;
      const quizzes = (progress || []).filter((i) => String(i.lesson_id || "").includes("quiz")).length;
      results.push({ profile, progress: progress || [], totalPoints, exercises, quizzes });
    }
    setStudents(results);
    setLoading(false);
  }

  if (authorized === null) {
    return <div className="pd-deny" style={{ color: "var(--gold)" }}>... جاري التحقق</div>;
  }
  if (authorized === false) {
    return (
      <div className="pd-deny">
        <div>
          <div style={{ fontSize: 60, marginBottom: 16 }}>🔒</div>
          <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>غير مصرّح لك</div>
          <div style={{ color: "var(--text-muted)", fontSize: 14 }}>هذه الصفحة مخصّصة لأولياء الأمور</div>
          <button onClick={() => navigate("/")} style={{ marginTop: 20, padding: "12px 24px", border: "none", borderRadius: 12, background: "linear-gradient(135deg,var(--gold),var(--gold-deep))", color: "#000", fontFamily: "Tajawal,sans-serif", fontWeight: 800, fontSize: 14 }}>العودة للرئيسية</button>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{CSS}</style>
      <div className="pd-root">
        <div className="pd-orb pd-ob" /><div className="pd-orb pd-og" /><div className="pd-grid" />
        <div className="pd-content">
          <div className="pd-hero">
            <button className="pd-back" onClick={() => navigate("/")}>← رجوع</button>
            <div className="pd-logo"><div className="pd-logo-bg" /><span className="pd-logo-em">👨‍👩‍👧</span></div>
            <h1 className="pd-title">لوحة وليّ الأمر</h1>
            <div className="pd-sub">متابعة تقدم الأبناء</div>
          </div>
          <div className="pd-body">
            {loading ? (
              <div className="pd-state">... جاري تحميل لوحة المتابعة</div>
            ) : students.length === 0 ? (
              <div className="pd-state">لا يوجد أبناء مرتبطون بهذا البريد بعد.</div>
            ) : (
              students.map((student, index) => (
                <div key={index} className="pd-card">
                  <div className="pd-name">👤 {student.profile?.full_name || "تلميذ بدون اسم"}</div>
                  <div className="pd-gradeline">السنة الدراسية: {student.profile?.grade || 1}</div>
                  <div className="pd-grid3">
                    <div className="pd-stat"><div className="pd-stat-em">⭐</div><div className="pd-stat-n">{student.totalPoints}</div><div className="pd-stat-l">النقاط</div></div>
                    <div className="pd-stat"><div className="pd-stat-em">✍️</div><div className="pd-stat-n">{student.exercises}</div><div className="pd-stat-l">تمارين</div></div>
                    <div className="pd-stat"><div className="pd-stat-em">📝</div><div className="pd-stat-n">{student.quizzes}</div><div className="pd-stat-l">اختبارات</div></div>
                  </div>
                  <div className="pd-sec">🕒 آخر النشاطات</div>
                  {student.progress.length === 0 ? (
                    <div className="pd-empty">لا يوجد نشاط بعد.</div>
                  ) : (
                    student.progress.slice(0, 5).map((item: any) => (
                      <div key={item.id} className="pd-act">
                        <span className="pd-act-id">{item.lesson_id}</span>
                        <span className="pd-act-pts">+{item.points} نقطة</span>
                      </div>
                    ))
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ParentDashboardPage;
