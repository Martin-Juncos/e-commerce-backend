const express = require("express");
const {
  addUser,
  listUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/users");
const adminOnlyMiddleware = require("../middleware/adminOnlyMiddleware");

const router = express.Router();

router.post("/users", adminOnlyMiddleware, (req, res) => {
  const { name, email, password } = req.body;
  const user = addUser(name, email, password);
  res.status(201).json(user);
});

router.get("/users", (req, res) => {
  res.json(listUsers());
});

router.get("/users/:id", (req, res) => {
  const user = getUserById(parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).send("Usuario no encontrado");
  }
});

router.put("/users/:id", adminOnlyMiddleware, (req, res) => {
  const updatedUser = updateUser(parseInt(req.params.id), req.body);
  if (updatedUser) {
    res.json(updatedUser);
  } else {
    res.status(404).send("Usuario no encontrado");
  }
});

router.delete("/users/:id", adminOnlyMiddleware, (req, res) => {
  const deletedUser = deleteUser(parseInt(req.params.id));
  if (deletedUser) {
    res.json(deletedUser);
  } else {
    res.status(404).send("Usuario no encontrado");
  }
});

module.exports = router;
