import React, { useState, useEffect } from "react";

const Loading = () => {
  const [timer, setTimer] = useState(0);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((timer) => timer + 1);
      console.log("This will run every second!");
    }, 1000);
    if (timer > 3) {
      setShowLoading(true);
    }
    return () => clearInterval(interval);
  });
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
