import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("currentUser"));
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const role = localStorage.getItem("role");

  // Protect page
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");

    alert("Logged out successfully");
    navigate("/login");
  };

  // ✅ FIXED CHAT NAVIGATION
  const goToChat = () => {
    if (role === "counsellor") {
      navigate("/counsellor-chat");
    } else {
      navigate("/student-chat");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-purple-50">

      <div className="bg-white p-10 rounded-xl shadow text-center">

        <h1 className="text-3xl font-bold mb-4">
          Welcome {user?.name || "User"} 👋
        </h1>

        <p className="text-gray-600 mb-6">
          You have successfully logged in to MindBridge.
        </p>

        {/* ✅ CHAT BUTTON FIXED */}
        <button
          onClick={goToChat}
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 mb-4"
        >
          Go to Chat
        </button>

        {/* VIDEO */}
        <button
          onClick={() => navigate("/video")}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 mb-4"
        >
          Start Video Call
        </button>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Dashboard;