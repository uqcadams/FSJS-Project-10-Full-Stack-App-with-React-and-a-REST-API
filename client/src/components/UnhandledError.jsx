import React from "react";

/**
 * Describes an unhandled error occurrence while navigating the WebApp.
 * @returns {function} a stateless functional react component.
 */
const UnhandledError = () => {
  return (
    <div className="wrap">
      <h2>Error</h2>
      <p>Sorry! We just encountered an unexpected error.</p>
    </div>
  );
};

export default UnhandledError;
