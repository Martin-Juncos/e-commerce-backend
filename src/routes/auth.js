const express = require("express");
const { body, validationResult } = require("express-validator");
const { registerUser, loginUser } = require("../controllers/auth");

const router = express.Router();

router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("El nombre es requerido"),
    body("email")
      .isEmail()
      .withMessage("El correo electrónico debe ser válido"),
    body("password").notEmpty().withMessage("La contraseña es requerida"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password, role } = req.body;
    try {
      const user = await registerUser(name, email, password, role);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("El correo electrónico debe ser válido"),
    body("password").notEmpty().withMessage("La contraseña es requerida"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      const { user, token } = await loginUser(email, password);
      res.json({ user, token });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

module.exports = router;
