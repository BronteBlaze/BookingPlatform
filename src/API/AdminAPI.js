import API from ".";

export const GetAllUsersAPI = (currentPage) =>
  API.get("/all-users", { params: { currentPage } });

export const GetAllBookingsAPI = (currentPage) =>
  API.get("/booking", { params: { currentPage } });

export const AddSnackAPI = (bookingId, snackPrice, inventoryId) =>
  API.patch("/booking", { bookingId, snackPrice, inventoryId });

export const GetChatsAPI = (userId) =>
  API.get("/chats", { params: { userId } });
