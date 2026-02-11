import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useHook from "../../hooks/useHook";

const RecentReports = () => {
  const { loading } = useHook();
  const axiosSecure = useAxiosSecure();

  const { data: reports = [], isLoading } = useQuery({
    queryKey: ["latestReports"],
    queryFn: async () => {
      const res = await axiosSecure.get('/reports/latest');
      return res.data;
    },
  });

  if (loading || isLoading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* PAGE TITLE */}
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-base-content">Recent Reports</h2>
        <p className="text-gray-500 mt-2">
          This section shows the most recent issues you have reported, helping
          you quickly track their status, priority, and progress in one place.
        </p>
      </div>

      {/* EMPTY STATE */}
      {!reports.length && (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No reports found</p>
        </div>
      )}

      {/* CARD GRID */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {reports.map((report) => (
          <div
            key={report._id}
            className="card bg-base-100 border border-base-200 shadow-sm hover:shadow-xl transition-all duration-300"
          >
            {/* IMAGE */}
            <figure className="h-44 bg-base-200 overflow-hidden">
              <img
                src={
                  report.photoURL ||
                  "https://placehold.co/600x400?text=No+Image"
                }
                alt="Issue"
                className="w-full h-full object-cover"
              />
            </figure>

            <div className="card-body p-4">
              {/* TITLE + STATUS */}
              <div className="flex justify-between items-start gap-2">
                <h3 className="font-semibold text-base line-clamp-2">
                  {report.issue}
                </h3>

                <span
                  className={`badge badge-sm capitalize
                    ${report.reportStatus === "pending" && "badge-warning"}
                    ${report.reportStatus === "in-progress" && "badge-info"}
                    ${report.reportStatus === "resolved" && "badge-success"}
                  `}
                >
                  {report.reportStatus}
                </span>
              </div>

              {/* CATEGORY + PRIORITY */}
              <div className="flex flex-wrap gap-2 mt-2 text-sm">
                <span className="badge badge-outline">{report.category}</span>
                <span className="badge badge-ghost capitalize">
                  {report.priority || "normal"}
                </span>
              </div>

              <div className="divider my-2"></div>

              {/* FOOTER */}
              <div className="flex justify-between text-xs text-gray-500">
                <span>{report.name}</span>
                <span>{new Date(report.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentReports;
