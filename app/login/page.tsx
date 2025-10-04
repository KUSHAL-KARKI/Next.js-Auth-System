"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user.username || !user.password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/api/users/login", user);
      console.log("Login successful:", response.data);
      toast.success("Login successful 🎉");
      router.push("/");
    } catch (err: any) {
      console.error("Login failed:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h1 className="form-title">Login</h1>
        <form onSubmit={onLogin} className="form-box">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            className="form-input"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder="Enter your username"
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            className="form-input"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Enter your password"
          />

          <button type="submit" className="form-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Links for Signup and Forgot Password */}
        <div className="form-links">
          <p>
            Don’t have an account?{" "}
            <span
              className="link"
              onClick={() => router.push("/signup")}
              style={{ color: "#0070f3", cursor: "pointer" }}
            >
              Sign up
            </span>
          </p>
          <p>
            <span
              className="link"
              onClick={() => router.push("/forgotpassword")}
              style={{ color: "#0070f3", cursor: "pointer" }}
            >
              Forgot Password?
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
