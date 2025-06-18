// components/ProtectedRoute.js
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import config from '../config/env'
import { useDispatch } from 'react-redux';
import { identity } from "../Store/user/userSlice";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading
  const dispatch = useDispatch()

  useEffect(() => {
    fetch(`${config.APP_URL}/auth`, {
      method: "POST",
      credentials: "include", // send cookies
    })
      .then((res) => {
        
        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
        return res.json()
        
      })
      .catch(() => setIsAuthenticated(false));
    }, []);
    
    if (isAuthenticated === null) return <div>Loading...</div>; // or a spinner
    return isAuthenticated ? children : <Navigate to="/login" />;

};

export default ProtectedRoute;
