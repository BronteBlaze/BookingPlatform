import { useState } from "react";
import { useSelector } from "react-redux";
import { getAuthError } from "../redux/userSlice";

const useError = () => {
  const authError = useSelector(getAuthError);
  const [errorOfUser, setErrorOfUser] = useState("nothing");

  const authErrorHandler = () => {
    if (authError.includes("firstname")) {
      setErrorOfUser("firstNameError");
    } else if (authError.includes("lastname")) {
      setErrorOfUser("lastNameError");
    } else if (authError.includes("phone")) {
      setErrorOfUser("phoneNumberError");
    } else if (authError.includes("username")) {
      setErrorOfUser("userNameError");
    } else if (authError.includes("email") || authError.includes("Email")) {
      setErrorOfUser("emailError");
    } else if (authError.includes("password")) {
      setErrorOfUser("passwordError");
    } else if (authError === "") {
      setErrorOfUser("");
    }
  };

  return { errorOfUser, authErrorHandler };
};

export default useError;
