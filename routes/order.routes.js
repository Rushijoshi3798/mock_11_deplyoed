const express = require("express");
const { auth } = require("../middlewares/auth");
const { OrderModel } = require("../model/order.model");

const orderRouter = express.Router();

orderRouter.post("/add", auth, async (req, res) => {
  try {
    const order = await OrderModel(req.body);
    await order.save();
    res
      .status(201)
      .send({ msg: "Order Has been Successfully Added to Database" });
  } catch (error) {
    res
      .status(400)
      .send({
        msg: "Order has not been Added to Database, Some error Occured! ",
      });
  }
});

orderRouter.get("/", auth, async (req, res) => {
  const token = req.headers.authorization;
  console.log(token);
  const decoded = jwt.verify(token, "masai");
  try {
    if (decoded) {
      const orders = await OrderModel.find();
      res.status(200).send(orders);
    }
  } catch (error) {
    res
      .status(400)
      .send({
        msg: "Something Went wrong, orders are not getting from database",
      });
  }
});

module.exports = {
  orderRouter,
};
