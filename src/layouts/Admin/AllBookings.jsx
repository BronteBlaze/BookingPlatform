import { useDispatch, useSelector } from "react-redux";
import {
  getAdminStatus,
  getAllUsers,
  obtainAllBookings,
} from "../../redux/AdminSlice";
import { FaBars } from "react-icons/fa";
import { getAllBookings } from "../../redux/AdminSlice";
import { useEffect, useState } from "react";
import { Spin } from "antd";
import Pagination from "./Pagination";

const AllBookings = ({ setShowNav }) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const adminStatus = useSelector(getAdminStatus);
  const { bookings, totalPages } = useSelector(getAllBookings);

  useEffect(() => {
    dispatch(obtainAllBookings(currentPage));
  }, [dispatch, currentPage]);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-4">
      <div
        className="text-3xl text-fuchsia-700 pb-10"
        onClick={() => {
          setShowNav((prevNav) => !prevNav);
        }}
      >
        <button>
          <FaBars />
        </button>
      </div>
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h2 className="text-lg font-semibold">All Bookings</h2>
          <p className="mt-1 text-sm text-gray-700">
            You can view all the bookings made by users in LevelUp Gaming Launge
            in this tab
          </p>
        </div>
      </div>
      <div className="mt-6 flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                    >
                      <span>User</span>
                    </th>
                    <th
                      scope="col"
                      className="px-12 py-3.5 text-left text-sm font-normal text-gray-700"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-12 py-3.5 text-left text-sm font-normal text-gray-700"
                    >
                      Device
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                    >
                      Duration
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                    >
                      Date of Booking
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                    >
                      Start Time
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                    >
                      End Time
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                    >
                      Due Amount
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                    >
                      Add Snacks
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                    >
                      Billing
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 bg-white">
                  {adminStatus !== "loading" &&
                    bookings.length !== 0 &&
                    bookings.map((eachBooking, index) => {
                      let {
                        user: { userId, userName, email },
                        booking: {
                          bookPrice,
                          bookingId,
                          dateOfBooking,
                          device,
                          duration,
                          startTime,
                          endTime,
                        },
                      } = eachBooking;
                      return (
                        <tr key={index}>
                          <td className="whitespace-nowrap px-4 py-4">
                            <div className="flex items-center">
                              <div className="ml-4">
                                <div className="text-md font-medium text-gray-900">
                                  {userName}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-12 py-4">
                            <div className="text-sm text-gray-900 ">
                              {email}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-12 py-4">
                            <div className="text-sm text-gray-900 ">
                              {device}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-4 py-4">
                            <span className="inline-flex rounded-full px-2 text-md font-semibold leading-5">
                              {duration}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                            {dateOfBooking}
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                            {startTime}
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                            {endTime}
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                            {bookPrice}
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                            <button
                              type="button"
                              className="px-8 py-2 bg-fuchsia-300 hover:bg-fuchsia-400"
                            >
                              Add
                            </button>
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                            <button
                              type="button"
                              className="px-8 py-2 bg-fuchsia-300 hover:bg-fuchsia-400"
                            >
                              Bill
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              {adminStatus !== "loading" && bookings.length === 0 && (
                <div className="text-center font-medium border-b border-white py-4">
                  <span>No Bookings yet</span>
                </div>
              )}
              {adminStatus === "loading" && (
                <div className="text-center">
                  <Spin size="large" className="flex justify-center mt-12" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <Pagination
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </section>
  );
};

export default AllBookings;
