const express = require("express");
const { body, validationResult } = require("express-validator");
const {
  addProduct,
  listProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/products");
const jwtMiddleware = require("../middlewares/jwtMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

const router = express.Router();

router.post(
  "/",
  jwtMiddleware,
  roleMiddleware("administrador"),
  [
    body("name").notEmpty().withMessage("El nombre es requerido"),
    body("price").isNumeric().withMessage("El precio debe ser un número"),
    body("category").notEmpty().withMessage("La categoría es requerida"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, price, category } = req.body;
    try {
      const product = await addProduct(name, price, category);
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

router.get("/", jwtMiddleware, async (req, res) => {
  try {
    const products = await listProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", jwtMiddleware, async (req, res) => {
  try {
    const product = await getProductById(parseInt(req.params.id));
    if (product) {
      res.json(product);
    } else {
      res.status(404).send("Producto no encontrado");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put(
  "/:id",
  jwtMiddleware,
  roleMiddleware("administrador"),
  [
    body("name").optional().notEmpty().withMessage("El nombre es requerido"),
    body("price")
      .optional()
      .isNumeric()
      .withMessage("El precio debe ser un número"),
    body("category")
      .optional()
      .notEmpty()
      .withMessage("La categoría es requerida"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const updatedProduct = await updateProduct(
        parseInt(req.params.id),
        req.body
      );
      if (updatedProduct) {
        res.json(updatedProduct);
      } else {
        res.status(404).send("Producto no encontrado");
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

router.delete(
  "/:id",
  jwtMiddleware,
  roleMiddleware("administrador"),
  async (req, res) => {
    try {
      const deletedProduct = await deleteProduct(parseInt(req.params.id));
      if (deletedProduct) {
        res.json(deletedProduct);
      } else {
        res.status(404).send("Producto no encontrado");
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

module.exports = router;
