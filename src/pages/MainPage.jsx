import { Fragment, useEffect } from "react";
import BookNow from "../layouts/MainPageLayouts/BookNow";
import NavBar from "../layouts/NavBar";
import AboutInfo from "../layouts/MainPageLayouts/AboutInfo";
import GameAvail from "../layouts/MainPageLayouts/GameAvail";
import Footer from "../layouts/MainPageLayouts/Footer";
import MobileNavbar from "../layouts/MobileNavbar";

const MainPage = () => {
  return (
    <Fragment>
      <NavBar />
      <MobileNavbar />
      <BookNow />
      <AboutInfo />
      <GameAvail />
      <Footer />
    </Fragment>
  );
};

export default MainPage;
