import { useQuery } from "@tanstack/react-query";
import { FaTrashAlt, FaUserCheck } from "react-icons/fa";
import { IoPersonRemove } from "react-icons/io5";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ApproveStaffs = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: staffs = [] } = useQuery({
    queryKey: ["staffs", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/staffs");
      return res.data;
    },
  });

  const updateStaffInfo = (staff, status) =>{

    const updateInfo = { status: status, email: staff.email };
    axiosSecure.patch(`/staffs/${staff._id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch()
        Swal.fire({
          position: "top-end",
          icon: "success",
          title:
            "Staff status changed",
          showConfirmButton: false,
          timer: 2500,
        });
      }
    });
  }
  const handleApprove = (staff) => {
    updateStaffInfo(staff, 'approved') 
  };

  const handleReject = staff =>{
    updateStaffInfo(staff, 'rejected')
  }

    const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/staffs/${id}`)
          .then((res) => {
            console.log("data deleted from staff",res.data)
            if(res.data.deletedCount){
              refetch()
              Swal.fire("Deleted!", "Staff request has been deleted.", "success");
            }
          })
      }
    });
  };

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
              <th>Work Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {staffs.map((staff, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>{staff.name}</td>
                <td>{staff.email}</td>
                <td>{staff.address}</td>
                <td className={`${staff.status === 'approved' ? 'text-green-500' : 'text-red-500'}`}>{staff.status}</td>
                <td>{staff.workStatus}</td>
                <td>
                  <button
                    onClick={() => handleApprove(staff)}
                    className="btn"
                  >
                    <FaUserCheck />
                  </button>
                  <button
                    onClick={()=>handleReject(staff)}
                    className="btn">
                    <IoPersonRemove />
                  </button>
                  <button
                   onClick={()=>handleDelete(staff._id)}
                   className="btn">
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApproveStaffs;
