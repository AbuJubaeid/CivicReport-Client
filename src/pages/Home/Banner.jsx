import { useNavigate } from "react-router";
import useHook from "../../hooks/useHook";

const Banner = () => {
  const { user } = useHook();
  const navigate = useNavigate();

  const handleReportIssue = () => {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/create-issue");
    }
  };

  return (
    <div>
      <section className="py-5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          
          <div>
            <span className="inline-block mb-4 px-4 py-1 rounded-full border border-slate-300 text-sm text-base-content/60">
              Civic Issue Management Platform
            </span>

            <h1 className="text-4xl md:text-5xl font-semibold text-base-content leading-tight">
              Report Civic Issues
              <br />
              <span className="text-base-content/70">Transparently & Responsibly</span>
            </h1>

            <p className="mt-6 text-base text-base-content/60 max-w-xl">
              CivicReport allows citizens to report public issues easily.
              Administrators verify and assign issues to responsible staff,
              ensuring proper tracking until resolution.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={handleReportIssue}
                className="btn bg-base-content hover:opacity-90 text-base-100 border-none px-8"
              >
                Report an Issue
              </button>
              <button
                onClick={() => navigate("/all-report")}
                className="btn btn-outline border-base-content/30 text-base-content hover:bg-base-200 px-8"
              >
                See All Reports
              </button>
            </div>
          </div>

          <div className="bg-base-100 border border-slate-300 rounded-2xl p-8 shadow-sm">
            <h3 className="text-lg font-medium text-base-content mb-6">
              Issue Resolution Flow
            </h3>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-base-200">
                <span className="text-2xl">📝</span>
                <div>
                  <p className="text-base-content font-medium">Citizen Reports</p>
                  <p className="text-sm text-base-content/60">Issue details & location</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-base-200">
                <span className="text-2xl">🧑‍💼</span>
                <div>
                  <p className="text-base-content font-medium">Admin Assigns</p>
                  <p className="text-sm text-base-content/60">Verification & routing</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-base-200">
                <span className="text-2xl">🛠️</span>
                <div>
                  <p className="text-base-content font-medium">Staff Resolves</p>
                  <p className="text-sm text-base-content/60">Progress tracked</p>
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