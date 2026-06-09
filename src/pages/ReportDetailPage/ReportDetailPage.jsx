import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useHook from "../../hooks/useHook";

const ReportDetailPage = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  const { Rloading } = useHook();

  const { data: reports = [], isLoading } = useQuery({
    queryKey: ["latestReports"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reports/latest");
      return res.data;
    },
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

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

  if (loading || isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="text-center text-gray-500 mt-20">Report not found.</div>
    );
  }

  return (
    <div>
      <div className="h-screen flex flex-col px-4 md:px-6 py-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 flex-shrink-0">
          Report Details
        </h2>

        <div className="flex flex-col md:flex-row gap-6 flex-1 min-h-0">
          <div className="w-full md:w-2/5 bg-white shadow-md rounded-xl overflow-hidden flex-shrink-0">
            <img
              src={
                report.photoURL || "https://placehold.co/800x500?text=No+Image"
              }
              alt={report.issue}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 bg-white shadow-md rounded-xl p-6 md:p-8 min-h-0 overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <h5 className="font-semibold text-lg">Reporter Name</h5>
                <p>{report.name}</p>
              </div>
              <div>
                <h5 className="font-semibold text-lg">Reporter Email</h5>
                <p>{report.email}</p>
              </div>
              <div>
                <h5 className="font-semibold text-lg">Report Title</h5>
                <p>{report.issue}</p>
              </div>
              <div>
                <h5 className="font-semibold text-lg">Category</h5>
                <p>{report.category}</p>
              </div>
              <div>
                <h5 className="font-semibold text-lg">Location</h5>
                <p>{report.location}</p>
              </div>
              <div>
                <h5 className="font-semibold text-lg">Created At</h5>
                <p>{new Date(report.createdAt).toLocaleString()}</p>
              </div>
              <div>
                <h5 className="font-semibold text-lg">Payment Status</h5>
                <span
                  className={`badge ${
                    report.paymentStatus === "paid"
                      ? "badge-success"
                      : "badge-warning"
                  }`}
                >
                  {report.paymentStatus || "Pending"}
                </span>
              </div>
              <div>
                <h5 className="font-semibold text-lg">Priority</h5>
                <span
                  className={`badge ${
                    report.priority === "High-Priority"
                      ? "badge-error"
                      : "badge-info"
                  }`}
                >
                  {report.priority || "Normal"}
                </span>
              </div>
              <div>
                <h5 className="font-semibold text-lg">Report Status</h5>
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
                <h5 className="font-semibold text-lg">Tracking ID</h5>
                <p>{report.trakingId || "N/A"}</p>
              </div>
              {report.staffName && (
                <>
                  <div>
                    <h5 className="font-semibold text-lg">Assigned Staff</h5>
                    <p>{report.staffName}</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-lg">Staff Email</h5>
                    <p>{report.staffEmail}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Recent Reports ── */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-base-content">
            Recent Reports
          </h2>
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
                      ${report.reportStatus === "pending" ? "badge-warning" : ""}
                      ${report.reportStatus === "in-progress" ? "badge-info" : ""}
                      ${report.reportStatus === "resolved" ? "badge-success" : ""}
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
    </div>
  );
};

export default ReportDetailPage;
