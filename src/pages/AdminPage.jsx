import { useLocation, useNavigate } from "react-router";
import AllUsers from "../layouts/Admin/AllUsers";
import SideBar from "../layouts/Admin/SideBar";
import { useEffect, useState } from "react";
import AllBookings from "../layouts/Admin/AllBookings";

const AdminPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/admin") navigate("/admin/users");
  }, [navigate, location]);

  const [showNav, setShowNav] = useState(true);
  return (
    <div className="flex overflow-hidden">
      <SideBar showNav={showNav} />
      {location.pathname === "/admin/users" && (
        <AllUsers setShowNav={setShowNav} />
      )}
      {location.pathname === "/admin/bookings" && (
        <AllBookings setShowNav={setShowNav} />
      )}
    </div>
  );
};
export default AdminPage;
