# E-commerce Backend

## 1 Configuración inicial del proyecto

Este proyecto utiliza Node.js y Visual Studio Code para el desarrollo de la aplicación backend de e-commerce.

### Módulos utilizados

- Node.js
- npm

### Instalación

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/e-commerce-backend.git

   ```

## 2 Funcionalidades básicas de productos

Este proyecto permite agregar, listar y eliminar productos utilizando arrays y objetos para almacenar la información.

### Funciones

- `addProduct(name, price, category)`: Añade un nuevo producto con el nombre, precio y categoría especificados.
- `listProducts()`: Lista todos los productos almacenados.
- `deleteProduct(id)`: Elimina el producto con el ID especificado.

### Ejecución del proyecto

Para ejecutar el proyecto y ver las funcionalidades básicas, utiliza el siguiente comando:

```bash
npm run dev
```

## 3 Configuración del servidor

Este proyecto utiliza Express.js para manejar el servidor y dotenv para gestionar variables de entorno.

### Instalación de librerías

Las siguientes librerías son necesarias para el funcionamiento del servidor:

- express
- dotenv

### Variables de entorno

Utilizamos un archivo `.env` para almacenar configuraciones sensibles. Asegúrate de crear un archivo `.env` en el directorio raíz del proyecto con el siguiente contenido:

```env
PORT=3000
```

## 4 API de Productos

La API permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en los productos. A continuación se describen los endpoints disponibles:

### Crear un producto

**Endpoint:** `POST /products`
**Descripción:** Crea un nuevo producto.
**Cuerpo de la solicitud:**

```json
{
  "name": "Nombre del producto",
  "price": 100,
  "category": "Categoría del producto"
}
```

## 5 API de Autenticación

La API permite registrar y autenticar usuarios. A continuación se describen los endpoints disponibles:

### Registro de usuario

**Endpoint:** `POST /register`
**Descripción:** Registra un nuevo usuario.
**Cuerpo de la solicitud:**

```json
{
  "name": "Nombre del usuario",
  "email": "correo@ejemplo.com",
  "password": "contraseña"
}
```

## Flujo de Trabajo con Git

Este proyecto utiliza un flujo de trabajo basado en ramas para gestionar el desarrollo y la producción.

### Ramas Principales

- `develop`: Rama principal para el desarrollo.
- `production`: Rama principal para la producción.

### Flujo de Trabajo

1. Crear una rama de funcionalidad a partir de `develop`.
2. Realizar cambios y hacer commit en la rama de funcionalidad.
3. Fusionar la rama de funcionalidad en `develop`.
4. Fusionar `develop` en `production` cuando una nueva versión esté lista para ser lanzada.

### Comandos Básicos

```bash
# Crear y cambiar a una nueva rama
git checkout -b feature/nueva-funcionalidad develop

# Hacer commit de los cambios
git add .
git commit -m "Implementar nueva funcionalidad"

# Cambiar a la rama develop y fusionar la rama de funcionalidad
git checkout develop
git merge feature/nueva-funcionalidad

# Cambiar a la rama production y fusionar develop
git checkout production
git merge develop

```
