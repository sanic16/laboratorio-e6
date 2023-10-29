import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const RequireAuth = () => {
    const location = useLocation()

  const auth = useSelector((state) => state.auth.isAuth);
  return (
    <main className="h-[calc(100vh-104px)]">
        {auth ? 
        <Outlet /> : 
        <Navigate to="/login" state={{from: location}} replace />}
    </main>
  );
};

export default RequireAuth;
