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
  const [loading,setloading]=useState(true)

  useEffect(() => {
   
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
       setloading(false)
    });

    return () => unsubscribe();
   
  }, []);





  useEffect(() => {
    const datapost = async () => {
      if (!User || !User.email) return;

      try {
        const res = await fetch("https://contesthub-server-pink.vercel.app/user", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            uid: User.uid,
            name: User.displayName,
            email: User.email,
            emailVerified: User.emailVerified,
            phone: User.phoneNumber,
            image: User.photoURL,
            isAnonymous: User.isAnonymous,
            metadata: User.metadata,
            providerData: User.providerData,
            authorization:User.accessToken
          })
        });
        const data = await res.json();
        console.log("User saved successfully", data);
      } catch (err) {
        console.log("Error posting user:", err);
      }
    }

    datapost();
  }, [User]);

console.log(User?.accessToken)


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



  const logout = () => {
    return signOut(auth)
  }

  const authinfo = {
    User,
    createaccountbygoogle,
    createaccountwithemail,
    loginaccountbyemail,
    updateUserProfileData,
    logout,
    loading


  };




  return <Authcontext value={authinfo}>
    {children}
  </Authcontext>;
};

export default Authprovider;
