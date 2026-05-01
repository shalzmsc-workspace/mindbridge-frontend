import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const BASE_URL = "https://sjckmindbridge.onrender.com";

function StudentDashboard() {

  const navigate = useNavigate();

  const storedUser = localStorage.getItem("currentUser");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const [profile, setProfile] = useState(
    user?.profile ||
    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
  );

  // ================= FETCH LATEST PROFILE =================
  useEffect(() => {

    const fetchProfile = async () => {

      if (!user?.email) return;

      try {

        const res = await fetch(`${BASE_URL}/users`);
        const users = await res.json();

        const found = users.find(
          (u) => u.email === user.email
        );

        if (found?.profile) {

          setProfile(found.profile);

          // 🔥 update localStorage also
          localStorage.setItem(
            "currentUser",
            JSON.stringify(found)
          );
        }

      } catch (err) {
        console.log("Profile fetch error:", err);
      }
    };

    fetchProfile();

  }, []);

  // ================= GREETING =================
  const hour = new Date().getHours();

  let greeting = "Hello";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 18) greeting = "Good Afternoon";
  else greeting = "Good Evening";

  if (!user) return <div>Please login again</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-purple-50">

      <div className="bg-white p-8 rounded-xl shadow text-center w-[350px]">

        {/* PROFILE */}
        <img
          src={profile}
          alt="profile"
          className="w-24 h-24 rounded-full mx-auto mb-4 border object-cover"
        />

        {/* GREETING */}
        <h2 className="text-xl font-bold">
          {greeting}, {user.name} 👋
        </h2>

        <p className="text-gray-500 mb-4">
          Welcome to your dashboard! Here you can chat with your counsellor and manage your profile.
        </p>

        {/* QUOTE */}
        <div className="bg-purple-100 text-purple-800 p-3 rounded-lg text-sm mb-5">
          "Small steps every day lead to big success. Keep going 💪"
        </div>

        {/* BUTTONS */}
        <div className="flex flex-col gap-3">

          <button
            onClick={() => navigate("/student-chat")}
            className="bg-purple-600 text-white py-2 rounded-lg"
          >
            Chat with Counsellor
          </button>

          <button
            onClick={() => navigate("/profile")}
            className="bg-blue-600 text-white py-2 rounded-lg"
          >
            My Profile
          </button>

        </div>

      </div>

    </div>
  );
}

export default StudentDashboard;