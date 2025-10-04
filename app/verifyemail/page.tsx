"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const VerifyEmailPage = () => {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
      setError("");
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Verification failed. Try again."
      );
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) verifyUserEmail();
  }, [token]);

  return (
    <div className="verify-container">
      <div className="verify-box">
        <h1 className="verify-title">Verify Your Email</h1>
        <p className="verify-subtitle">
          {token ? "Processing your request..." : "No token provided"}
        </p>

        {verified && (
          <>
            <p className="verify-success">✅ Email verified successfully!</p>
            <Link href="/login" className="verify-btn">
              Go to Login
            </Link>
          </>
        )}

        {error && <p className="verify-error">❌ {error}</p>}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
