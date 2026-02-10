import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useHook from "../../hooks/useHook";

const AllReport = () => {
  const {  loading } = useHook();
  const axiosSecure = useAxiosSecure();

  const { data: reports = [], isLoading } = useQuery({
    queryKey: ["report",],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reports`);
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
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">
        All reports are here
      </h2>

      {/* Empty State */}
      {!reports.length && (
        <p className="text-center py-20 text-gray-500 text-lg">
          No issues found
        </p>
      )}

      {/* Card Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {reports.map((report) => (
          <div
            key={report._id}
            className="card bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl transition"
          >
            <div className="card-body">
              {/* Header */}
              <div className="flex justify-between items-start">
                <h3 className="card-title text-lg font-semibold line-clamp-2">
                  {report.issue}
                </h3>

                <span
                  className={`badge capitalize
                    ${report.reportStatus === "pending" && "badge-warning"}
                    ${report.reportStatus === "in-progress" && "badge-info"}
                    ${report.reportStatus === "resolved" && "badge-success"}
                  `}
                >
                  {report.reportStatus}
                </span>
              </div>

              {/* Category */}
              <p className="text-sm text-gray-500">
                Category: <span className="font-medium">{report.category}</span>
              </p>

              <div className="divider my-2"></div>

              {/* Footer Info */}
              <div className="flex justify-between text-sm text-gray-500">
                <span>By: {report.name}</span>
                <span>
                  {new Date(report.createdAt).toLocaleDateString()}
                </span>
              </div>

              {/* Optional Actions */}
              
              <div className="card-actions justify-end mt-4">
                <button className="btn btn-sm btn-outline btn-primary">
                  View Details
                </button>
              </div> 
             
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllReport;

