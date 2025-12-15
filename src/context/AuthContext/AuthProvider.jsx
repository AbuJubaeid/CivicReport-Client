import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '../../firebase/firebase.init';
import { AuthContext } from './AuthContext';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)

    const createUserWithEmailAndPasswordFunc = (email, password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInWithEmailAndPasswordFunc = (email, password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signInWithPopupFunc = () =>{
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const signOutFunc = () =>{
        setLoading(true)
        return signOut(auth)
    }

    const updateProfileFunc = (profile) =>{
        return updateProfile(auth.currentUser, profile)
    }

    const sendPasswordResetEmailFunc = (email) =>{
        return sendPasswordResetEmail(auth, email)
    }

    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, (currentUser=>{
            setUser(currentUser)
            setLoading(false)
        }))
        return ()=>{
            unSubscribe()
        }
    }, [])

    const authInfo = {
        createUserWithEmailAndPasswordFunc,
        signInWithEmailAndPasswordFunc,
        signInWithPopupFunc,
        signOutFunc,
        updateProfileFunc,
        sendPasswordResetEmailFunc,
        user,
        setUser,
        loading,
        setLoading,
        
    }

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;