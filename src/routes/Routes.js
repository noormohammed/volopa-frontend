import React from 'react';
import { Routes, Route } from "react-router-dom";
import PrivateRoute from 'utils/PrivateRoute';
import Login from 'App/pages/Login';
import WalletDashboard from 'App/pages/WalletDashboard';
// import NotFound from '../pages/NotFound'


const AppRoutes = () => {
  return (
    <Routes>
      <Route exact path="/login" element={<Login/>}/>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <WalletDashboard />
          </PrivateRoute>
        }
        exact
      />
      {/* <Route path="*" element={<NotFound/>}/> */}
    </Routes>
  );
};

export default AppRoutes;