import SignInPage from "./pages/SignInPage";
import "./App.css";
// import { jwtDecode } from "jwt-decode";
// import SignUpPage from "./pages/SignUpPage";
// import UserProfilePage from "./pages/UserProfilePage";
// import MainPage from "./pages/MainPage";
// import ShopPage from "./pages/ShopPage";
// import BookingPage from "./pages/BookingPage";
// import MoreGamesPage from "./pages/MoreGamesPage";
import React, { Fragment, Suspense, lazy, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router";
import { useSelector } from "react-redux";
// import AdminPage from "./pages/AdminPage";
import { Spin } from "antd";
import { jwtDecode } from "jwt-decode";
import AllUsers from "./layouts/Admin/AllUsers";
import AllBookings from "./layouts/Admin/AllBookings";

const LazySignInPage = lazy(() => wait(import("./pages/SignInPage")));
const LazySignUpPage = lazy(() => wait(import("./pages/SignUpPage")));
const LazyUserProfilePage = lazy(() => wait(import("./pages/UserProfilePage")));
const LazyMainPage = lazy(() => wait(import("./pages/MainPage")));
const LazyShopPage = lazy(() => wait(import("./pages/ShopPage")));
const LazyBookingPage = lazy(() => wait(import("./pages/BookingPage")));
const LazyMoreGamesPage = lazy(() => wait(import("./pages/MoreGamesPage")));
const LazyAdminPage = lazy(() => wait(import("./pages/AdminPage")));

const App = () => {
  const isLoggedIn = useSelector((state) => state.User.isLoggedIn);
  const tokenExist = localStorage.getItem("token");

  const [path, setPath] = useState("/nothing");

  useEffect(() => {
    if (isLoggedIn && tokenExist) {
      const { role } = jwtDecode(tokenExist);
      if (role === "user") {
        setPath("/home");
      } else {
        setPath("/admin");
      }
    }
  }, [isLoggedIn, tokenExist]);

  return (
    <Fragment>
      <Suspense
        fallback={
          <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            <Spin size="large" />
          </div>
        }
      >
        <Routes>
          {!isLoggedIn && <Route path="/" element={<LazySignInPage />}></Route>}
          {!isLoggedIn && (
            <Route path="/signup" element={<LazySignUpPage />}></Route>
          )}

          {isLoggedIn && (
            <Route path="/home" element={<LazyMainPage />}></Route>
          )}
          {isLoggedIn && (
            <Route path="/profile" element={<LazyUserProfilePage />}></Route>
          )}
          {isLoggedIn && (
            <Route path="/shop" element={<LazyShopPage />}></Route>
          )}
          {isLoggedIn && (
            <Route path="/booking" element={<LazyBookingPage />}></Route>
          )}
          {isLoggedIn && (
            <Route path="/games" element={<LazyMoreGamesPage />}></Route>
          )}
          {isLoggedIn &&
            tokenExist &&
            jwtDecode(tokenExist).role === "superadmin" && (
              <Route path="/admin" element={<LazyAdminPage />}>
                <Route path="users" element={<AllUsers />} />
                <Route path="bookings" element={<AllBookings />} />
              </Route>
            )}

          <Route
            path="*"
            element={
              <Navigate
                to={`${
                  path === "/home"
                    ? "/home"
                    : path === "/admin"
                    ? "/admin/users"
                    : "/"
                }`}
              />
            }
          ></Route>
        </Routes>
      </Suspense>
    </Fragment>
  );
};

function wait(promise) {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000);
  }).then(() => promise);
}

export default App;
