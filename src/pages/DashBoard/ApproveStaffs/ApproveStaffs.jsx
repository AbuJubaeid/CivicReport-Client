import { useQuery } from "@tanstack/react-query";
import { FaTrashAlt, FaUserCheck } from "react-icons/fa";
import { IoPersonRemove } from "react-icons/io5";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ApproveStaffs = () => {
  const axiosSecure = useAxiosSecure();
  const { data: staffs = [] } = useQuery({
    queryKey: ["staffs", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/staffs");
      return res.data;
    },
  });

  const handleApprove = id =>{
    console.log(id)
    }

  return (
    <div>
      <h2>Pending approve staff request: {staffs.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Location</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {staffs.map((staff, index)=><tr>
              <th>{index + 1}</th>
              <td>{staff.name}</td>
              <td>{staff.email}</td>
              <td>{staff.address}</td>
              <td>{staff.status}</td>
              <td>
                <button
                 onClick={()=>handleApprove(staff._id)}
                 className="btn"><FaUserCheck /></button>
                <button className="btn"><IoPersonRemove /></button>
                <button className="btn"><FaTrashAlt /></button>
              </td>
            </tr>)}
            
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApproveStaffs;
