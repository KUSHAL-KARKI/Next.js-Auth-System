"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function AdminPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("/api/admin/users", {
        withCredentials: true,
      });
      setUsers(data.users);
    } catch (err: any) {
      toast.error("Admins only!");
      router.push("/");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="admin-container">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-card">
        <h1>Admin Dashboard</h1>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Username</th>
              <th>Role</th>
              <th>Verified</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((u) => (
                <tr key={u._id}>
                  <td>{u.email}</td>
                  <td>{u.username}</td>
                  <td>{u.isAdmin ? "Admin" : "User"}</td>
                  <td>{u.isVerified ? "✅" : "❌"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="no-users">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
