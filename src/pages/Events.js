function Events() {
  return (
    <section className="py-24 px-6 bg-white text-center">

      <h2 className="text-3xl font-bold text-purple-800 mb-4">
        Upcoming Events
      </h2>

      <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
        Join our mental health programs and workshops designed to support your well-being and personal growth.
      </p>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

        {/* Event 1 */}
        <div className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-lg transition text-left">
          <h3 className="font-semibold text-lg mb-2">
            Mental Health Awareness Week
          </h3>
          <p className="text-sm text-gray-500 mb-2">📅 April 15, 2026</p>
          <p className="text-gray-600 text-sm">
            A week-long series of workshops and activities focused on mental health awareness.
          </p>
        </div>

        {/* Event 2 */}
        <div className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-lg transition text-left">
          <h3 className="font-semibold text-lg mb-2">
            Stress Management Workshop
          </h3>
          <p className="text-sm text-gray-500 mb-2">📅 April 22, 2026</p>
          <p className="text-gray-600 text-sm">
            Learn techniques to manage academic stress and maintain a healthy lifestyle.
          </p>
        </div>

        {/* Event 3 */}
        <div className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-lg transition text-left">
          <h3 className="font-semibold text-lg mb-2">
            Peer Support Training
          </h3>
          <p className="text-sm text-gray-500 mb-2">📅 May 5, 2026</p>
          <p className="text-gray-600 text-sm">
            Training program for students to support their peers emotionally and academically.
          </p>
        </div>

        {/* Event 4 */}
        <div className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-lg transition text-left">
          <h3 className="font-semibold text-lg mb-2">
            Career Counselling Fair
          </h3>
          <p className="text-sm text-gray-500 mb-2">📅 May 12, 2026</p>
          <p className="text-gray-600 text-sm">
            Explore career opportunities and guidance from professionals.
          </p>
        </div>

        {/* Event 5 */}
        <div className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-lg transition text-left">
          <h3 className="font-semibold text-lg mb-2">
            Mindfulness & Meditation Session
          </h3>
          <p className="text-sm text-gray-500 mb-2">📅 May 20, 2026</p>
          <p className="text-gray-600 text-sm">
            Guided meditation sessions to reduce stress and improve focus.
          </p>
        </div>

        {/* Event 6 */}
        <div className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-lg transition text-left">
          <h3 className="font-semibold text-lg mb-2">
            Group Counselling: Exam Anxiety
          </h3>
          <p className="text-sm text-gray-500 mb-2">📅 June 1, 2026</p>
          <p className="text-gray-600 text-sm">
            Group session to help students manage exam-related stress.
          </p>
        </div>

      </div>

    </section>
  );
}

export default Events;