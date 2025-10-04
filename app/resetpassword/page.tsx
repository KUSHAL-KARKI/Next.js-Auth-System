"use client"
import { useState ,useEffect } from "react";
import { useRouter} from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const resetPasswordPage = () => {
    const[newPassword, setNewPassword] = useState("");
    const[loading, setLoading] = useState(false);
    const router = useRouter();
    const [token,setToken]= useState("");

    useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);
  const OnResetPass = async (e:any) => {
e.preventDefault();
setLoading(true);
try {
    const response = await axios.post("/api/users/resetpassword", {token, newPassword});
    console.log("Password reset successful",response.data);
    toast.success("Password reset successful, you can now login");
    router.push("/login");
    
} catch (error) {
    console.error(error);
    toast.error("Password reset failed, please try again");
} finally {
    setLoading(false);
}
  }

  return (
    <div className="form-container">
      <div className="form-card">
      <h1 className="form-title">Reset Password</h1>
      <form onSubmit={OnResetPass} className="form-box">
        <label htmlFor="password">New Password:</label>
        <input
          type="text"
          id="username"
          className="form-input"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter your new password"
        />
        <button type="submit" className="form-button" disabled={loading}>
          {loading ? "Re..." : "Reset Password"}
        </button>
      </form>
    </div>
      </div>
  )
}

export default resetPasswordPage