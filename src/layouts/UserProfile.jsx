import { useEffect, useState } from "react";
import BackWrapper from "../components/BackWrapper";
import Button from "../components/Button";
import Input from "../components/Input";
import { useDispatch, useSelector } from "react-redux";
import {
  editUser,
  getAuthError,
  getAuthStatus,
  getUserCredentials,
  setIsLoggedIn,
} from "../redux/userSlice";
import { jwtDecode } from "jwt-decode";
import { setUserCredentials } from "../redux/userSlice";
import useInput from "../hooks/useInput";
import ErrorMessage from "../components/ErrorMessage";

const UserProfile = ({ navHeight }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.User.isLoggedIn);
  const authError = useSelector(getAuthError);
  const [editMode, setEditMode] = useState(false);
  const {
    _id,
    userName,
    email,
    firstName,
    lastName,
    phoneNumber,
    plainPassword,
    role,
  } = useSelector(getUserCredentials);
  const authStatus = useSelector(getAuthStatus);

  const { userData: first_name, userDataChangeHandler: firstNameHandler } =
    useInput();
  const { userData: last_name, userDataChangeHandler: lastNameHandler } =
    useInput();
  const { userData: phone_number, userDataChangeHandler: phoneNumberHandler } =
    useInput();
  const { userData: username, userDataChangeHandler: userNameHandler } =
    useInput();
  const { userData: emailOfUser, userDataChangeHandler: emailHandler } =
    useInput();
  const { userData: password, userDataChangeHandler: passwordHandler } =
    useInput();

  const editUserHandler = () => {
    const userData = {
      firstName: first_name,
      lastName: last_name,
      phoneNumber: phone_number,
      userName: username,
      email: emailOfUser,
      password: password,
    };
    let plainPassword = password;
    dispatch(editUser(userData, _id, role, plainPassword));
  };

  const signOutHandler = () => {
    localStorage.removeItem("token");
    dispatch(setIsLoggedIn(false));
    window.location.reload();
  };

  useEffect(() => {
    if (isLoggedIn && localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      const decryptToken = jwtDecode(token);

      dispatch(setUserCredentials(decryptToken));
    }
  }, [isLoggedIn, dispatch]);

  return (
    <>
      <div className="lg:text-right text-center xl:px-40 md:px-20 px-8 lg:mt-6">
        <button
          type="button"
          className="bg-fuchsia-400 hover:bg-fuchsia-600 text-white px-8 py-2"
          onClick={signOutHandler}
        >
          Sign out
        </button>
      </div>
      <BackWrapper
        className={`px-20 lg:mt-12 ${navHeight ? "mt-72" : "mt-12"}`}
      >
        <div>
          <div>
            <Input
              type="text"
              id="first_name"
              value={!editMode ? firstName : first_name}
              readonly={!editMode && true}
              onChange={firstNameHandler}
              placeholder="First Name"
            />
          </div>
          <div>
            <Input
              type="text"
              id="last_name"
              value={!editMode ? lastName : last_name}
              readonly={!editMode && true}
              onChange={lastNameHandler}
              placeholder="Last Name"
            />
          </div>
          <div>
            <Input
              type="text"
              id="user"
              value={!editMode ? userName : username}
              readonly={!editMode && true}
              onChange={userNameHandler}
              placeholder="Username"
            />
          </div>
          <div>
            <Input
              type="email"
              id="email_of_user"
              value={!editMode ? email : emailOfUser}
              readonly={!editMode && true}
              onChange={emailHandler}
              placeholder="Email"
            />
          </div>
          <div>
            <Input
              type="number"
              id="phone-number"
              value={!editMode ? phoneNumber : phone_number}
              readonly={!editMode && true}
              onChange={phoneNumberHandler}
              placeholder="Phone Number"
            />
          </div>
          <div>
            <Input
              type="password"
              id="password_user"
              value={!editMode ? plainPassword : password}
              readonly={!editMode && true}
              onChange={passwordHandler}
              placeholder="Password"
            />
          </div>
          {authError && <ErrorMessage message={authError} />}
        </div>
        <div className="flex items-center gap-4 mt-8">
          <div className="w-full">
            <Button
              title="Edit"
              className="w-full"
              onClick={() => setEditMode(true)}
            />
          </div>
          <div className="w-full">
            <Button
              title={authStatus === "loading" ? "Loading..." : "Confirm"}
              loading={authStatus === "loading" ? true : false}
              className="w-full"
              onClick={editUserHandler}
            />
          </div>
        </div>
      </BackWrapper>
    </>
  );
};

export default UserProfile;
