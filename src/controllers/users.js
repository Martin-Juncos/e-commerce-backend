// const User = require("../models/User");

// async function addUser(name, email, password, role) {
//   const user = await User.create({ name, email, password, role });
//   return user;
// }

// async function listUsers() {
//   const users = await User.findAll();
//   return users;
// }

// async function getUserById(id) {
//   const user = await User.findByPk(id);
//   return user;
// }

// async function updateUser(id, updatedUser) {
//   const user = await getUserById(id);
//   if (user) {
//     await user.update(updatedUser);
//     return user;
//   }
//   return null;
// }

// async function deleteUser(id) {
//   const user = await getUserById(id);
//   if (user) {
//     await user.destroy();
//     return user;
//   }
//   return null;
// }

// module.exports = {
//   addUser,
//   listUsers,
//   getUserById,
//   updateUser,
//   deleteUser,
// };

// -----------------------------------------------

// src/controllers/users.js
const User = require("../models/User");

async function addUser(name, email, password, role = "cliente") {
  const user = new User({ name, email, password, role });
  await user.save();
  return user;
}

async function listUsers() {
  return await User.find({});
}

async function getUserById(id) {
  return await User.findById(id);
}

async function updateUser(id, updatedUser) {
  return await User.findByIdAndUpdate(id, updatedUser, { new: true });
}

async function deleteUser(id) {
  return await User.findByIdAndDelete(id);
}

module.exports = {
  addUser,
  listUsers,
  getUserById,
  updateUser,
  deleteUser,
};
