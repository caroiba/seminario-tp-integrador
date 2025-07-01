
# 🛍️ API Ecommerce de Productos (Node.js + Sequelize + MySQL + Redis)

Este proyecto es una API RESTful simple pero útil, diseñada para la gestión de productos de un ecommerce. Usa una arquitectura de microservicios con **Docker Compose**, y se basa en:

- Backend con **Node.js** y **Express**
- Base de datos **MySQL**
- Cache con **Redis**
- ORM con **Sequelize**
- Variables de entorno con **dotenv**

---

## 📐 Arquitectura

```
📦 ecommerce-api/
├── backend/                  # Código fuente de la API
│   ├── models/              # Modelo Sequelize
│   ├── controllers/         # Controlador con lógica de negocio
│   ├── config/              # Configuración de Sequelize
│   ├── index.js             # Punto de entrada de la app
│   ├── package.json
│   └── Dockerfile
├── mysql-init/
│   └── init.sql             # Script para crear base de datos/tablas al iniciar
├── .env                     # Variables de entorno
├── docker-compose.yml       # Definición de servicios
└── README.md
```

---

## 🚀 ¿Cómo ejecutar el proyecto?

### ✅ Requisitos previos

- Tener instalado **[Docker Desktop](https://www.docker.com/products/docker-desktop/)**

---

### 🧪 Instrucciones paso a paso

1. **Clonar el repositorio**

```bash
git clone https://github.com/usuario/api-ecommerce.git
cd api-ecommerce
```

2. **Crear archivo `.env`** en la raíz del proyecto con este contenido:

```
DB_HOST=db
DB_USER=root
DB_PASSWORD=330606
DB_NAME=ecommerce
DB_DIALECT=mysql
REDIS_HOST=cache
```

3. **Ejecutar los contenedores**

```bash
docker-compose up --build
```

4. La API estará disponible en:  
   👉 http://localhost:3000

---

## 📦 Base de datos

Cuando se inicia el contenedor `db`, el archivo `mysql-init/init.sql` se ejecuta automáticamente y crea:

- La base de datos `ecommerce`
- La tabla `productos`

---

## 📚 Endpoints disponibles

> Todos los endpoints responden en formato `JSON`

### 🔍 `GET /productos`

Devuelve la lista de productos (usa Redis para cachear durante 60 segundos).

```bash
curl http://localhost:3000/productos
```

**Respuesta:**

```json
[
  {
    "id": 1,
    "nombre": "Notebook Dell",
    "descripcion": "Intel i7, 16GB RAM",
    "precio": "600000.00",
    "stock": 5
  }
]
```

---

### 📄 `GET /productos/:id`

Consulta un producto por ID.

```bash
curl http://localhost:3000/productos/1
```

---

### ➕ `POST /productos`

Crea un nuevo producto.

```bash
curl -X POST http://localhost:3000/productos -H "Content-Type: application/json" -d '{"nombre":"Auriculares Logitech","descripcion":"Inalámbricos","precio":40000,"stock":10}'
```

---

### ✏️ `PUT /productos/:id`

Modifica un producto existente.

```bash
curl -X PUT http://localhost:3000/productos/1 -H "Content-Type: application/json" -d '{"nombre":"Auriculares Logitech G733","descripcion":"Mejorados","precio":45000,"stock":8}'
```

---

### ❌ `DELETE /productos/:id`

Elimina un producto por ID.

```bash
curl -X DELETE http://localhost:3000/productos/1
```

---

## 📌 Notas adicionales

- Si Redis o MySQL tardan en levantarse, el backend reintenta conexión automáticamente.
- La tabla `productos` se crea si no existe gracias a `sequelize.sync()`.
- La lista de productos se cachea en Redis por 60 segundos (`productos_cache`).

---

## 📷 Ejemplo visual

Podés usar herramientas como **Postman** o **Thunder Client** para interactuar visualmente con la API.

---


## 👩‍💻 Autor

Carolina Iba – Proyecto para Docker & Docker Compose

---
