import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaUserShield } from "react-icons/fa";
import { GiShieldDisabled } from "react-icons/gi";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UserManager = () => {
  const axiosSecure = useAxiosSecure();
  const [searchUser, setSearchUser] = useState("");

  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users", searchUser],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?searchUser=${searchUser}`);
      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make admin",
    }).then((result) => {
      if (result.isConfirmed) {
        const roleInfo = { role: "admin" };
        axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
          if (res.data.modifiedCount) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${user.displayName} marked as an admin`,
              showConfirmButton: false,
              timer: 2500,
            });
          }
        });
      }
    });
  };

  const handleRemoveAdmin = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove admin",
    }).then((result) => {
      if (result.isConfirmed) {
        const roleInfo = { role: "user" };
        axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
          if (res.data.modifiedCount) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${user.displayName} removed from admin`,
              showConfirmButton: false,
              timer: 2500,
            });
          }
        });
      }
    });
  };

  return (
    <div className="p-4 md:p-8 lg:p-12">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">
        Users ({users.length})
      </h2>

      
      <div className="mb-6 flex justify-center md:justify-start">
        <div className="relative w-full max-w-md">
          <input
            type="search"
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}
            placeholder="Search user..."
            className="w-full border border-gray-300 rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 transition"
          />
          <svg
            className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8" strokeWidth="2"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65" strokeWidth="2"></line>
          </svg>
        </div>
      </div>

      
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-gray-600 font-medium">#</th>
              <th className="px-4 py-2 text-left text-gray-600 font-medium">User</th>
              <th className="px-4 py-2 text-left text-gray-600 font-medium">Email</th>
              <th className="px-4 py-2 text-left text-gray-600 font-medium">Role</th>
              <th className="px-4 py-2 text-left text-gray-600 font-medium">Admin Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {users.map((user, index) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={user.photoURL} alt="Avatar" />
                      </div>
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">{user.displayName}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3 capitalize">{user.role}</td>
                <td className="px-4 py-3 flex gap-2">
                  {user.role === "admin" ? (
                    <button
                      onClick={() => handleRemoveAdmin(user)}
                      title="Remove Admin"
                      className="btn btn-sm bg-red-500 hover:bg-red-600 text-white"
                    >
                      <GiShieldDisabled />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      title="Make Admin"
                      className="btn btn-sm bg-cyan-500 hover:bg-cyan-600 text-white"
                    >
                      <FaUserShield />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManager;


