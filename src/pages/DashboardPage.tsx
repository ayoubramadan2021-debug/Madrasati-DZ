import { useAppState } from "../store/appState";

export default function DashboardPage() {
  const { profile } = useAppState();

  return (
    <div style={{ textAlign: "center", padding: 20 }}>
      <h1>Taalim DZ</h1>

      <h2>{profile?.name}</h2>

      <p>Points: {profile?.points}</p>

      <button
        style={{
          padding: 12,
          marginTop: 20,
          width: "100%",
        }}
        onClick={() => (window.location.href = "#subjects")}
      >
        Start Learning
      </button>
    </div>
  );
}
