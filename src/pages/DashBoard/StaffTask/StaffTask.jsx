import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useHook from "../../../hooks/useHook";

const StaffTask = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useHook();
  const { data: reports = [], refetch } = useQuery({
    queryKey: ["reports", user.email, "In-Progress"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reports/staff?staffEmail=${user.email}&reportStatus=In-Progress`);
      return res.data;
    },
  });

  const handleStatusUpdate = (report, status) => {
    const statusInfo = { 
      reportStatus: status,
      staffId: report.staffId,
    };

    axiosSecure.patch(`/reports/${report._id}/status`, statusInfo)
      .then(res => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Report status updated",
            showConfirmButton: false,
            timer: 2500,
          });
        }
      });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-6 text-slate-800">
        Reports: {reports.length}
      </h2>

      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-slate-200 text-slate-800">
            <tr>
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Location</th>
              <th className="py-3 px-4">Created At</th>
              <th className="py-3 px-4">Confirm</th>
              <th className="py-3 px-4">Other Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, index) => (
              <tr key={report._id} className="border-b hover:bg-slate-50 transition">
                <td className="py-2 px-3 text-center">{index + 1}</td>
                <td className="py-2 px-3 font-medium text-slate-700">{report.issue}</td>
                <td className="py-2 px-3 text-slate-600">{report.location}</td>
                <td className="py-2 px-3 text-slate-500">
                  {new Date(report.createdAt).toLocaleDateString()}
                </td>
                
                <td className="py-2 px-3">
                  {report.reportStatus === "In-Progress" ? (
                    <>
                      <button
                        onClick={() => handleStatusUpdate(report, 'Processing')}
                        className="btn btn-primary btn-sm mr-2"
                      >
                        Accept
                      </button>
                      <button className="btn btn-warning btn-sm">Reject</button>
                    </>
                  ) : (
                    <span className="text-green-600 font-medium">Report Accepted</span>
                  )}
                  
                </td>
                <td className="py-2 px-3">
                  <button
                    onClick={() => handleStatusUpdate(report, 'Marked')}
                    className="btn btn-primary btn-sm mr-2"
                  >
                    Marked
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(report, 'Solved')}
                    className="btn btn-warning btn-sm"
                  >
                    Solved
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffTask;

