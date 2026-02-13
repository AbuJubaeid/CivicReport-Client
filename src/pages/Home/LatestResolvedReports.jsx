import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useHook from "../../hooks/useHook";

const LatestResolvedReports = () => {
  const { loading } = useHook();
  const axiosSecure = useAxiosSecure();

  const { data: reports = [], isLoading } = useQuery({
    queryKey: ["recentSolvedReports"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reports/latest/solved`);
      return res.data;
    },
  });

  if (loading || isLoading) {
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-base-content">
          Recently Solved Reports
        </h2>
        <p className="text-gray-500 mt-2">
          This section highlights the most recent issues that have been
          successfully resolved, providing a clear overview of completed
          reports and their outcomes.
        </p>
      </div>

      {/* Cards */}
      {reports.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          No solved reports found.
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {reports.map((report) => (
            <div
              key={report._id}
              className="card bg-base-100 border border-base-200 shadow-sm hover:shadow-md transition flex flex-col"
            >
              {/* Image */}
              <figure className="h-44 bg-base-200 overflow-hidden">
                <img
                  src={
                    report.photoURL ||
                    "https://placehold.co/600x400?text=No+Image"
                  }
                  alt="Solved issue"
                  className="w-full h-full object-cover"
                />
              </figure>

              <div className="card-body flex flex-col flex-1">
                <div className="flex justify-between items-start gap-3">
                  <h3 className="card-title text-lg line-clamp-2">
                    {report.issue}
                  </h3>
                  <span className="badge badge-success capitalize">Solved</span>
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="badge badge-outline">{report.category}</span>
                  <span className="badge badge-outline">{report.location}</span>
                </div>

                <div className="divider my-2"></div>

                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>By: {report.name}</span>
                  <span>{new Date(report.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="mb-4">
                  <span>Reviewed By: {report.staffName || "N/A"}</span>
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
      )}
    </div>
  );
};

export default LatestResolvedReports;
