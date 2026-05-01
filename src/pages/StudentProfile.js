import { useState } from "react";

const BASE_URL = "https://sjckmindbridge.onrender.com";

const avatars = [
  "/avatars/avatar1.jpg",
  "/avatars/avatar2.jpg",
  "/avatars/avatar3.jpg",
  "/avatars/avatar4.jpg",
  "/avatars/avatar5.jpg",
  "/avatars/avatar6.jpg",
  "/avatars/avatar7.jpg",
  "/avatars/avatar8.jpg",
];

function StudentProfile() {

  const user = JSON.parse(localStorage.getItem("currentUser"));

  const [profile, setProfile] = useState(
    user?.profile || avatars[0]
  );

  const selectAvatar = async (img) => {

    try {
      const res = await fetch(`${BASE_URL}/upload-profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          image: img,
        }),
      });

      const data = await res.json();

      if (data.success) {

        setProfile(img);

        // 🔥 IMPORTANT: update localStorage
        localStorage.setItem(
          "currentUser",
          JSON.stringify(data.user)
        );

      } else {
        alert("Update failed ❌");
      }

    } catch (err) {
      console.log(err);
      alert("Server error ❌");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-purple-50">

      <div className="bg-white p-8 rounded-xl shadow text-center">

        <h2 className="text-xl font-bold mb-4">My Profile</h2>

        <img
          src={profile}
          className="w-24 h-24 rounded-full mx-auto mb-4 border"
        />

        <p className="font-semibold">{user.name}</p>
        <p className="text-gray-500">{user.email}</p>

        <p className="text-sm text-gray-400 mt-3">
          Choose your avatar
        </p>

        <div className="grid grid-cols-4 gap-3 mt-4">

          {avatars.map((img, i) => (
            <img
              key={i}
              src={img}
              onClick={() => selectAvatar(img)}
              className={`w-16 h-16 rounded-full cursor-pointer border-2 transition ${
                profile === img
                  ? "border-purple-600 scale-110 shadow-lg"
                  : "border-gray-300"
              }`}
            />
          ))}

        </div>

      </div>

    </div>
  );
}

export default StudentProfile;