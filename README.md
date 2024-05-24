## Configuración del servidor

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

## API de Productos

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
