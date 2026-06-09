import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useHook from "../../hooks/useHook";

const RecentReports = () => {
  const { loading } = useHook();
  const axiosSecure = useAxiosSecure();

  const ReportSkeleton = () => {
    return (
      <div className="card bg-base-100 border border-base-200 shadow-sm animate-pulse">
        <div className="h-44 bg-base-300 rounded-t-xl"></div>

        <div className="card-body p-4">
          <div className="flex justify-between items-start gap-2">
            <div className="h-5 w-32 bg-base-300 rounded"></div>
            <div className="h-5 w-16 bg-base-300 rounded"></div>
          </div>

          <div className="flex gap-2 mt-3">
            <div className="h-5 w-20 bg-base-300 rounded"></div>
            <div className="h-5 w-16 bg-base-300 rounded"></div>
          </div>

          <div className="divider my-2"></div>

          <div className="flex justify-between">
            <div className="h-4 w-20 bg-base-300 rounded"></div>
            <div className="h-4 w-16 bg-base-300 rounded"></div>
          </div>

          <div className="mt-4">
            <div className="h-10 w-full bg-base-300 rounded"></div>
          </div>
        </div>
      </div>
    );
  };

  const { data: reports = [], isLoading } = useQuery({
    queryKey: ["latestReports"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reports/latest");
      return res.data;
    },
  });

  if (loading || isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="mb-8 text-center animate-pulse">
          <div className="h-8 w-60 mx-auto bg-base-300 rounded"></div>
          <div className="h-4 w-96 max-w-full mx-auto bg-base-300 rounded mt-4"></div>
          <div className="h-4 w-80 max-w-full mx-auto bg-base-300 rounded mt-2"></div>
        </div>

        <div className="flex justify-center mb-8">
          <span className="loading loading-spinner loading-lg"></span>
        </div>

        {/* skeleton cards */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(8)].map((_, index) => (
            <ReportSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-base-content">Recent Reports</h2>
        <p className="text-gray-500 mt-2">
          This section shows the most recent issues you have reported, helping
          you quickly track their status, priority, and progress in one place.
        </p>
      </div>

      {!reports.length && (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No reports found</p>
        </div>
      )}

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {reports.map((report) => (
          <div
            key={report._id}
            className="card bg-base-100 border border-base-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
          >
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

            <div className="card-body p-4 flex flex-col flex-1">
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

              <div className="flex flex-wrap gap-2 mt-2 text-sm">
                <span className="badge badge-outline">{report.category}</span>

                <span className="badge badge-ghost capitalize">
                  {report.priority || "normal"}
                </span>
              </div>

              <div className="divider my-2"></div>

              <div className="flex justify-between text-xs text-gray-500 mb-4">
                <span>{report.name}</span>
                <span>{new Date(report.createdAt).toLocaleDateString()}</span>
              </div>

              <div className="mt-auto">
                <Link
                  to={`/report-detail/${report._id}`}
                  className="btn btn-primary w-full"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentReports;
