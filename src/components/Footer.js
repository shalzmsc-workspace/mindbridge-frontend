function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6 mt-10">

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

        {/* ABOUT */}
        <div>
          <h2 className="text-xl font-semibold mb-3">MindBridge</h2>
          <p className="text-gray-400 text-sm">
            A student counselling platform designed to support mental health,
            academic growth, and personal well-being.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Quick Links</h2>
          <ul className="space-y-2 text-gray-400">
            <li>Home</li>
            <li>Staff</li>
            <li>Rules</li>
            <li>Events</li>
            <li>About</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Contact</h2>
          <p className="text-gray-400 text-sm">
            St. Joseph’s College (Arts & Science) <br />
            Chennai – 600128 <br />
            Email: sjckovur@gmail.com
          </p>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="text-center text-gray-500 text-sm mt-8">
        © 2026 MindBridge. All rights reserved.
      </div>

    </footer>
  );
}

export default Footer;