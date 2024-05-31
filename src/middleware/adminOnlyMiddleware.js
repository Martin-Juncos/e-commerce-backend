const { readUsers } = require("../controllers/auth");

async function adminOnlyMiddleware(req, res, next) {
  const { name, password } = req.headers;
  if (!name || !password) {
    return res
      .status(401)
      .json({
        message: "No autorizado: encabezados de autenticación faltantes",
      });
  }

  const users = await readUsers();
  const adminUser = users.find(
    (u) => u.name === "admin" && u.password === "admin"
  );

  if (adminUser && name === "admin" && password === "admin") {
    next();
  } else {
    res
      .status(403)
      .json({
        message:
          "Acceso denegado: solo el administrador puede realizar esta acción",
      });
  }
}

module.exports = adminOnlyMiddleware;
