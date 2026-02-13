import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useHook from "../../../hooks/useHook";

const CompletedReport = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useHook();

  const { data: reports = [], isLoading } = useQuery({
    queryKey: ["reports", user.email, "Solved"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/reports/staff?staffEmail=${user.email}&reportStatus=Solved`
      );
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
        Completed Reports: <span className="text-blue-500">{reports.length}</span>
      </h2>

      {reports.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          No completed reports found.
        </p>
      ) : (
        <div className="overflow-x-auto w-full">
          <table className="table table-zebra w-full text-sm md:text-base">
            <thead className="bg-blue-100 text-gray-700">
              <tr>
                <th className="text-center">#</th>
                <th>Name</th>
                <th>Location</th>
                <th>Status</th>
                <th>Solved By</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report, index) => (
                <tr key={report._id} className="hover:bg-blue-50 transition-colors">
                  <td className="text-center font-medium">{index + 1}</td>
                  <td className="font-medium">{report.issue}</td>
                  <td>{report.location}</td>
                  <td>
                    <span
                      className={`badge text-white ${
                        report.reportStatus === "Solved"
                          ? "bg-green-500"
                          : report.reportStatus === "In-Progress"
                          ? "bg-blue-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {report.reportStatus}
                    </span>
                  </td>
                  <td>{report.staffName || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CompletedReport;
