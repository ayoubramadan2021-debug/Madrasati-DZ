import {
  AppButton,
  AppCard,
  AppInput,
  AppSelect,
} from "../../../shared/components/ui";

type AdminQuizSectionProps = {
  theme: any;
  at: any;
  st: any;
  gt: any;

  quizTitle: string;
  setQuizTitle: (value: string) => void;

  quizSubject: string;
  setQuizSubject: (value: string) => void;

  quizGrade: number | string;
  setQuizGrade: (value: string) => void;

  q1: string;
  setQ1: (value: string) => void;
  q1a: string;
  setQ1a: (value: string) => void;
  q1b: string;
  setQ1b: (value: string) => void;
  q1c: string;
  setQ1c: (value: string) => void;
  q1correct: string;
  setQ1correct: (value: string) => void;

  q2: string;
  setQ2: (value: string) => void;
  q2a: string;
  setQ2a: (value: string) => void;
  q2b: string;
  setQ2b: (value: string) => void;
  q2c: string;
  setQ2c: (value: string) => void;
  q2correct: string;
  setQ2correct: (value: string) => void;

  q3: string;
  setQ3: (value: string) => void;
  q3a: string;
  setQ3a: (value: string) => void;
  q3b: string;
  setQ3b: (value: string) => void;
  q3c: string;
  setQ3c: (value: string) => void;
  q3correct: string;
  setQ3correct: (value: string) => void;

  handleQuizSubmit: (e: React.FormEvent) => void;
};

function AdminQuizSection({
  theme,
  at,
  st,
  gt,
  quizTitle,
  setQuizTitle,
  quizSubject,
  setQuizSubject,
  quizGrade,
  setQuizGrade,
  q1,
  setQ1,
  q1a,
  setQ1a,
  q1b,
  setQ1b,
  q1c,
  setQ1c,
  q1correct,
  setQ1correct,
  q2,
  setQ2,
  q2a,
  setQ2a,
  q2b,
  setQ2b,
  q2c,
  setQ2c,
  q2correct,
  setQ2correct,
  q3,
  setQ3,
  q3a,
  setQ3a,
  q3b,
  setQ3b,
  q3c,
  setQ3c,
  q3correct,
  setQ3correct,
  handleQuizSubmit,
}: AdminQuizSectionProps) {
  return (
    <AppCard theme={theme}>
      <form onSubmit={handleQuizSubmit}>
        <h2 style={{ color: theme.text }}>📝 {at.addQuiz}</h2>

        <label>عنوان الاختبار</label>
        <AppInput
          theme={theme}
          required
          value={quizTitle}
          onChange={(e) => setQuizTitle(e.target.value)}
        />

        <label>{at.subject}</label>
        <AppSelect
          theme={theme}
          value={quizSubject}
          onChange={(e) => setQuizSubject(e.target.value)}
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
          value={quizGrade}
          onChange={(e) => setQuizGrade(e.target.value)}
        >
          <option value="1">{gt[1]}</option>
          <option value="2">{gt[2]}</option>
          <option value="3">{gt[3]}</option>
          <option value="4">{gt[4]}</option>
          <option value="5">{gt[5]}</option>
        </AppSelect>

        <h3 style={{ color: theme.text }}>{at.question} 1</h3>
        <AppInput theme={theme} required placeholder={at.question} value={q1} onChange={(e) => setQ1(e.target.value)} />
        <AppInput theme={theme} required placeholder="اختيار 1" value={q1a} onChange={(e) => setQ1a(e.target.value)} />
        <AppInput theme={theme} required placeholder="اختيار 2" value={q1b} onChange={(e) => setQ1b(e.target.value)} />
        <AppInput theme={theme} required placeholder="اختيار 3" value={q1c} onChange={(e) => setQ1c(e.target.value)} />
        <AppInput theme={theme} required placeholder="الإجابة الصحيحة" value={q1correct} onChange={(e) => setQ1correct(e.target.value)} />

        <h3 style={{ color: theme.text }}>{at.question} 2</h3>
        <AppInput theme={theme} required placeholder={at.question} value={q2} onChange={(e) => setQ2(e.target.value)} />
        <AppInput theme={theme} required placeholder="اختيار 1" value={q2a} onChange={(e) => setQ2a(e.target.value)} />
        <AppInput theme={theme} required placeholder="اختيار 2" value={q2b} onChange={(e) => setQ2b(e.target.value)} />
        <AppInput theme={theme} required placeholder="اختيار 3" value={q2c} onChange={(e) => setQ2c(e.target.value)} />
        <AppInput theme={theme} required placeholder="الإجابة الصحيحة" value={q2correct} onChange={(e) => setQ2correct(e.target.value)} />

        <h3 style={{ color: theme.text }}>{at.question} 3</h3>
        <AppInput theme={theme} required placeholder={at.question} value={q3} onChange={(e) => setQ3(e.target.value)} />
        <AppInput theme={theme} required placeholder="اختيار 1" value={q3a} onChange={(e) => setQ3a(e.target.value)} />
        <AppInput theme={theme} required placeholder="اختيار 2" value={q3b} onChange={(e) => setQ3b(e.target.value)} />
        <AppInput theme={theme} required placeholder="اختيار 3" value={q3c} onChange={(e) => setQ3c(e.target.value)} />
        <AppInput theme={theme} required placeholder="الإجابة الصحيحة" value={q3correct} onChange={(e) => setQ3correct(e.target.value)} />

        <AppButton theme={theme} type="submit">
          💾 {at.saveQuiz}
        </AppButton>
      </form>
    </AppCard>
  );
}

export default AdminQuizSection;
