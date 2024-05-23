import React, { useState, createContext } from "react";

const WorkContext = createContext({});

const WorkProvider = ({ children }) => {
  const [actualWork, setActualWork] = useState(null);
  const [nextWork, setNextWork] = useState(null);
  const [actualCover, setActualCover] = useState(null);
  const [nextCover, setNextCover] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <WorkContext.Provider
      value={{
        actualWork,
        nextWork,
        actualCover,
        setActualCover,
        nextCover,
        setNextCover,
        setActualWork,
        setNextWork,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </WorkContext.Provider>
  );
};

export { WorkContext, WorkProvider };
