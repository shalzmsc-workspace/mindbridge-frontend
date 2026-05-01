import { useEffect, useRef } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";

const APP_ID = "55714b5c7fa24125be1efff2f65afcef"; // ✅ your App ID

function AgoraCall() {
  const localRef = useRef(null);
  const remoteRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      try {
        const client = AgoraRTC.createClient({
          mode: "rtc",
          codec: "vp8",
        });

        // 🔥 SAME ROOM NAME FOR BOTH USERS
        const user = JSON.parse(localStorage.getItem("currentUser") || "{}");
        const other = JSON.parse(localStorage.getItem("chatUser") || "{}");

        const room = [user.email, other.email].sort().join("-");

        console.log("🎥 Joining room:", room);

        await client.join(APP_ID, room, null, null);

        const [micTrack, camTrack] =
          await AgoraRTC.createMicrophoneAndCameraTracks();

        // 🎥 show my video
        camTrack.play(localRef.current);

        // 📤 publish tracks
        await client.publish([micTrack, camTrack]);

        // 📥 receive other user
        client.on("user-published", async (remoteUser, mediaType) => {
          await client.subscribe(remoteUser, mediaType);

          if (mediaType === "video") {
            remoteUser.videoTrack.play(remoteRef.current);
          }

          if (mediaType === "audio") {
            remoteUser.audioTrack.play();
          }
        });

      } catch (err) {
        console.error("❌ Agora error:", err);
        alert("Camera/Mic error or permission denied ❌");
      }
    };

    init();
  }, []);

  return (
    <div className="h-screen flex bg-black">

      {/* MY VIDEO */}
      <div className="w-1/2 h-full">
        <div ref={localRef} className="w-full h-full"></div>
      </div>

      {/* OTHER USER */}
      <div className="w-1/2 h-full">
        <div ref={remoteRef} className="w-full h-full"></div>
      </div>

    </div>
  );
}

export default AgoraCall;