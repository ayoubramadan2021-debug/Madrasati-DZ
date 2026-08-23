import React from "react";

import Lesson52ExercisesPage from
  "./Lesson52ExercisesPage";

type BoundaryProps = {
  children: React.ReactNode;
};

type BoundaryState = {
  error: Error | null;
  componentStack: string;
};

class Lesson52RuntimeBoundary extends React.Component<
  BoundaryProps,
  BoundaryState
> {
  state: BoundaryState = {
    error: null,
    componentStack: "",
  };

  static getDerivedStateFromError(
    error: Error,
  ): BoundaryState {
    return {
      error,
      componentStack: "",
    };
  }

  componentDidCatch(
    error: Error,
    errorInfo: React.ErrorInfo,
  ) {
    console.error(
      "LESSON52_EXERCISES_RUNTIME_ERROR",
      error,
      errorInfo,
    );

    this.setState({
      error,
      componentStack:
        errorInfo.componentStack ?? "",
    });
  }

  render() {
    const {
      error,
      componentStack,
    } = this.state;

    if (!error) {
      return this.props.children;
    }

    return (
      <main
        dir="rtl"
        style={{
          minHeight: "100vh",
          padding: "24px",
          background: "#07101f",
          color: "#ffffff",
          fontFamily:
            "Tajawal, Cairo, sans-serif",
        }}
      >
        <section
          style={{
            maxWidth: "850px",
            margin: "0 auto",
            padding: "22px",
            borderRadius: "18px",
            background: "#5e1720",
            border: "3px solid #ffb4b4",
          }}
        >
          <h1
            style={{
              marginTop: 0,
              color: "#ffffff",
            }}
          >
            خطأ تشغيل تمارين الدرس 52
          </h1>

          <p>
            تم الوصول إلى رابط التمارين،
            لكن أحد مكونات الصفحة تعطل أثناء العرض.
          </p>

          <h2>رسالة الخطأ</h2>

          <pre
            dir="ltr"
            style={{
              whiteSpace: "pre-wrap",
              overflowWrap: "anywhere",
              padding: "14px",
              borderRadius: "12px",
              background: "#18080b",
              color: "#ffd6d6",
              fontSize: "13px",
            }}
          >
            {error.name}: {error.message}
          </pre>

          {error.stack && (
            <>
              <h2>Stack</h2>

              <pre
                dir="ltr"
                style={{
                  whiteSpace: "pre-wrap",
                  overflowWrap: "anywhere",
                  padding: "14px",
                  borderRadius: "12px",
                  background: "#18080b",
                  color: "#ffd6d6",
                  fontSize: "12px",
                }}
              >
                {error.stack}
              </pre>
            </>
          )}

          {componentStack && (
            <>
              <h2>Component stack</h2>

              <pre
                dir="ltr"
                style={{
                  whiteSpace: "pre-wrap",
                  overflowWrap: "anywhere",
                  padding: "14px",
                  borderRadius: "12px",
                  background: "#18080b",
                  color: "#ffd6d6",
                  fontSize: "12px",
                }}
              >
                {componentStack}
              </pre>
            </>
          )}
        </section>
      </main>
    );
  }
}

export default function Lesson52ExercisesRoutePage() {
  return (
    <Lesson52RuntimeBoundary>
      <Lesson52ExercisesPage />
    </Lesson52RuntimeBoundary>
  );
}
