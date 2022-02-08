import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CourseManagerContext } from "./Context/index";

export const Header = () => {
  const { name } = useContext(CourseManagerContext);
  const loggedIn = true;
  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo">
          <Link to="/">Project 10</Link>
        </h1>
        <nav>
          {loggedIn ? (
            <ul className="header--signedin">
              <li>Welcome, {name}!</li>
              <li>
                <Link to="/sign-out"></Link>Sign Out
              </li>
            </ul>
          ) : (
            <ul className="header--signedout">
              <li>
                <Link to="/sign-up">Sign Up</Link>
              </li>
              <li>
                <Link to="/sign-in">Sign In</Link>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
};
