import React, { useEffect, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CourseManagerContext } from "./Context/index";

/**
 * "Sign Out" - React stateful functional component.
 * Local state is used during rendering to enable a real-time countdown timer. This is implemented in line with usability principles that should allow users to "escape" an unintended action. The timer functionality results in user credentials being wiped after a set interval, before which the user may attempt to redefine their actions.
 * @returns {function} Stateful functional component
 */
const SignOut = () => {
  let history = useNavigate();
  const { actions, authenticatedUser } = useContext(CourseManagerContext);
  const [timer, setTimer] = useState(3);

  /**
   * Interval timer functionality is mounted when the SignOut component is rendered. When the countdown timer reaches 0, sign out function is called amd the user is redirected to the homepage.
   */
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((timer) => timer - 1);
        console.log(
          `User "${authenticatedUser.emailAddress}" will be logged out in ${timer} seconds...`
        );
      }, 1000);
      return () => clearInterval(interval);
    } else {
      console.log(
        `The logout timer has lapsed. Authenticated user ${authenticatedUser.emailAddress} will now have their saved credentials removed from local storage.`
      );
      actions.signOut();
      history("/", { replace: true });
    }
  });

  return (
    <React.Fragment>
      <div className="auth--centered main">
        <h2>Signing out...</h2>
        <p>Sorry to see you go, {authenticatedUser.firstName}!</p>
        <p>Signing you out and clearing browser authentication credentials.</p>
        <p>Redirecting you to the homepage in...{timer} seconds.</p>
        <button
          className="button"
          onClick={() => history(-1, { replace: true })}
        >
          Cancel Sign Out
        </button>
      </div>
    </React.Fragment>
  );
};

export default SignOut;
