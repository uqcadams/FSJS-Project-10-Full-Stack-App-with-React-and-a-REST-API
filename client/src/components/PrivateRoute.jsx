/* eslint-disable import/no-anonymous-default-export */
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { CourseManagerContext } from "./Context/index";

/**
 * Higher-Order Component to protect routes that require authentication.
 * @param {*} ReactElement - A React component with restricted access
 * @returns A wrapped component that will evaluate if the user is authenticated, and based on the result will either render the element or redirect the user to the sign-in page.
 */
export default function PrivateRoute({ children, ...rest }) {
  const context = useContext(CourseManagerContext);
  return context.auth ? children : <Navigate to="/signin" />;
}
