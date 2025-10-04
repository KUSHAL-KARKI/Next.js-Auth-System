"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function UserProfile() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    axios.get("/api/users/me")
      .then((res) => setUser(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  if (!user) return <p>Loading user...</p>;

  return (
    <div className="user-profile-container">
      <div className="user-profile-card">
      <h1 className="user-profile-title">My Profile</h1>
      <hr />
      <div className="user-profile-text">
        <p><strong>ID:</strong> {user._id}</p>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Verified:</strong> {user.isVerified ? "Yes" : "No"}</p>
        <p><strong>Admin:</strong> {user.isAdmin ? "Yes" : "No"}</p>
      </div>
    </div>
    </div>
  );
}
