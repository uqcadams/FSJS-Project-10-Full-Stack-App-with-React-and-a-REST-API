import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CourseManagerContext } from "./Context";

const Authenticated = () => {
  const context = useContext(CourseManagerContext);
  return (
    <div className="wrap">
      <div>
        You have been authenticated,
        {/* {context.authenticatedUser.firstName}! */}
      </div>
      <Link to="../">Return to Dashboard</Link>
    </div>
  );
};

export default Authenticated;
