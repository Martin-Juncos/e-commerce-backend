const express = require("express");
const dotenv = require("dotenv");
const productRoutes = require("./src/routes/products");
const userRoutes = require("./src/routes/users");
const authRoutes = require("./src/routes/auth");
const orderRoutes = require("./src/routes/orders");
const errorHandler = require("./src/middlewares/errorHandlerMiddleware");

// Cargar variables de entorno desde el archivo .env
dotenv.config();

const app = express();

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.json());

// Ruta básica de prueba
app.get("/", (req, res) => {
  res.send("Servidor Express configurado correctamente.");
});

// Usar las rutas
app.use("/products", productRoutes);
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/orders", orderRoutes);

// Middleware de manejo de errores
app.use(errorHandler);

module.exports = app;
