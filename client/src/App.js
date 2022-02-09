import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// testing the fetching
import axios from "axios";

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

const App = () => {
  return (
    <Router>
      <Header />

      <Routes>
        <Route exact path="/" element={<CourseList />} />
        <Route path="/courses/create" element={<CreateCourse />} />
        <Route
          path="/courses/:id/update"
          element={
            <PrivateRoute>
              <UpdateCourse />
            </PrivateRoute>
          }
        />
        <Route path="/courses/:id" element={<CourseDetail />} />

        <Route path="/signin" element={<SignIn />} />
        <Route
          path="/authenticated"
          element={
            <PrivateRoute>
              <Authenticated />
            </PrivateRoute>
          }
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signout" element={<SignOut />} />

        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
};

export default App;
