import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import useHook from "./useHook";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000'
}) 
const useAxiosSecure = () => {

    const { user, signOutFunc } = useHook()
    const navigate = useNavigate();

    useEffect(()=>{
        // interceptor request
        const reqInterceptor = axiosSecure.interceptors.request.use(config=>{
            config.headers.Authorization = `Bearer ${user?.accessToken}`
            return config
        })

         // interceptor response
        const resInterceptor = axiosSecure.interceptors.response.use((response) => {
            return response;
        }, (error) => {
            console.log(error);

             const statusCode = error.status;
            if (statusCode === 401 || statusCode === 403) {
                signOutFunc()
                    .then(() => {
                        navigate('/login')
                    })
            }

             return Promise.reject(error);
        })

         return () => {
            axiosSecure.interceptors.request.eject(reqInterceptor);
            axiosSecure.interceptors.response.eject(resInterceptor);
         }
    }, [user, signOutFunc, navigate])
    return axiosSecure
};

export default useAxiosSecure;