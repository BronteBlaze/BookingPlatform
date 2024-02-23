const getImagePath = require("../Helpers/getImagePath");
const Inventory = require("../model/Inventory");

exports.postInventory = async (req, res, next) => {
  const inventory_image = req.file.path;
  const originalPath = getImagePath(inventory_image);
  const { name, price, quantity } = req.body;
  const { user, userRole } = req;
  try {
    if (user && userRole === "superadmin") {
      const newInventory = new Inventory({
        name,
        inventory_image: originalPath,
        quantity,
        price,
      });

      const success = await newInventory.save();

      if (success) {
        return res
          .status(201)
          .json({ message: "Saved Successfully", inventoryInfo: newInventory });
      } else {
        throw new Error("Can't save inventory");
      }
    } else {
      throw new Error("Not Authorized");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getInventory = async (req, res, next) => {
  try {
    const allInventory = await Inventory.find({});
    const { user, userRole } = req;

    if (allInventory && user && userRole === "superadmin") {
      return res
        .status(200)
        .json({ message: "Fetched Succesfully", allInventory });
    } else {
      throw new Error("Error Occured");
    }
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteInventory = async (req, res, next) => {
  const { id } = req.params;
  const { user, userRole } = req;
  try {
    if (user && userRole === "superadmin") {
      const success = await Inventory.findByIdAndDelete(id);
      if (success) {
        return res.status(201).json({ message: "Deleted Successfully" });
      } else {
        throw new Error("Can't Delete inventory");
      }
    }
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
