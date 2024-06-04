const express = require("express");
const {
  addOrder,
  listOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} = require("../controllers/orders");
const adminOnlyMiddleware = require("../middleware/adminOnlyMiddleware");

const router = express.Router();

router.post("/orders", adminOnlyMiddleware, (req, res) => {
  const { userId, productIds, total } = req.body;
  const order = addOrder(userId, productIds, total);
  res.status(201).json(order);
});

router.get("/orders", (req, res) => {
  res.json(listOrders());
});

router.get("/orders/:id", (req, res) => {
  const order = getOrderById(parseInt(req.params.id));
  if (order) {
    res.json(order);
  } else {
    res.status(404).send("Orden no encontrada");
  }
});

router.put("/orders/:id", adminOnlyMiddleware, (req, res) => {
  const updatedOrder = updateOrder(parseInt(req.params.id), req.body);
  if (updatedOrder) {
    res.json(updatedOrder);
  } else {
    res.status(404).send("Orden no encontrada");
  }
});

router.delete("/orders/:id", adminOnlyMiddleware, (req, res) => {
  const deletedOrder = deleteOrder(parseInt(req.params.id));
  if (deletedOrder) {
    res.json(deletedOrder);
  } else {
    res.status(404).send("Orden no encontrada");
  }
});

module.exports = router;
