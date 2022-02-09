import React, { useEffect, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CourseManagerContext } from "./Context/index";

const SignOut = () => {
  let history = useNavigate();
  const { actions } = useContext(CourseManagerContext);
  const [timer, setTimer] = useState(10);
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((timer) => timer - 1);
        console.log("This will run every second!");
      }, 1000);
      return () => clearInterval(interval);
    } else {
      console.log("timer is up!");
      actions.signOut();
      history("/", { forced: true });
    }
  });
  return (
    <React.Fragment>
      <div>Signing you out...{timer}</div>
      <Link to="/">Cancel sign out</Link>
    </React.Fragment>
  );
};

export default SignOut;
