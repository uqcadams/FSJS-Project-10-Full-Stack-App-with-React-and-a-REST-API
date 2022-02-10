import React, { useState } from "react";

import Data from "../../utils/Data";

export const CourseManagerContext = React.createContext();

export const Provider = (props) => {
  const data = new Data();
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const [auth, setAuth] = useState(false);

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
  };

  /**
   * @param {object} value - an object containing the context to be shared throughout the component tree
   */
  const value = {
    authenticatedUser,
    auth,
    data,
    actions: {
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
