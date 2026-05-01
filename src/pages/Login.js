import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const BASE_URL = "https://sjckmindbridge.onrender.com";

  const handleLogin = async () => {
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      alert("Please fill all fields ❌");
      return;
    }

    try {
      // ================= COUNSELLOR LOGIN (HARDCODED) =================
      if (role === "counsellor") {

        if (
          cleanEmail === "sjckcounselling@gmail.com" &&
          password === "sjckcounselling112000"
        ) {
          const counsellorUser = {
            name: "Counsellor",
            email: cleanEmail,
            role: "counsellor",
            profile: "/avatars/c1.jpg" // default avatar
          };

          localStorage.setItem("currentUser", JSON.stringify(counsellorUser));
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("role", "counsellor");

          alert("Counsellor Login Successful ✅");
          navigate("/counsellor-dashboard");
          return;
        }

        alert("Invalid Counsellor Credentials ❌");
        return;
      }

      // ================= STUDENT LOGIN (API) =================
      const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: cleanEmail,
          password
        })
      });

      const data = await res.json();

      if (data.success && data.user) {
        localStorage.setItem("currentUser", JSON.stringify(data.user));
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", "student");

        alert("Student Login Successful ✅");
        navigate("/student-dashboard");
      } else {
        alert("Invalid Credentials ❌");
      }

    } catch (error) {
      console.error("Login error:", error);
      alert("Server error ❌");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-purple-50">
      <div className="bg-white p-6 md:p-8 rounded-xl shadow w-[90%] max-w-md">

        <h2 className="text-2xl font-bold text-center mb-2">
          Welcome Back
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Sign in to your account
        </p>

        {/* ROLE */}
        <select
          className="w-full p-3 border rounded mb-4"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="student">Student</option>
          <option value="counsellor">Counsellor</option>
        </select>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Enter Email"
          className="w-full p-3 border rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Enter Password"
          className="w-full p-3 border rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* BUTTON */}
        <button
          onClick={handleLogin}
          className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700"
        >
          Login
        </button>

      </div>
    </div>
  );
}

export default Login;