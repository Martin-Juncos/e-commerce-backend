const User = require("../models/User");

async function addUser(name, email, password, role) {
  const user = await User.create({ name, email, password, role });
  return user;
}

async function listUsers() {
  const users = await User.findAll();
  return users;
}

async function getUserById(id) {
  const user = await User.findByPk(id);
  return user;
}

async function updateUser(id, updatedUser) {
  const user = await getUserById(id);
  if (user) {
    await user.update(updatedUser);
    return user;
  }
  return null;
}

async function deleteUser(id) {
  const user = await getUserById(id);
  if (user) {
    await user.destroy();
    return user;
  }
  return null;
}

module.exports = {
  addUser,
  listUsers,
  getUserById,
  updateUser,
  deleteUser,
};
