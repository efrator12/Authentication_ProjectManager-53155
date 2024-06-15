# ProductManager Y CartManager (Servidor web y Express Avanzado - BCRYPTO y API de Autenticacion de Google)

El proyecto de ProductManager se enfoca en la gestión de un catálogo de productos como objetos.
En el archivo `src\routes\products.routes.js`, creamos las peticiones principales que incluyen las siguientes funciones:
  - AGREGAR Productos
  - OBTENER TODOS los Productos
  - OBTENER Productos por ID
  - ACTUALIZAR Productos por ID
  - ELIMINAR Productos por ID

El proyecto CartManager es un servicio para manejar carritos de compras sobre los productos relacionados en el catalogo de ProductManager.
En el archivo `src\routes\carts.routes.js`, creamos las peticiones principales que incluyen las siguientes funciones:
  - Permite CREAR nuevos carritos.
  - OBTENER todos los carritos existentes.
  - OBTENER los productos de un carrito específico por ID.
  - AÑADIR diversos/repetidos productos a un carrito existente.

El catálogo de productos y los carritos se guardan en una base de datos en MongoDB (con sus respectivos nombres para cada documento).

En el servidor `app.js` hacemos al archivo `index.js` el cual contiene un ruteo para ambos proyectos el cual les da una salida por medio de la importacion y direccion de ruta en `/api/products` o `/api/carts`.
El archivo routes.js de cada proyecto contiene las funciones principales que puede realizar el modelo para los productos y carritos mediante los multiples métodos importados. Desde aquí, solicitamos todos los Productos, podemos filtrarlos por ID o establecer una cantidad específica para visualizar en pantalla. En los carritos podemos agregar multiples productos por su ID.

## Pasos para ejecutar el proyecto:
- Para utilizar estas funciones de PRODUCTOS es necesario loggearse en sesion con el usuario correspondiente de la siguiente forma:
* `http://localhost:8080/api/session/login`.
- Es necesario que al finalizar las actividades, se proceda a cerrar la sesion del usuario de la siguiente forma:
* `http://localhost:8080/api/session/logout`.

* Para loggearse a traves de la API de Google Authentication seria por medio de la siguiente liga: `http://localhost:8080/api/session/loginGoogle`. Si ya tienes una cuenta de Google se creara un usuario nuevo dentro de la Mongo DB sin tener una contraseña.

1. Clona este repositorio en tu máquina local (node.js instalado).
2. Navega hasta el directorio `ProductManager - ECOMMERCE`.
3. Ejecuta los siguientes comandos desde un CMD para compilar el proyecto:
    - Instala las dependencias para levantar un servidor en el `Puerto 8080`.
    - Ejecutar `npm run dev` para comenzar con el Testeo del aplicativo sobre el `/src/app.js`.
    - Abrir una pagina web `http://localhost:8080/api/products` para realizar los queries correspondientes en PRODUCTOS:
      * `http://localhost:8080/api/products`: respondera con todos los productos en catalogo.
      * `http://localhost:8080/api/products?list=5` respondera con solo los primeros 5 productos en catalogo.
      * `http://localhost:8080/api/products?list=0` respondera con todos los productos en catalogo.
      * `http://localhost:8080/api/products/2` respondera con el producto ID = 2 en catalogo.
      * `http://localhost:8080/api/products/15` respondera con un error (solo hay 10 productos en el catalogo).
    - Desde un POSTMAN contiene la posibilidad de agregar Productos mediante lo siguiente:
      * `Body < Raw < JSON` desde POSTMAN para agregar el Producto.
      * Producto: `{
         "title": "Llavero",
         "description": "Azul",
         "thumbnail": "https://www.google.com",
         "price": 299,
         "code": "adf121", 
         "stock": 100,
         "status": true
        }`
    - Abrir una pagina web `http://localhost:8080/api/carts` para realizar los queries correspondientes en CARTS:
    - Desde un POSTMAN contiene la posibilidad administrar Carritos mediante lo siguiente:
      * Con el metodo POST sobre `http://localhost:8080/api/carts`: se crearan los carritos (sin ningun parametro, solo su ID automatico y un objeto para los productos).
      * Con el metodo GET sobre `http://localhost:8080/api/carts` respondera con TODOS los carritos en disposicion.
      * Con el metodo GET sobre `http://localhost:8080/api/carts/:cid` respondera con solo los productos que se encuentran agregados en el carrito (si no contiene, soltara un aviso).
      * Con el metodo POST sobre `http://localhost:8080/api/carts/:cid/carts/:pid` se agregara el producto con su ID en el ID del carrito correspondiente (cid es "Carrito ID" y pid es "Producto ID").
      
## Estructura de directorios:
```
ProjectManager - ECOMMERCE
│
├── .gitignore
├── package-lock.json
├── package.json
│
└── src
    ├── app.js
    │
    ├── config
    │   ├── mongoDB.config.js
    │   └── passport.config.js
    │
    ├── dao
    │   ├── models
    │   │   ├── cart.model.js
    │   │   ├── product.model.js
    │   │   └── user.model.js
    │   │
    │   └── mongoDao
    │       ├── cart.dao.js
    │       ├── product.dao.js
    │       └── user.dao.js
    │
    ├── middlewares
    │   └── isLogin.middleware.js
    │
    ├── routes
    │   ├── carts.routes.js
    │   ├── index.js
    │   ├── products.routes.js
    │   └── session.routes.js
    │
    └── utils
        ├── hasPassword.js
        └── jwt.js

```
## :
- `src`: Subdirectorio principal para el código fuente del proyecto.
* `app.js`: Archivo principal de la aplicación.

- `config`: Subdirectorio para archivos de configuración.
* `mongoDB`.config.js: Configuración de MongoDB.
* `passport.config.js`: Configuración de Passport.js.

- `dao`: Subdirectorio para los objetos de acceso a datos.
- `models`: Subdirectorio para modelos de datos.
* `cart.model.js`: Modelo de carrito.
* `product.model.js`: Modelo de producto.
* `user.model.js`: Modelo de usuario.

- `mongoDao`: Subdirectorio para objetos de acceso a datos de MongoDB.
* `cart.dao.js`: DAO de carritos.
* `product.dao.js`: DAO de productos.
* `user.dao.js`: DAO de usuarios.

- `middlewares`: Subdirectorio para middleware.
* `isLogin.middleware.js`: Middleware para verificar inicio de sesión.

- `routes`: Subdirectorio para rutas de la aplicación.
* `carts.routes.js`: Rutas para carritos.
* `index.js: Archivo principal de rutas.
* `products.routes.js`: Rutas para productos.
* `session.routes.js`: Rutas para sesiones.

- `utils`: Subdirectorio para utilidades.
* `hasPassword.js`: Utilidad para manejar contraseñas.
* `jwt.js`: Utilidad para manejar JWT (JSON Web Tokens).
