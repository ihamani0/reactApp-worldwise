/* eslint-disable react/prop-types */

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";


function PrivateRoute({ children }) {

  const navigate = useNavigate();

  const {isAuthneticated} = useAuth();
  useEffect(()=>{
    if(!isAuthneticated) navigate('/login');
  } , [isAuthneticated , navigate]);

//   the component still tries to render before the redirect happens.
  return  isAuthneticated ? children : null;  
} 
export default PrivateRoute;
