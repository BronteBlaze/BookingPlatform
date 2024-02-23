import { useState } from "react";
import {
  addSnacksToBookPrice,
  getSnackAddStatus,
  getSnacks,
} from "../redux/AdminSlice";
import {
  deleteInventory,
  getInventoryStatus,
  obtainInventory,
} from "../redux/InventorySlice";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";

const InventoryItem = ({ inventory }) => {
  const dispatch = useDispatch();
  const { name, price, inventory_image, _id, quantity } = inventory;

  const inventoryStatus = useSelector(getInventoryStatus);
  const { bookingId, addSnack } = useSelector(getSnacks);
  const { inventoryId, status } = useSelector(getSnackAddStatus);

  let [itemQuantity, setItemQuantity] = useState(quantity);

  const deleteItemHandler = () => {
    dispatch(deleteInventory(_id));
  };

  const addItemHandler = () => {
    const success = dispatch(
      addSnacksToBookPrice({
        bookingId,
        snackPrice: price,
        inventoryId: _id,
      })
    );
    setItemQuantity(itemQuantity - 1);
    success
      .then(() => {
        const upgrade = dispatch(obtainInventory(true));
        return upgrade;
      })
      .then((upgrade) => {
        if (upgrade && quantity === 1) {
          dispatch(deleteInventory(_id));
        }
      });
  };

  return (
    <div className="xl:w-[300px] rounded-md border border-gray-400">
      <img
        src={`http://localhost:8585/${inventory_image}`}
        alt="Laptop"
        className="h-[200px] w-full rounded-t-md object-cover"
      />
      <div className="p-4 text-center bg-fuchsia-300">
        <h1 className="inline-flex items-center text-2xl font-semibold">
          {name}
        </h1>
        <div className="mt-4 w-full text-center rounded-sm bg-black px-2 py-1.5 font-semibold text-white shadow-sm">
          <span className="text-xl">
            Rs.<span>{price}</span>
          </span>
        </div>
        <div className="mt-2 text-2xl font-medium">
          <span>x</span>
          <span>{itemQuantity}</span>
        </div>
        <div className="mt-2">
          <Button
            title={`${!addSnack ? "Delete" : "Add"}`}
            className="bg-fuchsia-200 w-full hover:bg-fuchsia-100"
            loading={
              inventoryStatus === "loading" ||
              (inventoryId === _id && status === "loading")
                ? true
                : false
            }
            onClick={!addSnack ? deleteItemHandler : addItemHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default InventoryItem;
