const AboutUs = () => {
  return (
    <div className="text-slate-800">

      {/*HERO */}
      <section className="py-24 text-center bg-slate-50">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About CivicReport
          </h1>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
            CivicReport empowers citizens and local authorities to report, track, and resolve civic issues transparently and efficiently. Our platform ensures accountability, faster response, and better-managed communities.
          </p>
        </div>
      </section>

      {/*MISSION & VISION*/}
      <section className="py-20 max-w-5xl mx-auto px-6 space-y-12">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">Our Mission</h2>
          <p className="text-slate-600 text-lg md:text-xl">
             To empower citizens and local authorities with a transparent and accountable platform for reporting and resolving civic issues efficiently.
          </p>
        </div>

        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">Our Vision</h2>
          <p className="text-slate-600 text-lg md:text-xl">
             To create stronger, safer, and smarter communities where every voice is heard, and civic problems are solved effectively.
          </p>
        </div>
      </section>

      {/* CORE VALUES*/}
      <section className="py-20 max-w-5xl text-center mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">
          Core Values
        </h2>
        <ul className="space-y-6 text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
          <li>🤝 <strong>Transparency:</strong> We ensure openness and clear communication at every step.</li>
          <li>⚡ <strong>Efficiency:</strong> Quick and effective resolution of civic issues.</li>
          <li>🔒 <strong>Accountability:</strong> Every report and action is tracked responsibly.</li>
        </ul>
      </section>

      {/* OUR JOURNEY */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">
          Our Journey
        </h2>
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-0">
          {[
            { year: "2022", event: "Platform Conceptualized" },
            { year: "2023", event: "Beta Testing" },
            { year: "2024", event: "Nationwide Launch" },
            { year: "2025", event: "Mobile App Release" },
          ].map((item, idx) => (
            <div key={idx} className="flex-1 text-center">
              <div className="text-2xl font-bold mb-2">{item.year}</div>
              <p className="text-slate-600">{item.event}</p>
            </div>
          ))}
        </div>
      </section>

      {/*WORK flow*/}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">
          Work Flow
        </h2>
        <div className="space-y-8 md:space-y-0 md:flex md:justify-between md:gap-8 text-slate-600 text-lg">
          {[
            { step: "1", title: "Report an Issue", desc: "Citizens submit civic issues through our platform with details and photos." },
            { step: "2", title: "Track Progress", desc: "Monitor the status and updates from authorities in real-time." },
            { step: "3", title: "Resolution & Feedback", desc: "Authorities resolve the issue and citizens provide feedback." },
          ].map((item, idx) => (
            <div key={idx} className="flex-1 text-center">
              <div className="text-2xl font-bold mb-2">{item.step}</div>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/*  IMPACT STORIES  */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">
          Impact Stories
        </h2>
        <div className="space-y-10 md:space-y-0 md:flex md:justify-between md:gap-8 text-slate-600">
          {[
            { title: "Clean Park Initiative", desc: "Citizens reported waste in local parks, which was cleaned within 48 hours." },
            { title: "Road Repair Success", desc: "Multiple potholes were fixed after reports from CivicReport users." },
            { title: "Street Light Installation", desc: "New street lights were installed in previously dark areas improving safety." },
          ].map((item, idx) => (
            <div key={idx} className="flex-1 text-center">
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS*/}
      <section className="py-20 max-w-6xl mx-auto px-6 bg-slate-50">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">
          Testimonials
        </h2>
        <div className="space-y-10 md:space-y-0 md:flex md:justify-between md:gap-8 text-slate-600">
          {[
            { name: "Sarah J.", quote: "CivicReport helped me get the street light fixed near my home quickly." },
            { name: "Ali R.", quote: "I love how transparent and easy to use this platform is." },
            { name: "Nadia K.", quote: "Reports are handled efficiently and responsibly. Highly recommended!" },
          ].map((t, idx) => (
            <div key={idx} className="flex-1 text-center">
              <p className="italic mb-4">"{t.quote}"</p>
              <h3 className="font-semibold">{t.name}</h3>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default AboutUs;








