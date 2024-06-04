const express = require("express");
const dotenv = require("dotenv");
const productRoutes = require("./src/routes/products");
const userRoutes = require("./src/routes/users");
const authRoutes = require("./src/routes/auth");
const orderRoutes = require("./src/routes/orders");

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

// Usar las rutas
app.use("/products", productRoutes);
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/orders", orderRoutes);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
