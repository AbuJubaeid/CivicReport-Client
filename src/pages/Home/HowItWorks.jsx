
const HowItWorks = () => {
    return (
        <div>
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
        </div>
    );
};

export default HowItWorks;