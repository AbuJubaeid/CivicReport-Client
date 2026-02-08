import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useHook from "../../../hooks/useHook";

const StaffTask = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useHook();
  const { data: reports = [] } = useQuery({
    queryKey: ["reports", user.email, "processing"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reports/staff?staffEmail=${user.email}&reportStatus=processing`);
      return res.data;
    },
  });
  return (
    <div>
      <h2>Pending reports: {reports.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Location</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, index)=><tr key={report._id}>
              <th>{index + 1}</th>
              <td>{report.issue}</td>
              <td>{report.location}</td>
              <td>{report.createdAt}</td>
              <td>
                <button className="btn btn-primary">Accept</button>
                <button className="btn btn-warning">Reject</button>
              </td>
            </tr>)}
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffTask;
