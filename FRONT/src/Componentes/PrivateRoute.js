import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext'; // Asegúrate de ajustar la ruta según tu estructura de carpetas

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  return user ? children : <Navigate to="/iniciarsesion" />;
};

export default PrivateRoute;
