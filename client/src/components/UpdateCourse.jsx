import React, { useState, useContext, useEffect } from "react";
import Form from "./Form";
import { useNavigate, useParams } from "react-router-dom";
import { CourseManagerContext } from "./Context/index";

const UpdateCourse = () => {
  let history = useNavigate();
  const { id } = useParams();
  const context = useContext(CourseManagerContext);
  const authUser = context.authenticatedUser;

  // State Management
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [materialsNeeded, setMaterialsNeeded] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errors, setErrors] = useState([]);

  /**
   * Side effects to implement on course update page.
   * Course data is called from the API, and stored in local state. This is used to populate form fields with existing content.
   */
  useEffect(() => {
    context.data
      .getCourseById(id)
      .then((response) => {
        if (response.status === 404) {
          console.error(
            `[UpdateCourse.jsx]: The course record requested with getCourseById(id) does not exist. Course ID reference: "${id}".`
          );
          history("/notfound", { replace: true });
        } else if (
          response.associatedUser.emailAddress !== authUser.emailAddress
        ) {
          console.error(
            `[UpdateCourse.jsx]: User "${authUser.emailAddress}" is not authorised to modify the course records for course owned by user "${response.associatedUser.emailAddress}". Access is denied.`
          );
          history("/forbidden", { replace: true });
        } else {
          setTitle(response.title);
          setDescription(response.description);
          setEstimatedTime(response.estimatedTime);
          setMaterialsNeeded(response.materialsNeeded);
          setFirstName(response.associatedUser.firstName);
          setLastName(response.associatedUser.lastName);
        }
      })
      .catch((err) => {
        console.error(
          `[UpdateCourse.jsx]: An error has occurred while fetching course data with getCourseById(id). Error details: `,
          err
        );
        history("./error", { replace: true });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [context.data, history, id, authUser.emailAddress]);

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
   * Form submission functionality for updating course content for a pre-existing course in the dataset.
   */
  const submit = () => {
    const course = {
      id,
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId: authUser.id,
    };

    context.data
      .updateCourse(course, authUser.emailAddress, authUser.password)
      .then((errors) => {
        if (errors.length) {
          console.error(
            `[UpdateCourse.jsx]: Validation errors occurred while updating course content with updateCourse().`
          );
          setErrors(errors);
        } else {
          console.log(
            `[UpdateCourse.jsx]: Course id "${id}" was successfully updated.`
          );
          history(`/courses/${id}`, { replace: true });
        }
      })
      .catch((err) => {
        console.error(
          `[UpdateCourse.jsx]: An error occurred while updating course content with updateCourse(). Error:  `,
          err
        );
        history("/error", { replace: true });
      });
  };

  /**
   * Cancels the attempt to update the course, and returns the user to the previous page without saving modifications.
   */
  const cancel = () => {
    console.log("UpdateCourse: I wanna go back");
    history(-1);
  };

  return isLoading ? (
    <h2>Loading...</h2>
  ) : (
    <div className="wrap main">
      <h2>Update Course</h2>

      <Form
        cancel={cancel}
        submit={submit}
        errors={errors}
        submitButtonText="Update Course"
        elements={() => (
          <React.Fragment>
            <div className="main--flex">
              <div className="form--flex">
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
              <div className="form--flex">
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
