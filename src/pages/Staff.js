function Staff() {
  return (
    <section className="py-20 px-6 bg-white text-center">

      <h2 className="text-3xl font-bold text-purple-800 mb-4">
        Our Staff
      </h2>

      <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
        Meet our dedicated counselling team supporting student well-being.
      </p>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

        <div className="bg-white shadow-md rounded-xl p-6">
          <div className="w-24 h-24 mx-auto rounded-full bg-purple-100 flex items-center justify-center text-3xl mb-4">
            👩‍⚕️
          </div>
          <h3 className="font-semibold text-lg">Mrs. P. Vinitha</h3>
          <p className="text-gray-500 text-sm">HOD & Assistant Professor</p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6">
          <div className="w-24 h-24 mx-auto rounded-full bg-purple-100 flex items-center justify-center text-3xl mb-4">
            👨‍⚕️
          </div>
          <h3 className="font-semibold text-lg">Dr. M. Ignatius</h3>
          <p className="text-gray-500 text-sm">Counsellor</p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6">
          <div className="w-24 h-24 mx-auto rounded-full bg-purple-100 flex items-center justify-center text-3xl mb-4">
            👩‍🏫
          </div>
          <h3 className="font-semibold text-lg">Rev. Sr. Dr. Baby</h3>
          <p className="text-gray-500 text-sm">Counsellor</p>
        </div>

      </div>

    </section>
  );
}

export default Staff;