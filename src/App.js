import { BrowserRouter, Routes, Route } from "react-router-dom";

import StudentProfile from "./pages/StudentProfile";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Staff from "./pages/Staff";
import Rules from "./pages/Rules";
import Events from "./pages/Events";
import About from "./pages/About";

import Login from "./pages/Login";
import Register from "./pages/Register";
import AgoraCall from "./pages/AgoraCall";
// ❌ REMOVE old VideoCall
// import VideoCall from "./pages/VideoCall";

// ✅ NEW VIDEO PAGES
import CounsellorVideoCall from "./pages/CounsellorVideoCall";
import StudentVideoCall from "./pages/StudentVideoCall";

import StudentDashboard from "./pages/StudentDashboard";
import CounsellorDashboard from "./pages/CounsellorDashboard";
import StudentChat from "./pages/StudentChat";
import CounsellorChat from "./pages/CounsellorChat";



// Main Landing Page
function MainPage() {
  return (
    <>
      <Navbar />
      <div id="home"><Home /></div>
      <div id="staff"><Staff /></div>
      <div id="rules"><Rules /></div>
      <div id="events"><Events /></div>
      <div id="about"><About /></div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>

      

      <Routes>

        {/* Main Website */}
        <Route path="/" element={<MainPage />} />

        {/* Profile */}
        <Route path="/profile" element={<StudentProfile />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboards */}
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/counsellor-dashboard" element={<CounsellorDashboard />} />

        {/* Chat */}
        <Route path="/student-chat" element={<StudentChat />} />
        <Route path="/counsellor-chat" element={<CounsellorChat />} />

        {/* ✅ NEW VIDEO ROUTES */}
        <Route path="/counsellor-video" element={<CounsellorVideoCall />} />
        <Route path="/student-video" element={<StudentVideoCall />} />
<Route path="/video-call" element={<AgoraCall />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;