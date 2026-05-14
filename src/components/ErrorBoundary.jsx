import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("APP ERROR:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "25px", color: "white", background: "#0f172a", minHeight: "100vh" }}>
          <h1>⚠️ حدث خطأ في التطبيق</h1>
          <pre style={{ whiteSpace: "pre-wrap", background: "#13203a", padding: "15px", borderRadius: "12px" }}>
            {String(this.state.error)}
          </pre>
        </div>
      );
    }

    return this.props.children;
  }
}
