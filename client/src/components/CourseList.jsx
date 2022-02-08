import React from "react";
import { Link } from "react-router-dom";

const CourseList = (props) => {
  const results = props.data;
  let courses;

  if (results.length) {
    console.log("There are courses");
    courses = results.map((course, index) => (
      <Link
        className="course--module course--link"
        key={index}
        to={`/course/${index}`}
      >
        <h2 className="course--label">Course</h2>
        <h3 className="course--title">{course.title}</h3>
      </Link>
    ));
  }

  return (
    <div className="wrap main--grid">
      {courses}
      <Link
        className="course--module course--add--module"
        to={`/course/create-course`}
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

export default CourseList;
