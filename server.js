const express = require("express");
const dotenv = require("dotenv");
const {
  addProduct,
  listProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("./src/controllers/products");

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

// Endpoint para crear un producto
app.post("/products", (req, res) => {
  const { name, price, category } = req.body;
  const product = addProduct(name, price, category);
  res.status(201).json(product);
});

// Endpoint para listar todos los productos
app.get("/products", (req, res) => {
  res.json(listProducts());
});

// Endpoint para obtener un producto por ID
app.get("/products/:id", (req, res) => {
  const product = getProductById(parseInt(req.params.id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).send("Producto no encontrado");
  }
});

// Endpoint para actualizar un producto por ID
app.put("/products/:id", (req, res) => {
  const updatedProduct = updateProduct(parseInt(req.params.id), req.body);
  if (updatedProduct) {
    res.json(updatedProduct);
  } else {
    res.status(404).send("Producto no encontrado");
  }
});

// Endpoint para eliminar un producto por ID
app.delete("/products/:id", (req, res) => {
  const deletedProduct = deleteProduct(parseInt(req.params.id));
  if (deletedProduct) {
    res.json(deletedProduct);
  } else {
    res.status(404).send("Producto no encontrado");
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
