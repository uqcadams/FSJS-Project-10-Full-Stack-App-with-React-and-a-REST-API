import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// testing the fetching
import axios from "axios";

import Welcome from "./components/Welcome";
import CourseList from "./components/CourseList";
import { Header } from "./components/Header";

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
      <Welcome />
      <div className="course-list">
        {isLoading ? <p>Loading course list...</p> : <CourseList data={data} />}
      </div>
    </Router>
  );
};

export default App;
