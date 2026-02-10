import { useQuery } from "@tanstack/react-query";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useHook from "../../../hooks/useHook";

const MyReports = () => {
  const { user } = useHook();
  const axiosSecure = useAxiosSecure();

  const { data: reports = [], refetch, isLoading } = useQuery({
    queryKey: ["MyReport", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/reports?email=${user.email}`);
      return res.data;
    },
  });

  const handleDeleteReport = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This report will be permanently removed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/reports/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire("Deleted!", "Report removed successfully.", "success");
          }
        });
      }
    });
  };

  const handlePayment = async (report) => {
    const paymentInfo = {
      issue: report.issue,
      reportId: report._id,
      email: report.email,
    };

    const res = await axiosSecure.post(
      "/create-checkout-session",
      paymentInfo
    );
    window.location.assign(res.data.url);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold text-base-content">
          My Reports
        </h2>
        <p className="text-gray-500 mt-1">
          View, manage, and track all the issues you have reported.
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-base-100 border border-base-200 rounded-xl shadow-sm">
        <table className="table">
          <thead className="bg-base-200 text-sm">
            <tr>
              <th>#</th>
              <th>Report</th>
              <th>Category</th>
              <th>Location</th>
              <th>Status</th>
              <th>Priority</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {reports.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-10 text-gray-500">
                  No reports found
                </td>
              </tr>
            )}

            {reports.map((report, index) => (
              <tr key={report._id} className="hover">
                <td className="font-medium">{index + 1}</td>

                <td className="font-medium max-w-xs truncate">
                  {report.issue}
                </td>

                <td>{report.category}</td>

                <td>{report.location}</td>

                <td>
                  <span
                    className={`badge capitalize
                      ${
                        report.reportStatus === "pending" &&
                        "badge-warning"
                      }
                      ${
                        report.reportStatus === "in-progress" &&
                        "badge-info"
                      }
                      ${
                        report.reportStatus === "Solved" &&
                        "badge-success"
                      }
                    `}
                  >
                    {report.reportStatus}
                  </span>
                </td>

                <td>
                  {report.paymentStatus === "paid" ? (
                    <span className="badge badge-success badge-outline">
                      High
                    </span>
                  ) : (
                    <button
                      onClick={() => handlePayment(report)}
                      className="btn btn-xs btn-outline btn-secondary"
                    >
                      Boost
                    </button>
                  )}
                </td>

                <td>
                  <div className="flex justify-center gap-2">

                    <button
                      className="btn btn-sm btn-ghost tooltip"
                      data-tip="Edit"
                    >
                      <FaRegEdit size={16} />
                    </button>

                    <button
                      onClick={() => handleDeleteReport(report._id)}
                      className="btn btn-sm btn-ghost text-error tooltip"
                      data-tip="Delete"
                    >
                      <MdOutlineDeleteForever size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyReports;

