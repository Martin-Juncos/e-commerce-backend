// const { DataTypes } = require("sequelize");
// const sequelize = require("../../data/database");

// const Order = sequelize.define(
//   "Order",
//   {
//     userId: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     productId: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     quantity: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//   },
//   {
//     timestamps: false,
//   }
// );

// module.exports = Order;

// -------------------------------------------------

// src/models/Order.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
