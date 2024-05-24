let users = [];

function addUser(name, email) {
  const user = {
    id: users.length + 1,
    name,
    email,
  };
  users.push(user);
  return user;
}

function listUsers() {
  return users;
}

function getUserById(id) {
  return users.find((user) => user.id === id);
}

function updateUser(id, updatedUser) {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    users[index] = { id, ...updatedUser };
    return users[index];
  }
  return null;
}

function deleteUser(id) {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    const deletedUser = users.splice(index, 1);
    return deletedUser[0];
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
