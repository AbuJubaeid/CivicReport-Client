import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useHook from "../../hooks/useHook";

const AllReport = () => {
  const { loading } = useHook();
  const axiosSecure = useAxiosSecure();

  const { data: reports = [], isLoading } = useQuery({
    queryKey: ["MyReport"],
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

      {!reports.length && (
        <p className="text-center py-20 text-gray-500 text-lg">
          No reports found
        </p>
      )}

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {reports.map((report) => (
          <div
            key={report._id}
            className="card bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl transition"
          >
            {/* IMAGE */}
            <figure className="h-48 overflow-hidden bg-base-200">
              <img
                src={report.photoURL || "https://placehold.co/600x400?text=No+Image"}
                alt="Issue"
                className="w-full h-full object-cover"
              />
            </figure>

            <div className="card-body">
              <div className="flex justify-between items-start gap-2">
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

              {/* Category + Priority */}
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="badge badge-outline">{report.category}</span>
                <span >
                  {report.priority || "normal"}
                </span>
              </div>

              <div className="divider my-2"></div>

              <div className="flex justify-between text-sm text-gray-500">
                <span>By: {report.name}</span>
                <span>{new Date(report.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllReport;



