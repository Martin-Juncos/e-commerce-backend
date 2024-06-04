const express = require("express");
const dotenv = require("dotenv");
const {
  addProduct,
  listProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("./src/controllers/products");
const {
  addUser,
  listUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("./src/controllers/users");
const {
  addOrder,
  listOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} = require("./src/controllers/orders");
const { registerUser, loginUser } = require("./src/controllers/auth");
const authMiddleware = require("./src/middleware/authMiddleware");

// Cargar variables de entorno desde el archivo .env
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.json());

// Ruta básica de prueba
app.get("/", (req, res) => {
  res.send("Servidor Express configurado correctamente.");
});

// Endpoints para autenticación
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await registerUser(name, email, password);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await loginUser(email, password);
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

// Endpoints para productos (protegidos)
app.post("/products", authMiddleware, (req, res) => {
  const { name, price, category } = req.body;
  const product = addProduct(name, price, category);
  res.status(201).json(product);
});

app.get("/products", authMiddleware, (req, res) => {
  res.json(listProducts());
});

app.get("/products/:id", authMiddleware, (req, res) => {
  const product = getProductById(parseInt(req.params.id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).send("Producto no encontrado");
  }
});

app.put("/products/:id", authMiddleware, (req, res) => {
  const updatedProduct = updateProduct(parseInt(req.params.id), req.body);
  if (updatedProduct) {
    res.json(updatedProduct);
  } else {
    res.status(404).send("Producto no encontrado");
  }
});

app.delete("/products/:id", authMiddleware, (req, res) => {
  const deletedProduct = deleteProduct(parseInt(req.params.id));
  if (deletedProduct) {
    res.json(deletedProduct);
  } else {
    res.status(404).send("Producto no encontrado");
  }
});

// Endpoints para usuarios
app.post("/users", (req, res) => {
  const { name, email } = req.body;
  const user = addUser(name, email);
  res.status(201).json(user);
});

app.get("/users", (req, res) => {
  res.json(listUsers());
});

app.get("/users/:id", (req, res) => {
  const user = getUserById(parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).send("Usuario no encontrado");
  }
});

app.put("/users/:id", (req, res) => {
  const updatedUser = updateUser(parseInt(req.params.id), req.body);
  if (updatedUser) {
    res.json(updatedUser);
  } else {
    res.status(404).send("Usuario no encontrado");
  }
});

app.delete("/users/:id", (req, res) => {
  const deletedUser = deleteUser(parseInt(req.params.id));
  if (deletedUser) {
    res.json(deletedUser);
  } else {
    res.status(404).send("Usuario no encontrado");
  }
});

// Endpoints para órdenes
app.post("/orders", (req, res) => {
  const { userId, products } = req.body;
  const order = addOrder(userId, products);
  res.status(201).json(order);
});

app.get("/orders", (req, res) => {
  res.json(listOrders());
});

app.get("/orders/:id", (req, res) => {
  const order = getOrderById(parseInt(req.params.id));
  if (order) {
    res.json(order);
  } else {
    res.status(404).send("Orden no encontrada");
  }
});

app.put("/orders/:id", (req, res) => {
  const updatedOrder = updateOrder(parseInt(req.params.id), req.body);
  if (updatedOrder) {
    res.json(updatedOrder);
  } else {
    res.status(404).send("Orden no encontrada");
  }
});

app.delete("/orders/:id", (req, res) => {
  const deletedOrder = deleteOrder(parseInt(req.params.id));
  if (deletedOrder) {
    res.json(deletedOrder);
  } else {
    res.status(404).send("Orden no encontrada");
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
