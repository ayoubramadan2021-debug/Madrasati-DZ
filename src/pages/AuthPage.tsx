import { useState } from "react";
import { signIn, signUp } from "../services/authService";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [grade, setGrade] = useState(1);
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    try {
      if (mode === "login") {
        await signIn(email, password);
      } else {
        await signUp(email, password, name, grade);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>{mode === "login" ? "Login" : "Sign Up"}</h2>

      {mode === "signup" && (
        <>
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Grade"
            value={grade}
            onChange={(e) => setGrade(Number(e.target.value))}
          />
        </>
      )}

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Loading..." : mode}
      </button>

      <button
        onClick={() =>
          setMode(mode === "login" ? "signup" : "login")
        }
      >
        Switch
      </button>
    </div>
  );
}
