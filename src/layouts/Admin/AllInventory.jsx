import { FaBars } from "react-icons/fa";
import InventoryItem from "../../components/InventoryItem";
import useInput from "../../hooks/useInput";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getInventory,
  getInventoryError,
  getInventoryStatus,
  obtainInventory,
  postInventory,
  setInventoryError,
} from "../../redux/InventorySlice";
import { Spin } from "antd";

const AllInventory = ({ setShowNav }) => {
  const [inventory_image, setInventoryImage] = useState("");
  const dispatch = useDispatch();
  const {
    userData: name,
    userDataChangeHandler: nameChangeHanler,
    resetDataHandler: nameResetHandler,
  } = useInput();
  const {
    userData: price,
    userDataChangeHandler: priceChangeHandler,
    resetDataHandler: priceResetHandler,
  } = useInput();
  const {
    userData: quantity,
    userDataChangeHandler: quantityChangeHandler,
    resetDataHandler: quantityResetHandler,
  } = useInput();

  const imageChangeHandler = (event) => {
    setInventoryImage(event.target.files[0]);
  };

  //   console.log(name, price, inventory_image);

  const addInventoryHandler = () => {
    let inventoryData = new FormData();

    if (!name || !price || !inventory_image) {
      dispatch(setInventoryError("Please input all required data!"));
      return;
    }

    inventoryData.append("name", name);
    inventoryData.append("inventory_image", inventory_image);
    inventoryData.append("quantity", quantity);
    inventoryData.append("price", price);

    dispatch(postInventory(inventoryData));
    dispatch(setInventoryError(""));
    nameResetHandler();
    priceResetHandler();
    quantityResetHandler();
  };

  const inventories = useSelector(getInventory);
  const inventoryError = useSelector(getInventoryError);
  const inventoryStatus = useSelector(getInventoryStatus);

  useEffect(() => {
    dispatch(obtainInventory(false));
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(setInventoryError(""));
    };
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
          <h2 className="text-lg font-semibold">All Inventories</h2>
          <p className="mt-1 text-sm text-gray-700">
            You can view, add and delete all the available inventories
          </p>
        </div>
      </div>
      <div className="mt-4">
        <div className="lg:flex items-center gap-6">
          <div>
            <div>
              <label htmlFor="name">Name</label>
            </div>
            <input
              type="text"
              className="h-full p-3 text-black mt-2 w-full border border-gray-400"
              id="name"
              name="name"
              onChange={nameChangeHanler}
              value={name}
            />
          </div>
          <div className="mt-4 lg:mt-0">
            <div>
              <label htmlFor="price">Price</label>
            </div>
            <input
              type="number"
              className="h-full p-3 text-black mt-2 w-full border border-gray-400"
              id="price"
              name="price"
              onChange={priceChangeHandler}
              value={price}
            />
          </div>
          <div className="mt-4 lg:mt-0">
            <div>
              <label htmlFor="quantity">Quantity</label>
            </div>
            <input
              type="number"
              className="h-full p-3 text-black mt-2 w-full border border-gray-400"
              id="quantity"
              name="quantity"
              onChange={quantityChangeHandler}
              value={quantity}
            />
          </div>
          <div className="mt-4 lg:mt-0">
            <div>
              <label htmlFor="image">Image</label>
            </div>
            <input
              type="file"
              className="mt-2"
              id="image"
              name="image"
              onChange={imageChangeHandler}
            />
          </div>
          <div className="mt-4 lg:mt-0">
            <button
              type="button"
              className="px-12 py-2 bg-fuchsia-300 hover:bg-fuchsia-400"
              onClick={addInventoryHandler}
            >
              Add
            </button>
          </div>
        </div>
        {inventoryError && (
          <div className="mt-4 text-red-500">{inventoryError}</div>
        )}
        {inventoryStatus === "loading" && (
          <div className="mt-12 text-center">
            <span>
              <Spin size="large" />
            </span>
          </div>
        )}
        {inventoryStatus !== "loading" && inventories.length === 0 && (
          <div className="mt-12 font-medium">No inventory items added yet</div>
        )}
        <div className="mt-12 grid xl:grid-cols-4 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {inventoryStatus !== "loading" &&
            inventories.length !== 0 &&
            inventories.map((inventory, index) => {
              return <InventoryItem key={index} inventory={inventory} />;
            })}
        </div>
      </div>
    </section>
  );
};

export default AllInventory;
