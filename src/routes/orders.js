const express = require("express");
const {
  addOrder,
  listOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} = require("../controllers/orders");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, (req, res) => {
  const { userId, products } = req.body;
  const order = addOrder(userId, products);
  res.status(201).json(order);
});

router.get("/", authMiddleware, (req, res) => {
  res.json(listOrders());
});

router.get("/:id", authMiddleware, (req, res) => {
  const order = getOrderById(parseInt(req.params.id));
  if (order) {
    res.json(order);
  } else {
    res.status(404).send("Orden no encontrada");
  }
});

router.put("/:id", authMiddleware, (req, res) => {
  const updatedOrder = updateOrder(parseInt(req.params.id), req.body);
  if (updatedOrder) {
    res.json(updatedOrder);
  } else {
    res.status(404).send("Orden no encontrada");
  }
});

router.delete("/:id", authMiddleware, (req, res) => {
  const deletedOrder = deleteOrder(parseInt(req.params.id));
  if (deletedOrder) {
    res.json(deletedOrder);
  } else {
    res.status(404).send("Orden no encontrada");
  }
});

module.exports = router;
