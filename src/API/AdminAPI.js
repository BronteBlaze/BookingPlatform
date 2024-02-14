import API from ".";

export const GetAllUsersAPI = (currentPage) =>
  API.get("/all-users", { params: { currentPage } });

export const GetAllBookingsAPI = (currentPage) =>
  API.get("/booking", { params: { currentPage } });
