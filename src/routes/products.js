const express = require("express");
const {
  addProduct,
  listProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/products");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

const router = express.Router();

router.post("/", authMiddleware, adminMiddleware, (req, res) => {
  const { name, price, category } = req.body;
  const product = addProduct(name, price, category);
  res.status(201).json(product);
});

router.get("/", authMiddleware, (req, res) => {
  res.json(listProducts());
});

router.get("/:id", authMiddleware, (req, res) => {
  const product = getProductById(parseInt(req.params.id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).send("Producto no encontrado");
  }
});

router.put("/:id", authMiddleware, adminMiddleware, (req, res) => {
  const updatedProduct = updateProduct(parseInt(req.params.id), req.body);
  if (updatedProduct) {
    res.json(updatedProduct);
  } else {
    res.status(404).send("Producto no encontrado");
  }
});

router.delete("/:id", authMiddleware, adminMiddleware, (req, res) => {
  const deletedProduct = deleteProduct(parseInt(req.params.id));
  if (deletedProduct) {
    res.json(deletedProduct);
  } else {
    res.status(404).send("Producto no encontrado");
  }
});

module.exports = router;
