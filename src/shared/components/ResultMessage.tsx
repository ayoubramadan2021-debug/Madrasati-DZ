export default function ResultMessage({ correct }: any) {
  return (
    <div
      style={{
        padding: 10,
        marginTop: 10,
        backgroundColor: correct ? "#d1fae5" : "#fee2e2",
        color: correct ? "#065f46" : "#991b1b",
        borderRadius: 8,
        textAlign: "center",
        fontWeight: "bold",
      }}
    >
      {correct ? "Correct" : "Wrong"}
    </div>
  );
}
