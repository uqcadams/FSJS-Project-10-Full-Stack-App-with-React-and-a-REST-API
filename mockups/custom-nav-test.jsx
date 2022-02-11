import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CourseManagerContext } from "../client/src/components/Context/index";
import ReactMarkdown from "react-markdown";
import Loading from "../client/src/components/Loading";

const CourseDetail = () => {
  const { id } = useParams();
  let history = useNavigate();
  let nextIndex;
  let nextIndexStr;
  let nextCourse;
  const context = useContext(CourseManagerContext);
  const authUser = context.authenticatedUser;
  const courseView = context.currentCourseView;

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
        // returnNextIndex();
        handleNextCourse();
        // console.log(nextIndex);
        setIsLoading(false);
      });
  }, [context.data, history, id]);

  const returnNextIndex = () => {
    let currentCourseID = parseInt(id);
    let currentIndex;
    switch (context.currentCourseView) {
      case "myCourses":
        currentIndex = context.myIndices.indexOf(currentCourseID);
        // console.log(`Current index in the myCourses Array: ${currentIndex}`);
        // console.log("Type of currentIndex: ", typeof currentIndex);
        nextIndex = context.myIndices[currentIndex + 1];
        // console.log("Type of nextIndex: ", typeof nextIndex);
        nextIndexStr = nextIndex.toString();
        // console.log("Type of nextIndexStr: ", typeof nextIndexStr);
        // console.log(`Next up:  ${nextIndex}`);
        // console.log(`Lets go to this url then: /courses/${nextIndex}`);
        break;
      default:
        currentIndex = context.allIndices.indexOf(currentCourseID);
        // console.log(`Current index in the allCourses Array: ${currentIndex}`);
        nextIndex = context.allIndices[currentIndex + 1];
        nextIndexStr = nextIndex.toString();
      // console.log(typeof nextIndexStr);
      // console.log(`Next up:  ${nextIndex}`);
    }
  };

  const handleNextCourse = () => {
    let currentCourseID = parseInt(id);
    let currentIndex;
    switch (context.currentCourseView) {
      case "myCourses":
        currentIndex = context.myIndices.indexOf(currentCourseID);
        // console.log(`Current index in the myCourses Array: ${currentIndex}`);
        // console.log("Type of currentIndex: ", typeof currentIndex);
        nextIndex = context.myIndices[currentIndex + 1];
        // console.log("Type of nextIndex: ", typeof nextIndex);
        nextIndexStr = nextIndex.toString();
        // console.log("Type of nextIndexStr: ", typeof nextIndexStr);
        // console.log(`Next up:  ${nextIndex}`);
        // console.log(`Lets go to this url then: /courses/${nextIndex}`);
        break;
      default:
        currentIndex = context.allIndices.indexOf(currentCourseID);
        // console.log(`Current index in the allCourses Array: ${currentIndex}`);
        nextIndex = context.allIndices[currentIndex + 1];
        nextIndexStr = nextIndex.toString();
      // console.log(typeof nextIndexStr);
      // console.log(`Next up:  ${nextIndex}`);
    }
    console.log(nextIndex);
    nextCourse = `/courses/${nextIndex}`;
    // console.log();
    // history(`"${nextCourse}"`, { replace: true });
  };

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
          console.log("Errors occured when deleting a course");
          setErrors(errors);
        } else {
          console.log("Course updated successfully");
          history(`/`, { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
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

          <Link
            className="button button-secondary"
            to={{}}
            onClick={() => history(-1)}
          >
            Return to List
          </Link>
          <Link
            className="button button-secondary"
            to={nextCourse}
            // onClick={() => {
            //   handleNextCourse();
            // }}
          >
            Next Course
          </Link>
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
