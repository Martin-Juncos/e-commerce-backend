const { readUsers } = require("../controllers/auth");

async function authMiddleware(req, res, next) {
  const { email, password } = req.headers;
  if (!email || !password) {
    return res
      .status(401)
      .json({
        message: "No autorizado: encabezados de autenticación faltantes",
      });
  }

  const users = await readUsers();
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    return res
      .status(401)
      .json({ message: "No autorizado: usuario o contraseña incorrectos" });
  }

  req.user = user;
  next();
}

module.exports = authMiddleware;
