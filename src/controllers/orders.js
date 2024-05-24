let orders = [];

function addOrder(userId, products) {
  const order = {
    id: orders.length + 1,
    userId,
    products,
    date: new Date(),
  };
  orders.push(order);
  return order;
}

function listOrders() {
  return orders;
}

function getOrderById(id) {
  return orders.find((order) => order.id === id);
}

function updateOrder(id, updatedOrder) {
  const index = orders.findIndex((order) => order.id === id);
  if (index !== -1) {
    orders[index] = { id, ...updatedOrder };
    return orders[index];
  }
  return null;
}

function deleteOrder(id) {
  const index = orders.findIndex((order) => order.id === id);
  if (index !== -1) {
    const deletedOrder = orders.splice(index, 1);
    return deletedOrder[0];
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
