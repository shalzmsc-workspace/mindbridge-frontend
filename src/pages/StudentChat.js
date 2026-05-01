import { useState, useEffect, useRef } from "react";
import socket from "../socket";

const BASE_URL = "https://sjckmindbridge.onrender.com";
const MEET_LINK = "https://meet.google.com/zah-ifja-ucp";

// 🔊 RINGTONE
const CALL_TONE =
  "https://assets.mixkit.co/active_storage/sfx/2868/2868-preview.mp3";

const MSG_TONE =
  "https://assets.mixkit.co/active_storage/sfx/2354/2354-preview.mp3";

const counsellorImages = [
  "/avatars/c1.jpg",
  "/avatars/c2.jpg",
];

function StudentChat() {

  const user = JSON.parse(localStorage.getItem("currentUser"));

  const counsellor = {
    name: "Counsellor",
    email: "sjckcounselling@gmail.com",
  };

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [counsellorImg, setCounsellorImg] = useState("");
  const [incomingCall, setIncomingCall] = useState(null);

  const bottomRef = useRef(null);
  const callRef = useRef(null);
  const msgRef = useRef(null);

  const room =
    user && counsellor
      ? [user.email, counsellor.email].sort().join("-")
      : "";

  // ================= RANDOM IMAGE =================
  useEffect(() => {
    const img =
      counsellorImages[Math.floor(Math.random() * counsellorImages.length)];
    setCounsellorImg(img);
  }, []);

  // ================= LOAD OLD =================
  useEffect(() => {
    if (!room) return;

    fetch(`${BASE_URL}/messages/${room}`)
      .then(res => res.json())
      .then(data => setMessages(Array.isArray(data) ? data : []))
      .catch(err => console.log(err));

  }, [room]);

  // ================= 🔥 SOCKET FIX =================
  useEffect(() => {
    if (!user?.email || !room) return;

    const cleanEmail = user.email.toLowerCase();

    // connect
    if (!socket.connected) {
      socket.connect();
    }

    // 🔥 register AFTER connection
    const onConnect = () => {
      console.log("🟢 Connected:", socket.id);

      socket.emit("register-user", cleanEmail);
      socket.emit("join_room", room);

      console.log("✅ Registered:", cleanEmail);
    };

    socket.on("connect", onConnect);

    // 🔥 also register immediately if already connected
    if (socket.connected) {
      socket.emit("register-user", cleanEmail);
      socket.emit("join_room", room);
    }

    return () => {
      socket.off("connect", onConnect);
    };

  }, [user, room]);

  // ================= RECEIVE MESSAGE =================
  useEffect(() => {
    const handleReceive = (data) => {

      if (data.room !== room) return;

      if (data.sender !== user.email && msgRef.current) {
        msgRef.current.currentTime = 0;
        msgRef.current.play().catch(() => {});
      }

      setMessages(prev => {
        if (prev.some(m => m._id === data._id)) return prev;
        return [...prev, data];
      });
    };

    socket.on("receive_message", handleReceive);

    return () => socket.off("receive_message", handleReceive);

  }, [room]);

  // ================= 🔥 CALL FIX =================
  useEffect(() => {

    const handleIncomingCall = (data) => {
      console.log("📞 CALL RECEIVED:", data);

      setIncomingCall(data);

      if (callRef.current) {
        callRef.current.loop = true;
        callRef.current.play().catch(() => {});
      }
    };

    socket.on("incoming-call", handleIncomingCall);

    return () => socket.off("incoming-call", handleIncomingCall);

  }, []);

  // ================= CALL ACTION =================
  const stopSound = () => {
    if (callRef.current) {
      callRef.current.pause();
      callRef.current.currentTime = 0;
    }
  };

  const acceptCall = () => {
    stopSound();
    setIncomingCall(null);
    window.open(MEET_LINK, "_blank");
  };

  const rejectCall = () => {
    stopSound();
    setIncomingCall(null);
  };

  // ================= SEND =================
  const sendMessage = async () => {
    if (!message.trim()) return;

    await fetch(`${BASE_URL}/send-message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        room,
        text: message,
        sender: user.email
      })
    });

    setMessage("");
  };

  // ================= ENTER =================
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // ================= SCROLL =================
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatTime = (date) =>
    new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });

  if (!user) return <div>Login again</div>;

  return (
    <div className="h-screen flex flex-col bg-[#efeae2]">

      {/* AUDIO */}
      <audio ref={callRef} src={CALL_TONE} />
      <audio ref={msgRef} src={MSG_TONE} />

      {/* CALL POPUP */}
      {incomingCall && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-white p-4 rounded shadow">
          <p className="font-semibold text-center mb-2">📞 Incoming Call</p>

          <div className="flex gap-3 justify-center">
            <button onClick={acceptCall} className="bg-green-600 text-white px-4 py-1 rounded">
              Accept
            </button>
            <button onClick={rejectCall} className="bg-red-600 text-white px-4 py-1 rounded">
              Reject
            </button>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="bg-[#780794] text-white px-4 py-3 flex items-center gap-3">
        <img src={counsellorImg} className="w-9 h-9 rounded-full object-cover" />
        <p className="text-sm font-semibold">{counsellor.name}</p>
      </div>

      {/* CHAT */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        {messages.map((msg) => (
          <div key={msg._id} className={`flex ${msg.sender === user.email ? "justify-end" : "justify-start"}`}>
            <div className={`px-3 py-1.5 rounded-xl max-w-[70%] text-xs shadow ${
              msg.sender === user.email ? "bg-[#DCF8C6]" : "bg-white"
            }`}>
              <p>{msg.text}</p>
              <div className="text-[9px] text-gray-500 text-right mt-1">
                {formatTime(msg.createdAt)}
              </div>
            </div>
          </div>
        ))}
        <div ref={bottomRef}></div>
      </div>

      {/* INPUT */}
      <div className="bg-white p-2 flex gap-2">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 border rounded-full px-3 py-2 text-sm"
        />
        <button onClick={sendMessage} className="bg-purple-600 text-white px-4 rounded-full">
          Send
        </button>
      </div>
    </div>
  );
}

export default StudentChat;