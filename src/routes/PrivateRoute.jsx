import { Navigate } from 'react-router';
import useHook from '../hooks/useHook';

const PrivateRoute = ({children}) => {

    const {user, loading} = useHook()

    if(loading){
        return <span className="loading loading-ring loading-xl"></span>
    }

    if(!user){
        return <Navigate to="/login"></Navigate>
    }
    return children
};

export default PrivateRoute;