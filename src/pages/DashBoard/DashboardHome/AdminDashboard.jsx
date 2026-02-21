import { useQuery } from "@tanstack/react-query";
import {
    Bar,
    BarChart,
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const COLORS = ["#22c55e", "#3b82f6", "#f97316"];

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();

  const { data = {}, isLoading, isError } = useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/dashboard");
      return res.data;
    },
    refetchInterval: 5000,
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen text-xl">
        Loading Dashboard...
      </div>
    );

  if (isError)
    return (
      <div className="text-center text-red-500 mt-20">
        Failed to load dashboard
      </div>
    );

  const staffChart = [
    { name: "Working", value: data.staffs?.working || 0 },
    { name: "Available", value: data.staffs?.available || 0 },
  ];

  const reportChart = [
    { name: "Pending", count: data.reports?.pending || 0 },
    { name: "In-Progress", count: data.reports?.inProgress || 0 },
    { name: "Paid", count: data.reports?.paid || 0 },
  ];

  const highPriorityUsers = data.highPriorityUsers || [];

  return (
    <div className="p-6 bg-gradient-to-br from-slate-100 to-slate-200 min-h-screen space-y-10">

      
      <div className="flex items-center gap-5 bg-white p-6 rounded-2xl shadow mb-8">
        <img
          src={data.admin?.photoURL || "/avatar.png"}
          className="w-16 h-16 rounded-full border"
        />
        <div>
          <h2 className="text-xl font-bold">{data.admin?.displayName}</h2>
          <p className="text-gray-500">{data.admin?.email}</p>
          <span className="text-sm text-green-600 font-semibold">Admin</span>
        </div>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <Stat title="Approved Staff" value={data.staffs?.approved} />
        <Stat title="Working Staff" value={data.staffs?.working} />
        <Stat title="Available Staff" value={data.staffs?.available} />
        <Stat title="Total Users" value={data.users?.total} />
        <Stat title="Admins" value={data.users?.admins} />
        <Stat title="Total Reports" value={data.reports?.total} />
        <Stat title="Paid Reports" value={data.reports?.paid} />
        <Stat title="Revenue" value={`$${data.revenue ?? 0}`} />
      </div>

     
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ChartBox title="Staff Status">
          <PieChart>
            <Pie
              data={staffChart}
              dataKey="value"
              outerRadius={110}
              innerRadius={60}
              isAnimationActive
              animationBegin={0}
              animationDuration={2000}
              animationEasing="ease-out"
            >
              {staffChart.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ChartBox>

        <ChartBox title="Reports Status">
          <BarChart data={reportChart}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="count"
              fill="#3b82f6"
              isAnimationActive
              animationBegin={200}
              animationDuration={2000}
              animationEasing="ease-in-out"
            />
          </BarChart>
        </ChartBox>
      </div>

      
      <div className="bg-white p-6 rounded-2xl shadow">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold text-red-600"> High Priority Users</h2>
          <span className="text-xs bg-red-100 text-red-600 px-3 py-1 rounded-full">Profile & Report Boost</span>
        </div>

        {highPriorityUsers.length === 0 ? (
          <p className="text-center text-gray-500">No high priority users found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Total High Priority Profile & Reports</th>
                </tr>
              </thead>
              <tbody>
                {highPriorityUsers.map((user, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td>{i + 1}</td>
                    <td>{user.name || "N/A"}</td>
                    <td>{user.email}</td>
                    <td className="font-bold text-red-500 text-center">{user.totalReports}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

const Stat = ({ title, value }) => (
  <div className="bg-white p-6 rounded-2xl shadow text-center hover:scale-105 transition">
    <p className="text-gray-500 text-sm">{title}</p>
    <h3 className="text-2xl font-bold mt-2">{value ?? 0}</h3>
  </div>
);

const ChartBox = ({ title, children }) => (
  <div className="bg-white p-6 rounded-2xl shadow">
    <h2 className="font-semibold mb-4">{title}</h2>
    <ResponsiveContainer width="100%" height={320}>
      {children}
    </ResponsiveContainer>
  </div>
);

export default AdminDashboard;

