import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const BASE_URL = "https://sjckmindbridge.onrender.com";

  const handleRegister = async () => {
    const cleanEmail = email.trim().toLowerCase();

    // ✅ VALIDATION
    if (!name.trim() || !cleanEmail || !password) {
      alert("Please fill all fields ❌");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters ❌");
      return;
    }

    try {
      setLoading(true);

      console.log("📡 Sending request to:", `${BASE_URL}/register`);

      const res = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: cleanEmail,
          password,
        }),
      });

      console.log("📥 Status:", res.status);

      // ✅ Check if response is valid JSON
      let data;
      const text = await res.text();

      try {
        data = JSON.parse(text);
      } catch {
        console.error("❌ Invalid JSON:", text);
        alert("Server error ❌ (check backend)");
        return;
      }

      console.log("📥 Response:", data);

      // ✅ SUCCESS
      if (res.ok && data.success) {
        alert("Registered Successfully ✅");

        setName("");
        setEmail("");
        setPassword("");

        navigate("/login");
      } else {
        alert(data.message || "Registration failed ❌");
      }

    } catch (error) {
      console.error("❌ Register error:", error);
      alert("Cannot connect to server ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-purple-50">
      <div className="bg-white p-6 md:p-8 rounded-xl shadow w-[90%] max-w-md">

        <h2 className="text-2xl font-bold text-center mb-2">
          Create Account
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Register with any email
        </p>

        {/* NAME */}
        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 border rounded mb-4 outline-none focus:ring-2 focus:ring-purple-400"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* EMAIL */}
        <input
          type="text"
          placeholder="Enter any email"
          className="w-full p-3 border rounded mb-4 outline-none focus:ring-2 focus:ring-purple-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password (min 6 chars)"
          className="w-full p-3 border rounded mb-4 outline-none focus:ring-2 focus:ring-purple-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* BUTTON */}
        <button
          onClick={handleRegister}
          disabled={loading}
          className={`w-full py-3 rounded-lg transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700 text-white"
          }`}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        {/* LOGIN */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-purple-600 cursor-pointer font-medium"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}

export default Register;