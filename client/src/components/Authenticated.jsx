import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CourseManagerContext } from "./Context";

const Authenticated = () => {
  const context = useContext(CourseManagerContext);
  const history = useNavigate();
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
      history(-1, { replace: true });
    }
  });

  return (
    <React.Fragment>
      <div className="auth--centered">
        <h2>Authentication Successful!</h2>
        <p>
          Your login credentials have been accepted,
          {context.authenticatedUser.firstName}!
        </p>
        <p>Redirecting you in...{timer} seconds.</p>
        <button className="button">
          <Link to="../">Continue...</Link>
        </button>
        <button className="button">
          <Link to="../">Return to Dashboard</Link>
        </button>
      </div>
    </React.Fragment>
  );
};

export default Authenticated;
