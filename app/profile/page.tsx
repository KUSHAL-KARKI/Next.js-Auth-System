"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [detail, setDetail] = useState(false);
  const [data, setData] = useState("");
  const logout = async () => {
    try {
      await axios.post("/api/users/logout");
      toast.success("Logout successful");
      router.push("/");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data._id);
    setDetail(true);
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
      <h1 className="profile-title">Profile</h1>
      <h2>
        {data && (
          <Link className="profile-id" href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      {detail === false ? (
        <button onClick={getUserDetails} className="btn btn-details">
          GetUser Details
        </button>
      ) : (
        <button
          onClick={() => {
            setData("");
            setDetail(false);
          }}
          className="btn btn-details"
        >
          HideUser Details
        </button>
      )}
      <hr />

      <button onClick={logout} className="btn btn-logout">
        Logout
      </button>
    </div>
    </div>
  );
}
