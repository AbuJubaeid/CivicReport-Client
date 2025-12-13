import { use } from 'react';
import { AuthContext } from '../context/AuthContext/AuthContext';

const useHook = () => {
    const authInfo = use(AuthContext)
    
    return authInfo
};

export default useHook;