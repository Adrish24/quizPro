import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { FIREBASE_AUTH } from "../Firebase/Firebase";
import { fetchData } from "../store/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchPost } from "../store/postApiSlice";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const auth = FIREBASE_AUTH;

  const dispatch = useDispatch();
  const { selectedCategoryValue } = useSelector((state) => state.category);
  const { selectedDifficulty } = useSelector((state) => state.difficulty);
  const { sessionToken }  = useSelector(state => state.session)

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



  const handleFetchQuestions = () => {
    dispatch(
      fetchData({
        category: selectedCategoryValue,
        difficulty: selectedDifficulty,
        sessionToken: sessionToken,
      })
    );
  };

  useEffect(() => {
    dispatch(fetchPost())
  },[])

  return (
    <UserContext.Provider
      value={{ createUser, user, logout, login, handleFetchQuestions }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(UserContext);
};
