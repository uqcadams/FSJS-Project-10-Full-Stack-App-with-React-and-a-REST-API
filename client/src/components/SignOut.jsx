import React, { useEffect, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CourseManagerContext } from "./Context/index";

const SignOut = () => {
  let history = useNavigate();
  const { actions } = useContext(CourseManagerContext);
  const { authenticatedUser } = useContext(CourseManagerContext);
  const [timer, setTimer] = useState(100);
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
      history("/", { replace: true });
    }
  });

  return (
    <React.Fragment>
      <div className="auth--centered">
        <h2>Signing out...</h2>
        <p>
          Signing you out and removing authentication credentials. Sorry to see
          you go, {authenticatedUser.firstName}!
        </p>
        <p>Redirecting you to the homepage in...{timer} seconds.</p>
        <button
          className="button"
          onClick={() => history(-1, { replace: true })}
        >
          Cancel Sign Out
        </button>
        <button
          className="button"
          onClick={() => {
            actions.signOut();
            history("/", { replace: true });
          }}
        >
          Return to Dashboard
        </button>
      </div>
    </React.Fragment>
  );
};

export default SignOut;
