function adminMiddleware(req, res, next) {
  const { name, password } = req.user;
  if (name === "admin" && password === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Acceso denegado" });
  }
}

module.exports = adminMiddleware;
