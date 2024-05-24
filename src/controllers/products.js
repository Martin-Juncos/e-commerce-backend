let products = [];

function addProduct(name, price, category) {
  const product = {
    id: products.length + 1,
    name,
    price,
    category,
  };
  products.push(product);
  return product;
}

function listProducts() {
  return products;
}

function getProductById(id) {
  return products.find((product) => product.id === id);
}

function updateProduct(id, updatedProduct) {
  const index = products.findIndex((product) => product.id === id);
  if (index !== -1) {
    products[index] = { id, ...updatedProduct };
    return products[index];
  }
  return null;
}

function deleteProduct(id) {
  const index = products.findIndex((product) => product.id === id);
  if (index !== -1) {
    const deletedProduct = products.splice(index, 1);
    return deletedProduct[0];
  }
  return null;
}

module.exports = {
  addProduct,
  listProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
