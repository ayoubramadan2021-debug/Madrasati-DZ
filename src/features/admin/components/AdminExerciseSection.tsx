import {
  AppButton,
  AppCard,
  AppInput,
  AppSelect,
} from "../../../shared/components/ui";

type AdminExerciseSectionProps = {
  theme: any;
  at: any;
  st: any;
  gt: any;

  exerciseTitle: string;
  setExerciseTitle: (value: string) => void;

  exerciseSubject: string;
  setExerciseSubject: (value: string) => void;

  exerciseGrade: number | string;
  setExerciseGrade: (value: string) => void;

  question: string;
  setQuestion: (value: string) => void;

  option1: string;
  setOption1: (value: string) => void;

  option2: string;
  setOption2: (value: string) => void;

  option3: string;
  setOption3: (value: string) => void;

  option4: string;
  setOption4: (value: string) => void;

  correctAnswer: string;
  setCorrectAnswer: (value: string) => void;

  handleExerciseSubmit: (e: React.FormEvent) => void;
};

function AdminExerciseSection({
  theme,
  at,
  st,
  gt,
  exerciseTitle,
  setExerciseTitle,
  exerciseSubject,
  setExerciseSubject,
  exerciseGrade,
  setExerciseGrade,
  question,
  setQuestion,
  option1,
  setOption1,
  option2,
  setOption2,
  option3,
  setOption3,
  option4,
  setOption4,
  correctAnswer,
  setCorrectAnswer,
  handleExerciseSubmit,
}: AdminExerciseSectionProps) {
  return (
    <AppCard theme={theme}>
      <form onSubmit={handleExerciseSubmit}>
        <h2 style={{ color: theme.text }}>
          ✍️ {at.addExercise}
        </h2>

        <label>{at.exerciseTitle}</label>

        <AppInput
          theme={theme}
          value={exerciseTitle}
          onChange={(e) => setExerciseTitle(e.target.value)}
        />

        <label>{at.subject}</label>

        <AppSelect
          theme={theme}
          value={exerciseSubject}
          onChange={(e) => setExerciseSubject(e.target.value)}
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
          value={exerciseGrade}
          onChange={(e) => setExerciseGrade(e.target.value)}
        >
          <option value="1">{gt[1]}</option>
          <option value="2">{gt[2]}</option>
          <option value="3">{gt[3]}</option>
          <option value="4">{gt[4]}</option>
          <option value="5">{gt[5]}</option>
        </AppSelect>

        <label>{at.question}</label>

        <AppInput
          theme={theme}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <label>الاختيار 1</label>

        <AppInput
          theme={theme}
          value={option1}
          onChange={(e) => setOption1(e.target.value)}
        />

        <label>الاختيار 2</label>

        <AppInput
          theme={theme}
          value={option2}
          onChange={(e) => setOption2(e.target.value)}
        />

        <label>الاختيار 3</label>

        <AppInput
          theme={theme}
          value={option3}
          onChange={(e) => setOption3(e.target.value)}
        />

        <label>الاختيار 4</label>

        <AppInput
          theme={theme}
          value={option4}
          onChange={(e) => setOption4(e.target.value)}
        />

        <label>الإجابة الصحيحة</label>

        <AppInput
          theme={theme}
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
        />

        <AppButton theme={theme} type="submit">
          💾 {at.saveExercise}
        </AppButton>
      </form>
    </AppCard>
  );
}

export default AdminExerciseSection;
