const express = require("express");
const { body, validationResult } = require("express-validator");
const {
  addUser,
  listUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/users");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post(
  "/",
  [
    body("name").notEmpty().withMessage("El nombre es requerido"),
    body("email")
      .isEmail()
      .withMessage("El correo electrónico debe ser válido"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password, role } = req.body;
    try {
      const user = await addUser(name, email, password, role);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

router.get("/", (req, res) => {
  listUsers()
    .then((users) => res.json(users))
    .catch((error) => res.status(500).json({ message: error.message }));
});

router.get("/:id", (req, res) => {
  getUserById(parseInt(req.params.id))
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).send("Usuario no encontrado");
      }
    })
    .catch((error) => res.status(500).json({ message: error.message }));
});

router.put(
  "/:id",
  authMiddleware,
  [
    body("name").optional().notEmpty().withMessage("El nombre es requerido"),
    body("email")
      .optional()
      .isEmail()
      .withMessage("El correo electrónico debe ser válido"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const updatedUser = await updateUser(parseInt(req.params.id), req.body);
      if (updatedUser) {
        res.json(updatedUser);
      } else {
        res.status(404).send("Usuario no encontrado");
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deletedUser = await deleteUser(parseInt(req.params.id));
    if (deletedUser) {
      res.json(deletedUser);
    } else {
      res.status(404).send("Usuario no encontrado");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
