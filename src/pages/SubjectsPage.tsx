import { subjects } from "../data/subjects";
import AppCard from "../shared/components/AppCard";
import AppButton from "../shared/components/AppButton";

export default function SubjectsPage({ onSelect }: any) {
  return (
    <div>
      <h2>Subjects</h2>

      {subjects.map((s) => (
        <AppCard key={s.id}>
          <h3>{s.name}</h3>
          <AppButton onClick={() => onSelect(s.id)}>
            Open
          </AppButton>
        </AppCard>
      ))}
    </div>
  );
}
