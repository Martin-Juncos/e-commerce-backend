# E-commerce Backend

## Descripción

Este proyecto es una API backend para gestionar un e-commerce. Permite realizar operaciones CRUD para productos, usuarios y órdenes, y ofrece autenticación y autorización con JWT.

## Comenzando 🚀

Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas.

### Pre-requisitos 📋

- Node.js
- npm
- MongoDB Atlas (para la base de datos)

### Instalación 🔧

Sigue estos pasos para configurar el entorno de desarrollo:

```bash
git clone https://github.com/Martin-Juncos/e-commerce-backend.git
cd e-commerce-backend
npm install
```

### Configuración de Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/ecommerceDB?retryWrites=true&w=majority
PORT=3000
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=1d
```

### Ejecución del Proyecto

Para iniciar el servidor en modo desarrollo:

```bash
npm run dev
```

### Ejecutando las pruebas ⚙️

Para ejecutar las pruebas automatizadas:

```bash
npm test
```

### Despliegue 📦

Para desplegar el proyecto en un entorno de producción:

```bash
npm start
```

## Endpoints

### Registrarse

**Endpoint:** `/auth/register`  
**Método:** `POST`  
**Descripción:** Registra un nuevo usuario.  
**Cuerpo de la solicitud:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "cliente"
}
```

### Iniciar sesión

**Endpoint:** `/auth/login`  
**Método:** `POST`  
**Descripción:** Inicia sesión un usuario registrado y obtiene un token JWT.  
**Cuerpo de la solicitud:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Crear un producto (solo administrador)

**Endpoint:** `/products`  
**Método:** `POST`  
**Descripción:** Crea un nuevo producto. Requiere un token de administrador.  
**Encabezados de la solicitud:**

```json
{
  "Authorization": "Bearer jwt_token_aquí"
}
```

**Cuerpo de la solicitud:**

```json
{
  "name": "Product A",
  "price": 100.0,
  "category": "Category 1"
}
```

### Crear una orden

**Endpoint:** `/orders`  
**Método:** `POST`  
**Descripción:** Crea una nueva orden. Requiere autenticación con email y contraseña en los encabezados.  
**Encabezados de la solicitud:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Cuerpo de la solicitud:**

```json
{
  "userId": 1,
  "productId": 1,
  "quantity": 2
}
```

## Construido con 🛠️

- [Node.js](https://nodejs.org/) - Entorno de ejecución para JavaScript
- [Express.js](https://expressjs.com/) - Framework de Node.js
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - Utilizado para crear tokens de acceso
- [Jest](https://jestjs.io/) - Framework para pruebas en JavaScript
- [Mongoose](https://mongoosejs.com/) - ODM para MongoDB

## Autores ✒️

- **Martin Juncos** - _Trabajo Inicial_ - [Martin-Juncos](https://github.com/Martin-Juncos)

## Licencia 📄

Este proyecto está bajo la Licencia ISC - mira el archivo [LICENSE.md](LICENSE.md) para detalles.

```

```
