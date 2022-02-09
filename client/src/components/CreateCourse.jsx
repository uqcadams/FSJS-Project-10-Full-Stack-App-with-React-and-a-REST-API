import React, { useState, useContext } from "react";

import Form from "./Form";
import { Link, useNavigate } from "react-router-dom";
import { CourseManagerContext } from "./Context/index";

const CreateCourse = () => {
  const context = useContext(CourseManagerContext);
  let history = useNavigate();

  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [materialsNeeded, setMaterialsNeeded] = useState("");
  const [errors, setErrors] = useState([]);

  const change = (event) => {
    const value = event.target.value;

    switch (event.target.name) {
      case "courseTitle":
        setCourseTitle(value);
        break;
      case "courseDescription":
        setCourseDescription(value);
        break;
      case "estimatedTime":
        setEstimatedTime(value);
        break;
      case "materialsNeeded":
        setMaterialsNeeded(value);
        break;
      default:
        return;
    }
  };

  const submit = () => {
    const course = {
      courseTitle,
      courseDescription,
      estimatedTime,
      materialsNeeded,
    };
    console.log("Course details: ", course);
    context.data
      .createCourse(course)
      .then((errors) => {
        if (errors.length) {
          setErrors(errors);
        } else {
          console.log("There were no errors");
        }
      })
      .catch((err) => {
        console.log(err);
        history("/error", { replace: true });
      });
  };

  const cancel = () => {
    history("/", { replace: true });
  };
  return (
    <div className="form--centered">
      <h2>Course Title</h2>

      <Form
        cancel={cancel}
        submit={submit}
        errors={errors}
        submitButtonText="Create Course"
        elements={() => (
          <React.Fragment>
            <input
              id="courseTitle"
              name="courseTitle"
              type="text"
              value={courseTitle}
              onChange={change}
              placeholder="Course Title"
            />
            <textarea
              id="courseDescription"
              name="courseDescription"
              type="text"
              value={courseDescription}
              onChange={change}
              placeholder="Course Description"
            />
            <input
              id="estimatedTime"
              name="estimatedTime"
              type="text"
              value={estimatedTime}
              onChange={change}
              placeholder="Estimated Time"
            />
            <input
              id="materialsNeeded"
              name="materialsNeeded"
              type="text"
              value={materialsNeeded}
              onChange={change}
              placeholder="Materials Needed"
            />
          </React.Fragment>
        )}
      />
    </div>
  );
};

export default CreateCourse;
