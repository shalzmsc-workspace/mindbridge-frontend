import { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import socket from "../socket";
import { useNavigate } from "react-router-dom";

function CounsellorVideoCall() {
  const myVideo = useRef();
  const userVideo = useRef();

  const [stream, setStream] = useState(null);
  const [callStarted, setCallStarted] = useState(false);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("currentUser") || "{}");
  const targetUser = JSON.parse(localStorage.getItem("chatUser") || "{}");

  // 🎥 Start camera
  useEffect(() => {
    if (!user?.email) return;

    socket.emit("register-user", user.email);

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        setStream(mediaStream);

        if (myVideo.current) {
          myVideo.current.srcObject = mediaStream;
        }
      })
      .catch(() => {
        alert("Camera/Mic permission denied ❌");
      });

    return () => {
      socket.off("call-accepted");
      if (stream) stream.getTracks().forEach((t) => t.stop());
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // ✅ keep empty

  // 📞 CALL STUDENT
  const callUser = () => {
    if (!targetUser?.email) {
      alert("No student selected ❌");
      return;
    }

    if (!stream) {
      alert("Camera not ready ❌");
      return;
    }

    console.log("📞 Calling:", targetUser.email);

    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
      config: {
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      },
    });

    peer.on("signal", (data) => {
      socket.emit("call-user", {
        to: targetUser.email,
        from: user.email,
        signal: data,
      });
    });

    peer.on("stream", (remoteStream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = remoteStream;
      }
    });

    socket.off("call-accepted"); // ✅ prevent duplicate
    socket.on("call-accepted", (signal) => {
      console.log("✅ Call accepted");
      setCallStarted(true);
      peer.signal(signal);
    });
  };

  // ❌ END CALL
  const endCall = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    navigate("/counsellor-dashboard");
  };

  return (
    <div className="h-screen bg-black flex flex-col">

      {/* HEADER */}
      <div className="text-white p-4 flex justify-between items-center">
        <h2>{targetUser?.name || "Video Call"}</h2>
        <p className="text-green-400">
          {callStarted ? "Connected" : "Calling..."}
        </p>
      </div>

      {/* VIDEO AREA */}
      <div className="flex-1 relative">

        <video
          ref={userVideo}
          autoPlay
          playsInline
          className="w-full h-full object-cover"
        />

        <video
          ref={myVideo}
          autoPlay
          muted
          playsInline
          className="absolute bottom-5 right-5 w-40 h-32 border rounded-lg"
        />

      </div>

      {/* CONTROLS */}
      <div className="p-5 flex justify-center gap-6 bg-black/70">

        <button
          onClick={callUser}
          className="bg-green-600 px-6 py-2 rounded text-white"
        >
          📞 Call
        </button>

        <button
          onClick={endCall}
          className="bg-red-600 px-6 py-2 rounded text-white"
        >
          ❌ End
        </button>

      </div>

    </div>
  );
}

export default CounsellorVideoCall;