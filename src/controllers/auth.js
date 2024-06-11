// const jwt = require("jsonwebtoken");
// const { jwtSecret, jwtExpire } = require("../config");
// const User = require("../models/User");

// async function registerUser(name, email, password, role = "cliente") {
//   const newUser = await User.create({ name, email, password, role });
//   return newUser;
// }

// async function loginUser(email, password) {
//   const user = await User.findOne({ where: { email, password } });
//   if (user) {
//     const token = jwt.sign(
//       { id: user.id, email: user.email, role: user.role },
//       jwtSecret,
//       { expiresIn: jwtExpire }
//     );
//     return { user, token };
//   } else {
//     throw new Error("Invalid email or password");
//   }
// }

// module.exports = { registerUser, loginUser };

// ----------------------------------------------------------------------

// src/controllers/auth.js
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { jwtSecret, jwtExpire } = require("../config");

async function registerUser(name, email, password, role = "cliente") {
  const user = new User({ name, email, password, role });
  await user.save();
  return user;
}

async function loginUser(email, password) {
  const user = await User.findOne({ email });
  if (user && user.password === password) {
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      jwtSecret,
      { expiresIn: jwtExpire }
    );
    return { user, token };
  } else {
    throw new Error("Invalid email or password");
  }
}

module.exports = { registerUser, loginUser };
