// const Product = require("../models/Product");

// async function addProduct(name, price, category) {
//   const product = await Product.create({ name, price, category });
//   return product;
// }

// async function listProducts() {
//   const products = await Product.findAll();
//   return products;
// }

// async function getProductById(id) {
//   const product = await Product.findByPk(id);
//   return product;
// }

// async function updateProduct(id, updatedProduct) {
//   const product = await getProductById(id);
//   if (product) {
//     await product.update(updatedProduct);
//     return product;
//   }
//   return null;
// }

// async function deleteProduct(id) {
//   const product = await getProductById(id);
//   if (product) {
//     await product.destroy();
//     return product;
//   }
//   return null;
// }

// module.exports = {
//   addProduct,
//   listProducts,
//   getProductById,
//   updateProduct,
//   deleteProduct,
// };

// --------------------------------------------------------

// src/controllers/products.js
const Product = require("../models/Product");

async function addProduct(name, price, category) {
  const product = new Product({ name, price, category });
  await product.save();
  return product;
}

async function listProducts() {
  return await Product.find({});
}

async function getProductById(id) {
  return await Product.findById(id);
}

async function updateProduct(id, updatedProduct) {
  return await Product.findByIdAndUpdate(id, updatedProduct, { new: true });
}

async function deleteProduct(id) {
  return await Product.findByIdAndDelete(id);
}

module.exports = {
  addProduct,
  listProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
