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
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, price, category } = req.body;
    const product = addProduct(name, price, category);
    res.status(201).json(product);
  }
);

router.get("/", jwtMiddleware, (req, res) => {
  res.json(listProducts());
});

router.get("/:id", jwtMiddleware, (req, res) => {
  const product = getProductById(parseInt(req.params.id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).send("Producto no encontrado");
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
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const updatedProduct = updateProduct(parseInt(req.params.id), req.body);
    if (updatedProduct) {
      res.json(updatedProduct);
    } else {
      res.status(404).send("Producto no encontrado");
    }
  }
);

router.delete(
  "/:id",
  jwtMiddleware,
  roleMiddleware("administrador"),
  (req, res) => {
    const deletedProduct = deleteProduct(parseInt(req.params.id));
    if (deletedProduct) {
      res.json(deletedProduct);
    } else {
      res.status(404).send("Producto no encontrado");
    }
  }
);

module.exports = router;
