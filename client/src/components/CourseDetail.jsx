import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { CourseManagerContext } from "./Context/index";
import ReactMarkdown from "react-markdown";
import Loading from "./Loading";

const CourseDetail = () => {
  const { id } = useParams();
  let history = useNavigate();
  const context = useContext(CourseManagerContext);
  const authUser = context.authenticatedUser;
  const [courseData, setCourseData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [errors, setErrors] = useState([]);

  // console.log(`Loading state: ${isLoading}`);
  useEffect(() => {
    // console.log("Attempting to fetch data...");
    context.data
      .getCourseById(id)
      .then((course) => {
        // console.log(`Course data was received...`);
        setCourseData(course);
      })
      .catch((err) => {
        // console.log("An error has occurred...");
        history("./error", { replace: true });
      })
      .finally(() => {
        // console.log("Loading is being set to false");
        setIsLoading(false);
      });
  }, [context.data, history, id]);

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

  const handleDeleteCourse = () => {
    const emailAddress = context.authenticatedUser.emailAddress;
    const password = context.authenticatedUser.password;
    context.data
      .deleteCourse(id, emailAddress, password)
      .then((errors) => {
        if (errors.length) {
          // console.log("Errors occured when deleting a course");
          setErrors(errors);
        } else {
          // console.log("Course updated successfully");
          history(`/`, { replace: true });
        }
      })
      .catch((err) => {
        // console.log(err);
        history("/error", { replace: true });
      });
  };

  return isLoading ? (
    <Loading />
  ) : (
    <React.Fragment>
      <div className="actions--bar">
        <div className="wrap">
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
      {deleteConfirmation ? (
        <div className="actions--bar">
          <div className="wrap">
            <div>Are you sure you want to delete this course?</div>
            <br></br>
            <button
              className="button cancel-delete"
              onClick={handleDeleteConfirmation}
            >
              No
            </button>

            <button
              className="button button-secondary confirm-delete"
              onClick={handleDeleteCourse}
            >
              Yes
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className="wrap">
        <h2>Course Detail</h2>
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
    </React.Fragment>
  );
};

export default CourseDetail;
