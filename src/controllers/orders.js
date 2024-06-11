const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");

async function addOrder(userId, productId, quantity) {
  const order = await Order.create({ userId, productId, quantity });
  return order;
}

async function listOrders() {
  const orders = await Order.findAll({ include: [User, Product] });
  return orders;
}

async function getOrderById(id) {
  const order = await Order.findByPk(id, { include: [User, Product] });
  return order;
}

async function updateOrder(id, updatedOrder) {
  const order = await getOrderById(id);
  if (order) {
    await order.update(updatedOrder);
    return order;
  }
  return null;
}

async function deleteOrder(id) {
  const order = await getOrderById(id);
  if (order) {
    await order.destroy();
    return order;
  }
  return null;
}

module.exports = {
  addOrder,
  listOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};
