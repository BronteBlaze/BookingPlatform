import { Fragment } from "react";
import NavBar from "../layouts/NavBar";
import Booking from "../layouts/Booking";
import MobileNavbar from "../layouts/MobileNavbar";

const BookingPage = () => {
  return (
    <Fragment>
      <div className="mb-20">
        <NavBar />
        <MobileNavbar />
        <Booking />
      </div>
    </Fragment>
  );
};

export default BookingPage;
