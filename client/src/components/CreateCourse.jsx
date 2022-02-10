import React, { useState, useContext } from "react";
import Form from "./Form";
import { useNavigate } from "react-router-dom";
import { CourseManagerContext } from "./Context/index";

const CreateCourse = () => {
  const context = useContext(CourseManagerContext);
  const authUser = context.authenticatedUser;
  let history = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [materialsNeeded, setMaterialsNeeded] = useState("");
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
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId: authUser.id,
    };
    const emailAddress = context.authenticatedUser.emailAddress;
    const password = context.authenticatedUser.password;

    context.data
      .createCourse(course, emailAddress, password)
      .then((errors) => {
        if (errors.length) {
          setErrors(errors);
        } else {
          history(-1);
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
    <div className="wrap">
      <h2>Create Course</h2>

      <Form
        cancel={cancel}
        submit={submit}
        errors={errors}
        submitButtonText="Create Course"
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
                  By{" "}
                  {context.authenticatedUser.firstName +
                    " " +
                    context.authenticatedUser.lastName}
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
                  <input
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

export default CreateCourse;
