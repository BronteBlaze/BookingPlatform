import { useLocation, useNavigate } from "react-router";
import AllUsers from "../layouts/Admin/AllUsers";
import SideBar from "../layouts/Admin/SideBar";
import { useEffect, useState } from "react";
import AllBookings from "../layouts/Admin/AllBookings";
import AllInventory from "../layouts/Admin/AllInventory";
import BillingPage from "../layouts/Admin/BillingPage";
import Chats from "../layouts/Admin/Chats";

const AdminPage = ({ messages, setMessages, setInitial }) => {
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
      {location.pathname === "/admin/inventory" && (
        <AllInventory setShowNav={setShowNav} />
      )}
      {location.pathname === "/admin/billing" && (
        <BillingPage setShowNav={setShowNav} />
      )}
      {location.pathname === "/admin/chats" && (
        <Chats
          setShowNav={setShowNav}
          messages={messages}
          setMessages={setMessages}
          setInitial={setInitial}
        />
      )}
    </div>
  );
};
export default AdminPage;
