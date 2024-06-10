const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

// Cargar variables de entorno desde el archivo .env
dotenv.config();

// Crear una instancia de Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: process.env.DB_PORT,
    logging: false,
  }
);

// Exportar la instancia de Sequelize
module.exports = sequelize;
