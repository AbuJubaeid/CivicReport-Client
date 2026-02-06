import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import useHook from './useHook';

const useRole = () => {
    const { user } = useHook()
    const axiosSecure = useAxiosSecure()

    const { isLoading: roleLoading, data: role = "user"} = useQuery({
        queryKey: [ 'users-role', user.email],
        queryFn: async ()=>{
            const res = await axiosSecure.get(`users/${user.email}/role`)
            return res.data
        }
    })
    return {role, roleLoading}
};

export default useRole;