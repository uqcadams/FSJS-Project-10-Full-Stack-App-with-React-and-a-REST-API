import React, { useState, useContext } from "react";
import Form from "./Form";
import { useNavigate } from "react-router-dom";
import { CourseManagerContext } from "./Context/index";

const CreateCourse = () => {
  let history = useNavigate();
  const context = useContext(CourseManagerContext);
  const authUser = context.authenticatedUser;

  // State management
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [materialsNeeded, setMaterialsNeeded] = useState("");
  const [errors, setErrors] = useState([]);

  /**
   * DESCRIPTION: LIVE FORM INPUT FIELD UPDATE AND STORAGE.
   * Takes user input from the form fields in the form of an event object. Allows for the dynamic extraction and manipulation of event.target.value input fields.
   * @param {object} event - the data stored in the input field
   * The event.target.name value (the name of the input field) is used to determine and update the corresponding state fields via the useState() hook.
   * @returns updated state for the target field.
   */
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

  /**
   * Form submission functionality for creating new course content. Takes data from form fields, and creates a new course object with the current authenticated user's ID attached.
   * The new course object is passed to the createCourse(...) api method with user credentials to create a new course instance in the database.
   */
  const submit = () => {
    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId: authUser.id,
    };

    context.data
      .createCourse(course, authUser.emailAddress, authUser.password)
      .then((errors) => {
        if (errors.length) {
          console.error(
            `[CreateCourse.jsx]: Validation errors occurred while attempting to create new course content with createCourse().`
          );
          setErrors(errors);
        } else {
          console.log(
            `[CreateCourse.jsx]: A new course "${title}" was successfully created and added to the dataset.`
          );
          history(-1);
        }
      })
      .catch((err) => {
        console.error(
          `[CreateCourse.jsx]: An error occurred while attempting to create new course content with createCourse(). Error:  `,
          err
        );
        history("/error");
      });
  };

  /**
   * Cancels the attempt to create a new course and returns the user to the homepage.
   */
  const cancel = () => {
    history("/");
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
                  <p className="edit--notification">
                    Tip: add bullet points by prefixing each material with an
                    asterix ( " <span>*</span> " ).
                  </p>
                  <textarea
                    className="materials--needed"
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
