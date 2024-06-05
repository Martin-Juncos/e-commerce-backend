const fs = require("fs").promises;
const path = require("path");

const usersFilePath = path.join(__dirname, "../../data/users.json");

async function readUsers() {
  try {
    const data = await fs.readFile(usersFilePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function writeUsers(users) {
  try {
    await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error("Error writing users file:", error);
  }
}

async function registerUser(name, email, password) {
  const users = await readUsers();
  const newUser = { id: users.length + 1, name, email, password };
  users.push(newUser);
  await writeUsers(users);
  return newUser;
}

async function loginUser(email, password) {
  const users = await readUsers();
  const user = users.find((u) => u.email === email && u.password === password);
  if (user) {
    return user;
  } else {
    throw new Error("Invalid email or password");
  }
}

module.exports = { registerUser, loginUser, readUsers, writeUsers };
