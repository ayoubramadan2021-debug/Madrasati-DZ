import { useState } from "react";
import { Link } from "react-router-dom";

type Props = {
  lessonId: number;
  title: string;
  lessonPath: string;
};

const stages = [
  {
    label: "مهمة الاختيار 1",
    instruction: "أَنَظُرُ جَيِّدًا إِلَى الصُّورَةِ",
  },
  {
    label: "مهمة الاختيار 2",
    instruction: "أَقْرَأُ التَّعْلِيمَةَ ثُمَّ أَخْتَارُ",
  },
  {
    label: "مهمة الترتيب",
    instruction: "أُرَتِّبُ الْعَنَاصِرَ بِالشَّكْلِ الصَّحِيحِ",
  },
  {
    label: "مهمة التحدي",
    instruction: "أُجِيبُ عَنِ السُّؤَالِ الْأَخِيرِ",
  },
] as const;

export default function World3PremiumExerciseShellV2({
  lessonId,
  title,
  lessonPath,
}: Props) {
  const [current, setCurrent] = useState(0);
  const stage = stages[current];

  return (
    <main
      dir="rtl"
      style={{
        minHeight: "100vh",
        padding: "24px 16px 130px",
        background:
          "linear-gradient(180deg,#fffaf0 0%,#fff6df 100%)",
        color: "#17355f",
      }}
    >
      <section
        style={{
          width: "min(680px,100%)",
          margin: "0 auto",
        }}
      >
        <header
          style={{
            display: "grid",
            gridTemplateColumns: "90px 1fr 76px",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              direction: "ltr",
              padding: "12px 10px",
              textAlign: "center",
              border: "5px solid #ecae19",
              borderRadius: "24px",
              background: "#fff",
              fontSize: "28px",
              fontWeight: 900,
            }}
          >
            {current + 1} / 4
          </div>

          <div
            style={{
              padding: "12px 14px",
              textAlign: "center",
              borderRadius: "25px",
              background: "#fff",
              boxShadow: "0 5px 16px rgba(0,0,0,.10)",
              fontSize: "28px",
              letterSpacing: "5px",
            }}
          >
            {Array.from({ length: 4 }, (_, index) => (
              <span
                key={index}
                style={{
                  color: index <= current ? "#ffd11a" : "#e7e4dc",
                }}
              >
                ★
              </span>
            ))}
          </div>

          <button
            type="button"
            aria-label="تشغيل الصوت"
            style={{
              width: "70px",
              height: "70px",
              border: "5px solid #fff",
              borderRadius: "50%",
              background: "#f3ad19",
              boxShadow: "0 5px 14px rgba(0,0,0,.13)",
              fontSize: "32px",
            }}
          >
            🔊
          </button>
        </header>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            margin: "24px 0 18px",
          }}
        >
          {stages.map((_, index) => (
            <span
              key={index}
              style={{
                width: index === current ? "58px" : "18px",
                height: "18px",
                borderRadius: "20px",
                background:
                  index === current
                    ? "#efb41f"
                    : index < current
                      ? "#28ad72"
                      : "#e8dbb9",
              }}
            />
          ))}
        </div>

        <div
          style={{
            width: "fit-content",
            margin: "0 auto 22px",
            padding: "13px 25px",
            border: "4px solid #e9ac1a",
            borderRadius: "28px",
            background: "#fff",
            fontSize: "23px",
            fontWeight: 900,
          }}
        >
          ⭐ {stage.label}
        </div>

        <section
          style={{
            minHeight: "330px",
            display: "grid",
            placeItems: "center",
            padding: "24px",
            border: "6px solid #e5a715",
            borderRadius: "40px",
            background: "#fff",
            boxShadow: "0 8px 22px rgba(0,0,0,.08)",
            textAlign: "center",
          }}
        >
          <div>
            <div style={{ fontSize: "90px" }}>🖼️</div>

            <h1
              style={{
                margin: "16px 0 8px",
                fontSize: "28px",
              }}
            >
              {title}
            </h1>

            <p
              style={{
                margin: 0,
                fontSize: "22px",
                fontWeight: 800,
              }}
            >
              صورة التمرين {current + 1}
            </p>
          </div>
        </section>

        <section
          style={{
            marginTop: "16px",
            padding: "22px",
            border: "5px solid #e5a715",
            borderRadius: "32px",
            background: "#fff",
            textAlign: "center",
            fontSize: "25px",
            fontWeight: 900,
            lineHeight: 1.8,
          }}
        >
          {stage.instruction}
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2,minmax(0,1fr))",
            gap: "16px",
            marginTop: "18px",
          }}
        >
          {["الاختيار الأول", "الاختيار الثاني", "الاختيار الثالث", "الاختيار الرابع"].map(
            (option) => (
              <button
                key={option}
                type="button"
                style={{
                  minHeight: "105px",
                  padding: "14px",
                  border: "5px solid #e5a715",
                  borderRadius: "28px",
                  background: "#fff",
                  color: "#17355f",
                  fontSize: "22px",
                  fontWeight: 900,
                }}
              >
                {option}
              </button>
            ),
          )}
        </section>

        <footer
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "12px",
            marginTop: "22px",
          }}
        >
          <button
            type="button"
            disabled={current === 0}
            onClick={() => setCurrent((value) => Math.max(0, value - 1))}
            style={{
              padding: "13px 20px",
              border: 0,
              borderRadius: "20px",
              background: "#e5e7eb",
              fontWeight: 900,
            }}
          >
            السابق
          </button>

          <Link
            to={lessonPath}
            style={{
              padding: "13px 20px",
              borderRadius: "20px",
              background: "#17355f",
              color: "#fff",
              textDecoration: "none",
              fontWeight: 900,
            }}
          >
            العودة إلى الدرس
          </Link>

          <button
            type="button"
            disabled={current === 3}
            onClick={() => setCurrent((value) => Math.min(3, value + 1))}
            style={{
              padding: "13px 20px",
              border: 0,
              borderRadius: "20px",
              background: "#e5a715",
              color: "#17355f",
              fontWeight: 900,
            }}
          >
            التالي
          </button>
        </footer>

        <p
          style={{
            marginTop: "18px",
            textAlign: "center",
            opacity: 0.7,
          }}
        >
          هيكل الدرس {lessonId} — المحتوى في انتظار التخصيص
        </p>
      </section>
    </main>
  );
}
