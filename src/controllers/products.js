const Product = require("../models/Product");

async function addProduct(name, price, category) {
  const product = await Product.create({ name, price, category });
  return product;
}

async function listProducts() {
  const products = await Product.findAll();
  return products;
}

async function getProductById(id) {
  const product = await Product.findByPk(id);
  return product;
}

async function updateProduct(id, updatedProduct) {
  const product = await getProductById(id);
  if (product) {
    await product.update(updatedProduct);
    return product;
  }
  return null;
}

async function deleteProduct(id) {
  const product = await getProductById(id);
  if (product) {
    await product.destroy();
    return product;
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
