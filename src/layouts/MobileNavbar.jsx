import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { Collapse } from "react-collapse";

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

const MobileNavbar = ({ setNavHeight }) => {
  const [showNav, setShowNav] = useState(false);

  const navHandler = () => {
    setShowNav((prevNav) => {
      return !prevNav;
    });
    {
      setNavHeight &&
        setNavHeight((prev) => {
          return !prev;
        });
    }
  };

  return (
    <div className="lg:hidden px-8 py-4 text-gray-800">
      <div className="flex justify-between items-center">
        <div className="flex justify-center items-center gap-3">
          <img src={logo} alt="logo" width={60} />
          <span className="text-2xl font-semibold italic">LEVELUP</span>
        </div>
        <div className="text-3xl">
          <button onClick={navHandler}>
            <FaBars />
          </button>
        </div>
      </div>
      <Collapse isOpened={showNav}>
        <div>
          <nav className="text-3xl items-center border-t-4 border-black mt-6">
            <ul className="text-center mt-6">
              {[0, 1].map((option) => {
                return (
                  <NavLink key={option} to={`${navOptions[option].path}`}>
                    {({ isActive }) => {
                      return (
                        <li
                          className={`cursor-pointer py-2 ${
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
            <ul className="text-center">
              {[2, 3].map((option) => {
                return (
                  <NavLink key={option} to={`${navOptions[option].path}`}>
                    {({ isActive }) => {
                      return (
                        <li
                          className={`cursor-pointer py-2 ${
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
      </Collapse>
    </div>
  );
};

export default MobileNavbar;
