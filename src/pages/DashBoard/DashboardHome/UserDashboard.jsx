import { useQuery } from "@tanstack/react-query";
import { Activity, CheckCircle, Clock, FileText } from "lucide-react";
import {
    Bar,
    BarChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useHook from "../../../hooks/useHook";


const UserDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useHook();

  
  const { data: currentUser = {}, isLoading: userLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/me");
      return res.data;
    },
  });

  
  const { data: reports = [], isLoading: reportLoading } = useQuery({
    queryKey: ["allReports"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reports");
      return res.data;
    },
  });

  if (loading || userLoading || reportLoading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  
  const myReports = reports.filter((r) => r.email === user?.email);

  const pendingCount = myReports.filter(
    (r) => r.reportStatus === "pending"
  ).length;

  const inProgressCount = myReports.filter(
    (r) => r.reportStatus === "In-Progress"
  ).length;

  const solvedCount = myReports.filter(
    (r) => r.reportStatus === "Solved"
  ).length;

  const chartData = [
    { name: "Pending", value: pendingCount },
    { name: "In-Progress", value: inProgressCount },
    { name: "Solved", value: solvedCount },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
     
      <div className="flex items-center gap-4">
        <img
          src={currentUser.photoURL}
          alt={currentUser.displayName}
          className="w-16 h-16 rounded-full object-cover border"
        />
        <div>
          <h2 className="text-2xl font-bold">
            Hello! {currentUser.displayName}
          </h2>
          <p className="text-gray-500 capitalize">
            Role: {currentUser.role}
          </p>
        </div>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body flex-row items-center gap-4">
            <FileText className="text-primary" />
            <div>
              <p className="text-sm text-gray-500">Total Reports</p>
              <h3 className="text-2xl font-bold">{myReports.length}</h3>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body flex-row items-center gap-4">
            <Clock className="text-warning" />
            <div>
              <p className="text-sm text-gray-500">Pending</p>
              <h3 className="text-2xl font-bold">{pendingCount}</h3>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body flex-row items-center gap-4">
            <Activity className="text-info" />
            <div>
              <p className="text-sm text-gray-500">In-Progress</p>
              <h3 className="text-2xl font-bold">{inProgressCount}</h3>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body flex-row items-center gap-4">
            <CheckCircle className="text-success" />
            <div>
              <p className="text-sm text-gray-500">Solved</p>
              <h3 className="text-2xl font-bold">{solvedCount}</h3>
            </div>
          </div>
        </div>
      </div>

    
      <div className="card bg-base-100 shadow-2xl">
        <div className="card-body">
          <h3 className="text-xl font-semibold mb-4">
            My Report Status Overview
          </h3>

          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
