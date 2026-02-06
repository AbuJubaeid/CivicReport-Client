import Forbidden from '../components/Forbidden/forbidden';
import Loading from '../components/Loading/loading';
import useHook from '../hooks/useHook';
import useRole from '../hooks/useRole';

const AdminOnlyRoute = ({children}) => {
    const { loading} = useHook()
    const {role, roleLoading} = useRole()

    if(loading || roleLoading){
        return <Loading></Loading>
    }

    if( role !== 'admin'){
        return <Forbidden></Forbidden>
    }

    return children
};

export default AdminOnlyRoute;