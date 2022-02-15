import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CourseManagerContext } from "./Context/index";

/**
 * Renders a list of course records associated with the current authenticated user.
 * As a protected / secure route, users attempting to access the MyCourses component without authentication credentials will first be redirected to a sign-in page, before being taken back to this resource.
 * @returns a stateful function react component.
 */
const MyCourses = () => {
  const history = useNavigate();
  const context = useContext(CourseManagerContext);
  const { setCourseView, getMyIndices } = context.actions;
  const authUser = context.authenticatedUser;

  // State Management
  const [data, setData] = useState([]);

  let courses; // Stores the user-owned courses to be rendered on the page.

  /**
   * Side effects to implement on My Courses page.
   * Course data specific to the authenticated user is called from the API, and stored in local state. This is later mapped and rendered on the DOM.
   * While mounted, the course view is set to "myCourses", to give context to navigation functions.
   * The corresponding indices of each course ID in the dataset are updated in global state.
   */
  useEffect(
    () => {
      context.data
        .getMyCourses(authUser.id)
        .then((response) => {
          setData(response);
          setCourseView("myCourses");
          let myIndices = response.map((course) => course.id);
          getMyIndices(myIndices);
        })
        .catch((err) => {
          console.error(
            `[MyCourses.jsx]: An error has occurred while fetching course data with getMyCourse(id). Error details: `,
            err
          );
          history("/error", { replace: true });
        });
    },
    // eslint-disable-next-line
    []
  );

  /**
   * If courses exist, map the data array into course elements to render on the page.
   */
  if (data.length) {
    courses = data.map((course, index) => (
      <Link
        className="course--module course--link"
        key={index}
        to={`/courses/${course.id}`}
      >
        <h2 className="course--label">Course</h2>
        <h3 className="course--title">{course.title}</h3>
      </Link>
    ));
  }

  return (
    <div className="wrap main--grid">
      {courses}

      {/* "New Course" button does not need to be conditionally rendered based on the existence of an authenticated user. As a private / secure route, unauthorised users will first be asked to sign in prior to access this route. Auth check is therefore redundant. */}
      <Link
        className="course--module course--add--module"
        to={`/courses/create`}
      >
        <span className="course--add--title">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 13 13"
            className="add"
          >
            <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
          </svg>
          New Course
        </span>
      </Link>
    </div>
  );
};

export default MyCourses;
