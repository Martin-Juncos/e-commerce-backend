// const Order = require("../models/Order");
// const Product = require("../models/Product");
// const User = require("../models/User");

// async function addOrder(userId, productId, quantity) {
//   const order = await Order.create({ userId, productId, quantity });
//   return order;
// }

// async function listOrders() {
//   const orders = await Order.findAll({ include: [User, Product] });
//   return orders;
// }

// async function getOrderById(id) {
//   const order = await Order.findByPk(id, { include: [User, Product] });
//   return order;
// }

// async function updateOrder(id, updatedOrder) {
//   const order = await getOrderById(id);
//   if (order) {
//     await order.update(updatedOrder);
//     return order;
//   }
//   return null;
// }

// async function deleteOrder(id) {
//   const order = await getOrderById(id);
//   if (order) {
//     await order.destroy();
//     return order;
//   }
//   return null;
// }

// module.exports = {
//   addOrder,
//   listOrders,
//   getOrderById,
//   updateOrder,
//   deleteOrder,
// };

// -----------------------------------------------

// src/controllers/orders.js
const Order = require("../models/Order");

async function addOrder(userId, productId, quantity) {
  const order = new Order({ userId, productId, quantity });
  await order.save();
  return order;
}

async function listOrders() {
  return await Order.find({}).populate("userId").populate("productId");
}

async function getOrderById(id) {
  return await Order.findById(id).populate("userId").populate("productId");
}

async function updateOrder(id, updatedOrder) {
  return await Order.findByIdAndUpdate(id, updatedOrder, { new: true });
}

async function deleteOrder(id) {
  return await Order.findByIdAndDelete(id);
}

module.exports = {
  addOrder,
  listOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};
