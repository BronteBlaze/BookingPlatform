import { NavLink } from "react-router-dom";
import logo from "../assets/logo.jpg";

const navOptions = [
  {
    option: "Home",
    path: "/home",
  },
  {
    option: "Booking",
    path: "/booking",
  },
  {
    option: "Shop",
    path: "/shop",
  },
  {
    option: "Account",
    path: "/profile",
  },
];

const NavBar = () => {
  return (
    <div className="xl:px-40 md:px-20 px-8 bg-fuchsia-800 text-white lg:block hidden">
      <nav className="flex justify-between text-xl items-center">
        <ul className="flex gap-40 items-center">
          {[0, 1].map((option) => {
            return (
              <NavLink key={option} to={`${navOptions[option].path}`}>
                {({ isActive }) => {
                  return (
                    <li
                      className={`cursor-pointer ${
                        isActive ? "underline" : ""
                      }`}
                    >
                      {navOptions[option].option}
                    </li>
                  );
                }}
              </NavLink>
            );
          })}
        </ul>
        <ul>
          <li>
            <img src={logo} alt="logo" width={80} />
          </li>
        </ul>
        <ul className="flex items-center gap-40">
          {[2, 3].map((option) => {
            return (
              <NavLink key={option} to={`${navOptions[option].path}`}>
                {({ isActive }) => {
                  return (
                    <li
                      className={`cursor-pointer ${
                        isActive ? "underline" : ""
                      }`}
                    >
                      {navOptions[option].option}
                    </li>
                  );
                }}
              </NavLink>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
