"use client";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const OnForgotPass = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/users/forgotpassword", { email });
      toast.success("Password reset link sent to your email");
    } catch (err: any) {
      console.error(err.message);
        toast.error(err.response?.data?.message); 
    }
    finally{
        setLoading(false);
    }
  };
  return (
    <div className="form-container">
       <div className="form-card">
      <h1 className="form-title">Forgot Password</h1>
      <form onSubmit={OnForgotPass} className="form-box">
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          className="form-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        <button type="submit" className="form-button" disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </div>
    </div>
   
  );
}
