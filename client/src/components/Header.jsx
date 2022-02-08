import React, { useContext } from "react";
import { CourseManagerContext } from "./Context/index";

export const Header = () => {
  const { name, actions } = useContext(CourseManagerContext);
  const loggedIn = true;
  return (
    <div className="header">
      <div className="bounds">
        <div className="header--logo">Project 10</div>
        <nav>
          {loggedIn ? (
            <React.Fragment>
              <span>Welcome, {name}!</span>
              <div>Sign Out</div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div className="signup">Sign Up</div>
              <div className="signin">Sign In</div>
            </React.Fragment>
          )}
        </nav>
      </div>
    </div>
  );
};
