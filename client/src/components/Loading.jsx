import React, { useState, useEffect } from "react";

/**
 * A temporary and conditionally-rendering loading screen to enable feedback during server lag or heavy data loading. To prevent "flashing" on every page load, the <React.Fragment> will only render the "Loading" notification after a set timer / interval has transpired, indicating that loading it taking longer than anticipated.
 * @returns a stateful functional react component.
 */
const Loading = () => {
  // State management
  const [timer, setTimer] = useState(0);
  const [showLoading, setShowLoading] = useState(false);

  /**
   * Side effects to implement while <Loading> component is mounted.
   * If <Loading> is mounted for 3 seconds or longer, conditionally render the Loading notification and provide feedback to the user. Timer and loading content will be cleared when the component is unmounted in the parent component.
   */
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((timer) => timer + 1);
      console.log("This will run every second!");
    }, 1000);
    if (timer > 3) {
      setShowLoading(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <React.Fragment>
      {showLoading ? (
        <div className="auth--centered">
          <h2>Loading content...!</h2>
        </div>
      ) : (
        <></>
      )}
    </React.Fragment>
  );
};

export default Loading;
