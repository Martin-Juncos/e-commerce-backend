const express = require("express");
const {
  addUser,
  listUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/users");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", (req, res) => {
  const { name, email } = req.body;
  const user = addUser(name, email);
  res.status(201).json(user);
});

router.get("/", authMiddleware, (req, res) => {
  res.json(listUsers());
});

router.get("/:id", authMiddleware, (req, res) => {
  const user = getUserById(parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).send("Usuario no encontrado");
  }
});

router.put("/:id", authMiddleware, (req, res) => {
  const updatedUser = updateUser(parseInt(req.params.id), req.body);
  if (updatedUser) {
    res.json(updatedUser);
  } else {
    res.status(404).send("Usuario no encontrado");
  }
});

router.delete("/:id", authMiddleware, (req, res) => {
  const deletedUser = deleteUser(parseInt(req.params.id));
  if (deletedUser) {
    res.json(deletedUser);
  } else {
    res.status(404).send("Usuario no encontrado");
  }
});

module.exports = router;
