import API from ".";

export const PostInventoryAPI = (inventoryData) =>
  API.post("/inventory", inventoryData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const GetInventoryAPI = () => API.get("/inventory");

export const DeleteInventoryAPI = (_id) => API.delete(`/inventory/${_id}`);
