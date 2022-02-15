import React, { useState } from "react";
import Cookies from "js-cookie";

import Data from "../../utils/Data";

export const CourseManagerContext = React.createContext();

/**
 * Higher-Order Component to provide context to all child consumers
 * @param {object} props - props to be handed down to child components
 * @returns {function} - A Higher-Order functional component
 */
export const Provider = (props) => {
  const data = new Data(); // Intantiates a new instance of the data-fetching helper class.
  const cookie = Cookies.get("authenticatedUser");

  // STATE HOOKS
  const [authenticatedUser, setAuthenticatedUser] = useState(
    cookie ? JSON.parse(cookie) : null
  );
  const [auth, setAuth] = useState(authenticatedUser ? true : false);
  const [allIndices, setAllIndices] = useState([]);
  const [myIndices, setMyIndices] = useState([]);
  const [currentCourseView, setCurrentCourseView] = useState("allCourses");

  /**
   * Helper function to define current course view - "allCourses" or "myCourses". Updates context for use across application. Used for interpreting page navigation indices.
   * @param {string} view - defining either the "allCourses" or "myCourses" state.
   * @returns updated currentCourseView state.
   */
  const handleCourseView = (view) => {
    setCurrentCourseView(view);
  };

  /**
   * Stores the indices of all database records in global state, accessible via context. Used for interpolating URL navigation params in allCourses view. Enables dynamic updating the use of "next record" button.
   * @param {array} indices - an array of index values for all course records.
   * @returns updated allIndices state.
   */
  const handleAllIndices = (indices) => {
    setAllIndices(indices);
  };

  /**
   * Stores the indices of database records associated with the current authenticated user in global state, accessible via context. Used for interpolating URL navigation params in myCourses view. Enables dynamic updating the use of "next record" button.
   * @param {array} indices - an array of index values for course records associated with the current authenticated user.
   * @returns updated myIndices state.
   */
  const handleMyIndices = (indices) => {
    setMyIndices(indices);
  };

  /**
   * User sign in and authentication function. Updates context with the current authenticated user credentials.
   * If the username and password passed to the function pass the authentication tests, global state is updated to include the authenticated user credentials via the React Context API.
   * @param {string} username - the username (email) to be authenticated
   * @param {string} password - the password to match during authentication
   * @returns updated authenticatedUser details and auth status in global state, and updates browser cookies to hold user credentials.
   */
  const signIn = async (username, password) => {
    const user = await data.getUser(username, password);
    if (user !== null) {
      console.log(
        `[Context]: User "${username}" was successfully authenticated.`
      );
      user.password = password;
      setAuthenticatedUser(user);
      setAuth(true);
      Cookies.set("authenticatedUser", JSON.stringify(user), { expires: 1 });
    } else {
      console.log(`[Context]: User "${username}" failed authentication.`);
    }
    return user;
  };

  /**
   * User sign out function. Resets authenticated user credentials to null in the global state via the React Context API.
   * Without authentication, a new user will need to sign in again to access protected routes.
   */
  const signOut = () => {
    setAuthenticatedUser(null);
    setAuth(false);
    Cookies.remove("authenticatedUser");
    console.log(
      `[Context]: User has been successfully logged out and cookies removed from browser storage.`
    );
  };

  /**
   * @param {object} value - an object containing the context to be shared throughout the component tree
   */
  const value = {
    authenticatedUser,
    auth,
    data,
    currentCourseView,
    allIndices,
    myIndices,
    actions: {
      setCourseView: handleCourseView,
      getAllIndices: handleAllIndices,
      getMyIndices: handleMyIndices,
      signOut,
      signIn,
    },
  };

  return (
    <CourseManagerContext.Provider value={value}>
      {props.children}
    </CourseManagerContext.Provider>
  );
};

export const Consumer = CourseManagerContext.Consumer;
