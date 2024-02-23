import level from "../assets/level.jpg";
import BackWrapper from "../components/BackWrapper";
import React, { useEffect, useRef, useState } from "react";
import { Carousel, Space } from "antd";
import SelDeviceAndDuration from "./SelDeviceAndDuration";
import Button from "../components/Button";
import { ConfigProvider } from "antd";
import SelTimeAndDate from "./SelTimeAndDate";
import CompleteBooking from "./CompleteBooking";
import { useDispatch, useSelector } from "react-redux";
import {
  bookGame,
  getBookingError,
  getBookingStatus,
  getBookingSuccess,
  setBookingError,
  setBookingSuccess,
} from "../redux/BookingSlice";
import { Link } from "react-router-dom";

let isInitial = true;

const Booking = () => {
  const carouselRef = useRef();
  const dispatch = useDispatch();

  const [device, setDevice] = useState("");
  const [duration, setDuration] = useState("");
  const [dateOfBooking, setDateOfBooking] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [next, setNext] = useState(0);

  const bookingError = useSelector(getBookingError);
  const bookingSuccess = useSelector(getBookingSuccess);
  const bookingStatus = useSelector(getBookingStatus);

  const nextChangeHandler = () => {
    if (device && duration && isInitial && next === 0) {
      carouselRef.current.next();
      isInitial = false;
      setNext(next + 1);
    }

    if (dateOfBooking && startTime && endTime && next === 1) {
      dispatch(bookGame(device, duration, dateOfBooking, startTime, endTime));
    }
  };

  const goBackHandler = () => {
    isInitial = true;
    carouselRef.current.prev();
    setNext(next - 1);
    dispatch(setBookingSuccess({}));
    if (bookingError) {
      dispatch(setBookingError(""));
    }
  };

  useEffect(() => {
    if (bookingSuccess.message) {
      carouselRef.current.next();
    }
  }, [bookingSuccess.message]);

  useEffect(() => {
    if (bookingSuccess.message) {
      setNext(next + 1);
    }
    if (bookingError) {
      return;
    }
  }, [bookingSuccess.message, bookingError]);

  return (
    <>
      <div className="text-right xl:px-40 md:px-20 px-8 mt-4">
        <Link to="/chats">
          <button
            type="button"
            className="bg-fuchsia-500 px-4 py-1 text-white hover:bg-fuchsia-400"
          >
            Chat with Admin
          </button>
        </Link>
      </div>
      <ConfigProvider
        theme={{
          components: {
            Carousel: {
              dotWidth: "60px",
              dotHeight: 12,
              dotActiveWidth: "60px",
            },
          },
        }}
      >
        <Space>
          <div className="mt-12">
            <div className="grid lg:grid-cols-2 grid-cols-1">
              <BackWrapper className="relative" no_absolute={true}>
                <Carousel
                  dotPosition="top"
                  ref={carouselRef}
                  className="mt-4"
                  // dotsClass="bg-black-500"
                >
                  <SelDeviceAndDuration
                    setDevice={setDevice}
                    setDuration={setDuration}
                  />
                  <SelTimeAndDate
                    setDateOfBooking={setDateOfBooking}
                    setStartTime={setStartTime}
                    setEndTime={setEndTime}
                    endTime={endTime}
                    startTime={startTime}
                    duration={duration}
                  />
                  {!bookingError && (
                    <CompleteBooking
                      bookingSuccess={bookingSuccess.message && bookingSuccess}
                    />
                  )}
                </Carousel>
                <div className="absolute bottom-6 left-8">
                  <Button
                    title="Back"
                    className="px-8"
                    onClick={goBackHandler}
                    disabled={!next && true}
                  />
                </div>
                <div className="absolute bottom-6 right-8">
                  <Button
                    className="px-8 mx-8"
                    onClick={nextChangeHandler}
                    title={
                      bookingStatus === "loading" ? "Please Wait..." : "Next"
                    }
                    disabled={bookingSuccess.message && true}
                    loading={bookingStatus === "loading" ? true : false}
                  />
                </div>
                {bookingError && (
                  <div className="mt-3 md:px-8 px-3 text-red-500">
                    {bookingError}
                  </div>
                )}
              </BackWrapper>
              <div className="place-self-center hidden lg:block">
                <img src={level} alt="levelup" width={400} />
              </div>
            </div>
          </div>
        </Space>
      </ConfigProvider>
    </>
  );
};

export default Booking;
