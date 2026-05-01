function Rules() {
  return (
    <section className="py-20 px-6 bg-gray-50 text-center">

      <h2 className="text-3xl font-bold text-purple-800 mb-4">
        Rules & Guidelines
      </h2>

      <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
        Please read and follow these guidelines to ensure a safe and supportive counselling environment.
      </p>

      <div className="max-w-5xl mx-auto space-y-8">

        {/* Confidentiality */}
        <div className="bg-white shadow-md rounded-xl p-6 text-left">
          <h3 className="text-xl font-semibold mb-3 text-purple-700">
            Confidentiality Policy
          </h3>

          <p className="text-gray-600 mb-3">
            All counselling sessions and communications are strictly confidential. Information shared during sessions will not be disclosed without your explicit consent, except in the following cases:
          </p>

          <ul className="list-disc ml-6 text-gray-600 space-y-2">
            <li>If there is a risk of harm to yourself or others</li>
            <li>If there is suspected abuse or neglect</li>
            <li>If required by law or court order</li>
          </ul>
        </div>

        {/* Conduct */}
        <div className="bg-white shadow-md rounded-xl p-6 text-left">
          <h3 className="text-xl font-semibold mb-3 text-purple-700">
            Session Conduct
          </h3>

          <ul className="list-disc ml-6 text-gray-600 space-y-2">
            <li>Be respectful and honest during all counselling sessions</li>
            <li>Attend sessions on time</li>
            <li>Inform in advance for cancellation or rescheduling</li>
            <li>Maintain a professional and supportive environment</li>
          </ul>
        </div>

      </div>

    </section>
  );
}

export default Rules;