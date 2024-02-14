import { Fragment, useEffect } from "react";
import NavBar from "../layouts/NavBar";
import GunsAndVapes from "../layouts/ShopPage/GunsAndVapes";
import MobileNavbar from "../layouts/MobileNavbar";

const ShopPage = () => {
  return (
    <Fragment>
      <NavBar />
      <MobileNavbar />
      <GunsAndVapes />
    </Fragment>
  );
};

export default ShopPage;
