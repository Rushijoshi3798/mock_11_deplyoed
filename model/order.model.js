const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    user : { type: String, ref: 'User' },
    books : [{ type: String, ref: 'Book' }],
    totalAmount: Number,
    userId: String
  },
  {
    versionKey: false,
  }
);

const OrderModel = mongoose.model("orders", orderSchema);

module.exports = {
  OrderModel,
};