import { FaUserCircle } from "react-icons/fa";
import { TbBrandBooking } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import { MdOutlineInventory2 } from "react-icons/md";
import { BsChatSquareText } from "react-icons/bs";
import { CiLogout } from "react-icons/ci";
import { setIsLoggedIn } from "../../redux/userSlice";
import { useDispatch } from "react-redux";

const SideBar = ({ showNav }) => {
  const dispatch = useDispatch();

  const adminlogOutHandler = () => {
    localStorage.removeItem("token");
    dispatch(setIsLoggedIn(false));
    window.location.reload();
  };

  return (
    <div className={`${showNav ? "block" : "hidden"}`}>
      <div className="absolute top-4 left-4 z-50">
        <h2 className="text-2xl font-bold text-white">ADMIN</h2>
      </div>
      <div className="h-screen w-64 fixed bg-fuchsia-800"></div>
      <aside className="flex h-screen w-64 flex-col  overflow-y-auto border-r px-5 py-8">
        <div className="mt-6 flex flex-1 flex-col justify-between">
          <nav className="-mx-3 space-y-6 ">
            <div className="space-y-3 ">
              <label className="px-3 text-xs font-semibold uppercase text-white">
                analytics
              </label>
              <NavLink to="/admin/users">
                {({ isActive }) => {
                  return (
                    <div
                      className={`flex mt-4 ${
                        isActive && "bg-gray-100 text-gray-700"
                      } transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-50 hover:text-gray-700 cursor-pointer`}
                    >
                      <div className="text-2xl">
                        <FaUserCircle />
                      </div>
                      <span className="mx-2 text-xl font-medium">Users</span>
                    </div>
                  );
                }}
              </NavLink>
              <NavLink to="/admin/bookings">
                {({ isActive }) => {
                  return (
                    <div
                      className={`flex mt-4 ${
                        isActive && "bg-gray-100 text-gray-700"
                      } transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 cursor-pointer`}
                    >
                      <div className="text-2xl">
                        <TbBrandBooking />
                      </div>
                      <span className="mx-2 text-xl font-medium">Bookings</span>
                    </div>
                  );
                }}
              </NavLink>
              <NavLink to="/admin/inventory">
                {({ isActive }) => {
                  return (
                    <div
                      className={`flex mt-4 ${
                        isActive && "bg-gray-100 text-gray-700"
                      } transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 cursor-pointer`}
                    >
                      <div className="text-2xl">
                        <MdOutlineInventory2 />
                      </div>
                      <span className="mx-2 text-xl font-medium">
                        Inventory
                      </span>
                    </div>
                  );
                }}
              </NavLink>
              <NavLink to="/admin/chats">
                {({ isActive }) => {
                  return (
                    <div
                      className={`flex mt-4 ${
                        isActive && "bg-gray-100 text-gray-700"
                      } transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 cursor-pointer`}
                    >
                      <div className="text-2xl">
                        <BsChatSquareText />
                      </div>
                      <span className="mx-2 text-xl font-medium">Chats</span>
                    </div>
                  );
                }}
              </NavLink>
              <NavLink onClick={adminlogOutHandler}>
                <div
                  className={`flex mt-4 transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 cursor-pointer`}
                >
                  <div className="text-2xl">
                    <CiLogout />
                  </div>
                  <span className="mx-2 text-xl font-medium">Log out</span>
                </div>
              </NavLink>
            </div>
          </nav>
        </div>
      </aside>
    </div>
  );
};

export default SideBar;
