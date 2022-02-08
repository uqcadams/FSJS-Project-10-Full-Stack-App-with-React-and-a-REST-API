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
  } else {
    courses = <li>There are no courses returned.</li>;
  }

  return <div className="wrap main--grid">{courses}</div>;
};

export default CourseList;
