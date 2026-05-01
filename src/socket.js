import { io } from "socket.io-client";

// ✅ Always use deployed backend
const SOCKET_URL = "https://sjckmindbridge.onrender.com";

const socket = io(SOCKET_URL, {
  autoConnect: false,

  // 🔥 VERY IMPORTANT (Render fix)
  transports: ["websocket", "polling"],

  // 🔥 improves stability
  forceNew: true,
  withCredentials: true,

  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 1000,

  timeout: 20000,
});

// ================= CONNECT =================
export const connectSocket = () => {
  if (!socket.connected) {
    console.log("🔄 Connecting socket...");
    socket.connect();
  }
};

// ================= DISCONNECT =================
export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};

// ================= DEBUG EVENTS =================
const setupDebugListeners = () => {

  socket.on("connect", () => {
    console.log("🟢 Socket connected:", socket.id);
  });

  socket.on("disconnect", (reason) => {
    console.log("🔴 Socket disconnected:", reason);
  });

  socket.on("connect_error", (err) => {
    console.error("❌ Socket error:", err.message);
  });

  socket.on("reconnect_attempt", () => {
    console.log("🔄 Reconnecting...");
  });

  socket.on("online-users", (users) => {
    console.log("🟢 Online users:", users);
  });

  // 🔥 DEBUG CALL EVENT (VERY IMPORTANT)
  socket.on("incoming-call", (data) => {
    console.log("📞 DEBUG incoming-call:", data);
  });

};

// 🔥 initialize once
setupDebugListeners();

export default socket;