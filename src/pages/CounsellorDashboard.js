import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import socket, { connectSocket } from "../socket";

const BASE_URL = "https://sjckmindbridge.onrender.com";

// 🔥 ONLY 2 FIXED IMAGES
const avatars = [
  "/avatars/c1.jpg",
  "/avatars/c2.jpg",
];

function CounsellorDashboard() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [profileImage, setProfileImage] = useState("");
  const [unseenCounts, setUnseenCounts] = useState({}); // ✅ FIXED POSITION

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("currentUser"));
    } catch {
      return null;
    }
  });

  // ================= AUTO PROFILE =================
  useEffect(() => {
    if (!user?.email) return;

    const randomAvatar =
      avatars[Math.floor(Math.random() * avatars.length)];

    setProfileImage(randomAvatar);

    const updatedUser = { ...user, profile: randomAvatar };
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    setUser(updatedUser);

  }, []);

  // ================= FETCH USERS =================
  useEffect(() => {
    if (!user?.email) return;

    const fetchUsers = async () => {
      try {
        const res = await fetch(`${BASE_URL}/users`);
        const data = await res.json();

        setStudents(
          Array.isArray(data)
            ? data.filter((u) => u.email !== user.email)
            : []
        );
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchUsers();
  }, [user]);

  // ================= UNSEEN MESSAGES =================
  useEffect(() => {
    if (!user?.email || students.length === 0) return;

    const checkUnseen = async () => {
      let counts = {};

      for (let s of students) {
        const room = [user.email, s.email].sort().join("-");

        try {
          const res = await fetch(`${BASE_URL}/messages/${room}`);
          const data = await res.json();

          const total = data.length;
          const seen = parseInt(localStorage.getItem(`seen_${room}`)) || 0;

          const unseen = total - seen;

          if (unseen > 0) {
            counts[s.email] = unseen;
          }

        } catch (err) {
          console.log("Unseen error:", err);
        }
      }

      setUnseenCounts(counts);
    };

    checkUnseen();
  }, [students, user]);

  // ================= SOCKET =================
  useEffect(() => {
    if (!user?.email) return;

    connectSocket();
    socket.emit("register-user", user.email);

    const handleOnline = (users) => {
      setOnlineUsers(Array.isArray(users) ? users : []);
    };

    socket.off("online-users");
    socket.on("online-users", handleOnline);

    // 🔥 REAL-TIME UNSEEN UPDATE
    socket.on("receive_message", (msg) => {
      if (!msg?.room) return;

      setUnseenCounts((prev) => {
        const sender = msg.sender;
        return {
          ...prev,
          [sender]: (prev[sender] || 0) + 1,
        };
      });
    });

    return () => {
      socket.off("online-users", handleOnline);
      socket.off("receive_message");
    };

  }, [user]);

  // ================= DELETE =================
  const handleDelete = async (email) => {
    if (!window.confirm("Remove this student?")) return;

    try {
      await fetch(`${BASE_URL}/delete-user/${email}`, {
        method: "DELETE",
      });

      setStudents((prev) => prev.filter((s) => s.email !== email));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">

        <div>
          <h2 className="text-2xl font-bold text-purple-700">
            Counsellor Dashboard
          </h2>
          <p className="text-sm text-gray-500">
            Total Students: {students.length}
          </p>
        </div>

        {/* PROFILE */}
        <div className="flex flex-col items-center">
          <img
            src={profileImage || avatars[0]}
            alt="profile"
            className="w-14 h-14 rounded-full border object-cover"
          />
        </div>

      </div>

      {/* STUDENTS */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

        {students.map((s, i) => {
          const isOnline = onlineUsers.includes(s.email);

          return (
            <div key={i} className="bg-white p-4 rounded-xl shadow">

              <div className="flex items-center gap-3">
                <img
                  src={s.profile || avatars[0]}
                  alt="student"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{s.name}</p>
                  <p className="text-xs text-gray-500">{s.email}</p>
                </div>
              </div>

              <p className={`mt-2 text-sm ${
                isOnline ? "text-green-600" : "text-gray-400"
              }`}>
                {isOnline ? "🟢 Online" : "⚪ Offline"}
              </p>

              {/* BUTTONS */}
              <div className="flex gap-2 mt-3">

                <button
                  onClick={() =>
                    navigate("/counsellor-chat", { state: { student: s } })
                  }
                  className="flex-1 bg-purple-600 text-white py-2 rounded relative"
                >
                  Chat

                  {/* 🔴 NOTIFICATION */}
                  {unseenCounts[s.email] > 0 && (
                    <span className="absolute top-1 right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {unseenCounts[s.email]}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => handleDelete(s.email)}
                  className="bg-red-500 text-white px-3 rounded"
                >
                  ✕
                </button>

              </div>

            </div>
          );
        })}
      </div>

      {students.length === 0 && (
        <p className="text-center text-gray-400 mt-10">
          No students found
        </p>
      )}

    </div>
  );
}

export default CounsellorDashboard;