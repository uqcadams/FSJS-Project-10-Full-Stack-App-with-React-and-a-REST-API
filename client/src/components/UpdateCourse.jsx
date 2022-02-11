import React, { useState, useContext, useEffect } from "react";
import Form from "./Form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CourseManagerContext } from "./Context/index";

const UpdateCourse = () => {
  const { id } = useParams();
  const context = useContext(CourseManagerContext);
  const authUser = context.authenticatedUser;
  let history = useNavigate();

  // State Management
  const [isLoading, setIsLoading] = useState(false);
  const [courseData, setCourseData] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [materialsNeeded, setMaterialsNeeded] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errors, setErrors] = useState([]);

  const change = (event) => {
    const value = event.target.value;

    switch (event.target.name) {
      case "title":
        setTitle(value);
        break;
      case "description":
        setDescription(value);
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
      id,
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId: authUser.id,
    };
    const emailAddress = context.authenticatedUser.emailAddress;
    const password = context.authenticatedUser.password;
    context.data
      .updateCourse(course, emailAddress, password)
      .then((errors) => {
        if (errors.length) {
          console.log("Errors occured when updating a course");
          setErrors(errors);
        } else {
          console.log("Course updated successfully");
          history(`/courses/${id}`, { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
        history("/error", { replace: true });
      });
  };

  const cancel = () => {
    history(-1);
  };

  // Hooks
  console.log(`Loading state: ${isLoading}`);
  useEffect(() => {
    console.log("Attempting to fetch data...");
    context.data
      .getCourseById(id)
      .then((course) => {
        console.log(`Course data was received...`);
        setTitle(course.title);
        setDescription(course.description);
        setEstimatedTime(course.estimatedTime);
        setMaterialsNeeded(course.materialsNeeded);
        setFirstName(course.associatedUser.firstName);
        setLastName(course.associatedUser.lastName);
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
    <div className="wrap">
      <h2>Update Course</h2>

      <Form
        cancel={cancel}
        submit={submit}
        errors={errors}
        submitButtonText="Update Course"
        elements={() => (
          <React.Fragment>
            <div className="main--flex">
              <div>
                <label>
                  Course Title
                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={title}
                    onChange={change}
                    placeholder="Course Title"
                  />
                </label>
                <p>
                  By {firstName} {lastName}
                </p>
                <label>
                  Course Description
                  <textarea
                    id="description"
                    name="description"
                    type="text"
                    value={description}
                    onChange={change}
                    placeholder="Course Description"
                  />
                </label>
              </div>
              <div>
                <label>
                  Estimated Time
                  <input
                    id="estimatedTime"
                    name="estimatedTime"
                    type="text"
                    value={estimatedTime}
                    onChange={change}
                    placeholder="Estimated Time"
                  />
                </label>
                <label>
                  Materials Needed
                  <p className="edit--notification">
                    Tip: add bullet points by prefixing each material with an
                    asterix ( " <span>*</span> " ).
                  </p>
                  <textarea
                    id="materialsNeeded"
                    name="materialsNeeded"
                    type="text"
                    value={materialsNeeded}
                    onChange={change}
                    placeholder="Materials Needed"
                  />
                </label>
              </div>
            </div>
          </React.Fragment>
        )}
      />
    </div>
  );
};

export default UpdateCourse;
