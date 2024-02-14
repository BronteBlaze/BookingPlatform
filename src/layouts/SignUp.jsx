import BackWrapper from "../components/BackWrapper";
import Button from "../components/Button";
import Input from "../components/Input";
import useInput from "../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import {
  getAuthError,
  getAuthStatus,
  getSignUpMessage,
  setAuthError,
  setSignUpMessage,
  signUp,
} from "../redux/userSlice";
import useError from "../hooks/useError";
import { useEffect, useState } from "react";
import ErrorMessage from "../components/ErrorMessage";
import { useNavigate } from "react-router";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authErrror = useSelector(getAuthError);
  const authStatus = useSelector(getAuthStatus);

  const {
    userData: firstName,
    userDataChangeHandler: firstNameHandler,
    resetDataHandler: firstNameResetHandler,
  } = useInput();
  const {
    userData: lastName,
    userDataChangeHandler: lastNameHandler,
    resetDataHandler: lastNameResetHandler,
  } = useInput();
  const {
    userData: phoneNumber,
    userDataChangeHandler: phoneNumberHandler,
    resetDataHandler: phoneNumberResetHandler,
  } = useInput();
  const {
    userData: userName,
    userDataChangeHandler: userNameHandler,
    resetDataHandler: userNameResetHandler,
  } = useInput();
  const {
    userData: email,
    userDataChangeHandler: emailHandler,
    resetDataHandler: emailResetHandler,
  } = useInput();
  const {
    userData: password,
    userDataChangeHandler: passwordHandler,
    resetDataHandler: passwordResetHandler,
  } = useInput();

  const { errorOfUser, authErrorHandler } = useError();
  const [userRegisterSuccess, setUserRegisterSuccess] = useState(false);
  const signUpMessage = useSelector(getSignUpMessage);

  useEffect(() => {
    authErrorHandler();
  }, [authErrror, authErrorHandler]);

  useEffect(() => {
    return () => {
      dispatch(setAuthError(""));
      dispatch(setSignUpMessage(""));
    };
  }, [dispatch]);

  useEffect(() => {
    if (signUpMessage) {
      setUserRegisterSuccess(true);
      userNameResetHandler();
      firstNameResetHandler();
      lastNameResetHandler();
      emailResetHandler();
      passwordResetHandler();
      phoneNumberResetHandler();
    }
  }, [
    signUpMessage,
    userNameResetHandler,
    firstNameResetHandler,
    lastNameResetHandler,
    passwordResetHandler,
    emailResetHandler,
    phoneNumberResetHandler,
    navigate,
  ]);

  useEffect(() => {
    if (userRegisterSuccess) {
      navigate("/");
    }
  }, [userRegisterSuccess, navigate]);

  const registerHandler = () => {
    dispatch(
      signUp({ firstName, lastName, phoneNumber, userName, email, password })
    );
  };

  return (
    <BackWrapper className="px-4">
      <div className="flex gap-12 mt-6">
        <div>
          <Input
            type="text"
            id="fname"
            placeholder="First Name"
            errorClassName={
              errorOfUser === "firstNameError"
                ? "border-red-600"
                : "border-white"
            }
            value={firstName}
            onChange={firstNameHandler}
          />
          {errorOfUser === "firstNameError" && (
            <ErrorMessage message={authErrror} />
          )}
        </div>
        <div>
          <Input
            type="text"
            id="lname"
            placeholder="Last Name"
            errorClassName={
              errorOfUser === "lastNameError"
                ? "border-red-600"
                : "border-white"
            }
            onChange={lastNameHandler}
            value={lastName}
          />
          {errorOfUser === "lastNameError" && (
            <ErrorMessage message={authErrror} />
          )}
        </div>
      </div>
      <div className="flex gap-12 py-4">
        <div>
          <Input
            type="number"
            id="phone_num"
            placeholder="Phone Number"
            errorClassName={
              errorOfUser === "phoneNumberError"
                ? "border-red-600"
                : "border-white"
            }
            onChange={phoneNumberHandler}
            value={phoneNumber}
          />
          {errorOfUser === "phoneNumberError" && (
            <ErrorMessage message={authErrror} />
          )}
        </div>
        <div>
          <Input
            type="text"
            id="user_name"
            placeholder="User Name"
            errorClassName={
              errorOfUser === "userNameError"
                ? "border-red-600"
                : "border-white"
            }
            onChange={userNameHandler}
            value={userName}
          />
          {errorOfUser === "userNameError" && (
            <ErrorMessage message={authErrror} />
          )}
        </div>
      </div>
      <div className="mt-3">
        <div>
          <Input
            type="email"
            id="your_email"
            placeholder="E-mail"
            errorClassName={
              errorOfUser === "emailError" ? "border-red-600" : "border-white"
            }
            onChange={emailHandler}
            value={email}
          />
          {errorOfUser === "emailError" && (
            <ErrorMessage message={authErrror} />
          )}
        </div>
      </div>
      <div className="mt-3">
        <div>
          <Input
            type="password"
            id="your_pass"
            placeholder="Password"
            errorClassName={
              errorOfUser === "passwordError"
                ? "border-red-600"
                : "border-white"
            }
            onChange={passwordHandler}
            value={password}
          />
          {errorOfUser === "passwordError" && (
            <ErrorMessage message={authErrror} />
          )}
        </div>
      </div>
      <div className="mt-12">
        <Button
          title={authStatus === "loading" ? "Registering" : "Register"}
          className="px-20"
          onClick={registerHandler}
          loading={authStatus === "loading" ? true : false}
        />
      </div>
    </BackWrapper>
  );
};

export default SignUp;
