import { useNavigate } from "react-router";
import useHook from "../../hooks/useHook";

const Banner = () => {
      const { user } = useHook()
  const navigate = useNavigate()

  const handleReportIssue = () => {
  if (!user) {
    navigate("/login");
  } else {
    navigate("/create-issue");
  }
};
    return (
      <div>
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
              <button 
              onClick={handleReportIssue}
              className="btn bg-slate-800 hover:bg-slate-900 text-white border-none px-8">
                Report an Issue
              </button>
              <button
              onClick={()=>navigate("/all-report")}
               className="btn btn-outline border-slate-400 text-slate-700 hover:bg-slate-200 px-8">
                See All Reports
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
      </div>
    );
};

export default Banner;