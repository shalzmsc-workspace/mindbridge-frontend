import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo.jpg";

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    setMenuOpen(false); // close menu on click
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="bg-white shadow-md px-4 md:px-8 py-3 sticky top-0 z-50">

      {/* TOP BAR */}
      <div className="flex justify-between items-center">

        {/* LOGO */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => scrollToSection("home")}
        >
          <img src={logo} alt="Logo" className="h-10 md:h-12" />
          <h1 className="text-base md:text-lg font-semibold text-gray-800">
            MindBridge
          </h1>
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-6 text-gray-700 font-medium">
          <button onClick={() => scrollToSection("home")} className="hover:text-purple-600">Home</button>
          <button onClick={() => scrollToSection("staff")} className="hover:text-purple-600">Staff</button>
          <button onClick={() => scrollToSection("rules")} className="hover:text-purple-600">Rules</button>
          <button onClick={() => scrollToSection("events")} className="hover:text-purple-600">Events</button>
          <button onClick={() => scrollToSection("about")} className="hover:text-purple-600">About</button>
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden md:flex gap-4 items-center">
          <button
            onClick={() => navigate("/login")}
            className="text-gray-700 hover:text-purple-600 font-medium"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Register
          </button>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 text-gray-700 font-medium bg-white p-4 rounded-lg shadow">

          <button onClick={() => scrollToSection("home")} className="text-left">Home</button>
          <button onClick={() => scrollToSection("staff")} className="text-left">Staff</button>
          <button onClick={() => scrollToSection("rules")} className="text-left">Rules</button>
          <button onClick={() => scrollToSection("events")} className="text-left">Events</button>
          <button onClick={() => scrollToSection("about")} className="text-left">About</button>

          <hr />

          <button
            onClick={() => navigate("/login")}
            className="text-left"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg"
          >
            Register
          </button>

        </div>
      )}
    </nav>
  );
}

export default Navbar;