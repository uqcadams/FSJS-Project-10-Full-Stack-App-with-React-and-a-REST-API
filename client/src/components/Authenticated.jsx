import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CourseManagerContext } from "./Context";

/**
 * A user authentication feedback component.
 * Provides feedback to the user to inform them that their action was successful, and briefly offers them the opportunity to choose where they will navigate to.
 * After a set interval timer, the user is returned to their last route prior to accessing the sign-in function.
 * @returns {function} A stateful functional react component
 */
const Authenticated = () => {
  const history = useNavigate();
  const { authenticatedUser } = useContext(CourseManagerContext);
  const [timer, setTimer] = useState(5);

  /**
   * Interval timer functionality is mounted when the authentication component is rendered. When the countdown timer reaches 0, the user is redirected to their last accessed route.
   */
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((timer) => timer - 1);
        console.log(
          `Redirecting user "${authenticatedUser.emailAddress}" in ${timer} seconds...`
        );
      }, 1000);
      return () => clearInterval(interval);
    } else {
      console.log(history);
      history(-1, { replace: true });
    }
  });

  return (
    <React.Fragment>
      <div className="auth--centered main">
        <h2>Authentication Successful!</h2>
        <p>
          Your login credentials have been accepted,
          {authenticatedUser.firstName}!
        </p>
        <p>Redirecting you to your requested resource in...{timer} seconds.</p>
        <button
          className="button"
          onClick={() => history("/", { replace: true })}
        >
          Return to Dashboard
        </button>
      </div>
    </React.Fragment>
  );
};

export default Authenticated;
