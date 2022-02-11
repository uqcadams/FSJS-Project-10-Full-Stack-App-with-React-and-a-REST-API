import React from "react";

/**
 * Describes an unmatched URL and renders a "Not Found" page.
 * @returns {function} a stateless functional react component.
 */
const NotFound = () => {
  return (
    <div className="wrap">
      <h2>Not Found</h2>
      <p>Sorry! We couldn't find the page you're looking for.</p>
    </div>
  );
};

export default NotFound;
