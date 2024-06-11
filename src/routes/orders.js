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

router.post("/", authMiddleware, async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    const order = await addOrder(userId, productId, quantity);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const orders = await listOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const order = await getOrderById(parseInt(req.params.id));
    if (order) {
      res.json(order);
    } else {
      res.status(404).send("Orden no encontrada");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updatedOrder = await updateOrder(parseInt(req.params.id), req.body);
    if (updatedOrder) {
      res.json(updatedOrder);
    } else {
      res.status(404).send("Orden no encontrada");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deletedOrder = await deleteOrder(parseInt(req.params.id));
    if (deletedOrder) {
      res.json(deletedOrder);
    } else {
      res.status(404).send("Orden no encontrada");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
