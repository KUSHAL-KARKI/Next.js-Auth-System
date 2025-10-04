"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const OnSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/api/users/signup", user);
      toast.success("Signup Successful");
      router.push("/profile");
    } catch (err: any) {
      console.error("Signup failed:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h1 className="form-title">Signup</h1>
        <form onSubmit={OnSignup} className="form-box">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            className="form-input"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder="Enter your username"
          />
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            className="form-input"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Enter your email"
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
            {loading ? "Signing up..." : "Sign up"}
          </button>
        </form>

        {/* Links for Login */}
        <div className="form-links">
          <p>
            Already have an account?{" "}
            <span
              className="link"
              onClick={() => router.push("/login")}
              style={{ color: "#0070f3", cursor: "pointer" }}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
