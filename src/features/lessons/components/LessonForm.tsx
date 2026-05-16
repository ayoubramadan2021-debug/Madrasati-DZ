import type { FormEvent } from "react";
import {
  AppButton,
  AppCard,
  AppInput,
  AppSelect,
  AppTextarea,
} from "../../../shared/components/ui";

type LessonFormProps = {
  theme: any;
  at: any;
  st: any;
  gt: any;

  editingLessonId: string | null;

  lessonTitle: string;
  setLessonTitle: (value: string) => void;

  lessonSubject: string;
  setLessonSubject: (value: string) => void;

  lessonGrade: string | number;
  setLessonGrade: (value: string) => void;

  lessonContent: string;
  setLessonContent: (value: string) => void;

  handleLessonSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

function LessonForm({
  theme,
  at,
  st,
  gt,
  editingLessonId,
  lessonTitle,
  setLessonTitle,
  lessonSubject,
  setLessonSubject,
  lessonGrade,
  setLessonGrade,
  lessonContent,
  setLessonContent,
  handleLessonSubmit,
}: LessonFormProps) {
  return (
    <form onSubmit={handleLessonSubmit}>
      <AppCard theme={theme}>
        <h2 style={{ color: theme.text }}>
          {editingLessonId ? "✏️ تعديل الدرس" : "📖 " + at.addLesson}
        </h2>

        <label style={labelStyle(theme)}>{at.lessonTitle}</label>
        <AppInput
          theme={theme}
          required
          value={lessonTitle}
          onChange={(e) => setLessonTitle(e.target.value)}
        />

        <label style={labelStyle(theme)}>{at.subject}</label>
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

        <label style={labelStyle(theme)}>{at.grade}</label>
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

        <label style={labelStyle(theme)}>{at.lessonContent}</label>
        <AppTextarea
          theme={theme}
          required
          rows={7}
          value={lessonContent}
          onChange={(e) => setLessonContent(e.target.value)}
        />

        <AppButton theme={theme}>💾 {at.saveLesson}</AppButton>
      </AppCard>
    </form>
  );
}

const labelStyle = (theme: any) => ({
  display: "block",
  marginTop: "14px",
  marginBottom: "6px",
  color: theme.text,
  fontWeight: "bold",
});

export default LessonForm;
