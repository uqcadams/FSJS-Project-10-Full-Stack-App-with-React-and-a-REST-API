import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// testing the fetching
import axios from "axios";

import Header from "./components/Header";
import CourseList from "./components/CourseList";
import CourseDetail from "./components/CourseDetail";
import CreateCourse from "./components/CreateCourse";
import Error from "./components/Error";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import SignOut from "./components/SignOut";
import UpdateCourse from "./components/UpdateCourse";

const App = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/courses`)
      .then((response) => {
        console.log("Data returned: ", response.data);
        setData(response.data);
      })
      .catch((err) => console.log("An error occured."))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <Router>
      <Header />
      {/* <div className="course-list">
        {isLoading ? <p>Loading course list...</p> : <CourseList data={data} />}
      </div> */}
      <Routes>
        <Route exact path="/" element={<CourseList data={data} />} />
        <Route path="/courses/create" element={<CreateCourse data={data} />} />
        <Route
          path="/courses/:id/update"
          element={<UpdateCourse data={data} />}
        />
        <Route path="/courses/:id" element={<CourseDetail data={data} />} />

        <Route path="/signin" element={<SignIn data={data} />} />
        <Route path="/signup" element={<SignUp data={data} />} />
        <Route path="/signout" element={<SignOut />} />

        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
};

export default App;
