import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import CourseList from "./components/CourseList";
import CourseDetail from "./components/CourseDetail";
import CreateCourse from "./components/CreateCourse";
import Error from "./components/Error";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import SignOut from "./components/SignOut";
import UpdateCourse from "./components/UpdateCourse";
import Authenticated from "./components/Authenticated";
import PrivateRoute from "./components/PrivateRoute";
import MyCourses from "./components/MyCourses";

const App = () => {
  return (
    <Router>
      <Header />

      <Routes>
        {/* NOTE: */}
        <Route path="/" element={<CourseList />} />

        {/* NOTE: */}
        <Route
          path="/mycourses"
          element={
            <PrivateRoute>
              <MyCourses />
            </PrivateRoute>
          }
        />

        {/* NOTE: */}
        <Route
          path="/courses/create"
          element={
            <PrivateRoute>
              <CreateCourse />
            </PrivateRoute>
          }
        />

        {/* NOTE: */}
        <Route
          path="/courses/:id/update"
          element={
            <PrivateRoute>
              <UpdateCourse />
            </PrivateRoute>
          }
        />

        {/* NOTE: */}
        <Route path="/courses/:id" element={<CourseDetail />} />

        {/* NOTE: */}
        <Route path="/signin" element={<SignIn />} />

        {/* NOTE: */}
        <Route
          path="/authenticated"
          element={
            <PrivateRoute>
              <Authenticated />
            </PrivateRoute>
          }
        />

        {/* STATUS: FUNCTIONAL - NOTE: Creates a new user and logs them into the system */}
        <Route path="/signup" element={<SignUp />} />

        {/* STATUS: FUNCTIONAL - NOTE: Renders signout component. Mounts a function call to wipe authentication settings and redirect to home page. */}
        <Route path="/signout" element={<SignOut />} />

        {/* STATUS: FUNCTIONAL - NOTE: Error handling route - if url is not an exact match, render error component */}
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
};

export default App;
