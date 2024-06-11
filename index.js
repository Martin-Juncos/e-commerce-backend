const app = require("./server");
const { sequelize } = require("./src/models");
require("./src/models/Product");
require("./src/models/User");
require("./src/models/Order");
require("dotenv").config();

const port = process.env.PORT || 3000;

async function main() {
  try {
    await sequelize.authenticate();
    console.log("Conexión a la base de datos exitosa.");
    await sequelize.sync({ force: true });
    console.log("Base de datos sincronizada correctamente.");
    app.listen(port, () => console.log("Corriendo en el puerto: " + port));
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error);
  }
}
main();
