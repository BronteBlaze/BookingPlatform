const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const InventorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  inventory_image: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Inventory", InventorySchema);
