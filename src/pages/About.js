function About() {
  return (
    <section className="py-24 px-6 bg-gray-50">

      <div className="max-w-6xl mx-auto space-y-12">

        {/* ABOUT */}
        <div className="bg-white p-8 rounded-xl shadow">
          <h2 className="text-2xl font-bold text-purple-800 mb-4">
            About the Counselling Cell
          </h2>

          <p className="text-gray-600 leading-relaxed">
            The Counselling Cell at St. Joseph's College (Arts & Science) is dedicated to providing
            comprehensive mental health and academic support to students. It helps students manage
            stress, anxiety, and personal challenges by offering a safe and confidential space for
            guidance and discussion. The cell also supports students in identifying their strengths
            and planning their educational and career paths.
          </p>
        </div>

        {/* AIM */}
        <div className="bg-white p-8 rounded-xl shadow">
          <h3 className="text-xl font-semibold text-purple-700 mb-3">
            Aim
          </h3>

          <p className="text-gray-600">
            To support the emotional, academic, and personal growth of students through
            accessible, confidential, and professional counselling services.
          </p>
        </div>

        {/* OBJECTIVES */}
        <div className="bg-white p-8 rounded-xl shadow">
          <h3 className="text-xl font-semibold text-purple-700 mb-3">
            Objectives
          </h3>

          <ul className="list-disc ml-6 text-gray-600 space-y-2">
            <li>Enhance the mental health of students</li>
            <li>Assist in overcoming academic challenges</li>
            <li>Support personal development and career guidance</li>
            <li>Provide conflict resolution and crisis support</li>
          </ul>
        </div>

        {/* CONTACT SECTION */}
        <div className="grid md:grid-cols-2 gap-10">

          {/* LEFT SIDE */}
          <div className="bg-white p-8 rounded-xl shadow">
            <h3 className="text-xl font-bold text-purple-800 mb-4">
              St. Joseph's College (Arts & Science)
            </h3>

            <p className="text-gray-600 mb-4">
              Counselling Cell
            </p>

            <p className="text-gray-600 mb-2">
              📍 Kundrathur Main Road, Kovur  
              Chennai – 600128
            </p>

            <p className="text-gray-600 mb-2">
              📞 9444405816 / 9444177762 / 9444390739
            </p>

            <p className="text-gray-600">
              📧 sjckovur@gmail.com  
              sjckovur@stjosephcollege.ac.in  
              principal@stjosephcollege.ac.in
            </p>
          </div>

          {/* RIGHT SIDE FORM */}
          <div className="bg-white p-8 rounded-xl shadow">
            <h3 className="text-xl font-bold text-purple-800 mb-4">
              Send us a Message
            </h3>

            <input
              placeholder="Your full name"
              className="w-full p-3 mb-4 border rounded"
            />

            <input
              placeholder="Email"
              className="w-full p-3 mb-4 border rounded"
            />

            <textarea
              placeholder="Your message"
              className="w-full p-3 mb-4 border rounded"
              rows="4"
            ></textarea>

            <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700">
              Send Message
            </button>
          </div>

        </div>

      </div>

    </section>
  );
}

export default About;