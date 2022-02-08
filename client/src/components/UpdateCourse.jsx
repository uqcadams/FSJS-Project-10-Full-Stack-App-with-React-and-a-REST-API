import React, { useState, useContext, useEffect } from "react";
import Form from "./Form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CourseManagerContext } from "./Context/index";

const UpdateCourse = () => {
  const { id } = useParams();
  const context = useContext(CourseManagerContext);
  let history = useNavigate();
  const name = "Chris Adams";

  // State Management
  const [isLoading, setIsLoading] = useState(false);
  const [courseData, setCourseData] = useState([]);
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
    history("/", { replace: true });
  };
  const cancel = () => {
    history("/", { replace: true });
  };

  // Hooks

  console.log(`Loading state: ${isLoading}`);
  useEffect(() => {
    console.log("Attempting to fetch data...");
    context.data
      .getCourseById(id)
      .then((course) => {
        console.log(`Course data was received...`);
        setCourseTitle(course.title);
        setCourseDescription(course.description);
        setEstimatedTime(course.estimatedTime);
        setMaterialsNeeded(course.materialsNeeded);
        setCourseData(course);
      })
      .catch((err) => {
        console.log("An error has occurred...");
        history("./error", { replace: true });
      })
      .finally(() => {
        console.log("Loading is being set to false");
        setIsLoading(false);
      });
  }, [context.data, history, id]);

  return isLoading ? (
    <h2>Loading...</h2>
  ) : (
    <div className="form--centered">
      <h2>Update Course</h2>

      <Form
        cancel={cancel}
        submit={submit}
        errors={errors}
        submitButtonText="Update Course"
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
            <p>
              By {courseData.associatedUser.firstName}{" "}
              {courseData.associatedUser.lastName}
            </p>
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

export default UpdateCourse;
