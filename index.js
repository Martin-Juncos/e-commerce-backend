const { addProduct, listProducts, deleteProduct } = require("./products");

// Agregar productos
addProduct("Laptop", 1500, "Electronics");
addProduct("Phone", 800, "Electronics");
addProduct("Shoes", 100, "Apparel");

// Listar productos
listProducts();

// Eliminar un producto
deleteProduct(2);

// Listar productos nuevamente para verificar la eliminación
listProducts();
