const products = [];

function addProduct(name, price, category) {
  const product = {
    id: products.length + 1,
    name,
    price,
    category,
  };
  products.push(product);
  console.log(`Producto agregado: ${JSON.stringify(product)}`);
}

function listProducts() {
  console.log("Lista de productos:");
  products.forEach((product) => {
    console.log(product);
  });
}

function deleteProduct(id) {
  const index = products.findIndex((product) => product.id === id);
  if (index !== -1) {
    const deletedProduct = products.splice(index, 1);
    console.log(`Producto eliminado: ${JSON.stringify(deletedProduct[0])}`);
  } else {
    console.log(`Producto con id ${id} no encontrado.`);
  }
}

module.exports = {
  addProduct,
  listProducts,
  deleteProduct,
};
