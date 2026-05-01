import bgImage from "../assets/logo1.jpg";

function Home() {
  return (
    <section
      className="min-h-screen bg-cover bg-center flex items-center justify-center text-center relative"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      {/* CONTENT */}
      <div className="relative z-10 text-white px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Welcome to MindBridge
        </h2>

        <p className="max-w-2xl mx-auto text-lg mb-8">
          Your trusted platform for student counselling, mental wellness,
          and academic guidance.
        </p>

       
      </div>

    </section>
  );
}

export default Home;