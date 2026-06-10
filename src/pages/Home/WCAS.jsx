const WCAS = () => {
    return (
        <div>
            <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-base-content">
              What Citizens Are Saying
            </h2>
            <p className="mt-4 text-base-content/60">
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
              <div key={idx} className="bg-base-100 border border-slate-300 rounded-xl p-6 hover:shadow-md transition">
                <p className="text-base-content/60 text-sm mb-4">"{item.text}"</p>
                <div className="flex items-center gap-4 mt-4">
                  <div className="w-12 h-12 rounded-full bg-base-200 flex items-center justify-center text-base-content font-semibold">
                    {item.initials}
                  </div>
                  <div>
                    <p className="text-base-content font-medium">{item.name}</p>
                    <p className="text-base-content/50 text-sm">{item.city}, Bangladesh</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
        </div>
    );
};

export default WCAS;