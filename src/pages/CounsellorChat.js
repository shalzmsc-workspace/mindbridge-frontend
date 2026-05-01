import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import socket, { connectSocket } from "../socket";

const BASE_URL = "https://sjckmindbridge.onrender.com";
const DEFAULT_IMG = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
const MEET_LINK = "https://meet.google.com/zah-ifja-ucp";

function CounsellorChat() {

  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("currentUser"));

  const selected =
    location.state?.student ||
    JSON.parse(localStorage.getItem("chatUser"));

  useEffect(() => {
    if (selected) {
      localStorage.setItem("chatUser", JSON.stringify(selected));
    }
  }, [selected]);

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [sending, setSending] = useState(false);

  const bottomRef = useRef(null);

  const room =
    user && selected
      ? [user.email, selected.email].sort().join("-")
      : "";

  // ================= PROFILE =================
  useEffect(() => {
    if (!selected?.email) return;

    if (selected.profile) {
      setProfileImg(selected.profile);
    }

    const fetchLatestUser = async () => {
      try {
        const res = await fetch(`${BASE_URL}/users`);
        const data = await res.json();

        const updatedUser = data.find(
          (u) => u.email === selected.email
        );

        if (updatedUser?.profile) {
          setProfileImg(updatedUser.profile);
        }
      } catch (err) {
        console.log("Profile error:", err);
      }
    };

    fetchLatestUser();
  }, [selected]);

  // ================= LOAD MESSAGES =================
  const loadMessages = useCallback(async () => {
    if (!room) return;

    try {
      const res = await fetch(`${BASE_URL}/messages/${room}`);
      const data = await res.json();
      setMessages(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log("Load error:", err);
    }
  }, [room]);

  // ================= SAVE SEEN =================
  useEffect(() => {
    if (!room || messages.length === 0) return;
    localStorage.setItem(`seen_${room}`, messages.length);
  }, [messages, room]);

  // ================= SOCKET CONNECT =================
  useEffect(() => {
    if (!user?.email || !room) return;

    connectSocket();

    const cleanEmail = user.email.toLowerCase();

    // 🔥 ensure connection before emitting
    socket.on("connect", () => {
      console.log("🟢 Connected:", socket.id);

      socket.emit("register-user", cleanEmail);
      socket.emit("join_room", room);

      console.log("📦 Joined:", room);
    });

    // 🔥 if already connected (IMPORTANT FIX)
    if (socket.connected) {
      socket.emit("register-user", cleanEmail);
      socket.emit("join_room", room);
    }

    loadMessages();

    return () => {
      socket.off("connect");
    };

  }, [room, user?.email, loadMessages]);

  // ================= RECEIVE MESSAGE =================
  useEffect(() => {
    const handleReceive = (data) => {

      if (data.room !== room) return;

      setMessages((prev) => {
        if (prev.some((m) => m._id === data._id)) return prev;
        return [...prev, data];
      });
    };

    socket.on("receive_message", handleReceive);

    return () => socket.off("receive_message", handleReceive);
  }, [room]);

  // ================= SEND MESSAGE =================
  const sendMessage = async () => {
    if (!message.trim() || sending) return;

    setSending(true);

    try {
      const res = await fetch(`${BASE_URL}/send-message`, {
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

      if (!res.ok) throw new Error();

      setMessage("");

    } catch (err) {
      console.log("❌ Send error:", err);
      alert("Message failed ❌");
    }

    setSending(false);
  };

  // ================= ENTER SEND =================
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // ================= AUTO SCROLL =================
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ================= TIME =================
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  // ================= CALL =================
  const startCall = () => {

    if (!socket.connected) {
      console.log("❌ Socket not connected");
      return;
    }

    const toEmail = selected.email.toLowerCase();
    const fromEmail = user.email.toLowerCase();

    console.log("📞 Calling:", toEmail);

    socket.emit("call-user", {
      to: toEmail,
      from: fromEmail,
    });

    window.open(MEET_LINK, "_blank");
  };

  if (!user || !selected) return <div>Loading chat...</div>;

  return (
    <div className="h-screen flex flex-col bg-[#efeae2]">

      {/* HEADER */}
      <div className="bg-[#780794] text-white px-4 py-3 flex items-center justify-between shadow">

        <div className="flex items-center gap-2">
          <img
            src={profileImg || DEFAULT_IMG}
            onError={(e) => (e.target.src = DEFAULT_IMG)}
            className="w-9 h-9 rounded-full object-cover"
          />

          <div>
            <p className="font-semibold text-sm">{selected.name}</p>
            <p className="text-[10px] text-green-200">Online</p>
          </div>
        </div>

        <button
          onClick={startCall}
          className="text-lg hover:scale-110 transition"
        >
          🎥
        </button>
      </div>

      {/* CHAT */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1">

        {messages.length === 0 && (
          <p className="text-center text-gray-400 text-sm mt-10">
            No messages yet...
          </p>
        )}

        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`flex ${
              msg.sender === user.email
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`px-3 py-1.5 rounded-xl max-w-[70%] text-xs shadow ${
                msg.sender === user.email
                  ? "bg-[#DCF8C6]"
                  : "bg-white"
              }`}
            >
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
          rows={1}
          placeholder="Type a message"
          className="flex-1 border rounded-full px-3 py-2 text-sm resize-none outline-none"
        />

        <button
          onClick={sendMessage}
          disabled={sending}
          className="bg-[#7a1b7e] text-white px-4 py-2 rounded-full text-sm"
        >
          {sending ? "..." : "Send"}
        </button>

      </div>
    </div>
  );
}

export default CounsellorChat;