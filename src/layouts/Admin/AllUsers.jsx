import { FaBars } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  addSnacks,
  getAdminStatus,
  getAllUsers,
  obtainAllUsers,
} from "../../redux/AdminSlice";
import { useEffect, useState } from "react";
import { Spin } from "antd";
import Pagination from "./Pagination";

const AllUsers = ({ setShowNav }) => {
  const { users, totalPages } = useSelector(getAllUsers);
  const adminStatus = useSelector(getAdminStatus);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(obtainAllUsers(currentPage));
  }, [dispatch, currentPage]);

  useEffect(() => {
    dispatch(addSnacks({ bookingId: "", addSnack: false }));
  }, [dispatch]);

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
          <h2 className="text-lg font-semibold">All Users</h2>
          <p className="mt-1 text-sm text-gray-700">
            You can view all the registered users in LevelUp Gaming Launge in
            this tab
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
                      First Name
                    </th>
                    <th
                      scope="col"
                      className="px-12 py-3.5 text-left text-sm font-normal text-gray-700"
                    >
                      Last Name
                    </th>
                    <th
                      scope="col"
                      className="px-12 py-3.5 text-left text-sm font-normal text-gray-700"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                    >
                      Phone Number
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 bg-white">
                  {adminStatus !== "loading" &&
                    users.length !== 0 &&
                    users.map((eachUser, index) => {
                      return (
                        <tr key={index}>
                          <td className="whitespace-nowrap px-4 py-4">
                            <div className="flex items-center">
                              <div className="ml-4">
                                <div className="text-md font-medium text-gray-900">
                                  {eachUser.userName}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-12 py-4">
                            <div className="text-sm text-gray-900 ">
                              {eachUser.firstName}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-12 py-4">
                            <div className="text-sm text-gray-900 ">
                              {eachUser.lastName}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-4 py-4">
                            <span className="inline-flex rounded-full px-2 text-md font-semibold leading-5">
                              {eachUser.email}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                            {eachUser.phoneNumber}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              {adminStatus !== "loading" && users.length === 0 && (
                <div className="text-center font-medium border-b border-white py-4">
                  <span>No User Registered</span>
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

export default AllUsers;
