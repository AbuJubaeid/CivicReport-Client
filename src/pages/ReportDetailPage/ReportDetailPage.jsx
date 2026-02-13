import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ReportDetailPage = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      axiosSecure
        .get(`/reports/${id}`)
        .then((res) => {
          setReport(res.data);
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [id, axiosSecure]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="text-center text-gray-500 mt-20">
        Report not found.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-10">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
        Report Details
      </h2>

      <div className="bg-white shadow-md rounded-xl overflow-hidden">
        {/* Report Image */}
        <div className="w-full h-64 md:h-96 overflow-hidden">
          <img
            src={report.photoURL || "https://placehold.co/800x500?text=No+Image"}
            alt={report.issue}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Report Info */}
        <div className="p-6 md:p-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-lg">Reporter Name</h3>
              <p>{report.name}</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Reporter Email</h3>
              <p>{report.email}</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Report Title</h3>
              <p>{report.issue}</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Category</h3>
              <p>{report.category}</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Location</h3>
              <p>{report.location}</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Created At</h3>
              <p>{new Date(report.createdAt).toLocaleString()}</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Payment Status</h3>
              <span
                className={`badge ${
                  report.paymentStatus === "paid" ? "badge-success" : "badge-warning"
                }`}
              >
                {report.paymentStatus || "Pending"}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Priority</h3>
              <span
                className={`badge ${
                  report.priority === "High-Priority" ? "badge-error" : "badge-info"
                }`}
              >
                {report.priority || "Normal"}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Report Status</h3>
              <span
                className={`badge ${
                  report.reportStatus === "Solved"
                    ? "badge-success"
                    : report.reportStatus === "In-Progress"
                    ? "badge-info"
                    : "badge-warning"
                }`}
              >
                {report.reportStatus || "Pending"}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Tracking ID</h3>
              <p>{report.trakingId || "N/A"}</p>
            </div>
            {report.staffName && (
              <>
                <div>
                  <h3 className="font-semibold text-lg">Assigned Staff</h3>
                  <p>{report.staffName}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Staff Email</h3>
                  <p>{report.staffEmail}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetailPage;
