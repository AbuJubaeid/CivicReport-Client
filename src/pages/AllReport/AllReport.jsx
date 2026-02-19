import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useHook from "../../hooks/useHook";

const AllReport = () => {
  const { loading, user } = useHook();
  const axiosSecure = useAxiosSecure();

  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [search, setSearch] = useState("");

  
  const [upVotes, setUpVotes] = useState({});

  const { data: reports = [], isLoading } = useQuery({
    queryKey: ["reports", category, status, priority, search],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (category) params.append("category", category);
      if (status) params.append("status", status);
      if (priority) params.append("priority", priority);
      if (search) params.append("search", search);

      const url = `/reports?${params.toString()}`;
      const res = await axiosSecure.get(url);
      return res.data;
    },
  });

  
  const handleUpVote = (report) => {
    if (report.email === user?.email) return;

    setUpVotes((prev) => ({
      ...prev,
      [report._id]: (prev[report._id] || 0) + 1,
    }));
  };

  if (loading || isLoading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-6">All Reports</h2>

      <div className="bg-base-100 p-4 rounded-lg shadow mb-8 flex flex-col lg:flex-row gap-4 justify-between">
        <div className="flex flex-wrap gap-3">
          <select
            className="select select-bordered"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Water & Drainage">Water & Drainage</option>
            <option value="Road & Transport">Road & Transport</option>
            <option value="Public Safety">Public Safety</option>
          </select>

          <select
            className="select select-bordered"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="pending">pending</option>
            <option value="In-Progress">In-Progress</option>
            <option value="Solved">Solved</option>
          </select>

          <select
            className="select select-bordered"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="">All Priority</option>
            <option value="High-Priority">High-Priority</option>
            <option value="Normal">Normal</option>
          </select>
        </div>

        <input
          type="text"
          placeholder="Search issue, category, location"
          className="input input-bordered w-full lg:w-72"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {reports.length === 0 && (
        <p className="text-center text-gray-500 py-20">No reports found</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => {
          const isOwner = report.email === user?.email;

          return (
            <div
              key={report._id}
              className="card bg-base-100 border shadow hover:shadow-xl transition flex flex-col"
            >
              <figure className="h-48 bg-base-200">
                <img
                  src={report.photoURL || "https://placehold.co/600x400"}
                  alt={report.issue}
                  className="w-full h-full object-cover"
                />
              </figure>

              <div className="card-body flex-1">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="font-semibold text-lg line-clamp-2">
                    {report.issue}
                  </h3>

                  <span
                    className={`badge capitalize
                      ${report.reportStatus === "pending" && "badge-warning"}
                      ${report.reportStatus === "In-Progress" && "badge-info"}
                      ${report.reportStatus === "Solved" && "badge-success"}
                    `}
                  >
                    {report.reportStatus}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="badge badge-outline">{report.category}</span>
                  {report.priority && (
                    <span className="badge badge-outline">
                      {report.priority}
                    </span>
                  )}
                </div>

                <div className="divider"></div>

                <div className="text-sm text-gray-500 flex justify-between">
                  <span>{report.name}</span>
                  <span>
                    {new Date(report.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  
                  <button
                    onClick={() => handleUpVote(report)}
                    disabled={isOwner}
                    className={`flex items-center gap-1 text-sm ${
                      isOwner ? "opacity-40 cursor-not-allowed" : ""
                    }`}
                  >
                    <FaArrowUp />
                    <span>{upVotes[report._id] || 0}</span>
                  </button>

                  <Link
                    to={`/report-detail/${report._id}`}
                    className="btn btn-primary mt-4"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllReport;


