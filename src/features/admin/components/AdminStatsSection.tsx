import { AppCard } from "../../../shared/components/ui";

type AdminStatsSectionProps = {
  theme: any;
  statsTitle: string;

  lessonsCount: number;
  exercisesCount: number;
  quizzesCount: number;
};

function statBox(theme: any) {
  return {
    marginTop: "14px",
    padding: "18px",
    borderRadius: "18px",
    border: `1px solid ${theme.border}`,
    background: theme.surface2,
    color: theme.text,
    fontWeight: "bold",
  };
}

function AdminStatsSection({
  theme,
  statsTitle,
  lessonsCount,
  exercisesCount,
  quizzesCount,
}: AdminStatsSectionProps) {
  return (
    <AppCard theme={theme}>
      <h2 style={{ color: theme.text }}>
        📊 {statsTitle}
      </h2>

      <div style={statBox(theme)}>
        📚 عدد الدروس: {lessonsCount}
      </div>

      <div style={statBox(theme)}>
        ✍️ عدد التمارين: {exercisesCount}
      </div>

      <div style={statBox(theme)}>
        📝 عدد الاختبارات: {quizzesCount}
      </div>
    </AppCard>
  );
}

export default AdminStatsSection;
