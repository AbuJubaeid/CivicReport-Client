
const FAQ = () => {
    return (
        <div>
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

export default FAQ;