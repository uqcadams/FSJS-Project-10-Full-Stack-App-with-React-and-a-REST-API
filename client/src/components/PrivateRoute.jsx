/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, ...rest }) {
  const auth = true;
  return auth ? children : <Navigate to="/login" />;
}
