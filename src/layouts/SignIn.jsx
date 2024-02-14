import Input from "../components/Input";
import Button from "../components/Button";
import BackWrapper from "../components/BackWrapper";
import { Link } from "react-router-dom";
import useInput from "../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import {
  getAuthError,
  getAuthStatus,
  // getSignInMessage,
  setAuthError,
  signIn,
} from "../redux/userSlice";
import { useEffect, useState } from "react";
import ErrorMessage from "../components/ErrorMessage";

const SignIn = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { userData: email, userDataChangeHandler: emailChangeHandler } =
    useInput();
  const { userData: password, userDataChangeHandler: passwordChangeHandler } =
    useInput();

  const authError = useSelector(getAuthError);
  const authStatus = useSelector(getAuthStatus);
  const [signInError, setSignInError] = useState("");

  useEffect(() => {
    if (authError.includes("email")) {
      setSignInError("emailError");
    } else if (authError.includes("password")) {
      setSignInError("passwordError");
    } else if (authError === "") {
      setSignInError("");
    }
  }, [authError]);

  useEffect(() => {
    return () => dispatch(setAuthError(""));
  }, [dispatch]);

  const signInHandler = (event) => {
    event.preventDefault();
    dispatch(signIn(email, password));
  };

  return (
    <BackWrapper className="px-20 ">
      <form onSubmit={signInHandler}>
        <div className="mt-10">
          <div>
            <Input
              type="email"
              id="email"
              placeholder="Email"
              onChange={emailChangeHandler}
              errorClassName={
                signInError === "emailError" ? "border-red-600" : "border-white"
              }
            />
            {signInError === "emailError" && (
              <ErrorMessage message={authError} />
            )}
          </div>
          <div className="py-4">
            <Input
              type="password"
              id="pass"
              placeholder="Password"
              onChange={passwordChangeHandler}
              errorClassName={
                signInError === "passwordError"
                  ? "border-red-600"
                  : "border-white"
              }
            />
            {signInError === "passwordError" && (
              <ErrorMessage message={authError} />
            )}
          </div>
        </div>
        <div className="mt-6">
          <Button
            title="Login"
            className="w-full"
            type="submit"
            loading={authStatus === "loading" ? true : false}
          />
        </div>
      </form>
      <div className="mt-10">
        <div>
          <span>Don't Have an Account</span>
        </div>
        <Link to="/signup" className="hover:underline">
          <div>
            <span>Create One</span>
          </div>
        </Link>
      </div>
    </BackWrapper>
  );
};

export default SignIn;
