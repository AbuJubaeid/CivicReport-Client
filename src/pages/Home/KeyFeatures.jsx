
const KeyFeatures = () => {
    return (
        <div>
            <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-base-content mb-4">
            Key Features
          </h2>
          <p className="text-base-content/60 mb-12">
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
                <h3 className="text-lg font-medium text-base-content mb-1">{item.title}</h3>
                <p className="text-base-content/60 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
        </div>
    );
};

export default KeyFeatures;