import React from "react";
import ArabicLesson05ExercisesV2 from "../features/lesson-v2/exercises-v2/arabic/ArabicLesson05ExercisesV2";

type State = {
  error: Error | null;
  info: React.ErrorInfo | null;
};

class Lesson05ErrorBoundary extends React.Component<
  React.PropsWithChildren,
  State
> {
  state: State = {
    error: null,
    info: null,
  };

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("[U05 RUNTIME ERROR]", error, info);
    this.setState({ info });
  }

  render() {
    const { error, info } = this.state;

    if (error) {
      return (
        <div
          dir="ltr"
          style={{
            minHeight: "100vh",
            padding: 24,
            background: "#fff",
            color: "#111",
            fontFamily: "monospace",
            boxSizing: "border-box",
          }}
        >
          <h2 style={{ marginTop: 0 }}>
            U05 RUNTIME ERROR
          </h2>

          <div
            style={{
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              border: "2px solid #c00",
              borderRadius: 12,
              padding: 16,
            }}
          >
            <strong>{error.name}</strong>
            {"\n"}
            {error.message}
            {"\n\n"}
            {error.stack ?? "NO ERROR STACK"}
            {"\n\n--- COMPONENT STACK ---\n"}
            {info?.componentStack ?? "NO COMPONENT STACK"}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function ArabicLesson05ExercisesPage() {
  return (
    <Lesson05ErrorBoundary>
      <ArabicLesson05ExercisesV2 />
    </Lesson05ErrorBoundary>
  );
}
