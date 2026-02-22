
const OurMission = () => {
    return (
        <div>
            <section className="py-20">
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
        </div>
    );
};

export default OurMission;