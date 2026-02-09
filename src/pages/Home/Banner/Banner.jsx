
const Banner = () => {
    return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 overflow-hidden">

      {/* Subtle Background Accents */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

        {/* LEFT CONTENT */}
        <div className="text-slate-100">
          <span className="inline-block mb-4 px-4 py-1 rounded-full border border-slate-400/30 text-sm tracking-wide">
            Civic Issue Management Platform
          </span>

          <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
            Report Civic Issues
            <br />
            <span className="text-cyan-400">
              Transparently & Responsibly
            </span>
          </h1>

          <p className="mt-6 text-base text-slate-300 max-w-xl">
            CivicReport empowers citizens to report public issues easily.
            Verified reports are assigned by administrators to field staff
            and tracked until resolution.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button className="btn bg-cyan-500 hover:bg-cyan-600 text-slate-900 border-none px-8">
              Report an Issue
            </button>
            <button className="btn btn-outline border-slate-400 text-slate-200 hover:bg-slate-700 px-8">
              Learn More
            </button>
          </div>
        </div>

        {/* RIGHT VISUAL */}
        <div className="flex justify-center">
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 shadow-xl w-full max-w-md">

            <h3 className="text-slate-100 text-lg font-medium mb-6">
              Issue Resolution Flow
            </h3>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5">
                <span className="text-2xl">📝</span>
                <div>
                  <p className="text-slate-100 font-medium">Citizen Reports</p>
                  <p className="text-sm text-slate-400">Details & location</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5">
                <span className="text-2xl">🧑‍💼</span>
                <div>
                  <p className="text-slate-100 font-medium">Admin Assigns</p>
                  <p className="text-sm text-slate-400">Verification & routing</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5">
                <span className="text-2xl">🛠️</span>
                <div>
                  <p className="text-slate-100 font-medium">Staff Resolves</p>
                  <p className="text-sm text-slate-400">Progress tracked</p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
    );
};

export default Banner;