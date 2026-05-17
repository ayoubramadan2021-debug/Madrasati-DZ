export default function QuizResult({ correct }: any) {
  return (
    <div
      style={{
        padding: 12,
        marginTop: 10,
        borderRadius: 10,
        backgroundColor: correct ? "#dcfce7" : "#fee2e2",
        color: correct ? "#166534" : "#991b1b",
        fontWeight: "bold",
        textAlign: "center",
      }}
    >
      {correct ? "Correct Answer" : "Wrong Answer"}
    </div>
  );
}
