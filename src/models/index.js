// const sequelize = require("../../data/database");
// const Product = require("./Product");
// const User = require("./User");
// const Order = require("./Order");

// // Relaciones
// User.hasMany(Order, { foreignKey: "userId" });
// Product.hasMany(Order, { foreignKey: "productId" });
// Order.belongsTo(User, { foreignKey: "userId" });
// Order.belongsTo(Product, { foreignKey: "productId" });

// module.exports = { Product, User, Order, sequelize };

// ------------------------------------------------------------

// src/models/index.js
const mongoose = require("mongoose");
const Product = require("./Product");
const User = require("./User");
const Order = require("./Order");

// No es necesario configurar relaciones explícitas en Mongoose como en Sequelize,
// ya que Mongoose maneja referencias automáticamente con el `ref` en los esquemas.

module.exports = { Product, User, Order };
