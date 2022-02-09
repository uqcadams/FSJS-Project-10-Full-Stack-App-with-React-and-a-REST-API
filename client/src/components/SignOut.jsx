import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CourseManagerContext } from "./Context/index";

const SignOut = () => {
  let history = useNavigate();
  const { actions } = useContext(CourseManagerContext);
  useEffect(() => {
    actions.signOut();
    history("/", { forced: true });
  });
  return <div>Signing you out...</div>;
};

export default SignOut;
