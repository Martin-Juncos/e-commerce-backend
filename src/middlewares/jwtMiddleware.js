const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config");

function jwtMiddleware(req, res, next) {
  let token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).json({ message: "Invalid token." });
  }
}

module.exports = jwtMiddleware;
