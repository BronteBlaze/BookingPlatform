import { Fragment, useState, useEffect } from "react";
import NavBar from "../layouts/NavBar";
import UserProfile from "../layouts/UserProfile";
import MobileNavbar from "../layouts/MobileNavbar";

const UserProfilePage = () => {
  const [navHeight, setNavHeight] = useState(false);
  return (
    <Fragment>
      <NavBar />
      <MobileNavbar setNavHeight={setNavHeight} />
      <UserProfile navHeight={navHeight} />
    </Fragment>
  );
};

export default UserProfilePage;
