import { Fragment, useEffect } from "react";
import NavBar from "../layouts/NavBar";
import MoreGamesAvail from "../layouts/ShopPage/MoreGamesAvail";
import MobileNavbar from "../layouts/MobileNavbar";

const MoreGamesPage = () => {
  return (
    <Fragment>
      <NavBar />
      <MobileNavbar />
      <MoreGamesAvail />
    </Fragment>
  );
};

export default MoreGamesPage;
