import React from 'react';
import { Authcontext } from './Authcontext';
import { auth } from './firebase.init';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const Authprovider = ({children}) => {
    const provider = new GoogleAuthProvider();



    const singinwithgoogle=()=>{
        return signInWithPopup(auth,provider)
    }

    const authinfo={
        singinwithgoogle,
    }
    return (
        <Authcontext value={authinfo}>
            {
                children
            }
        </Authcontext>
    );
};

export default Authprovider;