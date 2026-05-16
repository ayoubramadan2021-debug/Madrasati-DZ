import { AppButton, AppCard, AppInput, AppSelect, AppTextarea } from "../../../shared/components/ui";

type AdminLessonSectionProps = {
  theme: any;
  at: any;
  st: any;
  gt: any;

  lessonTitle: string;
  setLessonTitle: (value: string) => void;

  lessonSubject: string;
  setLessonSubject: (value: string) => void;

  lessonGrade: number | string;
  setLessonGrade: (value: string) => void;

  lessonContent: string;
  setLessonContent: (value: string) => void;

  editingLessonId: string | null;
  handleLessonSubmit: (e: React.FormEvent) => void;
};

function AdminLessonSection({
  theme,
  at,
  st,
  gt,
  lessonTitle,
  setLessonTitle,
  lessonSubject,
  setLessonSubject,
  lessonGrade,
  setLessonGrade,
  lessonContent,
  setLessonContent,
  editingLessonId,
  handleLessonSubmit,
}: AdminLessonSectionProps) {
  return (
    <AppCard theme={theme}>
      <form onSubmit={handleLessonSubmit}>
        <h2 style={{ color: theme.text }}>
          {editingLessonId
            ? "✏️ تعديل الدرس"
            : "📖 " + at.addLesson}
        </h2>

        <label>{at.lessonTitle}</label>

        <AppInput
          theme={theme}
          value={lessonTitle}
          onChange={(e) => setLessonTitle(e.target.value)}
        />

        <label>{at.subject}</label>

        <AppSelect
          theme={theme}
          value={lessonSubject}
          onChange={(e) => setLessonSubject(e.target.value)}
        >
          <option value="math">{st.math}</option>
          <option value="arabic">{st.arabic}</option>
          <option value="french">{st.french}</option>
          <option value="islamic">{st.islamic}</option>
          <option value="civic">{st.civic}</option>
          <option value="science">{st.science}</option>
        </AppSelect>

        <label>{at.grade}</label>

        <AppSelect
          theme={theme}
          value={lessonGrade}
          onChange={(e) => setLessonGrade(e.target.value)}
        >
          <option value="1">{gt[1]}</option>
          <option value="2">{gt[2]}</option>
          <option value="3">{gt[3]}</option>
          <option value="4">{gt[4]}</option>
          <option value="5">{gt[5]}</option>
        </AppSelect>

        <label>{at.lessonContent}</label>

        <AppTextarea
          theme={theme}
          rows={7}
          value={lessonContent}
          onChange={(e) => setLessonContent(e.target.value)}
        />

        <AppButton theme={theme} type="submit">
          💾 {at.saveLesson}
        </AppButton>
      </form>
    </AppCard>
  );
}

export default AdminLessonSection;
