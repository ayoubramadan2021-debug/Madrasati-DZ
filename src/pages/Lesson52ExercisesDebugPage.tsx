import React, {
  Suspense,
  useEffect,
  useState,
} from "react";

const LazyLesson52ExercisesPage = React.lazy(
  () => import("./Lesson52ExercisesPage"),
);

type BoundaryProps = {
  children: React.ReactNode;
};

type BoundaryState = {
  error: Error | null;
  componentStack: string;
};

function ErrorScreen({
  title,
  message,
  stack,
  componentStack,
}: {
  title: string;
  message: string;
  stack?: string;
  componentStack?: string;
}) {
  return (
    <main
      dir="rtl"
      style={{
        minHeight: "100vh",
        boxSizing: "border-box",
        padding: "20px",
        background: "#07101f",
        color: "#ffffff",
        fontFamily:
          "Tajawal, Cairo, Arial, sans-serif",
      }}
    >
      <section
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "22px",
          borderRadius: "20px",
          background: "#681822",
          border: "3px solid #ff9ca7",
          boxShadow:
            "0 15px 45px rgba(0,0,0,.45)",
        }}
      >
        <h1
          style={{
            marginTop: 0,
            color: "#ffffff",
            fontSize: "24px",
          }}
        >
          {title}
        </h1>

        <p
          style={{
            lineHeight: 1.8,
            fontSize: "16px",
          }}
        >
          تم الوصول إلى رابط تمارين الدرس 52،
          لكن حدث خطأ أثناء تشغيل أحد المكونات.
        </p>

        <h2
          style={{
            fontSize: "18px",
            color: "#ffd5da",
          }}
        >
          رسالة الخطأ
        </h2>

        <pre
          dir="ltr"
          style={{
            whiteSpace: "pre-wrap",
            overflowWrap: "anywhere",
            padding: "14px",
            borderRadius: "12px",
            background: "#190609",
            color: "#ffd9dd",
            fontSize: "13px",
            lineHeight: 1.6,
          }}
        >
          {message}
        </pre>

        {stack && (
          <>
            <h2
              style={{
                fontSize: "18px",
                color: "#ffd5da",
              }}
            >
              JavaScript stack
            </h2>

            <pre
              dir="ltr"
              style={{
                whiteSpace: "pre-wrap",
                overflowWrap: "anywhere",
                padding: "14px",
                borderRadius: "12px",
                background: "#190609",
                color: "#ffd9dd",
                fontSize: "12px",
                lineHeight: 1.55,
              }}
            >
              {stack}
            </pre>
          </>
        )}

        {componentStack && (
          <>
            <h2
              style={{
                fontSize: "18px",
                color: "#ffd5da",
              }}
            >
              React component stack
            </h2>

            <pre
              dir="ltr"
              style={{
                whiteSpace: "pre-wrap",
                overflowWrap: "anywhere",
                padding: "14px",
                borderRadius: "12px",
                background: "#190609",
                color: "#ffd9dd",
                fontSize: "12px",
                lineHeight: 1.55,
              }}
            >
              {componentStack}
            </pre>
          </>
        )}

        <button
          type="button"
          onClick={() => {
            window.location.reload();
          }}
          style={{
            width: "100%",
            marginTop: "16px",
            padding: "13px",
            border: 0,
            borderRadius: "12px",
            background: "#ffffff",
            color: "#681822",
            fontWeight: 800,
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          إعادة تحميل الصفحة
        </button>
      </section>
    </main>
  );
}

class Lesson52ErrorBoundary extends React.Component<
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
    info: React.ErrorInfo,
  ) {
    console.error(
      "LESSON52_RUNTIME_ERROR",
      error,
      info,
    );

    this.setState({
      error,
      componentStack:
        info.componentStack ?? "",
    });
  }

  render() {
    if (this.state.error) {
      return (
        <ErrorScreen
          title="خطأ تشغيل تمارين الدرس 52"
          message={
            `${this.state.error.name}: ` +
            this.state.error.message
          }
          stack={this.state.error.stack}
          componentStack={
            this.state.componentStack
          }
        />
      );
    }

    return this.props.children;
  }
}

function GlobalRuntimeErrorWatcher() {
  const [runtimeError, setRuntimeError] =
    useState<{
      message: string;
      stack?: string;
    } | null>(null);

  useEffect(() => {
    const handleError = (
      event: ErrorEvent,
    ) => {
      const error = event.error;

      setRuntimeError({
        message:
          error instanceof Error
            ? `${error.name}: ${error.message}`
            : event.message ||
              "خطأ JavaScript غير معروف",
        stack:
          error instanceof Error
            ? error.stack
            : undefined,
      });
    };

    const handleRejection = (
      event: PromiseRejectionEvent,
    ) => {
      const reason = event.reason;

      setRuntimeError({
        message:
          reason instanceof Error
            ? `${reason.name}: ${reason.message}`
            : String(reason),
        stack:
          reason instanceof Error
            ? reason.stack
            : undefined,
      });
    };

    window.addEventListener(
      "error",
      handleError,
    );

    window.addEventListener(
      "unhandledrejection",
      handleRejection,
    );

    return () => {
      window.removeEventListener(
        "error",
        handleError,
      );

      window.removeEventListener(
        "unhandledrejection",
        handleRejection,
      );
    };
  }, []);

  if (!runtimeError) {
    return null;
  }

  return (
    <ErrorScreen
      title="خطأ JavaScript داخل التمارين"
      message={runtimeError.message}
      stack={runtimeError.stack}
    />
  );
}

function LoadingScreen() {
  return (
    <main
      dir="rtl"
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "20px",
        background: "#07101f",
        color: "#ffffff",
        fontFamily:
          "Tajawal, Cairo, sans-serif",
      }}
    >
      <div
        style={{
          padding: "22px",
          borderRadius: "18px",
          background: "#102442",
          border: "2px solid #e8a020",
          textAlign: "center",
        }}
      >
        جاري تحميل تمارين الدرس 52...
      </div>
    </main>
  );
}

export default function Lesson52ExercisesDebugPage() {
  return (
    <Lesson52ErrorBoundary>
      <GlobalRuntimeErrorWatcher />

      <Suspense fallback={<LoadingScreen />}>
        <LazyLesson52ExercisesPage />
      </Suspense>
    </Lesson52ErrorBoundary>
  );
}
