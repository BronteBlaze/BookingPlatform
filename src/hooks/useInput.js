import { useState } from "react";

const useInput = () => {
  const [userData, setUserData] = useState("");

  const userDataChangeHandler = (event) => {
    setUserData(event.target.value);
  };

  const resetDataHandler = () => {
    setUserData("");
  };

  return { userData, userDataChangeHandler, resetDataHandler };
};

export default useInput;
