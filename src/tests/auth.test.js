const { registerUser, loginUser } = require("../controllers/auth");
const fs = require("fs").promises;
const path = require("path");

// Simular la lectura y escritura de archivos
jest.mock("fs", () => ({
  promises: {
    readFile: jest.fn(),
    writeFile: jest.fn(),
  },
}));

const usersFilePath = path.join(__dirname, "../../data/users.json");

beforeEach(() => {
  // Restaurar el contenido del archivo antes de cada prueba
  fs.readFile.mockResolvedValue(JSON.stringify([]));
  fs.writeFile.mockClear();
});

describe("registerUser", () => {
  it("debería registrar un nuevo usuario", async () => {
    const user = await registerUser(
      "John Doe",
      "john@example.com",
      "password123"
    );

    expect(user).toEqual({
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
    });

    expect(fs.writeFile).toHaveBeenCalledWith(
      usersFilePath,
      JSON.stringify([user], null, 2)
    );
  });
});

describe("loginUser", () => {
  it("debería autenticar a un usuario existente", async () => {
    // Simular un usuario existente en el archivo
    const existingUser = {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
    };
    fs.readFile.mockResolvedValue(JSON.stringify([existingUser]));

    const user = await loginUser("john@example.com", "password123");

    expect(user).toEqual(existingUser);
  });

  it("debería lanzar un error si el usuario no existe", async () => {
    await expect(
      loginUser("invalid@example.com", "password123")
    ).rejects.toThrow("Invalid email or password");
  });
});
