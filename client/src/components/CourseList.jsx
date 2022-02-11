import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CourseManagerContext } from "./Context/index";

const CourseList = (props) => {
  const context = useContext(CourseManagerContext);
  const history = useNavigate();
  const authUser = context.authenticatedUser;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let allIndices;
  let courses;

  useEffect(() => {
    context.actions.getCourseView("allCourses");
    context.data
      .getCourses()
      .then((response) => {
        console.log("Data returned: ", response);
        setData(response);
        allIndices = response.map((course) => course.id);
        context.actions.getAllIndices(allIndices);
        console.log("Response data set to state");
      })
      .catch((err) => {
        console.log("An error has occurred...");
        history("/error", { replace: true });
      })
      .finally(() => {
        console.log("Loading is being set to false");
        setIsLoading(false);
      });
  }, []);

  if (data.length) {
    console.log("There are courses");
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

export default CourseList;
