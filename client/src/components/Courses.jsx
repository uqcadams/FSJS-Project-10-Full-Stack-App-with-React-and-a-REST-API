import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CourseManagerContext } from "./Context/index";

/**
 * Renders a full list of all course records in the database.
 * @returns a stateful function react component.
 */
const Courses = () => {
  const history = useNavigate();
  const context = useContext(CourseManagerContext);
  const { setCourseView, getAllIndices } = context.actions;
  const authUser = context.authenticatedUser;

  // State management
  const [data, setData] = useState([]);

  let courses; // Stores courses to be rendered on the page

  /**
   * Side effects to implement on All Courses page.
   * Course data is called from the API, and stored in local state. This is later mapped and rendered on the DOM.
   * While mounted, the course view is set to "allCourses", to give context to navigation functions.
   * The corresponding indices of each course ID in the dataset are updated in global state.
   */
  useEffect(() => {
    context.data
      .getCourses()
      .then((response) => {
        setData(response);
        setCourseView("allCourses");
        let allIndices = response.map((course) => course.id);
        getAllIndices(allIndices);
      })
      .catch((err) => {
        console.error(
          `[Courses.jsx]: An error has occurred while fetching course data with getCourse(). Error details: `,
          err
        );
        history("/error", { replace: true });
      });
  }, []);

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
    <React.Fragment>
      {/* Conditionally rendered welcome note. If no user is logged in or authentication credentials are not found, a welcome message invites the user to sign up or sign in. This advises the user that course creation is only possible when a user account is active. The authentication check also conditionally renders a course creation button at the bottom of the screen. */}
      {!authUser ? (
        <div className="welcome--msg wrap">
          <span>Welcome, guest!</span>
          <Link to="/signin">Sign in</Link> or <Link to="/signup">sign up</Link>{" "}
          to create new courses to add to the database, or click on a course tag
          below to view more details.
        </div>
      ) : (
        <></>
      )}
      <div className="wrap main--grid">
        {courses}
        {authUser ? (
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
        ) : (
          <></>
        )}
      </div>
    </React.Fragment>
  );
};

export default Courses;
