import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import CreateCourse from "./components/CreateCourse";
import UnhandledError from "./components/UnhandledError";
import SignIn from "./components/UserSignIn";
import SignUp from "./components/UserSignUp";
import SignOut from "./components/UserSignOut";
import UpdateCourse from "./components/UpdateCourse";
import Authenticated from "./components/Authenticated";
import PrivateRoute from "./components/PrivateRoute";
import MyCourses from "./components/MyCourses";
import NotFound from "./components/NotFound";
import Forbidden from "./components/Forbidden";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        {/* STATUS: FUNCTIONAL - Returns a full course list - NOTE: React Router v6 no longer supports re-directs. Explicit paths are defined here instead. */}
        <Route path="/" element={<Courses />} />
        <Route path="/courses" element={<Courses />} />

        {/* STATUS: FUNCTIONAL - Returns courses associated with the authenticated user - NOTE: Route is private and requires authentication. A more dynamic approach to fetching and rendering content within <CourseList /> may be possible in future refactoring. */}
        <Route
          path="/mycourses"
          element={
            <PrivateRoute>
              <MyCourses />
            </PrivateRoute>
          }
        />

        {/* STATUS: FUNCTIONAL - Navigates to the course creation page - NOTE: Route is private and requires authentication. */}
        <Route
          path="/courses/create"
          element={
            <PrivateRoute>
              <CreateCourse />
            </PrivateRoute>
          }
        />

        {/* STATUS: FUNCTIONAL - Navigates to the course update page - NOTE: Route is private and requires authentication. */}
        <Route
          path="/courses/:id/update"
          element={
            <PrivateRoute>
              <UpdateCourse />
            </PrivateRoute>
          }
        />

        {/* STATUS: FUNCTIONAL - Returns a specific course details page - NOTE: Paths that are not exact matches will render the <NotFound /> page. */}
        <Route path="/courses/:id" element={<CourseDetail />} />

        {/* STATUS: FUNCTIONAL - Renders the sign-in page - NOTE: Users will be redirected to the authentication gateway after successful sign in. */}
        <Route path="/signin" element={<SignIn />} />

        {/* STATUS: FUNCTIONAL - Renders the successful authentication page - NOTE: Route is private and requires authentication. Provides user feedback to confirm log in status. Enables user to continue to previously redirected route, or escape to the main courselist page. */}
        <Route
          path="/authenticated"
          element={
            <PrivateRoute>
              <Authenticated />
            </PrivateRoute>
          }
        />

        {/* STATUS: FUNCTIONAL - Renders the sign-up page - NOTE: Users will be logged in with their new credentials and redirected to the authentication gateway. */}
        <Route path="/signup" element={<SignUp />} />

        {/* STATUS: FUNCTIONAL - Renders the sign-out page - NOTE: Route is private and requires authentication. Provides user feedback to confirm or cancel log out status. Mounts a timed function call to wipe authentication settings and redirect to home page after a set interval. */}
        <Route
          path="/signout"
          element={
            <PrivateRoute>
              <SignOut />
            </PrivateRoute>
          }
        />

        {/* STATUS: FUNCTIONAL - Define error handling routes - NOTE: Facilitated by specified redirects within function calls */}
        <Route path="/forbidden" element={<Forbidden />} />
        <Route path="/error" element={<UnhandledError />} />
        <Route path="/notfound" element={<NotFound />} />

        {/* STATUS: FUNCTIONAL - Error handling route for URLs that are not exact matches */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
