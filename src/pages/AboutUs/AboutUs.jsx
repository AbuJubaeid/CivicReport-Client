const AboutUs = () => {
  return (
    <div className="text-slate-800">

      {/* ===================== HERO ===================== */}
      <section className="py-24 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About CivicReport
          </h1>
          <p className="text-lg md:text-xl text-slate-600">
            CivicReport empowers citizens and local authorities to report, track, and resolve civic issues transparently and efficiently. Our platform ensures accountability, faster response, and better-managed communities.
          </p>
        </div>
      </section>

      {/* ===================== MISSION & VISION ===================== */}
      <section className="py-20 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="flex items-start gap-4">
          <div className="text-cyan-500 text-4xl">🎯</div>
          <div>
            <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
            <p className="text-slate-600">
              To empower citizens and local authorities with a transparent and accountable platform for reporting and resolving civic issues efficiently.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="text-cyan-500 text-4xl">👁️</div>
          <div>
            <h2 className="text-2xl font-semibold mb-2">Our Vision</h2>
            <p className="text-slate-600">
              To create stronger, safer, and smarter communities where every voice is heard, and civic problems are solved effectively.
            </p>
          </div>
        </div>
      </section>

      {/* ===================== OUR JOURNEY / TIMELINE ===================== */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">
            Our Journey
          </h2>
          <div className="flex overflow-x-auto gap-8 py-4 px-2">
            {[
              { year: "2022", event: "Platform Conceptualized" },
              { year: "2023", event: "Beta Testing" },
              { year: "2024", event: "Nationwide Launch" },
              { year: "2025", event: "Mobile App Release" },
            ].map((item, idx) => (
              <div key={idx} className="flex-shrink-0 w-64 border border-slate-300 rounded-xl p-6 text-center">
                <div className="font-bold text-2xl mb-2">{item.year}</div>
                <p className="text-slate-600">{item.event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutUs;




