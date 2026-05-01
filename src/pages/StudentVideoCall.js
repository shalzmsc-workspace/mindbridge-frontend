import { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import socket from "../socket";
import { useNavigate } from "react-router-dom";

function StudentVideoCall() {
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  const [stream, setStream] = useState(null);
  const [connected, setConnected] = useState(false);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("currentUser") || "{}");
  const callData = JSON.parse(localStorage.getItem("callData") || "null");

  useEffect(() => {
    if (!user?.email) return;

    socket.emit("register-user", user.email);

    const startCamera = async () => {
      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          alert("Camera requires HTTPS ❌");
          return;
        }

        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        setStream(mediaStream);

        if (myVideo.current) {
          myVideo.current.srcObject = mediaStream;
        }

        if (callData) {
          answerCall(callData, mediaStream);
        }

      } catch (err) {
        console.error(err);
        alert("Camera/Mic permission denied ❌");
      }
    };

    startCamera();

    return () => {
      socket.off("call-accepted");
      if (stream) stream.getTracks().forEach((t) => t.stop());
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // ✅ keep empty to avoid re-renders

  const answerCall = (data, mediaStream) => {
    if (!data || !mediaStream) return;

    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: mediaStream,
      config: {
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      },
    });

    peer.on("signal", (signal) => {
      socket.emit("answer-call", {
        to: data.from,
        signal,
      });
    });

    peer.on("stream", (remoteStream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = remoteStream;
      }
    });

    peer.signal(data.signal);

    connectionRef.current = peer;
    setConnected(true);

    localStorage.removeItem("callData");
  };

  const endCall = () => {
    connectionRef.current?.destroy();
    if (stream) stream.getTracks().forEach((t) => t.stop());
    navigate("/student-dashboard");
  };

  return (
    <div className="h-screen bg-black flex flex-col">

      <div className="text-white p-4 flex justify-between">
        <h2>Incoming Call</h2>
        <p>{connected ? "Connected" : "Connecting..."}</p>
      </div>

      <div className="flex-1 relative">
        <video ref={userVideo} autoPlay playsInline className="w-full h-full" />
        <video
          ref={myVideo}
          autoPlay
          muted
          playsInline
          className="absolute bottom-5 right-5 w-40"
        />
      </div>

      <div className="p-5 flex justify-center">
        <button onClick={endCall} className="bg-red-600 px-6 py-2 text-white">
          End
        </button>
      </div>
    </div>
  );
}

export default StudentVideoCall;