import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CourseManagerContext } from "./Context/index";
import Logo from "./Logo";

const Header = () => {
  const { authenticatedUser } = useContext(CourseManagerContext);
  const history = useNavigate();

  return (
    <header>
      <div className="wrap header--flex">
        <div className="header--banner" onClick={() => history("/")}>
          <Logo className="header--logo" />
          <span className="header--logo--text">Course Manager 9000</span>
        </div>
        <nav>
          {authenticatedUser ? (
            <ul className="header--signedin">
              <li className="welcome--tag">
                Welcome, {authenticatedUser.firstName}!
              </li>
              <li>
                <NavLink to="/mycourses">My Courses</NavLink>
              </li>
              <li>
                <NavLink to="/">All Courses</NavLink>
              </li>
              <li>
                <NavLink to="/signout">Sign Out</NavLink>
              </li>
            </ul>
          ) : (
            <ul className="header--signedout">
              <li>
                <NavLink to="/signup">Sign Up</NavLink>
              </li>
              <li>
                <NavLink to="/signin">Sign In</NavLink>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
