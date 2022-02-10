import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CourseManagerContext } from "./Context/index";

const CourseDetail = () => {
  // Hooks
  const { id } = useParams();
  let history = useNavigate();
  const context = useContext(CourseManagerContext);
  const [courseData, setCourseData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log(`Loading state: ${isLoading}`);
  useEffect(() => {
    console.log("Attempting to fetch data...");
    context.data
      .getCourseById(id)
      .then((course) => {
        console.log(`Course data was received...`);
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
    <h2> Loading... </h2>
  ) : (
    <React.Fragment>
      <div className="actions--bar">
        <div className="wrap">
          <Link className="button" to={`/courses/${id}/update`}>
            Update Course
          </Link>
          <Link className="button" to={`/courses/${id}/delete`}>
            Delete Course
          </Link>
          <Link className="button button-secondary" to="../">
            Return to List
          </Link>
        </div>
      </div>
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

              <p>{courseData.description}</p>
            </div>
            <div>
              <h3 className="course--detail--title">Estimated Time</h3>
              <p>{courseData.estimatedTime}</p>

              <h3 className="course--detail--title">Materials Needed</h3>
              <ul className="course--detail--list">
                <li>{courseData.materialsNeeded}</li>
              </ul>
            </div>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default CourseDetail;
