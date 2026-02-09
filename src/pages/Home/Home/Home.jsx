const Home = () => {
  return (
    <div className="bg-slate-50">

      {/* ===================== BANNER ===================== */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <span className="inline-block mb-4 px-4 py-1 rounded-full border border-slate-300 text-sm text-slate-600">
              Civic Issue Management Platform
            </span>

            <h1 className="text-4xl md:text-5xl font-semibold text-slate-800 leading-tight">
              Report Civic Issues
              <br />
              <span className="text-slate-600">Transparently & Responsibly</span>
            </h1>

            <p className="mt-6 text-base text-slate-600 max-w-xl">
              CivicReport allows citizens to report public issues easily.
              Administrators verify and assign issues to responsible staff,
              ensuring proper tracking until resolution.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button className="btn bg-slate-800 hover:bg-slate-900 text-white border-none px-8">
                Report an Issue
              </button>
              <button className="btn btn-outline border-slate-400 text-slate-700 hover:bg-slate-200 px-8">
                Learn More
              </button>
            </div>
          </div>

          {/* Right Visual */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
            <h3 className="text-lg font-medium text-slate-800 mb-6">
              Issue Resolution Flow
            </h3>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50">
                <span className="text-2xl">📝</span>
                <div>
                  <p className="text-slate-800 font-medium">Citizen Reports</p>
                  <p className="text-sm text-slate-500">Issue details & location</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50">
                <span className="text-2xl">🧑‍💼</span>
                <div>
                  <p className="text-slate-800 font-medium">Admin Assigns</p>
                  <p className="text-sm text-slate-500">Verification & routing</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50">
                <span className="text-2xl">🛠️</span>
                <div>
                  <p className="text-slate-800 font-medium">Staff Resolves</p>
                  <p className="text-sm text-slate-500">Progress tracked</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== KEY FEATURES ===================== */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-800 mb-4">
            Key Features
          </h2>
          <p className="text-slate-600 mb-12">
            A transparent and efficient way to report, manage, and resolve civic issues.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: "📍", title: "Location-Based Reporting", desc: "Submit accurate locations and photos for faster verification." },
              { icon: "🧑‍💼", title: "Admin Assignment", desc: "Admins verify and assign issues to the appropriate staff." },
              { icon: "🛠️", title: "Staff Resolution", desc: "Staff update progress and resolve issues efficiently." },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="text-5xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-medium text-slate-800 mb-1">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== HOW IT WORKS ===================== */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-800 text-center mb-12">
            How It Works
          </h2>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full border-l-2 border-cyan-200"></div>
            {[
              { step: 1, title: "Report an Issue", desc: "Citizens submit issues with photos, description, and location." },
              { step: 2, title: "Admin Reviews", desc: "Admins verify reports and assign them to staff." },
              { step: 3, title: "Issue Resolved", desc: "Staff resolve issues and update progress until completion." },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`mb-12 flex flex-col md:flex-row items-center ${idx % 2 === 0 ? "md:justify-start" : "md:justify-end"} relative`}
              >
                <div className="bg-cyan-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold z-10">
                  {item.step}
                </div>
                <div className="md:max-w-xs mt-4 md:mt-0 md:mx-6 text-center md:text-left">
                  <h3 className="text-lg font-semibold text-slate-800 mb-1">{item.title}</h3>
                  <p className="text-slate-600 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== WHAT CITIZENS ARE SAYING ===================== */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-800">
              What Citizens Are Saying
            </h2>
            <p className="mt-4 text-slate-600">
              Hear from our users who have experienced the transparency and efficiency of CivicReport.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Abu Jubaeid", city: "Dhaka", initials: "AJ", text: "Reporting a pothole was easy! Updates came in real-time." },
              { name: "Marium Rahman", city: "Chittagong", initials: "MR", text: "Tracking my reported issues gives confidence." },
              { name: "Rashed Sultan", city: "Sylhet", initials: "RS", text: "Staff responded quickly, very transparent!" },
              { name: "Laila Samad", city: "Rajshahi", initials: "LS", text: "Reporting broken streetlights is simple now." },
              { name: "Ayesha Hasan", city: "Khulna", initials: "AH", text: "Notifications keep me informed at every stage." },
              { name: "Mokbul Karim", city: "Barisal", initials: "MK", text: "Admins and staff resolve issues promptly." },
            ].map((item, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition">
                <p className="text-slate-600 text-sm mb-4">"{item.text}"</p>
                <div className="flex items-center gap-4 mt-4">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-semibold">
                    {item.initials}
                  </div>
                  <div>
                    <p className="text-slate-800 font-medium">{item.name}</p>
                    <p className="text-slate-500 text-sm">{item.city}, Bangladesh</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== OUR MISSION ===================== */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-800 mb-6">Our Mission</h2>
          <p className="text-slate-600 text-lg md:text-xl mb-12">
            CivicReport empowers citizens and authorities by providing a transparent and accountable platform to report and resolve civic issues.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Transparency", desc: "Every issue is tracked and visible to ensure accountability." },
              { title: "Efficiency", desc: "Streamlined reporting and resolution save time and resources." },
              { title: "Community Impact", desc: "Building stronger, safer neighborhoods together." },
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-50 rounded-xl p-6">
                <h3 className="text-lg font-medium text-slate-800 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== FAQ ===================== */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-800">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-slate-600">
              Answers to common questions about CivicReport.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { q: "How do I report a civic issue?", a: "Click 'Report an Issue' and fill the form with details, location, and photos." },
              { q: "Who verifies my report?", a: "Admins verify reports before assigning to staff." },
              { q: "Can I track my report?", a: "Yes, via your dashboard in real-time." },
              { q: "How do I get updates?", a: "Notifications are sent via email or app automatically." },
              { q: "Who can access CivicReport?", a: "Citizens, admins, and staff have role-based dashboards." },
              { q: "Is my data secure?", a: "CivicReport uses secure systems and role-based access controls." },
            ].map((faq, idx) => (
              <details key={idx} className="group p-4 rounded-xl hover:bg-white transition cursor-pointer border border-slate-200">
                <summary className="font-medium text-slate-800 list-none group-open:text-cyan-600">{faq.q}</summary>
                <p className="text-slate-600 mt-2">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
