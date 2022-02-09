/* eslint-disable import/no-anonymous-default-export */
import React, { useContext } from "react";
import { CourseManagerContext } from "./Context";

export default ({ component: Component, ...rest }) => {
  const context = useContext(CourseManagerContext);
  const hocComponent = ({ ...props }) => <WrappedComponent {...props} />;

  hocComponent.propTypes = {};

  return hocComponent;
};
