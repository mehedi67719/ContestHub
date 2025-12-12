import React, { useEffect, useState } from "react";
import { Authcontext } from "./Authcontext";
import { auth } from "./firebase.init";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

const Authprovider = ({ children }) => {
  const provider = new GoogleAuthProvider();
  const [User, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);


  // console.log(user)
  const createaccountbygoogle = () => {
    return signInWithPopup(auth, provider);
  };

  const createaccountwithemail = (email, password, name, photo) => {
    return createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
      return updateProfile(userCredential.user, {
        displayName: name,
        photoURL: photo,
      }).then(() => userCredential);
    });
  };

  const loginaccountbyemail = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateUserProfileData = (user, name, photo) => {
    return updateProfile(user, {
      displayName: name,
      photoURL: photo,
    });
  };



  const logout=()=>{
    return signOut(auth)
  }

  const authinfo = {
    User,
    createaccountbygoogle,
    createaccountwithemail,
    loginaccountbyemail,
    updateUserProfileData,
    logout
    
    
  };

  return <Authcontext value={authinfo}>
    {children}
    </Authcontext>;
};

export default Authprovider;
