import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CourseManagerContext } from "./Context/index";
import ReactMarkdown from "react-markdown";
import Loading from "./Loading";
import DeleteIcon from "../assets/DeleteIcon";
import GoBack from "../assets/GoBack";

const CourseDetail = () => {
  let history = useNavigate();
  const { id } = useParams();
  const context = useContext(CourseManagerContext);
  const authUser = context.authenticatedUser;

  // State Management
  const [courseData, setCourseData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  /**
   * Side effects to implement on course details page.
   * Course data is called from the API, and stored in local state. This is used to populate fields with course detail content.
   */
  useEffect(() => {
    context.data
      .getCourseById(id)
      .then((response) => {
        if (response.status === 404) {
          console.error(
            `[CourseDetail.jsx]: The course record requested with getCourseById(id) does not exist. Course ID reference: "${id}".`
          );
          history("/notfound", { replace: true });
        } else {
          setCourseData(response);
        }
      })
      .catch((err) => {
        console.error(
          `[CourseDetail.jsx]: An error has occurred while attempting to fetch course data. Error: `,
          err
        );
        history("/error", { replace: true });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [context.data, history, id]);

  /**
   * Confirmation dialog for course deletion.
   * The handleDeleteConfirmation() onClick conditional switch displays confirmation options for users when attempting to permanently delete a course record from the database.
   * This is implemented to mitigate user errors, in line with the error prevention heuristic for user interface design described by Nielsen.
   * Read more: https://www.nngroup.com/articles/confirmation-dialog/
   */
  const handleDeleteConfirmation = () => {
    switch (deleteConfirmation) {
      case true:
        setDeleteConfirmation(false);
        break;
      default:
        setDeleteConfirmation(true);
        break;
    }
  };

  /**
   * Course record deletion functionality.
   * Takes an authenticated user's credentials and passes them as parameters to the REST API.
   * As deletion is handled programmatically, the 403 forbidden error route should only render if an authentication sync issue has enabled the incorrect user to access the "delete course" button.
   */
  const handleDeleteCourse = () => {
    const emailAddress = context.authenticatedUser.emailAddress;
    const password = context.authenticatedUser.password;
    context.data
      .deleteCourse(id, emailAddress, password)
      .then((response) => {
        if (response.length) {
          console.error(
            `[CourseDetail.jsx]: An error occurred while attempting to delete course "${id}" with deleteCourse(...).`
          );
        } else if (response.status === 403) {
          console.error(
            `[CourseDetail.jsx]: An error occurred while attempting to delete course "${id}". The user lacks the authentication credentials to destroy this record. Error status: ${response.status}`
          );
          history("/forbidden", { replace: true });
        } else {
          console.log(
            `[CourseDetail.jsx]: Course records for course "${id}" have successfully been destroyed with deleteCourse(...). Good riddance!`
          );
          history(`/`, { replace: true });
        }
      })
      .catch((err) => {
        console.error(
          `[CourseDetail.jsx]: An error occurred while attempting to delete course "${id}" with deleteCourse(...).`,
          err
        );
        history("/error", { replace: true });
      });
  };

  return isLoading ? (
    // Note: Loading component will display only after a timed interval defined within that component.
    <Loading />
  ) : (
    <div className="main">
      <div className="actions--bar--shadow">
        <div className="actions--bar">
          <div className="wrap">
            {/* A user must be authenticated, and match the credentials of the fetched course record to access update and delete functionalities. */}
            {authUser && authUser.id === courseData.userId ? (
              <React.Fragment>
                <Link className="button" to={`/courses/${id}/update`}>
                  Update Course
                </Link>
                <Link
                  className={`button ${
                    deleteConfirmation ? "button--active" : ""
                  }`}
                  to={{}}
                  onClick={handleDeleteConfirmation}
                >
                  Delete Course
                </Link>
              </React.Fragment>
            ) : (
              <></>
            )}
            {/* Conditional rendering based on current enabled course view. If "My Courses" is selected, the return button will redirect to the users course list. If "All Courses" is selected, the return button will always return to the full course list. */}
            {context.currentCourseView === "myCourses" ? (
              <Link className="button button-secondary" to={"/mycourses"}>
                Return to My Courses
              </Link>
            ) : (
              <Link className="button button-secondary" to="/">
                Return to Course List
              </Link>
            )}
          </div>
        </div>
        {/* If the user has clicked the "Delete Course" button, a confirmation dialogue renders to confirm their choice. This is in line with error prevention usability guidelines, to safeguard against irreversible changes resulting from user errors. */}
        {deleteConfirmation ? (
          <div className="actions--bar deletion--dialogue">
            <div className="wrap">
              <div className="confirmation--dialogue">
                Are you sure you want to delete this course? This action cannot
                be undone.
              </div>

              <button
                className="button button--delete confirm-delete"
                onClick={handleDeleteCourse}
              >
                <div className="delete--content">
                  <DeleteIcon />
                  <span>Delete</span>
                </div>
              </button>

              <button
                className="button button--delete cancel-delete"
                onClick={handleDeleteConfirmation}
              >
                <div className="delete--content">
                  <GoBack />
                  <span>Keep</span>
                </div>
              </button>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="wrap">
        <h2 className="course--header">Course Detail</h2>
        <form>
          <div className="main--flex">
            <div>
              <h3 className="course--detail--title">Course</h3>
              <h4 className="course--name">{courseData.title}</h4>
              <p>
                By{" "}
                {courseData.associatedUser.firstName +
                  " " +
                  courseData.associatedUser.lastName}
              </p>

              <ReactMarkdown>{courseData.description}</ReactMarkdown>
            </div>
            <div>
              <h3 className="course--detail--title">Estimated Time</h3>
              <p>{courseData.estimatedTime}</p>

              <h3 className="course--detail--title">Materials Needed</h3>
              <ul className="course--detail--list">
                <ReactMarkdown>{courseData.materialsNeeded}</ReactMarkdown>
              </ul>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseDetail;
