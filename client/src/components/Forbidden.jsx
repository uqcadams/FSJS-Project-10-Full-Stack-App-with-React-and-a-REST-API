import React from "react";

/**
 * Describes a "Forbidden" route for unauthorised users who lack appropriate credentials to access a secured or private resource.
 * @returns {function} a stateless functional react component.
 */
const Forbidden = () => {
  return (
    <div className="wrap">
      <h2>Forbidden</h2>
      <p>Oh oh! You can't access this page.</p>
    </div>
  );
};

export default Forbidden;
