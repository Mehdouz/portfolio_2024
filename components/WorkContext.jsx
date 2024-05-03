import React, { useState, createContext } from "react";

const WorkContext = createContext({});

const WorkProvider = ({ children }) => {
  const [activeWork, setActiveWork] = useState(0);

  return (
    <WorkContext.Provider
      value={{
        activeWork,
        setActiveWork,
      }}
    >
      {children}
    </WorkContext.Provider>
  );
};

export { WorkContext, WorkProvider };
