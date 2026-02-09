import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useHook from "../../../hooks/useHook";

const CompletedReport = () => {
    const axiosSecure = useAxiosSecure();
      const { user } = useHook();
      const { data: reports = [], } = useQuery({
        queryKey: ["reports", user.email, "In-Progress"],
        queryFn: async () => {
          const res = await axiosSecure.get(`/reports/staff?staffEmail=${user.email}&reportStatus=Solved`);
          return res.data;
        },
      });
    return (
        <div>
            <h2>Completed Report:{reports.length}</h2>
            <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Location</th>
              <th>Report Status</th>
              <th>Solved By</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, index) => (
              <tr key={report._id}>
                <th>{index + 1}</th>
                <td>{report.issue}</td>
                <td>{report.location}</td>
                <td>{report.reportStatus}</td>
                <td>{report.staffName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        </div>
    );
};

export default CompletedReport;