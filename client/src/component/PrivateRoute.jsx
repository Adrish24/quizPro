/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const PrivateRoute = ({ children }) => {
  const { user } = useAuth()

  if(!user){
    return <Navigate to='/authentication'/>
  }

  return <>{children}</>
};

export default PrivateRoute;
