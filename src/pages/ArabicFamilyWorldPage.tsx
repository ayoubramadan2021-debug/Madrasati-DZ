import { useNavigate } from "react-router-dom";


const LESSON_BADGE_STYLE = {
  width: 46,
  minWidth: 46,
  maxWidth: 46,

  height: 46,
  minHeight: 46,
  maxHeight: 46,

  borderRadius: 14,

  background: "linear-gradient(135deg, #F8C94A 0%, #EEB432 100%)",
  color: "#17365F",

  display: "grid",
  placeItems: "center",

  padding: 0,
  margin: 0,

  fontFamily: "Arial, Tajawal, Cairo, sans-serif",
  fontSize: 24,
  fontWeight: 900,
  lineHeight: 1,
  textAlign: "center",
  fontVariantNumeric: "tabular-nums",

  boxSizing: "border-box",

  flex: "0 0 46px",
  flexGrow: 0,
  flexShrink: 0,

  border: "1px solid rgba(255,255,255,0.10)",
  boxShadow: "0 4px 14px rgba(246,185,39,.22)",
};


function LessonBadge({ number }: { number: number }) {
  return (
    <div style={LESSON_BADGE_STYLE}>
      {number}
    </div>
  );
}




const C = {
  navy: "#0f2447",
  navy2: "#17365f",
  gold: "#e8a020",
  cream: "#fff8ec",
  white: "#ffffff",
  muted: "#7f8da3",
};

export default function ArabicFamilyWorldPage() {
  const navigate = useNavigate();

  return (
    <div
      dir="rtl"
      style={{
        minHeight: "100dvh",
        background:
          "radial-gradient(circle at 85% 0%,rgba(232,160,32,.18),transparent 34%),linear-gradient(180deg,#071426 0%,#0c1f39 58%,#102746 100%)",
        color: C.white,
        fontFamily: "'Tajawal','Noto Kufi Arabic',Arial,sans-serif",
        padding: "max(24px,env(safe-area-inset-top)) 16px calc(110px + env(safe-area-inset-bottom))",
        boxSizing: "border-box",
      }}
    >
      <div style={{ width: "100%", maxWidth: 720, margin: "0 auto" }}>
        <button
          onClick={() => navigate("/grade/1/subject/arabic")}
          style={{
            border: "1px solid rgba(255,255,255,.13)",
            background: "rgba(255,255,255,.07)",
            color: C.white,
            borderRadius: 12,
            padding: "9px 14px",
            fontFamily: "inherit",
            fontWeight: 800,
            cursor: "pointer",
          }}
        >
          ← رجوع
        </button>

        <section style={{ textAlign: "center", padding: "28px 8px 24px" }}>
          <div
            style={{
              width: 86,
              height: 86,
              margin: "0 auto 14px",
              display: "grid",
              placeItems: "center",
              borderRadius: 26,
              background:
                "linear-gradient(145deg,rgba(232,160,32,.22),rgba(255,255,255,.06))",
              border: "1px solid rgba(232,160,32,.42)",
              fontSize: 42,
              boxShadow: "0 16px 42px rgba(0,0,0,.28)",
            }}
          >
            🏡
          </div>
          <h1 style={{ margin: 0, fontSize: "clamp(28px,7vw,42px)", fontWeight: 950 }}>
            عائلتي
          </h1>
          <p style={{ margin: "8px 0 0", color: "#b8c5d8", fontWeight: 700 }}>
            اللغة العربية • السنة الأولى
          </p>
        </section>

        <div style={{ display: "grid", gap: 14 }}>
                <button
        type="button"
        onClick={() => navigate("/lesson-v2/arabic/lesson01")}

        style={{
          width: "100%",
          background: "var(--surface-2)",
          border: "1px solid var(--border-soft)",
          borderRadius: 16,
          padding: "16px 18px",
          display: "flex",
          alignItems: "center",
          gap: 14,
          cursor: "pointer",
          boxShadow: "0 4px 16px rgba(0,0,0,.3)",
          color: "#fff",
          fontFamily: "inherit",
          textAlign: "right",
          marginTop: 18,
        }}
      >
        <LessonBadge number={1} />

        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              color: "var(--text-muted)",
              fontSize: 13,
              fontWeight: 700,
              marginBottom: 6,
              letterSpacing: ".3px",
            }}
          >
            الدرس 1 • اللغة العربية
          </div>

          <div
            style={{
                  fontWeight: 900,
                  color: "#fff",
                  fontSize: 20,
                  lineHeight: 1.35,
                  textShadow:
                    "0 1px 0 #17365F, 1px 0 0 #17365F, -1px 0 0 #17365F, 0 -1px 0 #17365F",
                }}
          >
            مرحبا أنا فاضل
          </div>
        </div>

        <div
          aria-hidden="true"

              style={{
                width: 11,
                height: 11,
                borderLeft: "2.5px solid var(--gold)",
                borderBottom: "2.5px solid var(--gold)",
                transform: "rotate(45deg)",
                flexShrink: 0,
                marginLeft: 4,
              }}
        />
      </button>
        </div>



            <button
        type="button"
        onClick={() => navigate("/lesson-v2/islamic/lesson02")}

        style={{
          width: "100%",
          background: "var(--surface-2)",
          border: "1px solid var(--border-soft)",
          borderRadius: 16,
          padding: "16px 18px",
          display: "flex",
          alignItems: "center",
          gap: 14,
          cursor: "pointer",
          boxShadow: "0 4px 16px rgba(0,0,0,.3)",
          color: "#fff",
          fontFamily: "inherit",
          textAlign: "right",
          marginTop: 18,
        }}
      >
        <LessonBadge number={2} />

        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              color: "var(--text-muted)",
              fontSize: 13,
              fontWeight: 700,
              marginBottom: 6,
              letterSpacing: ".3px",
            }}
          >
            الدرس 2 • التربية الإسلامية
          </div>

          <div
            style={{
                  fontWeight: 900,
                  color: "#fff",
                  fontSize: 20,
                  lineHeight: 1.35,
                  textShadow:
                    "0 1px 0 #17365F, 1px 0 0 #17365F, -1px 0 0 #17365F, 0 -1px 0 #17365F",
                }}
          >
            أطيع والدي
          </div>
        </div>

        <div
          aria-hidden="true"

              style={{
                width: 11,
                height: 11,
                borderLeft: "2.5px solid var(--gold)",
                borderBottom: "2.5px solid var(--gold)",
                transform: "rotate(45deg)",
                flexShrink: 0,
                marginLeft: 4,
              }}
        />
      </button>



            <button
        type="button"
        onClick={() => navigate("/lesson-v2/arabic/lesson03")}

        style={{
          width: "100%",
          background: "var(--surface-2)",
          border: "1px solid var(--border-soft)",
          borderRadius: 16,
          padding: "16px 18px",
          display: "flex",
          alignItems: "center",
          gap: 14,
          cursor: "pointer",
          boxShadow: "0 4px 16px rgba(0,0,0,.3)",
          color: "#fff",
          fontFamily: "inherit",
          textAlign: "right",
          marginTop: 18,
        }}
      >
        <LessonBadge number={3} />

        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              color: "var(--text-muted)",
              fontSize: 13,
              fontWeight: 700,
              marginBottom: 6,
              letterSpacing: ".3px",
            }}
          >
            الدرس 3 • اللغة العربية
          </div>

          <div
            style={{
                  fontWeight: 900,
                  color: "#fff",
                  fontSize: 20,
                  lineHeight: 1.35,
                  textShadow:
                    "0 1px 0 #17365F, 1px 0 0 #17365F, -1px 0 0 #17365F, 0 -1px 0 #17365F",
                }}
          >
            تعرف على عائلتي
          </div>
        </div>

        <div
          aria-hidden="true"

              style={{
                width: 11,
                height: 11,
                borderLeft: "2.5px solid var(--gold)",
                borderBottom: "2.5px solid var(--gold)",
                transform: "rotate(45deg)",
                flexShrink: 0,
                marginLeft: 4,
              }}
        />
      </button>

      <button
        type="button"
        onClick={() => navigate("/lesson-v2/islamic/lesson04")}

        style={{
          width: "100%",
          background: "var(--surface-2)",
          border: "1px solid var(--border-soft)",
          borderRadius: 16,
          padding: "16px 18px",
          display: "flex",
          alignItems: "center",
          gap: 14,
          cursor: "pointer",
          boxShadow: "0 4px 16px rgba(0,0,0,.3)",
          color: "#fff",
          fontFamily: "inherit",
          textAlign: "right",
          marginTop: 18,
        }}
      >
        <LessonBadge number={4} />

        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              color: "var(--text-muted)",
              fontSize: 13,
              fontWeight: 700,
              marginBottom: 6,
              letterSpacing: ".3px",
            }}
          >
            الدرس 4 • التربية الإسلامية
          </div>

          <div
            style={{
                  fontWeight: 900,
                  color: "#fff",
                  fontSize: 20,
                  lineHeight: 1.35,
                  textShadow:
                    "0 1px 0 #17365F, 1px 0 0 #17365F, -1px 0 0 #17365F, 0 -1px 0 #17365F",
                }}
          >
            سورة الفاتحة
          </div>
        </div>

        <div
          aria-hidden="true"

              style={{
                width: 11,
                height: 11,
                borderLeft: "2.5px solid var(--gold)",
                borderBottom: "2.5px solid var(--gold)",
                transform: "rotate(45deg)",
                flexShrink: 0,
                marginLeft: 4,
              }}
        />
      </button>

      <button
        type="button"
        onClick={() => navigate("/lesson-v2/arabic/lesson05")}
        style={{
          width: "100%",
          background: "rgba(8, 22, 43, 0.78)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 18,
          padding: "16px 18px",
          display: "flex",
          alignItems: "center",
          gap: 14,
          color: "white",
          cursor: "pointer",
          fontFamily: "Tajawal, Cairo, sans-serif",
          textAlign: "right",
          boxShadow: "0 10px 30px rgba(0,0,0,.18)",
          marginTop: 14,
        }}
      >
        <LessonBadge number={5} />

        <div style={{ flex: 1 }}>
          <div
            style={{
              opacity: 0.65,
              fontSize: 13,
              marginBottom: 6,
            }}
          >
            الدرس 5 • اللغة العربية
          </div>
          <div style={{
                  color: "#fff",
                  fontSize: 20,
                  fontWeight: 900,
                  lineHeight: 1.35,
                  textShadow:
                    "0 1px 0 #17365F, 1px 0 0 #17365F, -1px 0 0 #17365F, 0 -1px 0 #17365F",
                }}>
            في منزلنا
          </div>
        </div>

        <div
          aria-hidden="true"
          style={{
            width: 11,
            height: 11,
            borderLeft: "2.5px solid #E8A020",
            borderBottom: "2.5px solid #E8A020",
            transform: "rotate(45deg)",
            flexShrink: 0,
            marginLeft: 4,
          }}
        />
      </button>

      <button
        type="button"
        onClick={() =>
          navigate("/lesson-v2/islamic/lesson06")
        }
        style={{
          width: "100%",
          background: "rgba(8, 22, 43, 0.78)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 18,
          padding: "16px 18px",
          display: "flex",
          alignItems: "center",
          gap: 14,
          color: "white",
          cursor: "pointer",
          fontFamily: "Tajawal, Cairo, sans-serif",
          textAlign: "right",
          boxShadow: "0 10px 30px rgba(0,0,0,.18)",
          marginTop: 14,
        }}
      >
        <LessonBadge number={6} />

        <div style={{ flex: 1 }}>
          <div
            style={{
              opacity: 0.65,
              fontSize: 13,
              marginBottom: 6,
            }}
          >
            الدرس 6 • التربية الإسلامية
          </div>

          <div
            style={{
              fontSize: 20,
              fontWeight: 900,
              color: "#fff",
              lineHeight: 1.35,
              textShadow:
                "0 1px 0 #17365F, 1px 0 0 #17365F, -1px 0 0 #17365F, 0 -1px 0 #17365F",
            }}
          >
            أستأذن
          </div>
        </div>

        <div
          aria-hidden="true"
          style={{
            width: 11,
            height: 11,
            borderLeft:
              "2.5px solid #E8A020",
            borderBottom:
              "2.5px solid #E8A020",
            transform:
              "rotate(45deg)",
            flexShrink: 0,
            marginLeft: 4,
          }}
        />
      </button>
<button
        type="button"
        onClick={() =>
          navigate("/lesson-v2/arabic/lesson07")
        }
        style={{
          width: "100%",
          background: "rgba(8, 22, 43, 0.78)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 18,
          padding: "16px 18px",
          display: "flex",
          alignItems: "center",
          gap: 14,
          color: "white",
          cursor: "pointer",
          fontFamily: "Tajawal, Cairo, sans-serif",
          textAlign: "right",
          boxShadow: "0 10px 30px rgba(0,0,0,.18)",
          marginTop: 14,
        }}
      >
        <LessonBadge number={7} />

        <div style={{ flex: 1 }}>
          <div
            style={{
              opacity: 0.65,
              fontSize: 13,
              marginBottom: 6,
            }}
          >
            الدرس 7 • اللغة العربية
          </div>

          <div
            style={{
              fontSize: 20,
              fontWeight: 900,
              color: "#fff",
              lineHeight: 1.35,
              textShadow:
                "0 1px 0 #17365F, 1px 0 0 #17365F, -1px 0 0 #17365F, 0 -1px 0 #17365F",
            }}
          >
            العائلة مجتمعة
          </div>
        </div>

        <div
          aria-hidden="true"
          style={{
            width: 11,
            height: 11,
            borderLeft:
              "2.5px solid #E8A020",
            borderBottom:
              "2.5px solid #E8A020",
            transform:
              "rotate(45deg)",
            flexShrink: 0,
            marginLeft: 4,
          }}
        />
      </button>
<button
        type="button"
        onClick={() =>
          navigate("/lesson-v2/islamic/lesson08")
        }
        style={{
          width: "100%",
          background: "rgba(8, 22, 43, 0.78)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 18,
          padding: "16px 18px",
          display: "flex",
          alignItems: "center",
          gap: 14,
          color: "white",
          cursor: "pointer",
          fontFamily: "Tajawal, Cairo, sans-serif",
          textAlign: "right",
          boxShadow: "0 10px 30px rgba(0,0,0,.18)",
          marginTop: 14,
        }}
      >
        <LessonBadge number={8} />

        <div style={{ flex: 1 }}>
          <div
            style={{
              opacity: 0.65,
              fontSize: 13,
              marginBottom: 6,
            }}
          >
            الدرس 8 • التربية الإسلامية
          </div>

          <div
            style={{
              fontSize: 20,
              fontWeight: 900,
              color: "#fff",
              lineHeight: 1.35,
              textShadow:
                "0 1px 0 #17365F, 1px 0 0 #17365F, -1px 0 0 #17365F, 0 -1px 0 #17365F",
            }}
          >
            أحب عائلتي
          </div>
        </div>

        <div
          aria-hidden="true"
          style={{
            width: 11,
            height: 11,
            borderLeft:
              "2.5px solid #E8A020",
            borderBottom:
              "2.5px solid #E8A020",
            transform:
              "rotate(45deg)",
            flexShrink: 0,
            marginLeft: 4,
          }}
        />
      </button>

<button
        type="button"
        onClick={() =>
          navigate("/lesson-v2/civics/lesson09")
        }
        style={{
          width: "100%",
          background: "rgba(8, 22, 43, 0.78)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 18,
          padding: "16px 18px",
          display: "flex",
          alignItems: "center",
          gap: 14,
          color: "white",
          cursor: "pointer",
          fontFamily: "Tajawal, Cairo, sans-serif",
          textAlign: "right",
          boxShadow: "0 10px 30px rgba(0,0,0,.18)",
          marginTop: 14,
        }}
      >
        <LessonBadge number={9} />

        <div style={{ flex: 1 }}>
          <div
            style={{
              opacity: 0.65,
              fontSize: 13,
              marginBottom: 6,
            }}
          >
            الدرس 9 • التربية المدنية
          </div>

          <div
            style={{
              fontSize: 20,
              fontWeight: 900,
              color: "#fff",
              lineHeight: 1.35,
              textShadow:
                "0 1px 0 #17365F, 1px 0 0 #17365F, -1px 0 0 #17365F, 0 -1px 0 #17365F",
            }}
          >
            التحية وردها
          </div>
        </div>

        <div
          aria-hidden="true"
          style={{
            width: 11,
            height: 11,
            borderLeft:
              "2.5px solid #E8A020",
            borderBottom:
              "2.5px solid #E8A020",
            transform:
              "rotate(45deg)",
            flexShrink: 0,
            marginLeft: 4,
          }}
        />
      </button>

<button
        type="button"
        onClick={() =>
          navigate("/lesson-v2/arabic/lesson10")
        }
        style={{
          width: "100%",
          background: "rgba(8, 22, 43, 0.78)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 18,
          padding: "16px 18px",
          display: "flex",
          alignItems: "center",
          gap: 14,
          color: "white",
          cursor: "pointer",
          fontFamily: "Tajawal, Cairo, sans-serif",
          textAlign: "right",
          boxShadow: "0 10px 30px rgba(0,0,0,.18)",
          marginTop: 14,
        }}
      >
        <LessonBadge number={10} />

        <div style={{ flex: 1 }}>
          <div
            style={{
              opacity: 0.65,
              fontSize: 13,
              marginBottom: 6,
            }}
          >
            الدرس 10 • محفوظات
          </div>

          <div
            style={{
              fontSize: 20,
              fontWeight: 900,
              color: "#fff",
              lineHeight: 1.35,
              textShadow:
                "0 1px 0 #17365F, 1px 0 0 #17365F, -1px 0 0 #17365F, 0 -1px 0 #17365F",
            }}
          >
            قَسَمًا
          </div>
        </div>

        <div
          aria-hidden="true"
          style={{
            width: 11,
            height: 11,
            borderLeft:
              "2.5px solid #E8A020",
            borderBottom:
              "2.5px solid #E8A020",
            transform:
              "rotate(45deg)",
            flexShrink: 0,
            marginLeft: 4,
          }}
        />
      </button>

<button
        type="button"
        onClick={() =>
          navigate("/lesson-v2/arabic/lesson11")
        }
        style={{
          width: "100%",
          background: "rgba(8, 22, 43, 0.78)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 18,
          padding: "16px 18px",
          display: "flex",
          alignItems: "center",
          gap: 14,
          color: "white",
          cursor: "pointer",
          fontFamily: "Tajawal, Cairo, sans-serif",
          textAlign: "right",
          boxShadow: "0 10px 30px rgba(0,0,0,.18)",
          marginTop: 14,
        }}
      >
        <LessonBadge number={11} />

        <div style={{ flex: 1 }}>
          <div
            style={{
              opacity: 0.65,
              fontSize: 13,
              marginBottom: 6,
            }}
          >
            الدرس 11 • المشروع والإدماج
          </div>

          <div
            style={{
              fontSize: 20,
              fontWeight: 900,
              color: "#fff",
              lineHeight: 1.35,
              textShadow:
                "0 1px 0 #17365F, 1px 0 0 #17365F, -1px 0 0 #17365F, 0 -1px 0 #17365F",
            }}
          >
            أَصِفُ مَشْرُوعِي وَأُدْمِجُ
          </div>
        </div>

        <div
          aria-hidden="true"
          style={{
            width: 11,
            height: 11,
            borderLeft:
              "2.5px solid #E8A020",
            borderBottom:
              "2.5px solid #E8A020",
            transform:
              "rotate(45deg)",
            flexShrink: 0,
            marginLeft: 4,
          }}
        />
      </button>



<div
          style={{
            marginTop: 20,
            background: "rgba(255,255,255,.055)",
            border: "1px solid rgba(255,255,255,.09)",
            borderRadius: 16,
            padding: "12px 14px",
            color: "#aebbd0",
            fontSize: 13,
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          العالم الأول في مادة اللغة العربية
        </div>
      </div>
    </div>
  );
}
