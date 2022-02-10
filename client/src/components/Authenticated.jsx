import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CourseManagerContext } from "./Context";

const Authenticated = () => {
  const context = useContext(CourseManagerContext);
  const history = useNavigate();
  const [timer, setTimer] = useState(1);

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
    <div className="wrap">
      <div>
        You have been authenticated,
        {context.authenticatedUser.firstName}! Timer: {timer}
      </div>
      <Link to="../">Return to Dashboard</Link>
    </div>
  );
};

export default Authenticated;
