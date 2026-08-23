import type {
  CSSProperties,
  ReactNode,
} from "react";

import type {
  UnifiedLessonExerciseQuestionV2,
  UnifiedLessonExerciseRenderContextV2,
} from "./UnifiedLessonExercisesV2";

const C = {
  navy: "#17365F",
  gold: "#E8A020",
  goldSoft: "#FFF4D6",
  cream: "#FFFDF8",
  sky: "#EAF4FF",
  skyLine: "#4E9DD6",
  green: "#E8F7EF",
  greenLine: "#32A56A",
  red: "#FFE9EC",
  redLine: "#D95C5C",
  inkSoft: "#6A7F97",
};

const shell: CSSProperties = {
  width: "min(760px,96%)",
  minHeight: 235,
  margin: "0 auto",
  padding: 18,
  borderRadius: 28,
  border: `4px solid ${C.gold}`,
  background: "rgba(255,255,255,.97)",
  boxShadow: "0 16px 30px rgba(15,36,71,.12)",
  boxSizing: "border-box",
  display: "grid",
  gap: 15,
  placeItems: "center",
  textAlign: "center",
};

const title: CSSProperties = {
  color: C.navy,
  fontWeight: 1000,
  fontSize: "clamp(20px,4.9vw,30px)",
  lineHeight: 1.5,
};

const subTitle: CSSProperties = {
  color: C.inkSoft,
  fontWeight: 900,
  fontSize: "clamp(15px,3.9vw,20px)",
  lineHeight: 1.45,
};

const row: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 12,
  flexWrap: "wrap",
  width: "100%",
};

function cardStyle(bg: string = "#FFFFFF", border: string = C.gold): CSSProperties {
  return {
    width: 78,
    height: 78,
    borderRadius: 20,
    border: `3px solid ${border}`,
    background: bg,
    display: "grid",
    placeItems: "center",
    boxShadow: "0 5px 12px rgba(23,54,95,.07)",
  };
}

function BigArrow({ direction }: { direction: "right" | "left" | "up" | "down" }) {
  const rot = { right: 0, down: 90, left: 180, up: 270 }[direction];
  return (
    <svg
      width="46"
      height="46"
      viewBox="0 0 54 54"
      aria-hidden="true"
      style={{ transform: `rotate(${rot}deg)` }}
    >
      <path d="M8 27h29" stroke="#17365F" strokeWidth="6" strokeLinecap="round" />
      <path
        d="M30 15l12 12-12 12"
        fill="none"
        stroke="#17365F"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StartDot() {
  return (
    <svg width="38" height="38" viewBox="0 0 38 38" aria-hidden="true">
      <circle cx="19" cy="19" r="15" fill="#32A56A" opacity=".18" stroke="#32A56A" strokeWidth="3" />
      <circle cx="19" cy="19" r="7" fill="#32A56A" />
    </svg>
  );
}

function StarTarget() {
  return (
    <svg width="40" height="40" viewBox="0 0 44 44" aria-hidden="true">
      <path
        d="M22 5l5 10 11 1-8 8 2 11-10-5-10 5 2-11-8-8 11-1 5-10z"
        fill="#E8A020"
        stroke="#D8920D"
        strokeWidth="2.5"
      />
    </svg>
  );
}

function ArrowDirectionsBoard() {
  return (
    <section dir="rtl" style={shell}>
      <div style={title}>أُلَاحِظُ الِاتِّجَاهَاتِ</div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 86px)",
          gridTemplateRows: "repeat(3, 86px)",
          gap: 10,
          alignItems: "center",
          justifyItems: "center",
        }}
      >
        <div />
        <div style={cardStyle(C.goldSoft, C.gold)}>
          <BigArrow direction="up" />
        </div>
        <div />

        <div style={cardStyle(C.sky, C.skyLine)}>
          <BigArrow direction="right" />
        </div>
        <div
          style={{
            ...cardStyle(C.green, C.greenLine),
            width: 84,
            height: 84,
            borderRadius: 999,
          }}
        >
          <StartDot />
        </div>
        <div style={cardStyle(C.sky, C.skyLine)}>
          <BigArrow direction="left" />
        </div>

        <div />
        <div style={cardStyle(C.sky, C.skyLine)}>
          <BigArrow direction="down" />
        </div>
        <div />
      </div>

      <div style={subTitle}>أُحَدِّدُ السَّهْمَ الَّذِي يُبَيِّنُ الِاتِّجَاهَ الصَّحِيحَ.</div>
    </section>
  );
}

function RouteBoard() {
  return (
    <section dir="rtl" style={shell}>
      <div style={title}>أَتَّبِعُ الْمَسَارَ</div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 86px)",
          gridTemplateRows: "repeat(3, 86px)",
          gap: 10,
          alignItems: "center",
          justifyItems: "center",
        }}
      >
        <div />
        <div />
        <div style={cardStyle(C.goldSoft, C.gold)}>
          <StarTarget />
        </div>

        <div />
        <div />
        <div style={cardStyle(C.sky, C.skyLine)}>
          <BigArrow direction="up" />
        </div>

        <div />
        <div
          style={{
            ...cardStyle(C.green, C.greenLine),
            width: 84,
            height: 84,
            borderRadius: 999,
          }}
        >
          <StartDot />
        </div>
        <div style={cardStyle(C.sky, C.skyLine)}>
          <BigArrow direction="right" />
        </div>
      </div>

      <div style={{ ...row, gap: 28 }}>
        <div style={{ display: "grid", gap: 6, justifyItems: "center" }}>
          <span style={{ color: C.skyLine, fontWeight: 1000 }}>1</span>
          <BigArrow direction="right" />
        </div>
        <div style={{ display: "grid", gap: 6, justifyItems: "center" }}>
          <span style={{ color: C.gold, fontWeight: 1000 }}>2</span>
          <BigArrow direction="up" />
        </div>
      </div>
    </section>
  );
}

function NumberBundle({ value }: { value: number }) {
  const tens = Math.floor(value / 10);
  const ones = value % 10;

  return (
    <div
      style={{
        minWidth: 132,
        padding: 12,
        borderRadius: 20,
        border: `2px solid ${C.gold}`,
        background: C.cream,
        display: "grid",
        gap: 10,
        justifyItems: "center",
      }}
    >
      <strong style={{ color: C.navy, fontSize: 24 }}>{value}</strong>

      <div style={{ ...row, gap: 5 }}>
        {Array.from({ length: tens }).map((_, index) => (
          <span
            key={`t-${index}`}
            style={{
              width: 38,
              height: 14,
              borderRadius: 6,
              background: "#FFD86B",
              border: "2px solid #D59A12",
            }}
          />
        ))}
      </div>

      <div style={{ ...row, gap: 5 }}>
        {Array.from({ length: ones }).map((_, index) => (
          <span
            key={`o-${index}`}
            style={{
              width: 16,
              height: 16,
              borderRadius: 5,
              background: "#9CD7FF",
              border: "2px solid #4E9DD6",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function DoubleHalfVisual({
  kind,
  value,
  half,
}: {
  kind: "double" | "half";
  value: number;
  half?: number;
}) {
  if (kind === "double") {
    return (
      <section dir="rtl" style={shell}>
        <div style={title}>أُضَاعِفُ الْعَدَدَ</div>
        <div style={row}>
          <NumberBundle value={value} />
          <div style={{ color: C.gold, fontSize: 34, fontWeight: 1000 }}>+</div>
          <NumberBundle value={value} />
        </div>
        <div style={title}>{value} + {value} = ؟</div>
      </section>
    );
  }

  const result = half ?? Math.floor(value / 2);

  return (
    <section dir="rtl" style={shell}>
      <div style={title}>أُنَصِّفُ الْعَدَدَ</div>
      <div
        style={{
          padding: "9px 20px",
          borderRadius: 18,
          border: `2px solid ${C.gold}`,
          background: C.goldSoft,
          color: C.navy,
          fontSize: 26,
          fontWeight: 1000,
        }}
      >
        {value}
      </div>
      <div style={{ color: C.navy, fontSize: 32, fontWeight: 1000 }}>↙︎ ↘︎</div>
      <div style={row}>
        <NumberBundle value={result} />
        <NumberBundle value={result} />
      </div>
    </section>
  );
}

function CountVisual({
  emoji,
  count,
  label,
}: {
  emoji: string;
  count: number;
  label: string;
}) {
  return (
    <section dir="rtl" style={shell}>
      <div style={title}>{label}</div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(68px, 92px))",
          gap: 12,
          justifyContent: "center",
        }}
      >
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            style={{
              width: 76,
              height: 76,
              borderRadius: 20,
              border: `3px solid ${C.gold}`,
              background: C.cream,
              display: "grid",
              placeItems: "center",
              fontSize: 40,
            }}
          >
            <span aria-hidden="true">{emoji}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function RankVisual({ second = false }: { second?: boolean }) {
  const ranks = [
    { n: 1, bg: "#FFF4C9", border: "#E8A020" },
    { n: 2, bg: "#F2F6FA", border: "#B7C7D8" },
    { n: 3, bg: "#FFF0E2", border: "#C98E55" },
    { n: 4, bg: "#F7FAFC", border: "#CBD8E4" },
  ];

  return (
    <section dir="rtl" style={shell}>
      <div style={title}>
        {second
          ? "مَا الْمَرْتَبَةُ الَّتِي تَأْتِي بَعْدَ الْأُولَى؟"
          : "مَنْ يَقِفُ فِي الْمَرْتَبَةِ الْأُولَى؟"}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(58px, 92px))",
          gap: 10,
          width: "100%",
          justifyContent: "center",
        }}
      >
        {ranks.map((rank) => (
          <div
            key={rank.n}
            style={{
              minHeight: rank.n === 1 ? 116 : rank.n === 2 ? 100 : rank.n === 3 ? 88 : 76,
              borderRadius: 18,
              border: `3px solid ${rank.border}`,
              background: rank.bg,
              display: "grid",
              alignContent: "center",
              gap: 7,
              boxShadow: rank.n === 1 ? "0 8px 18px rgba(232,160,32,.18)" : "none",
            }}
          >
            <div style={{ fontSize: 24 }}>{rank.n === 1 ? "🥇" : rank.n === 2 ? "🥈" : rank.n === 3 ? "🥉" : "🏅"}</div>
            <strong style={{ color: C.navy, fontSize: 22 }}>{rank.n}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

function RunnerSvg() {
  return (
    <svg width="86" height="86" viewBox="0 0 100 100" aria-hidden="true">
      <circle cx="58" cy="18" r="9" fill="#17365F" />
      <path d="M52 31l-11 20 19 11 12-20M44 43l-18 6M59 62l-17 24M62 62l22 21" fill="none" stroke="#4E9DD6" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 36h12M8 50h16M12 64h12" stroke="#E8A020" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

function LungsSvg() {
  return (
    <svg width="96" height="96" viewBox="0 0 100 100" aria-hidden="true">
      <path d="M50 16v30" stroke="#17365F" strokeWidth="6" strokeLinecap="round" />
      <path d="M46 42C35 30 21 34 17 55c-4 21 6 31 24 24 8-4 9-16 9-28" fill="#FFE9EC" stroke="#D95C5C" strokeWidth="4" />
      <path d="M54 42c11-12 25-8 29 13 4 21-6 31-24 24-8-4-9-16-9-28" fill="#FFE9EC" stroke="#D95C5C" strokeWidth="4" />
      <path d="M50 26L36 40M50 26l14 14" stroke="#17365F" strokeWidth="4" strokeLinecap="round" />
      <path d="M6 35h12M2 49h16M6 63h12" stroke="#4E9DD6" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

function HeartSvg() {
  return (
    <svg width="96" height="90" viewBox="0 0 112 100" aria-hidden="true">
      <path d="M56 86S17 64 17 34c0-14 11-23 23-23 8 0 14 4 16 10 3-6 9-10 17-10 13 0 23 9 23 23 0 30-40 52-40 52z" fill="#FFE5E5" stroke="#D95C5C" strokeWidth="4" />
      <path d="M5 53h22l8-14 10 29 10-20 7 9h35" fill="none" stroke="#17365F" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WaterRestSvg() {
  return (
    <svg width="118" height="92" viewBox="0 0 136 100" aria-hidden="true">
      <path d="M20 28h40v48H20z" fill="#EAF4FF" stroke="#4E9DD6" strokeWidth="4" />
      <path d="M24 55h32v17H24z" fill="#9CD7FF" />
      <path d="M17 26h46" stroke="#17365F" strokeWidth="4" strokeLinecap="round" />
      <path d="M86 78h32M97 42c0-12 8-18 16-18s16 6 16 18v36M97 58h32" fill="none" stroke="#17365F" strokeWidth="5" strokeLinecap="round" />
      <circle cx="39" cy="17" r="7" fill="#4E9DD6" />
    </svg>
  );
}

function ChestHandSvg() {
  return (
    <svg width="116" height="100" viewBox="0 0 120 108" aria-hidden="true">
      <circle cx="60" cy="20" r="14" fill="#EAF4FF" stroke="#17365F" strokeWidth="3" />
      <path d="M34 97V60c0-17 11-27 26-27s26 10 26 27v37" fill="#F5F9FC" stroke="#17365F" strokeWidth="4" />
      <path d="M60 50c8-9 20-3 20 6 0 11-20 22-20 22S40 67 40 56c0-9 12-15 20-6z" fill="#FFE5E5" stroke="#D95C5C" strokeWidth="3" />
      <path d="M94 90c-11-12-20-19-29-23M96 72v18M88 69l6 8M80 71l8 7" fill="none" stroke="#E1A66C" strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}

function Ex4ImageFrame({
  titleText,
  noteText,
  visual,
}: {
  titleText: string;
  noteText: string;
  visual: ReactNode;
}) {
  return (
    <section dir="rtl" style={shell}>
      <div style={title}>{titleText}</div>
      <div
        style={{
          width: "100%",
          minHeight: 132,
          borderRadius: 24,
          border: "2px solid #DCE7F0",
          background: "linear-gradient(180deg,#F9FCFF,#FFFDF8)",
          padding: 12,
          boxSizing: "border-box",
          display: "grid",
          placeItems: "center",
        }}
      >
        {visual}
      </div>
      <div style={subTitle}>{noteText}</div>
    </section>
  );
}

function Ex4BreathImage() {
  return (
    <Ex4ImageFrame
      titleText="أُلَاحِظُ التَّنَفُّسَ بَعْدَ الْجَرْيِ"
      noteText="بَعْدَ الْجَرْيِ يَحْتَاجُ الْجِسْمُ إِلَى هَوَاءٍ أَكْثَرَ."
      visual={
        <div style={{ ...row, gap: 18 }}>
          <RunnerSvg />
          <div style={{ color: C.gold, fontSize: 34, fontWeight: 1000 }}>→</div>
          <LungsSvg />
        </div>
      }
    />
  );
}

function Ex4HeartImage() {
  return (
    <Ex4ImageFrame
      titleText="أُلَاحِظُ نَبْضَ الْقَلْبِ بَعْدَ الْجُهْدِ"
      noteText="بَعْدَ النَّشَاطِ يَنْبِضُ الْقَلْبُ أَسْرَعَ."
      visual={
        <div style={{ ...row, gap: 18 }}>
          <RunnerSvg />
          <div style={{ color: C.gold, fontSize: 34, fontWeight: 1000 }}>→</div>
          <HeartSvg />
        </div>
      }
    />
  );
}

function Ex4RestImage() {
  return (
    <Ex4ImageFrame
      titleText="أَسْتَرِيحُ وَأَشْرَبُ الْمَاءَ"
      noteText="الرَّاحَةُ وَشُرْبُ الْمَاءِ يُسَاعِدَانِ الْجِسْمَ بَعْدَ النَّشَاطِ."
      visual={<WaterRestSvg />}
    />
  );
}

function Ex4HandImage() {
  return (
    <Ex4ImageFrame
      titleText="أَتَحَسَّسُ نَبْضَ قَلْبِي"
      noteText="أَضَعُ يَدِي عَلَى الصَّدْرِ لِأَشْعُرَ بِنَبْضِ الْقَلْبِ."
      visual={<ChestHandSvg />}
    />
  );
}


function Lesson50Ex4Image({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <section
      dir="rtl"
      style={{
        width: "min(760px,96%)",
        margin: "0 auto",
        padding: 12,
        borderRadius: 28,
        border: "4px solid #E8A020",
        background: "rgba(255,255,255,.97)",
        boxShadow: "0 16px 30px rgba(15,36,71,.12)",
        boxSizing: "border-box",
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: "100%",
          maxHeight: "360px",
          aspectRatio: "4 / 3",
          objectFit: "cover",
          objectPosition: "center",
          display: "block",
          borderRadius: 22,
        }}
      />
    </section>
  );
}

function sourceQuestionId(id: string) {
  const match = id.match(/(m[1-4]_q[1-4])$/);
  return match?.[1] ?? id;
}

function visualFor(id: string): ReactNode {
  switch (sourceQuestionId(id)) {
    case "m1_q1":
    case "m1_q2":
    case "m1_q4":
      return <ArrowDirectionsBoard />;
    case "m1_q3":
      return <RouteBoard />;

    case "m2_q1":
      return <DoubleHalfVisual kind="double" value={25} />;
    case "m2_q2":
      return <DoubleHalfVisual kind="half" value={50} half={25} />;
    case "m2_q3":
      return <DoubleHalfVisual kind="double" value={12} />;
    case "m2_q4":
      return <DoubleHalfVisual kind="half" value={30} half={15} />;

    case "m3_q1":
      return <CountVisual emoji="⚽" count={5} label="أَعُدُّ الْكُرَاتِ" />;
    case "m3_q2":
      return <CountVisual emoji="🏀" count={6} label="أَعُدُّ كُرَاتِ السَّلَّةِ" />;
    case "m3_q3":
      return <RankVisual />;
    case "m3_q4":
      return <RankVisual second />;

    case "m4_q1":
      return (
        <Lesson50Ex4Image
          src="/lessons/v2/lesson50/ex4/s1.webp"
          alt="التنفس بعد الجري"
        />
      );

    case "m4_q2":
      return (
        <Lesson50Ex4Image
          src="/lessons/v2/lesson50/ex4/s2.webp"
          alt="نبض القلب بعد الجهد"
        />
      );

    case "m4_q3":
      return (
        <Lesson50Ex4Image
          src="/lessons/v2/lesson50/ex4/s3.webp"
          alt="الراحة وشرب الماء بعد النشاط"
        />
      );

    case "m4_q4":
      return (
        <Lesson50Ex4Image
          src="/lessons/v2/lesson50/ex4/s4.webp"
          alt="الشعور بنبض القلب بوضع اليد على الصدر"
        />
      );

    default:
      return (
        <section dir="rtl" style={shell}>
          <div style={title}>النَّشَاطُ الْبَصَرِيُّ</div>
        </section>
      );
  }
}

export default function Lesson50ActivityAdapterV2({
  question,
}: UnifiedLessonExerciseRenderContextV2<UnifiedLessonExerciseQuestionV2>) {
  return <>{visualFor(question.id)}</>;
}
