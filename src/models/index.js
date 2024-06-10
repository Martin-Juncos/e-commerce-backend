const sequelize = require("../../data/database");
const Product = require("./Product");
const User = require("./User");
const Order = require("./Order");

// Relaciones
User.hasMany(Order, { foreignKey: "userId" });
Product.hasMany(Order, { foreignKey: "productId" });
Order.belongsTo(User, { foreignKey: "userId" });
Order.belongsTo(Product, { foreignKey: "productId" });

module.exports = { Product, User, Order, sequelize };
