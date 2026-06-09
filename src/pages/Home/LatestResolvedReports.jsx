import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useHook from "../../hooks/useHook";

const LatestResolvedReports = () => {
  const { loading } = useHook();
  const axiosSecure = useAxiosSecure();

  const ResolvedReportSkeleton = () => {
    return (
      <div className="card bg-base-100 border border-base-200 shadow-sm animate-pulse">
        <div className="h-44 bg-base-300 rounded-t-xl"></div>

        <div className="card-body flex flex-col flex-1">
          <div className="flex justify-between items-start gap-3">
            <div className="h-6 w-40 bg-base-300 rounded"></div>
            <div className="h-6 w-16 bg-base-300 rounded"></div>
          </div>

          <div className="flex gap-2 mt-3">
            <div className="h-5 w-20 bg-base-300 rounded"></div>
            <div className="h-5 w-24 bg-base-300 rounded"></div>
          </div>

          <div className="divider my-2"></div>

          <div className="flex justify-between">
            <div className="h-4 w-24 bg-base-300 rounded"></div>
            <div className="h-4 w-20 bg-base-300 rounded"></div>
          </div>

          <div className="mt-3">
            <div className="h-4 w-32 bg-base-300 rounded"></div>
          </div>

          <div className="mt-4">
            <div className="h-10 w-full bg-base-300 rounded"></div>
          </div>
        </div>
      </div>
    );
  };

  const { data: reports = [], isLoading } = useQuery({
    queryKey: ["recentSolvedReports"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reports/latest/solved`);
      return res.data;
    },
  });

  if (loading || isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Heading Skeleton */}
        <div className="mb-8 text-center animate-pulse">
          <div className="h-8 w-72 mx-auto bg-base-300 rounded"></div>
          <div className="h-4 w-96 max-w-full mx-auto bg-base-300 rounded mt-4"></div>
          <div className="h-4 w-80 max-w-full mx-auto bg-base-300 rounded mt-2"></div>
        </div>

        <div className="flex justify-center mb-8">
          <span className="loading loading-spinner loading-lg"></span>
        </div>

        {/* skeleton cards */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(8)].map((_, index) => (
            <ResolvedReportSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-base-content">
          Recently Solved Reports
        </h2>
        <p className="text-gray-500 mt-2">
          This section highlights the most recent issues that have been
          successfully resolved, providing a clear overview of completed reports
          and their outcomes.
        </p>
      </div>

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
                <div>
                  <h3 className="card-title text-lg line-clamp-2">
                    {report.issue}
                  </h3>
                  <h2 className="badge badge-success capitalize">Solved</h2>
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
