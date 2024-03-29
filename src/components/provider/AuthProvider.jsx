import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import auth from "./firebase-key";
import toast from "react-hot-toast";
import axios from "axios";
import { baseUrl } from "../shared/useAxios";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      const userEmail = currentUser?.email || user?.email;
      const loggedUser = { email: userEmail };
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        axios.get(`${baseUrl}/users/${loggedUser.email}`).then((res) => {
          setUserData(res.data);
          setRoleLoading(false);
        });
        axios
          .post(`${baseUrl}/jwt`, loggedUser, {
            withCredentials: true,
          })
          .then((res) => {
            console.log(res.data);
          });
      } else {
        axios
          .post(`${baseUrl}/logout`, loggedUser, { withCredentials: true })
          .then((res) => {
            console.log(res.data);
          });
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user]);

  const provider = new GoogleAuthProvider();
  const fbProvider = new FacebookAuthProvider();

  const fbLogIn = () => {
    setLoading(true);
    return signInWithPopup(auth, fbProvider);
  };

  const googleLogIn = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  const createUser = (email, passwords) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, passwords);
  };

  const logIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    handleAlert("warn", "User LoggedOut");
    return signOut(auth);
  };

  const handleAlert = (type, message) => {
    toast(message, {
      icon:
        (type == "success" && "✅") ||
        (type == "warn" && "⚠️") ||
        (type == "error" && "❌"),
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  // const createRoles = (email, name) => {
  //   const userData = {
  //     email: email,
  //     name: name,
  //     role: "tourist",
  //   };

  //   axios.post(`${baseUrl}/users`, userData).then((res) => {
  //     if (res.status == 201) {
  //       handleAlert("success", "User LoggedIn Successfully");
  //     }
  //   });
  // };

  const authInfo = {
    handleAlert,
    loading,
    user,
    createUser,
    logIn,
    logOut,
    googleLogIn,
    setLoading,
    fbLogIn,
    userData,
    roleLoading,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
