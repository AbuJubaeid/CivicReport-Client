import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useHook from "./useHook";

const useRole = () => {
  const { user, loading } = useHook();
  const axiosSecure = useAxiosSecure();

  const {
    data: role = "user",
    isLoading: roleLoading,
  } = useQuery({
    queryKey: ["users-role", user?.email],
    enabled: !!user?.email && !loading, 
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}/role`);
      return res.data?.role || "user";
    },
  });

  return { role, roleLoading };
};

export default useRole;