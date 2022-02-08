import React, { useState } from "react";

import Data from "../../utils/Data";

export const CourseManagerContext = React.createContext();

export const Provider = (props) => {
  const data = new Data();
  const [name, setName] = useState("Chris");
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleChangeName = () => {
    const exampleName = "Dave";
    setName(exampleName);
  };

  const value = {
    name,
    data,
    actions: {
      changeName: handleChangeName,
    },
  };

  return (
    <CourseManagerContext.Provider
      // value={{
      //   name,
      //   isLoggedIn,
      //   actions: {
      //     changeName: handleChangeName,
      //   },
      // }}
      value={value}
    >
      {props.children}
    </CourseManagerContext.Provider>
  );
};
export const Consumer = CourseManagerContext.Consumer;

/* 

Build log:

1. Defined file structure - client/src/components/Context/index.jsx 
2. Import React
3. Initialise new context - adopted CourseManagerContext to provide semantic meaning
4. Assign provider to a Provider variable
5. Assign consumer to a Consumer variable
6. Ensured the Provider and Consumer can be exported and accessed elsewhere.
7. Imported Provider into the parent app component (client/src/App.js)

*/
