"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const Page = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await axios.get("/api/users/me", {
          withCredentials: true, // ensure cookies are sent
        });
        setIsAuth(true);
        setAdmin(data?.data?.isAdmin || false);
      } catch (err) {
        setIsAuth(false);
        setAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("/api/users/logout");
      setIsAuth(false);
      setAdmin(false);
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="home-container">
      <div className="home-card">
        <h1 className="home-title">Home Page</h1>
        <p className="home-subtitle">Welcome to the home page!</p>
        <p className="home-description">
          This is a simple Next.js application with authentication.
        </p>

        <div className="home-auth-section">
          {loading ? (
            <button disabled className="home-button home-button-loading">
              Loading...
            </button>
          ) : isAuth ? (
            <>
              <p className="home-navigation-text">
                Use the links below to navigate:
              </p>
              <div className="home-button-container">
                <button
                  onClick={() => router.push("/profile")}
                  className="home-button home-button-primary"
                >
                  Profile
                </button>

                {admin && (
                  <button
                    onClick={() => router.push("/admin")}
                    className="home-button home-button-admin"
                  >
                    Admin
                  </button>
                )}

                <button
                  onClick={handleLogout}
                  className="home-button home-button-danger"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="home-unauth-text">
                Please login or signup to access your profile.
              </p>
              <div className="home-button-container">
                <button
                  onClick={() => router.push("/login")}
                  className="home-button home-button-primary"
                >
                  Login
                </button>
                <button
                  onClick={() => router.push("/signup")}
                  className="home-button home-button-secondary"
                >
                  Sign Up
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
