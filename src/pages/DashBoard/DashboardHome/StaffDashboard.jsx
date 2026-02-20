import { useQuery } from "@tanstack/react-query";

import {
    CheckCircle,
    ClipboardList,
    Clock,
} from "lucide-react";

import {
    Bar,
    BarChart,
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useHook from "../../../hooks/useHook";

const StaffDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useHook();

  const { data: reports = [], isLoading } = useQuery({
    queryKey: ["allReports"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reports");
      return res.data;
    },
  });

  if (loading || isLoading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const myTasks = reports.filter(
    (report) => report.staffEmail === user?.email
  );

  const completedTasks = myTasks.filter(
    (report) => report.reportStatus === "Solved"
  );

  const pendingTasks = myTasks.filter(
    (report) => report.reportStatus !== "Solved"
  );

  
  const pieData = [
    { name: "Completed", value: completedTasks.length },
    { name: "Pending", value: pendingTasks.length },
  ];

  const barData = [
    {
      name: "Tasks",
      Assigned: myTasks.length,
      Completed: completedTasks.length,
      Pending: pendingTasks.length,
    },
  ];

  const COLORS = ["#22c55e", "#facc15"];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body flex flex-col sm:flex-row items-center gap-6">
          <img
            src={user?.photoURL || "https://placehold.co/100x100"}
            alt="Staff"
            className="w-24 h-24 rounded-full border"
          />

          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold">
              {user?.displayName || "Staff"}
            </h2>
            <p className="text-gray-500">{user?.email}</p>
            <span className="badge badge-success mt-2">
              Active Staff
            </span>
          </div>
        </div>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Assigned Tasks"
          value={myTasks.length}
          icon={<ClipboardList />}
          color="text-primary"
        />
        <StatCard
          title="Completed"
          value={completedTasks.length}
          icon={<CheckCircle />}
          color="text-success"
        />
        <StatCard
          title="Pending"
          value={pendingTasks.length}
          icon={<Clock />}
          color="text-warning"
        />
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h3 className="text-lg font-semibold mb-4">
              Task Completion Ratio
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {pieData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h3 className="text-lg font-semibold mb-4">
              Task Overview
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={barData}>
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="Assigned" fill="#3b82f6" />
                <Bar dataKey="Completed" fill="#22c55e" />
                <Bar dataKey="Pending" fill="#facc15" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

     
      {myTasks.length === 0 && (
        <p className="text-center text-gray-500 py-10">
          No tasks assigned to you yet.
        </p>
      )}
    </div>
  );
};


const StatCard = ({ title, value, icon, color }) => (
  <div className="card bg-base-100 shadow-xl">
    <div className="card-body flex-row items-center gap-4">
      <div className={`text-3xl ${color}`}>{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
      </div>
    </div>
  </div>
);

export default StaffDashboard;