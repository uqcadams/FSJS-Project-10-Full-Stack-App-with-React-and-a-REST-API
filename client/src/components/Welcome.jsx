import React, { useContext } from "react";
import { CourseManagerContext } from "./Context";

const Welcome = () => {
  const { name, actions } = useContext(CourseManagerContext);
  return (
    <React.Fragment>
      <h1>Welcome, {name}</h1>
      <button onClick={actions.changeName}>Click Me</button>
    </React.Fragment>
  );
};

export default Welcome;
