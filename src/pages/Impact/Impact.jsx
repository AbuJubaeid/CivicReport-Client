const Impact = () => {
  return (
    <div className="text-slate-800">

      {/* ===================== HERO ===================== */}
      <section className="py-24 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Civic Achievements
          </h1>
          <p className="text-lg md:text-xl text-slate-600">
            CivicReport empowers communities by helping citizens report issues, track resolutions, and improve local infrastructure.
          </p>
        </div>
      </section>

      {/* ===================== IMPACT STATISTICS ===================== */}
      <section className="py-20 max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold mb-12">
          Key Community Highlights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <div className="text-5xl font-bold text-cyan-500 mb-2">1,250+</div>
            <p className="text-slate-600">Issues Resolved</p>
          </div>
          <div>
            <div className="text-5xl font-bold text-cyan-500 mb-2">1,000+</div>
            <p className="text-slate-600">Active Citizens</p>
          </div>
          <div>
            <div className="text-5xl font-bold text-cyan-500 mb-2">60+</div>
            <p className="text-slate-600">Staff Members Engaged</p>
          </div>
          <div>
            <div className="text-5xl font-bold text-cyan-500 mb-2">20+</div>
            <p className="text-slate-600">Cities Covered</p>
          </div>
        </div>
      </section>

      {/* ===================== PLATFORM INSIGHTS ===================== */}
      <section className="py-20 max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold mb-12">
          Platform Insights
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="text-5xl mb-4 text-cyan-500">🛣️</div>
            <h3 className="text-lg font-semibold mb-2">Most Reported Issues</h3>
            <p className="text-slate-600 text-sm">
              Potholes, broken streetlights, and garbage overflow top the list of citizen-reported civic issues.
            </p>
          </div>

          <div>
            <div className="text-5xl mb-4 text-cyan-500">⏱️</div>
            <h3 className="text-lg font-semibold mb-2">Average Resolution Time</h3>
            <p className="text-slate-600 text-sm">
              On average, reported issues are resolved within 48 hours, ensuring swift action.
            </p>
          </div>

          <div>
            <div className="text-5xl mb-4 text-cyan-500">📈</div>
            <h3 className="text-lg font-semibold mb-2">Monthly Verified Reports</h3>
            <p className="text-slate-600 text-sm">
              Over 300 reports are verified by admins each month, maintaining high transparency and trust.
            </p>
          </div>
        </div>
      </section>

      {/* ===================== TIMELINE / GROWTH ===================== */}
      <section className="py-20 max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">
          CivicReport Growth Timeline
        </h2>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full border-l-2 border-cyan-200"></div>

          {[
            {
              year: "2021",
              event: "CivicReport Launched in Dhaka",
            },
            {
              year: "2022",
              event: "Expanded to 5 Cities & 300+ Reports Resolved",
            },
            {
              year: "2023",
              event: "Staff Network Grew to 60+ Members",
            },
            {
              year: "2024",
              event: "Cross-City Integration & 1,000+ Citizens Engaged",
            },
            {
              year: "2025",
              event: "New Features Launched & Over 1,250 Issues Resolved",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`mb-12 flex flex-col md:flex-row items-center ${
                idx % 2 === 0 ? "md:justify-start" : "md:justify-end"
              } relative`}
            >
              <div className="bg-cyan-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold z-10">
                {item.year}
              </div>
              <div className="md:max-w-xs mt-4 md:mt-0 md:mx-6 text-center md:text-left">
                <p className="text-slate-800 font-medium">{item.event}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Impact;
