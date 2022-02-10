import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CourseManagerContext } from "./Context/index";

const Header = () => {
  const { authenticatedUser } = useContext(CourseManagerContext);

  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo">
          <Link to="/">Project 10</Link>
        </h1>
        <nav>
          {authenticatedUser ? (
            <ul className="header--signedin">
              <li>Welcome, {authenticatedUser.firstName}!</li>
              <li>
                <Link to="/mycourses">My Courses</Link>
              </li>
              <li>
                <Link to="/">All Courses</Link>
              </li>
              <li>
                <Link to="/signout">Sign Out</Link>
              </li>
            </ul>
          ) : (
            <ul className="header--signedout">
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
              <li>
                <Link to="/signin">Sign In</Link>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
