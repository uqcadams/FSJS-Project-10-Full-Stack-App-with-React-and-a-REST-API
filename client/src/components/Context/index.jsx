import React, { useState } from "react";
import Cookies from "js-cookie";

import Data from "../../utils/Data";

export const CourseManagerContext = React.createContext();

export const Provider = (props) => {
  const data = new Data(); // Intantiates a new instance of the data-fetching helper class.
  const cookie = Cookies.get("authenticatedUser");
  console.log(cookie);
  const [authenticatedUser, setAuthenticatedUser] = useState(
    cookie ? JSON.parse(cookie) : null
  );
  const [auth, setAuth] = useState(authenticatedUser ? true : false);
  const [allIndices, setAllIndices] = useState([]);
  const [myIndices, setMyIndices] = useState([]);
  const [currentCourseView, setCurrentCourseView] = useState("allCourses");

  const handleCourseView = (view) => {
    setCurrentCourseView(view);
  };

  const handleAllIndices = (indices) => {
    setAllIndices(indices);
  };

  const handleMyIndices = (indices) => {
    setMyIndices(indices);
  };

  /**
   * User sign in and authentication function. Updates context with the current authenticated user credentials.
   * If the username and password passed to the function pass the authentication tests, global state is updated to include the authenticated user credentials via the React Context API.
   * @param {string} username - the username (email) to be authenticated
   * @param {string} password - the password to match during authentication
   * @returns user authentication credentials.
   */
  const handleSignIn = async (username, password) => {
    const user = await data.getUser(username, password);
    if (user !== null) {
      console.log("User was authenticated");
      user.password = password;
      setAuthenticatedUser(user);
      setAuth(true);
      Cookies.set("authenticatedUser", JSON.stringify(user), { expires: 1 });
    } else {
      console.log("user was not authenticated");
    }
    return user;
  };

  /**
   * User sign out function. Resets authenticated user credentials to null in the global state via the React Context API.
   * Without authentication, a new user will need to sign in again to access protected routes.
   */
  const handleSignOut = () => {
    setAuthenticatedUser(null);
    setAuth(false);
    Cookies.remove("authenticatedUser");
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
      getCourseView: handleCourseView,
      getAllIndices: handleAllIndices,
      getMyIndices: handleMyIndices,
      signOut: handleSignOut,
      signIn: handleSignIn,
    },
  };

  return (
    <CourseManagerContext.Provider value={value}>
      {props.children}
    </CourseManagerContext.Provider>
  );
};

export const Consumer = CourseManagerContext.Consumer;
