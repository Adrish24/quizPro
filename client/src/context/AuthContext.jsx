import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { FIREBASE_AUTH } from "../Firebase/Firebase";
import { useDispatch } from "react-redux";
import { fetchPost } from "../store/postApiSlice";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const auth = FIREBASE_AUTH;

  const dispatch = useDispatch();
  
   useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      }else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);


  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };


  useEffect(() => {
    dispatch(fetchPost())
  },[])

  return (
    <UserContext.Provider
      value={{ createUser, user, logout, login }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(UserContext);
};
